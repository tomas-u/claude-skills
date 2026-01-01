# API Security Patterns

## Authentication Methods

### OAuth 2.0 + PKCE

Proof Key for Code Exchange - prevents authorization code interception

```javascript
// Client-side: Generate code verifier and challenge
const crypto = require('crypto');

function generateCodeVerifier() {
  return base64URLEncode(crypto.randomBytes(32));
}

function generateCodeChallenge(verifier) {
  const hash = crypto.createHash('sha256').update(verifier).digest();
  return base64URLEncode(hash);
}

function base64URLEncode(buffer) {
  return buffer.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// Step 1: Authorization request
const codeVerifier = generateCodeVerifier();
const codeChallenge = generateCodeChallenge(codeVerifier);

const authUrl = `https://auth.example.com/authorize?` +
  `response_type=code&` +
  `client_id=YOUR_CLIENT_ID&` +
  `redirect_uri=${encodeURIComponent(redirectUri)}&` +
  `scope=openid profile email&` +
  `state=${state}&` +
  `code_challenge=${codeChallenge}&` +
  `code_challenge_method=S256`;

// Step 2: Exchange code for token
async function exchangeCodeForToken(code) {
  const response = await fetch('https://auth.example.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
      client_id: 'YOUR_CLIENT_ID',
      code_verifier: codeVerifier
    })
  });
  
  return await response.json();
}
```

### API Key Authentication

```javascript
// Server-side validation
async function validateApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'] || req.query.api_key;
  
  if (!apiKey) {
    return res.status(401).json({ error: 'API key required' });
  }
  
  // Hash the provided key
  const hashedKey = crypto
    .createHash('sha256')
    .update(apiKey)
    .digest('hex');
  
  // Look up in database
  const keyData = await ApiKey.findOne({ 
    keyHash: hashedKey,
    active: true,
    expiresAt: { $gt: new Date() }
  });
  
  if (!keyData) {
    return res.status(401).json({ error: 'Invalid or expired API key' });
  }
  
  // Rate limiting check
  const usage = await checkRateLimit(keyData.id);
  if (usage.exceeded) {
    return res.status(429).json({ 
      error: 'Rate limit exceeded',
      resetAt: usage.resetAt
    });
  }
  
  // Attach key info to request
  req.apiKey = keyData;
  req.userId = keyData.userId;
  
  // Log usage
  await logApiKeyUsage(keyData.id, req.path, req.method);
  
  next();
}

// API key management
class ApiKeyManager {
  static async createKey(userId, name, scopes, expiresInDays = 365) {
    const key = crypto.randomBytes(32).toString('hex');
    const keyHash = crypto.createHash('sha256').update(key).digest('hex');
    
    const apiKey = await ApiKey.create({
      userId,
      name,
      keyHash,
      scopes,
      expiresAt: new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000),
      active: true,
      createdAt: new Date()
    });
    
    // Return the plain key only once
    return {
      id: apiKey.id,
      key: key, // Show to user only once
      prefix: key.substring(0, 8), // Store prefix for identification
      scopes,
      expiresAt: apiKey.expiresAt
    };
  }
  
  static async revokeKey(keyId) {
    await ApiKey.updateOne(
      { _id: keyId },
      { active: false, revokedAt: new Date() }
    );
  }
  
  static async rotateKey(oldKeyId) {
    const oldKey = await ApiKey.findById(oldKeyId);
    const newKey = await this.createKey(
      oldKey.userId,
      oldKey.name,
      oldKey.scopes
    );
    await this.revokeKey(oldKeyId);
    return newKey;
  }
}
```

### mTLS (Mutual TLS)

```javascript
const https = require('https');
const fs = require('fs');

// Server configuration
const options = {
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-cert.pem'),
  ca: fs.readFileSync('ca-cert.pem'),
  requestCert: true,
  rejectUnauthorized: true
};

https.createServer(options, (req, res) => {
  const cert = req.socket.getPeerCertificate();
  
  if (req.client.authorized) {
    // Client certificate is valid
    const clientId = cert.subject.CN;
    console.log(`Authenticated client: ${clientId}`);
    
    // Process request
    res.writeHead(200);
    res.end('Authenticated');
  } else {
    res.writeHead(401);
    res.end('Unauthorized');
  }
}).listen(443);

// Client configuration
const clientOptions = {
  hostname: 'api.example.com',
  port: 443,
  path: '/api/data',
  method: 'GET',
  key: fs.readFileSync('client-key.pem'),
  cert: fs.readFileSync('client-cert.pem'),
  ca: fs.readFileSync('ca-cert.pem')
};

const req = https.request(clientOptions, (res) => {
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.end();
```

## Authorization Patterns

### Scope-Based Authorization

```javascript
// Define API scopes
const SCOPES = {
  READ_USERS: 'users:read',
  WRITE_USERS: 'users:write',
  DELETE_USERS: 'users:delete',
  READ_ADMIN: 'admin:read',
  WRITE_ADMIN: 'admin:write'
};

// Scope validation middleware
function requireScopes(...requiredScopes) {
  return async (req, res, next) => {
    const tokenScopes = req.token.scopes || [];
    
    const hasAllScopes = requiredScopes.every(scope => 
      tokenScopes.includes(scope)
    );
    
    if (!hasAllScopes) {
      return res.status(403).json({
        error: 'Insufficient permissions',
        required: requiredScopes,
        granted: tokenScopes
      });
    }
    
    next();
  };
}

// Usage
app.get('/api/users', 
  authenticateToken,
  requireScopes(SCOPES.READ_USERS),
  async (req, res) => {
    // Handler
  }
);

app.delete('/api/users/:id',
  authenticateToken,
  requireScopes(SCOPES.DELETE_USERS),
  async (req, res) => {
    // Handler
  }
);
```

### Resource-Based Authorization

```javascript
// Check ownership of resource
async function requireOwnership(req, res, next) {
  const resourceId = req.params.id;
  const userId = req.userId;
  
  const resource = await Resource.findById(resourceId);
  
  if (!resource) {
    return res.status(404).json({ error: 'Not found' });
  }
  
  // Check if user owns resource or is admin
  if (resource.ownerId !== userId && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  req.resource = resource;
  next();
}

// Usage
app.put('/api/documents/:id',
  authenticateToken,
  requireOwnership,
  async (req, res) => {
    // User can only update their own documents
    await req.resource.update(req.body);
    res.json(req.resource);
  }
);
```

## Input Validation

### Request Schema Validation

```javascript
const Joi = require('joi');

// Define schemas
const userSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  
  email: Joi.string()
    .email()
    .required(),
  
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/)
    .required()
    .messages({
      'string.pattern.base': 'Password must contain uppercase, lowercase, number, and special character'
    }),
  
  age: Joi.number()
    .integer()
    .min(13)
    .max(120),
  
  role: Joi.string()
    .valid('user', 'moderator', 'admin')
    .default('user')
});

// Validation middleware
function validateRequest(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });
    
    if (error) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.details.map(d => ({
          field: d.path.join('.'),
          message: d.message
        }))
      });
    }
    
    req.validatedBody = value;
    next();
  };
}

// Usage
app.post('/api/users',
  validateRequest(userSchema),
  async (req, res) => {
    const user = await User.create(req.validatedBody);
    res.json(user);
  }
);
```

### Query Parameter Sanitization

```javascript
function sanitizeQuery(req, res, next) {
  const allowedParams = ['page', 'limit', 'sort', 'filter'];
  const allowedSortFields = ['createdAt', 'updatedAt', 'name'];
  
  // Remove unknown parameters
  Object.keys(req.query).forEach(key => {
    if (!allowedParams.includes(key)) {
      delete req.query[key];
    }
  });
  
  // Validate and sanitize
  if (req.query.page) {
    req.query.page = Math.max(1, parseInt(req.query.page) || 1);
  }
  
  if (req.query.limit) {
    req.query.limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
  }
  
  if (req.query.sort) {
    const [field, order] = req.query.sort.split(':');
    if (allowedSortFields.includes(field) && ['asc', 'desc'].includes(order)) {
      req.query.sort = { [field]: order === 'asc' ? 1 : -1 };
    } else {
      delete req.query.sort;
    }
  }
  
  next();
}

app.get('/api/users',
  sanitizeQuery,
  async (req, res) => {
    const { page = 1, limit = 10, sort } = req.query;
    
    const users = await User.find()
      .sort(sort)
      .limit(limit)
      .skip((page - 1) * limit);
    
    res.json(users);
  }
);
```

## Rate Limiting Strategies

### Sliding Window Rate Limiting

```javascript
const Redis = require('ioredis');
const redis = new Redis();

async function slidingWindowRateLimit(userId, limit, windowSeconds) {
  const now = Date.now();
  const windowStart = now - (windowSeconds * 1000);
  const key = `rate_limit:${userId}`;
  
  // Remove old entries
  await redis.zremrangebyscore(key, 0, windowStart);
  
  // Count requests in window
  const count = await redis.zcard(key);
  
  if (count >= limit) {
    const oldestEntry = await redis.zrange(key, 0, 0, 'WITHSCORES');
    const resetTime = parseInt(oldestEntry[1]) + (windowSeconds * 1000);
    
    return {
      allowed: false,
      resetAt: new Date(resetTime),
      remaining: 0
    };
  }
  
  // Add current request
  await redis.zadd(key, now, `${now}:${Math.random()}`);
  await redis.expire(key, windowSeconds);
  
  return {
    allowed: true,
    remaining: limit - count - 1,
    resetAt: new Date(now + windowSeconds * 1000)
  };
}

// Middleware
function rateLimitMiddleware(limit = 100, windowSeconds = 60) {
  return async (req, res, next) => {
    const userId = req.userId || req.ip;
    
    const result = await slidingWindowRateLimit(userId, limit, windowSeconds);
    
    // Set rate limit headers
    res.set('X-RateLimit-Limit', limit);
    res.set('X-RateLimit-Remaining', result.remaining);
    res.set('X-RateLimit-Reset', result.resetAt.toISOString());
    
    if (!result.allowed) {
      res.set('Retry-After', Math.ceil((result.resetAt - Date.now()) / 1000));
      return res.status(429).json({
        error: 'Too many requests',
        retryAfter: result.resetAt
      });
    }
    
    next();
  };
}
```

### Token Bucket Algorithm

```javascript
class TokenBucket {
  constructor(capacity, refillRate) {
    this.capacity = capacity;
    this.refillRate = refillRate; // tokens per second
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }
  
  refill() {
    const now = Date.now();
    const timePassed = (now - this.lastRefill) / 1000;
    const tokensToAdd = timePassed * this.refillRate;
    
    this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
    this.lastRefill = now;
  }
  
  consume(tokens = 1) {
    this.refill();
    
    if (this.tokens >= tokens) {
      this.tokens -= tokens;
      return true;
    }
    
    return false;
  }
  
  getWaitTime(tokens = 1) {
    if (this.tokens >= tokens) {
      return 0;
    }
    
    const needed = tokens - this.tokens;
    return (needed / this.refillRate) * 1000;
  }
}

// Usage
const buckets = new Map();

function tokenBucketMiddleware(capacity, refillRate) {
  return (req, res, next) => {
    const userId = req.userId || req.ip;
    
    if (!buckets.has(userId)) {
      buckets.set(userId, new TokenBucket(capacity, refillRate));
    }
    
    const bucket = buckets.get(userId);
    
    if (bucket.consume()) {
      res.set('X-RateLimit-Remaining', Math.floor(bucket.tokens));
      next();
    } else {
      const waitTime = Math.ceil(bucket.getWaitTime());
      res.set('Retry-After', Math.ceil(waitTime / 1000));
      res.status(429).json({
        error: 'Rate limit exceeded',
        retryAfter: waitTime
      });
    }
  };
}
```

## API Versioning

```javascript
// URL-based versioning
app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);

// Header-based versioning
function versionMiddleware(req, res, next) {
  const version = req.headers['api-version'] || 'v1';
  
  req.apiVersion = version;
  
  if (version === 'v2') {
    // Use v2 handlers
    req.useV2 = true;
  }
  
  next();
}

// Accept header versioning
app.get('/api/users', (req, res) => {
  const accept = req.headers['accept'];
  
  if (accept.includes('application/vnd.myapi.v2+json')) {
    // Return v2 response
    res.json({ version: 'v2', users: [] });
  } else {
    // Return v1 response
    res.json({ users: [] });
  }
});
```

## API Documentation Security

```javascript
// Secure Swagger/OpenAPI
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Require authentication for docs
app.use('/api-docs',
  authenticateToken,
  requireRole('developer'),
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    explorer: false,
    customCss: '.swagger-ui .topbar { display: none }',
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true
    }
  })
);
```

## Webhooks Security

```javascript
const crypto = require('crypto');

// Generate webhook signature
function generateWebhookSignature(payload, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(JSON.stringify(payload));
  return hmac.digest('hex');
}

// Verify webhook signature
function verifyWebhookSignature(req, res, next) {
  const signature = req.headers['x-webhook-signature'];
  const secret = process.env.WEBHOOK_SECRET;
  
  if (!signature) {
    return res.status(401).json({ error: 'Missing signature' });
  }
  
  const expectedSignature = generateWebhookSignature(req.body, secret);
  
  // Timing-safe comparison
  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);
  
  if (sigBuffer.length !== expectedBuffer.length) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  const valid = crypto.timingSafeEqual(sigBuffer, expectedBuffer);
  
  if (!valid) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  next();
}

// Webhook endpoint
app.post('/webhooks/payment',
  express.json(),
  verifyWebhookSignature,
  async (req, res) => {
    // Process webhook
    await handlePaymentWebhook(req.body);
    res.status(200).send('OK');
  }
);

// Sending webhooks
async function sendWebhook(url, payload, secret) {
  const signature = generateWebhookSignature(payload, secret);
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Webhook-Signature': signature,
      'User-Agent': 'MyApp-Webhook/1.0'
    },
    body: JSON.stringify(payload),
    timeout: 5000
  });
  
  if (!response.ok) {
    throw new Error(`Webhook failed: ${response.status}`);
  }
  
  return response;
}
```

## GraphQL Security

```javascript
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('@graphql-tools/schema');

// Depth limiting
const depthLimit = require('graphql-depth-limit');

// Query complexity
const { createComplexityLimitRule } = require('graphql-validation-complexity');

const server = new ApolloServer({
  schema,
  validationRules: [
    depthLimit(7), // Limit query depth
    createComplexityLimitRule(1000) // Limit query complexity
  ],
  context: async ({ req }) => {
    // Authenticate
    const token = req.headers.authorization?.split(' ')[1];
    const user = await validateToken(token);
    
    return { user };
  },
  formatError: (error) => {
    // Don't expose internal errors
    if (error.message.startsWith('Database')) {
      return new Error('Internal server error');
    }
    return error;
  }
});

// Field-level authorization
const resolvers = {
  Query: {
    sensitiveData: async (parent, args, context) => {
      if (!context.user || !context.user.isAdmin) {
        throw new Error('Unauthorized');
      }
      
      return await getSensitiveData();
    }
  },
  User: {
    email: (user, args, context) => {
      // Only return email if viewing own profile or admin
      if (context.user.id !== user.id && !context.user.isAdmin) {
        return null;
      }
      
      return user.email;
    }
  }
};
```

## Best Practices Summary

### Authentication
- Use industry-standard protocols (OAuth 2.0, OIDC)
- Implement PKCE for public clients
- Use short-lived access tokens
- Implement refresh token rotation
- Support MFA

### Authorization
- Check permissions on every request
- Implement principle of least privilege
- Use scope-based authorization
- Validate resource ownership
- Implement proper RBAC/ABAC

### Input Validation
- Validate all input
- Use schema validation
- Sanitize query parameters
- Validate file uploads
- Check content types

### Rate Limiting
- Implement multiple levels
- Use sliding windows
- Set appropriate limits
- Return proper headers
- Handle burst traffic

### API Versioning
- Plan for versioning from start
- Support multiple versions
- Communicate deprecation
- Document changes
- Provide migration guides

### Monitoring
- Log all security events
- Monitor rate limits
- Track API usage
- Alert on anomalies
- Audit access patterns

### Documentation
- Secure API documentation
- Require authentication
- Don't expose internal details
- Provide security guidelines
- Include rate limit info

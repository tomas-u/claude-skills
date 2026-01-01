# Secure Coding Practices

## Input Validation

### Principle

Never trust user input. Validate all input on the server side.

### Validation Strategies

**Whitelist Validation (Preferred):**
```javascript
// Good: Whitelist approach
function validateUsername(username) {
  const pattern = /^[a-zA-Z0-9_]{3,20}$/;
  return pattern.test(username);
}

// Good: Enum validation
const ALLOWED_ROLES = ['user', 'admin', 'moderator'];
function validateRole(role) {
  return ALLOWED_ROLES.includes(role);
}
```

**Blacklist Validation (Avoid):**
```javascript
// Bad: Blacklist approach - easy to bypass
function validateInput(input) {
  const dangerous = ['<script', 'javascript:', 'onerror'];
  return !dangerous.some(pattern => input.includes(pattern));
}
// Attacker can use: <ScRiPt>, javas%63ript:, etc.
```

### Input Validation Examples

**Email Validation:**
```javascript
function validateEmail(email) {
  // RFC 5322 compliant
  const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!pattern.test(email)) {
    return false;
  }
  
  // Additional checks
  if (email.length > 254) { // RFC 5321
    return false;
  }
  
  const parts = email.split('@');
  if (parts[0].length > 64) { // Local part max length
    return false;
  }
  
  return true;
}
```

**URL Validation:**
```javascript
function validateUrl(urlString) {
  try {
    const url = new URL(urlString);
    
    // Only allow HTTPS
    if (url.protocol !== 'https:') {
      return false;
    }
    
    // Check domain whitelist
    const allowedDomains = ['example.com', 'api.example.com'];
    if (!allowedDomains.includes(url.hostname)) {
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
}
```

**Numeric Input:**
```javascript
function validateAge(age) {
  const num = parseInt(age, 10);
  
  // Check it's a valid number
  if (isNaN(num)) {
    return false;
  }
  
  // Check range
  if (num < 0 || num > 150) {
    return false;
  }
  
  // Check it hasn't been modified
  if (num.toString() !== age.toString()) {
    return false;
  }
  
  return true;
}
```

**File Upload Validation:**
```javascript
function validateFileUpload(file) {
  // Check file size (10MB max)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error('File too large');
  }
  
  // Check file type by extension
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.pdf'];
  const extension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
  if (!allowedExtensions.includes(extension)) {
    throw new Error('File type not allowed');
  }
  
  // Check MIME type
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (!allowedMimeTypes.includes(file.type)) {
    throw new Error('Invalid file type');
  }
  
  // Validate file content (magic bytes)
  return validateFileContent(file);
}

async function validateFileContent(file) {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer.slice(0, 4));
  
  // JPEG magic bytes
  if (bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) {
    return true;
  }
  
  // PNG magic bytes
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) {
    return true;
  }
  
  // PDF magic bytes
  if (bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) {
    return true;
  }
  
  return false;
}
```

## Output Encoding

### Context-Specific Encoding

**HTML Context:**
```javascript
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Usage
const userInput = '<script>alert("XSS")</script>';
const safe = escapeHtml(userInput);
// Output: &lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;
```

**JavaScript Context:**
```javascript
function escapeJavaScript(unsafe) {
  return unsafe
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/\//g, '\\/')
    .replace(/</g, '\\x3C')
    .replace(/>/g, '\\x3E');
}

// Usage
const script = `var message = "${escapeJavaScript(userInput)}";`;
```

**URL Context:**
```javascript
function escapeUrl(unsafe) {
  return encodeURIComponent(unsafe);
}

// Usage
const searchQuery = 'user input with spaces & symbols';
const url = `/search?q=${escapeUrl(searchQuery)}`;
```

**CSS Context:**
```javascript
function escapeCss(unsafe) {
  return unsafe.replace(/[^a-zA-Z0-9]/g, (char) => {
    return '\\' + char.charCodeAt(0).toString(16) + ' ';
  });
}
```

### React/JSX Automatic Escaping

```jsx
// React automatically escapes in JSX
const UserGreeting = ({ username }) => {
  // Safe - React escapes automatically
  return <div>Hello, {username}!</div>;
};

// UNSAFE - dangerouslySetInnerHTML
const UnsafeComponent = ({ html }) => {
  // Only use if you absolutely trust the source
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

// Safe alternative - use DOMPurify
import DOMPurify from 'dompurify';

const SafeComponent = ({ html }) => {
  const clean = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
};
```

## SQL Injection Prevention

### Parameterized Queries

**Node.js with PostgreSQL:**
```javascript
const { Pool } = require('pg');
const pool = new Pool();

// UNSAFE - SQL Injection
async function getUserUnsafe(username) {
  const query = `SELECT * FROM users WHERE username = '${username}'`;
  const result = await pool.query(query);
  return result.rows[0];
}
// Attack: username = "admin' OR '1'='1"

// SAFE - Parameterized query
async function getUserSafe(username) {
  const query = 'SELECT * FROM users WHERE username = $1';
  const result = await pool.query(query, [username]);
  return result.rows[0];
}
```

**Node.js with MySQL:**
```javascript
const mysql = require('mysql2/promise');

// SAFE - Parameterized query
async function getUser(connection, userId) {
  const [rows] = await connection.execute(
    'SELECT * FROM users WHERE id = ?',
    [userId]
  );
  return rows[0];
}

// SAFE - Named parameters
async function updateUser(connection, userId, email) {
  const [result] = await connection.execute(
    'UPDATE users SET email = :email WHERE id = :userId',
    { userId, email }
  );
  return result;
}
```

**ORM Usage (Sequelize):**
```javascript
const { Op } = require('sequelize');

// SAFE - ORM handles parameterization
async function searchUsers(searchTerm) {
  const users = await User.findAll({
    where: {
      username: {
        [Op.like]: `%${searchTerm}%`
      }
    }
  });
  return users;
}

// UNSAFE - Raw queries without parameters
async function unsafeSearch(searchTerm) {
  const users = await sequelize.query(
    `SELECT * FROM users WHERE username LIKE '%${searchTerm}%'`
  );
  return users[0];
}

// SAFE - Raw query with parameters
async function safeSearch(searchTerm) {
  const users = await sequelize.query(
    'SELECT * FROM users WHERE username LIKE :searchTerm',
    {
      replacements: { searchTerm: `%${searchTerm}%` },
      type: QueryTypes.SELECT
    }
  );
  return users;
}
```

### Dynamic Query Building

```javascript
// SAFE - Build queries safely
function buildSearchQuery(filters) {
  const conditions = [];
  const params = [];
  let paramIndex = 1;
  
  if (filters.username) {
    conditions.push(`username = $${paramIndex}`);
    params.push(filters.username);
    paramIndex++;
  }
  
  if (filters.email) {
    conditions.push(`email = $${paramIndex}`);
    params.push(filters.email);
    paramIndex++;
  }
  
  if (filters.role) {
    conditions.push(`role = $${paramIndex}`);
    params.push(filters.role);
    paramIndex++;
  }
  
  const whereClause = conditions.length > 0 
    ? 'WHERE ' + conditions.join(' AND ')
    : '';
  
  const query = `SELECT * FROM users ${whereClause}`;
  
  return { query, params };
}

// Usage
const filters = { username: 'john', role: 'admin' };
const { query, params } = buildSearchQuery(filters);
const result = await pool.query(query, params);
```

## Authentication Security

### Password Storage

```javascript
const bcrypt = require('bcrypt');
const saltRounds = 12; // Adjust based on security requirements

async function hashPassword(plainPassword) {
  // Generate salt and hash in one step
  const hash = await bcrypt.hash(plainPassword, saltRounds);
  return hash;
}

async function verifyPassword(plainPassword, hash) {
  const match = await bcrypt.compare(plainPassword, hash);
  return match;
}

// Password policy validation
function validatePasswordStrength(password) {
  const errors = [];
  
  if (password.length < 12) {
    errors.push('Password must be at least 12 characters');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain special character');
  }
  
  // Check against common passwords
  const commonPasswords = [
    'password', 'Password123', '123456', 'qwerty'
  ];
  
  if (commonPasswords.includes(password)) {
    errors.push('Password is too common');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}
```

### Secure Session Management

```javascript
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const { createClient } = require('redis');

// Redis client for session storage
const redisClient = createClient({
  host: 'localhost',
  port: 6379
});
redisClient.connect();

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET, // Strong random secret
  name: 'sessionId', // Don't use default name
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true, // HTTPS only
    httpOnly: true, // Not accessible via JavaScript
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
    sameSite: 'strict', // CSRF protection
    domain: 'example.com',
    path: '/'
  }
}));

// Session fixation prevention
app.post('/login', async (req, res) => {
  // ... authentication logic ...
  
  // Regenerate session ID after login
  req.session.regenerate((err) => {
    if (err) {
      return res.status(500).json({ error: 'Session error' });
    }
    
    req.session.userId = user.id;
    req.session.loginTime = Date.now();
    
    res.json({ success: true });
  });
});

// Session timeout check
function checkSessionTimeout(req, res, next) {
  if (req.session.loginTime) {
    const sessionAge = Date.now() - req.session.loginTime;
    const maxAge = 1000 * 60 * 60 * 2; // 2 hours
    
    if (sessionAge > maxAge) {
      req.session.destroy();
      return res.status(401).json({ error: 'Session expired' });
    }
  }
  
  next();
}
```

### JWT Security

```javascript
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Generate secure secret
const SECRET = process.env.JWT_SECRET || crypto.randomBytes(64).toString('hex');
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || crypto.randomBytes(64).toString('hex');

function generateAccessToken(userId) {
  return jwt.sign(
    { userId, type: 'access' },
    SECRET,
    { 
      expiresIn: '15m',
      issuer: 'your-app',
      audience: 'your-app-users'
    }
  );
}

function generateRefreshToken(userId) {
  return jwt.sign(
    { userId, type: 'refresh' },
    REFRESH_SECRET,
    { 
      expiresIn: '7d',
      issuer: 'your-app',
      audience: 'your-app-users'
    }
  );
}

function verifyAccessToken(token) {
  try {
    const payload = jwt.verify(token, SECRET, {
      issuer: 'your-app',
      audience: 'your-app-users'
    });
    
    if (payload.type !== 'access') {
      throw new Error('Invalid token type');
    }
    
    return payload;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

// Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const payload = verifyAccessToken(token);
    req.userId = payload.userId;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}

// Refresh token endpoint
app.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  
  if (!refreshToken) {
    return res.status(401).json({ error: 'No refresh token' });
  }
  
  try {
    const payload = jwt.verify(refreshToken, REFRESH_SECRET);
    
    if (payload.type !== 'refresh') {
      throw new Error('Invalid token type');
    }
    
    // Check if refresh token is revoked (check database)
    const isRevoked = await checkTokenRevocation(payload.userId, refreshToken);
    if (isRevoked) {
      throw new Error('Token revoked');
    }
    
    // Generate new access token
    const accessToken = generateAccessToken(payload.userId);
    
    res.json({ accessToken });
  } catch (error) {
    return res.status(403).json({ error: 'Invalid refresh token' });
  }
});
```

## Authorization

### Role-Based Access Control (RBAC)

```javascript
// Define roles and permissions
const PERMISSIONS = {
  USER_READ: 'user:read',
  USER_WRITE: 'user:write',
  USER_DELETE: 'user:delete',
  ADMIN_READ: 'admin:read',
  ADMIN_WRITE: 'admin:write'
};

const ROLES = {
  user: [PERMISSIONS.USER_READ],
  moderator: [
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_WRITE
  ],
  admin: [
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_WRITE,
    PERMISSIONS.USER_DELETE,
    PERMISSIONS.ADMIN_READ,
    PERMISSIONS.ADMIN_WRITE
  ]
};

// Check permission middleware
function requirePermission(permission) {
  return async (req, res, next) => {
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const userPermissions = ROLES[user.role] || [];
    
    if (!userPermissions.includes(permission)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    next();
  };
}

// Usage
app.delete('/users/:id', 
  authenticateToken,
  requirePermission(PERMISSIONS.USER_DELETE),
  async (req, res) => {
    // Delete user logic
  }
);
```

### Attribute-Based Access Control (ABAC)

```javascript
// Policy engine
class PolicyEngine {
  evaluatePolicy(user, resource, action, context) {
    // Rule 1: Users can only edit their own profile
    if (action === 'edit' && resource.type === 'profile') {
      return resource.ownerId === user.id;
    }
    
    // Rule 2: Admins can edit any profile
    if (action === 'edit' && user.role === 'admin') {
      return true;
    }
    
    // Rule 3: Users can only view public resources or their own
    if (action === 'view') {
      return resource.visibility === 'public' || resource.ownerId === user.id;
    }
    
    // Rule 4: Time-based access (office hours only)
    if (context.requiresOfficeHours) {
      const hour = new Date().getHours();
      const isOfficeHours = hour >= 9 && hour < 17;
      return isOfficeHours && user.role === 'employee';
    }
    
    return false;
  }
}

const policyEngine = new PolicyEngine();

// Middleware
function checkAccess(action) {
  return async (req, res, next) => {
    const user = await User.findById(req.userId);
    const resource = await getResource(req.params.resourceId);
    const context = {
      ipAddress: req.ip,
      requiresOfficeHours: false
    };
    
    const allowed = policyEngine.evaluatePolicy(user, resource, action, context);
    
    if (!allowed) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    next();
  };
}
```

## Error Handling

### Secure Error Responses

```javascript
// Error handling middleware
app.use((err, req, res, next) => {
  // Log full error details server-side
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    timestamp: new Date().toISOString(),
    userId: req.userId,
    path: req.path,
    method: req.method
  });
  
  // Send generic error to client
  if (process.env.NODE_ENV === 'production') {
    res.status(500).json({
      error: 'An error occurred',
      requestId: generateRequestId()
    });
  } else {
    // Development: Send detailed error
    res.status(500).json({
      error: err.message,
      stack: err.stack
    });
  }
});

// Custom error types
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
    this.statusCode = 400;
  }
}

class UnauthorizedError extends Error {
  constructor(message = 'Unauthorized') {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = 401;
  }
}

class ForbiddenError extends Error {
  constructor(message = 'Forbidden') {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = 403;
  }
}

// Usage
app.post('/users', async (req, res, next) => {
  try {
    if (!validateEmail(req.body.email)) {
      throw new ValidationError('Invalid email', 'email');
    }
    
    // ... create user ...
    
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

// Type-specific error handler
app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({
      error: 'Validation failed',
      field: err.field,
      message: err.message
    });
  }
  
  if (err instanceof UnauthorizedError) {
    return res.status(401).json({
      error: 'Authentication required'
    });
  }
  
  if (err instanceof ForbiddenError) {
    return res.status(403).json({
      error: 'Access denied'
    });
  }
  
  next(err);
});
```

## API Security

### Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const Redis = require('ioredis');

const redis = new Redis({
  host: 'localhost',
  port: 6379
});

// General API rate limit
const apiLimiter = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: 'rl:api:'
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: 'Too many requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false
});

// Strict rate limit for auth endpoints
const authLimiter = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: 'rl:auth:'
  }),
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true // Only count failed attempts
});

// Apply rate limiters
app.use('/api/', apiLimiter);
app.use('/auth/', authLimiter);

// Per-user rate limiting
function userRateLimit(maxRequests, windowMs) {
  const store = new Map();
  
  return (req, res, next) => {
    const userId = req.userId;
    const key = `${userId}:${Date.now() / windowMs | 0}`;
    
    const current = store.get(key) || 0;
    
    if (current >= maxRequests) {
      return res.status(429).json({ error: 'Rate limit exceeded' });
    }
    
    store.set(key, current + 1);
    
    // Cleanup old entries
    setTimeout(() => store.delete(key), windowMs);
    
    next();
  };
}
```

### API Key Management

```javascript
const crypto = require('crypto');

// Generate API key
function generateApiKey() {
  const key = crypto.randomBytes(32).toString('hex');
  const hash = crypto.createHash('sha256').update(key).digest('hex');
  
  // Store hash in database, return key to user once
  return { key, hash };
}

// Validate API key
async function validateApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey) {
    return res.status(401).json({ error: 'API key required' });
  }
  
  const hash = crypto.createHash('sha256').update(apiKey).digest('hex');
  
  const keyRecord = await ApiKey.findOne({ hash });
  
  if (!keyRecord) {
    return res.status(401).json({ error: 'Invalid API key' });
  }
  
  if (keyRecord.revoked) {
    return res.status(401).json({ error: 'API key revoked' });
  }
  
  if (keyRecord.expiresAt && keyRecord.expiresAt < Date.now()) {
    return res.status(401).json({ error: 'API key expired' });
  }
  
  // Update last used timestamp
  await ApiKey.updateOne(
    { _id: keyRecord._id },
    { lastUsedAt: Date.now() }
  );
  
  req.apiKeyId = keyRecord._id;
  req.userId = keyRecord.userId;
  
  next();
}
```

## CSRF Protection

```javascript
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

// Setup CSRF protection
app.use(cookieParser());

const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'strict'
  }
});

// Apply to state-changing routes
app.post('/api/users', csrfProtection, async (req, res) => {
  // CSRF token automatically verified
  // ...
});

// Send token to client
app.get('/api/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Client-side usage
// Fetch token
const response = await fetch('/api/csrf-token');
const { csrfToken } = await response.json();

// Include in requests
await fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'CSRF-Token': csrfToken
  },
  body: JSON.stringify(userData)
});
```

## Content Security Policy

```javascript
// Strong CSP configuration
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://cdn.example.com",
      "style-src 'self' 'unsafe-inline' https://cdn.example.com",
      "img-src 'self' data: https:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://api.example.com",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests"
    ].join('; ')
  );
  
  next();
});
```

## Dependency Security

```bash
# Check for vulnerabilities
npm audit

# Fix automatically
npm audit fix

# Force fix (may introduce breaking changes)
npm audit fix --force

# Use Snyk for better scanning
npm install -g snyk
snyk auth
snyk test
snyk monitor

# Keep dependencies updated
npm outdated
npm update
```

## Best Practices Summary

**Input Validation:**
- Validate on server side
- Use whitelist approach
- Validate type, length, format, range
- Reject invalid input

**Output Encoding:**
- Context-specific encoding
- Use framework features when available
- Sanitize HTML if necessary

**Authentication:**
- Use strong password hashing (bcrypt, Argon2)
- Implement MFA
- Prevent brute force attacks
- Secure session management

**Authorization:**
- Principle of least privilege
- Check permissions server-side
- Use RBAC or ABAC

**Error Handling:**
- Don't expose sensitive information
- Log errors securely
- Use custom error pages

**API Security:**
- Rate limiting
- Authentication required
- CORS configuration
- Input validation

**Dependencies:**
- Regular updates
- Vulnerability scanning
- License compliance
- Minimal dependencies

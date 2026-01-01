# OWASP Security Standards

## OWASP Top 10 (2021)

### A01:2021 - Broken Access Control

**Description:**
Access control enforces policy such that users cannot act outside of their intended permissions. Failures typically lead to unauthorized information disclosure, modification, or destruction of data.

**Common Vulnerabilities:**
- Violation of principle of least privilege
- Bypassing access control checks by modifying URL, internal application state, or HTML page
- Permitting viewing or editing someone else's account by providing its unique identifier (insecure direct object references)
- Accessing API with missing access controls for POST, PUT and DELETE
- Elevation of privilege (acting as a user without being logged in, or acting as an admin when logged in as a user)
- Metadata manipulation (replaying or tampering with JWT access control token, cookie or hidden field)
- CORS misconfiguration allowing API access from unauthorized origins
- Force browsing to authenticated pages as an unauthenticated user or to privileged pages as a standard user

**Prevention:**
- Deny by default - except for public resources, deny access by default
- Implement access control mechanisms once and re-use throughout the application
- Model access controls should enforce record ownership rather than accepting that the user can create, read, update, or delete any record
- Disable web server directory listing and ensure file metadata and backup files are not present within web roots
- Log access control failures, alert admins when appropriate
- Rate limit API and controller access to minimize harm from automated attack tools
- Invalidate JWT tokens on the server after logout
- Developers and QA staff should include functional access control unit and integration tests

**Code Example - Vulnerable:**
```javascript
// No authorization check
app.get('/api/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});
```

**Code Example - Secure:**
```javascript
// Proper authorization check
app.get('/api/users/:id', authenticate, async (req, res) => {
  const requestedId = req.params.id;
  const currentUserId = req.user.id;
  
  // Users can only access their own data
  if (requestedId !== currentUserId && !req.user.isAdmin) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  const user = await User.findById(requestedId);
  res.json(user);
});
```

### A02:2021 - Cryptographic Failures

**Description:**
Failures related to cryptography which often lead to sensitive data exposure or system compromise.

**Common Vulnerabilities:**
- Transmitting data in clear text (HTTP, FTP, SMTP)
- Using old or weak cryptographic algorithms or protocols (MD5, SHA1, TLS 1.0)
- Using default, weak, or hard-coded encryption keys
- Not enforcing encryption (missing security headers or directives)
- Using deprecated hash functions for passwords (MD5, SHA-1)
- Lack of proper certificate validation

**Prevention:**
- Classify data processed, stored, or transmitted by application
- Don't store sensitive data unnecessarily. Discard it as soon as possible
- Encrypt all sensitive data at rest
- Ensure up-to-date and strong standard algorithms, protocols, and keys; use proper key management
- Encrypt all data in transit with secure protocols (TLS 1.2+)
- Disable caching for responses containing sensitive data
- Apply required security controls per data classification
- Use authenticated encryption instead of just encryption
- Store passwords using strong adaptive and salted hashing functions (Argon2, scrypt, bcrypt, PBKDF2)
- Initialization vectors must be chosen appropriate for the mode of operation. For many modes, use a CSPRNG
- Always use authenticated encryption when confidentiality is required

**Code Example - Vulnerable:**
```javascript
// Weak password hashing
const crypto = require('crypto');
const hash = crypto.createHash('md5').update(password).digest('hex');
```

**Code Example - Secure:**
```javascript
// Strong password hashing
const bcrypt = require('bcrypt');
const saltRounds = 12;
const hash = await bcrypt.hash(password, saltRounds);

// For data encryption
const crypto = require('crypto');
const algorithm = 'aes-256-gcm';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const cipher = crypto.createCipheriv(algorithm, key, iv);
const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
const authTag = cipher.getAuthTag();
```

### A03:2021 - Injection

**Description:**
Application is vulnerable to injection when user-supplied data is not validated, filtered, or sanitized. Hostile data is used within queries or commands.

**Common Injection Types:**
- SQL injection
- NoSQL injection
- OS command injection
- ORM injection
- LDAP injection
- Expression Language (EL) or OGNL injection
- Cross-Site Scripting (XSS)
- Server-Side Template Injection

**Prevention:**
- Use safe APIs that provide parameterized interface or migrate to ORM
- Use positive server-side input validation
- Escape special characters using specific escape syntax for that interpreter
- Use LIMIT and other SQL controls within queries to prevent mass disclosure in case of SQL injection

**SQL Injection - Vulnerable:**
```javascript
// NEVER DO THIS
const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
db.query(query);
```

**SQL Injection - Secure:**
```javascript
// Use parameterized queries
const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
db.query(query, [username, hashedPassword]);

// Or with ORM
const user = await User.findOne({ 
  where: { username: username } 
});
```

**XSS Prevention:**
```javascript
// Content Security Policy header
res.setHeader('Content-Security-Policy', 
  "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'");

// Output encoding in React (automatic)
const UserProfile = ({ username }) => {
  return <div>{username}</div>; // React auto-escapes
};

// Output encoding manually
const escapeHtml = (unsafe) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};
```

**Command Injection - Vulnerable:**
```javascript
// NEVER DO THIS
const { exec } = require('child_process');
exec(`ping -c 4 ${userInput}`);
```

**Command Injection - Secure:**
```javascript
// Use safe libraries or validate strictly
const { execFile } = require('child_process');
const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

if (!ipRegex.test(userInput)) {
  throw new Error('Invalid IP address');
}

execFile('ping', ['-c', '4', userInput]);
```

### A04:2021 - Insecure Design

**Description:**
Risks related to design and architectural flaws. Missing or ineffective control design.

**Key Concepts:**
- Threat modeling
- Secure design patterns and principles
- Reference architectures
- Paved road methodology

**Prevention:**
- Establish and use secure development lifecycle with security professionals
- Establish and use library of secure design patterns or paved road components
- Use threat modeling for critical authentication, access control, business logic, and key flows
- Integrate security language and controls into user stories
- Integrate plausibility checks at each tier of application
- Write unit and integration tests to validate that all critical flows are resistant to threat model
- Segregate tier layers on system and network layers depending on exposure and protection needs
- Segregate tenants robustly by design throughout all tiers
- Limit resource consumption by user or service

**Secure Design Principles:**
```
1. Defense in Depth: Multiple layers of security controls
2. Fail Securely: Default deny, fail closed
3. Least Privilege: Minimum necessary access
4. Separation of Duties: No single person has complete control
5. Economy of Mechanism: Keep design simple
6. Complete Mediation: Check every access
7. Open Design: Security through design, not obscurity
8. Least Common Mechanism: Minimize sharing
9. Psychological Acceptability: Security should be user-friendly
10. Weakest Link: Security is only as strong as weakest component
```

### A05:2021 - Security Misconfiguration

**Description:**
Missing appropriate security hardening or improperly configured permissions on cloud services, default accounts, verbose error messages, or missing security headers.

**Common Issues:**
- Missing security headers
- Unnecessary features enabled (ports, services, pages, accounts)
- Default accounts with unchanged passwords
- Overly detailed error messages
- Missing or outdated software patches
- Insecure default configurations
- Unused pages, components, or APIs

**Prevention:**
- Implement repeatable hardening process
- Remove or disable unused features, components, frameworks
- Review and update configurations
- Implement segmented application architecture
- Send security directives to clients (security headers)
- Automated process to verify effectiveness of configurations

**Security Headers:**
```javascript
// Express.js example using helmet
const helmet = require('helmet');
app.use(helmet());

// Or manually:
app.use((req, res, next) => {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Enable XSS filter
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // HSTS
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  
  // Content Security Policy
  res.setHeader('Content-Security-Policy', 
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'");
  
  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions Policy
  res.setHeader('Permissions-Policy', 
    'geolocation=(), microphone=(), camera=()');
  
  next();
});
```

### A06:2021 - Vulnerable and Outdated Components

**Description:**
Using components with known vulnerabilities or that are unsupported.

**Prevention:**
- Remove unused dependencies, features, components, files
- Continuously inventory versions of client and server-side components and dependencies
- Monitor sources like CVE and NVD for vulnerabilities
- Only obtain components from official sources over secure links
- Monitor for unmaintained libraries and components
- Use software composition analysis tools
- Subscribe to security bulletins

**Tools:**
```bash
# npm audit for Node.js
npm audit
npm audit fix

# Snyk for vulnerability scanning
npm install -g snyk
snyk test
snyk monitor

# OWASP Dependency-Check
dependency-check --project "MyApp" --scan ./

# Trivy for container scanning
trivy image myimage:latest
```

**Dependency Management:**
```json
// package.json - Pin versions
{
  "dependencies": {
    "express": "4.18.2",
    "helmet": "7.1.0"
  },
  "devDependencies": {
    "eslint": "8.54.0"
  }
}

// Use exact versions in production
npm install --save-exact express
```

### A07:2021 - Identification and Authentication Failures

**Description:**
Confirmation of user's identity, authentication, and session management is critical.

**Common Issues:**
- Permits automated attacks (credential stuffing, brute force)
- Permits default, weak, or well-known passwords
- Uses weak credential recovery processes
- Uses plain text, encrypted, or weakly hashed passwords
- Missing or ineffective multi-factor authentication
- Exposes session identifier in URL
- Reuses session identifier after successful login
- Does not properly invalidate sessions during logout

**Prevention:**
- Implement multi-factor authentication
- Do not ship or deploy with default credentials
- Implement weak password checks
- Align password length, complexity, and rotation policies with NIST 800-63b
- Ensure registration, credential recovery use same messages for all outcomes
- Limit or increasingly delay failed login attempts
- Use server-side, secure, built-in session manager
- Generate new random session IDs with high entropy after login
- Session IDs should not be in URL, securely stored, invalidated after logout

**Secure Authentication:**
```javascript
const bcrypt = require('bcrypt');
const speakeasy = require('speakeasy');

// Password validation
const passwordRequirements = {
  minLength: 12,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true
};

function validatePassword(password) {
  if (password.length < passwordRequirements.minLength) {
    return false;
  }
  
  if (passwordRequirements.requireUppercase && !/[A-Z]/.test(password)) {
    return false;
  }
  
  if (passwordRequirements.requireLowercase && !/[a-z]/.test(password)) {
    return false;
  }
  
  if (passwordRequirements.requireNumbers && !/[0-9]/.test(password)) {
    return false;
  }
  
  if (passwordRequirements.requireSpecialChars && !/[!@#$%^&*]/.test(password)) {
    return false;
  }
  
  return true;
}

// Secure login with rate limiting
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per windowMs
  message: 'Too many login attempts, please try again later'
});

app.post('/login', loginLimiter, async (req, res) => {
  const { username, password, totpToken } = req.body;
  
  const user = await User.findOne({ username });
  
  if (!user) {
    // Same response for non-existent user (prevent user enumeration)
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Check password
  const validPassword = await bcrypt.compare(password, user.passwordHash);
  
  if (!validPassword) {
    // Log failed attempt
    await logFailedLogin(username, req.ip);
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Check MFA if enabled
  if (user.mfaEnabled) {
    const validToken = speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: 'base32',
      token: totpToken,
      window: 1
    });
    
    if (!validToken) {
      return res.status(401).json({ error: 'Invalid MFA token' });
    }
  }
  
  // Generate session
  const sessionId = crypto.randomBytes(32).toString('hex');
  
  await Session.create({
    sessionId,
    userId: user.id,
    expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
  });
  
  res.cookie('sessionId', sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000
  });
  
  res.json({ success: true });
});
```

### A08:2021 - Software and Data Integrity Failures

**Description:**
Code and infrastructure that does not protect against integrity violations.

**Common Issues:**
- Insecure CI/CD pipeline
- Auto-update without integrity verification
- Insecure deserialization
- Untrusted sources, repositories, CDNs

**Prevention:**
- Use digital signatures to verify software is from expected source
- Ensure libraries and dependencies are consuming trusted repositories
- Use software supply chain security tool (OWASP Dependency Check, Snyk)
- Ensure review process for code and configuration changes
- Ensure CI/CD pipeline has proper segregation, configuration, and access control
- Ensure unsigned or unencrypted serialized data is not sent to untrusted clients
- Implement integrity checks or digital signatures

**Supply Chain Security:**
```json
// package-lock.json ensures integrity
{
  "name": "myapp",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "node_modules/express": {
      "version": "4.18.2",
      "resolved": "https://registry.npmjs.org/express/-/express-4.18.2.tgz",
      "integrity": "sha512-5/PsL6iGPdfQ/lKM1UuielYgv3BUoJfz1aUwU9vHZ+J7gyvwdQXFEBIEIaxeGf0GIcreATNyBExtalisDbuMqQ=="
    }
  }
}

// Verify integrity
npm ci --ignore-scripts

// Subresource Integrity for CDN
<script 
  src="https://cdn.example.com/lib.js"
  integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
  crossorigin="anonymous">
</script>
```

### A09:2021 - Security Logging and Monitoring Failures

**Description:**
Insufficient logging and monitoring coupled with missing or ineffective integration with incident response.

**Prevention:**
- Ensure all login, access control, and server-side input validation failures can be logged
- Ensure logs are generated in format that log management solutions can easily consume
- Ensure log data is encoded correctly to prevent injections or attacks
- Ensure high-value transactions have audit trail with integrity controls
- Establish effective monitoring and alerting
- Establish or adopt incident response and recovery plan

**Secure Logging:**
```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Security event logging
function logSecurityEvent(event, severity, userId, ipAddress, details) {
  logger.log({
    level: severity,
    message: event,
    userId: userId,
    ipAddress: ipAddress,
    timestamp: new Date().toISOString(),
    details: details,
    category: 'security'
  });
}

// Usage examples
app.post('/login', async (req, res) => {
  // ... authentication logic ...
  
  if (!validPassword) {
    logSecurityEvent(
      'Failed login attempt',
      'warn',
      username,
      req.ip,
      { reason: 'invalid_password' }
    );
  }
  
  if (user && validPassword) {
    logSecurityEvent(
      'Successful login',
      'info',
      user.id,
      req.ip,
      { mfaUsed: user.mfaEnabled }
    );
  }
});

// Never log sensitive data
logger.info('User updated', {
  userId: user.id,
  // DON'T log: password, SSN, credit cards, etc.
});
```

### A10:2021 - Server-Side Request Forgery (SSRF)

**Description:**
SSRF flaws occur when web application fetches remote resource without validating user-supplied URL.

**Prevention:**
- Sanitize and validate all client-supplied input data
- Enforce URL schema, port, and destination with positive allow list
- Do not send raw responses to clients
- Disable HTTP redirections
- Be aware of URL consistency

**SSRF Prevention:**
```javascript
const url = require('url');

// URL allowlist
const allowedHosts = [
  'api.example.com',
  'cdn.example.com'
];

function validateUrl(targetUrl) {
  try {
    const parsed = new URL(targetUrl);
    
    // Only allow HTTPS
    if (parsed.protocol !== 'https:') {
      throw new Error('Only HTTPS URLs are allowed');
    }
    
    // Check against allowlist
    if (!allowedHosts.includes(parsed.hostname)) {
      throw new Error('Host not in allowlist');
    }
    
    // Prevent private IP ranges
    const hostname = parsed.hostname;
    if (
      hostname === 'localhost' ||
      hostname.startsWith('127.') ||
      hostname.startsWith('10.') ||
      hostname.startsWith('192.168.') ||
      /^172\.(1[6-9]|2[0-9]|3[01])\./.test(hostname)
    ) {
      throw new Error('Private IP addresses not allowed');
    }
    
    return parsed.href;
  } catch (error) {
    throw new Error('Invalid URL');
  }
}

app.post('/fetch-url', async (req, res) => {
  try {
    const targetUrl = validateUrl(req.body.url);
    
    const response = await fetch(targetUrl, {
      redirect: 'manual', // Don't follow redirects
      timeout: 5000
    });
    
    // Don't return raw response
    const data = await response.json();
    res.json({ data });
    
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' });
  }
});
```

## OWASP ASVS (Application Security Verification Standard)

The ASVS provides three levels of security verification:

**Level 1: Opportunistic**
- Basic security controls
- Can be completely penetration tested
- Appropriate for low assurance applications

**Level 2: Standard**
- Most applications
- Contains security controls protecting against most risks
- Recommended for business-to-business and health apps

**Level 3: Advanced**
- Most critical applications
- Requires significant security verification
- For applications performing high value transactions

### Key ASVS Categories

1. Architecture, Design and Threat Modeling
2. Authentication
3. Session Management
4. Access Control
5. Validation, Sanitization and Encoding
6. Stored Cryptography
7. Error Handling and Logging
8. Data Protection
9. Communication
10. Malicious Code
11. Business Logic
12. Files and Resources
13. API and Web Service
14. Configuration

## OWASP Proactive Controls

Top 10 security techniques that should be included in every software development project:

1. Define Security Requirements
2. Leverage Security Frameworks and Libraries
3. Secure Database Access
4. Encode and Escape Data
5. Validate All Inputs
6. Implement Digital Identity
7. Enforce Access Controls
8. Protect Data Everywhere
9. Implement Security Logging and Monitoring
10. Handle All Errors and Exceptions

## OWASP Cheat Sheets

Key cheat sheets to reference:

- Authentication Cheat Sheet
- Authorization Cheat Sheet
- Cross-Site Request Forgery (CSRF) Prevention
- Cross-Site Scripting (XSS) Prevention
- SQL Injection Prevention
- Session Management
- Input Validation
- Password Storage
- REST Security
- Docker Security
- Kubernetes Security
- Secure Cloud Architecture

# OWASP Security Checklist for Code Review

Comprehensive security checklist based on OWASP Top 10 and secure coding practices.

## OWASP Top 10 (2021) Detailed Checks

### A01:2021 - Broken Access Control

**Vertical Privilege Escalation:**
- [ ] Users cannot access admin functions
- [ ] Users cannot modify other users' data
- [ ] API endpoints check user permissions
- [ ] Role-based access control (RBAC) enforced
- [ ] Least privilege principle applied

**Horizontal Privilege Escalation:**
- [ ] Users cannot access other users' resources
- [ ] Object-level authorization checks present
- [ ] Direct object references are protected (no exposed IDs without validation)
- [ ] Session management prevents user impersonation

**Common Vulnerabilities:**
```javascript
// ❌ BAD: No authorization check
app.delete('/api/users/:id', (req, res) => {
  deleteUser(req.params.id);
});

// ✅ GOOD: Verify user owns resource or is admin
app.delete('/api/users/:id', authorize, (req, res) => {
  if (req.user.id !== req.params.id && !req.user.isAdmin) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  deleteUser(req.params.id);
});
```

**Check for:**
- Forced browsing to unauthorized pages
- Parameter tampering (changing IDs in URLs/requests)
- Elevation of privilege through role manipulation
- Metadata manipulation (JWT/cookies)
- CORS misconfiguration allowing unauthorized access

---

### A02:2021 - Cryptographic Failures

**Data in Transit:**
- [ ] HTTPS enforced for all connections
- [ ] TLS 1.2 or higher used
- [ ] HTTP redirects to HTTPS
- [ ] Secure cookies (Secure, HttpOnly, SameSite flags)
- [ ] HSTS header configured

**Data at Rest:**
- [ ] Sensitive data encrypted in database
- [ ] Proper encryption algorithms used (AES-256, RSA-2048+)
- [ ] Encryption keys stored securely (KMS, vault)
- [ ] Keys rotated regularly
- [ ] No hardcoded keys/secrets in code

**Password Storage:**
- [ ] Passwords hashed (never encrypted or plaintext)
- [ ] Strong hashing: bcrypt, argon2, or PBKDF2
- [ ] Sufficient work factor (bcrypt rounds ≥ 10)
- [ ] Salt used (automatic with bcrypt/argon2)

**Common Vulnerabilities:**
```javascript
// ❌ BAD: Plaintext password
user.password = req.body.password;

// ❌ BAD: Weak hashing
user.password = md5(req.body.password);

// ✅ GOOD: Strong hashing with bcrypt
user.password = await bcrypt.hash(req.body.password, 12);
```

**Check for:**
- Sensitive data transmitted over HTTP
- Weak cryptographic algorithms (MD5, SHA1, DES)
- Hardcoded secrets or API keys
- Credentials in logs or error messages
- Sensitive data in URLs or query parameters
- Missing encryption for PII/PHI data

---

### A03:2021 - Injection

**SQL Injection:**
- [ ] Parameterized queries used (prepared statements)
- [ ] No string concatenation in SQL queries
- [ ] ORM/query builder used properly
- [ ] Input validation on all user inputs
- [ ] Least privilege database accounts

**Common Vulnerabilities:**
```javascript
// ❌ BAD: String concatenation
const query = `SELECT * FROM users WHERE email = '${userEmail}'`;
db.query(query);

// ✅ GOOD: Parameterized query
const query = 'SELECT * FROM users WHERE email = ?';
db.query(query, [userEmail]);
```

**Cross-Site Scripting (XSS):**
- [ ] Output encoded for HTML context
- [ ] Content Security Policy (CSP) configured
- [ ] User input sanitized before rendering
- [ ] DOM-based XSS prevented
- [ ] JSON encoded in HTML contexts

**Common Vulnerabilities:**
```javascript
// ❌ BAD: Direct innerHTML with user input
element.innerHTML = userInput;

// ✅ GOOD: Use textContent or sanitize
element.textContent = userInput;
// OR
element.innerHTML = DOMPurify.sanitize(userInput);
```

**Command Injection:**
- [ ] No shell command execution with user input
- [ ] If necessary, use argument arrays (not strings)
- [ ] Input validated against allowlist
- [ ] Alternatives to shell commands considered

**Common Vulnerabilities:**
```javascript
// ❌ BAD: Direct command with user input
exec(`convert ${userFilename} output.png`);

// ✅ GOOD: Use array arguments
execFile('convert', [userFilename, 'output.png']);
```

**Other Injection Types:**
- [ ] LDAP injection prevented
- [ ] XML injection prevented  
- [ ] Template injection prevented
- [ ] NoSQL injection prevented
- [ ] Expression language injection prevented

---

### A04:2021 - Insecure Design

**Threat Modeling:**
- [ ] Security requirements identified
- [ ] Threat model exists for sensitive flows
- [ ] Security controls designed in (not bolted on)
- [ ] Defense in depth implemented

**Business Logic:**
- [ ] Rate limiting on sensitive operations
- [ ] Transaction limits enforced
- [ ] Business rules cannot be bypassed
- [ ] Race conditions prevented
- [ ] Replay attacks prevented

**Common Vulnerabilities:**
```javascript
// ❌ BAD: No rate limiting on money transfer
app.post('/transfer', async (req, res) => {
  await transferMoney(req.user.id, req.body.to, req.body.amount);
});

// ✅ GOOD: Rate limiting + transaction limits
app.post('/transfer', 
  rateLimiter({ max: 10, windowMs: 60000 }),
  async (req, res) => {
    if (req.body.amount > req.user.dailyLimit) {
      return res.status(400).json({ error: 'Daily limit exceeded' });
    }
    await transferMoney(req.user.id, req.body.to, req.body.amount);
  }
);
```

**Input Validation:**
- [ ] Allowlist approach (not blocklist)
- [ ] Validation on server side (not just client)
- [ ] Type checking enforced
- [ ] Length limits enforced
- [ ] Format validation (email, phone, etc.)

---

### A05:2021 - Security Misconfiguration

**Configuration Management:**
- [ ] Default credentials changed
- [ ] Unnecessary features disabled
- [ ] Error messages don't leak sensitive info
- [ ] Stack traces disabled in production
- [ ] Admin interfaces protected

**Security Headers:**
- [ ] Content-Security-Policy configured
- [ ] X-Frame-Options: DENY or SAMEORIGIN
- [ ] X-Content-Type-Options: nosniff
- [ ] Strict-Transport-Security configured
- [ ] Referrer-Policy configured
- [ ] Permissions-Policy configured

**Common Misconfigurations:**
```javascript
// ❌ BAD: Detailed error in production
app.use((err, req, res, next) => {
  res.status(500).json({ 
    error: err.message, 
    stack: err.stack 
  });
});

// ✅ GOOD: Generic error in production
app.use((err, req, res, next) => {
  console.error(err); // Log internally
  res.status(500).json({ 
    error: 'Internal server error' 
  });
});
```

**Environment:**
- [ ] Secrets in environment variables (not code)
- [ ] Different configs for dev/staging/prod
- [ ] Debug mode disabled in production
- [ ] Verbose logging disabled in production
- [ ] Sample data removed from production

---

### A06:2021 - Vulnerable and Outdated Components

**Dependency Management:**
- [ ] All dependencies up to date
- [ ] Known vulnerabilities checked (npm audit, Snyk)
- [ ] Dependencies from trusted sources
- [ ] Minimal dependencies (avoid bloat)
- [ ] License compatibility verified

**Monitoring:**
- [ ] Automated vulnerability scanning in CI/CD
- [ ] Regular dependency updates scheduled
- [ ] Security advisories monitored
- [ ] End-of-life dependencies identified

**Common Issues:**
```bash
# ❌ BAD: Outdated dependencies with vulnerabilities
npm audit
# 23 vulnerabilities (5 high, 18 moderate)

# ✅ GOOD: Up-to-date dependencies
npm audit
# 0 vulnerabilities
```

**Supply Chain Security:**
- [ ] Package lock files committed
- [ ] Integrity hashes verified
- [ ] Suspicious packages identified
- [ ] Typosquatting prevented

---

### A07:2021 - Identification and Authentication Failures

**Password Requirements:**
- [ ] Minimum length enforced (12+ characters)
- [ ] Complexity requirements appropriate
- [ ] No maximum length limit (< 64 is too restrictive)
- [ ] Common passwords blocked (top 10k list)
- [ ] Password history enforced (prevent reuse)

**Multi-Factor Authentication:**
- [ ] MFA available for all users
- [ ] MFA required for sensitive operations
- [ ] TOTP or hardware tokens supported
- [ ] SMS as MFA is discouraged (if possible)

**Session Management:**
- [ ] Secure session tokens (high entropy)
- [ ] Session timeout configured
- [ ] Sessions invalidated on logout
- [ ] Concurrent session limits
- [ ] Session fixation prevented

**Common Vulnerabilities:**
```javascript
// ❌ BAD: Predictable session ID
const sessionId = userId + Date.now();

// ✅ GOOD: Cryptographically random session ID
const sessionId = crypto.randomBytes(32).toString('hex');
```

**Account Security:**
- [ ] Account lockout after failed attempts (5-10 tries)
- [ ] Exponential backoff on repeated failures
- [ ] CAPTCHA on repeated failures
- [ ] Credential stuffing prevention
- [ ] Password reset flow secure (tokens, expiry)

**Authentication Implementation:**
- [ ] No hardcoded credentials
- [ ] Credentials not in URLs/logs
- [ ] Password change requires current password
- [ ] Email enumeration prevented
- [ ] Timing attacks prevented

---

### A08:2021 - Software and Data Integrity Failures

**Code Integrity:**
- [ ] CI/CD pipeline secured
- [ ] Code review required before merge
- [ ] Signed commits enforced
- [ ] Build reproducibility verified
- [ ] Dependencies verified (checksums)

**Auto-Updates:**
- [ ] Updates verified before installation
- [ ] Rollback mechanism available
- [ ] Updates from trusted sources only
- [ ] Update channel secure (HTTPS)

**Deserialization:**
- [ ] Untrusted data not deserialized
- [ ] If necessary, integrity checks performed
- [ ] Allowlist approach for classes
- [ ] Type checking after deserialization

**Common Vulnerabilities:**
```javascript
// ❌ BAD: Deserializing untrusted data
const userData = eval(userInput);

// ❌ BAD: Unsafe JSON parse without validation
const config = JSON.parse(untrustedInput);
config.adminMode = true; // Could be manipulated

// ✅ GOOD: Validate after parsing
const config = JSON.parse(untrustedInput);
if (config.adminMode !== undefined) {
  throw new Error('Invalid configuration');
}
```

---

### A09:2021 - Security Logging and Monitoring Failures

**Logging:**
- [ ] Authentication events logged (success & failure)
- [ ] Authorization failures logged
- [ ] Input validation failures logged
- [ ] High-value transactions logged
- [ ] Security-relevant events logged

**Log Content:**
- [ ] Sufficient context (user, IP, timestamp, action)
- [ ] No sensitive data in logs (passwords, tokens)
- [ ] No PII unless necessary
- [ ] Structured logging format
- [ ] Log integrity protected (append-only)

**Common Issues:**
```javascript
// ❌ BAD: Password in logs
console.log(`Login attempt: ${username}/${password}`);

// ✅ GOOD: Log relevant info without secrets
console.log(`Login attempt: user=${username}, ip=${req.ip}, success=${success}`);
```

**Monitoring & Alerting:**
- [ ] Suspicious activity alerts configured
- [ ] Failed login thresholds monitored
- [ ] Unusual access patterns detected
- [ ] Response plan for alerts
- [ ] Log retention policy defined

**Audit Trail:**
- [ ] Immutable audit logs
- [ ] Critical actions auditable
- [ ] Compliance requirements met
- [ ] Log analysis capabilities

---

### A10:2021 - Server-Side Request Forgery (SSRF)

**Input Validation:**
- [ ] User-provided URLs validated
- [ ] Allowlist of allowed domains
- [ ] IP address blocklist (private ranges)
- [ ] Redirect following disabled/limited
- [ ] URL scheme restricted (http/https only)

**Common Vulnerabilities:**
```javascript
// ❌ BAD: Unvalidated URL from user
app.post('/fetch', async (req, res) => {
  const response = await fetch(req.body.url);
  res.send(response);
});

// ✅ GOOD: Validate against allowlist
const ALLOWED_DOMAINS = ['api.trusted.com', 'cdn.trusted.com'];

app.post('/fetch', async (req, res) => {
  const url = new URL(req.body.url);
  if (!ALLOWED_DOMAINS.includes(url.hostname)) {
    return res.status(400).json({ error: 'Invalid domain' });
  }
  const response = await fetch(url);
  res.send(response);
});
```

**Network Segmentation:**
- [ ] Internal services not accessible from DMZ
- [ ] Metadata endpoints protected (cloud)
- [ ] DNS rebinding prevented
- [ ] Response validation performed

---

## Additional Security Checks

### CSRF (Cross-Site Request Forgery)

- [ ] CSRF tokens on state-changing operations
- [ ] SameSite cookie attribute set
- [ ] Origin header validation
- [ ] Custom headers required for API requests

```javascript
// ✅ GOOD: CSRF protection
app.use(csrf());
app.post('/transfer', csrfProtection, (req, res) => {
  // Only accepts requests with valid CSRF token
});
```

### CORS (Cross-Origin Resource Sharing)

- [ ] CORS configured restrictively
- [ ] Specific origins (not wildcard *)
- [ ] Credentials flag only when necessary
- [ ] Pre-flight requests validated

```javascript
// ❌ BAD: Overly permissive CORS
app.use(cors({ origin: '*', credentials: true }));

// ✅ GOOD: Restrictive CORS
app.use(cors({ 
  origin: 'https://trusted-domain.com',
  credentials: true 
}));
```

### File Upload Security

- [ ] File type validation (allowlist)
- [ ] File size limits enforced
- [ ] Filename sanitized (no path traversal)
- [ ] Virus scanning performed
- [ ] Files stored outside web root
- [ ] Content-Type validation
- [ ] Upload rate limiting

```javascript
// ✅ GOOD: Secure file upload
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

upload.single('file', (req, res) => {
  if (!ALLOWED_TYPES.includes(req.file.mimetype)) {
    return res.status(400).json({ error: 'Invalid file type' });
  }
  if (req.file.size > MAX_SIZE) {
    return res.status(400).json({ error: 'File too large' });
  }
  // Process file...
});
```

### API Security

- [ ] Rate limiting per user/IP
- [ ] API key/token authentication
- [ ] Request size limits
- [ ] Response size limits  
- [ ] GraphQL query depth limits
- [ ] Pagination enforced on collections
- [ ] Version header required

### Mobile-Specific

- [ ] Certificate pinning implemented
- [ ] Local data encrypted
- [ ] No sensitive data in backups
- [ ] Screen capture disabled for sensitive views
- [ ] Jailbreak/root detection
- [ ] Code obfuscation applied

### Regular Expressions

- [ ] No ReDoS vulnerabilities
- [ ] Regex complexity limited
- [ ] Input length checked before regex
- [ ] Timeout on regex operations

```javascript
// ❌ BAD: ReDoS vulnerable
const regex = /^(a+)+$/;
regex.test('aaaaaaaaaaaaaaaaaaaaaaaaaaaa!'); // Hangs

// ✅ GOOD: Safe regex
const regex = /^a+$/;
```

---

## Severity Classification

### 🚨 Critical (Fix Immediately)
- Remote code execution
- SQL injection allowing data access
- Authentication bypass
- Plaintext password storage
- Hardcoded secrets in code

### ⚠️ High (Fix Before Release)
- XSS vulnerabilities
- Broken access control
- Missing encryption for sensitive data
- CSRF on sensitive operations
- Missing rate limiting on auth

### 💡 Medium (Fix Soon)
- Information disclosure
- Weak password requirements
- Missing security headers
- Outdated dependencies with known issues
- Insufficient logging

### 📝 Low (Fix When Possible)
- Missing CSP
- Verbose error messages
- Minor information leakage
- Style/linting issues
- Documentation gaps

---

## Security Testing Recommendations

### Automated Testing
- [ ] Static analysis (SonarQube, Semgrep)
- [ ] Dependency scanning (npm audit, Snyk)
- [ ] SAST in CI/CD pipeline
- [ ] Secret scanning (git-secrets, GitGuardian)

### Manual Testing
- [ ] Peer code review with security focus
- [ ] Penetration testing for critical flows
- [ ] Security regression testing
- [ ] Threat modeling sessions

### Tools Recommendations
- **SAST:** SonarQube, Checkmarx, Veracode
- **DAST:** OWASP ZAP, Burp Suite
- **Dependencies:** Snyk, WhiteSource, Dependabot
- **Secrets:** GitGuardian, TruffleHog
- **Containers:** Trivy, Clair, Anchore

---

## Compliance Considerations

### GDPR
- [ ] Data minimization
- [ ] Purpose limitation
- [ ] Right to erasure implemented
- [ ] Data portability supported
- [ ] Consent mechanism
- [ ] Privacy by design

### PCI DSS
- [ ] Cardholder data encrypted
- [ ] PAN never logged
- [ ] Network segmentation
- [ ] Access logging
- [ ] Regular security testing

### HIPAA
- [ ] PHI encrypted at rest and in transit
- [ ] Audit logs comprehensive
- [ ] Access controls granular
- [ ] Business associate agreements
- [ ] Breach notification process

---

## Quick Security Code Review Checklist

Use this for rapid reviews:

**Authentication & Authorization**
- [ ] Authentication required for all protected endpoints
- [ ] Authorization checks verify resource ownership
- [ ] Role-based access control enforced
- [ ] Session management secure

**Input Validation**
- [ ] All user input validated
- [ ] Allowlist approach used
- [ ] Type and format checked
- [ ] Length limits enforced

**Output Encoding**
- [ ] HTML output encoded
- [ ] SQL queries parameterized
- [ ] JSON properly escaped
- [ ] No unsafe eval/exec

**Cryptography**
- [ ] HTTPS enforced
- [ ] Passwords hashed with bcrypt/argon2
- [ ] Sensitive data encrypted
- [ ] No hardcoded secrets

**Error Handling**
- [ ] Generic errors shown to users
- [ ] Detailed errors logged securely
- [ ] No stack traces in production
- [ ] No sensitive data in errors

**Dependencies**
- [ ] No known vulnerabilities
- [ ] Up to date
- [ ] Minimal dependencies
- [ ] Verified sources

**Configuration**
- [ ] Security headers configured
- [ ] CORS restrictive
- [ ] Debug mode off in production
- [ ] Secrets in environment variables

**Logging & Monitoring**
- [ ] Security events logged
- [ ] No sensitive data in logs
- [ ] Alerts configured
- [ ] Audit trail exists

---

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

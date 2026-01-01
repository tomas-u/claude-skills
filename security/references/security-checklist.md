# Security Review Checklist

Comprehensive checklist for security architecture and implementation reviews.

## Quick Checklist

Use this for rapid architecture security reviews:

### Authentication & Authorization
- [ ] Strong authentication required for all protected resources
- [ ] Multi-factor authentication available for privileged access
- [ ] Password requirements meet standards (12+ chars, complexity)
- [ ] Account lockout after failed attempts
- [ ] Secure password reset flow
- [ ] Session timeout configured appropriately
- [ ] Session management secure (httpOnly, secure, SameSite cookies)
- [ ] No credentials in code, logs, or URLs
- [ ] Authorization checked server-side for all operations
- [ ] Principle of least privilege applied
- [ ] Direct object references protected
- [ ] Horizontal privilege escalation prevented
- [ ] Vertical privilege escalation prevented
- [ ] API endpoints properly protected

### Input Validation & Output Encoding
- [ ] All input validated server-side
- [ ] Whitelist validation approach used
- [ ] Parameterized queries for all database operations
- [ ] Input length limits enforced
- [ ] File upload restrictions (type, size)
- [ ] Content-Type validation
- [ ] XSS prevention in place (output encoding)
- [ ] Context-aware encoding used
- [ ] Content Security Policy configured
- [ ] Safe HTML rendering
- [ ] JSON properly encoded

### Cryptography & Data Protection
- [ ] HTTPS enforced for all connections
- [ ] TLS 1.2+ required
- [ ] Strong algorithms (AES-256, RSA-2048+)
- [ ] No custom cryptographic implementations
- [ ] Proper key management (KMS, Vault)
- [ ] Keys rotated regularly
- [ ] Secure random number generation
- [ ] Certificate validation enabled
- [ ] Sensitive data encrypted at rest
- [ ] PII properly protected
- [ ] Data retention policies implemented
- [ ] Secure data disposal process
- [ ] Database encryption enabled where needed

### Error Handling & Logging
- [ ] No sensitive information in error messages
- [ ] Generic error pages for production
- [ ] Stack traces not exposed to users
- [ ] Errors logged securely (internal only)
- [ ] Proper exception handling
- [ ] Security events logged
- [ ] Logs protected from tampering (immutable)
- [ ] No sensitive data in logs
- [ ] Centralized logging implemented
- [ ] Alerting configured for security events
- [ ] Audit trail maintained

### Configuration & Infrastructure
- [ ] Security headers configured (CSP, HSTS, X-Frame-Options, etc.)
- [ ] CORS properly configured (not wildcard *)
- [ ] Default credentials changed
- [ ] Debug mode disabled in production
- [ ] Unnecessary services disabled
- [ ] Security patches applied regularly
- [ ] Network segmentation implemented
- [ ] Firewall rules configured (least privilege)
- [ ] Container security (non-root, minimal base images)
- [ ] Secrets management (no hardcoded secrets)
- [ ] Infrastructure as Code security scanned

### Dependencies & Supply Chain
- [ ] Dependency scanning enabled
- [ ] No known vulnerable dependencies
- [ ] Regular dependency updates scheduled
- [ ] License compliance verified
- [ ] SBOM (Software Bill of Materials) generated
- [ ] Dependencies from trusted sources only
- [ ] Minimal dependencies (avoid bloat)

### API Security
- [ ] API authentication required
- [ ] Rate limiting implemented
- [ ] Request size limits enforced
- [ ] Response size limits enforced
- [ ] API versioning in place
- [ ] GraphQL query depth limits (if applicable)
- [ ] Pagination enforced on collections
- [ ] API documentation includes security considerations

### Cloud Security (if applicable)
- [ ] Least privilege IAM policies
- [ ] No public storage buckets
- [ ] Encryption at rest enabled
- [ ] Network isolation (VPC, security groups)
- [ ] Monitoring and alerting configured
- [ ] Cloud security posture management enabled
- [ ] Resource tagging for security governance

### Monitoring & Incident Response
- [ ] Security monitoring in place
- [ ] Intrusion detection configured
- [ ] SIEM integration (if required)
- [ ] Incident response plan documented
- [ ] Incident response team identified
- [ ] Regular security drills conducted
- [ ] Post-incident review process defined

---

## Detailed Checklists by Domain

### Authentication Architecture

**Password-based Authentication:**
- [ ] Minimum 12 characters required
- [ ] Complexity requirements (mix of character types)
- [ ] No maximum length restriction (or 64+ chars)
- [ ] Common passwords blocked (top 10k list)
- [ ] Password history enforced (prevent reuse of last 5)
- [ ] Password change requires current password
- [ ] Passwords hashed with bcrypt, argon2, or PBKDF2
- [ ] Sufficient work factor (bcrypt rounds ≥ 12)
- [ ] No password hints or security questions

**Multi-Factor Authentication:**
- [ ] MFA available for all users
- [ ] MFA required for privileged accounts
- [ ] TOTP or hardware tokens supported
- [ ] Backup codes provided
- [ ] SMS MFA discouraged (prefer app-based)
- [ ] MFA recovery process secure

**Session Management:**
- [ ] Cryptographically random session IDs
- [ ] Session timeout appropriate (15-30 min for sensitive apps)
- [ ] Sessions invalidated on logout
- [ ] Concurrent session limits (if appropriate)
- [ ] Session fixation prevented
- [ ] Cookie flags set (httpOnly, secure, SameSite)
- [ ] CSRF protection enabled

**OAuth 2.0 / OIDC:**
- [ ] PKCE used for public clients
- [ ] State parameter validated
- [ ] Nonce validated (OIDC)
- [ ] Redirect URI validation (exact match)
- [ ] Access token short-lived (15 min or less)
- [ ] Refresh token rotation implemented
- [ ] Tokens not in localStorage (use httpOnly cookies)
- [ ] Proper scopes defined and enforced

---

### Authorization Patterns

**Role-Based Access Control (RBAC):**
- [ ] Roles clearly defined
- [ ] Least privilege principle applied
- [ ] Default deny approach
- [ ] Role assignments reviewed regularly
- [ ] Separation of duties enforced
- [ ] No role bypasses in code

**Attribute-Based Access Control (ABAC):**
- [ ] Attributes clearly defined
- [ ] Policy decision point centralized
- [ ] Policies version controlled
- [ ] Policy testing automated
- [ ] Audit logging for policy evaluations

**API Authorization:**
- [ ] Every endpoint has authorization check
- [ ] Authorization at gateway AND service level
- [ ] Object-level authorization (not just endpoint-level)
- [ ] No authorization logic in frontend
- [ ] Service-to-service authentication

---

### Data Protection

**Encryption at Rest:**
- [ ] Database encryption enabled
- [ ] File storage encryption enabled
- [ ] Backup encryption enabled
- [ ] Key management system used (KMS)
- [ ] Keys separate from encrypted data
- [ ] Key rotation schedule defined
- [ ] Encryption algorithms appropriate (AES-256)

**Encryption in Transit:**
- [ ] HTTPS enforced (no HTTP)
- [ ] TLS 1.2 minimum, TLS 1.3 preferred
- [ ] Strong cipher suites only
- [ ] Certificate validation enforced
- [ ] Certificate pinning (mobile apps)
- [ ] HSTS header configured
- [ ] Internal service communication encrypted (mTLS)

**Key Management:**
- [ ] Keys stored in KMS/Vault
- [ ] Keys never in code or config files
- [ ] Key rotation automated
- [ ] Access to keys logged and monitored
- [ ] Key backup and recovery process defined
- [ ] Different keys for different environments

**Data Classification:**
- [ ] Data classification scheme defined
- [ ] PII identified and tracked
- [ ] Sensitive data handling procedures
- [ ] Data retention policies per classification
- [ ] Data disposal procedures per classification

---

### Network Security

**Network Segmentation:**
- [ ] DMZ for public-facing services
- [ ] Private subnets for databases
- [ ] Management subnet isolated
- [ ] Network zones defined by trust level
- [ ] East-west traffic inspected (not just north-south)

**Firewall Rules:**
- [ ] Default deny all
- [ ] Explicit allow rules only
- [ ] Rules reviewed regularly
- [ ] Unused rules removed
- [ ] Rule documentation up to date
- [ ] Logging enabled for denied traffic

**Cloud Network Security:**
- [ ] VPC properly configured
- [ ] Security groups follow least privilege
- [ ] Network ACLs configured
- [ ] VPC Flow Logs enabled
- [ ] No direct internet access for private resources
- [ ] Bastion hosts for admin access

---

### API Security

**Authentication:**
- [ ] API keys for identification only (not authentication)
- [ ] OAuth 2.0 for user authorization
- [ ] Service accounts for machine-to-machine
- [ ] API keys rotated regularly
- [ ] Key management secure (not in code)

**Rate Limiting:**
- [ ] Rate limits per user/API key
- [ ] Rate limits per IP address
- [ ] Burst protection
- [ ] 429 status code returned when limited
- [ ] Rate limit headers included in response

**Input Validation:**
- [ ] Request schema validation
- [ ] Query parameter validation
- [ ] Path parameter validation
- [ ] Header validation
- [ ] Body size limits
- [ ] Request timeout configured

**API Design:**
- [ ] RESTful principles followed
- [ ] Proper HTTP methods used
- [ ] Status codes meaningful
- [ ] Versioning strategy defined
- [ ] Deprecation process documented
- [ ] API documentation complete

**GraphQL Specific:**
- [ ] Query depth limiting
- [ ] Query complexity analysis
- [ ] Introspection disabled in production
- [ ] Field-level authorization
- [ ] Batching limits
- [ ] Persistent queries (allowlist)

---

### Container Security

**Image Security:**
- [ ] Base images from trusted sources
- [ ] Minimal base images (Alpine, distroless)
- [ ] Regular image updates/rebuilds
- [ ] Image vulnerability scanning
- [ ] No secrets in images
- [ ] Multi-stage builds used

**Container Runtime:**
- [ ] Containers run as non-root
- [ ] Read-only root filesystem where possible
- [ ] Capabilities dropped (Linux capabilities)
- [ ] Resource limits set (CPU, memory)
- [ ] Host network not shared
- [ ] Privileged mode not used

**Kubernetes Security:**
- [ ] RBAC enabled and configured
- [ ] Pod Security Standards enforced
- [ ] Network policies configured
- [ ] Secrets encrypted at rest
- [ ] API server access restricted
- [ ] Admission controllers configured
- [ ] Runtime security monitoring (Falco, etc.)

---

### CI/CD Security

**Pipeline Security:**
- [ ] Secrets stored in secure vault
- [ ] No secrets in build logs
- [ ] Build environment isolated
- [ ] Signed commits required
- [ ] Code review required before merge
- [ ] Automated security scanning in pipeline
- [ ] Artifact signing and verification

**SAST (Static Analysis):**
- [ ] SAST tool integrated in CI/CD
- [ ] Fail build on high/critical issues
- [ ] Results reviewed regularly
- [ ] False positives managed

**Dependency Scanning:**
- [ ] Automated dependency scanning
- [ ] Fail build on high/critical vulnerabilities
- [ ] Dependency updates automated (Dependabot, Renovate)
- [ ] License compliance checked

**Container Scanning:**
- [ ] Image vulnerability scanning
- [ ] Fail build on high/critical vulnerabilities
- [ ] Runtime scanning for drift

**IaC Security:**
- [ ] Terraform/CloudFormation scanned
- [ ] Misconfigurations detected
- [ ] Policy as code (OPA) enforced
- [ ] State files secured

---

## Compliance-Specific Checklists

### GDPR Compliance

**Data Protection Principles:**
- [ ] Lawful basis for processing defined
- [ ] Purpose limitation implemented
- [ ] Data minimization practiced
- [ ] Accuracy maintained
- [ ] Storage limitation enforced
- [ ] Integrity and confidentiality ensured

**Data Subject Rights:**
- [ ] Right to access implemented
- [ ] Right to rectification implemented
- [ ] Right to erasure (right to be forgotten) implemented
- [ ] Right to data portability implemented
- [ ] Right to object implemented
- [ ] Right to withdraw consent implemented

**Privacy by Design:**
- [ ] Privacy impact assessment conducted
- [ ] Data protection by default
- [ ] Privacy-enhancing technologies used
- [ ] Data breach notification process
- [ ] DPO appointed (if required)

### PCI DSS Compliance

**Build and Maintain Secure Network:**
- [ ] Firewall configuration managed
- [ ] Default credentials changed
- [ ] Cardholder data protected

**Protect Cardholder Data:**
- [ ] Cardholder data encrypted
- [ ] Strong cryptography used
- [ ] Encryption keys managed

**Vulnerability Management:**
- [ ] Anti-virus software deployed
- [ ] Secure systems and applications
- [ ] Security patches applied

**Access Control:**
- [ ] Access restricted to business need-to-know
- [ ] Unique IDs for each person with computer access
- [ ] Physical access restricted

**Monitoring and Testing:**
- [ ] All access logged and monitored
- [ ] Security systems and processes tested

**Information Security Policy:**
- [ ] Security policy maintained
- [ ] Security awareness training provided

### SOC 2 Type II

**Security:**
- [ ] Access controls implemented
- [ ] Encryption implemented
- [ ] Change management process
- [ ] Risk assessment conducted

**Availability:**
- [ ] Monitoring and incident response
- [ ] Business continuity planning
- [ ] Disaster recovery tested

**Processing Integrity:**
- [ ] Data processing accurate and complete
- [ ] Errors detected and corrected

**Confidentiality:**
- [ ] Confidential data protected
- [ ] Data classification implemented

**Privacy:**
- [ ] Privacy notice provided
- [ ] Consent obtained
- [ ] Data subject rights respected

---

## Security Testing Checklist

**Threat Modeling:**
- [ ] Assets identified
- [ ] Threats identified (STRIDE)
- [ ] Attack scenarios documented
- [ ] Mitigations defined

**Static Analysis (SAST):**
- [ ] Code scanned for vulnerabilities
- [ ] False positives triaged
- [ ] Critical issues addressed

**Dynamic Analysis (DAST):**
- [ ] Running application tested
- [ ] Authentication tested
- [ ] Authorization tested
- [ ] Input validation tested

**Penetration Testing:**
- [ ] External penetration test conducted
- [ ] Internal penetration test conducted
- [ ] Findings documented
- [ ] Remediation verified

**Security Regression Testing:**
- [ ] Security test cases defined
- [ ] Automated security tests in CI/CD
- [ ] Tests run on every change

---

## Incident Response Checklist

**Preparation:**
- [ ] Incident response plan documented
- [ ] Incident response team identified
- [ ] Communication plan defined
- [ ] Tools and access prepared

**Detection and Analysis:**
- [ ] Security monitoring in place
- [ ] Alerts configured
- [ ] Incident classification criteria
- [ ] Initial assessment process

**Containment:**
- [ ] Short-term containment procedures
- [ ] Long-term containment procedures
- [ ] Evidence preservation procedures

**Eradication:**
- [ ] Root cause analysis process
- [ ] Removal of threat procedures
- [ ] System hardening procedures

**Recovery:**
- [ ] System restoration procedures
- [ ] Validation testing procedures
- [ ] Monitoring for recurrence

**Post-Incident:**
- [ ] Lessons learned session
- [ ] Incident documentation
- [ ] Process improvements identified
- [ ] Training updates

---

## Quick Risk Assessment

Use this to quickly assess security risk:

**Confidentiality Impact:**
- High: Sensitive data exposed (PII, financial, health)
- Medium: Internal data exposed
- Low: Public data exposed

**Integrity Impact:**
- High: Critical data can be modified
- Medium: Important data can be modified
- Low: Non-critical data can be modified

**Availability Impact:**
- High: Critical system unavailable
- Medium: Important feature unavailable
- Low: Minor feature unavailable

**Likelihood:**
- High: Easy to exploit, well-known vulnerability
- Medium: Moderate difficulty, some skill required
- Low: Difficult to exploit, requires significant expertise

**Risk = Impact × Likelihood**

| Impact | Likelihood | Risk Level |
|--------|-----------|-----------|
| High | High | 🚨 Critical |
| High | Medium | ⚠️ High |
| High | Low | 💡 Medium |
| Medium | High | ⚠️ High |
| Medium | Medium | 💡 Medium |
| Medium | Low | 📝 Low |
| Low | High | 💡 Medium |
| Low | Medium | 📝 Low |
| Low | Low | 📝 Low |

---

This checklist should be used as a starting point. Specific requirements may vary based on:
- Industry regulations
- Data sensitivity
- Threat landscape
- Organizational risk tolerance
- Compliance requirements

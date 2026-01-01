---
name: security
description: Expert security architect providing comprehensive security guidance, architecture assessments, threat modeling, and compliance verification. Follows OWASP, NIS2, ISO 27001, NIST, and industry best practices. Use for security architecture design and review, threat modeling, security strategy, compliance assessment (OWASP, NIS2, GDPR, PCI DSS, SOC 2), infrastructure security, API security patterns, and incident response planning. For code-level security reviews, use the code-review skill.
---

# Security Architecture Skill

Expert security architect providing comprehensive security guidance, architecture assessments, threat modeling, and compliance verification.

## Quick Decision Guide

**What do you need?**

```
Code-level security review (SQL injection, XSS, etc.)
  → Use: code-review skill (detailed OWASP code analysis)

Architecture security review (design patterns, infrastructure)
  → Use: THIS skill (architecture, threat modeling, strategy)

Threat modeling for a feature/system
  → Use: THIS skill (STRIDE, attack scenarios)

Compliance assessment (GDPR, PCI DSS, SOC 2)
  → Use: THIS skill (compliance frameworks, gap analysis)

Security strategy and roadmap
  → Use: THIS skill (risk assessment, controls prioritization)

API security patterns
  → Use: THIS skill + references/api-security.md

Infrastructure/cloud security
  → Use: THIS skill (network, container, cloud controls)
```

## Scope of This Skill

### This Skill Covers (Architecture Level)
- Security architecture design and validation
- Threat modeling (STRIDE, attack trees)
- Risk assessment and prioritization
- Security controls strategy
- Compliance frameworks and gap analysis
- Infrastructure and cloud security
- API security architecture
- Identity and access management architecture
- Zero-trust architecture
- Defense-in-depth strategy
- Incident response planning

### Use code-review Skill For
- Line-by-line code security review
- Specific vulnerability detection (SQL injection, XSS)
- OWASP Top 10 code-level checks
- Secure coding practice validation
- Dependency vulnerability assessment

### Both Skills Together For
- Comprehensive security assessment (architecture + code)
- Pre-release security validation
- Security audit preparation

## Pre-Assessment Checklist

Before starting a security review, gather:

### Context
- [ ] What are you reviewing? (Feature, system, architecture, infrastructure)
- [ ] What stage? (Design, development, pre-production, production)
- [ ] Who are the users? (Internal, external, privileged)
- [ ] What data is involved? (PII, financial, health, sensitive)

### Technical Details
- [ ] Architecture diagrams (if available)
- [ ] Technology stack (languages, frameworks, cloud provider)
- [ ] Authentication/authorization approach
- [ ] Data flow diagrams
- [ ] Integration points (APIs, third-party services)

### Compliance Requirements
- [ ] Required standards (GDPR, PCI DSS, HIPAA, SOC 2, NIS2)
- [ ] Industry regulations
- [ ] Internal security policies
- [ ] Data residency requirements

### References to Load
- [ ] **For OWASP guidance:** references/owasp-standards.md
- [ ] **For API security:** references/api-security.md
- [ ] **For NIS2 compliance:** references/nis2-compliance.md
- [ ] **For secure coding:** references/secure-coding.md

## Core Capabilities

### 1. Security Architecture Review
Evaluate and design secure system architectures:
- Defense-in-depth strategy
- Zero-trust principles
- Secure network architecture
- Cloud security architecture (AWS, Azure, GCP)
- Microservices security patterns
- API gateway and service mesh security

### 2. Threat Modeling
Identify and assess security threats:
- STRIDE analysis (Spoofing, Tampering, Repudiation, Information Disclosure, DoS, Elevation of Privilege)
- Attack tree modeling
- Risk assessment (likelihood × impact)
- Attack surface analysis
- Data flow threat analysis

### 3. Compliance Assessment
Verify compliance with security standards:
- **OWASP:** Top 10, ASVS (Application Security Verification Standard)
- **NIS2:** Network and Information Security Directive
- **ISO 27001:2022:** Information security management
- **NIST:** Cybersecurity Framework
- **GDPR:** Data protection and privacy
- **PCI DSS:** Payment card security
- **SOC 2:** Trust services criteria
- **HIPAA:** Healthcare data protection

### 4. Security Controls Design
Plan and implement security controls:
- Authentication architecture (OAuth, SAML, OIDC, MFA)
- Authorization patterns (RBAC, ABAC, policy-based)
- Encryption strategy (at rest, in transit, key management)
- Logging and monitoring architecture
- Incident detection and response
- Security testing strategy

### 5. Infrastructure Security
Secure infrastructure and deployment:
- Network segmentation
- Firewall rules and security groups
- Container security (Docker, Kubernetes)
- CI/CD pipeline security
- Secrets management (Vault, KMS)
- Certificate management
- Infrastructure as Code security

### 6. Risk Assessment
Evaluate and prioritize security risks:
- Asset identification and valuation
- Threat and vulnerability assessment
- Risk scoring (CVSS, custom matrices)
- Risk treatment planning
- Security roadmap development

## Security Domains Covered

### Application Security (Architecture)
- Authentication architecture
- Authorization patterns
- Session management strategy
- API security patterns
- Security headers and policies
- Input validation strategy
- Error handling architecture

### Infrastructure Security
- Network architecture and segmentation
- Cloud security (AWS, Azure, GCP)
- Container orchestration security
- Database security architecture
- Load balancer and WAF configuration
- DDoS protection
- CDN security

### Data Security
- Encryption architecture (at rest, in transit)
- Key management strategy
- Data classification framework
- Privacy by design
- Data retention and disposal
- Tokenization and masking
- Backup security

### Identity and Access Management
- Identity provider architecture
- Authentication protocols (OAuth 2.0, SAML, OIDC)
- Multi-factor authentication strategy
- Single sign-on (SSO) architecture
- Privileged access management
- Identity federation
- Just-in-time access

### Supply Chain Security
- Vendor security assessment
- Software composition analysis
- SBOM (Software Bill of Materials) generation
- Dependency management strategy
- Third-party risk assessment
- License compliance

## Common Security Patterns

### Authentication Patterns
- **OAuth 2.0 + PKCE:** For single-page applications
- **JWT with refresh tokens:** Token rotation strategy
- **Session-based:** For traditional web apps
- **Mutual TLS:** For service-to-service
- **API key + OAuth:** For public APIs
- **Passwordless:** FIDO2, WebAuthn, magic links

### Authorization Patterns
- **RBAC:** Role-based access control
- **ABAC:** Attribute-based access control
- **Policy-based:** Centralized policy engine (OPA)
- **Resource-based:** Permissions per resource
- **Hierarchical roles:** Inherited permissions
- **Just-in-time access:** Temporary elevated permissions

### Data Protection Patterns
- **Envelope encryption:** Data key encrypted by master key
- **Key rotation:** Automated periodic key updates
- **Tokenization:** Replace sensitive data with tokens
- **Data masking:** Hide sensitive data in non-prod
- **Secure backup:** Encrypted, immutable backups
- **Zero-knowledge:** Server never sees plaintext

### API Security Patterns
- **API Gateway:** Centralized auth, rate limiting, monitoring
- **Rate limiting:** Token bucket, sliding window
- **Request signing:** HMAC or digital signatures
- **API versioning:** Deprecation strategy
- **GraphQL security:** Query depth limits, complexity analysis
- **Backend for Frontend (BFF):** Per-client API layer

### Microservices Security
- **Service mesh:** Automatic mTLS (Istio, Linkerd)
- **Sidecar proxy:** Security policies per service
- **API gateway auth:** Centralized authentication
- **Service-to-service auth:** JWT, mTLS, service accounts
- **Distributed tracing:** Security event correlation
- **Circuit breaker:** Prevent cascade failures

### Cloud Security Patterns
- **Least privilege IAM:** Minimal permissions
- **Network isolation:** VPC, subnets, security groups
- **Encryption by default:** KMS for all sensitive data
- **Immutable infrastructure:** Replace, don't patch
- **Secrets management:** Parameter Store, Secrets Manager
- **Security monitoring:** CloudWatch, GuardDuty, Security Hub

## Severity Classification

Use this to prioritize security findings:

### 🚨 Critical (Fix Immediately)
- **Impact:** Complete system compromise, data breach, RCE
- **Examples:** 
  - Unauthenticated access to admin functions
  - SQL injection allowing data exfiltration
  - Hardcoded production credentials
  - Complete authentication bypass
- **Timeline:** Fix within 24-48 hours
- **Requires:** Immediate escalation, emergency patch

### ⚠️ High (Fix Before Production/Release)
- **Impact:** Significant security breach, data exposure
- **Examples:**
  - Missing authentication on sensitive endpoints
  - Weak encryption (MD5, SHA1)
  - Insufficient access controls
  - Exposed internal APIs
  - Missing rate limiting on critical operations
- **Timeline:** Fix within 1 week
- **Requires:** Security review sign-off before release

### 💡 Medium (Fix in Next Sprint)
- **Impact:** Moderate risk, potential for escalation
- **Examples:**
  - Missing security headers
  - Weak password requirements
  - Insufficient logging
  - Outdated dependencies (no active exploits)
  - Information disclosure
- **Timeline:** Fix within 2-4 weeks
- **Requires:** Plan remediation, track in backlog

### 📝 Low (Fix When Possible)
- **Impact:** Minimal immediate risk, defense-in-depth
- **Examples:**
  - Verbose error messages
  - Missing DNSSEC
  - Recommended but not required headers
  - Best practice violations (not vulnerabilities)
- **Timeline:** Address in regular maintenance
- **Requires:** Documentation, consideration for future

## Response Format

### For Architecture Review

```markdown
# Security Architecture Assessment: [System Name]

**Assessment Date:** [Date]
**Scope:** [What was reviewed]
**Risk Level:** [Critical/High/Medium/Low]

---

## Executive Summary
[2-3 sentence overview of security posture]

---

## Threat Model

**Assets:**
- [Data, systems, functions requiring protection]

**Threat Actors:**
- External attackers (motivation, capabilities)
- Insider threats (malicious, negligent)
- Automated threats (bots, scrapers)

**Attack Scenarios:**
1. [Scenario name]
   - Entry Point: [How attacker gains initial access]
   - Attack Path: [Step-by-step progression]
   - Impact: [What attacker achieves]
   - Likelihood: [Probability: High/Medium/Low]
   - Existing Controls: [Current protections]
   - Gaps: [What's missing]

---

## Security Findings

### 🚨 Critical Issues
1. [Issue Title] - [Location]
   - **Vulnerability:** [Description]
   - **Attack Vector:** [How it can be exploited]
   - **Impact:** [Consequences if exploited]
   - **Affected Components:** [Systems/services]
   - **OWASP/CWE Reference:** [Standard reference]
   - **Recommendation:** [How to fix]
   - **Example Implementation:** [Code/config snippet]

### ⚠️ High Priority Issues
[Same format as critical]

### 💡 Medium Priority Issues
[Same format as critical]

---

## Required Security Controls

**Authentication:**
- [Requirements and recommendations]

**Authorization:**
- [Requirements and recommendations]

**Data Protection:**
- [Requirements and recommendations]

**Monitoring & Detection:**
- [Requirements and recommendations]

**Incident Response:**
- [Requirements and recommendations]

---

## Compliance Assessment

**OWASP Compliance:**
- ✅ Addressed: [Items]
- ❌ Gaps: [Items]

**[Other Standards]:**
- [Same format]

---

## Architecture Recommendations

1. [Recommendation]
   - **Benefit:** [Why this improves security]
   - **Implementation:** [How to implement]
   - **Priority:** [Critical/High/Medium/Low]
   - **Effort:** [Estimate]

---

## Security Roadmap

**Phase 1 (Immediate - 0-2 weeks):**
- [Critical items]

**Phase 2 (Short-term - 2-8 weeks):**
- [High priority items]

**Phase 3 (Medium-term - 2-6 months):**
- [Medium priority items]

---

## Resources & References
- [OWASP guidance links]
- [Compliance documentation]
- [Implementation guides]
```

### For Threat Modeling

```markdown
# Threat Model: [Feature/System Name]

**Modeling Method:** STRIDE
**Date:** [Date]
**Participants:** [Who was involved]

---

## System Overview
[Brief description of what's being modeled]

**Data Flow:**
[User] → [Component A] → [Component B] → [Data Store]

---

## Assets at Risk
- [Asset 1]: [Value/sensitivity]
- [Asset 2]: [Value/sensitivity]

---

## STRIDE Analysis

### Spoofing (Identity)
**Threats:**
- [Specific threat]

**Existing Controls:**
- [Current mitigations]

**Gaps:**
- [Missing controls]

**Recommendations:**
- [What to implement]

### Tampering (Integrity)
[Same format]

### Repudiation (Non-repudiation)
[Same format]

### Information Disclosure (Confidentiality)
[Same format]

### Denial of Service (Availability)
[Same format]

### Elevation of Privilege (Authorization)
[Same format]

---

## Attack Scenarios

### Scenario 1: [Attack Name]
**Attacker Profile:** [Skills, resources, motivation]
**Prerequisites:** [What attacker needs]
**Attack Steps:**
1. [Step]
2. [Step]
3. [Step]

**Impact:** [Consequences]
**Likelihood:** [High/Medium/Low]
**Risk Score:** [Impact × Likelihood]

**Mitigations:**
- [Control 1]
- [Control 2]

---

## Risk Summary

| Threat | Likelihood | Impact | Risk | Mitigation Priority |
|--------|-----------|--------|------|-------------------|
| [Threat] | [H/M/L] | [H/M/L] | [Score] | [Critical/High/Med/Low] |

---

## Recommended Controls

**Immediate (Critical):**
1. [Control with implementation details]

**Short-term (High):**
1. [Control with implementation details]

**Medium-term:**
1. [Control with implementation details]
```

### For Compliance Assessment

```markdown
# Compliance Assessment: [Standard Name]

**Standard:** [GDPR/PCI DSS/SOC 2/NIS2/etc.]
**Assessment Date:** [Date]
**Scope:** [Systems/processes reviewed]
**Overall Status:** [Compliant/Partial/Non-Compliant]

---

## Executive Summary
[Overview of compliance status]

---

## Requirements Assessment

### [Requirement Category]

**Requirement:** [Specific requirement text]
**Status:** ✅ Compliant / ⚠️ Partial / ❌ Non-Compliant

**Evidence:**
- [What demonstrates compliance]

**Gaps:**
- [What's missing]

**Recommendations:**
- [How to achieve compliance]

**Priority:** [Critical/High/Medium/Low]

---

## Compliance Gap Analysis

### Critical Gaps (Must Fix)
1. [Requirement not met]
   - **Standard Reference:** [Section/article]
   - **Current State:** [What exists]
   - **Required State:** [What's needed]
   - **Impact if not fixed:** [Consequences]
   - **Remediation:** [Steps to comply]
   - **Timeline:** [Estimated effort]

### High Priority Gaps
[Same format]

### Medium Priority Gaps
[Same format]

---

## Remediation Roadmap

**Phase 1 (Compliance Critical):**
- [Items that must be fixed for compliance]
- Timeline: [X weeks]

**Phase 2 (Risk Reduction):**
- [Items that reduce compliance risk]
- Timeline: [X weeks]

**Phase 3 (Best Practices):**
- [Items that exceed minimum requirements]
- Timeline: [X months]

---

## Ongoing Compliance Requirements

**Regular Activities:**
- [Audit logs review - frequency]
- [Access review - frequency]
- [Policy updates - frequency]
- [Training - frequency]

**Documentation to Maintain:**
- [List of required documentation]

**Monitoring & Reporting:**
- [What to monitor]
- [Reporting requirements]

---

## Resources
- [Standard documentation links]
- [Implementation guides]
- [Certification/attestation info]
```

## Integration with Other Skills

### With code-review Skill
```
Security Skill: Architecture and threat modeling
         ↓
    Identifies security requirements
         ↓
code-review Skill: Validates code implementation
         ↓
    Reports code-level vulnerabilities
         ↓
Security Skill: Assesses overall security posture
```

**When to use both:**
- Pre-production security validation
- Security audit preparation
- Incident investigation
- Compliance assessment

### With technical-architecture Skill
```
Technical Architecture: Designs system
         ↓
Security Skill: Reviews security implications
         ↓
    Identifies security gaps and requirements
         ↓
Technical Architecture: Incorporates security controls
         ↓
Security Skill: Validates implementation
```

### With devops Skill
```
DevOps: Designs CI/CD pipeline
         ↓
Security Skill: Reviews pipeline security
         ↓
    Identifies security gaps (secrets, scanning, etc.)
         ↓
DevOps: Implements security controls
         ↓
Security Skill: Validates secure deployment
```

## Common Security Mistakes to Avoid

### Architecture Mistakes
- ❌ Security as an afterthought (bolt-on vs built-in)
- ❌ Single point of failure for security controls
- ❌ Insufficient network segmentation
- ❌ Over-reliance on perimeter security
- ❌ No defense in depth
- ❌ Trusting internal network implicitly

### Authentication/Authorization Mistakes
- ❌ Rolling your own authentication
- ❌ Client-side only authorization checks
- ❌ JWT in localStorage (XSS risk)
- ❌ No session timeout
- ❌ Missing multi-factor authentication for privileged access
- ❌ Weak password requirements

### Data Protection Mistakes
- ❌ Unencrypted sensitive data at rest
- ❌ HTTP for sensitive data transmission
- ❌ Encryption keys in code or config
- ❌ No key rotation strategy
- ❌ PII in logs or error messages
- ❌ Weak encryption algorithms (DES, MD5, SHA1)

### API Security Mistakes
- ❌ No rate limiting
- ❌ Excessive data exposure
- ❌ Missing input validation
- ❌ Lack of authentication on internal APIs
- ❌ No API versioning/deprecation strategy
- ❌ GraphQL introspection enabled in production

### Cloud Security Mistakes
- ❌ Public S3 buckets
- ❌ Overly permissive IAM policies
- ❌ Default security group rules
- ❌ No encryption at rest
- ❌ Shared credentials
- ❌ No monitoring or alerting

### Compliance Mistakes
- ❌ Assuming cloud provider handles all compliance
- ❌ No data classification
- ❌ Insufficient audit logging
- ❌ No data retention policy
- ❌ Missing incident response plan
- ❌ No regular security assessments

## Best Practices

### Defense in Depth
Layer multiple security controls:
1. **Perimeter:** Firewall, WAF, DDoS protection
2. **Network:** Segmentation, IDS/IPS
3. **Application:** Authentication, authorization, input validation
4. **Data:** Encryption, tokenization, masking
5. **Monitoring:** Logging, alerting, SIEM

### Zero Trust Principles
- Never trust, always verify
- Assume breach
- Verify explicitly (every request)
- Use least privilege access
- Segment access (micro-segmentation)
- Monitor and respond continuously

### Secure by Design
- Security requirements defined early
- Threat modeling in design phase
- Security controls built-in (not bolted-on)
- Secure defaults
- Privacy by design
- Fail securely

### Security Testing Strategy
**Shift Left:**
- Threat modeling (design phase)
- Static analysis (SAST) in IDE/CI
- Dependency scanning (CI/CD)
- Infrastructure as Code scanning

**Regular Testing:**
- Dynamic analysis (DAST)
- Penetration testing
- Security regression testing
- Compliance audits

**Continuous:**
- Vulnerability scanning
- Security monitoring
- Threat intelligence
- Incident response drills

## Key References

See `references/` directory for detailed guidance:

- **references/owasp-standards.md** - OWASP Top 10, ASVS, detailed vulnerability information
- **references/api-security.md** - API security patterns, authentication, rate limiting
- **references/nis2-compliance.md** - NIS2 Directive requirements for critical infrastructure
- **references/secure-coding.md** - Secure coding practices across languages

Load these files when needed for specific guidance.

## Example Usage

### Scenario 1: Architecture Review

**User:** "Review the security of our new microservices architecture. We're using Kubernetes, PostgreSQL, and React frontend. Authentication via JWT."

**Security Architect:**
1. Loads references/api-security.md for API patterns
2. Performs threat model using STRIDE
3. Reviews:
   - JWT storage and transmission
   - Service-to-service authentication
   - Network policies in Kubernetes
   - Database access controls
   - API gateway security
4. Identifies critical issues (e.g., JWT in localStorage)
5. Provides architecture recommendations
6. Creates security roadmap with priorities

### Scenario 2: Compliance Assessment

**User:** "We need to comply with NIS2 for our critical infrastructure. What do we need?"

**Security Architect:**
1. Loads references/nis2-compliance.md
2. Reviews requirements against current state
3. Performs gap analysis
4. Creates compliance roadmap
5. Documents required controls
6. Provides implementation guidance

### Scenario 3: Threat Modeling

**User:** "Threat model our new payment processing feature"

**Security Architect:**
1. Loads references/owasp-standards.md for PCI DSS guidance
2. Creates data flow diagram
3. Performs STRIDE analysis
4. Identifies attack scenarios
5. Assesses risk levels
6. Recommends security controls
7. Documents threat model

---

**This skill provides strategic security guidance at the architecture level. For detailed code security review with line-by-line vulnerability detection, use the code-review skill.**

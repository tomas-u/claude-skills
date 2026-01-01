# NIS2 Directive Compliance

## Overview

The NIS2 Directive (Network and Information Systems Directive 2) is an EU-wide legislation on cybersecurity that came into effect October 2024. It updates and replaces the original NIS Directive from 2016.

## Scope and Applicability

### Essential Entities

Large organizations (250+ employees or €50M+ revenue) in critical sectors:
- Energy (electricity, oil, gas, hydrogen)
- Transport (air, rail, water, road)
- Banking and financial market infrastructure
- Health (healthcare providers, laboratories)
- Drinking water supply and distribution
- Waste water management
- Digital infrastructure (internet exchange points, DNS, TLD registries, cloud services, data centers)
- ICT service management (managed service providers, managed security service providers)
- Public administration
- Space

### Important Entities

Medium/large organizations in:
- Postal and courier services
- Waste management
- Chemicals production and distribution
- Food production and distribution
- Manufacturing (medical devices, electronics, machinery, motor vehicles)
- Digital providers (online marketplaces, search engines, social networks)
- Research organizations

## Key Requirements

### 1. Risk Management Measures

Organizations must implement technical, operational and organizational measures to manage cybersecurity risks.

#### Technical Measures

**Access Control:**
```
Required Controls:
- Multi-factor authentication for privileged accounts
- Principle of least privilege
- Regular access reviews
- Segregation of duties
- Just-in-time access for privileged operations

Implementation Example (Node.js):
const accessControl = {
  requireMFA: true,
  sessionTimeout: 15 * 60 * 1000, // 15 minutes
  maxFailedAttempts: 3,
  lockoutDuration: 30 * 60 * 1000, // 30 minutes
  privilegedAccessLogging: true,
  accessReviewInterval: 90 // days
};
```

**Asset Management:**
```
Required:
- Inventory of all information assets
- Classification of assets by criticality
- Data flow mapping
- Network topology documentation
- Software bill of materials (SBOM)

Asset Register Example:
{
  "asset_id": "DB-PROD-001",
  "type": "database",
  "classification": "critical",
  "data_types": ["PII", "financial"],
  "owner": "data-team",
  "location": "eu-west-1",
  "encryption": "AES-256",
  "backup_frequency": "hourly",
  "last_reviewed": "2024-12-01"
}
```

**Cryptography:**
```
Required:
- Encryption of data at rest
- Encryption of data in transit
- Key management procedures
- Use of approved cryptographic algorithms

Approved Algorithms:
- Symmetric: AES-256
- Asymmetric: RSA-4096, ECC (P-384, P-521)
- Hash: SHA-256, SHA-384, SHA-512
- Password: Argon2id, scrypt, bcrypt
- TLS: TLS 1.3 (or TLS 1.2 minimum)

Implementation:
const crypto = require('crypto');

// Data encryption at rest
const algorithm = 'aes-256-gcm';
const key = crypto.scryptSync(masterKey, 'salt', 32);

function encryptData(plaintext) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  
  const encrypted = Buffer.concat([
    cipher.update(plaintext, 'utf8'),
    cipher.final()
  ]);
  
  const authTag = cipher.getAuthTag();
  
  return {
    encrypted: encrypted.toString('base64'),
    iv: iv.toString('base64'),
    authTag: authTag.toString('base64')
  };
}
```

**Network Security:**
```
Required:
- Network segmentation
- Firewall configuration
- Intrusion detection/prevention
- Secure remote access (VPN, zero-trust)
- DDoS protection

Network Segmentation Example:
Zone 1 (DMZ):
  - Web application servers
  - Load balancers
  - Public-facing APIs
  - Firewall rules: Internet → DMZ (HTTPS only)

Zone 2 (Application):
  - Application servers
  - Business logic
  - Firewall rules: DMZ → App (specific ports only)

Zone 3 (Database):
  - Database servers
  - File storage
  - Firewall rules: App → DB (database ports only)
  - No internet access

Zone 4 (Management):
  - Admin access
  - Monitoring systems
  - Firewall rules: Restricted IPs only, MFA required
```

**Vulnerability Management:**
```
Required:
- Regular vulnerability scanning
- Patch management process
- Security updates within defined SLAs
- Penetration testing

Patch Management SLAs:
- Critical vulnerabilities: 7 days
- High vulnerabilities: 30 days
- Medium vulnerabilities: 90 days
- Low vulnerabilities: Next maintenance window

Scanning Schedule:
- External vulnerability scan: Weekly
- Internal vulnerability scan: Weekly
- Authenticated scan: Monthly
- Web application scan: Weekly
- Container image scan: On build
- Dependency scan: Daily (CI/CD)
```

#### Operational Measures

**Backup and Recovery:**
```
Required:
- Regular backups of critical data
- Offsite backup storage
- Backup encryption
- Regular restoration testing
- Documented recovery procedures

Backup Policy:
{
  "backupSchedule": {
    "databases": {
      "full": "daily 02:00 UTC",
      "incremental": "every 6 hours",
      "transaction_log": "every 15 minutes"
    },
    "files": {
      "full": "weekly Sunday 01:00 UTC",
      "differential": "daily 03:00 UTC"
    }
  },
  "retention": {
    "daily": 30,  // 30 days
    "weekly": 52, // 52 weeks
    "monthly": 84, // 7 years
    "yearly": 10   // 10 years
  },
  "encryption": "AES-256",
  "offsite": true,
  "geo_redundancy": ["eu-west-1", "eu-central-1"],
  "restoration_testing": "quarterly"
}
```

**Incident Response:**
```
Required:
- Incident response plan
- Incident classification
- Response procedures
- Communication plan
- Post-incident review

Incident Severity Levels:
Critical (P0):
  - Response time: Immediate
  - Resolution target: 4 hours
  - Examples: Data breach, ransomware, system unavailability
  - Escalation: C-level, authorities notification required

High (P1):
  - Response time: 1 hour
  - Resolution target: 24 hours
  - Examples: Security control failure, attempted breach

Medium (P2):
  - Response time: 4 hours
  - Resolution target: 7 days
  - Examples: Policy violations, minor vulnerabilities

Low (P3):
  - Response time: 24 hours
  - Resolution target: 30 days
  - Examples: General security inquiries
```

**Business Continuity:**
```
Required:
- Business impact analysis
- Recovery time objectives (RTO)
- Recovery point objectives (RPO)
- Continuity plans
- Regular testing

Example RTO/RPO:
Service: Customer-facing web application
  - RTO: 4 hours
  - RPO: 15 minutes
  - Criticality: Critical
  - Alternative: Read-only mode
  
Service: Internal reporting
  - RTO: 2 business days
  - RPO: 24 hours
  - Criticality: Important
  - Alternative: Manual processes
```

#### Organizational Measures

**Security Governance:**
```
Required:
- Information security policy
- Roles and responsibilities
- Security steering committee
- Regular management reviews
- Budget allocation

Governance Structure:
CISO (Chief Information Security Officer)
  ├── Security Operations Center (SOC)
  ├── Security Architecture Team
  ├── Vulnerability Management
  ├── Incident Response Team
  ├── Security Awareness & Training
  └── Compliance & Risk Management
```

**Human Resources Security:**
```
Required:
- Background checks for privileged access
- Security awareness training
- Role-based training
- Acceptable use policy
- Termination procedures

Training Requirements:
All Employees:
  - Security awareness: Annual
  - Phishing simulation: Quarterly
  - Data protection: Annual

Developers:
  - Secure coding: Annual
  - OWASP Top 10: Annual
  - Security testing: Bi-annual

Administrators:
  - System hardening: Annual
  - Incident response: Bi-annual
  - Security tools: As needed
```

**Supply Chain Security:**
```
Required:
- Vendor security assessment
- Contract security requirements
- Third-party monitoring
- Supplier risk management

Vendor Assessment Criteria:
- ISO 27001 certification
- SOC 2 Type II report
- Data processing agreement
- Incident notification < 24 hours
- Right to audit
- Subprocessor approval
- Data location requirements (EU)
- Encryption requirements
```

### 2. Incident Reporting

**Notification Timelines:**

Early Warning (within 24 hours):
- Become aware of significant incident
- Report to national CSIRT/competent authority
- Information: What happened, when, initial impact
- Preliminary assessment only

Incident Notification (within 72 hours):
- Initial assessment complete
- Update with more details:
  - Nature and severity
  - Indicators of compromise
  - Likely cause
  - Affected systems and users

Final Report (within 1 month):
- Detailed incident report
- Root cause analysis
- Impact assessment
- Remediation actions
- Lessons learned

**What Constitutes a Significant Incident:**
- Causes severe operational disruption
- Affects critical services
- Causes financial loss
- Affects large number of users
- Involves personal data breach
- Cross-border impact

**Reporting Template:**
```
Incident ID: INC-2024-001
Reported: 2024-12-27 14:30 UTC
Reporter: security@example.com

Classification:
  - Severity: Critical
  - Type: Ransomware attack
  - Status: Contained
  - Cross-border: Yes

Impact:
  - Services affected: Customer portal
  - Users affected: ~10,000
  - Data involved: Customer records
  - Financial impact: Under investigation
  - Operational impact: Service unavailable

Timeline:
  - Detection: 2024-12-27 12:00 UTC
  - Containment: 2024-12-27 14:00 UTC
  - Authority notified: 2024-12-27 14:30 UTC

Technical Details:
  - Attack vector: Phishing email
  - Malware family: [Redacted for report]
  - Entry point: Workstation
  - Lateral movement: Yes
  - Data exfiltration: Under investigation

Containment Measures:
  - Network segment isolated
  - Affected systems shut down
  - Password reset initiated
  - Forensic investigation started

Next Steps:
  - Complete forensic analysis
  - Restore from backups
  - Enhanced monitoring
  - User notification (if required)
```

### 3. Security of Network and Information Systems

**Required Capabilities:**

**Security Monitoring:**
```
Minimum Logging Requirements:
- Authentication events (success/failure)
- Authorization decisions
- Administrative actions
- System configuration changes
- Network traffic (anomalies)
- Application errors
- Security control alerts

Log Retention:
- Security logs: 12 months minimum
- Audit logs: 7 years (for some sectors)
- Transaction logs: Per regulatory requirements

SIEM Requirements:
- Real-time correlation
- Automated alerting
- Threat intelligence integration
- Compliance reporting
- Long-term storage
```

**Secure Development:**
```
Required Practices:
- Security requirements in design
- Threat modeling
- Secure code review
- Security testing (SAST/DAST)
- Dependency scanning
- Security sign-off before production

SDLC Security Gates:
Requirements Phase:
  - [ ] Security requirements defined
  - [ ] Privacy impact assessment
  - [ ] Compliance review

Design Phase:
  - [ ] Threat model completed
  - [ ] Security architecture review
  - [ ] Data flow diagrams

Development Phase:
  - [ ] Secure coding standards followed
  - [ ] Static analysis (SAST) passed
  - [ ] Dependency scan passed
  - [ ] Code review completed

Testing Phase:
  - [ ] Dynamic analysis (DAST) passed
  - [ ] Penetration test passed
  - [ ] Security test cases passed

Deployment Phase:
  - [ ] Security configuration verified
  - [ ] Monitoring configured
  - [ ] Runbook includes security
  - [ ] Security sign-off obtained
```

### 4. Management Obligations

**Management Body Responsibilities:**

Top management must:
- Approve cybersecurity risk management measures
- Oversee implementation
- Participate in cybersecurity training
- Assess effectiveness of measures
- Follow recommendations from national authorities

**Accountability:**
- Management can be held personally liable
- Sanctions for non-compliance
- Duty of care obligations

**Documentation Requirements:**
```
Required Documentation:
- Information security policy
- Risk assessment reports
- Incident response plan
- Business continuity plan
- Asset inventory
- Network diagrams
- Vendor agreements
- Training records
- Audit reports
- Incident reports
```

## Compliance Checklist

### Technical Controls

- [ ] Multi-factor authentication implemented
- [ ] Encryption at rest configured (AES-256)
- [ ] Encryption in transit configured (TLS 1.3/1.2)
- [ ] Network segmentation implemented
- [ ] Firewall rules documented and reviewed
- [ ] Intrusion detection system deployed
- [ ] Vulnerability scanning (weekly)
- [ ] Patch management process (7/30/90 day SLAs)
- [ ] Secure remote access (VPN/zero-trust)
- [ ] DDoS protection configured
- [ ] Web application firewall deployed
- [ ] Database encryption enabled
- [ ] Backup encryption enabled
- [ ] Key management system implemented
- [ ] Security logging enabled
- [ ] SIEM system deployed
- [ ] Antivirus/EDR deployed

### Operational Controls

- [ ] Incident response plan documented
- [ ] Incident response team defined
- [ ] 24-hour incident notification process
- [ ] Business continuity plan documented
- [ ] Disaster recovery plan documented
- [ ] Backup procedures documented
- [ ] Backup restoration tested (quarterly)
- [ ] RTO/RPO defined for critical systems
- [ ] Change management process
- [ ] Configuration management process
- [ ] Access review process (quarterly)
- [ ] Privileged access management

### Organizational Controls

- [ ] Information security policy approved
- [ ] CISO or equivalent role designated
- [ ] Security governance structure defined
- [ ] Management training completed
- [ ] Employee security awareness training (annual)
- [ ] Secure development lifecycle implemented
- [ ] Vendor security assessment process
- [ ] Third-party contracts include security requirements
- [ ] Asset inventory maintained
- [ ] Data classification scheme defined
- [ ] Privacy impact assessments completed
- [ ] Compliance monitoring process

### Documentation

- [ ] Risk assessment report (annual)
- [ ] Network topology diagrams
- [ ] Data flow diagrams
- [ ] SBOM for all applications
- [ ] Security policies and procedures
- [ ] Incident response playbooks
- [ ] Business continuity plans
- [ ] Training completion records
- [ ] Vendor security assessments
- [ ] Penetration test reports (annual)
- [ ] Audit logs (12 months retention)

## Penalties for Non-Compliance

**Essential Entities:**
- Up to €10 million or 2% of worldwide annual turnover (whichever is higher)

**Important Entities:**
- Up to €7 million or 1.4% of worldwide annual turnover (whichever is higher)

**Additional Consequences:**
- Reputational damage
- Customer loss
- Regulatory scrutiny
- Management liability
- Mandatory public disclosure

## NIS2 vs. GDPR

While both apply to EU organizations, they have different focus:

**NIS2:**
- Focus: Cybersecurity and operational resilience
- Scope: Critical infrastructure and digital services
- Requirements: Technical security measures, incident reporting
- Penalties: Up to 2% turnover

**GDPR:**
- Focus: Personal data protection and privacy
- Scope: Any processing of EU personal data
- Requirements: Data protection, consent, rights
- Penalties: Up to 4% turnover

**Overlap:**
- Both require encryption
- Both require incident reporting (different timelines)
- Both require data protection impact assessments
- Both have breach notification requirements

**Integration Approach:**
- Align security policies
- Unified incident response
- Combined compliance monitoring
- Shared governance structure

## Implementation Roadmap

**Phase 1: Assessment (Months 1-2)**
- Determine if NIS2 applies
- Gap analysis against requirements
- Risk assessment
- Budget planning

**Phase 2: Planning (Months 2-3)**
- Prioritize gaps
- Define implementation plan
- Assign responsibilities
- Procure tools/services

**Phase 3: Implementation (Months 3-12)**
- Deploy technical controls
- Implement processes
- Conduct training
- Update documentation

**Phase 4: Testing (Months 12-15)**
- Test incident response
- Test business continuity
- Conduct penetration testing
- Validate controls

**Phase 5: Continuous Improvement (Ongoing)**
- Monitor compliance
- Regular audits
- Update based on threats
- Annual reviews

## Resources

**Official Sources:**
- NIS2 Directive (EU) 2022/2555
- ENISA (European Union Agency for Cybersecurity)
- National CSIRT contact points
- National competent authorities

**Standards:**
- ISO/IEC 27001:2022
- ISO/IEC 27002:2022
- NIST Cybersecurity Framework
- CIS Controls

**Tools:**
- ENISA NIS2 compliance checker
- ISO 27001 gap assessment tools
- SIEM solutions (Splunk, ELK, etc.)
- Vulnerability scanners (Nessus, Qualys, etc.)

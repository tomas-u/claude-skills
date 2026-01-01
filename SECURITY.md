# Security Architecture Skill Package (Renamed from "security-architect")

Expert security architecture guidance for system design, threat modeling, compliance assessment, and security strategy.

## What Changed

### Renamed
- **Old name:** `security-architect`
- **New name:** `security`

### Major Improvements

1. **Quick Decision Guide** - Know immediately when to use this vs code-review skill
2. **Pre-Assessment Checklist** - Gather all context before starting
3. **Clear Scope Definition** - Architecture-level security (not code-level)
4. **Severity Classification** - Critical/High/Medium/Low with clear criteria
5. **Better Response Templates** - More detailed, actionable formats
6. **Integration Guidance** - How to use with code-review, technical-architecture, devops
7. **Common Security Mistakes** - By category (architecture, auth, data, API, cloud, compliance)
8. **Moved Checklist to References** - Keep SKILL.md lean, load checklist when needed

### New Reference File
- **security-checklist.md** - Comprehensive review checklist (moved from SKILL.md)

## Skill Scope

### This Skill Covers (Architecture Level)
- ✅ Security architecture design and validation
- ✅ Threat modeling (STRIDE, attack trees)
- ✅ Risk assessment and prioritization
- ✅ Security controls strategy
- ✅ Compliance frameworks (GDPR, PCI DSS, SOC 2, NIS2)
- ✅ Infrastructure and cloud security
- ✅ API security architecture
- ✅ Identity and access management architecture
- ✅ Zero-trust architecture
- ✅ Defense-in-depth strategy
- ✅ Incident response planning

### Use code-review Skill For
- ❌ Line-by-line code security review
- ❌ Specific vulnerability detection (SQL injection, XSS)
- ❌ OWASP Top 10 code-level checks
- ❌ Secure coding practice validation
- ❌ Dependency vulnerability assessment

### Both Skills Together For
- 🔄 Comprehensive security assessment (architecture + code)
- 🔄 Pre-release security validation
- 🔄 Security audit preparation

## Installation

### Via Claude.ai
1. Go to **Settings** → **Skills**
2. Upload the `security` folder
3. Skill will be named "security"

### Manual
1. Copy `security/` to `/mnt/skills/user/security/`
2. Restart Claude or reload skills

## Package Structure

```
security/
├── SKILL.md                          # Main skill (architecture guidance)
└── references/
    ├── security-checklist.md         # NEW: Comprehensive security checklist
    ├── owasp-standards.md            # OWASP Top 10, ASVS
    ├── api-security.md               # API security patterns
    ├── nis2-compliance.md            # NIS2 Directive requirements
    └── secure-coding.md              # Secure coding practices
```

## Key Features

### Quick Decision Guide
Helps you immediately know which skill to use:
- Code review? → Use code-review skill
- Architecture review? → Use this skill
- Threat modeling? → Use this skill
- Compliance assessment? → Use this skill

### Pre-Assessment Checklist
Ensures Claude gathers all necessary context:
- What are you reviewing?
- What stage of development?
- What data is involved?
- What compliance requirements?

### Severity Classification
Clear criteria for prioritizing findings:
- 🚨 **Critical** - Fix within 24-48 hours
- ⚠️ **High** - Fix within 1 week
- 💡 **Medium** - Fix within 2-4 weeks
- 📝 **Low** - Address in regular maintenance

### Comprehensive Response Templates
- Architecture Review (with threat model)
- Threat Modeling (STRIDE analysis)
- Compliance Assessment (gap analysis)

### Integration Guidance
Clear workflows for using with other skills:
- security + code-review
- security + technical-architecture
- security + devops

### Common Security Mistakes
Organized by category to avoid:
- Architecture mistakes
- Authentication/authorization mistakes
- Data protection mistakes
- API security mistakes
- Cloud security mistakes
- Compliance mistakes

## Usage Examples

### Example 1: Architecture Review

```
You: "Review the security of our microservices architecture using Kubernetes, 
PostgreSQL, React frontend, JWT authentication"

Security Skill:
1. Loads api-security.md for patterns
2. Creates threat model using STRIDE
3. Reviews:
   - JWT storage and transmission
   - Service-to-service authentication
   - Kubernetes network policies
   - Database access controls
   - API gateway security
4. Identifies critical issues
5. Provides architecture recommendations
6. Creates security roadmap
```

### Example 2: Threat Modeling

```
You: "Threat model our new payment processing feature"

Security Skill:
1. Loads owasp-standards.md for PCI DSS
2. Creates data flow diagram
3. Performs STRIDE analysis:
   - Spoofing threats
   - Tampering threats
   - Repudiation threats
   - Information Disclosure threats
   - Denial of Service threats
   - Elevation of Privilege threats
4. Identifies attack scenarios
5. Assesses risk levels
6. Recommends security controls
```

### Example 3: Compliance Assessment

```
You: "We need to comply with GDPR and SOC 2. What do we need?"

Security Skill:
1. Reviews requirements
2. Performs gap analysis
3. Documents compliance status
4. Creates remediation roadmap with priorities
5. Documents ongoing compliance requirements
```

### Example 4: Combined with code-review

```
You: "Complete security audit of our authentication system"

Workflow:
1. Security skill: Reviews authentication architecture
   - Identifies architectural issues
   - Recommends patterns
   
2. code-review skill: Reviews authentication code
   - Identifies code-level vulnerabilities
   - Validates implementation
   
3. Security skill: Provides overall assessment
   - Combines findings
   - Prioritizes remediation
   - Creates security roadmap
```

## What's Included

### Core Capabilities
- Security architecture design
- Threat modeling (STRIDE, attack trees)
- Risk assessment
- Compliance verification (OWASP, NIS2, GDPR, PCI DSS, SOC 2, HIPAA)
- Infrastructure security (cloud, containers, network)
- API security patterns
- IAM architecture
- Incident response planning

### Security Domains
- Application Security (architecture)
- Infrastructure Security
- Data Security
- Identity and Access Management
- Supply Chain Security

### Security Patterns
- Authentication patterns (OAuth, JWT, MFA)
- Authorization patterns (RBAC, ABAC, policy-based)
- Data protection patterns (encryption, tokenization)
- API security patterns (gateway, rate limiting)
- Microservices security (service mesh, mTLS)
- Cloud security patterns (IAM, network isolation)

### Response Formats
- Architecture Review (with threat model, findings, roadmap)
- Threat Modeling (STRIDE analysis, attack scenarios)
- Compliance Assessment (gap analysis, remediation roadmap)

## Comparison: Original vs Improved

| Feature | Original | Improved |
|---------|----------|----------|
| Decision guide | ❌ No | ✅ Yes |
| Pre-assessment checklist | ❌ No | ✅ Yes |
| Scope clarity | ⚠️ Overlaps with code review | ✅ Clear separation |
| Severity levels | ⚠️ Mentioned | ✅ Detailed criteria |
| Response templates | ✅ Basic | ✅ Comprehensive |
| Integration guidance | ✅ Some | ✅ Detailed workflows |
| Common mistakes | ❌ No | ✅ Yes, by category |
| Checklist location | ⚠️ In SKILL.md | ✅ In references/ |
| File size | ✅ 1,795 words | ⚠️ 2,781 words |

## Size Considerations

**Original:** 1,795 words, 463 lines
**Improved:** 2,781 words, 801 lines

The improved version is larger but provides:
- Clearer scope definition (reduces confusion)
- Better templates (saves time in responses)
- Common mistakes (proactive guidance)
- Integration workflows (better collaboration)
- Pre-assessment checklist (better context gathering)

The extra size is justified by significantly improved usability.

## When to Use This Skill

Use for:
- ✅ Security architecture design
- ✅ Architecture security review
- ✅ Threat modeling exercises
- ✅ Compliance assessments
- ✅ Security strategy and roadmap
- ✅ Infrastructure security
- ✅ API security architecture
- ✅ Risk assessment
- ✅ Incident response planning

Don't use for:
- ❌ Code security review (use code-review skill)
- ❌ Finding specific vulnerabilities in code
- ❌ OWASP Top 10 code checks

## Severity Levels

### 🚨 Critical (24-48 hours)
- Complete system compromise
- Data breach
- Remote code execution
- Authentication bypass

### ⚠️ High (1 week)
- Significant security breach
- Data exposure
- Missing authentication on sensitive endpoints
- Insufficient access controls

### 💡 Medium (2-4 weeks)
- Moderate risk
- Missing security headers
- Weak password requirements
- Insufficient logging

### 📝 Low (Regular maintenance)
- Minimal immediate risk
- Best practice violations
- Recommended improvements
- Defense-in-depth enhancements

## Best Practices

### Defense in Depth
Multiple layers of security controls:
1. Perimeter (Firewall, WAF, DDoS)
2. Network (Segmentation, IDS/IPS)
3. Application (Auth, authz, validation)
4. Data (Encryption, tokenization)
5. Monitoring (Logging, alerting, SIEM)

### Zero Trust
- Never trust, always verify
- Assume breach
- Verify explicitly
- Least privilege access
- Segment access
- Monitor continuously

### Secure by Design
- Security requirements early
- Threat modeling in design
- Built-in controls (not bolted-on)
- Secure defaults
- Privacy by design
- Fail securely

## References

All reference files include detailed guidance:
- **owasp-standards.md** - OWASP Top 10, ASVS
- **api-security.md** - API patterns, authentication, rate limiting
- **nis2-compliance.md** - NIS2 Directive for critical infrastructure
- **secure-coding.md** - Secure coding across languages
- **security-checklist.md** - NEW: Comprehensive review checklist

## Integration with Other Skills

### + code-review
Architecture security → Code security → Overall assessment

### + technical-architecture
System design → Security validation → Secure architecture

### + devops
Pipeline design → Security review → Secure deployment

## Migration from security-architect

If you're upgrading from the old `security-architect` skill:

1. **Remove old skill** (optional, or keep both)
2. **Upload new skill** as `security`
3. **Update workflows** - Use `security` for architecture, `code-review` for code
4. **New reference file** - security-checklist.md now available

The old skill references are preserved and enhanced.

---

**Version:** 2.0 (Improved)  
**Last Updated:** December 2024  
**OWASP Version:** Top 10 2021  
**Compliance:** GDPR, PCI DSS 4.0, SOC 2, NIS2, HIPAA, ISO 27001:2022

## License

MIT License - Free and open source for personal or commercial use.

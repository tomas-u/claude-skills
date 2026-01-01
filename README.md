# Claude Code Skills Collection

A comprehensive collection of professional skills for Claude Code, covering DevOps, UX design, technical architecture, security, product management, and code review.

## Overview

This repository contains 6 specialized skills that enhance Claude's capabilities across different domains of software development and product management. Each skill is self-contained with detailed guidance, best practices, and reference materials.

## Available Skills

### 1. DevOps 🚀
**Expert DevOps engineering with security-first approach**

- CI/CD pipeline design (GitHub Actions, GitLab, Jenkins)
- Infrastructure as Code (Terraform, CloudFormation, Ansible)
- Container orchestration (Docker, Kubernetes, Helm)
- Cloud platform management (AWS, Azure, GCP)
- DevSecOps integration
- Monitoring & observability

📖 [Read more about DevOps skill](./DEVOPS.md)

### 2. UX Designer 🎨
**Comprehensive UX/UI design for web and mobile applications**

- Wireframes and mockups
- Interactive prototypes (React/HTML)
- Mobile design (iOS/Android patterns)
- Web admin interfaces
- Component libraries and design systems
- Accessibility compliance (WCAG AA)

📖 [Read more about UX skill](./UX.md)

### 3. Technical Architecture 🏗️
**Full-stack architecture guidance and technology selection**

- System architecture design
- Technology stack selection
- API design (REST, GraphQL)
- Database schema and modeling
- State management patterns
- Performance optimization
- Three architecture patterns (Serverless, Hybrid, Microservices)

📖 [Read more about Technical Architecture skill](./TECHNICAL.md)

### 4. Security Architect 🔒
**Comprehensive security architecture and threat modeling**

- Security architecture design
- Threat modeling (STRIDE)
- Compliance assessment (OWASP, NIS2, GDPR, PCI DSS, SOC 2)
- Risk assessment and prioritization
- Infrastructure security
- API security patterns
- Incident response planning

📖 [Read more about Security skill](./SECURITY.md)

### 5. Product Owner 📊
**Product management from vision to execution**

- Backlog management and user stories
- Market research and competitive analysis
- Product strategy and roadmapping
- Feature prioritization (RICE scoring)
- User research planning
- Metrics and OKRs
- Go-to-market strategy

📖 [Read more about Product Owner skill](./PRODUCT-OWNER.md)

### 6. Code Review ✅
**Thorough code review ensuring quality and security**

- Story/task alignment verification
- Code quality assessment
- Security analysis (OWASP Top 10)
- Maintainability evaluation
- Testing coverage review
- Performance analysis
- Constructive feedback with reasoning

📖 [Read more about Code Review skill](./CODE-REVIEW.md)

## Installation

### Prerequisites
- Claude Code CLI installed
- Access to Claude.ai or Claude Code interface

### Installing Individual Skills

Each skill can be installed independently:

1. Navigate to the skill directory (e.g., `devops/`, `ux/`, etc.)
2. Upload the entire folder to Claude Code
3. The skill will be available immediately

### Installing All Skills

To install all skills at once:

```bash
# Clone the repository
git clone https://github.com/tomas-u/claude-skills.git
cd claude-skills

# Each directory represents a skill:
# - devops/
# - ux/
# - technical/
# - security/
# - product-owner/
# - code-review/

# Upload each directory to Claude Code as a separate skill
```

## Repository Structure

```
claude-skills/
├── README.md                    # This file
├── .gitignore                   # Excludes zip files and build artifacts
│
├── devops/                      # DevOps skill
│   ├── SKILL.md                 # Main skill definition
│   └── references/              # Reference documentation
│       ├── github-actions.md
│       ├── docker-kubernetes.md
│       └── terraform-iac.md
│
├── ux/                          # UX Designer skill
│   ├── SKILL.md
│   ├── assets/                  # Templates
│   │   ├── mobile-template.jsx
│   │   └── web-admin-template.html
│   └── references/
│       ├── component-library-reference.md
│       ├── mobile-patterns.md
│       ├── web-patterns.md
│       └── ux-research.md
│
├── technical/                   # Technical Architecture skill
│   ├── SKILL.md
│   └── references/
│       ├── frontend-patterns.md
│       ├── backend-patterns.md
│       ├── database-design.md
│       └── deployment-systems.md
│
├── security/                    # Security Architect skill
│   ├── SKILL.md
│   └── references/
│       ├── owasp-standards.md
│       ├── api-security.md
│       ├── nis2-compliance.md
│       ├── secure-coding.md
│       └── security-checklist.md
│
├── product-owner/               # Product Owner skill
│   ├── SKILL.md
│   └── references/
│       ├── backlog-management.md
│       ├── market-research.md
│       └── product-strategy.md
│
└── code-review/                 # Code Review skill
    ├── SKILL.md
    └── references/
        └── owasp-checklist.md
```

## How Skills Work Together

These skills are designed to work seamlessly together:

### Example: Building a New Feature

```
1. product-owner: Defines requirements and writes user stories
          ↓
2. ux: Creates wireframes and interactive prototypes
          ↓
3. technical: Designs architecture and data model
          ↓
4. security: Reviews security architecture and threats
          ↓
5. (Development happens)
          ↓
6. code-review: Reviews implementation for quality and security
          ↓
7. devops: Sets up CI/CD and deployment
          ↓
8. product-owner: Measures success and iterates
```

### Example: Complete System Review

```
1. technical: Reviews overall architecture
2. security: Performs threat modeling and compliance check
3. code-review: Reviews code quality and maintainability
4. devops: Reviews infrastructure and deployment
5. technical: Synthesizes all recommendations
```

## Skill Highlights

### DevOps Skill
- **11-stage CI/CD pipeline** with security gates
- **DevSecOps principles** (shift left, automation first)
- **Infrastructure patterns** (immutable, GitOps, microservices)
- **Container security** best practices
- **Monitoring with Four Golden Signals**

### UX Skill
- **Pre-design checklist** ensures best practices
- **Platform-specific patterns** (iOS, Android, Web)
- **Component library** with templates
- **Accessibility requirements** (WCAG AA)
- **Three fidelity levels** (low, mid, high)

### Technical Architecture Skill
- **Three architecture patterns** with migration paths
- **Technology selection guidelines** for frontend, backend, database
- **Clear scope definition** (what to delegate to other skills)
- **Integration workflows** with other skills
- **Common mistakes** section

### Security Skill
- **Comprehensive threat modeling** (STRIDE)
- **Compliance frameworks** (OWASP, NIS2, GDPR, PCI DSS, SOC 2)
- **Severity classification** system
- **Security patterns** for authentication, authorization, data protection
- **Integration with code-review** for complete security assessment

### Product Owner Skill
- **User story templates** and best practices
- **RICE prioritization framework**
- **User research methods** (interviews, surveys)
- **Product stage guidance** (pre-PMF, PMF, growth, scale)
- **Decision-making framework** (5 factors)

### Code Review Skill
- **8-point review process** (story alignment → feedback)
- **OWASP Top 10 security checks**
- **Clean code principles** validation
- **Maintainability assessment**
- **Constructive feedback framework** (specific, explained, prioritized)

## Usage Examples

### DevOps: CI/CD Pipeline
```
You: "Create a CI/CD pipeline for my Node.js app with security scanning"

DevOps skill provides:
- Complete GitHub Actions workflow YAML
- Security scanning (Snyk, Trivy)
- Multi-stage Docker build
- Deployment automation
- Monitoring setup
```

### UX: Mobile Screen Design
```
You: "Design a task breakdown screen for students (mobile)"

UX skill provides:
- Interactive React prototype
- iOS/Android patterns applied
- Accessibility compliance
- Multiple states (empty, loading, completed)
- Design rationale and annotations
```

### Technical: Architecture Decision
```
You: "Should I use serverless or dedicated backend for 1000 users?"

Technical skill provides:
- Pattern recommendation (Serverless Full-Stack)
- Specific stack (Next.js, Supabase, Vercel)
- Cost estimate ($0-100/month)
- Migration path when you outgrow it
```

### Security: Threat Modeling
```
You: "Threat model our payment processing feature"

Security skill provides:
- STRIDE analysis
- Attack scenarios
- Risk assessment
- Required security controls
- Compliance considerations (PCI DSS)
```

### Product Owner: Prioritization
```
You: "Help me prioritize 10 feature ideas using RICE"

Product Owner skill provides:
- RICE score for each feature
- Ranked list with justification
- Quick wins identified
- Recommended next sprints
```

### Code Review: Pull Request
```
You: "Review this authentication PR"

Code Review skill provides:
- Story alignment check
- Code quality assessment
- Security vulnerability scan (OWASP)
- Performance analysis
- Actionable feedback with reasoning
```

## Best Practices

### When to Use Each Skill

- **DevOps**: Pipeline design, infrastructure, deployment, monitoring
- **UX**: User interface design, wireframes, prototypes, user flows
- **Technical**: Architecture decisions, tech stack, API design, data modeling
- **Security**: Security architecture, threat modeling, compliance
- **Product Owner**: Requirements, prioritization, user research, metrics
- **Code Review**: Pull requests, code quality, security vulnerabilities

### Using Multiple Skills

For comprehensive work, use skills in sequence:

1. **Planning Phase**: product-owner → ux → technical → security
2. **Development Phase**: code-review (ongoing)
3. **Deployment Phase**: devops
4. **Measurement Phase**: product-owner

## Contributing

This is a personal skill collection. Feel free to fork and customize for your own use.

## Version History

- **v1.0** (January 2025) - Initial collection with 6 comprehensive skills

## License

MIT License - see [LICENSE](LICENSE) file for details.

This skill collection is free and open source. You can use, modify, and distribute it freely for personal or commercial purposes.

## Links

- [GitHub Repository](https://github.com/tomas-u/claude-skills)
- [Claude Code](https://claude.com/claude-code)

---

**Created with Claude Code**
*Enhancing Claude's capabilities across the software development lifecycle*

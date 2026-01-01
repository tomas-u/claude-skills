# DevOps Skill Package

Expert DevOps engineering focused on secure, automated CI/CD pipelines, infrastructure management, and exceptional developer experience. Security-first approach following DevSecOps principles.

## What This Skill Does

This skill helps Claude provide expert DevOps guidance covering:

1. **CI/CD Pipeline Design** - GitHub Actions, GitLab CI, Jenkins, automated testing
2. **Infrastructure as Code** - Terraform, CloudFormation, Ansible, GitOps
3. **Container Orchestration** - Docker, Kubernetes, Helm, service mesh
4. **Cloud Platform Management** - AWS, Azure, GCP, multi-cloud strategies
5. **Security Integration (DevSecOps)** - SAST/DAST, secrets management, compliance
6. **Monitoring & Observability** - Prometheus, Grafana, ELK, distributed tracing
7. **Developer Experience** - Fast feedback, self-service, tooling standardization

## Key Features

### DevSecOps Principles
- **Shift Left Security** - Security testing early in development
- **Automation First** - Automate everything that can be automated
- **Continuous Monitoring** - Real-time security and performance monitoring
- **Fail Fast, Recover Faster** - Quick feedback loops and automated rollback

### CI/CD Pipeline Architecture
Comprehensive pipeline design with 11 stages:
1. Code Commit → Trigger Pipeline
2. Security Checks (secrets, licenses, dependencies)
3. Build (compile, lint, containerize)
4. Test (unit, integration, security)
5. Scan (containers, dependencies, infrastructure)
6. Package (artifacts, signing, registry)
7. Deploy Staging
8. Test Staging (integration, DAST, performance)
9. Deploy Production (canary, health checks)
10. Verify (synthetic monitoring, alerts)
11. Security Gates at every stage

### Infrastructure Patterns
- **Immutable Infrastructure** - Never modify, always deploy new
- **GitOps** - Git as single source of truth
- **Microservices Deployment** - Independent deployments, service mesh

### Container Security
- **Build Stage** - Minimal images, multi-stage builds, no secrets, scanning
- **Runtime Stage** - Non-root, read-only filesystem, resource limits
- **Registry Management** - Private registries, scanning, access control

### Secrets Management
- Never commit secrets to Git
- HashiCorp Vault, AWS Secrets Manager, Azure Key Vault
- Rotate regularly, audit access, encrypt at rest

### Monitoring & Alerting
- **The Four Golden Signals** - Latency, Traffic, Errors, Saturation
- **Alert Principles** - Actionable only, clear severity, runbooks
- **Observability Stack** - Prometheus + Grafana, ELK/Loki, Jaeger

## Installation

### Via Claude.ai
1. Go to **Settings** → **Skills**
2. Upload the `devops` folder
3. Skill will be named "devops"

### Manual
1. Copy `devops/` to `/mnt/skills/user/devops/`
2. Restart Claude or reload skills

## Package Structure

```
devops/
├── SKILL.md                          # Main skill definition
└── references/
    ├── github-actions.md             # GitHub Actions workflows and security
    ├── docker-kubernetes.md          # Container and orchestration best practices
    └── terraform-iac.md              # Infrastructure as Code patterns
```

## When to Use This Skill

### Pipeline Setup
- Designing CI/CD workflows
- Automating build and test processes
- Implementing deployment strategies
- Setting up security scanning
- Optimizing pipeline performance

### Infrastructure Management
- Provisioning cloud resources
- Managing Kubernetes clusters
- Setting up monitoring and logging
- Implementing disaster recovery
- Scaling infrastructure

### Security Hardening
- Securing CI/CD pipelines
- Implementing secrets management
- Container security scanning
- Compliance automation
- Vulnerability management

### Developer Productivity
- Improving build times
- Streamlining deployment process
- Automating repetitive tasks
- Setting up local dev environments
- Creating developer tools

## Integration with Other Skills

### With security Skill
```
security skill: Defines security requirements
         ↓
DevOps skill: Implements security controls in pipeline
         ↓
Automated security scanning
         ↓
security skill: Validates implementation
```

### With technical Skill
```
technical skill: Designs system architecture
         ↓
DevOps skill: Provisions infrastructure
         ↓
Automates deployment
         ↓
technical skill: Validates performance
```

### With product-owner Skill
```
product-owner skill: Prioritizes features
         ↓
DevOps skill: Enables fast, safe deployments
         ↓
Configures metrics and monitoring
         ↓
product-owner skill: Tracks feature performance
```

## Usage Examples

### Example 1: CI/CD Pipeline Design

```
You: "Create a CI/CD pipeline for my Node.js app with security scanning"

DevOps skill provides:
- Complete GitHub Actions workflow YAML
- Security scanning integration (Snyk, Trivy)
- Multi-stage Docker build
- Deployment to AWS ECS
- Monitoring setup with Prometheus
- Rollback mechanisms
```

### Example 2: Infrastructure Provisioning

```
You: "Set up a production-ready Kubernetes cluster on AWS"

DevOps skill provides:
- EKS cluster Terraform code
- Node groups configuration
- VPC and subnet setup
- Security policies (network policies, pod security)
- Monitoring with CloudWatch and Prometheus
- Cost optimization settings
- Disaster recovery plan
```

### Example 3: Security Hardening

```
You: "Secure our deployment pipeline"

DevOps skill provides:
- Pipeline security assessment
- Secret scanning implementation (git-secrets, TruffleHog)
- Container vulnerability scanning (Trivy)
- SAST/DAST integration (SonarQube, OWASP ZAP)
- Policy enforcement (OPA)
- Compliance reporting
```

## Cost Optimization

### Cloud Cost Management
- Resource tagging strategy
- Right-sizing instances
- Spot/preemptible instances
- Reserved instances for predictable workloads
- Auto-scaling policies
- Cost monitoring and alerts

### Container Optimization
- Multi-arch builds
- Resource requests and limits
- Horizontal pod autoscaling
- Cluster autoscaling
- Pod disruption budgets

## Disaster Recovery

### Backup Strategy
- Automated backups
- Offsite backup storage
- Regular restore testing
- RPO and RTO definitions
- Backup encryption

### High Availability
- Multi-region deployments
- Load balancing
- Failover mechanisms
- Health checks
- Circuit breakers

## Response Format

### For Pipeline Design
```
CI/CD Pipeline Design: [Project Name]

PIPELINE ARCHITECTURE:
- Source: [Git repository]
- Triggers: [Push, PR, schedule]
- Stages: [Build, Test, Deploy]
- Security Gates: [SAST, DAST, scanning]

SECURITY CONTROLS:
- Secret scanning, dependency scanning, container scanning
- SAST/DAST tools and integration points

DEPLOYMENT STRATEGY:
- Environments, deployment method, rollback approach

MONITORING:
- Metrics, logs, alerts

IMPLEMENTATION:
[Actual workflow YAML or configuration]
```

### For Infrastructure Setup
```
Infrastructure Design: [Component]

ARCHITECTURE:
- Platform, compute, network, storage, security

INFRASTRUCTURE AS CODE:
- Tool choice, state management, modules

SECURITY HARDENING:
- Network security, access control, encryption

COST OPTIMIZATION:
- Instance sizing, auto-scaling, reserved capacity

IMPLEMENTATION:
[Actual Terraform/IaC code]
```

## Best Practices Summary

### CI/CD
- Keep pipelines fast (<10 minutes)
- Fail fast on security issues
- Automate everything
- Make pipelines self-documenting
- Version control all configurations

### Infrastructure
- Everything as code
- Immutable infrastructure
- Multi-environment parity
- Automated testing
- Disaster recovery plans

### Security
- Shift left security
- Zero trust architecture
- Least privilege access
- Secrets in vaults, never in code
- Regular security audits

### Developer Experience
- One-command setup
- Fast feedback loops
- Self-service capabilities
- Clear documentation
- Helpful error messages

### Monitoring
- Monitor everything
- Actionable alerts only
- SLO-based alerting
- Distributed tracing
- Log aggregation

### Cost Management
- Tag all resources
- Right-size instances
- Use auto-scaling
- Monitor costs continuously
- Regular cost reviews

## Tools Expertise

**CI/CD:**
- GitHub Actions, GitLab CI/CD, Jenkins, Azure DevOps, CircleCI, ArgoCD

**Infrastructure as Code:**
- Terraform, CloudFormation, Pulumi, Ansible, Chef/Puppet

**Containers:**
- Docker, Kubernetes, Helm, Docker Compose, Podman

**Cloud Platforms:**
- AWS (comprehensive), Azure (comprehensive), GCP (comprehensive)

**Monitoring:**
- Prometheus, Grafana, ELK Stack, Datadog, New Relic

**Security:**
- Snyk, Trivy, SonarQube, HashiCorp Vault, OWASP ZAP

## Developer Experience Priorities

### Fast Feedback
- Quick build times (<5 minutes)
- Immediate test results
- Fast deployment to dev environments
- Real-time error notifications
- Performance metrics in CI

### Easy Onboarding
- Automated environment setup
- Clear documentation
- One-command local setup
- Pre-configured development containers
- Self-service infrastructure

### Self-Service
- Developers can deploy to dev/staging
- Automated environment provisioning
- Easy log access
- Metric dashboards
- Debugging tools readily available

### Consistency
- Same tools across environments
- Standardized workflows
- Shared templates and patterns
- Common tooling
- Unified monitoring

---

**Last Updated:** January 2025

## License

MIT License - Free and open source for personal or commercial use.

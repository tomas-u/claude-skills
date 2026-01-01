---
name: technical
description: Comprehensive technical architecture guidance for full-stack applications. Use when discussing system design, component architecture, API design, database schema, state management, deployment strategies, performance optimization, or technical implementation decisions. Covers frontend (React/Next.js), backend (Node.js/serverless), databases (SQL/NoSQL), caching, real-time features, file storage, and technology selection. Ideal for architectural reviews, technical planning, code structure discussions, and scaling strategies. For security architecture, use security skill. For code quality, use code-review skill. For DevOps/CI/CD, use devops skill.
---

# Technical Architecture Skill

Provides comprehensive guidance on technical architecture and implementation decisions for full-stack applications, from system design to technology selection.

## Quick Decision Guide

**What do you need?**

```
System architecture / Tech stack selection
  → Use: THIS skill (overall architecture, technology choices)

Security architecture / Threat modeling
  → Use: security skill (security patterns, compliance, risk)

Code review / Code quality
  → Use: code-review skill (line-by-line review, vulnerabilities)

CI/CD pipeline / Infrastructure / Deployment
  → Use: devops skill (pipelines, containers, monitoring)

UI/UX design / Wireframes / Mockups
  → Use: ux skill (user interface design, user flows)

Product planning / Feature prioritization
  → Use: product-owner skill (roadmap, user stories, backlog)
```

## Scope of This Skill

### This Skill Covers (Technical Architecture)
- ✅ Overall system architecture and service design
- ✅ Component architecture and code organization
- ✅ API design (REST, GraphQL, tRPC)
- ✅ Database schema and data modeling
- ✅ State management patterns
- ✅ Technology stack selection
- ✅ Performance optimization strategy
- ✅ Caching architecture
- ✅ Scalability planning
- ✅ Third-party service integration
- ✅ Frontend and backend patterns

### Use Other Skills For
- ❌ **Security architecture** → Use security skill
- ❌ **Code security review** → Use code-review skill
- ❌ **CI/CD pipelines** → Use devops skill
- ❌ **Infrastructure setup** → Use devops skill
- ❌ **UI/UX design** → Use ux skill
- ❌ **Product planning** → Use product-owner skill

### This Skill Works With Other Skills
- **security skill** → Technical arch provides structure, security validates it
- **code-review skill** → Technical arch defines patterns, code-review ensures compliance
- **devops skill** → Technical arch chooses stack, devops deploys it
- **ux skill** → UX defines user needs, technical arch implements them

## Pre-Planning Checklist

Before starting architectural planning, gather:

### Requirements
- [ ] What problem are we solving?
- [ ] Who are the users? (Students, teachers, admins, public)
- [ ] What are the core features?
- [ ] What's the expected scale? (users, data volume, traffic)
- [ ] What's the timeline? (MVP in weeks vs production in months)

### Constraints
- [ ] Budget limitations?
- [ ] Team skills and size?
- [ ] Performance requirements? (response time, throughput)
- [ ] Compliance requirements? (GDPR, HIPAA, etc.)
- [ ] Integration requirements? (existing systems, APIs)

### Context
- [ ] Starting from scratch or evolving existing system?
- [ ] Mobile, web, or both?
- [ ] Real-time features needed?
- [ ] Offline support needed?
- [ ] Global users or regional?

### References to Load
- [ ] **Frontend decisions** → references/frontend-patterns.md
- [ ] **Backend decisions** → references/backend-patterns.md
- [ ] **Database design** → references/database-design.md
- [ ] **Deployment/hosting** → references/deployment-systems.md

## Architecture Decision Framework

### 1. Understand Requirements
Start with the pre-planning checklist above.

### 2. Choose Architecture Pattern

Based on your stage and needs, select the appropriate pattern:

**For MVPs / New Products:**
- Pattern 1: Serverless Full-Stack (fast iteration, low maintenance)

**For Growing Products:**
- Pattern 3: Hybrid (pragmatic middle ground)

**For Established Products:**
- Pattern 2: Containerized Microservices (full control, scale)

See "Common Architecture Patterns" section below for details.

### 3. Select Technologies

Consult reference files for detailed guidance:
- **Frontend:** references/frontend-patterns.md
- **Backend:** references/backend-patterns.md
- **Database:** references/database-design.md
- **Deployment:** references/deployment-systems.md

### 4. Validate with Other Skills

**Security validation:**
- Use security skill to threat model your architecture
- Review authentication/authorization patterns
- Validate data protection approach

**Code organization validation:**
- Use code-review skill to establish coding standards
- Define maintainability criteria

**Deployment validation:**
- Use devops skill to design CI/CD pipeline
- Plan infrastructure and monitoring

### 5. Evaluate Tradeoffs

Every architecture decision involves tradeoffs:

**Complexity vs Flexibility:**
- Simple solutions are easier to maintain
- Complex solutions offer more flexibility
- **Rule:** Choose simplest solution that meets requirements

**Performance vs Development Speed:**
- Optimizations take time to implement
- Premature optimization wastes effort
- **Rule:** Optimize based on actual bottlenecks, not assumptions

**Cost vs Scale:**
- Serverless: Low cost at low scale, expensive at high scale
- Dedicated servers: Higher baseline cost, cheaper at scale
- **Rule:** Choose based on expected traffic patterns

**Vendor Lock-in vs Convenience:**
- Managed services (Vercel, Supabase) are convenient but lock you in
- Self-hosted solutions give flexibility but require maintenance
- **Rule:** Consider long-term strategic value and exit cost

**Build vs Buy:**
- Building gives control but takes time
- Buying gets you features fast but adds dependencies
- **Rule:** Buy for non-core features, build for competitive advantages

## Common Architecture Patterns

### Pattern 1: Serverless Full-Stack (Recommended for MVPs)

**Stack:**
```
Frontend:    Next.js on Vercel
Backend:     Next.js API Routes (serverless functions)
Database:    Supabase (PostgreSQL) or PlanetScale (MySQL)
Cache:       Upstash Redis
File Storage: Vercel Blob or S3
Auth:        NextAuth.js or Clerk
```

**When to use:**
- ✅ New products/MVPs
- ✅ Small to medium scale (< 1M requests/month)
- ✅ Want fast iteration
- ✅ Limited DevOps resources
- ✅ Unpredictable traffic

**Pros:**
- Fast to build and deploy (hours, not days)
- Scales automatically (0 → 10k users without changes)
- Low maintenance (no servers to manage)
- Pay only for usage (can start at $0/month)
- Excellent developer experience

**Cons:**
- Can get expensive at high scale (> $500/month at scale)
- Some vendor lock-in (but manageable)
- Cold start latency (200-500ms first request)
- Limited control over infrastructure

**Migration path:**
When you outgrow this, move to Pattern 3 (Hybrid)

---

### Pattern 2: Containerized Microservices (For Scale)

**Stack:**
```
Frontend:    Next.js in containers (ECS/Kubernetes)
Backend:     Node.js services in containers
Database:    RDS PostgreSQL with read replicas
Cache:       ElastiCache Redis
File Storage: S3
Auth:        Custom JWT implementation
Message Queue: SQS or RabbitMQ
```

**When to use:**
- ✅ Proven product with growth (> 100k users)
- ✅ Need more control over infrastructure
- ✅ Complex business logic requiring service isolation
- ✅ Team has DevOps skills
- ✅ Predictable high traffic

**Pros:**
- Full control over infrastructure
- Better cost at scale ($500-2k/month for high traffic)
- Service isolation (can scale services independently)
- Technology flexibility (mix languages)
- No cold starts

**Cons:**
- More complex setup (weeks of infrastructure work)
- Requires DevOps expertise
- Higher baseline costs (minimum ~$200/month)
- More maintenance burden

**Migration path:**
Usually don't migrate away, just add more services

---

### Pattern 3: Hybrid (Pragmatic Middle Ground)

**Stack:**
```
Frontend:    Next.js on Vercel (fast deploys, edge)
Backend:     Dedicated API server on Railway/Render/Fly.io
Database:    Managed PostgreSQL (Supabase/Neon/RDS)
Cache:       Upstash Redis or managed Redis
File Storage: S3 or Cloudflare R2
Auth:        NextAuth.js or custom
```

**When to use:**
- ✅ Outgrowing serverless costs (> $300/month)
- ✅ Not ready for full container complexity
- ✅ Need more backend flexibility (long-running tasks)
- ✅ Want good DX with more control
- ✅ Growing team (2-5 developers)

**Pros:**
- Better cost than pure serverless at scale
- More backend control (background jobs, websockets)
- Frontend still has great DX (Vercel)
- Easier than full microservices
- Good balance of control and convenience

**Cons:**
- More complex than pure serverless
- Need to manage API server
- Not as automated as Pattern 1
- Not as flexible as Pattern 2

**Migration path:**
Can move to Pattern 2 when you need service isolation

---

## Technology Selection Guidelines

### Frontend Framework

**Next.js (Recommended):**
- ✅ Full-stack capabilities (API routes, server actions)
- ✅ Excellent performance (SSR, ISR, SSG)
- ✅ Great DX with Vercel
- ✅ Large ecosystem and community
- ✅ Built-in optimizations (images, fonts, code splitting)
- **Use for:** Most web applications, SEO-critical sites

**React SPA:**
- ✅ Simple deployment (static files)
- ✅ Full client-side control
- ✅ Works well with any backend
- ❌ Worse SEO (unless prerendering)
- ❌ Slower initial load
- **Use for:** Admin dashboards, internal tools, web apps where SEO doesn't matter

**React Native (Mobile):**
- ✅ Code sharing with web (if using React)
- ✅ Native performance
- ✅ Single codebase for iOS + Android
- ❌ More complex than web
- ❌ App store deployment overhead
- **Use for:** Mobile apps (student/guardian apps for educational app)

---

### Backend Language/Runtime

**Node.js/TypeScript (Recommended):**
- ✅ Share code and types with frontend
- ✅ Great ecosystem (npm packages)
- ✅ Fast development (familiar to frontend devs)
- ✅ Good for I/O-heavy tasks (APIs, databases)
- ✅ Async by default
- **Use for:** Most applications, especially full-stack TypeScript

**Python:**
- ✅ Excellent for ML/AI workloads
- ✅ Great data processing libraries (pandas, numpy)
- ✅ Good for scripts and background jobs
- ❌ Harder to share code with frontend
- ❌ Slower for I/O-heavy tasks
- **Use for:** ML pipelines, data processing, computer vision, background jobs

**When to use both:**
- Node.js for API server (user-facing)
- Python for background processing (ML, data analysis)

---

### Database

**PostgreSQL (Recommended for most apps):**
- ✅ Excellent for relational data
- ✅ ACID transactions (data integrity)
- ✅ Rich query capabilities (joins, aggregations)
- ✅ JSON support for flexibility
- ✅ Great performance with proper indexing
- ✅ Mature ecosystem
- **Use for:** Educational apps, CRUDs, any structured data

**MongoDB:**
- ✅ Flexible schema (good for rapid prototyping)
- ✅ Fast writes
- ✅ Good for unstructured data
- ❌ Weaker consistency guarantees
- ❌ No joins (application-level only)
- **Use for:** Rapid prototyping, analytics, logs, event data

**Decision matrix:**
- Structured data with relationships? → PostgreSQL
- Need ACID transactions? → PostgreSQL
- Flexible/evolving schema? → MongoDB or PostgreSQL (with JSONB)
- Heavy analytics? → PostgreSQL (with indexing) or ClickHouse

For detailed schema design, consult references/database-design.md

---

### State Management

**React Query/SWR (Recommended for server state):**
- ✅ Handles 90% of state needs
- ✅ Automatic caching and refetching
- ✅ Loading/error states handled
- ✅ Less boilerplate than Redux
- ✅ Optimistic updates
- **Use for:** API data, server state, any data from backend

**Zustand (Recommended for client state):**
- ✅ Simple API
- ✅ Small bundle size (<1KB)
- ✅ No boilerplate
- ✅ TypeScript support
- ✅ No context provider needed
- **Use for:** Global UI state, user preferences, theme, modals

**Context API (Built-in):**
- ✅ No dependencies
- ✅ Good for simple state
- ❌ Can cause unnecessary re-renders
- ❌ Verbose for complex state
- **Use for:** Simple global state (theme, user info)

**Redux:**
- ✅ Powerful debugging (DevTools)
- ✅ Middleware ecosystem
- ✅ Time-travel debugging
- ❌ More boilerplate
- ❌ Steeper learning curve
- **Use for:** Very complex state, need time-travel debugging

**Rule of thumb:**
- Server data → React Query/SWR
- Global UI state → Zustand
- Simple context → Context API
- Complex state machine → Redux or XState

---

## Architecture Review Checklist

When reviewing or planning architecture, verify:

### System Design
- [ ] Architecture pattern chosen (serverless/hybrid/containers)?
- [ ] Frontend and backend clearly separated?
- [ ] API design follows REST/GraphQL best practices?
- [ ] Database schema normalized appropriately?
- [ ] State management approach defined?
- [ ] Authentication strategy chosen?
- [ ] File storage solution selected?

### Scalability
- [ ] Can handle 10x current load?
- [ ] Database properly indexed?
- [ ] Caching strategy in place?
- [ ] No N+1 query problems?
- [ ] Background jobs for heavy processing?
- [ ] CDN for static assets?

### Performance
- [ ] Images optimized?
- [ ] Code splitting implemented?
- [ ] Lazy loading for heavy components?
- [ ] Database queries optimized?
- [ ] Caching for expensive operations?
- [ ] Bundle size monitored?

### Maintainability
- [ ] Clear code organization (feature-based)?
- [ ] Consistent naming conventions?
- [ ] Components focused (single responsibility)?
- [ ] TypeScript for type safety?
- [ ] Linting and formatting configured?
- [ ] Documentation for complex logic?

### Developer Experience
- [ ] Easy local development setup?
- [ ] Environment variables managed properly?
- [ ] Hot reload working?
- [ ] Fast build times (< 30 seconds)?
- [ ] Clear error messages?

### Security (High-Level - Delegate to security skill)
- [ ] **Use security skill for detailed review**
- [ ] Authentication implemented?
- [ ] HTTPS enabled?
- [ ] Secrets not in code?
- [ ] Input validation at API boundaries?

### Testing (High-Level - Delegate to code-review skill)
- [ ] **Use code-review skill for test strategy**
- [ ] Critical paths have tests?
- [ ] API endpoints tested?
- [ ] E2E tests for key flows?

### Deployment (High-Level - Delegate to devops skill)
- [ ] **Use devops skill for CI/CD design**
- [ ] Automated deployments configured?
- [ ] Staging environment available?
- [ ] Rollback plan ready?

---

## Best Practices Summary

### Code Organization
- **Feature-based structure** over type-based
  ```
  ✅ Good: features/assignments/, features/students/
  ❌ Bad: components/, hooks/, utils/, services/
  ```
- **Colocate related code** (components, hooks, styles together)
- **Keep components small** (< 200 lines, single responsibility)
- **Use absolute imports** (`@/components` vs `../../../components`)
- **Separate business logic** from UI (custom hooks, service layer)

### Performance
- **Code splitting** for routes (automatic in Next.js)
- **React.memo** for expensive components
- **Optimize images** (Next.js Image component, WebP format)
- **Database indexes** for frequent queries
- **Cache expensive operations** (React Query, Redis)
- **Lazy load** heavy components
- **Debounce/throttle** expensive operations (search, scroll)

### API Design
- **RESTful conventions** (GET/POST/PUT/DELETE, proper status codes)
- **Consistent naming** (camelCase for JSON, snake_case for DB)
- **Versioning** (/api/v1/)
- **Pagination** for collections (limit/offset or cursor-based)
- **Error handling** (consistent error format)
- **Rate limiting** (prevent abuse)
- **Documentation** (OpenAPI/Swagger)

### Database Design
- **Normalize** to avoid redundancy (usually 3NF)
- **Index** frequently queried fields
- **Foreign keys** for referential integrity
- **Migrations** for schema changes
- **Soft deletes** for important data (deleted_at column)
- **Timestamps** (created_at, updated_at) on all tables

---

## Integration with Other Skills

### With security Skill
```
Technical Skill: Designs system architecture
         ↓
   Identifies integration points
         ↓
security Skill: Reviews security architecture
         ↓
   Identifies security requirements
         ↓
Technical Skill: Incorporates security controls
         ↓
security Skill: Validates implementation
```

**Example workflow:**
1. You: "Design authentication system for student/teacher app"
2. Technical skill: Recommends NextAuth.js with JWT, session strategy
3. security skill: Reviews JWT storage, session management, threat model
4. Technical skill: Updates architecture based on security recommendations

### With code-review Skill
```
Technical Skill: Defines architecture patterns
         ↓
   Sets coding standards
         ↓
code-review Skill: Reviews code against patterns
         ↓
   Identifies deviations and issues
         ↓
Technical Skill: Updates patterns if needed
```

**Example workflow:**
1. You: "Review this API endpoint implementation"
2. Technical skill: Confirms it follows API design patterns
3. code-review skill: Reviews code quality, security, maintainability
4. Technical skill: Suggests architectural improvements if patterns emerge

### With devops Skill
```
Technical Skill: Chooses technology stack
         ↓
   Defines deployment requirements
         ↓
devops Skill: Designs CI/CD pipeline
         ↓
   Sets up infrastructure
         ↓
Technical Skill: Validates architecture works in production
```

**Example workflow:**
1. You: "Set up deployment for Next.js app with PostgreSQL"
2. Technical skill: Recommends Vercel + Supabase (serverless pattern)
3. devops skill: Configures CI/CD, environment variables, monitoring
4. Technical skill: Confirms deployed architecture matches design

### With ux Skill
```
ux Skill: Designs user interface and flows
         ↓
   Identifies data requirements
         ↓
Technical Skill: Designs API and data model
         ↓
   Ensures UI can be implemented efficiently
         ↓
ux Skill: Adjusts design if technical constraints exist
```

**Example workflow:**
1. You: "Design task breakdown feature for students"
2. ux skill: Creates wireframes and user flow
3. Technical skill: Designs database schema and API endpoints
4. ux skill: Adjusts UI based on data structure (e.g., nested tasks)

---

## Common Architecture Mistakes to Avoid

### Over-Engineering
- ❌ Microservices for a 2-person team
- ❌ Complex caching before measuring performance
- ❌ Custom authentication when NextAuth exists
- ❌ GraphQL when REST would suffice
- **Rule:** Start simple, add complexity when needed

### Under-Engineering
- ❌ No database indexes
- ❌ No caching for expensive operations
- ❌ No error boundaries
- ❌ No loading states
- **Rule:** Handle the basics (errors, loading, caching)

### Wrong Technology Choices
- ❌ MongoDB for highly relational data
- ❌ Redux for simple global state
- ❌ Serverless for compute-heavy workloads
- ❌ NoSQL for ACID requirements
- **Rule:** Choose technologies based on requirements, not hype

### Poor Code Organization
- ❌ Type-based folders (all components in one folder)
- ❌ Deeply nested components (6+ levels)
- ❌ 1000+ line files
- ❌ Mixing business logic and UI
- **Rule:** Feature-based, colocate, keep files small

### Performance Mistakes
- ❌ No code splitting
- ❌ Large unoptimized images
- ❌ Re-rendering entire lists
- ❌ N+1 queries
- **Rule:** Optimize the common path, measure before optimizing

### Security Mistakes (Architecture Level)
- ❌ Authentication logic only on frontend
- ❌ Direct database access from frontend
- ❌ API keys in frontend code
- ❌ No rate limiting
- **Rule:** Use security skill for comprehensive review

---

## Migration Strategies

### From Serverless to Hybrid

**When:** Serverless costs exceed $300-500/month

**Approach:**
1. Keep frontend on Vercel (still cost-effective)
2. Move API to Railway/Render/Fly.io
3. Move database to managed service with connection pooling
4. Add Redis for caching
5. Keep file storage on S3/Vercel Blob

**Timeline:** 1-2 weeks

---

### From Hybrid to Microservices

**When:** Need service isolation, team > 5 people

**Approach:**
1. Identify service boundaries (auth, payments, notifications)
2. Extract one service at a time (start with least critical)
3. Add message queue (SQS, RabbitMQ) for async communication
4. Set up service mesh (if using Kubernetes)
5. Add centralized logging and monitoring

**Timeline:** 1-3 months

---

### From Monorepo to Multiple Repos

**When:** Team > 10 people, clear service ownership

**Approach:**
1. Extract shared code to npm packages
2. Split services into separate repos
3. Set up consistent CI/CD across repos
4. Use dependency management (Renovate, Dependabot)

**Timeline:** 2-4 weeks

---

## Getting Started

### New Project Workflow

1. **Define requirements** (use pre-planning checklist)
2. **Choose architecture pattern** (serverless/hybrid/microservices)
3. **Select technologies** (consult reference files)
4. **Design data model** (references/database-design.md)
5. **Plan API structure** (references/backend-patterns.md)
6. **Design frontend** (references/frontend-patterns.md)
7. **Validate with security skill** (threat model, security controls)
8. **Set up with devops skill** (CI/CD, infrastructure)
9. **Document decisions** (ADRs - Architecture Decision Records)

### Existing Project Review Workflow

1. **Understand current architecture** (diagram, document)
2. **Identify pain points** (slow, expensive, hard to maintain)
3. **Assess against checklist** (above)
4. **Identify gaps** (missing caching, poor indexes, etc.)
5. **Propose improvements** (prioritized by impact)
6. **Create migration plan** (phased approach)
7. **Validate with other skills** (security, code-review, devops)

---

## Requesting Architectural Guidance

For best results, provide:

**Context:**
- What you're building (brief description)
- Current state (greenfield vs existing system)
- Team size and skills

**Specific Question:**
- What decision are you trying to make?
- What options are you considering?
- What's the tradeoff you're evaluating?

**Constraints:**
- Budget ($ per month)
- Timeline (MVP in 2 weeks vs production in 3 months)
- Scale requirements (expected users, traffic)
- Compliance (GDPR, HIPAA, etc.)

**Example:**
> "I'm building an educational app for 1000 students and 50 teachers. Need task management, calendar, and file uploads. Team is 2 developers with React/Node.js skills. Budget is $100/month. Need MVP in 4 weeks. Should I use serverless or dedicated backend?"

This skill will consult the relevant references and provide context-specific, actionable recommendations.

---

## Reference Files

Load these for detailed guidance:

- **references/frontend-patterns.md** - React/Next.js patterns, state management, performance
- **references/backend-patterns.md** - API design, authentication, caching, background jobs
- **references/database-design.md** - Schema design, indexing, migrations, scaling
- **references/deployment-systems.md** - Hosting platforms, CI/CD, monitoring

**For comprehensive coverage, use with:**
- **security skill** - Security architecture, threat modeling, compliance
- **code-review skill** - Code quality, testing strategy, maintainability
- **devops skill** - CI/CD pipelines, infrastructure, deployment
- **ux skill** - User interface design, user flows, wireframes

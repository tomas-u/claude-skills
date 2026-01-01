# Technical Architecture Skill Package (Renamed from "technical-architecture")

Comprehensive technical architecture guidance for full-stack applications, from system design to technology selection.

## What Changed

### Renamed
- **Old name:** `technical-architecture`
- **New name:** `technical`

### Major Improvements

1. **Quick Decision Guide** - Know immediately when to use this vs other skills
2. **Clear Scope Definition** - What this skill covers vs what to delegate
3. **Pre-Planning Checklist** - Gather requirements before designing
4. **Better Separation from Other Skills** - No overlap with security/code-review/devops
5. **Integration Workflows** - How to use with security, code-review, devops, ux skills
6. **Migration Strategies** - How to evolve from one pattern to another
7. **Common Mistakes Section** - Avoid typical architecture pitfalls
8. **Enhanced Pattern Details** - When to use each, pros/cons, migration paths

## Skill Scope

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

### Delegates To Other Skills
- ❌ **Security architecture** → security skill
- ❌ **Code security review** → code-review skill
- ❌ **CI/CD pipelines** → devops skill
- ❌ **UI/UX design** → ux skill
- ❌ **Product planning** → product-owner skill

## Installation

### Via Claude.ai
1. Go to **Settings** → **Skills**
2. Upload the `technical` folder
3. Skill will be named "technical"

### Manual
1. Copy `technical/` to `/mnt/skills/user/technical/`
2. Restart Claude or reload skills

## Package Structure

```
technical/
├── SKILL.md                          # Main skill (architecture guidance)
└── references/
    ├── frontend-patterns.md          # React/Next.js patterns
    ├── backend-patterns.md           # API design, auth, caching
    ├── database-design.md            # Schema, indexing, scaling
    └── deployment-systems.md         # Hosting, CI/CD, monitoring
```

## Key Features

### Quick Decision Guide
Helps you immediately route to the right skill:
```
System architecture? → THIS skill
Security architecture? → security skill
Code review? → code-review skill
CI/CD pipeline? → devops skill
UI design? → ux skill
```

### Architecture Patterns with Migration Paths

**Pattern 1: Serverless Full-Stack**
- For: MVPs, new products, < 1M requests/month
- Stack: Next.js on Vercel, Supabase, Upstash
- Migration to: Pattern 3 (Hybrid)

**Pattern 2: Containerized Microservices**
- For: Scale, > 100k users, complex domains
- Stack: Containers (ECS/K8s), RDS, ElastiCache
- Migration from: Pattern 3 (Hybrid)

**Pattern 3: Hybrid**
- For: Growing products, outgrowing serverless
- Stack: Next.js on Vercel, dedicated API server
- Migration from/to: Both directions supported

### Technology Selection Guidelines
Detailed recommendations for:
- Frontend frameworks (Next.js, React SPA, React Native)
- Backend runtimes (Node.js, Python)
- Databases (PostgreSQL, MongoDB)
- State management (React Query, Zustand, Redux)

### Integration Workflows
Clear patterns for using with other skills:

**With security skill:**
1. Technical designs architecture
2. Security validates and identifies gaps
3. Technical incorporates security controls

**With code-review skill:**
1. Technical defines patterns
2. Code-review validates implementation
3. Technical updates patterns based on findings

**With devops skill:**
1. Technical chooses stack
2. DevOps implements infrastructure
3. Technical validates deployment

**With ux skill:**
1. UX designs interface
2. Technical designs data model and API
3. UX adjusts based on technical constraints

### Common Mistakes Section
Avoid typical architecture pitfalls:
- Over-engineering (microservices for 2 people)
- Under-engineering (no indexes, no caching)
- Wrong tech choices (MongoDB for relational data)
- Poor organization (type-based folders)
- Performance mistakes (no code splitting, N+1 queries)

### Pre-Planning Checklist
Ensures you gather all context:
- Requirements (problem, users, features, scale)
- Constraints (budget, timeline, team skills)
- Context (new vs existing, mobile vs web)

## Usage Examples

### Example 1: New Product Architecture

```
You: "Design architecture for educational app. 1000 students, 50 teachers. 
Task management, calendar, file uploads. Team: 2 devs. Budget: $100/month. 
MVP in 4 weeks."

technical skill:
1. Recommends Pattern 1 (Serverless Full-Stack)
2. Stack: Next.js on Vercel, Supabase PostgreSQL, Vercel Blob
3. State: React Query for server state, Zustand for UI state
4. Auth: NextAuth.js with credentials provider
5. Estimates: Can stay under $100/month for 1000 users
6. Timeline: 4 weeks achievable with this stack
```

### Example 2: Scaling Decision

```
You: "Currently on serverless, spending $400/month. Should we migrate?"

technical skill:
1. Analyzes current costs
2. Recommends Pattern 3 (Hybrid)
3. Migration plan:
   - Keep Next.js frontend on Vercel
   - Move API to Railway ($20/month)
   - Move DB to Neon with connection pooling
   - Add Upstash Redis for caching
4. Estimated new cost: $150/month (saves $250/month)
5. Timeline: 1-2 weeks migration
```

### Example 3: Combined with Other Skills

```
You: "Complete architecture review of our app"

Workflow:
1. technical skill: Reviews overall architecture
   - System design
   - Technology choices
   - Performance strategy
   - Scalability plan

2. security skill: Reviews security architecture
   - Threat model
   - Security controls
   - Compliance gaps

3. code-review skill: Reviews code quality
   - Coding standards
   - Maintainability
   - Test coverage

4. devops skill: Reviews deployment
   - CI/CD pipeline
   - Infrastructure
   - Monitoring

5. technical skill: Synthesizes recommendations
   - Prioritizes improvements
   - Creates roadmap
```

## Comparison: Original vs Improved

| Feature | Original | Improved |
|---------|----------|----------|
| Decision guide | ❌ No | ✅ Yes |
| Scope clarity | ⚠️ Overlaps with security/devops | ✅ Clear separation |
| Pre-planning checklist | ❌ No | ✅ Yes |
| Integration workflows | ❌ No | ✅ Detailed for each skill |
| Migration strategies | ❌ No | ✅ Yes (serverless → hybrid → microservices) |
| Common mistakes | ❌ No | ✅ Yes, by category |
| Security overlap | ⚠️ Basic security checklist | ✅ Delegates to security skill |
| DevOps overlap | ⚠️ Deployment practices | ✅ Delegates to devops skill |
| Code quality overlap | ⚠️ Testing & maintainability | ✅ Delegates to code-review skill |
| File size | ✅ 1,513 words, 337 lines | ⚠️ 3,251 words, 750 lines |

## Size Considerations

**Original:** 1,513 words, 337 lines
**Improved:** 3,251 words, 750 lines (+115% words, +122% lines)

The improved version is significantly larger but provides:
- Clear scope definition (eliminates confusion)
- Integration workflows (better collaboration)
- Migration strategies (evolution paths)
- Common mistakes (proactive guidance)
- Enhanced pattern details (when to use each)
- Better separation (no overlap with other skills)

**Is it too large?**
- At 750 lines, it exceeds the 500 line recommendation
- However, the extra content is high-value (patterns, migrations, workflows)
- Alternative: Could move patterns to references/ to reduce SKILL.md

## Three Architecture Patterns

### Pattern 1: Serverless Full-Stack
**Best for:** MVPs, new products, small teams
- Stack: Next.js + Vercel + Supabase + Upstash
- Cost: $0-200/month
- Effort: Days to deploy
- Scale: Up to 1M requests/month

### Pattern 2: Containerized Microservices
**Best for:** Established products, large teams
- Stack: Containers + RDS + ElastiCache + S3
- Cost: $500-2k/month
- Effort: Weeks to deploy
- Scale: Unlimited

### Pattern 3: Hybrid
**Best for:** Growing products, mid-size teams
- Stack: Vercel (frontend) + Railway (backend) + managed DB
- Cost: $150-500/month
- Effort: 1-2 weeks to deploy
- Scale: Up to 10M requests/month

## Technology Recommendations

### Frontend
- ✅ **Next.js** - Most web apps (SSR, great DX)
- ✅ **React SPA** - Admin tools, internal apps
- ✅ **React Native** - Mobile apps

### Backend
- ✅ **Node.js/TypeScript** - Most APIs (shares code with frontend)
- ✅ **Python** - ML workloads, data processing

### Database
- ✅ **PostgreSQL** - Structured data (default choice)
- ✅ **MongoDB** - Flexible schema, rapid prototyping

### State Management
- ✅ **React Query** - Server state (API data)
- ✅ **Zustand** - Client state (UI state)
- ✅ **Context API** - Simple global state
- ⚠️ **Redux** - Complex state machines only

## Integration with Other Skills

### + security
Architecture design → Security validation → Secure architecture

### + code-review
Pattern definition → Code validation → Pattern compliance

### + devops
Stack selection → Infrastructure setup → Production deployment

### + ux
UI design → Data model design → Efficient implementation

## Common Architecture Mistakes

### Over-Engineering
- Microservices for 2-person team
- Complex caching before measuring
- Custom auth when NextAuth exists
- GraphQL when REST suffices

### Under-Engineering
- No database indexes
- No error boundaries
- No loading states
- No caching

### Wrong Technology
- MongoDB for relational data
- Redux for simple state
- Serverless for CPU-heavy tasks
- NoSQL for ACID requirements

### Poor Organization
- Type-based folders
- Deep nesting (6+ levels)
- 1000+ line files
- Mixed business logic and UI

## Migration from technical-architecture

If you're upgrading:

1. **Remove old skill** (optional)
2. **Upload new skill** as `technical`
3. **Update workflows** - Use `technical` for architecture, delegate security/code/devops to respective skills
4. **All reference files preserved** and work the same

## When to Use This Skill

Use for:
- ✅ System architecture design
- ✅ Technology stack selection
- ✅ API design and data modeling
- ✅ Performance optimization strategy
- ✅ Scalability planning
- ✅ Component organization
- ✅ State management selection

Don't use for:
- ❌ Security architecture (use security skill)
- ❌ Code review (use code-review skill)
- ❌ CI/CD pipeline (use devops skill)
- ❌ UI design (use ux skill)

## Architecture Review Checklist

Quick checklist for reviews:

**System Design:**
- Architecture pattern chosen?
- Frontend/backend separated?
- API design follows conventions?
- Database schema normalized?
- State management defined?

**Scalability:**
- Can handle 10x load?
- Database indexed?
- Caching in place?
- No N+1 queries?

**Performance:**
- Images optimized?
- Code splitting?
- Lazy loading?
- Bundle size monitored?

**Maintainability:**
- Feature-based organization?
- TypeScript enabled?
- Small, focused components?
- Clear naming?

*For detailed security, testing, deployment checklists, use respective skills.*

## Best Practices

### Code Organization
- Feature-based structure (not type-based)
- Colocate related code
- Small files (< 200 lines)
- Absolute imports

### Performance
- Code splitting
- Image optimization
- Database indexing
- Caching expensive operations

### API Design
- RESTful conventions
- Versioning (/api/v1/)
- Pagination
- Consistent error format

### Database
- Normalize appropriately
- Index frequently queried fields
- Foreign keys for integrity
- Timestamps on all tables

---

**Version:** 2.0 (Improved)  
**Last Updated:** December 2024

## License

MIT License - Free and open source for personal or commercial use.

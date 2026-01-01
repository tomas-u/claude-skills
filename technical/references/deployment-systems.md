# Deployment & System Architecture

## Hosting Options Comparison

### Vercel (Recommended for Next.js)
**Best for:** Frontend apps, Next.js, serverless functions

**Pros:**
- ✅ Zero-config Next.js deployment
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Edge functions
- ✅ Preview deployments per PR
- ✅ Great DX

**Cons:**
- ❌ Vendor lock-in
- ❌ Expensive at scale (serverless pricing)
- ❌ Limited backend flexibility

**Use when:** Building with Next.js, need fast deploys, focus on frontend

### AWS (Most flexible)
**Best for:** Full control, complex infrastructure

**Pros:**
- ✅ Complete control
- ✅ Every service imaginable
- ✅ Best for scale
- ✅ Cost-effective at high volume

**Cons:**
- ❌ Steep learning curve
- ❌ Complex setup
- ❌ More maintenance

**Use when:** Need specific services, predictable high traffic, complex requirements

### Railway / Render (Modern alternatives)
**Best for:** Full-stack apps, simple deploys

**Pros:**
- ✅ Simple deployment
- ✅ Database included
- ✅ Good DX
- ✅ Reasonable pricing

**Cons:**
- ❌ Fewer services than AWS
- ❌ Less mature

**Use when:** Need simple full-stack deployment, don't want AWS complexity

## Architecture Patterns

### Serverless Architecture (Recommended for MVP)

```
┌─────────────────────────────────────────┐
│           Vercel / Netlify              │
│  ┌────────────┐      ┌────────────┐    │
│  │  Next.js   │      │ API Routes │    │
│  │  Frontend  │ ───> │ (Serverless│    │
│  │            │      │  Functions)│    │
│  └────────────┘      └────────────┘    │
└──────────────┬──────────────┬───────────┘
               │              │
               ▼              ▼
         ┌──────────┐   ┌──────────┐
         │PostgreSQL│   │  Redis   │
         │(Supabase)│   │ (Upstash)│
         └──────────┘   └──────────┘
```

**When to use:**
- Small to medium apps
- Irregular traffic
- Fast iteration needed
- Limited DevOps resources

**Stack example:**
- Frontend: Next.js on Vercel
- Database: Supabase (PostgreSQL)
- Cache: Upstash Redis
- File storage: Vercel Blob / S3
- Auth: NextAuth.js

### Containerized Architecture (For growth)

```
┌──────────────────────────────────────────┐
│            Load Balancer                 │
└────────┬──────────────┬──────────────────┘
         │              │
    ┌────▼────┐    ┌────▼────┐
    │Container│    │Container│
    │ Next.js │    │ Next.js │
    └────┬────┘    └────┬────┘
         │              │
         └──────┬───────┘
                ▼
         ┌─────────────┐
         │  PostgreSQL │
         │   Cluster   │
         └─────────────┘
```

**When to use:**
- Growing traffic
- Need auto-scaling
- Multiple services
- Consistent environments

**Stack example:**
- Container: Docker
- Orchestration: Kubernetes / ECS
- Database: RDS PostgreSQL
- Cache: ElastiCache Redis
- CDN: CloudFront

## CI/CD Pipeline

### GitHub Actions Example

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Run linter
        run: npm run lint
      
      - name: Type check
        run: npm run type-check

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### Deployment Environments

**Development:**
- Auto-deploy on PR
- Test data
- Debug mode enabled
- No caching

**Staging:**
- Deploy from `develop` branch
- Production-like data
- Performance testing
- Final QA

**Production:**
- Deploy from `main` branch
- Real users
- Monitoring enabled
- Rollback plan ready

## Environment Variables

### Structure

```bash
# .env.local (development)
DATABASE_URL=postgresql://localhost:5432/dev
REDIS_URL=redis://localhost:6379
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# .env.production (production)
DATABASE_URL=postgresql://prod-db.aws.com:5432/prod
REDIS_URL=redis://prod-redis.aws.com:6379
NEXT_PUBLIC_API_URL=https://api.myapp.com
```

### Security Best Practices

**Never commit:**
- ❌ API keys
- ❌ Database passwords
- ❌ JWT secrets
- ❌ Service credentials

**Use secrets management:**
```typescript
// Vercel: Environment Variables in dashboard
// AWS: Secrets Manager
// GitHub: Repository Secrets

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  throw new Error('DATABASE_URL not set');
}
```

## Database Hosting

### Supabase (Easiest)

```typescript
// Setup
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// Features
- ✅ PostgreSQL database
- ✅ Auto-generated REST API
- ✅ Real-time subscriptions
- ✅ Built-in auth
- ✅ File storage
- ✅ Free tier
```

### Planetscale (MySQL, serverless)

```typescript
// Connection
import { connect } from '@planetscale/database';

const db = connect({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

// Features
- ✅ Serverless MySQL
- ✅ Automatic backups
- ✅ Branching (like Git)
- ✅ No connection pooling needed
```

### AWS RDS (Production-grade)

```typescript
// Connection with pooling
import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20, // Connection pool size
});

// Features
- ✅ Full control
- ✅ Multi-AZ for HA
- ✅ Read replicas
- ✅ Automated backups
```

## Caching Strategy

### Layers of Caching

```
Client (Browser)
    ↓ (Cache-Control headers)
CDN (CloudFront/Vercel Edge)
    ↓ (Edge caching)
Application (Redis)
    ↓ (Query results)
Database (Query cache)
```

### Redis Setup

```typescript
// Upstash (serverless Redis)
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

// Set with TTL
await redis.setex('key', 3600, 'value');

// Get
const value = await redis.get('key');
```

### Cache Invalidation

```typescript
// Pattern 1: Time-based (TTL)
await redis.setex(`assignment:${id}`, 300, data); // 5 minutes

// Pattern 2: Event-based
async function updateAssignment(id, data) {
  await db.update(id, data);
  await redis.del(`assignment:${id}`); // Invalidate cache
}

// Pattern 3: Tag-based
await redis.set(`assignment:${id}`, data);
await redis.sadd(`student:${studentId}:assignments`, id);

// Invalidate all student's assignments
const assignmentIds = await redis.smembers(`student:${studentId}:assignments`);
await Promise.all(assignmentIds.map(id => redis.del(`assignment:${id}`)));
```

## File Storage

### Vercel Blob

```typescript
import { put } from '@vercel/blob';

const blob = await put('filename.mp4', file, {
  access: 'public',
  addRandomSuffix: true,
});

console.log(blob.url);
```

### AWS S3

```typescript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: 'us-east-1' });

await s3.send(new PutObjectCommand({
  Bucket: 'my-bucket',
  Key: `uploads/${filename}`,
  Body: file,
  ContentType: 'video/mp4',
}));
```

### Cloudflare R2 (S3-compatible, cheaper)

```typescript
// Same API as S3
const r2 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});
```

## Monitoring & Observability

### Application Monitoring

**Vercel Analytics** (for Next.js):
```typescript
// Automatically tracks:
- Page views
- Web Vitals (LCP, FID, CLS)
- Geographic distribution
```

**Sentry** (Error tracking):
```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.1,
});

// Automatic error capture
// Manual tracking
Sentry.captureException(error);
```

### Logging

```typescript
// Structured logging with Pino
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
});

logger.info({ userId, action: 'login' }, 'User logged in');
logger.error({ err, userId }, 'Failed to create assignment');
```

### Uptime Monitoring

**BetterStack / UptimeRobot:**
- Ping endpoints every 1-5 minutes
- Alert on downtime
- Status page

**Health check endpoint:**
```typescript
// /api/health
export default async function handler(req, res) {
  try {
    await db.$queryRaw`SELECT 1`; // Check DB
    await redis.ping(); // Check Redis
    
    res.status(200).json({ status: 'healthy' });
  } catch (error) {
    res.status(503).json({ status: 'unhealthy', error: error.message });
  }
}
```

## Performance Optimization

### Image Optimization

```typescript
// Next.js Image component
import Image from 'next/image';

<Image
  src="/swing-analysis.jpg"
  width={800}
  height={600}
  alt="Exercise form"
  placeholder="blur"
  loading="lazy" // Below fold
  priority // Above fold, critical images
/>
```

### Code Splitting

```typescript
// Route-based (automatic in Next.js)
// pages/analysis.tsx automatically code-split

// Component-based
import dynamic from 'next/dynamic';

const VideoPlayer = dynamic(() => import('./VideoPlayer'), {
  loading: () => <Spinner />,
  ssr: false, // Client-side only
});
```

### Database Connection Pooling

```typescript
// Prisma with connection pooling
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

// Connection pool configuration
DATABASE_URL="postgresql://user:pass@host:5432/db?pgbouncer=true&connection_limit=10"
```

## Scaling Checklist

**Before you scale:**
1. Profile and optimize existing code
2. Add database indexes
3. Implement caching
4. Optimize images and assets
5. Enable CDN

**When to scale:**
- Response time > 500ms
- Database CPU > 80%
- Memory usage growing
- Connection pool exhausted

**How to scale:**
1. **Vertical** (increase server size) - Quick fix
2. **Horizontal** (add more servers) - Better long-term
3. **Database** (read replicas, sharding)
4. **Cache** (Redis, CDN)

## Disaster Recovery

### Backup Strategy

**Database backups:**
- Automated daily backups (30-day retention)
- Weekly full backups (90-day retention)
- Point-in-time recovery enabled

**File storage backups:**
- S3 versioning enabled
- Cross-region replication
- Glacier for long-term archival

### Rollback Plan

```bash
# Git-based rollback
git revert <commit-hash>
git push origin main

# Vercel instant rollback
vercel rollback <deployment-url>

# Database migration rollback
npx prisma migrate resolve --rolled-back <migration-name>
```

## Security Checklist

- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Environment variables secured (not committed)
- [ ] Database credentials rotated regularly
- [ ] Rate limiting on API endpoints
- [ ] SQL injection prevention (Prisma/ORM)
- [ ] XSS prevention (React escapes by default)
- [ ] CSRF tokens on mutations
- [ ] Input validation on all endpoints
- [ ] Authentication on protected routes
- [ ] Role-based access control
- [ ] Audit logging for sensitive actions
- [ ] Regular dependency updates (`npm audit`)
- [ ] Security headers (CSP, HSTS, etc.)

## Cost Optimization

**Vercel:**
- Use ISR instead of SSR where possible
- Optimize images (reduce file size)
- Cache aggressively

**AWS:**
- Use Reserved Instances for predictable load
- Spot Instances for batch jobs
- S3 Intelligent Tiering for storage
- CloudFront for CDN (reduce origin requests)

**Database:**
- Choose right instance size (not too big)
- Enable query caching
- Archive old data
- Use read replicas instead of bigger instance

**General:**
- Monitor usage regularly
- Set up billing alerts
- Delete unused resources
- Optimize before scaling

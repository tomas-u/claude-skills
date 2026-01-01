# Backend Architecture Patterns

## API Design

### REST API Best Practices

**Resource-based URLs:**
```
GET    /api/assignments           # List assignments
GET    /api/assignments/:id       # Get assignment
POST   /api/assignments           # Create assignment
PUT    /api/assignments/:id       # Update assignment
DELETE /api/assignments/:id       # Delete assignment

# Nested resources
GET    /api/students/:id/assignments
POST   /api/assignments/:id/subtasks
```

**HTTP Status Codes:**
- 200 OK - Successful GET/PUT
- 201 Created - Successful POST
- 204 No Content - Successful DELETE
- 400 Bad Request - Invalid input
- 401 Unauthorized - Not authenticated
- 403 Forbidden - Authenticated but not authorized
- 404 Not Found - Resource doesn't exist
- 409 Conflict - Resource conflict (duplicate)
- 422 Unprocessable Entity - Validation failed
- 500 Internal Server Error - Server error

**Response Structure:**
```typescript
// Success response
{
  "data": {
    "id": "123",
    "title": "Math Assignment"
  },
  "meta": {
    "timestamp": "2024-12-27T10:00:00Z"
  }
}

// Error response
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid due date",
    "details": {
      "field": "dueDate",
      "reason": "Must be in the future"
    }
  }
}

// List response with pagination
{
  "data": [...],
  "meta": {
    "page": 1,
    "perPage": 20,
    "total": 145,
    "totalPages": 8
  }
}
```

### GraphQL Pattern

**Schema Definition:**
```graphql
type Assignment {
  id: ID!
  title: String!
  description: String
  dueDate: DateTime!
  subject: String!
  student: Student!
  subtasks: [Subtask!]!
  status: AssignmentStatus!
}

type Query {
  assignment(id: ID!): Assignment
  assignments(
    studentId: ID
    status: AssignmentStatus
    page: Int
    limit: Int
  ): AssignmentConnection!
}

type Mutation {
  createAssignment(input: CreateAssignmentInput!): Assignment!
  updateAssignment(id: ID!, input: UpdateAssignmentInput!): Assignment!
  deleteAssignment(id: ID!): Boolean!
}
```

**When to use GraphQL over REST:**
- ✅ Frontend needs flexible data queries
- ✅ Multiple related resources fetched together
- ✅ Mobile apps (reduce over-fetching)
- ✅ Complex data relationships
- ❌ Simple CRUD operations
- ❌ File uploads (use REST)
- ❌ Caching is critical (REST is easier)

### tRPC Pattern (Type-safe RPC)

```typescript
// server/routers/assignments.ts
export const assignmentRouter = router({
  list: publicProcedure
    .input(z.object({
      studentId: z.string(),
      status: z.enum(['pending', 'completed']).optional(),
    }))
    .query(async ({ input }) => {
      return db.assignments.findMany({
        where: { studentId: input.studentId },
      });
    }),
  
  create: protectedProcedure
    .input(z.object({
      title: z.string(),
      dueDate: z.date(),
      description: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      return db.assignments.create({
        data: { ...input, teacherId: ctx.user.id },
      });
    }),
});
```

**Benefits:**
- End-to-end type safety
- No API documentation needed
- Auto-complete in IDE
- Works great with Next.js/React

## Service Layer Architecture

### Layered Architecture

```
┌─────────────────────────────┐
│   API Routes (Controllers)  │ ← HTTP handling, validation
├─────────────────────────────┤
│   Services (Business Logic) │ ← Core application logic
├─────────────────────────────┤
│   Repositories (Data Access)│ ← Database operations
├─────────────────────────────┤
│   Database                  │ ← Data storage
└─────────────────────────────┘
```

**Example Structure:**
```typescript
// routes/assignments.ts (Controller)
router.post('/assignments', async (req, res) => {
  const assignment = await assignmentService.create(req.body, req.user.id);
  res.status(201).json({ data: assignment });
});

// services/assignmentService.ts (Business Logic)
export class AssignmentService {
  async create(data: CreateAssignmentDTO, teacherId: string) {
    // Validation
    if (data.dueDate < new Date()) {
      throw new ValidationError('Due date must be in future');
    }
    
    // Business logic
    const assignment = {
      ...data,
      teacherId,
      status: 'pending',
      createdAt: new Date(),
    };
    
    // Data persistence
    return assignmentRepo.save(assignment);
  }
}

// repositories/assignmentRepo.ts (Data Access)
export class AssignmentRepository {
  async save(assignment: Assignment) {
    return db.assignments.create({ data: assignment });
  }
  
  async findById(id: string) {
    return db.assignments.findUnique({ where: { id } });
  }
}
```

**Benefits:**
- Separation of concerns
- Easy to test each layer
- Reusable business logic
- Database-agnostic services

## Authentication & Authorization

### JWT Pattern

```typescript
// Generate token
const generateToken = (user: User) => {
  return jwt.sign(
    { 
      userId: user.id, 
      role: user.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Verify middleware
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userRepo.findById(payload.userId);
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
```

### Role-based Access Control (RBAC)

```typescript
enum Role {
  STUDENT = 'student',
  TEACHER = 'teacher',
  GUARDIAN = 'guardian',
  ADMIN = 'admin',
}

const permissions = {
  [Role.STUDENT]: ['read:own-assignments', 'update:own-profile'],
  [Role.TEACHER]: ['read:all-assignments', 'create:assignment', 'update:assignment'],
  [Role.GUARDIAN]: ['read:child-assignments', 'read:child-progress'],
  [Role.ADMIN]: ['*'],
};

const requirePermission = (permission: string) => {
  return (req, res, next) => {
    const userPermissions = permissions[req.user.role];
    
    if (userPermissions.includes('*') || userPermissions.includes(permission)) {
      next();
    } else {
      res.status(403).json({ error: 'Forbidden' });
    }
  };
};

// Usage
router.post('/assignments', 
  authMiddleware,
  requirePermission('create:assignment'),
  createAssignment
);
```

### Session-based Auth (Alternative)

```typescript
// For server-rendered apps (Next.js with sessions)
import { getServerSession } from 'next-auth';

export async function getSession(req, res) {
  return await getServerSession(req, res, authOptions);
}

// Protected route
export default async function handler(req, res) {
  const session = await getSession(req, res);
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  // Handle request
}
```

## Database Design

### Schema Design Principles

**Normalize for consistency, denormalize for performance:**

```typescript
// Normalized (good for writes, data consistency)
model Student {
  id        String   @id
  name      String
  email     String   @unique
  assignments Assignment[]
}

model Assignment {
  id          String   @id
  title       String
  studentId   String
  student     Student  @relation(fields: [studentId], references: [id])
  subtasks    Subtask[]
}

// Denormalized (good for reads, performance)
model AssignmentWithStudent {
  id            String
  title         String
  studentId     String
  studentName   String  // Denormalized for faster reads
  studentEmail  String  // Denormalized
}
```

### Indexing Strategy

```prisma
model Assignment {
  id        String   @id
  title     String
  studentId String
  dueDate   DateTime
  status    String
  
  @@index([studentId])           // For queries by student
  @@index([dueDate])             // For sorting by due date
  @@index([studentId, status])   // Composite for common query
  @@index([status, dueDate])     // For teacher dashboard
}
```

**Index when:**
- Column used in WHERE clauses frequently
- Column used in ORDER BY
- Foreign keys
- Columns in JOIN conditions

**Don't index:**
- Small tables (<1000 rows)
- Columns with low cardinality (few distinct values)
- Frequently updated columns

### Relationships

```prisma
// One-to-Many
model Teacher {
  id          String       @id
  assignments Assignment[]
}

model Assignment {
  id        String  @id
  teacherId String
  teacher   Teacher @relation(fields: [teacherId], references: [id])
}

// Many-to-Many
model Student {
  id      String           @id
  classes ClassStudent[]
}

model Class {
  id       String          @id
  students ClassStudent[]
}

model ClassStudent {
  studentId String
  classId   String
  student   Student @relation(fields: [studentId], references: [id])
  class     Class   @relation(fields: [classId], references: [id])
  
  @@id([studentId, classId])
}
```

## Real-time Communication

### WebSocket Pattern

```typescript
// Server
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws, req) => {
  const userId = getUserIdFromRequest(req);
  
  ws.on('message', (data) => {
    const message = JSON.parse(data);
    
    // Broadcast to all clients
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  });
});

// Client
const ws = new WebSocket('ws://localhost:8080');

ws.onmessage = (event) => {
  const update = JSON.parse(event.data);
  handleRealtimeUpdate(update);
};

ws.send(JSON.stringify({ type: 'ASSIGNMENT_UPDATED', id: '123' }));
```

### Server-Sent Events (SSE) - Simpler Alternative

```typescript
// Server
app.get('/api/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  
  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };
  
  // Send updates
  const interval = setInterval(() => {
    sendEvent({ type: 'PING', timestamp: Date.now() });
  }, 30000);
  
  req.on('close', () => clearInterval(interval));
});

// Client
const eventSource = new EventSource('/api/events');

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  handleUpdate(data);
};
```

**When to use:**
- WebSockets: Two-way communication (chat, collaboration)
- SSE: One-way updates from server (notifications, live scores)

## Background Jobs & Queues

### Bull Queue (Redis-based)

```typescript
import Bull from 'bull';

const emailQueue = new Bull('email', {
  redis: { host: 'localhost', port: 6379 }
});

// Producer: Add job
await emailQueue.add('assignment-reminder', {
  studentId: '123',
  assignmentId: '456',
});

// Consumer: Process job
emailQueue.process('assignment-reminder', async (job) => {
  const { studentId, assignmentId } = job.data;
  await sendReminderEmail(studentId, assignmentId);
});

// Scheduled jobs
await emailQueue.add(
  'daily-digest',
  { userId: '123' },
  { repeat: { cron: '0 9 * * *' } } // 9 AM daily
);
```

**Use cases:**
- Email sending
- Image/video processing
- Report generation
- Notifications
- Data sync

## Caching Strategies

### Redis Caching

```typescript
import Redis from 'ioredis';

const redis = new Redis();

// Cache-aside pattern
async function getAssignment(id: string) {
  // Try cache first
  const cached = await redis.get(`assignment:${id}`);
  if (cached) return JSON.parse(cached);
  
  // Cache miss - fetch from DB
  const assignment = await db.assignments.findUnique({ where: { id } });
  
  // Store in cache (TTL: 1 hour)
  await redis.setex(
    `assignment:${id}`,
    3600,
    JSON.stringify(assignment)
  );
  
  return assignment;
}

// Invalidate cache on update
async function updateAssignment(id: string, data: any) {
  const updated = await db.assignments.update({
    where: { id },
    data,
  });
  
  // Invalidate cache
  await redis.del(`assignment:${id}`);
  
  return updated;
}
```

### Cache Strategies

**Cache-aside (Lazy Loading):**
- Check cache → Miss → Load from DB → Store in cache
- Good for read-heavy workloads

**Write-through:**
- Write to cache and DB simultaneously
- Ensures cache is always up-to-date

**Write-behind:**
- Write to cache immediately, DB asynchronously
- Better performance, risk of data loss

## Error Handling & Logging

### Error Classes

```typescript
class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string
  ) {
    super(message);
  }
}

class ValidationError extends AppError {
  constructor(message: string) {
    super(400, message, 'VALIDATION_ERROR');
  }
}

class NotFoundError extends AppError {
  constructor(resource: string) {
    super(404, `${resource} not found`, 'NOT_FOUND');
  }
}
```

### Global Error Handler

```typescript
app.use((err: Error, req, res, next) => {
  // Log error
  logger.error({
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });
  
  // Send response
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
      }
    });
  } else {
    res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Something went wrong',
      }
    });
  }
});
```

### Structured Logging

```typescript
import winston from 'winston';

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// Usage
logger.info('Assignment created', {
  assignmentId: assignment.id,
  userId: user.id,
  timestamp: new Date(),
});

logger.error('Database connection failed', {
  error: err.message,
  stack: err.stack,
});
```

## File Upload & Storage

### Direct Upload to Cloud Storage

```typescript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Generate presigned URL for direct upload
async function getUploadUrl(filename: string) {
  const command = new PutObjectCommand({
    Bucket: 'my-bucket',
    Key: `uploads/${Date.now()}-${filename}`,
    ContentType: 'video/mp4',
  });
  
  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  return url;
}

// Client uploads directly to S3 using presigned URL
fetch(presignedUrl, {
  method: 'PUT',
  body: file,
  headers: { 'Content-Type': file.type },
});
```

### Video Processing Pipeline

```typescript
// 1. User uploads video
// 2. Trigger background job
await videoQueue.add('process-golf-swing', {
  videoUrl: s3Url,
  userId: user.id,
});

// 3. Process video
videoQueue.process('process-golf-swing', async (job) => {
  const { videoUrl, userId } = job.data;
  
  // Extract frames
  const frames = await extractFrames(videoUrl);
  
  // Run AI analysis
  const analysis = await analyzeSwing(frames);
  
  // Store results
  await db.swingAnalysis.create({
    data: {
      userId,
      videoUrl,
      metrics: analysis,
    },
  });
  
  // Notify user
  await notifyUser(userId, 'Analysis complete');
});
```

## API Rate Limiting

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests, please try again later',
});

app.use('/api/', limiter);

// Different limits for different endpoints
const strictLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
});

app.post('/api/login', strictLimiter, loginHandler);
```

## Testing

### Unit Tests (Services)

```typescript
describe('AssignmentService', () => {
  it('creates assignment with correct status', async () => {
    const mockRepo = {
      save: jest.fn().mockResolvedValue({ id: '123' }),
    };
    
    const service = new AssignmentService(mockRepo);
    const result = await service.create({
      title: 'Math Assignment',
      dueDate: new Date('2025-01-01'),
    }, 'teacher-123');
    
    expect(result.status).toBe('pending');
    expect(mockRepo.save).toHaveBeenCalled();
  });
});
```

### Integration Tests (API)

```typescript
describe('POST /api/assignments', () => {
  it('creates assignment and returns 201', async () => {
    const response = await request(app)
      .post('/api/assignments')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Math Assignment',
        dueDate: '2025-01-01',
      });
    
    expect(response.status).toBe(201);
    expect(response.body.data.id).toBeDefined();
  });
});
```

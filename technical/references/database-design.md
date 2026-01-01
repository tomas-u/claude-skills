# Database Design & Data Modeling

## Database Selection Guide

### SQL vs NoSQL Decision Matrix

**Use SQL (PostgreSQL, MySQL) when:**
- ✅ Complex relationships between entities
- ✅ ACID transactions required
- ✅ Data integrity is critical
- ✅ Complex queries with JOINs
- ✅ Structured data with consistent schema
- **Examples**: Financial data, user management, e-commerce orders

**Use NoSQL (MongoDB, DynamoDB) when:**
- ✅ Flexible/evolving schema
- ✅ Massive scale (horizontal scaling)
- ✅ Simple key-value or document lookups
- ✅ High write throughput
- ✅ Denormalized data is acceptable
- **Examples**: Logs, real-time analytics, user sessions, product catalogs

**Hybrid Approach:**
- PostgreSQL (primary) + Redis (caching)
- PostgreSQL (relational) + MongoDB (flexible docs)
- PostgreSQL + Elasticsearch (search)

## Schema Design Patterns

### Student Planning App Schema

```prisma
// User Management
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String
  role      Role
  createdAt DateTime @default(now())
  
  // Polymorphic relationships
  student   Student?
  teacher   Teacher?
  guardian  Guardian?
  
  @@index([email])
}

enum Role {
  STUDENT
  TEACHER
  GUARDIAN
  ADMIN
}

// Student Profile
model Student {
  id           String       @id @default(uuid())
  userId       String       @unique
  user         User         @relation(fields: [userId], references: [id])
  gradeLevel   Int
  
  assignments  Assignment[]
  classes      ClassStudent[]
  guardians    StudentGuardian[]
  
  @@index([userId])
}

// Teacher Profile
model Teacher {
  id          String       @id @default(uuid())
  userId      String       @unique
  user        User         @relation(fields: [userId], references: [id])
  department  String
  
  assignments Assignment[]
  classes     Class[]
  
  @@index([userId])
}

// Guardian Profile
model Guardian {
  id       String            @id @default(uuid())
  userId   String            @unique
  user     User              @relation(fields: [userId], references: [id])
  
  students StudentGuardian[]
  
  @@index([userId])
}

// Many-to-Many: Student-Guardian relationship
model StudentGuardian {
  studentId  String
  guardianId String
  student    Student  @relation(fields: [studentId], references: [id])
  guardian   Guardian @relation(fields: [guardianId], references: [id])
  
  @@id([studentId, guardianId])
  @@index([studentId])
  @@index([guardianId])
}

// Class
model Class {
  id        String         @id @default(uuid())
  name      String
  subject   String
  teacherId String
  teacher   Teacher        @relation(fields: [teacherId], references: [id])
  
  students  ClassStudent[]
  
  @@index([teacherId])
}

model ClassStudent {
  classId   String
  studentId String
  class     Class   @relation(fields: [classId], references: [id])
  student   Student @relation(fields: [studentId], references: [id])
  
  @@id([classId, studentId])
  @@index([studentId])
  @@index([classId])
}

// Assignment
model Assignment {
  id          String    @id @default(uuid())
  title       String
  description String?
  dueDate     DateTime
  subject     String
  
  studentId   String
  student     Student   @relation(fields: [studentId], references: [id])
  teacherId   String
  teacher     Teacher   @relation(fields: [teacherId], references: [id])
  
  status      AssignmentStatus @default(PENDING)
  priority    Priority         @default(MEDIUM)
  
  subtasks    Subtask[]
  
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  @@index([studentId, status])
  @@index([teacherId])
  @@index([dueDate])
  @@index([studentId, dueDate])
}

enum AssignmentStatus {
  PENDING
  IN_PROGRESS
  COMPLETED
  OVERDUE
}

enum Priority {
  LOW
  MEDIUM
  HIGH
}

// Subtask (breakdown of assignment)
model Subtask {
  id           String    @id @default(uuid())
  text         String
  completed    Boolean   @default(false)
  
  assignmentId String
  assignment   Assignment @relation(fields: [assignmentId], references: [id], onDelete: Cascade)
  
  scheduledDate DateTime?
  scheduledTime String?
  
  createdAt    DateTime  @default(now())
  completedAt  DateTime?
  
  @@index([assignmentId])
}
```

### Fitness Coaching App Schema

```prisma
model User {
  id            String         @id @default(uuid())
  email         String         @unique
  name          String
  handicap      Float?
  
  swingSessions SwingSession[]
  
  createdAt     DateTime       @default(now())
}

model SwingSession {
  id          String   @id @default(uuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  
  videoUrl    String
  club        String   // Driver, 7-iron, etc.
  location    String?
  
  // Overall metrics
  overallScore Int
  
  // Analysis results (stored as JSON for flexibility)
  metrics     Json     // All detailed metrics
  
  // Key metrics (indexed for querying)
  clubSpeed   Float
  tempo       Float
  clubPath    Float
  
  analyzedAt  DateTime @default(now())
  
  @@index([userId, analyzedAt])
  @@index([userId, club])
  @@index([analyzedAt])
}

// Alternative: Separate metrics table for complex queries
model SwingMetrics {
  id             String       @id @default(uuid())
  sessionId      String       @unique
  session        SwingSession @relation(fields: [sessionId], references: [id])
  
  clubSpeed      Float
  clubSpeedMax   Float
  tempo          Float
  tempoRatio     String
  clubPath       Float
  faceAngle      Float
  attackAngle    Float
  spineAngle     Float
  hipRotation    Float
  weightTransfer Float
  
  // Phase timings (JSON)
  phaseTimings   Json
  
  @@index([clubSpeed])
  @@index([tempo])
}

// Improvement tracking
model ImprovementGoal {
  id          String   @id @default(uuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  
  metric      String   // clubSpeed, tempo, etc.
  targetValue Float
  currentValue Float
  deadline    DateTime?
  
  status      String   // active, achieved, abandoned
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([userId, status])
}
```

## Indexing Strategies

### Common Query Patterns → Indexes

**Query: Get student's pending assignments**
```sql
SELECT * FROM assignments 
WHERE studentId = ? AND status = 'PENDING'
ORDER BY dueDate ASC;
```
**Index:** `@@index([studentId, status, dueDate])`

**Query: Get teacher's classes**
```sql
SELECT * FROM classes WHERE teacherId = ?;
```
**Index:** `@@index([teacherId])`

**Query: Find overdue assignments**
```sql
SELECT * FROM assignments 
WHERE status = 'PENDING' AND dueDate < NOW();
```
**Index:** `@@index([status, dueDate])`

### Composite Index Guidelines

**Order matters:**
```prisma
// ✅ Good: Supports both queries
@@index([studentId, status, dueDate])
// Query 1: WHERE studentId = ? AND status = ?
// Query 2: WHERE studentId = ? AND status = ? ORDER BY dueDate

// ❌ Less useful
@@index([dueDate, studentId, status])
// Only helps if filtering by dueDate first
```

**Index selectivity:**
Put high-selectivity columns first:
```prisma
// ✅ Good: email is unique (high selectivity)
@@index([email, role])

// ❌ Poor: role has only 4 values (low selectivity)
@@index([role, email])
```

## Data Integrity & Constraints

### Foreign Key Constraints

```prisma
model Assignment {
  studentId String
  student   Student @relation(fields: [studentId], references: [id], onDelete: Cascade)
}
```

**Cascade options:**
- `Cascade` - Delete assignments when student is deleted
- `Restrict` - Prevent student deletion if assignments exist
- `SetNull` - Set studentId to null when student deleted
- `NoAction` - Database default behavior

### Unique Constraints

```prisma
model User {
  email String @unique
  
  // Composite unique
  @@unique([firstName, lastName, birthDate])
}
```

### Check Constraints (via validation)

```typescript
// Enforce via application logic
function createAssignment(data) {
  if (data.dueDate < new Date()) {
    throw new Error('Due date must be in future');
  }
  
  if (data.priority && !['LOW', 'MEDIUM', 'HIGH'].includes(data.priority)) {
    throw new Error('Invalid priority');
  }
}
```

## Query Optimization

### N+1 Query Problem

**❌ Bad: N+1 queries**
```typescript
// 1 query to get assignments
const assignments = await db.assignment.findMany();

// N queries to get students (one per assignment)
for (const assignment of assignments) {
  assignment.student = await db.student.findUnique({
    where: { id: assignment.studentId }
  });
}
```

**✅ Good: Use includes/joins**
```typescript
const assignments = await db.assignment.findMany({
  include: {
    student: true,
    subtasks: true,
  }
});
// Single query with JOINs
```

### Pagination

**Offset-based (simple, less efficient):**
```typescript
const page = 2;
const perPage = 20;

const assignments = await db.assignment.findMany({
  skip: (page - 1) * perPage,
  take: perPage,
  orderBy: { dueDate: 'asc' },
});
```

**Cursor-based (efficient for large datasets):**
```typescript
const assignments = await db.assignment.findMany({
  take: 20,
  cursor: lastAssignmentId ? { id: lastAssignmentId } : undefined,
  skip: lastAssignmentId ? 1 : 0,
  orderBy: { id: 'asc' },
});

const nextCursor = assignments[assignments.length - 1]?.id;
```

### Select Only Needed Fields

**❌ Bad: Fetch everything**
```typescript
const users = await db.user.findMany(); // Gets all columns
```

**✅ Good: Select specific fields**
```typescript
const users = await db.user.findMany({
  select: {
    id: true,
    name: true,
    email: true,
    // Don't fetch password hash, etc.
  }
});
```

## Data Migration Strategies

### Schema Changes

**Adding a column (non-breaking):**
```prisma
// Before
model Assignment {
  id    String
  title String
}

// After - add optional column
model Assignment {
  id          String
  title       String
  description String? // Optional, won't break existing data
}
```

**Making column required (breaking):**
```typescript
// Step 1: Add optional column
model Assignment {
  priority Priority?
}

// Step 2: Backfill data
await db.assignment.updateMany({
  where: { priority: null },
  data: { priority: 'MEDIUM' },
});

// Step 3: Make required
model Assignment {
  priority Priority @default(MEDIUM)
}
```

**Renaming a column:**
```sql
-- Don't drop and recreate - data loss!
-- Use migration to rename
ALTER TABLE assignments RENAME COLUMN old_name TO new_name;
```

### Data Backfill Scripts

```typescript
// scripts/backfill-priority.ts
async function backfillPriority() {
  const assignments = await db.assignment.findMany({
    where: { priority: null },
  });
  
  for (const assignment of assignments) {
    // Determine priority based on due date
    const daysUntilDue = daysBetween(new Date(), assignment.dueDate);
    const priority = daysUntilDue <= 2 ? 'HIGH' : 'MEDIUM';
    
    await db.assignment.update({
      where: { id: assignment.id },
      data: { priority },
    });
  }
  
  console.log(`Backfilled ${assignments.length} assignments`);
}
```

## Soft Deletes

```prisma
model Assignment {
  id        String
  title     String
  deletedAt DateTime?
  
  @@index([deletedAt])
}

// Soft delete
await db.assignment.update({
  where: { id },
  data: { deletedAt: new Date() },
});

// Query excluding deleted
await db.assignment.findMany({
  where: { deletedAt: null },
});

// Restore
await db.assignment.update({
  where: { id },
  data: { deletedAt: null },
});
```

## Database Performance Monitoring

### Key Metrics to Track

- **Query duration** - Slow queries (>100ms)
- **Connection pool** - Exhausted connections
- **Cache hit rate** - Redis/query cache effectiveness
- **Index usage** - Unused indexes (remove them)
- **Table size** - Growth over time

### Query Analysis

```sql
-- PostgreSQL: Find slow queries
SELECT query, calls, total_time, mean_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;

-- MySQL: Enable slow query log
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1; -- 1 second
```

## JSON Column Usage

**When to use JSON columns:**
- ✅ Flexible metadata/settings
- ✅ Audit logs
- ✅ Complex metrics (fitness form data)
- ✅ Rapidly changing schema

**When NOT to use:**
- ❌ Data you need to query/filter by
- ❌ Relational data
- ❌ Critical transactional data

```prisma
model SwingSession {
  id      String
  metrics Json   // Flexible metrics storage
}

// Query JSON in PostgreSQL
const sessions = await db.$queryRaw`
  SELECT * FROM swing_sessions
  WHERE metrics->>'clubSpeed' > '100'
`;
```

## Transactions

### Basic Transaction

```typescript
await db.$transaction(async (tx) => {
  const assignment = await tx.assignment.create({
    data: assignmentData,
  });
  
  await tx.subtask.createMany({
    data: subtasks.map(st => ({
      ...st,
      assignmentId: assignment.id,
    })),
  });
});
```

### Optimistic Locking

```prisma
model Assignment {
  id      String
  title   String
  version Int    @default(0)
}

// Update with version check
const updated = await db.assignment.updateMany({
  where: { 
    id: assignmentId,
    version: currentVersion,
  },
  data: {
    title: newTitle,
    version: { increment: 1 },
  },
});

if (updated.count === 0) {
  throw new Error('Assignment was modified by another user');
}
```

## Database Scaling Strategies

### Read Replicas

```typescript
// Write to primary
await primaryDb.assignment.create({ data });

// Read from replica
const assignments = await replicaDb.assignment.findMany();
```

### Sharding (Horizontal Partitioning)

```typescript
// Shard by student ID
function getShardForStudent(studentId: string) {
  const shardCount = 4;
  const hash = hashCode(studentId);
  return hash % shardCount; // 0, 1, 2, or 3
}

const shard = getShardForStudent(studentId);
const db = databaseShards[shard];
await db.assignment.findMany({ where: { studentId } });
```

**When to shard:**
- 10M+ rows in a table
- Single database can't handle load
- Clear sharding key (user ID, tenant ID)

### Archiving Old Data

```typescript
// Move old completed assignments to archive table
await db.$executeRaw`
  INSERT INTO assignments_archive
  SELECT * FROM assignments
  WHERE status = 'COMPLETED' 
    AND updated_at < NOW() - INTERVAL '1 year'
`;

await db.$executeRaw`
  DELETE FROM assignments
  WHERE status = 'COMPLETED'
    AND updated_at < NOW() - INTERVAL '1 year'
`;
```

# Backlog Management

## Backlog Structure & Prioritization

### Story Hierarchy

```
Epic (Large initiative, spans multiple sprints)
  └── Feature (Deliverable capability)
      └── User Story (Single unit of value)
          └── Task (Technical implementation step)
```

**Example for a student planning app:**
```
Epic: Student Task Management
├── Feature: Task Breakdown
│   ├── Story: As a student, I want to break assignments into subtasks
│   │   ├── Task: Create Subtask database model
│   │   ├── Task: Build UI for adding subtasks
│   │   └── Task: Implement drag-to-reorder
│   └── Story: As a student, I want to schedule when I'll do each subtask
└── Feature: Progress Tracking
    └── Story: As a student, I want to see my overall progress
```

### User Story Format

**Template:**
```
As a [role]
I want to [action]
So that [benefit]

Acceptance Criteria:
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

Definition of Done:
- [ ] Code implemented and tested
- [ ] UX reviewed
- [ ] Docs updated
- [ ] Deployed to staging
```

**Good Example:**
```
As a student
I want to break down large assignments into smaller subtasks
So that I can better manage my workload and not feel overwhelmed

Acceptance Criteria:
- [ ] Can add unlimited subtasks to any assignment
- [ ] Can edit/delete subtasks
- [ ] Can reorder subtasks by dragging
- [ ] Each subtask shows as checkbox in the UI
- [ ] Progress bar updates as subtasks are completed
- [ ] Subtasks persist to database

Definition of Done:
- [ ] Unit tests for subtask CRUD operations
- [ ] Integration test for progress calculation
- [ ] UX review approved
- [ ] Works on iOS and Android
- [ ] Deployed to staging and tested
```

**Bad Example (too vague):**
```
As a user
I want better task management
So that things work better
```

### Story Sizing

**Story Points (Fibonacci):** 1, 2, 3, 5, 8, 13, 21

**Guidelines:**
- **1 point**: Simple UI change, config update (1-2 hours)
- **2 points**: Small feature, single component (half day)
- **3 points**: Standard feature (1 day)
- **5 points**: Complex feature, multiple components (2-3 days)
- **8 points**: Large feature (1 week)
- **13 points**: Very large, should be split
- **21+ points**: Epic, must be broken down

**Estimation Factors:**
- Complexity (technical difficulty)
- Uncertainty (how well understood)
- Effort (time required)
- Dependencies (what needs to happen first)

## Prioritization Frameworks

### RICE Score (Recommended)

**Formula:** `(Reach × Impact × Confidence) / Effort`

**Reach:** How many users affected per time period?
- 1,000 students will use this feature daily = 1000

**Impact:** How much will this improve their experience?
- Massive = 3
- High = 2
- Medium = 1
- Low = 0.5
- Minimal = 0.25

**Confidence:** How sure are we about reach/impact/effort?
- High = 100%
- Medium = 80%
- Low = 50%

**Effort:** Person-months to implement
- 1 week = 0.25
- 1 month = 1
- 3 months = 3

**Example Calculation:**
```
Feature: Task Breakdown for Students
Reach: 1000 students × 30 days = 30,000
Impact: High = 2
Confidence: High = 100% = 1.0
Effort: 2 weeks = 0.5 person-months

RICE = (30,000 × 2 × 1.0) / 0.5 = 120,000

(Higher RICE = Higher Priority)
```

### Value vs Effort Matrix

```
High Value, Low Effort  → DO FIRST (Quick wins)
High Value, High Effort → PLAN & SCHEDULE
Low Value, Low Effort   → DO LATER (Fill time)
Low Value, High Effort  → DON'T DO
```

### MoSCoW Method

**Must Have:** Critical for launch, no value without it
**Should Have:** Important but not critical
**Could Have:** Nice to have if time permits
**Won't Have:** Out of scope for this release

**Example for a student planning app MVP:**
```
Must Have:
- User authentication (student/teacher/guardian)
- Create assignments
- View assignments
- Mark assignments complete
- Basic due date tracking

Should Have:
- Break tasks into subtasks
- Schedule tasks on calendar
- Progress tracking
- Notifications for due dates

Could Have:
- Study time estimates
- Integration with Google Calendar
- Gamification (points, badges)
- Study groups

Won't Have (v1):
- Video chat with teachers
- AI task helper
- Marketplace for tutors
```

## Backlog Refinement

### When to Refine

**Regular cadence:**
- Weekly refinement sessions
- 1-2 sprints ahead of development
- Stories ready = 2× sprint capacity

### Refinement Checklist

For each story, verify:
- [ ] Clear user value articulated
- [ ] Acceptance criteria defined
- [ ] Sized (story points)
- [ ] Dependencies identified
- [ ] Technical approach discussed
- [ ] UX considerations noted
- [ ] No blockers
- [ ] Team understands it

### Story Splitting Techniques

**When story is too large (8+ points), split by:**

**1. Workflow Steps**
```
Original: "Student can manage assignments"

Split:
- Create assignment
- Edit assignment
- Delete assignment
- Archive assignment
```

**2. CRUD Operations**
```
Original: "Assignment management"

Split:
- Create assignment (POST)
- Read assignments (GET)
- Update assignment (PUT)
- Delete assignment (DELETE)
```

**3. Happy Path vs Edge Cases**
```
Original: "Student login"

Split:
- Happy path: Successful login
- Error handling: Wrong password
- Error handling: Account locked
- Forgot password flow
```

**4. Simple vs Complex Versions**
```
Original: "Task scheduling"

Split:
- Basic: Pick a date
- Advanced: Recurring tasks
- Advanced: Time blocking with conflicts
```

**5. Platforms**
```
Original: "Notifications"

Split:
- Web notifications
- iOS push notifications
- Android push notifications
- Email notifications
```

## Backlog Organization

### Typical Structure

```
BACKLOG
├── Ready for Development (fully refined, top priority)
├── Next Up (being refined)
├── Backlog (prioritized but not refined)
├── Icebox (ideas, low priority)
└── Archive (completed or rejected)
```

### Labels/Tags

**Type:**
- `feature` - New functionality
- `bug` - Something broken
- `tech-debt` - Code improvements
- `documentation` - Docs update

**Priority:**
- `p0-critical` - Drop everything
- `p1-high` - Next sprint
- `p2-medium` - Soon
- `p3-low` - Someday

**Component:**
- `frontend` - UI changes
- `backend` - API/server
- `database` - Schema changes
- `infrastructure` - DevOps

**User Type:**
- `student` - Student-facing
- `teacher` - Teacher-facing
- `guardian` - Guardian-facing

### Milestone Planning

**Release Planning:**
```
v1.0 MVP (Month 1-2)
- Core user authentication
- Basic assignment CRUD
- Simple task list
- Due date tracking

v1.1 Enhancement (Month 3)
- Task breakdown
- Progress tracking
- Basic notifications

v1.2 Growth (Month 4)
- Calendar integration
- Study time estimates
- Enhanced notifications

v2.0 Scale (Month 5-6)
- Multi-class support
- Guardian dashboard
- Performance optimizations
```

## Managing Dependencies

### Dependency Types

**1. Technical Dependencies**
```
Story: "Student can schedule tasks"
Depends on: "Task breakdown feature" (must exist first)
```

**2. Data Dependencies**
```
Story: "Show student progress"
Depends on: "Track task completion" (need data first)
```

**3. External Dependencies**
```
Story: "Google Calendar sync"
Depends on: Google API approval (external)
```

### Tracking Dependencies

In issue/story:
```
## Dependencies
Blocks: #234, #235 (these stories can't start until this is done)
Blocked by: #123 (this story can't start until #123 is done)
Related to: #456 (similar feature, coordinate approach)
```

## Backlog Health Metrics

**Track these metrics:**

**Velocity:** Story points completed per sprint
- Measure over 3-5 sprints
- Use for capacity planning

**Cycle Time:** Days from "in progress" to "done"
- Track to identify bottlenecks

**Refinement Ratio:** Refined stories / Total stories
- Aim for 2-3 sprints of refined work

**Age of Stories:** How long since created?
- Archive stories >6 months old unless still relevant

**Scope Creep:** Stories added mid-sprint
- Should be minimal (<10%)

## Grooming Templates

### Sprint Planning Template

```
Sprint Goal: [What we want to achieve]

Capacity: [Team size × days × 6 hours = story points available]

Committed Stories:
- [ ] Story #123 (5 points) - Task breakdown
- [ ] Story #124 (3 points) - Progress bar
- [ ] Story #125 (2 points) - Bug fix

Stretch Goals:
- [ ] Story #126 (3 points) - Nice to have

Sprint Risks:
- Dependency on API approval
- New team member onboarding

Definition of Done:
- Code reviewed
- Tests passing
- Deployed to staging
- Product owner approved
```

### Story Template (GitHub Issue)

```markdown
## User Story
As a [role]
I want to [action]
So that [benefit]

## Context
[Why are we building this? What problem does it solve?]

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Design
[Link to Figma/mockups or describe UX]

## Technical Notes
[Architecture considerations, API endpoints, data model]

## Dependencies
Blocked by: #123
Blocks: #234

## Story Points
[1, 2, 3, 5, 8]

## Priority
[P0-Critical, P1-High, P2-Medium, P3-Low]

## Definition of Done
- [ ] Code complete and tested
- [ ] UX reviewed
- [ ] Documentation updated
- [ ] Deployed to staging
- [ ] Product owner accepted
```

## Tips for Effective Backlog Management

**Do:**
- ✅ Keep top items refined (2-3 sprints ahead)
- ✅ Archive old, irrelevant stories
- ✅ Regular grooming sessions
- ✅ Clear acceptance criteria
- ✅ Involve the team in estimation
- ✅ Review and adjust priorities regularly

**Don't:**
- ❌ Refine entire backlog (waste of time)
- ❌ Estimate in hours (use story points)
- ❌ Let backlog grow indefinitely
- ❌ Skip user stories (jump to tasks)
- ❌ Change scope mid-sprint
- ❌ Ignore technical debt

## Handling Common Scenarios

**Scenario: Too many feature requests**
→ Use RICE scoring, be ruthless about saying no

**Scenario: Stories keep growing in scope**
→ Lock acceptance criteria after refinement, new requirements = new story

**Scenario: Unclear priorities**
→ Return to product vision/goals, what moves metrics?

**Scenario: Team velocity inconsistent**
→ Look for bottlenecks, improve estimation, reduce WIP

**Scenario: Stakeholders want everything "high priority"**
→ Force ranking, explain opportunity cost, show capacity limits

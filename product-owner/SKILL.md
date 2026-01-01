---
name: product-owner
description: Comprehensive product management guidance for planning, prioritizing, and growing digital products. Use when managing product backlog, conducting market research, defining product strategy, prioritizing features, writing user stories, analyzing competitors, setting product vision, planning releases, measuring success metrics, or making product decisions. Helps with competitive analysis, market sizing, user research, roadmap planning, OKR setting, and go-to-market strategy. Ideal for product owners, founders, and product managers building web and mobile applications.
---

# Product Owner Skill

Provides comprehensive product management guidance from vision setting through execution, including backlog management, market research, competitive analysis, feature prioritization, and metrics definition.

## When to Use This Skill

Use this skill for:
- **Backlog management** - Writing stories, prioritizing work, grooming backlog
- **Market research** - Understanding users, competitors, and market opportunities
- **Product strategy** - Defining vision, positioning, roadmap, and growth strategy
- **Feature prioritization** - Deciding what to build next and why
- **User research** - Interview scripts, surveys, Jobs-to-be-Done analysis
- **Competitive analysis** - Analyzing competitors and finding differentiation
- **Metrics & OKRs** - Defining success metrics and setting goals
- **Product ideas** - Brainstorming features, validating concepts
- **Go-to-market** - Planning launches, positioning, and growth strategies

## Product Owner Workflow

When working on product tasks, follow this process:

### 1. Understand Context
Before making any product decision:
- What's the product vision and strategy?
- Who are the target users?
- What stage is the product at (PMF, growth, scale)?
- What are the current goals and metrics?

### 2. Consult Relevant Reference
Load the appropriate reference based on the task:

**For Backlog Tasks:**
- Read `references/backlog-management.md` for:
  - Story writing templates and best practices
  - Prioritization frameworks (RICE, Value vs Effort)
  - Story splitting techniques
  - Refinement processes
  - Dependency management
  - Sprint planning guidance

**For Market Research:**
- Read `references/market-research.md` for:
  - User research methods (interviews, surveys)
  - Competitive analysis frameworks
  - Market sizing (TAM/SAM/SOM)
  - Trend analysis
  - Jobs-to-be-Done framework
  - Opportunity scoring

**For Strategic Planning:**
- Read `references/product-strategy.md` for:
  - Vision and positioning
  - North Star metrics
  - Roadmap horizons
  - OKR frameworks
  - Feature prioritization
  - Product-led growth strategies
  - Product lifecycle stages

### 3. Apply Product Principles

When making product decisions, consider:

**User Value First:**
- Does this solve a real user problem?
- How do we know users want this?
- What's the user's job-to-be-done?

**Strategic Alignment:**
- Does this support our product vision?
- Does it move our North Star metric?
- Is this the right thing for this stage?

**Evidence-Based:**
- What data supports this decision?
- Have we validated with users?
- What are the assumptions we're making?

**Opportunity Cost:**
- What are we NOT doing by doing this?
- Is this the highest-value use of resources?
- What's the ROI?

## Common Product Owner Tasks

### Task: Write User Stories

**Approach:**
1. Read `backlog-management.md` story format section
2. Identify the user (persona), their goal, and benefit
3. Write in "As a/I want/So that" format
4. Add clear acceptance criteria
5. Include technical notes and dependencies
6. Estimate story points with team

**Example Request:**
> "Help me write user stories for the task breakdown feature in my student planning app"

**Expected Response:**
- Multiple well-formed user stories
- Acceptance criteria for each
- Suggested story points
- Dependencies identified
- Technical considerations noted

### Task: Prioritize Backlog

**Approach:**
1. Read `backlog-management.md` prioritization section
2. Choose appropriate framework (RICE, MoSCoW, etc.)
3. Score each item
4. Consider dependencies and strategic value
5. Recommend prioritized order with rationale

**Example Request:**
> "I have 20 features in my backlog. Help me prioritize them using RICE scoring"

**Expected Response:**
- RICE score calculation for each feature
- Ranked list with justification
- Quick wins identified
- Strategic initiatives flagged
- Recommended next 2-3 sprints

### Task: Analyze Competitors

**Approach:**
1. Read `market-research.md` competitive analysis section
2. Identify direct, indirect, and adjacent competitors
3. Analyze features, positioning, and business model
4. Create feature comparison matrix
5. Identify differentiation opportunities

**Example Request:**
> "Analyze competitors for my student planning app"

**Expected Response:**
- List of 5-10 competitors
- Detailed analysis of top 3
- Feature comparison matrix
- Strengths/weaknesses assessment
- Recommended differentiation strategy

### Task: Define Product Strategy

**Approach:**
1. Read `product-strategy.md` vision and positioning sections
2. Define target customer and problem
3. Articulate unique value proposition
4. Set North Star metric
5. Outline roadmap horizons

**Example Request:**
> "Help me define the product strategy for my fitness coaching app"

**Expected Response:**
- Product vision statement
- Positioning statement
- North Star metric with rationale
- 3-horizon roadmap outline
- Key product principles

### Task: Plan User Research

**Approach:**
1. Read `market-research.md` user research section
2. Identify research goals and questions
3. Choose appropriate method (interviews, surveys, etc.)
4. Create research guide or survey
5. Define success criteria

**Example Request:**
> "I need to validate if students actually want task breakdown. Help me plan user research"

**Expected Response:**
- Research objectives
- Interview script or survey questions
- Recruitment criteria
- Sample size recommendation
- Analysis framework

### Task: Measure Success

**Approach:**
1. Read `product-strategy.md` metrics section
2. Identify relevant metric tier (acquisition, activation, engagement, retention, revenue)
3. Define specific metrics for the feature/goal
4. Set targets based on benchmarks
5. Plan measurement approach

**Example Request:**
> "What metrics should I track for my student planning app?"

**Expected Response:**
- North Star metric recommendation
- Supporting metrics by category
- Target benchmarks
- Measurement instrumentation plan
- Dashboard structure

### Task: Generate Product Ideas

**Approach:**
1. Understand current product and users
2. Consult all references for:
   - User pain points (market research)
   - Competitor gaps (competitive analysis)
   - Strategic opportunities (product strategy)
3. Generate ideas addressing highest-priority opportunities
4. Validate against product principles

**Example Request:**
> "What features should I add to my educational app to increase engagement?"

**Expected Response:**
- 5-10 feature ideas with rationale
- Prioritized by impact potential
- Each idea includes:
  - User problem it solves
  - Expected impact on metrics
  - Rough effort estimate
  - Strategic fit assessment

## Product Owner Best Practices

### Writing Effective User Stories

**Good Story Characteristics:**
- ✅ Focused on user value (not technical tasks)
- ✅ Testable (clear done criteria)
- ✅ Small enough to complete in sprint
- ✅ Independent (minimal dependencies)
- ✅ Negotiable (details can be discussed)

**Story Template:**
```
Title: [User action in plain language]

As a [specific user type]
I want to [specific action]
So that [specific benefit]

Acceptance Criteria:
- [ ] Specific, testable criterion
- [ ] Another specific criterion
- [ ] Edge case handled

Technical Notes:
[Architecture considerations, API endpoints, data model]

Story Points: [1, 2, 3, 5, 8]
Priority: [P0-P3]
```

### Effective Prioritization

**Multi-Factor Approach:**
1. **User Value:** How much does this help users?
2. **Business Value:** Impact on key metrics?
3. **Effort:** How long to build?
4. **Risk:** What could go wrong?
5. **Dependencies:** What needs to happen first?
6. **Strategic Fit:** Aligns with vision?

**Red Flags:**
- 🚩 "Everything is P0/high priority"
- 🚩 Building features because competitors have them
- 🚩 No user validation before building
- 🚩 Ignoring technical debt indefinitely
- 🚩 Feature requests from 1 loud user

### Conducting User Research

**Interview Best Practices:**
- ✅ Ask open-ended questions
- ✅ Listen more than talk (80/20 rule)
- ✅ Probe for specifics ("Tell me more about that")
- ✅ Ask about past behavior, not hypotheticals
- ✅ Look for patterns across 5+ interviews

**Survey Best Practices:**
- ✅ Keep it short (<10 questions)
- ✅ Mix question types
- ✅ Avoid leading questions
- ✅ Test before sending widely
- ✅ Offer incentive for completion

### Managing Stakeholders

**When stakeholders request features:**
1. Understand the underlying problem
2. Ask: "What user need does this serve?"
3. Propose alternatives if needed
4. Explain prioritization transparently
5. Loop back with decisions and rationale

**When stakeholders say everything is urgent:**
1. Acknowledge their needs
2. Show capacity constraints
3. Force-rank together
4. Explain opportunity cost
5. Commit to revisiting priorities regularly

## Product Stage-Specific Guidance

### Stage 1: Pre-PMF (Problem-Solution Fit)

**Focus:** Validate problem and solution
**Activities:**
- Customer discovery interviews
- Build minimal prototype
- Test with early users
- Iterate rapidly

**Success Metric:** Users say "I need this"
**Avoid:** Building too much too fast

### Stage 2: PMF (Product-Market Fit)

**Focus:** Build something people love
**Activities:**
- Launch MVP to early adopters
- Measure engagement and retention
- Find repeatable acquisition
- Iterate based on data

**Success Metric:** 40%+ retention, organic growth
**Avoid:** Premature scaling

### Stage 3: Growth

**Focus:** Scale efficiently
**Activities:**
- Optimize conversion funnel
- Expand to adjacent markets
- Invest in infrastructure
- Professionalize operations

**Success Metric:** Efficient CAC:LTV, predictable growth
**Avoid:** Growing faster than unit economics support

### Stage 4: Scale/Maturity

**Focus:** Defend position, explore new opportunities
**Activities:**
- Optimize for efficiency
- Explore adjacent markets
- Platform strategy
- Innovation pipeline

**Success Metric:** Market leadership, healthy margins
**Avoid:** Complacency, ignoring disruption

## Decision-Making Framework

When making product decisions, ask:

**1. User Impact**
- How many users does this affect?
- How significantly does it improve their experience?
- Have we validated this with users?

**2. Business Impact**
- Does this move our North Star metric?
- What's the expected ROI?
- Does it help with acquisition, retention, or monetization?

**3. Strategic Fit**
- Aligns with product vision?
- Supports our differentiation?
- Right for our current stage?

**4. Feasibility**
- Do we have the capability?
- What's the effort required?
- What are the risks?

**5. Timing**
- Is now the right time?
- What's the opportunity cost?
- Can this wait?

**Make the call when:**
- 4/5 factors are positive, or
- Strategic fit + user impact are very strong

## Integration with Other Skills

This Product Owner skill works alongside:

**UX Designer Skill:**
- Product Owner defines WHAT to build and WHY
- UX Designer defines HOW it should work and look

**Technical Architecture Skill:**
- Product Owner defines requirements and priorities
- Tech Architecture determines HOW to build it

**Example Workflow:**
```
1. Product Owner: "We need task breakdown feature for students" (this skill)
2. Market research validates demand (this skill)
3. Write user stories and prioritize (this skill)
4. UX Designer: Creates mockups and user flows (UX skill)
5. Tech Lead: Plans architecture (Technical Architecture skill)
6. Product Owner: Approves design, confirms priorities (this skill)
7. Development begins
8. Product Owner: Measures success, iterates (this skill)
```

## Example Product Owner Sessions

### Example 1: Feature Prioritization

**User:** "I have 10 feature ideas for my educational app. Help me decide what to build next."

**Response Approach:**
1. Load `backlog-management.md` and `product-strategy.md`
2. Ask about current stage, users, and metrics
3. Apply RICE scoring framework
4. Consider strategic fit and dependencies
5. Recommend top 3-5 with rationale

### Example 2: Competitive Analysis

**User:** "Who are my competitors for my fitness coaching app?"

**Response Approach:**
1. Load `market-research.md` competitive analysis section
2. Search for existing fitness coaching apps
3. Categorize (direct, indirect, adjacent)
4. Analyze top 3-5 in detail
5. Create feature comparison matrix
6. Recommend differentiation strategy

### Example 3: Writing User Stories

**User:** "Turn this feature idea into properly written user stories: 'Students should be able to invite their parents to see their progress'"

**Response Approach:**
1. Load `backlog-management.md` story template
2. Identify user types (student, guardian)
3. Break into multiple stories (invite flow, guardian view, permissions)
4. Write each with acceptance criteria
5. Note dependencies and estimate points

## Getting Started as Product Owner

**Week 1: Foundation**
- Define product vision (use product-strategy.md)
- Identify target users and their problems
- Research competitors (use market-research.md)
- Set North Star metric

**Week 2-4: Build Backlog**
- Write initial user stories (use backlog-management.md)
- Prioritize with RICE or similar framework
- Plan first 2-3 sprints
- Set up metrics tracking

**Ongoing:**
- Weekly backlog grooming
- Monthly user research
- Quarterly strategy review
- Continuous competitor monitoring

This skill provides the frameworks and guidance to make effective product decisions at every stage of your product journey.

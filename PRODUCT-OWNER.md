# Product Owner Skill Package

Comprehensive product management guidance for planning, prioritizing, and growing digital products. From vision to execution, backlog to metrics.

## What This Skill Does

This skill helps Claude provide expert product management guidance covering:

1. **Backlog Management** - Writing user stories, prioritizing work, grooming backlog
2. **Market Research** - User research, competitive analysis, market opportunities
3. **Product Strategy** - Vision, positioning, roadmap, North Star metrics
4. **Feature Prioritization** - RICE scoring, value vs effort, strategic alignment
5. **User Research** - Interview scripts, surveys, Jobs-to-be-Done analysis
6. **Competitive Analysis** - Analyzing competitors, finding differentiation
7. **Metrics & OKRs** - Defining success metrics, setting measurable goals
8. **Go-to-Market** - Launch planning, positioning, growth strategies

## Key Features

### Product Owner Workflow

**1. Understand Context**
- Product vision and strategy
- Target users and their needs
- Product stage (pre-PMF, PMF, growth, scale)
- Current goals and metrics

**2. Consult References**
- **backlog-management.md** - Story writing, prioritization, grooming
- **market-research.md** - User research, competitive analysis, opportunity scoring
- **product-strategy.md** - Vision, positioning, roadmap, OKRs, metrics

**3. Apply Product Principles**
- User value first
- Strategic alignment
- Evidence-based decisions
- Opportunity cost awareness

### User Story Writing

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

**Good Story Characteristics:**
- ✅ Focused on user value (not technical tasks)
- ✅ Testable (clear done criteria)
- ✅ Small enough to complete in sprint
- ✅ Independent (minimal dependencies)
- ✅ Negotiable (details can be discussed)

### Prioritization Frameworks

**RICE Scoring:**
- **Reach** - How many users affected?
- **Impact** - How much improvement per user?
- **Confidence** - How certain are we?
- **Effort** - How long to build?
- **Score** = (Reach × Impact × Confidence) / Effort

**Multi-Factor Approach:**
1. User Value - How much does this help users?
2. Business Value - Impact on key metrics?
3. Effort - How long to build?
4. Risk - What could go wrong?
5. Dependencies - What needs to happen first?
6. Strategic Fit - Aligns with vision?

### User Research Methods

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

### Product Stage-Specific Guidance

**Stage 1: Pre-PMF (Problem-Solution Fit)**
- Focus: Validate problem and solution
- Activities: Customer discovery, MVP, rapid iteration
- Success Metric: Users say "I need this"

**Stage 2: PMF (Product-Market Fit)**
- Focus: Build something people love
- Activities: Launch to early adopters, measure engagement
- Success Metric: 40%+ retention, organic growth

**Stage 3: Growth**
- Focus: Scale efficiently
- Activities: Optimize funnel, expand markets, professionalize
- Success Metric: Efficient CAC:LTV, predictable growth

**Stage 4: Scale/Maturity**
- Focus: Defend position, explore new opportunities
- Activities: Optimize efficiency, platform strategy, innovation
- Success Metric: Market leadership, healthy margins

## Installation

### Via Claude.ai
1. Go to **Settings** → **Skills**
2. Upload the `product-owner` folder
3. Skill will be named "product-owner"

### Manual
1. Copy `product-owner/` to `/mnt/skills/user/product-owner/`
2. Restart Claude or reload skills

## Package Structure

```
product-owner/
├── SKILL.md                          # Main skill definition
└── references/
    ├── backlog-management.md         # Story writing, prioritization, grooming
    ├── market-research.md            # User research, competitive analysis
    └── product-strategy.md           # Vision, positioning, roadmap, OKRs
```

## Common Product Owner Tasks

### 1. Write User Stories

**Request:** "Help me write user stories for the task breakdown feature"

**Response includes:**
- Multiple well-formed user stories
- Clear acceptance criteria for each
- Suggested story points
- Dependencies identified
- Technical considerations noted

### 2. Prioritize Backlog

**Request:** "I have 20 features. Help me prioritize using RICE"

**Response includes:**
- RICE score calculation for each feature
- Ranked list with justification
- Quick wins identified
- Strategic initiatives flagged
- Recommended next 2-3 sprints

### 3. Analyze Competitors

**Request:** "Who are my competitors for student planning apps?"

**Response includes:**
- List of 5-10 competitors
- Detailed analysis of top 3
- Feature comparison matrix
- Strengths/weaknesses assessment
- Recommended differentiation strategy

### 4. Define Product Strategy

**Request:** "Help me define product strategy for my app"

**Response includes:**
- Product vision statement
- Positioning statement
- North Star metric with rationale
- 3-horizon roadmap outline
- Key product principles

### 5. Plan User Research

**Request:** "Validate if students want task breakdown feature"

**Response includes:**
- Research objectives
- Interview script or survey questions
- Recruitment criteria
- Sample size recommendation
- Analysis framework

### 6. Measure Success

**Request:** "What metrics should I track?"

**Response includes:**
- North Star metric recommendation
- Supporting metrics by category
- Target benchmarks
- Measurement instrumentation plan
- Dashboard structure

## Integration with Other Skills

### With ux Skill
```
product-owner skill: Defines WHAT to build and WHY
         ↓
   User stories and priorities
         ↓
ux skill: Defines HOW it should work and look
         ↓
   Mockups and user flows
         ↓
product-owner skill: Approves design, confirms priorities
```

### With technical Skill
```
product-owner skill: Defines requirements and priorities
         ↓
   User stories with acceptance criteria
         ↓
technical skill: Determines HOW to build it
         ↓
   Architecture and implementation plan
         ↓
product-owner skill: Validates technical approach
```

### Example Workflow
```
1. product-owner: "We need task breakdown for students"
2. Market research validates demand
3. Write user stories and prioritize
4. ux: Creates mockups and user flows
5. technical: Plans architecture
6. product-owner: Approves design, confirms priorities
7. Development begins
8. product-owner: Measures success, iterates
```

## Decision-Making Framework

When making product decisions, ask:

**1. User Impact**
- How many users affected?
- How significant is the improvement?
- Have we validated with users?

**2. Business Impact**
- Does this move our North Star metric?
- What's the expected ROI?
- Impact on acquisition, retention, or monetization?

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

## Usage Examples

### Example 1: Feature Prioritization

```
You: "I have 10 feature ideas for my educational app. Help me decide what to build next."

product-owner skill:
1. Applies RICE scoring framework
2. Considers strategic fit and dependencies
3. Recommends top 3-5 with rationale:
   - Feature A (RICE: 85) - Quick win, high user value
   - Feature B (RICE: 78) - Strategic initiative, enables future features
   - Feature C (RICE: 72) - Solves top user pain point
4. Suggests next 2-3 sprints
```

### Example 2: Competitive Analysis

```
You: "Analyze competitors for my fitness coaching app"

product-owner skill:
1. Identifies 8 competitors (direct, indirect, adjacent)
2. Analyzes top 3 in detail:
   - Competitor A: Strengths, weaknesses, pricing, features
   - Competitor B: Strengths, weaknesses, pricing, features
   - Competitor C: Strengths, weaknesses, pricing, features
3. Creates feature comparison matrix
4. Identifies differentiation opportunities:
   - Gap 1: AI-powered personalized coaching
   - Gap 2: Social features for training groups
   - Gap 3: Integration with popular fitness apps
5. Recommends differentiation strategy
```

### Example 3: Writing User Stories

```
You: "Turn 'Students should invite parents' into user stories"

product-owner skill:
1. Breaks into multiple stories:
   Story 1: Student sends parent invitation
   Story 2: Guardian accepts invitation
   Story 3: Guardian views student progress
   Story 4: Guardian receives notifications
2. Each story includes:
   - User type, goal, benefit
   - Acceptance criteria
   - Technical notes
   - Story points estimate
3. Notes dependencies (Story 2 depends on Story 1)
```

## Best Practices

### Effective Prioritization Red Flags
- 🚩 "Everything is P0/high priority"
- 🚩 Building features because competitors have them
- 🚩 No user validation before building
- 🚩 Ignoring technical debt indefinitely
- 🚩 Feature requests from 1 loud user

### Managing Stakeholders

**When stakeholders request features:**
1. Understand the underlying problem
2. Ask: "What user need does this serve?"
3. Propose alternatives if needed
4. Explain prioritization transparently
5. Loop back with decisions and rationale

**When everything is "urgent":**
1. Acknowledge their needs
2. Show capacity constraints
3. Force-rank together
4. Explain opportunity cost
5. Commit to revisiting priorities regularly

## Getting Started as Product Owner

**Week 1: Foundation**
- Define product vision
- Identify target users and problems
- Research competitors
- Set North Star metric

**Week 2-4: Build Backlog**
- Write initial user stories
- Prioritize with RICE or similar framework
- Plan first 2-3 sprints
- Set up metrics tracking

**Ongoing:**
- Weekly backlog grooming
- Monthly user research
- Quarterly strategy review
- Continuous competitor monitoring

## Metrics & OKRs

### North Star Metric
The one metric that captures core value delivery:
- Educational app: Weekly active learning time
- SaaS tool: Number of active teams
- Marketplace: Successful transactions per week

### Supporting Metrics (Pirate Metrics - AARRR)
- **Acquisition** - How do users find you?
- **Activation** - Do they have a great first experience?
- **Retention** - Do they come back?
- **Revenue** - How do you make money?
- **Referral** - Do they tell others?

### OKR Framework
- **Objective** - Qualitative, inspirational goal
- **Key Results** - Quantitative measures of success
- Example:
  - Objective: Become the go-to app for student task planning
  - KR1: Increase weekly active students from 500 to 2000
  - KR2: Achieve 60%+ week-over-week retention
  - KR3: 40% of students invite a parent within first week

---

**Last Updated:** January 2025

## License

MIT License - Free and open source for personal or commercial use.

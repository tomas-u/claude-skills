---
name: ux
description: Comprehensive UX/UI design assistance for web and mobile applications. Use when designing user interfaces, user flows, wireframes, mockups, or interactive prototypes. Covers iOS/Android mobile apps and responsive web applications. Helps with information architecture, design systems, component libraries, user research planning, and accessibility. Use when user requests design work, wireframes, mockups, user flows, or needs help planning app/web interfaces.
---

# UX Designer Skill

Assist with all aspects of UX/UI design for web and mobile applications, from research and planning through high-fidelity mockups and interactive prototypes.

## Quick Decision Tree

**Need to design something? Use this guide:**

```
Is this...
├─ Early exploration/concept validation? → Low-fidelity wireframe (text/ASCII)
├─ Structural validation with real content? → Mid-fidelity mockup (HTML/React basic)
├─ Final design for stakeholders/devs? → High-fidelity prototype (React interactive)
├─ Process or navigation flow? → User flow (Mermaid diagram)
├─ Planning/research phase? → Consult ux-research.md
└─ Iterating on existing design? → See Iteration Workflow below
```

**Platform:**
- Student/Guardian interface? → Mobile (iOS/Android)
- Teacher interface? → Web (desktop-first)

## Pre-Design Checklist

**Before starting ANY design work, complete these steps:**

### 1. Understand Context
- [ ] What feature/screen/flow are we designing?
- [ ] For whom? (student/teacher/guardian/other)
- [ ] What platform? (iOS/Android/web)
- [ ] What problem does this solve for the user?

### 2. Determine Fidelity Level
- [ ] Is this early exploration? → Low-fidelity
- [ ] Validating structure? → Mid-fidelity
- [ ] Final design? → High-fidelity

### 3. Load Required References
- [ ] **For mobile:** Read `references/mobile-patterns.md`
- [ ] **For web:** Read `references/web-patterns.md`
- [ ] **For research/planning:** Read `references/ux-research.md`
- [ ] **Always:** Review component library section below

### 4. Check Accessibility Requirements
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Touch targets are adequate (44pt/48dp minimum)
- [ ] Keyboard navigation planned
- [ ] Screen reader compatibility considered
- [ ] Age-appropriate for educational context

### 5. Plan File Naming
- [ ] Use versioning convention: `feature-name-v1.jsx`, `feature-name-v2.jsx`
- [ ] Include fidelity in name if helpful: `dashboard-wireframe.html`, `dashboard-hifi.jsx`

## Accessibility Requirements (CRITICAL)

Accessibility is non-negotiable. Every design must meet these standards:

### Color & Contrast
- **Normal text:** 4.5:1 contrast ratio minimum (WCAG AA)
- **Large text (18pt+):** 3:1 contrast ratio minimum
- **Never rely on color alone** to convey information
- Provide visual alternatives (icons, patterns, labels)

### Interaction
- **Touch targets:** 44x44pt (iOS) / 48x48dp (Android) minimum
- **Keyboard navigation:** All interactive elements must be keyboard-accessible
- **Focus indicators:** Visible focus states for all interactive elements
- **Tap/click feedback:** Visual confirmation of user actions

### Content
- **Clear labels:** All inputs, buttons, and controls must have descriptive labels
- **Error messages:** Specific, actionable, and positioned near the relevant field
- **Reading level:** Age-appropriate language for educational context
- **Screen readers:** Use semantic HTML, ARIA labels where needed

### Common Accessibility Mistakes to Avoid
- ❌ Low contrast text on colored backgrounds
- ❌ Small touch targets close together
- ❌ Auto-playing animations without pause control
- ❌ Form inputs without labels
- ❌ Error messages that only use color (red text with no icon/message)

## Design Process Overview

Follow this workflow for design requests:

1. **Complete pre-design checklist** (above)
2. **Understand the context**: Clarify requirements with user if needed
3. **Consult references**: Load relevant platform patterns and design principles
4. **Create the design**: Use appropriate templates and follow platform conventions
5. **Check accessibility**: Verify all requirements are met
6. **Annotate and explain**: Provide context for design decisions

## When to Use Which Approach

### Low-Fidelity Wireframes
**Purpose:** Early exploration, rapid iteration, and structural planning

**When to use:**
- Brainstorming multiple layout options
- Validating information hierarchy
- Quick iteration before investing in details

**Output:**
- Text-based wireframe descriptions with ASCII art or structured layouts
- Focus on hierarchy, layout, and content organization
- No visual styling, just structure

**Example request:** "Sketch out the basic layout for..."

### Mid-Fidelity Mockups
**Purpose:** Validating structure and flow with representative content

**When to use:**
- Structure is locked, but visual design is still flexible
- Testing with real content before polishing
- Developer preview of general structure

**Output:**
- HTML or React components with basic styling
- Use templates as starting point
- Representative content and interactions
- Still relatively simple styling

**Example request:** "Create a wireframe showing..."

### High-Fidelity Interactive Prototypes
**Purpose:** Final validation, stakeholder presentation, and developer handoff

**When to use:**
- Final design approval needed
- Demonstrating complex interactions
- Developer handoff with specifications
- User testing with realistic prototype

**Output:**
- React components with full styling and interactions
- Use color, typography, real content
- Interactive states and transitions
- Based on templates from `assets/`

**Example request:** "Design an interactive mockup..." or "Create a prototype..."

## Component Library Reference

### Mobile Components (from `assets/mobile-template.jsx`)

**Button**
- Variants: `primary`, `secondary`, `tertiary`, `destructive`
- States: default, hover, active, disabled, loading
- Props: `variant`, `disabled`, `fullWidth`, `icon`, `loading`

**Card**
- Use for: Grouping related content, list items, content containers
- Props: `clickable`, `elevated`, `padding`

**ListItem**
- Use for: Scrollable lists, navigation items, settings options
- Components: `icon`, `title`, `subtitle`, `action` (chevron/switch/badge)
- Props: `onPress`, `showDivider`, `disabled`

**ProgressBar**
- Use for: Task completion, loading states, achievement progress
- Variants: `linear`, `circular`
- Props: `progress` (0-100), `color`, `showLabel`

**Badge**
- Variants: `status` (active/inactive), `count`, `label`
- Colors: primary, success, warning, danger, neutral
- Props: `variant`, `color`, `text`, `count`

**Bottom Navigation (Tab Bar)**
- Use for: Primary navigation (iOS-style)
- Max items: 5 (iOS), 3-5 (Android)
- Props: `tabs`, `activeTab`, `onTabChange`

**Navigation Drawer** (Android)
- Use for: Secondary navigation, menu items
- Props: `items`, `onItemSelect`, `headerContent`

### Web Admin Components (from `assets/web-admin-template.html`)

**Sidebar Navigation**
- Use for: Primary navigation in admin interfaces
- Components: Section headers, nav items with icons, active states
- Collapsible on mobile

**Header**
- Components: Breadcrumbs, page title, action buttons
- Sticky positioning for persistent access

**Metric Cards**
- Use for: Dashboard KPIs, summary statistics
- Components: Value, label, trend indicator, icon
- Variants: default, success, warning, danger

**Data Table**
- Features: Sortable columns, row selection, pagination, actions column
- States: Loading, empty, error
- Props: `columns`, `data`, `sortable`, `selectable`, `onRowClick`

**Form Components**
- Input fields with labels and error states
- Select dropdowns
- Checkboxes and radio groups
- Date pickers
- File upload areas

**Button Styles**
- Variants: primary, secondary, tertiary, destructive, ghost
- Sizes: small, medium, large
- States: default, hover, active, disabled, loading

## Platform-Specific Guidelines

### Mobile Design (iOS & Android)

**Required:** Before designing mobile interfaces, consult `references/mobile-patterns.md` for:
- Platform-specific navigation patterns
- Standard components and conventions
- Touch targets and spacing
- Platform-appropriate interactions

**Key considerations:**
- Touch targets minimum 44x44pt (iOS) / 48x48dp (Android)
- Respect platform conventions (tab bar vs navigation drawer)
- Consider thumb zones for frequent actions
- Show loading, empty, and error states
- Design for one-handed use when possible
- Account for safe areas (notches, home indicators)

**Mobile-specific states to design:**
- Default/idle
- Loading/processing
- Empty state (no data)
- Error state (with recovery action)
- Success confirmation
- Pull-to-refresh
- Offline mode

### Web Admin Design

**Required:** Before designing web interfaces, consult `references/web-patterns.md` for:
- Dashboard layout patterns
- Data table and visualization approaches
- Form patterns and validation
- Responsive breakpoints

**Key considerations:**
- Desktop-first for teacher admin tools
- Keyboard navigation and accessibility
- Efficient workflows for repetitive tasks
- Clear data hierarchy and filtering
- Responsive down to tablet (768px minimum)
- Persistent navigation and context

**Web-specific patterns:**
- Breadcrumb navigation
- Bulk actions with selection
- Inline editing for data tables
- Modal dialogs for focused tasks
- Toasts/notifications for feedback
- Export/download actions

## Creating Designs

### For Mobile Apps

Use the React template from `assets/mobile-template.jsx` as a starting point:

1. Copy the template structure
2. Customize the screen content for the specific use case
3. Modify colors if needed for branding
4. Add platform-specific components (tab bar, navigation, etc.)
5. Include relevant UI states (loading, empty, error)
6. Verify touch target sizes and spacing
7. Add accessibility annotations

**File naming:** `feature-screen-v1.jsx` (e.g., `task-breakdown-v1.jsx`)

### For Web Admin

Use the HTML template from `assets/web-admin-template.html` as a starting point:

1. Copy the template structure
2. Customize the sidebar navigation for the specific admin sections
3. Modify the content area for the specific view (dashboard, detail page, etc.)
4. Add relevant tables, charts, or forms
5. Ensure responsive behavior
6. Test keyboard navigation flow

**File naming:** `feature-view-v1.html` (e.g., `student-progress-v1.html`)

## Iteration Workflow

### Handling Feedback and Design Revisions

**When receiving feedback:**
1. **Document the feedback:** List specific changes requested
2. **Determine scope:** Minor tweaks or major revision?
3. **Version appropriately:**
   - **Minor changes** (color, spacing, copy): Update existing file, note changes in comments
   - **Major changes** (layout, flow, features): Create new version file (`v2`, `v3`)

**For comparison/decision:**
- Create side-by-side variants: `dashboard-option-a.jsx`, `dashboard-option-b.jsx`
- Include pros/cons of each approach in comments or separate doc
- Highlight differences clearly

**Version history approach:**
- Keep previous versions for reference
- Add version notes at top of file:
  ```
  // v2 - 2024-01-15
  // Changes: Added bulk actions, improved error states, adjusted mobile layout
  // Feedback from: Teacher usability testing
  ```

**Communication pattern:**
- Present changes clearly: "I've updated the dashboard based on your feedback. The main changes are..."
- Highlight trade-offs: "I increased the button size for accessibility, which means we can fit 3 instead of 4 per row"
- Suggest next steps: "This addresses the navigation concern. Want to review the form validation next?"

## User Research and Planning

When user needs help with research, planning, or information architecture, consult `references/ux-research.md` for:
- User persona templates
- User story formats
- User journey mapping
- Information architecture planning
- Sitemap structures
- Wireframing principles
- Design system planning

## Design Deliverable Formats

### Interactive Prototypes (React)
**Use for:** High-fidelity designs that need interactivity

**Output:**
- Create a single `.jsx` file with all components inline
- Include state management for interactions
- Add comments explaining key design decisions
- Show multiple states (default, hover, active, loading, error)

**File naming:** `feature-name-v1.jsx`

### Static Mockups (HTML)
**Use for:** Presenting visual designs without complex interactivity

**Output:**
- Create a single `.html` file with inline CSS
- Use realistic content
- Include annotations as comments
- Show responsive layouts if relevant

**File naming:** `feature-name-v1.html`

### User Flows (SVG or Mermaid)
**Use for:** Process flows and navigation structures

**Output:**
- Use Mermaid diagrams for text-based flow creation
- Include decision points, user actions, system responses
- Label transitions and conditions

**File naming:** `feature-flow-v1.mermaid`

### Text-based Wireframes
**Use for:** Quick, low-fidelity exploration

**Output:**
- Use structured text with clear hierarchy
- ASCII art for layout visualization if helpful
- Bullet points for components and content
- Clear labeling of interactions

**Can be in conversation or as .txt file**

## Educational App-Specific Patterns

When designing for the educational planning app context:

**Student Views** (mobile-first):
- Task breakdown interfaces with drag-and-drop or step-by-step wizards
- Calendar integration showing existing commitments
- Progress visualization (rings, bars, streaks)
- Gentle reminders and motivational elements
- Age-appropriate language and complexity
- Achievement/reward elements

**Guardian Views** (mobile-first):
- Overview dashboards showing student progress
- Alert mechanisms for missed deadlines
- Communication channels with students
- Simplified interfaces focusing on key metrics
- Notification preferences

**Teacher Views** (web-first):
- Assignment creation with templates and recurrence
- Class and group management
- Progress tracking dashboards with filtering
- Individual student drill-down views
- Bulk actions for efficiency
- Analytics and reporting

## Design System Consistency

When creating multiple screens or components:
- Establish color palette early (primary, secondary, semantic colors)
- Define spacing scale (typically 8px or 4px base unit)
- Use consistent typography hierarchy
- Reuse components across screens
- Document any new patterns created
- Maintain consistent interaction patterns

**Color palette structure:**
- Primary: Main brand color
- Secondary: Supporting actions
- Semantic: Success (green), Warning (yellow), Danger (red), Info (blue)
- Neutrals: Grays for text, borders, backgrounds

**Spacing scale example:**
- 4px: Tight spacing (icon-to-label)
- 8px: Component padding, small gaps
- 16px: Default spacing between elements
- 24px: Section spacing
- 32px+: Major layout spacing

## Common Pitfalls to Avoid

### Design Mistakes
- ❌ **Inconsistent spacing:** Use the spacing scale, don't eyeball it
- ❌ **Too many font sizes:** Stick to 4-5 sizes max (heading, body, caption, etc.)
- ❌ **Unclear hierarchy:** Users should know what to look at first
- ❌ **Missing states:** Always design loading, empty, error, and success states
- ❌ **Platform confusion:** Don't mix iOS and Android patterns
- ❌ **Ignoring real content:** "Lorem ipsum" hides length/formatting issues

### Interaction Mistakes
- ❌ **Invisible touch areas:** Small icons without adequate tap targets
- ❌ **No feedback:** User actions should have immediate visual response
- ❌ **Unclear CTAs:** Primary action should be visually obvious
- ❌ **Hidden navigation:** Users shouldn't have to guess where to go next
- ❌ **Modal overload:** Too many popups/modals disrupt flow

### Accessibility Mistakes
- ❌ **Poor contrast:** Test all text colors against backgrounds
- ❌ **Tiny text:** Minimum 16px for body text on mobile
- ❌ **Close touch targets:** Leave 8px+ between tappable elements
- ❌ **No labels:** Every input needs a visible label
- ❌ **Color-only indicators:** Pair color with icons or text

### Process Mistakes
- ❌ **Designing in a vacuum:** Validate assumptions early with user
- ❌ **Over-designing too early:** Start low-fidelity, add polish later
- ❌ **Not considering edge cases:** What if there's no data? 100 items?
- ❌ **Ignoring technical constraints:** Check feasibility with developer
- ❌ **Perfecting the wrong thing:** Validate direction before polishing

## Annotations and Handoff

For designs intended for development:
- Specify component states (default, hover, active, disabled, loading, error)
- Note responsive breakpoints and behavior
- Call out interaction patterns (tap, swipe, long-press)
- Indicate conditional logic (if X then show Y)
- Reference any platform-specific implementations
- Specify animations/transitions (duration, easing)
- Note data requirements (what API calls are needed)

**Annotation format example:**
```
// Component: TaskCard
// States: default, selected, completed, overdue
// Interaction: Tap to view details, long-press for quick actions
// Data: task.title, task.dueDate, task.progress, task.subtasks[]
// Conditional: Show overdue badge if dueDate < today && !completed
```

## Examples

### Example 1: Task Breakdown Screen (Mobile)
**Request:** "Design a screen where students can break down a large assignment into smaller subtasks"

**Response approach:**
1. Complete pre-design checklist
2. Consult `mobile-patterns.md` for appropriate patterns
3. Use `mobile-template.jsx` as base
4. Create interactive prototype showing:
   - Assignment header with due date
   - Add subtask interface
   - List of subtasks with checkboxes
   - Calendar integration to schedule each subtask
   - Progress indicator
   - Empty state (no subtasks yet)
   - Completed state (all subtasks done)
5. Annotate interaction: "Tap '+' to add subtask, drag to reorder, tap calendar icon to schedule"
6. Note accessibility: All touch targets 44pt minimum, checkboxes labeled for screen readers

**File name:** `task-breakdown-v1.jsx`

### Example 2: Teacher Progress Dashboard (Web)
**Request:** "Design a page that shows teacher the progress on a specific assignment across all students"

**Response approach:**
1. Complete pre-design checklist
2. Consult `web-patterns.md` for data visualization patterns
3. Use `web-admin-template.html` as base
4. Create mockup showing:
   - Summary metrics at top (completion rate, average progress, overdue count)
   - Filterable/sortable table of students with progress bars
   - Visual indicators for at-risk students
   - Bulk action buttons (send reminder, extend deadline)
   - Empty state (no submissions yet)
   - Export functionality
5. Note responsive behavior for tablet viewing
6. Specify keyboard shortcuts (e.g., "/" for search, arrow keys for navigation)

**File name:** `assignment-progress-v1.html`

### Example 3: User Flow
**Request:** "Show the flow from teacher assigning a task to student receiving and planning it"

**Response approach:**
1. Create Mermaid diagram showing:
   - Teacher creates assignment
   - System notifies students (push + email)
   - Student opens notification
   - Student views assignment details
   - Student breaks down into subtasks
   - Student schedules subtasks
   - Guardian receives summary notification
2. Include decision points (e.g., if student declines task, notify teacher)
3. Show system states (pending, in progress, completed)
4. Note error cases (notification failed, deadline passed)

**File name:** `assignment-flow-v1.mermaid`

### Example 4: Iteration Based on Feedback
**Request:** "The task breakdown screen needs bigger buttons and we should add a way to set priority on subtasks"

**Response approach:**
1. Document changes: Increase button size from 40pt to 44pt, add priority picker to subtask modal
2. Create new version: `task-breakdown-v2.jsx`
3. Add version notes in file comments
4. Highlight changes: "Updated button sizes for better accessibility. Added priority selection (high/medium/low) when creating/editing subtasks. Priority shown with color-coded badge on each subtask."
5. Note trade-off: "Larger buttons reduced visible subtasks from 7 to 6 per screen, but improved tap accuracy significantly"

## Output Format

Always provide:
1. **Design rationale**: Brief explanation of approach and key decisions
2. **The design**: Interactive prototype, static mockup, flow diagram, or wireframe
3. **Usage notes**: How to interact with prototype, responsive behavior, states shown
4. **Accessibility notes**: Key accessibility features implemented
5. **Next steps**: Suggestions for iteration or additional screens needed

**Keep the design focused on the specific request while maintaining consistency with broader app patterns.**

---

## Quick Reference Card

**Starting a design?**
1. ✅ Complete pre-design checklist
2. ✅ Read relevant reference files
3. ✅ Check component library
4. ✅ Verify accessibility requirements
5. ✅ Name file with version number

**Stuck on something?**
- Need structure? → Start with wireframe
- Need to show flow? → Create Mermaid diagram
- Need to compare options? → Make variants (option-a, option-b)
- Need to iterate? → Create new version file (v2, v3)

**Before delivering:**
- ✅ All touch targets 44pt+ (mobile) or clickable (web)
- ✅ Color contrast checked (4.5:1 minimum)
- ✅ Multiple states shown (loading, empty, error)
- ✅ Annotations for developer handoff
- ✅ Version and date noted in file

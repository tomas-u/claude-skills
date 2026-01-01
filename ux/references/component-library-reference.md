# Component Library Reference

Quick reference for all reusable components in the design system. Use this to maintain consistency across designs.

## Mobile Components

### Button

**Variants:**
- `primary` - Main actions (e.g., "Save", "Submit", "Continue")
- `secondary` - Secondary actions (e.g., "Cancel", "Skip")
- `tertiary` - Tertiary actions, often text-only (e.g., "Learn more")
- `destructive` - Dangerous actions (e.g., "Delete", "Remove")

**Props:**
- `variant`: string - One of the variants above
- `disabled`: boolean - Disabled state
- `fullWidth`: boolean - Stretch to container width
- `icon`: string/component - Optional icon (left side)
- `loading`: boolean - Show loading spinner

**States:**
- default
- hover (web) / press (mobile)
- active
- disabled
- loading

**Usage:**
```jsx
<Button variant="primary" fullWidth>Continue</Button>
<Button variant="secondary" icon={<CloseIcon />}>Cancel</Button>
<Button variant="destructive" disabled>Delete</Button>
```

**Accessibility:**
- Minimum touch target: 44x44pt (iOS) / 48x48dp (Android)
- Disabled buttons should have `aria-disabled="true"`
- Loading buttons should have `aria-busy="true"`

---

### Card

**Purpose:** Container for grouping related content

**Variants:**
- `default` - Standard card with border
- `elevated` - Card with shadow
- `flat` - No border or shadow

**Props:**
- `clickable`: boolean - Makes entire card tappable
- `elevated`: boolean - Adds shadow
- `padding`: string - 'none', 'small', 'medium' (default), 'large'

**Usage:**
```jsx
<Card elevated clickable onPress={() => navigate('/details')}>
  <Title>Assignment Title</Title>
  <Subtitle>Due: Jan 15</Subtitle>
</Card>
```

**Best practices:**
- Use for list items, content containers, grouping related info
- Keep consistent padding within the same list
- Elevated cards should have subtle shadows (not too heavy)

---

### ListItem

**Purpose:** Standardized list item for scrollable lists

**Components:**
- `icon` - Left-side icon (optional)
- `title` - Main text (required)
- `subtitle` - Secondary text below title (optional)
- `action` - Right-side element: chevron, switch, badge, button

**Props:**
- `onPress`: function - Tap handler
- `showDivider`: boolean - Show bottom border
- `disabled`: boolean - Disabled state
- `icon`: component
- `title`: string
- `subtitle`: string
- `action`: component

**Usage:**
```jsx
<ListItem
  icon={<CheckIcon />}
  title="Complete reading assignment"
  subtitle="Due tomorrow"
  action={<Checkbox checked={true} />}
  onPress={() => toggleComplete()}
/>
```

**Common patterns:**
- Navigation: title + chevron
- Settings: title + switch
- Selection: title + checkbox
- Status: title + badge

---

### ProgressBar

**Variants:**
- `linear` - Horizontal progress bar
- `circular` - Circular/ring progress indicator

**Props:**
- `progress`: number - 0-100
- `color`: string - 'primary', 'success', 'warning', 'danger'
- `showLabel`: boolean - Display percentage text
- `size`: string - 'small', 'medium', 'large' (for circular)

**Usage:**
```jsx
<ProgressBar progress={65} color="primary" showLabel />
<ProgressBar variant="circular" progress={80} size="large" />
```

**Best practices:**
- Always show label or surrounding context so user knows what progress represents
- Use semantic colors: green for completion, blue for in-progress
- Animate transitions between values (smooth, not jumpy)

---

### Badge

**Variants:**
- `status` - Active/inactive indicators
- `count` - Numerical badges (unread count, etc.)
- `label` - Text labels (category, priority)

**Colors:**
- `primary` - Blue
- `success` - Green
- `warning` - Yellow/Orange
- `danger` - Red
- `neutral` - Gray

**Props:**
- `variant`: string
- `color`: string
- `text`: string
- `count`: number

**Usage:**
```jsx
<Badge variant="status" color="success" text="Complete" />
<Badge variant="count" color="danger" count={3} />
<Badge variant="label" color="primary" text="High Priority" />
```

**Accessibility:**
- Include descriptive text for screen readers
- Don't rely on color alone to convey meaning

---

### Bottom Navigation (Tab Bar)

**Purpose:** Primary navigation for mobile apps (iOS-style)

**Props:**
- `tabs`: array - List of tab objects
- `activeTab`: string - Current active tab ID
- `onTabChange`: function - Tab selection handler

**Tab object:**
```javascript
{
  id: string,
  label: string,
  icon: component,
  badge?: number
}
```

**Usage:**
```jsx
<BottomNavigation
  tabs={[
    { id: 'tasks', label: 'Tasks', icon: <TaskIcon /> },
    { id: 'calendar', label: 'Calendar', icon: <CalendarIcon /> },
    { id: 'progress', label: 'Progress', icon: <ChartIcon />, badge: 2 }
  ]}
  activeTab="tasks"
  onTabChange={(id) => navigate(id)}
/>
```

**Best practices:**
- Maximum 5 items (iOS), 3-5 items (Android)
- Use clear, concise labels
- Icons should be recognizable at small sizes
- Active state should be obvious (color + weight change)

---

### Navigation Drawer (Android)

**Purpose:** Secondary navigation menu (Android-style)

**Props:**
- `items`: array - Menu items
- `onItemSelect`: function - Selection handler
- `headerContent`: component - Optional header area

**Item object:**
```javascript
{
  id: string,
  label: string,
  icon: component,
  divider?: boolean,  // Show divider after this item
  badge?: number
}
```

**Usage:**
```jsx
<NavigationDrawer
  headerContent={<UserProfile />}
  items={[
    { id: 'home', label: 'Home', icon: <HomeIcon /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
    { id: 'logout', label: 'Logout', icon: <LogoutIcon />, divider: true }
  ]}
  onItemSelect={(id) => handleNavigation(id)}
/>
```

---

## Web Admin Components

### Sidebar Navigation

**Purpose:** Primary navigation for web admin interfaces

**Structure:**
- Section headers (optional grouping)
- Nav items with icons
- Active state highlighting
- Collapsible on mobile

**Nav item:**
```html
<a href="/dashboard" class="nav-item active">
  <icon>📊</icon>
  <span>Dashboard</span>
</a>
```

**States:**
- default
- hover
- active
- focus (keyboard navigation)

**Best practices:**
- Keep labels short and clear
- Group related items under section headers
- Highlight active page prominently
- Support keyboard navigation (Tab, Enter)

---

### Header

**Components:**
- Breadcrumbs (navigation trail)
- Page title
- Action buttons (primary actions for the page)

**Usage:**
```html
<header class="page-header">
  <div class="breadcrumbs">
    <a href="/classes">Classes</a>
    <span>/</span>
    <span>Math 101</span>
  </div>
  <h1>Math 101 - Progress Dashboard</h1>
  <div class="actions">
    <button class="btn-secondary">Export</button>
    <button class="btn-primary">New Assignment</button>
  </div>
</header>
```

**Best practices:**
- Sticky positioning for persistent access
- Primary action should be rightmost and visually prominent
- Breadcrumbs should be clickable except last item

---

### Metric Card

**Purpose:** Display KPIs and summary statistics on dashboards

**Components:**
- Value (large, prominent)
- Label (what the metric represents)
- Trend indicator (optional: up/down arrow with %)
- Icon (optional)

**Variants:**
- `default` - Neutral
- `success` - Positive metric
- `warning` - Needs attention
- `danger` - Critical metric

**Usage:**
```html
<div class="metric-card success">
  <div class="metric-icon">✓</div>
  <div class="metric-value">87%</div>
  <div class="metric-label">Completion Rate</div>
  <div class="metric-trend">+5% from last week</div>
</div>
```

**Best practices:**
- Use semantic colors sparingly (only when meaningful)
- Keep labels concise
- Trend indicators should show comparison context

---

### Data Table

**Features:**
- Sortable columns
- Row selection (checkboxes)
- Pagination
- Actions column
- Loading state
- Empty state
- Error state

**Props:**
- `columns`: array - Column definitions
- `data`: array - Row data
- `sortable`: boolean
- `selectable`: boolean
- `onRowClick`: function
- `pageSize`: number

**Column definition:**
```javascript
{
  key: string,        // Data field name
  label: string,      // Column header
  sortable: boolean,
  width: string,      // '120px', '25%', etc.
  align: 'left' | 'center' | 'right',
  render: function    // Custom cell renderer
}
```

**States to design:**
- Default (with data)
- Loading (skeleton or spinner)
- Empty (no data message with action)
- Error (error message with retry)
- Selected rows (highlight)

**Accessibility:**
- Use semantic table elements (`<table>`, `<th>`, `<td>`)
- Sortable headers should indicate direction (aria-sort)
- Keyboard navigation: arrow keys to move, Space to select

---

### Form Components

#### Text Input
```html
<div class="form-group">
  <label for="assignment-name">Assignment Name</label>
  <input type="text" id="assignment-name" placeholder="e.g., Chapter 5 Review" />
  <span class="form-help">This will be visible to all students</span>
  <span class="form-error">Assignment name is required</span>
</div>
```

**States:** default, focus, filled, disabled, error, success

#### Select Dropdown
```html
<div class="form-group">
  <label for="class-select">Class</label>
  <select id="class-select">
    <option value="">Select a class...</option>
    <option value="math-101">Math 101</option>
    <option value="math-102">Math 102</option>
  </select>
</div>
```

#### Checkbox / Radio
```html
<div class="form-group">
  <label class="checkbox-label">
    <input type="checkbox" id="notify-students" />
    <span>Notify students immediately</span>
  </label>
</div>
```

#### Date Picker
- Use native `<input type="date">` for simple cases
- Use custom picker for complex scheduling (recurring events, time zones)

#### File Upload
```html
<div class="form-group">
  <label>Attachment</label>
  <div class="file-upload">
    <input type="file" id="file-input" />
    <button type="button">Choose File</button>
    <span class="file-name">No file chosen</span>
  </div>
</div>
```

**Validation patterns:**
- Validate on blur (not on every keystroke)
- Show error messages near the relevant field
- Disable submit button until form is valid
- Provide clear, actionable error messages

---

### Button Styles (Web)

**Variants:**
- `primary` - Main actions (filled, high contrast)
- `secondary` - Secondary actions (outlined or subtle fill)
- `tertiary` - Tertiary actions (text only)
- `destructive` - Dangerous actions (red)
- `ghost` - Minimal button (transparent, border on hover)

**Sizes:**
- `small` - Compact areas, inline actions
- `medium` - Default size
- `large` - Primary CTAs, prominent actions

**States:**
- default
- hover
- active (pressed)
- focus (keyboard navigation)
- disabled
- loading

**Usage:**
```html
<button class="btn-primary">Create Assignment</button>
<button class="btn-secondary">Cancel</button>
<button class="btn-ghost btn-small">Learn more</button>
```

---

## Spacing and Layout

### Spacing Scale
Use these values for consistent spacing:

- **4px**: Tight spacing (icon-to-label)
- **8px**: Component padding, small gaps
- **12px**: Compact list spacing
- **16px**: Default spacing between elements
- **24px**: Section spacing
- **32px**: Major section gaps
- **48px**: Large layout spacing

### Layout Patterns

**Card Grid:**
```
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}
```

**Two-column Layout:**
```
.two-column {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 24px;
}
```

**Responsive Stack:**
```
.stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

@media (min-width: 768px) {
  .stack { flex-direction: row; }
}
```

---

## Color Palette

### Primary Colors
- **Primary**: `#0066CC` (Main brand color, primary actions)
- **Primary Hover**: `#0052A3`
- **Primary Light**: `#E6F2FF` (Backgrounds)

### Semantic Colors
- **Success**: `#00A86B` (Green - completed, success states)
- **Warning**: `#FF9500` (Orange - warnings, needs attention)
- **Danger**: `#DC3545` (Red - errors, destructive actions)
- **Info**: `#17A2B8` (Blue - informational)

### Neutral Colors
- **Text Primary**: `#1A1A1A` (Main text)
- **Text Secondary**: `#666666` (Supporting text)
- **Text Tertiary**: `#999999` (Placeholder, disabled)
- **Border**: `#E0E0E0` (Dividers, input borders)
- **Background**: `#F5F5F5` (Page background)
- **White**: `#FFFFFF` (Cards, inputs)

### Contrast Requirements
- **Normal text on background**: 4.5:1 minimum
- **Large text (18pt+) on background**: 3:1 minimum
- **Interactive elements**: Must be distinguishable from background

---

## Typography

### Font Sizes
- **Heading 1**: 32px / 2rem (Page titles)
- **Heading 2**: 24px / 1.5rem (Section titles)
- **Heading 3**: 20px / 1.25rem (Subsection titles)
- **Body**: 16px / 1rem (Main text)
- **Small**: 14px / 0.875rem (Supporting text)
- **Caption**: 12px / 0.75rem (Labels, metadata)

### Font Weights
- **Regular**: 400 (Body text)
- **Medium**: 500 (Emphasis, labels)
- **Semibold**: 600 (Headings, buttons)
- **Bold**: 700 (Rarely used)

### Line Height
- **Headings**: 1.2 (tight, for larger text)
- **Body**: 1.5 (comfortable reading)
- **Compact**: 1.3 (UI elements, buttons)

---

## Icons

### Icon Library
Use a consistent icon set throughout (e.g., Lucide, Heroicons, Material Icons)

### Icon Sizes
- **Small**: 16px (Inline with text, badges)
- **Medium**: 24px (Buttons, navigation)
- **Large**: 32px (Feature illustrations)

### Best Practices
- Match icon weight to text weight
- Maintain consistent stroke width
- Always provide text labels (visible or for screen readers)
- Use icons to support text, not replace it

---

## Animation & Transitions

### Standard Durations
- **Fast**: 150ms (Hover effects, small changes)
- **Normal**: 250ms (Most transitions)
- **Slow**: 400ms (Page transitions, complex animations)

### Easing Functions
- **Ease-out**: For elements appearing (modal, dropdown)
- **Ease-in**: For elements disappearing
- **Ease-in-out**: For elements moving

### What to Animate
- ✅ Opacity changes
- ✅ Transform (scale, translate)
- ✅ Background color changes
- ✅ Height/width (with caution - can cause reflow)
- ❌ Layout properties excessively (can cause jank)

### Accessibility
- Respect `prefers-reduced-motion` media query
- Provide option to disable animations
- Keep animations subtle and purposeful

---

## Quick Reference: When to Use What

| Need | Component | Platform |
|------|-----------|----------|
| Primary action button | Button (primary) | Both |
| Navigate between sections | Bottom Nav / Sidebar | Mobile / Web |
| Group related content | Card | Both |
| Show list of items | ListItem | Mobile |
| Display data in rows | Data Table | Web |
| Show task progress | ProgressBar | Both |
| Indicate status | Badge | Both |
| Summarize metrics | Metric Card | Web |
| Collect user input | Form components | Both |
| Confirm action | Modal dialog | Both |
| Give feedback | Toast notification | Both |
| Show loading | Spinner / Skeleton | Both |

---

## Component Checklist

When creating a new component, ensure:
- [ ] All states designed (default, hover, active, disabled, loading, error)
- [ ] Responsive behavior defined (if applicable)
- [ ] Touch targets meet minimum size (44pt mobile)
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Keyboard navigation supported (web)
- [ ] Screen reader accessible (proper labels, ARIA)
- [ ] Consistent with design system (colors, spacing, typography)
- [ ] Edge cases considered (long text, no data, many items)

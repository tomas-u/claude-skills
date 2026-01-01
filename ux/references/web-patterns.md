# Web Admin Design Patterns

## Layout Patterns

### Dashboard Layouts
- **Sidebar + Main Content**: Left sidebar (200-280px) for navigation, main area for content
- **Top Nav + Content**: Horizontal navigation bar, full-width content below
- **Hybrid**: Top bar for global actions, left sidebar for section navigation

### Data Display
- **Tables**: Sortable columns, pagination, row actions, bulk selection
- **Cards Grid**: For visual content or summary metrics
- **Lists**: For simple linear data with actions
- **Metrics Dashboard**: KPI cards at top, detailed views below

## Navigation Patterns

### Primary Navigation
- **Sidebar Menu**: Collapsible groups, active state highlighting, icons + labels
- **Breadcrumbs**: Show hierarchy (Home > Classes > Math 101 > Assignment)
- **Tabs**: For related views within a section

### Teacher Admin Specific
- **Quick Filters**: Class selector, date range, student group filters
- **Search**: Global search for students, assignments, classes
- **Contextual Actions**: Bulk actions (assign to multiple students/classes)

## Component Patterns

### Forms
- **Multi-step Forms**: Progress indicator, save draft capability
- **Inline Editing**: Click to edit directly in tables/lists
- **Field Validation**: Real-time feedback, clear error messages
- **Auto-save**: Draft saving for long forms

### Data Visualization
- **Progress Charts**: Bar charts, pie charts for completion rates
- **Timeline Views**: Assignment due dates, student activity over time
- **Heatmaps**: Activity patterns, engagement levels
- **Comparison Views**: Class vs class, student vs average

### Teacher Workflows
- **Assignment Creation**: Template library, recurrence options, group assignment
- **Grading Interface**: Side-by-side view (submission + rubric), quick feedback
- **Student Overview**: At-a-glance progress, alerts for struggling students
- **Communication**: Messaging, announcements, reminder sending

## Responsive Web Considerations

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px
- Large Desktop: > 1440px

### Mobile Adaptations
- Hamburger menu replacing sidebar
- Stacked layouts instead of multi-column
- Bottom navigation for key actions
- Simplified tables (vertical cards on mobile)

## Accessibility

### WCAG 2.1 AA Compliance
- Color contrast: 4.5:1 for normal text, 3:1 for large text
- Keyboard navigation: All functions accessible via keyboard
- Focus indicators: Clear visible focus states
- Screen reader support: Proper ARIA labels, semantic HTML
- Form labels: Visible labels for all inputs
- Error identification: Clear, descriptive error messages

### Educational Context
- Simple language (avoid jargon)
- Clear hierarchy and structure
- Consistent patterns across pages
- Help/documentation easily accessible
- Support for various teacher tech literacy levels

## Performance

### Loading Patterns
- Skeleton screens for data tables
- Progressive loading for long lists
- Optimistic UI updates (immediate feedback)
- Background sync for auto-save

### Data Handling
- Pagination for large datasets (25-50 items per page)
- Virtual scrolling for very long lists
- Lazy loading for images/heavy content
- Caching for frequently accessed data

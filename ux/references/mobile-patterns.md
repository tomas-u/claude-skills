# Mobile Design Patterns

## iOS Design Patterns

### Navigation
- **Tab Bar**: Bottom navigation for 3-5 primary sections (avoid more than 5 tabs)
- **Navigation Bar**: Top bar with back button, title, and action buttons
- **Modal**: Full-screen or card-style for focused tasks
- **Sheet**: Bottom sheets for contextual options

### Components
- **Lists**: Standard iOS list styling with separators, disclosure indicators
- **Cards**: Rounded corners (10-12pt), subtle shadows
- **Buttons**: Primary (filled), Secondary (outlined), Tertiary (text only)
- **Forms**: Single-column layout, field labels above inputs
- **Search**: Standard iOS search bar in navigation bar

### Typography
- San Francisco font family (system default)
- Dynamic Type support for accessibility
- Typical scale: 11pt (caption) → 17pt (body) → 28pt (large title)

### Spacing
- Use 8pt grid system
- Safe areas: Mind notch, home indicator, rounded corners
- Common spacing: 8pt, 16pt, 24pt, 32pt

### Interactions
- Swipe gestures (delete, archive, mark complete)
- Pull to refresh
- Long press for contextual menus
- Haptic feedback for important actions

## Android Material Design Patterns

### Navigation
- **Bottom Navigation**: 3-5 destinations (primary navigation)
- **Navigation Drawer**: For 5+ sections or hierarchical navigation
- **Top App Bar**: Title, navigation icon, action items
- **Modal Bottom Sheet**: Contextual actions and options

### Components
- **Cards**: Elevated with 4dp-8dp elevation
- **Lists**: Material list items with ripple effects
- **Buttons**: Filled (high emphasis), Outlined (medium), Text (low)
- **FAB**: Floating Action Button for primary action
- **Chips**: For filters, tags, selections
- **Snackbars**: Brief messages with optional action

### Typography
- Roboto font family (system default)
- Type scale: 12sp (caption) → 16sp (body) → 24sp (headline)
- Support for accessibility text scaling

### Spacing
- 4dp/8dp grid system
- Common spacing: 8dp, 16dp, 24dp, 32dp
- Edge margins typically 16dp

### Interactions
- Ripple effects on touch
- Swipe to dismiss/archive
- Pull to refresh (circular progress indicator)
- Long press for selection mode

## Cross-Platform Considerations

### Shared Principles
- Touch targets: Minimum 44x44pt (iOS) / 48x48dp (Android)
- Thumb zones: Place frequent actions in easy-to-reach areas
- Loading states: Show skeleton screens or progress indicators
- Empty states: Illustrate and guide users when no content
- Error states: Clear messaging with recovery actions

### Platform-Specific Adaptations
- Navigation placement: Bottom (iOS) vs Top/Bottom/Drawer (Android)
- Action placement: Top-right (iOS) vs FAB or overflow menu (Android)
- Back navigation: Top-left back button (iOS) vs system back (Android)
- Icons: SF Symbols (iOS) vs Material Icons (Android)
- Destructive actions: Red (iOS) vs contextual (Android)

### Student/Educational App Patterns
- Progress visualization: Progress bars, completion rings, streaks
- Gamification: Points, badges, levels (age-appropriate)
- Notifications: Gentle reminders, not pushy (respect focus time)
- Calendar integration: Visual day/week view for planning
- Parent/Guardian access: Separate simplified view, privacy controls
- Accessibility: Support for learning disabilities (dyslexia-friendly fonts, high contrast)

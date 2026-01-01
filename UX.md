# UX Skill Package

Enhanced UX/UI design skill for Claude with comprehensive design guidance, component library, and platform-specific patterns.

## What's Included

This skill helps Claude assist with:
- Wireframes and mockups
- Interactive prototypes (React/HTML)
- User flows and navigation
- Mobile (iOS/Android) and web design
- Component libraries and design systems
- User research and information architecture
- Accessibility compliance

## Installation

### Option 1: Via Claude.ai Skills Interface

1. Go to **Settings** → **Skills** in Claude.ai
2. Click **"Create Skill"** or **"Upload Skill"**
3. Upload the entire `ux` folder (including subdirectories)
4. The skill will be named "ux" based on the metadata

### Option 2: Manual Installation (if you have file system access)

1. Extract the package
2. Copy the `ux` folder to your skills directory:
   - Location: `/mnt/skills/user/ux/`
3. Restart Claude or reload skills

## Package Structure

```
ux/
├── SKILL.md                          # Main skill definition
├── assets/
│   ├── mobile-template.jsx           # React template for mobile screens
│   └── web-admin-template.html       # HTML template for web admin
└── references/
    ├── component-library-reference.md # Complete component documentation
    ├── mobile-patterns.md             # iOS/Android design patterns
    ├── web-patterns.md                # Web design patterns
    └── ux-research.md                 # Research and planning guidance
```

## Key Features

### Pre-Design Checklist
Claude will automatically:
- Understand context and requirements
- Read relevant platform patterns
- Check accessibility requirements
- Plan file naming and versioning

### Component Library
Pre-built components with documentation:
- Buttons, Cards, Lists, Progress bars
- Navigation (Tab bars, Sidebars, Drawers)
- Forms, Tables, Metrics
- All with variants, props, and accessibility notes

### Platform Support
- **Mobile**: iOS and Android patterns
- **Web**: Desktop-first admin interfaces
- **Responsive**: Tablet and mobile breakpoints

### Accessibility First
- WCAG AA compliance built-in
- Color contrast checking
- Touch target requirements
- Keyboard navigation support

### Iteration Workflow
- Version management guidance
- Feedback handling process
- Design variant comparison
- Change documentation

### Common Pitfalls Section
Helps avoid typical mistakes in:
- Design (spacing, hierarchy, states)
- Interaction (touch targets, feedback)
- Accessibility (contrast, labels)
- Process (over-designing, ignoring edge cases)

## Usage Examples

### Creating a Mobile Screen
```
You: "Design a screen where students can break down assignments into subtasks"

Claude will:
1. Read mobile-patterns.md for platform guidelines
2. Check component library for relevant components
3. Use mobile-template.jsx as base
4. Create interactive React prototype
5. Include all states (loading, empty, error)
6. Verify accessibility requirements
```

### Iterating on a Design
```
You: "Make the buttons bigger and add priority indicators"

Claude will:
1. Create new version (v2)
2. Document changes in file comments
3. Highlight what changed and why
4. Note any trade-offs made
```

### Getting Design Advice
```
You: "What's the best way to show progress across multiple tasks?"

Claude will:
1. Consult component-library-reference.md
2. Consider platform (mobile vs web)
3. Suggest appropriate patterns with examples
4. Provide accessibility considerations
```

## What's New in This Version

### Compared to Standard UX Skills:
- ✅ **Decision tree** for quick navigation
- ✅ **Pre-design checklist** with explicit steps
- ✅ **Accessibility elevated** with common mistakes
- ✅ **Iteration workflow** for handling feedback
- ✅ **Component library reference** with full documentation
- ✅ **Common pitfalls** section by category
- ✅ **Versioning strategy** throughout
- ✅ **Quick reference card** for at-a-glance help

### Educational App Context:
This skill includes specific patterns for:
- Student views (mobile-first)
- Guardian views (mobile-first)  
- Teacher views (web admin)
- Task breakdown interfaces
- Progress visualization
- Assignment management

*Note: These can be adapted or ignored for other types of applications.*

## Customization

You can customize this skill by:

1. **Modifying templates** in `assets/` to match your design system
2. **Adding patterns** to `references/` for your specific use cases
3. **Updating component library** with your custom components
4. **Adjusting the workflow** in SKILL.md to match your process

## Tips for Best Results

1. **Be specific** about platform (iOS/Android/web)
2. **Mention user type** (student/teacher/admin/etc.)
3. **State fidelity level** (wireframe/mockup/prototype)
4. **Request iteration** by version (update v1 → v2)
5. **Ask for variants** when comparing options (option-a vs option-b)

## Support

This is a custom skill package. For issues or questions:
- Review the SKILL.md file for complete documentation
- Check component-library-reference.md for component details
- Consult reference files for platform-specific patterns

## License

MIT License - Free and open source for personal or commercial use.

---

**Version:** 2.0 (Enhanced with iteration workflow and component library)  
**Last Updated:** December 2024

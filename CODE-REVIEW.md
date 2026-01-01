# Code Review Skill Package

Comprehensive code review skill that ensures code quality, security, maintainability, and alignment with requirements.

## What This Skill Does

This skill helps Claude perform thorough code reviews covering:

1. **Story/Task Alignment** - Verifies code implements all requirements
2. **Code Quality** - Checks naming, structure, clean code principles
3. **Security Analysis** - Identifies vulnerabilities using OWASP Top 10
4. **Maintainability** - Assesses readability and long-term sustainability
5. **Testing Coverage** - Evaluates test quality and completeness
6. **Performance** - Identifies potential performance issues
7. **Architecture Fit** - Ensures consistency with existing patterns
8. **Constructive Feedback** - Provides actionable improvements with reasoning

## Key Features

### OWASP Security Analysis
- Comprehensive security checklist based on OWASP Top 10 2021
- Identifies injection vulnerabilities (SQL, XSS, Command)
- Checks authentication and authorization
- Validates cryptographic implementations
- Reviews dependency security
- Assesses secure configuration

### Code Quality Review
- Naming convention validation
- Clean code principles (SOLID, DRY, KISS)
- Function size and complexity analysis
- Code smell detection
- Consistency checks

### Maintainability Focus
- **Readability** - Is the code easy to understand?
- **Testability** - Can it be unit tested easily?
- **Extensibility** - Can features be added without major refactoring?
- **Debuggability** - Can issues be isolated quickly?
- **Changeability** - What's the impact of changes?

### Story Alignment
- Verifies all acceptance criteria are met
- Checks for scope creep
- Ensures story references in commits
- Validates implementation completeness

### Constructive Feedback
- Specific, actionable suggestions
- Explains the "why" behind recommendations
- Prioritizes issues (Critical, High, Medium, Low)
- Acknowledges good work
- Provides code examples for fixes

## Installation

### Option 1: Via Claude.ai Skills Interface

1. Go to **Settings** → **Skills** in Claude.ai
2. Click **"Upload Skill"**
3. Upload the entire `code-review` folder
4. The skill will be named "code-review"

### Option 2: Manual Installation

1. Extract the package
2. Copy the `code-review` folder to your skills directory: `/mnt/skills/user/code-review/`
3. Restart Claude or reload skills

## Package Structure

```
code-review/
├── SKILL.md                      # Main skill definition
└── references/
    └── owasp-checklist.md        # Comprehensive OWASP security checklist
```

## Usage Examples

### Example 1: Review a Pull Request

```
You: "Please review this PR. It adds user authentication."
[Attach PR diff or code files]

Claude will:
1. Check if code matches the story requirements
2. Review naming conventions and code structure
3. Analyze for security vulnerabilities (OWASP)
4. Assess maintainability and readability
5. Evaluate test coverage
6. Check performance considerations
7. Verify architecture consistency
8. Provide structured, constructive feedback
```

### Example 2: Security-Focused Review

```
You: "Review this code for security issues, especially around password handling"

Claude will:
1. Deep dive into security analysis
2. Reference OWASP checklist (owasp-checklist.md)
3. Check cryptographic implementations
4. Verify input validation
5. Assess authentication/authorization
6. Provide prioritized security findings
```

### Example 3: Quick Code Quality Check

```
You: "Quick review - is this function maintainable?"

Claude will:
1. Assess readability and complexity
2. Check naming conventions
3. Identify code smells
4. Suggest improvements for maintainability
5. Provide quick wins for quality improvement
```

## Review Output Structure

Every review includes:

```markdown
## Code Review Summary

**Overall Assessment:** [Approve/Approve with Changes/Request Changes]

### ✅ Strengths
- What's done well

### 🚨 Critical Issues (Must Fix)
- Security vulnerabilities
- Data loss risks
- Breaking bugs

### ⚠️ Important Issues (Should Fix)
- Code quality concerns
- Maintainability issues
- Missing tests

### 💡 Suggestions (Nice to Have)
- Optimizations
- Improvements
- Best practices

### 📊 Metrics
- Story Alignment: ✅/⚠️/❌
- Code Quality: X/10
- Security: Status
- Maintainability: X/10
- Test Coverage: X%

### 🎯 Next Steps
- Clear action items

### 📚 Resources
- Relevant documentation
```

## Security Coverage (OWASP Top 10)

The skill checks for all OWASP Top 10 2021 vulnerabilities:

1. **A01 - Broken Access Control**
2. **A02 - Cryptographic Failures**
3. **A03 - Injection** (SQL, XSS, Command)
4. **A04 - Insecure Design**
5. **A05 - Security Misconfiguration**
6. **A06 - Vulnerable Components**
7. **A07 - Authentication Failures**
8. **A08 - Software/Data Integrity Failures**
9. **A09 - Security Logging/Monitoring Failures**
10. **A10 - Server-Side Request Forgery (SSRF)**

Plus additional checks for:
- CSRF protection
- CORS configuration
- File upload security
- API security
- Mobile-specific issues
- Regular expression vulnerabilities (ReDoS)

## Code Quality Standards

The skill enforces:

- **Clean Code Principles** - Single responsibility, DRY, readable code
- **Naming Conventions** - Descriptive, consistent names
- **Function Size** - Keep functions small (< 20 lines ideally)
- **Complexity** - Limit nesting and cyclomatic complexity
- **Code Smells** - Identify and flag common issues
- **Consistency** - Match existing codebase patterns

## Feedback Philosophy

All feedback follows these principles:

1. **Be Specific** - Point to exact lines and explain the issue
2. **Explain Why** - Always include reasoning and impact
3. **Provide Solutions** - Suggest concrete fixes with examples
4. **Acknowledge Good Work** - Highlight positive aspects
5. **Prioritize** - Use severity levels (Critical → Low)
6. **Consider Context** - Account for time constraints and project maturity

## Integration with Other Skills

This skill works well with:

- **security-architect** - For detailed threat modeling
- **technical-architecture** - For architecture validation
- **devops** - For CI/CD and deployment reviews

## Customization

You can customize the skill by:

1. **Adding project-specific patterns** to SKILL.md
2. **Extending security checks** in owasp-checklist.md
3. **Adding language-specific guidelines** to references/
4. **Adjusting severity thresholds** based on your needs

## Tips for Best Results

1. **Provide context** - Include story/issue numbers
2. **Attach related files** - Tests, related code, configuration
3. **Specify focus area** - Security, quality, performance, etc.
4. **Share tech stack** - Framework versions, dependencies
5. **Mention constraints** - Deadlines, limitations, priorities

## Example Review Flow

```
User: Review PR #234 - adds user authentication endpoint
      Story: #123 - User registration with email/password

Claude:
1. Reads SKILL.md for review process
2. Reviews code against story requirements
3. Checks naming and structure
4. References owasp-checklist.md for security
5. Assesses maintainability
6. Evaluates tests
7. Checks performance
8. Provides structured feedback:

   ✅ Strengths: Clean structure, good tests
   🚨 Critical: Password stored in plaintext (OWASP A02)
   🚨 Critical: SQL injection in getUserByEmail (OWASP A03)
   ⚠️ Important: Missing rate limiting on login
   💡 Suggestion: Extract validation logic
   
   Next Steps:
   1. Fix password hashing (bcrypt)
   2. Use parameterized queries
   3. Add rate limiting
```

## Severity Levels

- **🚨 Critical** - Security vulnerabilities, data loss, must fix before merge
- **⚠️ High** - Significant issues, should fix before release
- **💡 Medium** - Quality/maintainability, fix soon
- **📝 Low** - Nice to have, fix when possible

## When to Use This Skill

Use this skill when you need to:

- Review pull requests before merge
- Analyze code commits
- Evaluate code security
- Check code quality and maintainability
- Verify story implementation
- Assess technical debt
- Identify performance issues
- Ensure architecture consistency

## What Makes This Skill Effective

1. **Comprehensive** - Covers all aspects of code quality
2. **Structured** - Follows consistent review process
3. **Actionable** - Provides specific, fixable feedback
4. **Educational** - Explains the "why" behind suggestions
5. **Balanced** - Acknowledges good work while identifying issues
6. **Prioritized** - Helps focus on what matters most
7. **Security-First** - OWASP-based security analysis
8. **Context-Aware** - Considers project constraints and patterns

## Requirements Verification

The skill ensures code:
- ✅ Implements all acceptance criteria
- ✅ Matches story scope (no under/over-engineering)
- ✅ References stories in commits/PR
- ✅ Handles edge cases from requirements
- ✅ Aligns with project architecture

## Maintainability Assessment

The skill evaluates:
- 📖 **Readability** - Can others understand it quickly?
- 🧪 **Testability** - Can it be unit tested easily?
- 🔧 **Extensibility** - Can features be added without major changes?
- 🐛 **Debuggability** - Can issues be isolated and fixed?
- 🔄 **Changeability** - What's the impact radius of changes?

---

**Version:** 1.0  
**Last Updated:** December 2024  
**OWASP Version:** Top 10 2021

## License

MIT License - Free and open source for personal or commercial use.

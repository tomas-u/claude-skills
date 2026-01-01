---
name: code-review
description: Comprehensive code review for pull requests and commits. Reviews code against associated stories/tasks, checks naming conventions, linting, clean code practices, readability, maintainability, and security vulnerabilities (OWASP). Provides constructive feedback with explanations. Use when reviewing code, analyzing PRs, checking commits, or validating implementations against requirements.
---

# Code Review Skill

Provide thorough, constructive code reviews that ensure quality, security, and alignment with requirements.

## Review Process Overview

Every code review follows this structured approach:

1. **Story/Task Alignment** - Verify implementation matches requirements
2. **Code Quality** - Check naming, structure, and clean code principles
3. **Security Analysis** - Identify vulnerabilities using OWASP guidelines
4. **Maintainability** - Assess readability, complexity, and long-term sustainability
5. **Testing & Coverage** - Evaluate test quality and coverage
6. **Performance** - Identify potential performance issues
7. **Architecture Fit** - Ensure consistency with existing patterns
8. **Constructive Feedback** - Provide actionable improvements with reasoning

## Pre-Review Checklist

Before starting a code review, gather:

- [ ] PR/commit description and linked issues/stories
- [ ] Code changes (diff or full files)
- [ ] Related test files
- [ ] Project context (tech stack, architecture patterns)
- [ ] Existing linting/style configurations

## 1. Story/Task Alignment

### What to Check

**Requirements Coverage:**
- Does the code implement all acceptance criteria from the story?
- Are edge cases mentioned in the story handled?
- Does the implementation match the story's scope (not over/under-engineered)?

**Story References:**
- Is the story/issue referenced in commit messages?
- Does the PR description explain what's being solved?
- Are there any implemented features NOT in the story (scope creep)?

### Questions to Ask

- "What was the original requirement?"
- "Does this code solve that requirement completely?"
- "Are there parts of the story not addressed?"
- "Is there functionality beyond the story scope?"

### Feedback Template

```
✅ Story Alignment: [Pass/Partial/Fail]

Requirement Coverage:
- ✅ Implements user authentication (Story #123)
- ⚠️ Missing password reset flow mentioned in AC3
- ❌ Added email notification feature not in story scope

Recommendation: [Specific action needed]
```

## 2. Code Quality

### Naming Conventions

**Variables & Functions:**
- Descriptive, intention-revealing names
- Consistent with project conventions (camelCase, snake_case, etc.)
- Appropriate length (not too short, not unnecessarily long)
- Avoid abbreviations unless standard (e.g., `id`, `url`)

**Classes & Components:**
- Clear, singular nouns for classes
- Verb phrases for functions (e.g., `getUserById`, `calculateTotal`)
- Boolean variables start with `is`, `has`, `should` (e.g., `isActive`, `hasPermission`)

**Constants:**
- ALL_CAPS for true constants
- Descriptive names for magic numbers/strings

**Examples:**

❌ Bad:
```javascript
function calc(u, p) {
  const x = u * p;
  return x;
}
const MAX = 10; // Max what?
```

✅ Good:
```javascript
function calculateOrderTotal(unitPrice, quantity) {
  const totalPrice = unitPrice * quantity;
  return totalPrice;
}
const MAX_RETRY_ATTEMPTS = 10;
```

### Clean Code Principles

**Single Responsibility:**
- Each function/class does ONE thing well
- Easy to name (if hard to name, probably doing too much)

**DRY (Don't Repeat Yourself):**
- No code duplication
- Extract common logic into reusable functions
- Use abstractions appropriately

**Function Size:**
- Keep functions small (< 20 lines ideally)
- One level of abstraction per function
- Extract complex logic into named helper functions

**Readability:**
- Code reads like prose
- Self-documenting (minimal comments needed)
- Clear flow and structure
- Appropriate whitespace and formatting

**Complexity:**
- Avoid deep nesting (> 3 levels)
- Limit function parameters (< 4 ideally)
- Cyclomatic complexity under control
- Extract complex conditions into named variables/functions

### Code Smells to Flag

Common issues to identify:

- **Long functions** (> 50 lines)
- **God objects** (classes doing too much)
- **Deep nesting** (if/else > 3 levels)
- **Magic numbers** (unexplained constants)
- **Dead code** (commented out, unreachable)
- **Inconsistent style** (mixed conventions)
- **Inappropriate intimacy** (too much coupling)
- **Feature envy** (method uses another class's data heavily)

### Feedback Template

```
📝 Code Quality: [Good/Needs Improvement]

Naming:
- ✅ Functions well-named and descriptive
- ⚠️ Variable 'x' on line 45 unclear - suggest 'totalRevenue'

Structure:
- ⚠️ Function `processUser` (lines 120-180) is 60 lines long
  → Recommend: Extract validation logic into `validateUserData`
  → Recommend: Extract DB operations into `saveUserToDatabase`
  
Clean Code:
- ❌ Code duplication in lines 45-52 and 78-85
  → Recommend: Extract into `formatCurrency(amount)` helper

Complexity:
- ⚠️ Deep nesting in `calculateDiscount` (4 levels)
  → Recommend: Use early returns or guard clauses

Why: These changes will make the code easier to understand, test, and maintain.
```

## 3. Security Analysis (OWASP)

Review code against OWASP Top 10 and common vulnerabilities. Reference `references/owasp-checklist.md` for comprehensive security checks.

### Key Security Checks

**A01 - Broken Access Control:**
- Are authorization checks present and correct?
- Can users access resources they shouldn't?
- Are direct object references protected?
- Is there proper role-based access control?

**A02 - Cryptographic Failures:**
- Is sensitive data encrypted in transit (HTTPS)?
- Is sensitive data encrypted at rest?
- Are proper hashing algorithms used (bcrypt, argon2)?
- Are cryptographic keys managed securely?
- No hardcoded secrets/passwords?

**A03 - Injection:**
- SQL injection prevention (parameterized queries)?
- XSS prevention (output encoding, CSP)?
- Command injection prevention?
- LDAP/XML injection prevention?

**A04 - Insecure Design:**
- Threat modeling considered?
- Secure by default configuration?
- Proper input validation at boundaries?
- Business logic flaws addressed?

**A05 - Security Misconfiguration:**
- Default credentials changed?
- Error messages don't leak sensitive info?
- Security headers configured (CSP, X-Frame-Options)?
- Unnecessary features disabled?

**A06 - Vulnerable Components:**
- Dependencies up-to-date?
- Known vulnerabilities in dependencies?
- Using maintained libraries?
- Supply chain security considered?

**A07 - Authentication Failures:**
- Strong password requirements?
- Multi-factor authentication supported?
- Session management secure?
- Account lockout on failed attempts?
- No credential stuffing vulnerabilities?

**A08 - Data Integrity Failures:**
- Unsigned/unverified data not trusted?
- CI/CD pipeline secured?
- Auto-update without verification avoided?
- Insecure deserialization prevented?

**A09 - Logging/Monitoring Failures:**
- Security events logged?
- Audit trails immutable?
- Alerts configured for suspicious activity?
- Logs don't contain sensitive data?

**A10 - Server-Side Request Forgery (SSRF):**
- User input validated before making requests?
- Allowlist for URLs?
- Network segmentation in place?
- Metadata endpoints protected?

### Additional Security Concerns

**Input Validation:**
- All user input validated and sanitized?
- Allowlist approach over blocklist?
- Length limits enforced?
- Type checking performed?

**Output Encoding:**
- All output properly encoded for context?
- XSS prevention in place?
- HTML, JavaScript, URL encoding as needed?

**Error Handling:**
- Errors caught and handled gracefully?
- No sensitive information in error messages?
- Generic errors shown to users?
- Detailed errors logged securely?

**Session Management:**
- Secure session tokens (random, sufficient entropy)?
- Tokens invalidated on logout?
- Session timeout configured?
- CSRF tokens implemented?

### Feedback Template

```
🔒 Security Analysis: [Secure/Issues Found]

Critical Issues (Fix Immediately):
- 🚨 SQL Injection vulnerability in `getUserByEmail` (line 67)
  → Current: Direct string concatenation in query
  → Fix: Use parameterized query: `SELECT * FROM users WHERE email = ?`
  → Why: Attackers can inject malicious SQL and access all database data

High Priority:
- ⚠️ Password stored in plaintext (line 134)
  → Fix: Use bcrypt.hash() before storing
  → Why: If database is breached, all passwords are compromised

Medium Priority:
- ⚠️ Missing rate limiting on login endpoint
  → Recommend: Implement rate limiting to prevent brute force attacks
  → Why: Prevents credential stuffing and account takeover attempts

Good Practices Found:
- ✅ HTTPS enforced for all endpoints
- ✅ Input validation on user registration
- ✅ CSRF tokens implemented

OWASP Alignment: [List specific OWASP categories addressed/violated]
```

## 4. Maintainability & Readability

### Readability Factors

**Is the code EASY TO READ?**

- Can someone unfamiliar understand the code flow in 5 minutes?
- Are variable/function names self-explanatory?
- Is the logic flow intuitive?
- Are complex operations broken down?
- Is indentation and formatting consistent?

**Mental Load:**
- How much context must reader hold in mind?
- Can functions be understood in isolation?
- Are abstractions appropriate (not too complex, not too simple)?

**Documentation:**
- Are complex algorithms explained?
- Are non-obvious decisions documented?
- Are function purposes clear from names alone?
- Are JSDoc/docstrings provided where needed?

### Maintainability Factors

**Is the code EASY TO MAINTAIN?**

**Testability:**
- Can this code be unit tested easily?
- Are dependencies injectable?
- Are side effects isolated?
- Can tests verify behavior without testing implementation?

**Extensibility:**
- Can new features be added without major refactoring?
- Are abstractions at the right level?
- Is the code open for extension, closed for modification?

**Debuggability:**
- Are error messages helpful?
- Is logging sufficient for troubleshooting?
- Can issues be isolated quickly?
- Are stack traces meaningful?

**Changeability:**
- What's the blast radius of changes?
- How many files must change for a feature change?
- Are concerns properly separated?
- Is coupling minimized?

### Technical Debt Assessment

Identify and categorize technical debt:

**Type 1 - Quick Fixes (< 1 hour):**
- Rename unclear variables
- Add missing comments
- Extract magic numbers to constants

**Type 2 - Refactoring (1-4 hours):**
- Extract long functions
- Remove code duplication
- Improve error handling

**Type 3 - Restructuring (> 4 hours):**
- Redesign module structure
- Refactor architecture
- Add missing abstractions

### Feedback Template

```
🔧 Maintainability: [Excellent/Good/Needs Work]

Readability:
- ✅ Code flows naturally and is easy to follow
- ⚠️ Function `processPayment` (line 89) has high cognitive complexity
  → Multiple nested conditions make logic hard to follow
  → Recommend: Extract validation into separate functions with clear names

Testability:
- ❌ `UserService` directly instantiates `DatabaseConnection`
  → Hard to test without real database
  → Recommend: Inject dependency via constructor
  → Why: Enables unit testing with mocked database

Documentation:
- ⚠️ Complex algorithm in `calculateShippingCost` (line 234) lacks explanation
  → Add comment explaining the business rules
  → Why: Future developers need to understand the logic without reverse-engineering

Technical Debt:
- Type 1: Rename `tmp` to `temporaryUserData` (line 45) - 5 min
- Type 2: Extract duplicate validation logic (lines 67-78, 123-134) - 30 min
  → Impact: Reduces maintenance burden and potential for inconsistencies

Long-term Maintenance Score: 7/10
→ Small improvements would significantly boost maintainability
```

## 5. Testing & Coverage

### Test Quality Assessment

**Test Coverage:**
- Are critical paths tested?
- Are edge cases covered?
- Are error conditions tested?
- What's the coverage percentage (if available)?

**Test Quality:**
- Are tests meaningful (not just for coverage)?
- Do tests verify behavior, not implementation?
- Are tests independent and isolated?
- Are test names descriptive?

**Test Types:**
- Unit tests for business logic?
- Integration tests for API endpoints?
- End-to-end tests for critical flows?
- Security tests for vulnerabilities?

**Missing Tests:**
- What scenarios aren't tested?
- Which error paths are untested?
- Are there untested branches?

### Feedback Template

```
🧪 Testing: [Well Tested/Partially Tested/Needs Tests]

Coverage:
- ✅ Happy path tested for user registration
- ⚠️ Missing tests for:
  → Duplicate email registration (should return 409)
  → Invalid email format (should return 400)
  → Database connection failure (should return 500)

Test Quality:
- ✅ Tests are isolated and independent
- ⚠️ Test `test_user_creation` on line 234 tests implementation details
  → Currently: Checks internal method calls
  → Should: Verify user exists in database after creation
  → Why: Implementation can change, behavior shouldn't

Recommended Tests:
1. Edge case: Maximum password length (security)
2. Error case: Network timeout during email sending
3. Integration: Full registration flow with email verification

Priority: Add error case tests (high priority for production readiness)
```

## 6. Performance Considerations

### Common Performance Issues

**Database:**
- N+1 query problems?
- Missing indexes?
- Inefficient queries (SELECT *)?
- Unnecessary joins?
- Missing pagination for large datasets?

**API Calls:**
- Redundant API requests?
- Missing caching?
- Synchronous calls that could be async?
- No timeout handling?

**Frontend:**
- Unnecessary re-renders (React)?
- Large bundle sizes?
- Unoptimized images?
- Missing code splitting?
- Blocking operations on main thread?

**Algorithms:**
- Inefficient algorithm choice (O(n²) when O(n log n) possible)?
- Unnecessary iterations?
- Memory leaks?
- Large object allocations in loops?

### Feedback Template

```
⚡ Performance: [Optimized/Acceptable/Issues Found]

Issues:
- ⚠️ N+1 query in `getUserWithPosts` (line 89)
  → Current: Loops through users, queries posts for each (1 + N queries)
  → Fix: Use JOIN or eager loading to fetch in single query
  → Impact: For 100 users, reduces from 101 queries to 1 query
  → Why: Critical for scalability as user base grows

- ⚠️ Synchronous file read in request handler (line 134)
  → Fix: Use async file read or cache file contents
  → Impact: Blocks other requests, reduces throughput
  → Why: Each request should be non-blocking

Optimizations:
- ✅ Proper indexing on frequently queried fields
- ✅ Caching implemented for expensive operations

Recommendations:
- Consider: Add pagination to `getAllUsers` endpoint
  → Why: Will be slow when user count exceeds 1000
```

## 7. Architecture Fit

### Pattern Consistency

**Existing Patterns:**
- Does code follow established patterns in codebase?
- Are similar problems solved similarly?
- Is the architecture style respected (MVC, Clean Architecture, etc.)?

**Project Structure:**
- Are files in correct directories?
- Does naming follow project conventions?
- Are imports organized consistently?

**Technology Choices:**
- Are the right tools used for the job?
- Are dependencies appropriate?
- Is the tech stack consistent?

### Feedback Template

```
🏗️ Architecture Fit: [Aligned/Minor Issues/Concerns]

Pattern Consistency:
- ✅ Follows existing service layer pattern
- ⚠️ Error handling inconsistent with other controllers
  → Other controllers use try/catch with centralized error handler
  → This controller returns inline error responses
  → Recommend: Use consistent error handling pattern

Structure:
- ❌ Business logic in controller (line 67-89)
  → Should be: Extracted to service layer
  → Why: Controllers should only handle HTTP concerns
  → Example: Move to `UserService.validateAndCreateUser()`

Technology:
- ⚠️ Introduced new date library (date-fns) when moment.js already in use
  → Question: Is there a reason for the new dependency?
  → Recommend: Use existing library for consistency unless justified

Impact: Inconsistencies make codebase harder to navigate and maintain
```

## 8. Additional Considerations

### Documentation

**Code Comments:**
- Are complex sections explained?
- Are non-obvious decisions documented?
- Are TODOs marked with ticket references?

**API Documentation:**
- Are endpoints documented (OpenAPI/Swagger)?
- Are request/response examples provided?
- Are error codes documented?

**README/Changelog:**
- Is PR description clear and complete?
- Are breaking changes noted?
- Are migration steps provided?

### Dependencies

**New Dependencies:**
- Are new dependencies necessary?
- Are they maintained and secure?
- License compatibility?
- Bundle size impact?

**Dependency Updates:**
- Breaking changes handled?
- Changelog reviewed?
- Tests updated for new version?

### Backward Compatibility

**Breaking Changes:**
- Are there breaking API changes?
- Is deprecation path provided?
- Are consumers notified?
- Version bump appropriate?

**Database Changes:**
- Are migrations provided?
- Is rollback possible?
- Is data migration safe?

## Constructive Feedback Framework

### Feedback Principles

**1. Be Specific:**
❌ "This code is messy"
✅ "Function `processData` on line 67 mixes data validation and business logic, making it hard to test each concern independently"

**2. Explain Why:**
Always include the reasoning behind suggestions:
- Impact on maintainability
- Security implications
- Performance benefits
- User experience improvements

**3. Provide Solutions:**
Don't just point out problems - suggest fixes:
❌ "This is inefficient"
✅ "Consider using a Map instead of Array.find() for O(1) lookups instead of O(n)"

**4. Acknowledge Good Work:**
Point out what's done well:
- "Great use of error boundaries here"
- "Well-structured tests with clear names"
- "Excellent security considerations"

**5. Prioritize Issues:**
Use severity levels:
- 🚨 Critical: Security vulnerabilities, data loss risks
- ⚠️ High: Bugs, significant performance issues
- 💡 Medium: Code quality, maintainability
- 📝 Low: Style preferences, minor optimizations

**6. Consider Context:**
- Time constraints
- Team experience level
- Project maturity
- Technical debt strategy

### Feedback Structure

```
## Code Review Summary

**Overall Assessment:** [Approve/Approve with Changes/Request Changes]

---

### ✅ Strengths
- [What's done well]
- [Good practices observed]
- [Positive aspects]

---

### 🚨 Critical Issues (Must Fix)
1. [Issue] - Line X
   - Current: [What's wrong]
   - Fix: [How to fix]
   - Why: [Impact/reasoning]

---

### ⚠️ Important Issues (Should Fix)
1. [Issue] - Line X
   - Current: [What's wrong]
   - Fix: [How to fix]
   - Why: [Impact/reasoning]

---

### 💡 Suggestions (Nice to Have)
1. [Suggestion] - Line X
   - Current: [Current approach]
   - Alternative: [Suggested approach]
   - Benefit: [Why it's better]

---

### 📊 Metrics
- Story Alignment: ✅ Complete
- Code Quality: 8/10
- Security: ⚠️ Issues Found (2 high, 1 medium)
- Maintainability: 7/10
- Test Coverage: 75% (target: 80%)

---

### 🎯 Next Steps
1. [Action item]
2. [Action item]
3. [Action item]

---

### 📚 Resources
- [Link to relevant documentation]
- [Link to similar implementation]
- [Link to security guide]
```

## Quick Reference Checklist

Use this for rapid reviews:

### Story Alignment
- [ ] Implements all acceptance criteria
- [ ] No scope creep
- [ ] Story referenced in commit/PR

### Code Quality
- [ ] Clear, descriptive names
- [ ] Functions < 20 lines
- [ ] No code duplication
- [ ] Consistent style
- [ ] Low complexity

### Security (OWASP)
- [ ] Input validation
- [ ] Output encoding
- [ ] Authentication/authorization
- [ ] No injection vulnerabilities
- [ ] Secrets management
- [ ] Error handling secure

### Maintainability
- [ ] Easy to read
- [ ] Easy to test
- [ ] Well documented
- [ ] Low coupling
- [ ] High cohesion

### Testing
- [ ] Critical paths tested
- [ ] Edge cases covered
- [ ] Error scenarios tested
- [ ] Tests are meaningful

### Performance
- [ ] No N+1 queries
- [ ] Appropriate caching
- [ ] Efficient algorithms
- [ ] No blocking operations

### Architecture
- [ ] Follows project patterns
- [ ] Consistent with existing code
- [ ] Appropriate abstractions
- [ ] Proper file structure

## Examples

### Example 1: Full PR Review

**Context:** PR adds user authentication endpoint

**Review:**

```
## Code Review: User Authentication Endpoint (#234)

**Overall Assessment:** Approve with Changes (Security issues must be fixed)

---

### ✅ Strengths
- Clean separation of concerns (controller → service → repository)
- Comprehensive unit tests for service layer
- Good error handling with appropriate status codes
- Clear, descriptive function names

---

### 🚨 Critical Issues (Must Fix Before Merge)

1. **Password Storage - Line 67** (OWASP A02: Cryptographic Failures)
   - Current: Passwords stored in plaintext
   ```javascript
   user.password = req.body.password; // ❌
   ```
   - Fix: Hash password before storing
   ```javascript
   user.password = await bcrypt.hash(req.body.password, 10);
   ```
   - Why: If database is compromised, all user passwords are exposed. This is a critical security vulnerability.

2. **SQL Injection - Line 89** (OWASP A03: Injection)
   - Current: String concatenation in query
   ```javascript
   db.query(`SELECT * FROM users WHERE email = '${email}'`); // ❌
   ```
   - Fix: Use parameterized query
   ```javascript
   db.query('SELECT * FROM users WHERE email = ?', [email]);
   ```
   - Why: Attackers can inject SQL commands to access or modify any data in the database.

---

### ⚠️ Important Issues (Should Fix)

1. **Missing Rate Limiting - auth.controller.js**
   - Current: No rate limiting on login endpoint
   - Recommendation: Add rate limiting middleware
   ```javascript
   router.post('/login', rateLimiter({ max: 5, windowMs: 15 * 60 * 1000 }), login);
   ```
   - Why: Prevents brute force attacks on user accounts

2. **Incomplete Story Implementation - Issue #234**
   - Story AC3: "User receives email confirmation after registration"
   - Current: Email confirmation not implemented
   - Recommendation: Either implement or create follow-up ticket and note in PR

---

### 💡 Suggestions (Nice to Have)

1. **Extract Validation Logic - Line 45-62**
   - Current: Validation inline in controller (18 lines)
   - Suggestion: Extract to separate validator
   ```javascript
   const errors = validateUserRegistration(req.body);
   if (errors.length > 0) return res.status(400).json({ errors });
   ```
   - Benefit: Reusable validation, easier to test, controller stays focused

2. **Add JSDoc Comments - user.service.js**
   - Functions would benefit from parameter and return type documentation
   - Example:
   ```javascript
   /**
    * Registers a new user with the provided credentials
    * @param {Object} userData - User registration data
    * @param {string} userData.email - User's email address
    * @param {string} userData.password - User's password (will be hashed)
    * @returns {Promise<User>} Newly created user object
    * @throws {ValidationError} If email already exists
    */
   ```

---

### 📊 Metrics
- Story Alignment: ⚠️ Partial (missing AC3)
- Code Quality: 8/10 (clean structure, minor improvements possible)
- Security: 🚨 Critical Issues (2 must fix)
- Maintainability: 8/10 (well-organized, good naming)
- Test Coverage: 82% ✅ (exceeds 80% target)
- Performance: ✅ No issues identified

---

### 🎯 Next Steps
1. Fix critical security issues (password hashing, SQL injection)
2. Add rate limiting to prevent brute force attacks
3. Address incomplete story (email confirmation) - implement or create follow-up ticket
4. Consider extracting validation logic for reusability
5. Re-request review after changes

---

### 📚 Resources
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [bcrypt documentation](https://github.com/kelektiv/node.bcrypt.js)
- [Express rate limiting](https://github.com/nfriedly/express-rate-limit)
- [Parameterized queries guide](https://cheatsheetseries.owasp.org/cheatsheets/Query_Parameterization_Cheat_Sheet.html)
```

---

## Integration with Other Skills

This skill works well with:

- **security-architect** - For detailed threat modeling and security architecture
- **technical-architecture** - For architecture pattern validation
- **devops** - For CI/CD and deployment security reviews

When detailed security architecture review is needed, recommend using the security-architect skill for comprehensive analysis.

## Output Format

Every code review should include:

1. **Summary** - Overall assessment and decision (approve/request changes)
2. **Strengths** - What's done well
3. **Critical Issues** - Must fix (security, bugs, data loss)
4. **Important Issues** - Should fix (quality, maintainability)
5. **Suggestions** - Nice to have (optimizations, improvements)
6. **Metrics** - Quantified assessment across dimensions
7. **Next Steps** - Clear action items
8. **Resources** - Helpful links and documentation

Always be constructive, specific, and explain the "why" behind every suggestion.

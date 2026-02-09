# Jira Scaffolding Template

Use this template for the output file at `docs/jira/YYYY-MM-DD-<topic>-scaffolding.md`.

```markdown
---
type: jira-scaffolding
status: draft | created
created: YYYY-MM-DD
requirements: [path to S3 v3]
architecture: [path to S4]
threat_model: [path to S5]
jira_project: [project key, if created]
# --- Summary ---
epic_count: [number]
story_count: [number]
technical_enabler_count: [number]
security_story_count: [number]
---

# Jira Scaffolding: [Title]

## Epic Structure

| Epic | Type | Source | Story Count |
|------|------|--------|-------------|
| Technical Enablers | Enabler | S4 | X |
| Security | Security | S5 | X |
| NFR Implementation | NFR | S3 | X |
| [Capability Name] | Capability | S3 | X |

## Epics & Stories

### Epic: Technical Enablers

**Type:** Enabler
**Source:** S4 Architecture
**Labels:** technical-enabler

**UAT Test Cases:**
- [ ] [Infrastructure/platform outcome validation]

#### Stories

**[Story Title]**
- **Type:** Technical
- **Labels:** ADR-001
- **Complexity:** M
- **Description:** Implement [thing] to enable [outcome]
- **Context:** [Why needed — ADR reference]
- **Acceptance Criteria:**
  - [ ] [Criterion]
- **Edge Cases:** [if any]

---

### Epic: Security

**Type:** Security
**Source:** S5 Threat Model
**Labels:** security

**UAT Test Cases:**
- [ ] [Security outcome validation]

#### Stories

**[Story Title]**
- **Type:** Security
- **Labels:** THR-001
- **Complexity:** H
- **Description:** Implement [control] to mitigate [threat]
- **Context:** [Threat reference from S5]
- **Acceptance Criteria:**
  - [ ] [Criterion]
- **Edge Cases:** [if any]

---

### Epic: [Capability Group Name]

**Type:** Capability
**Source:** S3 Requirement Group
**Labels:** [capability-slug]
**Priority:** Must / Should / Could
**Value:** H/M/L
**Complexity:** H/M/L

**UAT Test Cases:**
- [ ] [Business outcome from S3 success criteria]
- [ ] [Another outcome]

#### Stories

**[Story Title]**
- **Type:** Functional
- **Labels:** REQ-001
- **Complexity:** M
- **Description:**
  As a [user type],
  I want [goal],
  So that [benefit].
- **Acceptance Criteria:**
  - [ ] [Criterion from S3]
  - [ ] [Additional criterion]
- **Edge Cases:**
  - [From S3]
  - [Prompted during elaboration]

---

## Traceability

| Requirement | Story | Epic | Jira Key |
|-------------|-------|------|----------|
| REQ-001 | [Story title] | [Epic name] | [KEY-123] |
| ADR-001 | [Story title] | Technical Enablers | [KEY-124] |
| THR-001 | [Story title] | Security | [KEY-125] |

## Creation Log

| Action | Jira Key | Status | Notes |
|--------|----------|--------|-------|
| Created Epic: Technical Enablers | KEY-100 | Success | |
| Created Story: [title] | KEY-101 | Success | |
| Created Story: [title] | KEY-102 | Failed | [error] |
```

## Story Format Reference

### Functional Stories (from S3)
```
As a [user type],
I want [goal],
So that [benefit].

Acceptance Criteria:
- [ ] [Criterion]

Edge Cases:
- [From S3 + prompted]

Labels: REQ-xxx, [capability]
Complexity: H/M/L
```

### Technical Stories (from S4)
```
Implement [thing] to enable [outcome].

Context:
[ADR reference and rationale]

Acceptance Criteria:
- [ ] [Criterion]

Labels: ADR-xxx, technical-enabler
Complexity: H/M/L
```

### Security Stories (from S5)
```
Implement [control] to mitigate [threat].

Context:
[Threat reference and STRIDE category]

Acceptance Criteria:
- [ ] [Criterion]

Labels: THR-xxx, security
Complexity: H/M/L
```

## Epic Types

| Type | Source | Content |
|------|--------|---------|
| **Enabler** | S4 | Cross-cutting infrastructure, CI/CD, platform |
| **Security** | S5 | Cross-cutting security controls |
| **NFR** | S3 | Performance, scalability, observability (if scope warrants) |
| **Capability** | S3 | Functional requirements + component-specific tech/security |

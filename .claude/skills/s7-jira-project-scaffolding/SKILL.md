---
name: s7-jira-project-scaffolding
description: "Use after S6 design validation passes. Use when an initiative needs Jira epics and stories created from validated requirements and design artifacts. Triggers include passed design validation, backlog creation requests, or when someone asks 'create the Jira stories' or 'scaffold the project'."
---

# S7 — Jira Project Scaffolding

## Overview

Translate validated requirements (S3 v3), solution architecture (S4), and threat model (S5) into Jira epics and stories. Produces a local scaffold document and optionally creates issues in Jira. Runs after S6 (Design Validation) confirms the design is ready.

## Entry

1. Locate S6 validation report — confirm verdict is Ready or Ready with Conditions
2. Locate S3 v3, S4, S5 documents and traceability matrix — or use paths from `$ARGUMENTS`
2. Read frontmatter context summaries
3. Summarise: "Here's what I'll scaffold into Jira — correct?"
4. Ask: "Create new Jira project or use existing?"
5. Check Jira integration:
   - Jira MCP available → use it
   - No MCP, `.claude/jira-config.json` exists → use REST API
   - No config → offer setup (see Phase: Jira Setup)
   - No integration wanted → local scaffold doc only

## Process

### Phase 1 — Epic Structure

Generate epic structure from inputs:

| Epic Type | Source | Content |
|-----------|--------|---------|
| **Technical Enablers** | S4 | Cross-cutting: CI/CD, environments, platform |
| **Security** | S5 | Cross-cutting: identity, key management, security logging |
| **NFR Implementation** | S3 NFRs | If scope warrants dedicated epic |
| **[Capability]** | S3 groups | 1:1 mapping, functional + component-specific tech/security |

**User interaction:**
- Flag small groups (1-2 reqs) — ask merge or keep separate
- Assess NFR scope — propose dedicated epic if substantial
- User reviews and adjusts before proceeding

### Phase 2 — Story Generation

For each epic:
1. Generate stories from requirements (S3), ADRs (S4), threats (S5)
2. Apply format based on type:
   - **Functional**: "As a [user], I want [goal], so that [benefit]"
   - **Technical/Security**: "Implement [thing] to enable [outcome]"
3. Carry forward complexity (H/M/L) — not story points
4. Apply traceability labels: REQ-xxx, ADR-xxx, THR-xxx
5. Carry forward edge cases from S3
6. Prompt: "Any additional edge cases for this story?"
7. User reviews and adjusts

### Phase 3 — UAT Test Cases

For each epic, generate UAT test cases:
- Derived from S3 capability group success criteria
- Business outcome validation (not Given/When/Then functional tests)

### Phase 4 — Jira Setup (if needed)

If no MCP or config exists and user wants integration:

1. Prompt for Jira URL, email, API token
2. Write `.claude/jira-config.json`
3. Add to `.gitignore`
4. Test credentials
5. Confirm connection

### Phase 5 — Creation

1. Write local scaffold doc to `docs/jira/YYYY-MM-DD-<topic>-scaffolding.md`
2. If Jira integration: "Ready to create in Jira?"
3. Create epics first, then stories under each
4. Log results in scaffold doc
5. Update traceability matrix with Jira keys
6. Git handling: ask to commit

### Phase 6 — Handoff

```
Jira scaffolding complete.

Created:
- X epics
- Y stories

Next step: S8 — Security Assessment
S8 will perform independent security assessment against frameworks.
```

## Jira Config File

`.claude/jira-config.json`:
```json
{
  "jira_url": "https://yourcompany.atlassian.net",
  "email": "user@company.com",
  "api_token": "your-api-token"
}
```

**Always add to .gitignore** — contains credentials.

## What S7 Does NOT Do

- Trigger S8 automatically — human decides
- Assign story points — that's the delivery team
- Write functional test cases (Given/When/Then) — that's refinement
- Create sprints or assign stories to sprints
- Auto-commit to git

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Story points instead of complexity | Carry H/M/L complexity, not points. Team estimates during refinement. |
| Missing traceability labels | Every story needs REQ-xxx, ADR-xxx, or THR-xxx label |
| Functional format for technical stories | Use "Implement X to enable Y" for tech/security, not "As a..." |
| UAT tests as Given/When/Then | UAT = business outcome validation. Functional tests come later. |
| Creating before user review | Always present structure and stories for approval before Jira creation |
| Committing jira-config.json | Must be in .gitignore — contains credentials |
| One giant epic | Respect S3 capability groups. Split, don't merge by default. |

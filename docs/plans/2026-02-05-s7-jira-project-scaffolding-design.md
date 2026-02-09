# S7 — Jira Project Scaffolding: Skill Design

**Date:** 2026-02-05
**Status:** Draft
**Skill Type:** Project-level, interactive conversational
**Position in Chain:** After S6 (Design Validation) — receives validated S3 v3 + S4 + S5, first skill that writes to Jira

---

## Purpose

Translate final requirements (S3 v3), solution architecture (S4), and threat model (S5) into a structured Jira project with epics and stories. Produces a local scaffold document and optionally creates issues in Jira via MCP or REST API.

---

## Inputs

- S6 Design Validation Report at `docs/validation/` (must be Ready or Ready with Conditions)
- S3 v3 High Level Requirements (final) at `docs/requirements/`
- S4 Solution Architecture at `docs/architecture/`
- S5 Threat Model at `docs/threat-models/`
- Traceability Matrix at `docs/traceability/`
- Reads YAML frontmatter from all as compressed context summaries

---

## Outputs

### Primary: Jira Scaffold Document
- Local file: `docs/jira/YYYY-MM-DD-<topic>-scaffolding.md`
- Contains: epic structure, all stories, UAT test cases, traceability, creation log

### Secondary: Jira Issues
- If Jira integration available: creates epics and stories in Jira
- Updates scaffold doc with Jira issue keys
- Updates traceability matrix with Jira mappings

---

## Epic Structure

| Epic Type | Source | Content |
|-----------|--------|---------|
| **Technical Enablers** | S4 ADRs, infrastructure | Cross-cutting: CI/CD, environments, shared platform, architecture spikes |
| **Security** | S5 threat mitigations | Cross-cutting: identity platform, key management, security logging |
| **NFR Implementation** | S3 NFRs (if scope warrants) | Performance, scalability, availability, observability spanning capabilities |
| **[Capability Group]** | S3 requirement groups (1:1) | Functional stories + component-specific technical + component-specific security |

**Behaviour:**
- S7 proposes structure based on inputs
- Flags small requirement groups (1-2 reqs) — asks merge or keep separate
- Assesses NFR scope — proposes dedicated epic if substantial
- User reviews and adjusts before creation

---

## Story Formats

### Functional Stories (from S3 requirements)
```
Title: [Short descriptive title]

As a [user type],
I want [goal],
So that [benefit].

Acceptance Criteria:
- [ ] [Criterion 1]
- [ ] [Criterion 2]

Edge Cases:
- [Carried from S3 + prompted during elaboration]

Labels: REQ-001, [capability-group]
Complexity: H/M/L (from S3)
```

### Technical/Security Stories (from S4/S5)
```
Title: [Short descriptive title]

Implement [thing] to enable [outcome].

Context:
[Why needed — reference to ADR or threat]

Acceptance Criteria:
- [ ] [Criterion 1]
- [ ] [Criterion 2]

Labels: ADR-001 or THR-003, [epic-label]
Complexity: H/M/L
```

---

## Conversation Flow

### Phase 1 — Intake & Setup

1. Locate S6 validation report — confirm verdict is Ready or Ready with Conditions
2. Locate S3 v3, S4, S5 documents and traceability matrix
3. Summarise understanding: "Here's what I'll scaffold into Jira — correct?"
3. Ask: "Create new Jira project or use existing?"
4. Check Jira integration (in order):
   - Jira MCP available → use it
   - No MCP, `.claude/jira-config.json` exists → use REST API
   - No config → offer setup (see Jira Config Setup below)
   - No integration wanted → local scaffold doc only

### Phase 2 — Epic Structure Proposal

1. Generate epic structure from inputs
2. Flag small requirement groups (1-2 reqs) — ask merge or keep
3. Assess NFR scope — propose dedicated epic if substantial
4. User reviews and adjusts

### Phase 3 — Story Generation

For each epic:
1. Generate stories from requirements/ADRs/threats
2. Apply correct format (functional vs technical/security)
3. Carry forward complexity (H/M/L) from source
4. Apply traceability labels (REQ-xxx, ADR-xxx, THR-xxx)
5. Carry forward S3 edge cases
6. Prompt: "Any additional edge cases for this story?"
7. User reviews and adjusts

### Phase 4 — UAT Test Cases

For each epic, generate UAT test cases:
- Derived from S3 capability group success criteria
- Business outcome validation (not functional test cases)

### Phase 5 — Document & Jira Creation

1. Write local scaffold doc to `docs/jira/YYYY-MM-DD-<topic>-scaffolding.md`
2. If Jira integration available: "Ready to create in Jira?"
3. Create epics first, then stories under each epic
4. Log creation results in scaffold doc
5. Update traceability matrix with Jira issue keys
6. Git handling: ask to commit

### Phase 6 — Handoff

```
Jira scaffolding complete.

Created:
- X epics
- Y stories (Z functional, W technical/security)
- Traceability updated

Next step: S8 — Security Assessment
S8 will perform independent security assessment against frameworks.
```

---

## Jira Config Setup

When no Jira MCP or config exists and user wants integration:

1. Prompt for:
   - Jira URL (e.g., `https://yourcompany.atlassian.net`)
   - User email
   - API token (with link to Atlassian token generation)

2. Write `.claude/jira-config.json`:
```json
{
  "jira_url": "https://yourcompany.atlassian.net",
  "email": "user@company.com",
  "api_token": "your-api-token"
}
```

3. Add to `.gitignore` if not present

4. Test credentials with simple API call

5. Confirm: "Jira connection successful."

If credentials fail, prompt to check and retry.

---

## Traceability

Labels applied to all stories:
- `REQ-xxx` — traces to S3 requirement
- `ADR-xxx` — traces to S4 architecture decision
- `THR-xxx` — traces to S5 threat

Traceability matrix updated with Jira issue keys after creation.

Future: custom field can replace labels for better reporting.

---

## Complexity & Estimation

- S7 carries forward H/M/L complexity from S3/S4/S5
- S7 does NOT assign story points — that's the delivery team's job during refinement
- Complexity signal provides starting point for team estimation

---

## Edge Cases & Test Cases

| Level | Source | Content |
|-------|--------|---------|
| **Requirement** | S3 | Known edge cases captured in requirements |
| **Story** | S7 | S3 edge cases carried forward + additional prompted during elaboration |
| **Epic UAT** | S7 | Business outcome validation from S3 success criteria |
| **Story functional tests** | Refinement | Given/When/Then elaborated by delivery team |

---

## Document Structure

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

## Epics & Stories

### Epic: [Name]
**Labels:** [labels]
**UAT Test Cases:**
- [ ] [Business outcome]

#### Stories
[Story details per format above]

## Traceability
| Requirement | Story | Epic | Jira Key |
|-------------|-------|------|----------|

## Creation Log
| Action | Jira Key | Status |
|--------|----------|--------|
```

---

## MCP Integration

| Server | Access | Purpose |
|--------|--------|---------|
| Jira Cloud | Read + Write | Create epics/stories, read project config |
| Confluence Cloud | Read + Write | Publish scaffold doc |
| GitHub | Read only | Validate against codebase structure |

**Fallback:** REST API via `.claude/jira-config.json`

---

## What S7 Does NOT Do

- Trigger S8 automatically — human decides
- Assign story points — that's the delivery team
- Write functional test cases (Given/When/Then) — that's refinement
- Create sprints or assign to sprints — that's planning
- Auto-commit to git

---

## Downstream Handoff

| Receiving Skill | What It Gets | From Where |
|-----------------|--------------|------------|
| S8 — Security Assessment | Security stories for coverage check | Scaffold doc |
| S9 — Operational Readiness | Full artifact map including Jira, Jira structure validation | All artifacts |

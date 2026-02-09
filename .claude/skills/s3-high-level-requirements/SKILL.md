---
name: s3-high-level-requirements
description: "Use after a Feasibility Assessment (S2) is approved and before solution architecture (S4). Also re-invoke after S4 (Solution Architecture) and after S5 (Threat Modelling) to refine requirements with new findings. Triggers include approved feasibility assessments, architecture feedback, threat model findings, or when someone asks 'what do we need to build?' or 'what are the requirements?'."
---

# S3 — High Level Requirements

## Overview

Decompose the Concept Brief and Feasibility Assessment into structured, traceable high-level requirements grouped by business capability area. Each group is prioritised using MoSCoW + Value + Complexity/Risk dimensions.

This produces **high-level requirements** — not epics or stories. Capability groupings feed S7 (Jira Scaffolding) for story decomposition. S3 is **re-invoked after S4 and S5** to refine requirements as architecture and threat modelling findings emerge.

## Versioning

S3 produces versioned outputs through the chain:

| Version | Trigger | Additional Input |
|---------|---------|-----------------|
| **v1** | After S2 (Feasibility) approved | S1 Concept Brief + S2 Feasibility |
| **v2** | After S4 (Solution Architecture) | + S4 architecture findings, ADRs, technical constraints |
| **v3** | After S5 (Threat Modelling) | + S5 security requirements, threat mitigations |

## Entry

### First invocation (v1)
1. Locate S1 Concept Brief in `docs/concept-briefs/` and S2 Feasibility Assessment in `docs/feasibility/`, or use paths from `$ARGUMENTS`
2. Read frontmatter context summaries from both
3. Summarise understanding: "Here's what I took from the Concept Brief and Feasibility Assessment — correct?"
4. If either missing: ask user to point to it or suggest running the prerequisite skill
5. Extract S1 scope items as the traceability baseline

### Re-invocation (v2, v3)
1. Locate the existing requirements document in `docs/requirements/`
2. Read the new upstream input (S4 architecture or S5 threat model)
3. Summarise what changed: "Here's what the [architecture/threat model] surfaced that affects requirements — correct?"
4. Present a **change proposal** — what to add, modify, or re-prioritise
5. User validates changes before they're applied
6. Preserve existing requirement IDs — modified requirements keep their ID with a revision note
7. New requirements get new IDs and are flagged as additive with their source (S4 or S5)

**On re-invocation, do NOT re-run the full process.** Focus on the delta — what changed, what's new, what needs re-prioritisation.

## Process (First Invocation)

### Phase 1 — Capability Grouping

Propose capability groupings based on S1 scope items. User validates/adjusts. These groups become the structure for requirements and natural epic candidates for S7.

### Phase 2 — Requirements Extraction

For each capability group, extract requirements across six types. **Adaptive** — only include types where requirements surface, flag skipped types with rationale.

| Type | What to Capture |
|------|----------------|
| Functional | Business rules, user interactions, processing logic. Capture known edge cases/error scenarios. |
| Non-Functional | Performance, availability, scalability, usability targets |
| Data | Entities, ownership, quality, retention, migration, sovereignty |
| Integration | Systems, data flow direction, protocols, frequency |
| Compliance | Regulatory obligations, audit, data protection, industry standards |
| Accessibility | WCAG targets, assistive technology, inclusive design |

**Rules:**
- One capability group at a time
- Propose requirements for user to validate — don't ask user to write them
- Surface S2 constraints/risks as NFR or integration candidates
- Each requirement gets a unique ID (REQ-001, REQ-002, etc.)
- For functional requirements, capture known edge cases and error scenarios (optional column — S7 will prompt for additional edge cases during story elaboration)

### Phase 3 — Prioritisation

For each requirement group, assign three dimensions:

| Dimension | Scale | Purpose |
|-----------|-------|---------|
| **MoSCoW** | Must / Should / Could / Won't | Scope negotiation |
| **Value** | High / Medium / Low | Business benefit |
| **Complexity/Risk** | High / Medium / Low | Delivery difficulty |

Propose prioritisation, user validates. Flag natural tensions — "Must / High Value / High Complexity" needs early planning with risk mitigation.

### Phase 4 — Traceability

Build traceability matrix linking S1 scope items to requirements.

**Two checks:**
1. **Coverage** — every S1 scope item must map to at least one requirement. Flag gaps for user resolution.
2. **Additive requirements** — requirements not traced to any S1 scope item are flagged as new scope. Each needs rationale and source (S1 decomposition, S4 architecture, or S5 threat model). User decides: add to scope or defer.

### Phase 5 — Context Discovery (MCP Checkpoint)

Same pattern as S1/S2. Check for Confluence/Jira/GitHub tools.

**If available:** Propose search plan, wait for confirmation, execute, enrich.
**If not available:** Skip silently.

### Phase 6 — Document Construction & Review

Draft using template in [requirements-template.md](requirements-template.md).

1. Draft each section (200-300 words), validate with user
2. Present complete document for final review
3. On approval: write to `docs/requirements/YYYY-MM-DD-<topic>-requirements.md` with `status: approved`
4. If Confluence MCP available: offer to publish
5. Git handling: check repo, ask to commit, check for git skills, never auto-commit
6. Present handoff (varies by version):

**v1 handoff:**
```
High Level Requirements v1 approved and saved.

Next step: S4 — Solution Architecture
S4 will design against these requirements. After S4,
re-invoke S3 to refine requirements with architecture findings.
```

**v2 handoff:**
```
High Level Requirements v2 approved and saved.
Updated with S4 (Solution Architecture) findings.

Next step: S5 — Threat Modelling
After S5, re-invoke S3 to refine requirements with
threat model findings.
```

**v3 handoff:**
```
High Level Requirements v3 (final) approved and saved.
Updated with S5 (Threat Modelling) findings.

Next step: S7 — Jira Project Scaffolding
S7 will decompose these requirements into epics and stories,
informed by S4 architecture and S5 threat model.
```

## What S3 Does NOT Do

- Trigger downstream skills automatically — human decides
- Create epics, user stories, or acceptance criteria — that's S7
- Make architecture or design decisions — that's S4
- Create or modify Jira issues — read-only
- Auto-commit to git

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Writing epics/stories instead of requirements | High-level requirements only — S7 handles decomposition |
| Full re-run on re-invocation | Focus on the delta — what changed, what's new, what needs re-prioritisation |
| Losing traceability to S1 scope | Every scope item must map to at least one requirement. Gaps are visible. |
| Unacknowledged scope creep | Additive requirements flagged with source (S1/S4/S5) — user decides to include or defer |
| Same priority for everything | Force differentiation — MoSCoW + Value + Complexity gives three dimensions |
| Proposing solutions in requirements | Requirements state WHAT, not HOW. Solution design is S4. |
| Changing requirement IDs on re-invocation | Preserve IDs — modified requirements keep their ID with a revision note |

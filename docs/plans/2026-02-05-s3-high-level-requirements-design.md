# S3 — High Level Requirements: Skill Design

**Date:** 2026-02-05
**Status:** Draft
**Skill Type:** Project-level, interactive conversational
**Position in Chain:** Third skill — receives S1 Concept Brief + S2 Feasibility Assessment, feeds S4 and S5

---

## Purpose

Decompose the Concept Brief and Feasibility Assessment into structured, traceable high-level requirements grouped by business capability area. Requirements are prioritised using MoSCoW + Value + Complexity/Risk dimensions.

S3 produces **high-level requirements** — not epics or stories. Capability groupings naturally feed S4 (Jira Scaffolding) for story decomposition. S3 has a bidirectional relationship with S5 (Solution Architecture) — requirements may be refined as architecture decisions emerge.

---

## Inputs

- S1 Concept Brief at `docs/concept-briefs/YYYY-MM-DD-<topic>.md`
- S2 Feasibility Assessment at `docs/feasibility/YYYY-MM-DD-<topic>-feasibility.md`
- Reads YAML frontmatter from both as compressed context summaries

---

## Outputs

### Primary: High Level Requirements Specification
- Single document: `docs/requirements/YYYY-MM-DD-<topic>-requirements.md`
- YAML frontmatter doubles as Context Summary consumed by S4 and S5
- Contains: requirement groups by capability area, prioritisation, traceability matrix, additive requirements callout
- Optionally published to Confluence if MCP server is available

### Handoff
- S4 (Jira Project Scaffolding) reads frontmatter + requirement groups for epic/story decomposition
- S5 (Solution Architecture) reads frontmatter + requirements for design — bidirectional, S5 may feed refinements back to S3
- S3 does not automatically trigger S4 or S5 — the human decides when to proceed

---

## Conversation Flow

### Phase 1 — Intake & Orientation

1. Locate and read the S1 Concept Brief and S2 Feasibility Assessment
2. Summarise understanding: "Here's what I took from the Concept Brief and Feasibility Assessment — correct?"
3. If either document is missing: ask user to point to it or suggest running the prerequisite skill
4. Extract the S1 scope items — these become the traceability baseline

### Phase 2 — Requirements Extraction

Decompose the initiative into requirement groups by business capability area. For each group, extract requirements across six types (adaptive — only include where requirements surface):

| Requirement Type | What to Capture |
|-----------------|-----------------|
| Functional | What the system must do — business rules, user interactions, processing logic |
| Non-Functional | Performance, availability, scalability, usability, maintainability targets |
| Data | Data entities, ownership, quality, retention, migration, sovereignty |
| Integration | Systems to connect with, direction of data flow, protocols, frequency |
| Compliance | Regulatory obligations, audit requirements, data protection, industry standards |
| Accessibility | WCAG targets, assistive technology support, inclusive design constraints |

**Process:**
- Propose capability groupings based on the Concept Brief scope items
- User validates/adjusts the grouping
- For each group, propose requirements across applicable types — one group at a time
- User refines wording, adds missing requirements, negotiates priorities
- Skip requirement types that don't apply to a group — flag skipped types with rationale

**Questioning rules:**
- One capability group at a time
- Propose requirements for the user to validate, don't ask user to write them
- If S2 flagged specific technical constraints or risks, surface them as NFR or integration candidates
- Adapt to what upstream documents already cover

### Phase 3 — Prioritisation

For each requirement group, assign three dimensions:

| Dimension | Scale | Purpose |
|-----------|-------|---------|
| **MoSCoW** | Must / Should / Could / Won't | Scope negotiation — what's essential vs deferrable |
| **Value** | High / Medium / Low | Business benefit — how much does this matter |
| **Complexity/Risk** | High / Medium / Low | Delivery difficulty — how hard is this to build |

- Propose prioritisation for each group, user validates/adjusts
- Flag natural tension: "Must / High Value / High Complexity" groups need early planning with risk mitigation
- "Could / Low Value / Low Complexity" groups are quick wins if capacity exists

### Phase 4 — Traceability

Build a traceability matrix linking S1 scope items to requirements:

**Coverage check:** Every S1 scope item must map to at least one requirement.
- If a scope item has no requirements: flag as a gap needing attention
- Present gaps to user for resolution

**Additive requirements:** Requirements that don't trace back to any S1 scope item are flagged as additive.
- These represent new scope surfaced during requirements extraction
- Make scope creep visible — each additive requirement needs rationale and stakeholder acknowledgement
- User decides: add to scope (update S1) or defer

### Phase 5 — Context Discovery (MCP Checkpoint)

Same pattern as S1/S2:
1. Propose targeted searches based on requirements findings
2. Present search plan to user for confirmation
3. User confirms, refines, or skips
4. Execute confirmed searches, present results
5. If MCP not available: skip silently

### Phase 6 — Document Construction & Review

1. Draft each section iteratively (200-300 words per section)
2. Present to user: "Does this capture it correctly?"
3. Revise based on feedback before moving to next section
4. Present complete document for final review
5. On approval: write to `docs/requirements/YYYY-MM-DD-<topic>-requirements.md` with `status: approved`
6. If Confluence MCP available: offer to publish as page with labels
7. Git handling: same pattern as S1/S2
8. Present handoff summary pointing to S4 and S5

---

## Document Structure

```markdown
---
type: high-level-requirements
status: draft | review | approved
created: YYYY-MM-DD
concept_brief: [path to S1 output]
feasibility: [path to S2 output]
# --- Context Summary (consumed by S4 and S5) ---
requirement_group_count: [number]
total_requirements: [number]
must_have_groups: [count]
should_have_groups: [count]
could_have_groups: [count]
wont_have_groups: [count]
high_complexity_groups: [list of group names]
scope_gaps: [count of unmapped S1 scope items]
additive_requirements: [count of requirements beyond S1 scope]
---

# High Level Requirements: [Title]

## Traceability Matrix

| S1 Scope Item | Requirement Group | Requirements | Coverage |
|---------------|-------------------|-------------|----------|
| [scope item] | [capability group] | REQ-001, REQ-004 | Covered |
| [scope item] | — | — | Gap |

### Additive Requirements
| Requirement | Group | Rationale | Scope Impact |
|-------------|-------|-----------|-------------|
| REQ-012 | [group] | [why this surfaced] | New scope — needs stakeholder approval |

## Requirement Groups

### [Capability Group Name]

**Priority:** Must / Should / Could / Won't
**Value:** High / Medium / Low
**Complexity/Risk:** High / Medium / Low

#### Functional Requirements
| ID | Requirement | Rationale |
|----|------------|-----------|
| REQ-001 | [requirement statement] | [why needed] |

#### Non-Functional Requirements
| ID | Requirement | Target | Rationale |
|----|------------|--------|-----------|
| REQ-002 | [requirement] | [measurable target] | [why] |

#### Data Requirements
| ID | Requirement | Rationale |
|----|------------|-----------|
| REQ-003 | [requirement] | [why] |

#### Integration Requirements
| ID | Requirement | System | Direction | Rationale |
|----|------------|--------|-----------|-----------|
| REQ-004 | [requirement] | [system name] | In/Out/Bidirectional | [why] |

#### Compliance Requirements
| ID | Requirement | Framework/Regulation | Rationale |
|----|------------|---------------------|-----------|
| REQ-005 | [requirement] | [reference] | [why] |

#### Accessibility Requirements
| ID | Requirement | WCAG Level | Rationale |
|----|------------|-----------|-----------|
| REQ-006 | [requirement] | A/AA/AAA | [why] |

[Repeat for each capability group — omit requirement type sections that don't apply, with rationale]

### Skipped Requirement Types
| Capability Group | Skipped Type | Rationale |
|-----------------|-------------|-----------|
| [group] | Compliance | No regulatory obligations identified for this capability |

## Prioritisation Summary

| Capability Group | MoSCoW | Value | Complexity/Risk |
|-----------------|--------|-------|-----------------|
| [group] | Must | High | High |
| [group] | Should | Medium | Low |

## Open Questions
- [ ] [Unresolved items needing stakeholder input]

## Source Material
References to Concept Brief, Feasibility Assessment, and MCP findings.
```

---

## MCP Integration

Same pattern as S1/S2 — all optional, graceful degradation.

| Server | Access | Purpose |
|--------|--------|---------|
| Confluence Cloud | Read + Write | Read: search for existing requirements, standards, policies. Write: publish approved requirements |
| Jira Cloud | Read only | Search for related requirements in existing projects, check for overlap |
| GitHub | Read only | Search for existing system documentation to inform integration/data requirements |

---

## Bidirectional Relationship with S5

S3 and S5 (Solution Architecture) have a feedback loop:
- S3 feeds requirements to S5 for architecture design
- S5 may surface new requirements or refine existing ones during design
- When S5 feeds back, S3 should be re-invoked to update the requirements document
- Traceability matrix tracks which requirements were added or modified via S5 feedback

---

## What S3 Does NOT Do

- Trigger S4 or S5 automatically — human decides
- Create epics or user stories — that's S4
- Make architecture or design decisions — that's S5
- Create or modify Jira issues — read-only
- Produce detailed acceptance criteria or test cases — that's S4 at story level
- Auto-commit to git

---

## Architectural Principles Applied

| Principle | How S3 Applies It |
|-----------|-------------------|
| Dual Output Strategy | Full requirements spec (markdown) + compressed Context Summary (frontmatter) |
| Confluence as Persistent Memory | Publishes to Confluence for cross-team review |
| Interactive Skills Brainstorm | Skill proposes requirement structure, human refines and negotiates priorities |
| Bidirectional Iteration | S3 ↔ S5 feedback loop without losing traceability |
| Industry Frameworks | BABOK, IREB requirement types as guardrails for completeness |

---

## Downstream Handoff

| Receiving Skill | What It Gets | From Where |
|-----------------|--------------|------------|
| S4 — Jira Project Scaffolding | Requirement groups (natural epic candidates), prioritisation, traceability | `docs/requirements/YYYY-MM-DD-<topic>-requirements.md` |
| S5 — Solution Architecture | Requirements by type for design decisions, NFRs for architecture constraints | Same file — bidirectional |

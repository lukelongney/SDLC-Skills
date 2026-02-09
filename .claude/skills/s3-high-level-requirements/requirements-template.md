# High Level Requirements Template

Use this template for the output file at `docs/requirements/YYYY-MM-DD-<topic>-requirements.md`.

The YAML frontmatter doubles as the **Context Summary** consumed by S4 and S5.

```markdown
---
type: high-level-requirements
status: draft | review | approved
created: YYYY-MM-DD
version: v1 | v2 | v3
version_history:
  v1: YYYY-MM-DD — Initial requirements from S1 + S2
  v2: YYYY-MM-DD — Refined with S4 architecture findings (if applicable)
  v3: YYYY-MM-DD — Refined with S5 threat model findings (if applicable)
concept_brief: [path to S1 output]
feasibility: [path to S2 output]
solution_architecture: [path to S4 output, if v2+]
threat_model: [path to S5 output, if v3]
# --- Context Summary (consumed by S4, S5, S6, and S7) ---
requirement_group_count: [number]
total_requirements: [number]
must_have_groups: [count]
should_have_groups: [count]
could_have_groups: [count]
wont_have_groups: [count]
high_complexity_groups: [list of group names]
scope_gaps: [count of unmapped S1 scope items]
additive_requirements: [count of requirements beyond S1 scope]
additive_sources: [S1 | S4 | S5 — where additive reqs came from]
---

# High Level Requirements: [Title]

## Version History
| Version | Date | Trigger | Changes |
|---------|------|---------|---------|
| v1 | YYYY-MM-DD | S2 approved | Initial requirements |
| v2 | YYYY-MM-DD | S4 complete | [summary of changes from architecture] |
| v3 | YYYY-MM-DD | S5 complete | [summary of changes from threat model] |

## Traceability Matrix

| S1 Scope Item | Requirement Group | Requirements | Coverage |
|---------------|-------------------|-------------|----------|
| [scope item] | [capability group] | REQ-001, REQ-004 | Covered |
| [scope item] | — | — | Gap |

### Additive Requirements
| Requirement | Group | Source | Rationale | Scope Impact |
|-------------|-------|--------|-----------|-------------|
| REQ-012 | [group] | S1 / S4 / S5 | [why this surfaced] | New scope — needs stakeholder approval |

## Requirement Groups

### [Capability Group Name]

**Priority:** Must / Should / Could / Won't
**Value:** High / Medium / Low
**Complexity/Risk:** High / Medium / Low

#### Functional Requirements
| ID | Requirement | Edge Cases | Rationale |
|----|------------|------------|-----------|
| REQ-001 | [requirement statement] | [known edge cases/error scenarios, if any] | [why needed] |

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

[Repeat for each capability group — omit requirement type sections that don't apply]

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

## Requirement Types Reference

Only include types where requirements surface. Flag skipped types with rationale.

| Type | What to Capture |
|------|----------------|
| **Functional** | What the system must do — business rules, user interactions, processing logic. Include known edge cases/error scenarios in optional column. |
| **Non-Functional** | Performance, availability, scalability, usability, maintainability targets |
| **Data** | Data entities, ownership, quality, retention, migration, sovereignty |
| **Integration** | Systems to connect, data flow direction, protocols, frequency |
| **Compliance** | Regulatory obligations, audit requirements, data protection, industry standards |
| **Accessibility** | WCAG targets, assistive technology support, inclusive design constraints |

## Prioritisation Dimensions

Each requirement group gets three tags:

| Dimension | Scale | Purpose |
|-----------|-------|---------|
| **MoSCoW** | Must / Should / Could / Won't | Scope negotiation |
| **Value** | High / Medium / Low | Business benefit |
| **Complexity/Risk** | High / Medium / Low | Delivery difficulty |

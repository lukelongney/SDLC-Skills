# Concept Brief Template

Use this template for the output file at `docs/concept-briefs/YYYY-MM-DD-<topic>.md`.

The YAML frontmatter doubles as the **Context Summary** consumed by S2 — Feasibility & Impact Assessment.

```markdown
---
type: concept-brief
status: draft | review | approved
created: YYYY-MM-DD
author: [name]
stakeholders: [list]
# --- Context Summary (consumed by S2) ---
problem: "One-sentence problem statement"
opportunity: "One-sentence opportunity/value proposition"
scope: [in-scope business domains/capabilities]
out_of_scope: [explicitly excluded items]
affected_business_areas: [divisions, teams, business functions]
affected_systems: [system names at business level]
risk_flags: [pii, customer-facing, regulatory, cross-divisional, etc.]
estimated_complexity: high | medium | low
confidence: high | medium | low
open_questions_count: [number]
source_artifacts:
  confluence: [page IDs or URLs pulled in]
  jira: [issue keys referenced]
---

# Concept Brief: [Title]

## Problem / Opportunity
What is the problem or opportunity? Why does it matter? Why now?
What is the current state? What is the desired future state?

## Benefits
| Benefit | Type | Measurement |
|---------|------|-------------|
| [outcome] | Revenue / Cost / Risk / Efficiency / Compliance | [how measured] |

## Scope
### In Scope
- [Business capability / domain area]

### Out of Scope
- [Explicitly excluded and why]

## Business Areas & Systems Impacted
| Business Area | System/Platform | Nature of Impact |
|---------------|-----------------|------------------|
| [division/team] | [system name] | New / Changed / Retired |

## Risks
| Risk | Category | Likelihood | Impact | Mitigation |
|------|----------|------------|--------|------------|
| [risk] | Delivery / Benefit Realisation / Organisational / Dependency / Reputational | H/M/L | H/M/L | [approach] |

### Risk Categories
- **Delivery**: Schedule, resourcing, technical complexity, vendor dependency
- **Benefit Realisation**: Adoption failure, benefits not measurable, market shift
- **Organisational**: Change fatigue, competing priorities, skills gap, stakeholder alignment
- **Dependency**: Upstream/downstream system changes, third-party timelines
- **Reputational**: Customer impact, regulatory exposure, public-facing failure

## Stakeholders
| Role | Name/Team | Interest |
|------|-----------|----------|
| Sponsor | | Funding and strategic alignment |
| Business Owner | | Requirements and acceptance |

## Open Questions
- [ ] [Unresolved item needing stakeholder input]

## Source Material
References to existing documentation, strategies, or prior work consulted.
```

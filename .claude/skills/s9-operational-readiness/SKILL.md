# S9 — Operational Readiness & Handoff

Consolidate the design phase into a handoff package for delivery teams.

## Trigger

Invoke after S8 Security Assessment is complete, as the final skill in the chain.

```
/s9-operational-readiness
```

## What This Skill Does

1. Reads all upstream artifacts (S1-S8)
2. Extracts highlights from each into consolidated view
3. Assesses change impact (technical + organizational)
4. Checks operational readiness indicators
5. Produces audience-specific handoff document
6. Optionally creates Confluence-ready version

## Mode

**Agentic** — runs autonomously. No user interaction during assessment. User reviews final output.

## Inputs Required

All upstream artifacts:
- S1 Concept Brief at `docs/concept-briefs/`
- S2 Feasibility at `docs/feasibility/`
- S3 Requirements at `docs/requirements/`
- S4 Architecture at `docs/architecture/`
- S5 Threat Model at `docs/threat-models/`
- S6 Validation at `docs/validation/`
- S7 Jira Scaffolding at `docs/jira/`
- S8 Security Assessment at `docs/security/`

## Outputs

- `docs/handoff/YYYY-MM-DD-<topic>-handoff.md` — primary handoff document
- `docs/handoff/YYYY-MM-DD-<topic>-handoff-confluence.md` — Confluence wiki markup version

## Not a Gate

S9 produces **readiness indicators**, not a blocking verdict. Gaps inform delivery planning; they don't prevent proceeding.

| Status | Meaning |
|--------|---------|
| Complete | Fully designed in artifacts |
| Partial | Mentioned but not fully specified |
| Gap | Not addressed — delivery should plan for this |
| N/A | Not applicable to this project |

## Change Impact Rating

| Rating | Criteria |
|--------|----------|
| **Low** | Single team, minimal integration, no process change |
| **Medium** | Multiple teams, some integration, limited process change |
| **High** | Cross-functional, significant integration, process/support changes |

## Audience Sections

The handoff document includes sections for:

| Audience | Focus |
|----------|-------|
| Executive | Problem, viability, impact, key risks, ROM |
| Project Manager | Scope, epics/stories, dependencies, conditions |
| Technical Lead | Architecture, ADRs, integrations, tech stack |
| Ops/SRE | Infrastructure, monitoring, deployment, gaps |
| Support | Business context, support model, escalations, KB needs |

## Operational Readiness Areas

| Area | What S9 Checks |
|------|----------------|
| Monitoring | Strategy designed, metrics identified |
| Alerting | Conditions defined, thresholds specified |
| Logging | Approach designed, retention defined |
| Incident Response | Runbook approach, escalation designed |
| Rollback | Procedure designed, recovery approach |
| Support Model | Tiers defined, L1/L2/L3 responsibilities |
| Escalation Paths | Matrix identified, contact points |
| Knowledge Base | KB articles needed identified |
| SLA Implications | Targets defined, measurement approach |

## Workflow

1. **Locate artifacts** — Find S1-S8 documents
2. **Extract highlights** — Key information from each
3. **Assess change impact** — Technical and organizational
4. **Check operational readiness** — Review for ops concerns
5. **Compile handoff** — Audience-specific sections
6. **Generate Confluence version** — Wiki markup output
7. **Present summary** — Completion message with paths

## Completion Message

```
Operational Readiness & Handoff complete.

Change Impact: Medium
Readiness: 6/9 areas complete, 3 gaps identified

Documents saved:
- docs/handoff/YYYY-MM-DD-<topic>-handoff.md
- docs/handoff/YYYY-MM-DD-<topic>-handoff-confluence.md

This completes the design phase. Delivery team can now:
1. Review handoff document
2. Import Confluence version to wiki
3. Address identified gaps during sprint 0
4. Begin implementation from S7 Jira scaffolding
```

## What S9 Does NOT Do

- Block delivery (indicators inform, don't gate)
- Verify operational tooling exists
- Create Jira tickets
- Reassess security (summarizes S5/S8)
- Produce project plan

## Reference Files

- `handoff-template.md` — markdown output structure
- `handoff-confluence-template.md` — Confluence wiki markup version

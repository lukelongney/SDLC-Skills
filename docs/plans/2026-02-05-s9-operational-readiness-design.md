# S9 — Operational Readiness & Handoff: Skill Design

**Date:** 2026-02-05
**Status:** Draft
**Skill Type:** Project-level, agentic (autonomous)
**Position in Chain:** Ninth and final skill — receives all artifacts (S1-S8)

---

## Purpose

Consolidate the complete design phase into a handoff package for delivery. Assesses operational readiness of the design, produces change impact assessment, and provides audience-specific summaries for stakeholders, project managers, technical leads, and support teams.

S9 is **not a gate** — it informs delivery rather than blocking. Readiness indicators highlight gaps; delivery decides how to proceed.

### Key Characteristics

| Aspect | S9 Approach |
|--------|-------------|
| Mode | Agentic (autonomous) |
| Role | Consolidator and assessor |
| Output | Handoff package with change impact |
| Verdict | Soft readiness indicators (not blocking) |
| Audience | Multiple (exec, PM, tech, ops, support) |

---

## Inputs

S9 reads all upstream artifacts:

| Source | What S9 Extracts |
|--------|------------------|
| S1 Concept Brief | Problem statement, scope, business areas affected |
| S2 Feasibility | ROM estimate, key risks, go/no-go conditions |
| S3 Requirements | Capability summary, requirement count, priority breakdown |
| S4 Architecture | Architecture style, key components, integration count, ADR summary |
| S5 Threat Model | Threat count, critical/high threats, security controls |
| S6 Validation | Design validation verdict, any conditions |
| S7 Jira Scaffolding | Epic count, story count, technical enablers |
| S8 Security Assessment | Security verdict, conditions, finding summary |

### Consolidation Approach

S9 pulls **highlights only** — enough context to understand scope and risk without reading 8 documents. Each section links to the source artifact for details.

---

## Outputs

### Primary: Handoff Document
- Single document: `docs/handoff/YYYY-MM-DD-<topic>-handoff.md`
- YAML frontmatter with key metrics
- Audience-specific sections

### Secondary: Confluence-Ready Version
- Wiki markup version: `docs/handoff/YYYY-MM-DD-<topic>-handoff-confluence.md`
- Uses Confluence macros: expand, status, panel, warning, info
- Ready for direct import via wiki markup macro or REST API

### Content Structure

1. Executive Summary (sponsors/stakeholders)
2. Delivery Overview (project managers)
3. Technical Handoff (dev leads/architects)
4. Operational Handoff (ops/SRE teams)
5. Support Handoff (service desk/L2)
6. Change Impact Assessment
7. Operational Readiness Indicators
8. Conditions & Gaps
9. Artifact Links

---

## Change Impact Assessment

### Technical Impact

Derived from S4 architecture and S7 Jira scaffolding:

| Area | Assessment |
|------|------------|
| Systems affected | List of systems being modified or integrated |
| New components | Components being introduced |
| Data migration | Data movement or transformation required |
| Integration changes | New or modified integrations |
| Infrastructure | New infrastructure or changes to existing |

### Organizational Impact

Derived from S1 scope and S3 requirements:

| Area | Assessment |
|------|------------|
| Teams affected | Development, ops, support, business teams impacted |
| Training needs | Skills or knowledge gaps to address |
| Process changes | Business or operational process modifications |
| Support model | Changes to support tiers, escalation, or SLAs |
| Communication | Stakeholder groups requiring change communication |

### Impact Rating

| Rating | Criteria |
|--------|----------|
| **Low** | Single team, minimal integration, no process change |
| **Medium** | Multiple teams, some integration, limited process change |
| **High** | Cross-functional, significant integration, process/support changes |

---

## Operational Readiness Indicators

S9 assesses whether the design addresses key operational concerns. These are **indicators, not gates**.

### Readiness Areas

| Area | What S9 Checks | Source |
|------|----------------|--------|
| Monitoring | Monitoring strategy designed? Metrics identified? | S4 Infrastructure |
| Alerting | Alert conditions defined? Thresholds specified? | S4 Infrastructure |
| Logging | Logging approach designed? Retention defined? | S4 Infrastructure, S5 Detection |
| Incident Response | Runbook approach identified? Escalation designed? | S4 Deployment |
| Rollback | Rollback procedure designed? Recovery approach? | S4 Deployment |
| Support Model | Support tiers defined? L1/L2/L3 responsibilities? | S3 NFRs, S4 |
| Escalation Paths | Escalation matrix identified? Contact points? | Inferred from S4 |
| Knowledge Base | KB articles needed identified? | Inferred from S3 |
| SLA Implications | SLA targets defined? Measurement approach? | S3 NFRs |

### Readiness Status

| Status | Meaning |
|--------|---------|
| **Complete** | Fully designed in artifacts |
| **Partial** | Mentioned but not fully specified |
| **Gap** | Not addressed in design artifacts |
| **N/A** | Not applicable to this project |

---

## Audience-Specific Sections

### Executive Summary (Sponsors/Stakeholders)
- What problem are we solving? (from S1)
- Is it viable? (S2 recommendation)
- What's the change impact? (High/Medium/Low)
- What are the key risks? (top 3-5 from S2, S4, S5)
- What's the estimated effort? (ROM from S2)

### Delivery Overview (Project Managers)
- Scope summary with in/out boundaries
- Epic and story counts from S7
- Dependency list (external teams, systems)
- Key milestones implied by architecture
- Conditions carried forward from S6, S8

### Technical Handoff (Dev Leads/Architects)
- Architecture summary with key decisions
- ADR list with links
- Integration points and patterns
- Technology stack
- Technical risks and mitigations

### Operational Handoff (Ops/SRE Teams)
- Infrastructure overview
- Monitoring and alerting approach
- Deployment strategy
- Operational readiness gaps to address
- Detection coverage from S5/S8

### Support Handoff (Service Desk/L2)
- Business context (what users will see)
- Support model and tiers
- Escalation paths
- Known edge cases (from S3, S7)
- Training and KB needs

---

## Workflow

S9 is fully autonomous after invocation:

1. **Locate all artifacts** — Read S1 through S8 documents
2. **Extract highlights** — Pull key information from each
3. **Assess change impact** — Technical and organizational
4. **Check operational readiness** — Review design for ops concerns
5. **Compile handoff document** — Audience-specific sections
6. **Present to user** — Summary with link to full document

No user interaction required during assessment.

---

## What S9 Does NOT Do

- **Block delivery** — readiness indicators inform, don't gate
- **Verify operational tooling** — checks design, not implementation
- **Create Jira tickets** — that's S7's job
- **Reassess security** — summarizes S5/S8, doesn't re-evaluate
- **Produce project plan** — delivery owns planning
- **Auto-publish to Confluence** — offers option, user confirms

---

## MCP Integration

| Server | Access | Purpose |
|--------|--------|---------|
| Confluence Cloud | Read + Write | Read existing docs; Publish handoff document |
| Jira Cloud | Read only | Read epic/story counts from S7 |
| GitHub | Read only | Verify artifact locations |

---

## Completion Message

```
Operational Readiness & Handoff complete.

Change Impact: Medium
Readiness: 6/9 areas complete, 3 gaps identified

Handoff document saved to:
docs/handoff/YYYY-MM-DD-<topic>-handoff.md

This completes the design phase. Delivery team can now:
1. Review handoff document
2. Address identified gaps during sprint 0
3. Begin implementation from S7 Jira scaffolding
```

---

## Architectural Principles Applied

| Principle | How S9 Applies It |
|-----------|-------------------|
| Dual Output Strategy | Full handoff doc + compressed frontmatter |
| Agentic Skills Verify | Autonomous assessment and consolidation |
| Human Gates | Delivery decides next steps, S9 informs |
| Consolidation | Single document serves multiple audiences |
| Traceability | Links to all upstream artifacts |

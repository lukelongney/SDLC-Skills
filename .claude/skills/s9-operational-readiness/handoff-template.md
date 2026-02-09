# Handoff Document Template

Use this template for the output file at `docs/handoff/YYYY-MM-DD-<topic>-handoff.md`.

```markdown
---
type: operational-handoff
created: YYYY-MM-DD
project: [project name]
change_impact: low | medium | high
readiness_complete: X
readiness_partial: Y
readiness_gaps: Z
epic_count: X
story_count: Y
conditions_from_s6: [list]
conditions_from_s8: [list]
# --- Artifact References ---
concept_brief: [path to S1]
feasibility: [path to S2]
requirements: [path to S3]
architecture: [path to S4]
threat_model: [path to S5]
validation: [path to S6]
jira_scaffolding: [path to S7]
security_assessment: [path to S8]
---

# Operational Readiness & Handoff: [Project Name]

**Date:** YYYY-MM-DD
**Change Impact:** Low | Medium | High
**Readiness:** X/9 areas complete

---

## Executive Summary

*For: Sponsors, Stakeholders*

### What Problem Are We Solving?
[2-3 sentences from S1 problem statement]

### Is It Viable?
[S2 recommendation: Go / Conditional Go with conditions]

### Change Impact
**Rating:** Medium

| Dimension | Impact |
|-----------|--------|
| Technical | [X systems affected, Y integrations] |
| Organizational | [X teams affected, training required] |

### Key Risks
1. [Risk from S2/S4/S5] — [mitigation]
2. [Risk from S2/S4/S5] — [mitigation]
3. [Risk from S2/S4/S5] — [mitigation]

### Estimated Effort
[ROM from S2: X-Y person-days/weeks]

---

## Delivery Overview

*For: Project Managers*

### Scope Summary

**In Scope:**
- [Item from S1]
- [Item from S1]

**Out of Scope:**
- [Item from S1]
- [Item from S1]

### Work Breakdown

| Metric | Count |
|--------|-------|
| Epics | X |
| User Stories | Y |
| Technical Enablers | Z |
| Security Stories | W |

### Dependencies

| Dependency | Type | Owner | Status |
|------------|------|-------|--------|
| [External system access] | External | [Team] | Pending |
| [Data from finance] | Data | [Team] | Confirmed |

### Conditions Carried Forward

**From S6 Design Validation:**
- [Condition 1]

**From S8 Security Assessment:**
- [Condition 1]
- [Condition 2]

---

## Technical Handoff

*For: Dev Leads, Architects*

### Architecture Summary
[2-3 sentences describing architecture style and approach from S4]

**Architecture Style:** [Microservices / Monolithic / Serverless / Hybrid]
**Primary Platform:** [Azure / AWS / Salesforce / etc.]

### Key Components

| Component | Responsibility |
|-----------|---------------|
| [Component 1] | [What it does] |
| [Component 2] | [What it does] |

### Architecture Decision Records

| ADR | Decision | Rationale |
|-----|----------|-----------|
| ADR-001 | [Decision] | [Why] |
| ADR-002 | [Decision] | [Why] |

*Full ADRs: [link to S4]*

### Integration Points

| System | Direction | Pattern |
|--------|-----------|---------|
| [System] | Inbound | REST API |
| [System] | Outbound | Event-driven |

### Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | [Tech] |
| Backend | [Tech] |
| Data | [Tech] |
| Infrastructure | [Tech] |

### Technical Risks

| Risk | Mitigation | Owner |
|------|------------|-------|
| [Risk from S4] | [Approach] | [Team] |

---

## Operational Handoff

*For: Ops, SRE Teams*

### Infrastructure Overview
[Summary from S4 infrastructure section]

### Monitoring & Alerting

| Aspect | Approach |
|--------|----------|
| Monitoring | [Tool/approach from S4] |
| Metrics | [Key metrics identified] |
| Alerting | [Alert conditions] |
| Dashboards | [Dashboard approach] |

### Deployment Strategy
[Blue-green / Canary / Rolling from S4]

### Operational Readiness

| Area | Status | Notes |
|------|--------|-------|
| Monitoring | Complete | Azure Monitor configured |
| Alerting | Partial | Conditions defined, thresholds TBD |
| Logging | Complete | Centralized in Log Analytics |
| Incident Response | Gap | Runbook approach not defined |
| Rollback | Complete | Blue-green enables instant rollback |
| Support Model | Partial | L2 defined, L1 handoff unclear |
| Escalation Paths | Gap | Not defined |
| Knowledge Base | Partial | Articles identified, not written |
| SLA Implications | Complete | 99.9% availability target |

### Gaps to Address in Delivery

1. **Incident Response:** Define runbook approach and templates
2. **Escalation Paths:** Document escalation matrix with contacts
3. **Alerting Thresholds:** Set specific threshold values

### Detection Coverage
[Summary from S5/S8 MITRE ATT&CK assessment]

---

## Support Handoff

*For: Service Desk, L2 Support*

### Business Context
[What users will experience — from S1/S3]

### Support Model

| Tier | Responsibility | Team |
|------|---------------|------|
| L1 | [First response, triage] | [Team] |
| L2 | [Technical resolution] | [Team] |
| L3 | [Engineering escalation] | [Team] |

### Escalation Paths
[To be defined — flagged as gap]

### Known Edge Cases
[From S3/S7 edge cases]

- [Edge case 1]: [Expected behavior]
- [Edge case 2]: [Expected behavior]

### Training Needs

| Audience | Training Required |
|----------|------------------|
| L1 Support | [Topic] |
| L2 Support | [Topic] |
| End Users | [Topic] |

### Knowledge Base Articles Needed

- [ ] [KB topic 1]
- [ ] [KB topic 2]
- [ ] [KB topic 3]

---

## Change Impact Assessment

### Technical Impact

| Area | Details |
|------|---------|
| Systems Affected | [List] |
| New Components | [List] |
| Data Migration | [Yes/No — details] |
| Integration Changes | [List] |
| Infrastructure Changes | [List] |

### Organizational Impact

| Area | Details |
|------|---------|
| Teams Affected | [List] |
| Training Needs | [Summary] |
| Process Changes | [Summary] |
| Support Model Changes | [Summary] |
| Communication Required | [Stakeholder groups] |

### Impact Rating: Medium

**Rationale:** [Why this rating — e.g., "Multiple teams affected, 2 new integrations, support model changes required"]

---

## Conditions & Open Items

### Conditions from Design Phase

| Source | Condition | Owner |
|--------|-----------|-------|
| S6 | [Condition] | [Who resolves] |
| S8 | [Condition] | [Who resolves] |

### Open Questions

- [ ] [Unresolved question from design]
- [ ] [Unresolved question from design]

---

## Artifact Links

| Artifact | Location |
|----------|----------|
| Concept Brief (S1) | [path] |
| Feasibility (S2) | [path] |
| Requirements (S3) | [path] |
| Architecture (S4) | [path] |
| Threat Model (S5) | [path] |
| Design Validation (S6) | [path] |
| Jira Scaffolding (S7) | [path] |
| Security Assessment (S8) | [path] |

---

## Next Steps for Delivery

1. Review this handoff document with delivery team
2. Address operational readiness gaps during sprint 0
3. Resolve conditions from S6/S8
4. Import Jira scaffolding (S7) or create from scaffold doc
5. Begin sprint 1 implementation
```

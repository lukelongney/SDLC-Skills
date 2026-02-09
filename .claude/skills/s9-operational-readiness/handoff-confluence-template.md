# Confluence Handoff Template

Use this template for the Confluence-ready output at `docs/handoff/YYYY-MM-DD-<topic>-handoff-confluence.md`.

This uses Confluence wiki markup with expand macros, status macros, and panels for a rich wiki experience.

---

```
h1. Operational Readiness & Handoff: [Project Name]

{status:colour=Blue|title=Change Impact: Medium}
{status:colour=Green|title=Readiness: 6/9 Complete}

*Date:* YYYY-MM-DD

----

h2. Executive Summary

{panel:title=For: Sponsors, Stakeholders|borderStyle=solid|borderColor=#ccc}

h3. What Problem Are We Solving?
[2-3 sentences from S1 problem statement]

h3. Is It Viable?
{status:colour=Green|title=Go} — [S2 recommendation summary]

h3. Change Impact

|| Dimension || Impact ||
| Technical | X systems affected, Y integrations |
| Organizational | X teams affected, training required |

h3. Key Risks
# [Risk 1] — [mitigation]
# [Risk 2] — [mitigation]
# [Risk 3] — [mitigation]

h3. Estimated Effort
[ROM from S2]

{panel}

----

h2. Delivery Overview

{panel:title=For: Project Managers|borderStyle=solid|borderColor=#ccc}

{expand:title=Scope Summary}
h4. In Scope
* [Item from S1]
* [Item from S1]

h4. Out of Scope
* [Item from S1]
* [Item from S1]
{expand}

h3. Work Breakdown

|| Metric || Count ||
| Epics | X |
| User Stories | Y |
| Technical Enablers | Z |
| Security Stories | W |

{expand:title=Dependencies}
|| Dependency || Type || Owner || Status ||
| [External system] | External | [Team] | {status:colour=Yellow|title=Pending} |
| [Data from finance] | Data | [Team] | {status:colour=Green|title=Confirmed} |
{expand}

{expand:title=Conditions Carried Forward}
h4. From S6 Design Validation
* [Condition 1]

h4. From S8 Security Assessment
* [Condition 1]
* [Condition 2]
{expand}

{panel}

----

h2. Technical Handoff

{panel:title=For: Dev Leads, Architects|borderStyle=solid|borderColor=#ccc}

h3. Architecture Summary
[2-3 sentences from S4]

*Architecture Style:* [Style]
*Primary Platform:* [Platform]

{expand:title=Key Components}
|| Component || Responsibility ||
| [Component 1] | [What it does] |
| [Component 2] | [What it does] |
{expand}

{expand:title=Architecture Decision Records}
|| ADR || Decision || Rationale ||
| ADR-001 | [Decision] | [Why] |
| ADR-002 | [Decision] | [Why] |

[Full ADRs|link to S4]
{expand}

{expand:title=Integration Points}
|| System || Direction || Pattern ||
| [System] | Inbound | REST API |
| [System] | Outbound | Event-driven |
{expand}

{expand:title=Technology Stack}
|| Layer || Technology ||
| Frontend | [Tech] |
| Backend | [Tech] |
| Data | [Tech] |
| Infrastructure | [Tech] |
{expand}

{panel}

----

h2. Operational Handoff

{panel:title=For: Ops, SRE Teams|borderStyle=solid|borderColor=#ccc}

h3. Infrastructure Overview
[Summary from S4]

{expand:title=Monitoring & Alerting}
|| Aspect || Approach ||
| Monitoring | [Tool/approach] |
| Metrics | [Key metrics] |
| Alerting | [Conditions] |
| Dashboards | [Approach] |
{expand}

h3. Deployment Strategy
[Blue-green / Canary / Rolling]

h3. Operational Readiness

|| Area || Status || Notes ||
| Monitoring | {status:colour=Green|title=Complete} | Azure Monitor configured |
| Alerting | {status:colour=Yellow|title=Partial} | Thresholds TBD |
| Logging | {status:colour=Green|title=Complete} | Centralized logging |
| Incident Response | {status:colour=Red|title=Gap} | Not defined |
| Rollback | {status:colour=Green|title=Complete} | Blue-green deployment |
| Support Model | {status:colour=Yellow|title=Partial} | L1 handoff unclear |
| Escalation Paths | {status:colour=Red|title=Gap} | Not defined |
| Knowledge Base | {status:colour=Yellow|title=Partial} | Articles identified |
| SLA Implications | {status:colour=Green|title=Complete} | 99.9% target |

{warning:title=Gaps to Address}
# *Incident Response:* Define runbook approach
# *Escalation Paths:* Document escalation matrix
# *Alerting Thresholds:* Set specific values
{warning}

{panel}

----

h2. Support Handoff

{panel:title=For: Service Desk, L2 Support|borderStyle=solid|borderColor=#ccc}

h3. Business Context
[What users will experience]

{expand:title=Support Model}
|| Tier || Responsibility || Team ||
| L1 | First response, triage | [Team] |
| L2 | Technical resolution | [Team] |
| L3 | Engineering escalation | [Team] |
{expand}

{expand:title=Known Edge Cases}
* *[Edge case 1]:* [Expected behavior]
* *[Edge case 2]:* [Expected behavior]
{expand}

{expand:title=Training Needs}
|| Audience || Training Required ||
| L1 Support | [Topic] |
| L2 Support | [Topic] |
| End Users | [Topic] |
{expand}

h3. Knowledge Base Articles Needed
{task-list}
* [ ] [KB topic 1]
* [ ] [KB topic 2]
* [ ] [KB topic 3]
{task-list}

{panel}

----

h2. Change Impact Assessment

{expand:title=Technical Impact}
|| Area || Details ||
| Systems Affected | [List] |
| New Components | [List] |
| Data Migration | [Yes/No — details] |
| Integration Changes | [List] |
| Infrastructure Changes | [List] |
{expand}

{expand:title=Organizational Impact}
|| Area || Details ||
| Teams Affected | [List] |
| Training Needs | [Summary] |
| Process Changes | [Summary] |
| Support Model Changes | [Summary] |
| Communication Required | [Groups] |
{expand}

h3. Impact Rating: {status:colour=Yellow|title=Medium}

*Rationale:* [Why this rating]

----

h2. Conditions & Open Items

{warning:title=Conditions from Design Phase}
|| Source || Condition || Owner ||
| S6 | [Condition] | [Who] |
| S8 | [Condition] | [Who] |
{warning}

h3. Open Questions
{task-list}
* [ ] [Unresolved question]
* [ ] [Unresolved question]
{task-list}

----

h2. Artifact Links

|| Artifact || Location ||
| Concept Brief (S1) | [path|link] |
| Feasibility (S2) | [path|link] |
| Requirements (S3) | [path|link] |
| Architecture (S4) | [path|link] |
| Threat Model (S5) | [path|link] |
| Design Validation (S6) | [path|link] |
| Jira Scaffolding (S7) | [path|link] |
| Security Assessment (S8) | [path|link] |

----

h2. Next Steps for Delivery

{info}
# Review this handoff document with delivery team
# Address operational readiness gaps during sprint 0
# Resolve conditions from S6/S8
# Import Jira scaffolding or create from scaffold doc
# Begin sprint 1 implementation
{info}
```

---

## How to Import to Confluence

### Method 1: Wiki Markup Macro
1. Create a new Confluence page
2. Type `/wiki` and select "Insert Wiki Markup"
3. Paste the content above
4. Save — Confluence renders the macros

### Method 2: Copy Section by Section
1. Create a new page
2. Copy each section and use Confluence's GUI:
   - Panel macro for audience sections
   - Expand macro for collapsible content
   - Status macro for colored badges
   - Warning/Info macros for callouts

### Method 3: REST API
```bash
curl -X POST \
  https://your-domain.atlassian.net/wiki/rest/api/content \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "page",
    "title": "Handoff: [Project Name]",
    "space": {"key": "YOUR_SPACE"},
    "body": {
      "storage": {
        "value": "<content>",
        "representation": "wiki"
      }
    }
  }'
```

## Confluence Macros Used

| Macro | Purpose |
|-------|---------|
| `{status}` | Colored status badges |
| `{panel}` | Bordered sections for audiences |
| `{expand}` | Collapsible content |
| `{warning}` | Yellow warning callouts |
| `{info}` | Blue info callouts |
| `{task-list}` | Checkbox task lists |

# Solution Architecture Template

Use this template for the output file at `docs/architecture/YYYY-MM-DD-<topic>-architecture.md`.

The YAML frontmatter doubles as the **Context Summary** consumed by S5, S6, and S7.

```markdown
---
type: solution-architecture
status: draft | review | approved
created: YYYY-MM-DD
concept_brief: [path to S1]
feasibility: [path to S2]
requirements: [path to S3 v1]
# --- Context Summary (consumed by S5, S6, and S7) ---
architecture_style: [monolithic, microservices, serverless, hybrid, etc.]
primary_platform: [Azure, Salesforce, .NET, etc.]
key_components: [list of major components]
integration_count: [number of external integrations]
adr_count: [number of ADRs]
risk_count: [number of technical risks]
security_approach: [summary]
data_stores: [list of data storage technologies]
deployment_model: [summary]
requirements_feedback: [list of findings for S3 v2]
---

# Solution Architecture: [Title]

**Version:** YYYY-MM-DD
**Status:** Draft | Review | Approved
**Owner:** [Name/Team]
**Requirements:** [Link to S3 requirements]

## Version History
| Version | Date | Author | Changes |
|---------|------|--------|---------|

## Executive Summary
2-3 paragraphs: what, why, key decisions, target state.

## Business Drivers & Constraints
### Business Drivers
From S1 Concept Brief and S2 Feasibility Assessment.

### Constraints
From S2 Feasibility + assumptions validation.

## Architecture Principles
| Principle | Rationale | Implications |
|-----------|-----------|--------------|

## System Context
[Mermaid C4 Context diagram]

## Component Architecture
[Mermaid component diagram]

## Data Architecture
### Data Model
[Mermaid ER diagram]

### Data Flows
[Mermaid data flow diagram]

### Data Governance
Classification, privacy, sovereignty, retention.

## Integration Architecture
### External Integrations
| System | Direction | Protocol | Purpose | Pattern |
|--------|-----------|----------|---------|---------|

### APIs
Design approach, versioning, documentation.

### Messaging
Async patterns, queues, events.
[Mermaid sequence diagram]

## Infrastructure Architecture
### Compute
### Networking
### Storage
[Mermaid deployment diagram]

## Security Architecture
### Identity & Access
### Data Protection
### Network Security

## Non-Functional Requirements Approach
| Requirement | Target | Approach | Measurement |
|-------------|--------|----------|-------------|

## Technology Stack
| Layer | Technology | Justification |
|-------|------------|---------------|

## Deployment Architecture
### Environments
| Environment | Purpose | Configuration |
|-------------|---------|---------------|

### CI/CD Pipeline
### Release Strategy

## Architecture Decision Records

### ADR-001: [Decision Title]
**Status:** Accepted | Superseded | Deprecated
**Context:** Why this decision was needed
**Decision:** What was decided
**Consequences:** Positive and negative outcomes
**Alternatives Considered:** Other options evaluated
**Requirements Addressed:** REQ-xxx

## Risk Register
| ID | Risk | Category | Probability | Impact | Mitigation | Owner |
|----|------|----------|-------------|--------|------------|-------|

## Trade-offs & Technical Debt
### Trade-offs Made
| Decision | Trade-off | Rationale |
|----------|-----------|-----------|

### Technical Debt Accepted
| Debt Item | Reason Accepted | Retirement Condition | Priority |
|-----------|-----------------|---------------------|----------|

## Requirements Feedback for S3 v2
| Finding | Type | Impact on Requirements |
|---------|------|----------------------|

## Open Questions
- [ ] [Unresolved items]

## Source Material
```

## Traceability Matrix Template

Separate file at `docs/traceability/YYYY-MM-DD-<topic>-traceability.md`.

```markdown
---
type: traceability-matrix
created: YYYY-MM-DD
concept_brief: [path to S1]
requirements: [path to S3]
architecture: [path to S4]
---

# Traceability Matrix: [Title]

## S1 Scope → S3 Requirements → S4 Design

| S1 Scope Item | S3 Requirement | S4 Component / Decision | ADR | Coverage |
|---------------|---------------|------------------------|-----|----------|
| [scope] | REQ-001 | [component] | ADR-001 | Covered |
| [scope] | REQ-005 | — | — | Gap |

## Coverage Summary
| Level | Total | Covered | Gaps |
|-------|-------|---------|------|
| S1 Scope → S3 Requirements | X | X | X |
| S3 Requirements → S4 Design | X | X | X |

## Gaps
| Item | Level | Issue | Resolution |
|------|-------|-------|------------|
| [scope/req] | S1→S3 / S3→S4 | [what's missing] | [action needed] |
```

This matrix is extended by S5 (threat model mappings) and S7 (Jira issue mappings).

## ADR Format (Nygard)

```markdown
### ADR-NNN: [Decision Title]
**Status:** Accepted | Superseded | Deprecated
**Context:** Why this decision was needed
**Decision:** What was decided
**Consequences:** Positive and negative outcomes
**Alternatives Considered:** Other options evaluated
**Requirements Addressed:** REQ-xxx
```

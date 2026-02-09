# S4 — Solution Architecture: Skill Design

**Date:** 2026-02-05
**Status:** Draft
**Skill Type:** Project-level, interactive conversational
**Position in Chain:** Fourth skill — receives S1 + S2 + S3 v1, feeds S3 v2 + S5 + S6

---

## Purpose

Deep collaborative solution design grounded in upstream business context and codebase analysis. Produces a solution design document (with ADRs and risk register) and a traceability matrix extending the chain from S1 scope → S3 requirements → S4 design decisions.

This is the **most judgment-heavy skill** in the chain. Extended back-and-forth with the architect is expected. The skill proposes architecture based on requirements and codebase analysis; the architect challenges patterns and iterates.

---

## Inputs

- S1 Concept Brief at `docs/concept-briefs/`
- S2 Feasibility Assessment at `docs/feasibility/`
- S3 v1 High Level Requirements at `docs/requirements/`
- Reads YAML frontmatter from all three as compressed context summaries
- Git codebase analysis (via MCP or direct file access)

---

## Outputs

### Primary: Solution Design Document
- Single document: `docs/architecture/YYYY-MM-DD-<topic>-architecture.md`
- YAML frontmatter as Context Summary consumed by S5 and S6
- Contains: executive summary, architecture principles, system context, component architecture, data architecture, integration architecture, infrastructure, security design, NFR approach, technology stack, deployment, ADRs, risk register, trade-offs, technical debt
- Optionally published to Confluence

### Secondary: Traceability Matrix
- Separate document: `docs/traceability/YYYY-MM-DD-<topic>-traceability.md`
- Extends the chain: S1 scope → S3 requirement → S4 design decision/component
- Consumed by S5, S6, S7 for validation and scaffolding

### Feedback to S3
- Architecture findings that affect requirements (new NFRs, changed integration needs, technical constraints)
- User advised to re-invoke S3 for v2 after S4 completes

---

## Conversation Flow

### Phase 1 — Intake & Orientation

1. Locate and read S1, S2, S3 documents
2. Summarise understanding: "Here's what I took from the upstream documents — correct?"
3. If any missing: ask user to point to them or suggest running prerequisite skills
4. Ask platform context (if not clear from upstream): Azure, Salesforce, .NET, legacy — which are in play?
5. Load relevant platform reference files

### Phase 2 — Smart Assumptions Validation

Pull what's already answered from upstream frontmatter and document content. Only present assumptions that aren't covered by S1, S2, or S3.

Present remaining assumptions in batches of 3-5 related items:

```
Assumptions — Infrastructure (please confirm or correct):
1. Primary region: Australia East, failover: Australia Southeast
2. Environment tiers: Dev, Test, UAT, Production
3. Azure AD for authentication across all components

These aren't covered in the upstream documents. Are they correct?
```

Focus on technical assumptions:
- Deployment model and environment strategy
- Scaling approach and performance targets
- Data partitioning and storage strategy
- Authentication and authorisation model
- Integration patterns (sync/async, API/event-driven)
- Infrastructure constraints

Wait for validation. Adjust and re-validate if needed.

### Phase 3 — Architecture Design (Iterative)

For each section of the design document:
1. Propose architecture based on requirements + codebase analysis + validated assumptions
2. Present with Mermaid diagrams where applicable
3. Present to user: "Does this capture the architecture correctly?"
4. Architect challenges patterns, proposes alternatives, iterates
5. Revise based on feedback before moving to next section

**Section order:**
1. Architecture Principles
2. System Context (C4 Context diagram)
3. Component Architecture (C4 Component diagram)
4. Data Architecture (data model, governance, flows)
5. Integration Architecture (APIs, messaging, external systems)
6. Infrastructure Architecture (compute, networking, storage)
7. Security Architecture (identity, data protection, network security)
8. Non-Functional Requirements Approach
9. Technology Stack
10. Deployment Architecture (environments, CI/CD, release strategy)
11. ADRs (captured throughout the design conversation)
12. Risk Register
13. Trade-offs & Technical Debt

**ADRs captured in-flight:** As design decisions are made during the conversation, capture them as ADRs in Nygard format. Don't defer ADR writing to the end.

### Phase 4 — Traceability Matrix

Build the traceability matrix mapping:

| S1 Scope Item | S3 Requirement | S4 Design Decision / Component | ADR | Coverage |
|---------------|---------------|-------------------------------|-----|----------|
| [scope] | REQ-001 | [component name] | ADR-001 | Covered |
| [scope] | REQ-005 | — | — | Gap |

**Checks:**
- Every S3 requirement should trace to at least one design decision/component
- Flag gaps for resolution
- Flag requirements that drove ADRs

### Phase 5 — Requirements Feedback

After design is complete, identify findings that affect requirements:
- New NFRs surfaced by architecture decisions
- Changed integration requirements based on design patterns
- Technical constraints that affect functional requirements
- Security requirements from security architecture section

Present as a summary: "These architecture findings should feed back to S3 for requirements v2."

### Phase 6 — Context Discovery (MCP Checkpoint)

Same pattern as S1-S3. Particularly useful for:
- Git: codebase analysis, existing patterns, dependency scanning
- Confluence: existing architecture docs, standards, reference architectures
- Jira: related technical debt, infrastructure tickets

### Phase 7 — Document Construction & Review

1. Compile all validated sections into complete document
2. Present complete document for final review
3. On approval: write design doc and traceability matrix
4. If Confluence MCP available: offer to publish
5. Git handling: same pattern as S1-S3
6. Present handoff:
   ```
   Solution Architecture approved and saved.

   Recommended next steps:
   1. Re-invoke S3 to produce requirements v2 (refined with
      architecture findings)
   2. Then proceed to S5 — Threat Modelling
   ```

---

## Document Structure

```markdown
---
type: solution-architecture
status: draft | review | approved
created: YYYY-MM-DD
concept_brief: [path to S1]
feasibility: [path to S2]
requirements: [path to S3 v1]
# --- Context Summary (consumed by S5 and S6) ---
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
| YYYY-MM-DD | Date | Name | Initial draft |

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
| [principle] | [why] | [what it means for design] |

## System Context
How solution fits in broader ecosystem. External actors, systems, boundaries.
[Mermaid C4 Context diagram]

## Component Architecture
Logical components, responsibilities, interactions.
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
| [system] | In/Out/Bi | REST/Event/File | [purpose] | Sync/Async |

### APIs
Design approach, versioning, documentation.

### Messaging
Async patterns, queues, events.
[Mermaid sequence diagram]

## Infrastructure Architecture
### Compute
Services, sizing, scaling approach.

### Networking
VNets, connectivity, DNS, load balancing.

### Storage
Blob, file, database services.
[Mermaid deployment diagram]

## Security Architecture
### Identity & Access
Authentication, authorisation, identity providers.

### Data Protection
Encryption at rest/transit, key management.

### Network Security
Firewalls, NSGs, private endpoints.

## Non-Functional Requirements Approach
| Requirement | Target | Approach | Measurement |
|-------------|--------|----------|-------------|
| [NFR from S3] | [target] | [how architecture addresses it] | [how to measure] |

## Technology Stack
| Layer | Technology | Justification |
|-------|------------|---------------|
| [layer] | [tech] | [why chosen] |

## Deployment Architecture
### Environments
| Environment | Purpose | Configuration |
|-------------|---------|---------------|
| Dev | Development | [config] |

### CI/CD Pipeline
Build, test, deploy process.

### Release Strategy
Deployment approach, rollback procedures.

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
| RISK-001 | [risk] | Technical / Vendor / Data / Integration | H/M/L | H/M/L | [approach] | [who] |

## Trade-offs & Technical Debt

### Trade-offs Made
| Decision | Trade-off | Rationale |
|----------|-----------|-----------|
| [decision] | [what was sacrificed] | [why] |

### Technical Debt Accepted
| Debt Item | Reason Accepted | Retirement Condition | Priority |
|-----------|-----------------|---------------------|----------|
| [item] | [why accepted] | [when to fix] | H/M/L |

## Requirements Feedback for S3 v2
| Finding | Type | Impact on Requirements |
|---------|------|----------------------|
| [finding] | New NFR / Changed Integration / Technical Constraint | [what needs updating in S3] |

## Open Questions
- [ ] [Unresolved items]

## Source Material
References to upstream documents, codebase analysis, and MCP findings.
```

---

## Platform Reference Files

Separate files loaded based on platform context:

- `azure.md` — Azure Well-Architected Framework, recommended services per layer, naming conventions, landing zone patterns
- `salesforce.md` — Salesforce architecture patterns, API limits, integration approaches, data model considerations
- `dotnet.md` — .NET application patterns, hosting models, modernisation approaches
- `legacy.md` — Legacy integration patterns, strangler fig, anti-corruption layers, data migration

---

## MCP Integration

| Server | Access | Purpose |
|--------|--------|---------|
| Confluence Cloud | Read + Write | Read: existing architecture docs, standards, reference architectures. Write: publish design |
| Jira Cloud | Read only | Related technical debt, infrastructure tickets, capacity data |
| GitHub | Read only | Codebase analysis, existing patterns, dependency scanning, PR history |

---

## What S4 Does NOT Do

- Trigger S3 v2 or S5 automatically — human decides
- Create or modify Jira issues — read-only
- Create epics or stories — that's S6
- Perform threat modelling — that's S5. S4 includes a security architecture section but not threat analysis
- Auto-commit to git

---

## Architectural Principles Applied

| Principle | How S4 Applies It |
|-----------|-------------------|
| Dual Output Strategy | Full design doc + compressed frontmatter + separate traceability matrix |
| Git as Ground Truth | When Confluence (intent) conflicts with Git (reality), Git wins |
| Interactive Skills Brainstorm | Most judgment-heavy — extended architect iteration expected |
| Bidirectional Iteration | S4 feeds findings back to S3 for requirements v2 |
| Industry Frameworks | TOGAF, Azure WAF, C4 model as guardrails |

---

## Downstream Handoff

| Receiving Skill | What It Gets | From Where |
|-----------------|--------------|------------|
| S3 v2 | Requirements feedback — new NFRs, changed integrations, technical constraints | Requirements Feedback section of design doc |
| S5 — Threat Modelling | Architecture, data flows, integration points, security design | Design doc frontmatter + full document |
| S6 — Design Validation | Architecture for cross-validation | Design doc frontmatter |
| S7 — Jira Project Scaffolding | Components, ADRs, technical enablers, complexity signals | Design doc + traceability matrix |

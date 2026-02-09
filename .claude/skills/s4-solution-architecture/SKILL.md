---
name: s4-solution-architecture
description: "Use after High Level Requirements (S3 v1) are approved and before threat modelling (S5). Use when an initiative needs solution design, architecture decisions, or technical design documentation. Triggers include approved requirements, architecture review preparation, or when someone asks 'how should we build this?' or 'what's the architecture?'."
---

# S4 — Solution Architecture

## Overview

Deep collaborative solution design grounded in upstream business context and codebase analysis. Produces a solution design document (with ADRs and risk register) and a traceability matrix.

This is the **most judgment-heavy skill** in the chain. Extended back-and-forth with the architect is expected. The skill proposes architecture; the architect challenges and iterates.

## Entry

1. Locate S1 Concept Brief, S2 Feasibility Assessment, and S3 v1 Requirements — or use paths from `$ARGUMENTS`
2. Read frontmatter context summaries from all three
3. Summarise understanding: "Here's what I took from the upstream documents — correct?"
4. If any missing: ask user to point to them or suggest running prerequisites
5. Ask platform context if not clear: which of Azure, Salesforce, .NET, legacy are in play?
6. Load relevant platform reference files:
   - **Azure**: See [azure.md](azure.md)
   - **Salesforce**: See [salesforce.md](salesforce.md)
   - **.NET**: See [dotnet.md](dotnet.md)
   - **Legacy**: See [legacy.md](legacy.md)

## Process

### Phase 1 — Smart Assumptions Validation

Pull what's already answered from S1, S2, S3 frontmatter and content. Only present assumptions **not already covered** by upstream documents.

Present in batches of 3-5 related items:
```
Assumptions — Infrastructure (please confirm or correct):
1. Primary region: Australia East, failover: Australia Southeast
2. Environment tiers: Dev, Test, UAT, Production
3. Entra ID for authentication across all components

These aren't covered in upstream documents. Correct?
```

Focus areas: deployment model, scaling approach, data partitioning, auth model, integration patterns, infrastructure constraints.

Wait for validation before proceeding.

### Phase 2 — Architecture Design (Iterative)

For each section, propose architecture with Mermaid diagrams where applicable. Present to user, iterate based on feedback.

**Section order:**
1. Architecture Principles
2. System Context (C4 Context diagram)
3. Component Architecture (C4 Component diagram)
4. Data Architecture (model, governance, flows)
5. Integration Architecture (APIs, messaging, external systems)
6. Infrastructure Architecture (compute, networking, storage)
7. Security Architecture (identity, data protection, network security)
8. Non-Functional Requirements Approach
9. Technology Stack
10. Deployment Architecture (environments, CI/CD, release strategy)
11. Trade-offs & Technical Debt

**Capture ADRs in-flight.** As design decisions are made during conversation, write them in Nygard format immediately. Don't defer to the end.

### Phase 3 — Risk Register

Compile technical risks identified during design. Categories: Technical, Vendor, Data, Integration.

### Phase 4 — Traceability Matrix

Build separate traceability matrix mapping S1 scope → S3 requirement → S4 design decision/component.

**Checks:**
- Every S3 requirement should trace to at least one design decision/component
- Flag gaps for resolution
- Flag requirements that drove ADRs

### Phase 5 — Requirements Feedback

Identify architecture findings that affect S3 requirements:
- New NFRs surfaced by design decisions
- Changed integration requirements
- Technical constraints affecting functional requirements
- Security requirements from security architecture

Present as summary: "These findings should feed back to S3 for requirements v2."

### Phase 6 — Context Discovery (MCP Checkpoint)

Same pattern as S1-S3. Particularly useful for:
- **Git**: codebase analysis, existing patterns, dependencies
- **Confluence**: existing architecture docs, standards, reference architectures
- **Jira**: related technical debt, infrastructure tickets

### Phase 7 — Document Construction & Review

Draft using template in [architecture-template.md](architecture-template.md).

1. Compile validated sections into complete document
2. Present for final review
3. On approval: write design doc to `docs/architecture/YYYY-MM-DD-<topic>-architecture.md` and traceability matrix to `docs/traceability/YYYY-MM-DD-<topic>-traceability.md`
4. If Confluence MCP available: offer to publish
5. Git handling: check repo, ask to commit, never auto-commit
6. Present handoff:
   ```
   Solution Architecture approved and saved.

   Recommended next steps:
   1. Re-invoke S3 to produce requirements v2
      (refined with architecture findings)
   2. Then proceed to S5 — Threat Modelling
   ```

## What S4 Does NOT Do

- Trigger S3 v2 or S5 automatically — human decides
- Create or modify Jira issues — read-only
- Create epics or stories — that's S7
- Perform threat modelling — that's S5 (S4 includes security architecture but not threat analysis)
- Auto-commit to git

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Designing without reading upstream docs | Always start from S1 + S2 + S3 context |
| Re-asking what upstream already answered | Smart assumptions — only validate gaps |
| Deferring ADRs to the end | Capture in-flight as decisions are made |
| Missing traceability | Every requirement should map to a design decision |
| Architecture without trade-off documentation | Every significant choice has a trade-off — document it |
| Ignoring requirements feedback | Always identify findings that S3 needs to incorporate |
| Platform-agnostic design when platforms are known | Load and apply relevant platform reference files |
| Security architecture as afterthought | Design security alongside other sections, not tacked on at end |

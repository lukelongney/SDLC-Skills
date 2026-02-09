# SDLC Skills Architecture — End to End Flow

## Skill Chain

| Skill | Name | Mode | Purpose |
|-------|------|------|---------|
| **S1** | Intake & Concept Framing | Interactive | Normalise raw inputs into a structured Concept Brief |
| **S2** | Feasibility & Impact Assessment | Interactive | Evaluate viability, ROM estimate (baseline + AI-assisted), change impact |
| **S3 v1** | High Level Requirements | Interactive | Decompose concept into traceable requirements by capability group |
| **S4** | Solution Architecture | Interactive | Deep collaborative solution design grounded in codebase analysis |
| **S3 v2** | High Level Requirements (refined) | Interactive | Refine requirements with architecture findings |
| **S5** | Threat Modelling | Interactive | Threat models using STRIDE for identification, OWASP ASVS for control mapping |
| **S3 v3** | High Level Requirements (final) | Interactive | Refine requirements with threat model findings |
| **S6** | Design Validation | Agentic | Autonomous cross-validation of complete design package |
| **S7** | Jira Project Scaffolding | Interactive | Translate validated requirements + architecture + threats into epics/stories |
| **S8** | Security Assessment | Agentic | Independent autonomous security assessment against frameworks |
| **S9** | Operational Readiness & Handoff | Agentic | Final gate verifying operational plans and change management |

## Flow Diagram

```
S1 (Concept Brief)
 └─► S2 (Feasibility & Impact Assessment)
      └─► S3 v1 (High Level Requirements)
           └─► S4 (Solution Architecture)
                ├─► S3 v2 (Requirements refined with architecture)
                │    └─► S5 (Threat Modelling)
                │         └─► S3 v3 (Requirements refined with threats)
                │              └─► S6 (Design Validation)
                │                   └─► S7 (Jira Project Scaffolding)
                │                        └─► S8 (Security Assessment)
                │                             └─► S9 (Operational Readiness & Handoff)
                └─► S6 (also receives architecture directly)
```

## Context Flow

Each skill reads YAML frontmatter from upstream artifacts as compressed context summaries.

| From | To | What Flows |
|------|----|------------|
| S1 | S2 | Concept Brief — problem, scope, business areas, risk flags |
| S2 | S3 | Feasibility — recommendation, estimated size, key risks, conditions |
| S3 v1 | S4 | Requirements — capability groups, prioritisation, traceability |
| S4 | S3 v2 | Architecture findings — ADRs, technical constraints, new requirements |
| S3 v2 | S5 | Updated requirements — refined with architecture |
| S5 | S3 v3 | Threat model findings — security requirements, mitigations |
| S1–S5 | S6 | All design artifacts for cross-validation before Jira |
| S3 v3 + S4 + S5 + S6 | S7 | Validated requirements + architecture + threats → epics/stories |
| S4–S7 | S8 | Design + threats + Jira structure for security assessment |
| All | S9 | Everything for operational readiness and handoff |

## Output Locations

| Skill | Output Path |
|-------|------------|
| S1 | `docs/concept-briefs/YYYY-MM-DD-<topic>.md` |
| S2 | `docs/feasibility/YYYY-MM-DD-<topic>-feasibility.md` |
| S3 | `docs/requirements/YYYY-MM-DD-<topic>-requirements.md` (versioned in-place) |
| S4 | `docs/architecture/YYYY-MM-DD-<topic>-architecture.md` |
| S5 | `docs/threat-models/YYYY-MM-DD-<topic>-threat-model.md` |
| S6 | `docs/validation/YYYY-MM-DD-<topic>-design-validation.md` |
| S7 | Jira (epics/stories) + `docs/jira/YYYY-MM-DD-<topic>-scaffolding.md` |
| S8 | `docs/security/YYYY-MM-DD-<topic>-security-assessment.md` |
| S9 | `docs/handoff/YYYY-MM-DD-<topic>-handoff.md` |

## MCP Servers

All optional — skills degrade gracefully without them.

| Server | Access | Used By |
|--------|--------|---------|
| Confluence Cloud | Read + Write | All skills |
| Jira Cloud | Read (S1-S6, S8-S9), Read + Write (S7) | All skills |
| GitHub | Read only | All skills |

## Key Principles

1. **Local first** — always write markdown, Confluence is enhancement
2. **Frontmatter as context summary** — compressed handoff between skills
3. **Human gates between skills** — human decides when to proceed
4. **Interactive skills brainstorm, agentic skills verify** — S1-S5, S7 conversational; S6, S8-S9 autonomous
5. **S3 refines through the chain** — v1 after feasibility, v2 after architecture, v3 after threats
6. **MCP optional** — full functionality without integrations, enriched with them
7. **Traceability throughout** — scope → requirements → architecture → stories

## Security Framework Usage

| Skill | Frameworks | Purpose |
|-------|-----------|---------|
| **S5** | STRIDE, OWASP ASVS | STRIDE for threat identification per component. OWASP ASVS for mapping threats to security controls. |
| **S8** | OWASP ASVS 5.0, OWASP Top 10 2025, MITRE ATT&CK, SOC 2, ISO 27001 | Independent security assessment. MITRE ATT&CK for detection/response coverage. Compliance framework mapping. |

**Division of responsibility:**
- S5 (Threat Modelling) — design-phase threat identification and control requirements. Collaborative with security engineer.
- S8 (Security Assessment) — independent verification against industry frameworks. Autonomous agent role (assessor, not collaborator).

## Edge Cases & Error Scenarios

Edge cases are captured at two levels (hybrid approach):

| Level | Skill | What's Captured |
|-------|-------|-----------------|
| **Requirement level** | S3 | Known edge cases and error scenarios obvious at requirements stage (e.g., "what if customer has no email?"). Optional column in requirements tables. |
| **Story level** | S7 | Additional edge cases identified during story elaboration. S7 prompts: "Any edge cases for this story?" and carries forward S3 edge cases. |

## Test Case Strategy

| Level | Skill | Test Type |
|-------|-------|-----------|
| **Epic level** | S7 | UAT test cases — business outcome validation derived from S3 capability group success criteria |
| **Story level** | Refinement | Functional test cases (Given/When/Then) elaborated during sprint refinement with delivery team |

## S6 Design Validation

S6 runs autonomously before Jira scaffolding to validate the complete design package.

**Validation categories:**
- **Traceability** — scope → requirements → architecture → threats chain connected
- **Completeness** — all required sections present in each artifact
- **Consistency** — no contradictions between artifacts
- **Pattern compliance** — technologies match `approved-patterns.md` (if present)

**Pattern compliance handling:**
- Approved patterns: marked compliant ✓
- Unrecognized patterns: flagged as "needs review" (warning, not failure)
- Missing patterns file: skip pattern validation

**Verdicts:**
| Verdict | Meaning | Action |
|---------|---------|--------|
| **Ready** | All checks pass | Proceed to S7 |
| **Ready with Conditions** | Warnings only | Proceed with documented conditions |
| **Not Ready** | Critical issues | Resolve before proceeding |

## S7 Jira Structure

**Epic types generated by S7:**
- **Technical Enablers** — cross-cutting infrastructure, CI/CD, environments, shared platform (from S4)
- **Security** — cross-cutting security: identity platform, key management, security logging (from S5)
- **NFR Implementation** — if scope warrants dedicated epic (from S3 NFRs)
- **[Capability Group]** — one per S3 requirement group, containing functional + component-specific technical/security stories

**Story formats:**
- **Functional stories**: "As a [user], I want [goal], so that [benefit]" + acceptance criteria
- **Technical/Security stories**: "Implement [thing] to enable [outcome]" + context + acceptance criteria

**Traceability:** Labels (REQ-xxx, ADR-xxx, THR-xxx) on all stories. Custom field can replace labels later.

**Jira integration options (in priority order):**
1. Jira MCP server (if available)
2. Direct REST API via `.claude/jira-config.json` (S7 helps set up if missing)
3. Local scaffold doc only (manual Jira creation)

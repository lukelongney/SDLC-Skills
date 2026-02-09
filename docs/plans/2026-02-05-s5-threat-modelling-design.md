# S5 — Threat Modelling: Skill Design

**Date:** 2026-02-05
**Status:** Draft
**Skill Type:** Project-level, interactive conversational
**Position in Chain:** Fifth skill — receives S4 Solution Architecture, feeds S3 v3 + S6

---

## Purpose

Collaborative threat modelling using STRIDE for threat identification and OWASP ASVS for control mapping. Produces a threat model document and security requirements addendum that feeds back to S3 v3 for requirements refinement.

S5 is **design-phase threat identification** — collaborative with a security engineer. It is distinct from S8 (Security Assessment) which is an independent, autonomous verification role.

---

## Security Frameworks

| Framework | Role in S5 |
|-----------|-----------|
| **STRIDE** | Primary threat identification methodology — applied per component and data flow |
| **OWASP ASVS** | Control mapping — map identified threats to verification requirements |

**Not used in S5:**
- MITRE ATT&CK — more relevant for detection/response, used in S8
- Compliance frameworks (SOC 2, ISO 27001) — used in S8 for assessment

---

## Inputs

- S4 Solution Architecture at `docs/architecture/`
- S4 Traceability Matrix at `docs/traceability/`
- S3 v2 High Level Requirements (refined with architecture) at `docs/requirements/`
- Reads YAML frontmatter from all as compressed context summaries

Key inputs from S4:
- Component architecture (attack surface)
- Data flows (data in transit)
- Data architecture (data at rest, classification)
- Integration architecture (trust boundaries, external systems)
- Security architecture (current security design)

---

## Outputs

### Primary: Threat Model
- Single document: `docs/threat-models/YYYY-MM-DD-<topic>-threat-model.md`
- YAML frontmatter as Context Summary consumed by S6
- Contains: data flow diagrams, trust boundaries, STRIDE analysis per component, attack surface mapping, threat prioritisation, OWASP ASVS control mapping

### Secondary: Security Requirements Addendum
- Section within the threat model or separate if large
- Security requirements derived from threat analysis
- Feeds back to S3 v3 for requirements refinement

### Traceability Extension
- Updates traceability matrix with threat → control → requirement mappings

---

## STRIDE Methodology

STRIDE is applied per component and per data flow to identify threats:

| Category | Threat Type | Question to Ask |
|----------|------------|-----------------|
| **S** | Spoofing | Can an attacker pretend to be someone/something else? |
| **T** | Tampering | Can an attacker modify data they shouldn't? |
| **R** | Repudiation | Can an attacker deny performing an action? |
| **I** | Information Disclosure | Can an attacker access data they shouldn't? |
| **D** | Denial of Service | Can an attacker disrupt availability? |
| **E** | Elevation of Privilege | Can an attacker gain higher access than intended? |

---

## Conversation Flow

### Phase 1 — Intake & Orientation

1. Locate and read S4 Solution Architecture and S3 v2 Requirements
2. Summarise understanding: "Here's the architecture I'll be threat modelling — correct?"
3. Identify key inputs for threat modelling:
   - Components and their responsibilities
   - Data flows between components
   - Trust boundaries
   - External integrations
   - Data classification from S4

### Phase 2 — Data Flow Diagrams

Create data flow diagrams (DFDs) based on S4 architecture. For each significant flow:
1. Propose a Mermaid DFD showing: actors, processes, data stores, data flows
2. Annotate trust boundaries
3. User validates/adjusts
4. These DFDs become the basis for STRIDE analysis

### Phase 3 — STRIDE Analysis

For each component and data flow, systematically apply STRIDE:

```
Component: [Component Name]
Trust Boundary: [Inside/Outside/Crosses boundary]

| Threat | Applicable? | Scenario | Severity | Mitigation |
|--------|-------------|----------|----------|------------|
| Spoofing | Y/N | [How could this happen?] | H/M/L | [Control] |
| Tampering | Y/N | [Scenario] | H/M/L | [Control] |
| Repudiation | Y/N | [Scenario] | H/M/L | [Control] |
| Info Disclosure | Y/N | [Scenario] | H/M/L | [Control] |
| Denial of Service | Y/N | [Scenario] | H/M/L | [Control] |
| Elevation of Privilege | Y/N | [Scenario] | H/M/L | [Control] |
```

**Process:**
- Work through one component/flow at a time
- Propose STRIDE analysis, security engineer validates
- For each applicable threat, identify mitigation controls
- Flag threats that aren't addressed by S4 security architecture

### Phase 4 — Attack Surface Mapping

Summarise the attack surface:
- Entry points (APIs, UIs, file uploads, integrations)
- Sensitive data stores
- Privileged operations
- External dependencies

### Phase 5 — OWASP ASVS Control Mapping

Map identified threats and mitigations to OWASP ASVS requirements:

| Threat | STRIDE Category | ASVS Requirement | Control Status |
|--------|----------------|------------------|----------------|
| [threat] | S/T/R/I/D/E | V2.1.1, V3.2.3 | Designed / Gap / Partial |

This creates traceability from threat → control → ASVS verification requirement.

### Phase 6 — Threat Prioritisation

Prioritise threats using risk-based approach:

| Threat ID | Description | Likelihood | Impact | Risk Rating | Priority |
|-----------|-------------|------------|--------|-------------|----------|
| THR-001 | [threat] | H/M/L | H/M/L | Critical/High/Medium/Low | 1 |

Focus remediation effort on high-priority threats.

### Phase 7 — Security Requirements Addendum

Compile security requirements derived from threat analysis:
- New security requirements not in S3 v2
- Refined security requirements based on specific threats
- Control requirements mapped to OWASP ASVS

Present as summary: "These security requirements should feed back to S3 for requirements v3."

### Phase 8 — Context Discovery (MCP Checkpoint)

Same pattern as previous skills. Useful for:
- Git: existing security implementations, authentication patterns
- Confluence: security standards, previous threat models, security guidelines

### Phase 9 — Document Construction & Review

1. Compile threat model document
2. Present for security team review
3. On approval: write to `docs/threat-models/YYYY-MM-DD-<topic>-threat-model.md`
4. Update traceability matrix with threat mappings
5. If Confluence MCP available: offer to publish
6. Git handling: same pattern
7. Present handoff:
   ```
   Threat Model approved and saved.

   Recommended next steps:
   1. Re-invoke S3 to produce requirements v3
      (refined with security requirements from threat model)
   2. Then proceed to S6 — Design Validation
   3. Then S7 — Jira Project Scaffolding
   ```

---

## Document Structure

```markdown
---
type: threat-model
status: draft | review | approved
created: YYYY-MM-DD
architecture: [path to S4]
requirements: [path to S3 v2]
# --- Context Summary (consumed by S6) ---
component_count: [number of components analysed]
threat_count: [total threats identified]
critical_threats: [count]
high_threats: [count]
medium_threats: [count]
low_threats: [count]
unmitigated_threats: [count of gaps]
asvs_controls_mapped: [count]
security_requirements_count: [new reqs for S3 v3]
---

# Threat Model: [Title]

**Version:** YYYY-MM-DD
**Status:** Draft | Review | Approved
**Architecture:** [Link to S4]
**Methodology:** STRIDE, OWASP ASVS 5.0

## Executive Summary
Overview of threat landscape, key risks, and recommended priorities.

## Scope
### In Scope
Components and data flows included in this threat model.

### Out of Scope
What was excluded and why.

## Data Flow Diagrams

### [Flow Name]
[Mermaid DFD diagram]

**Trust Boundaries:**
- [Boundary description]

## STRIDE Analysis

### [Component/Flow Name]
**Trust Boundary:** [Inside/Outside/Crosses]

| Threat | Category | Scenario | Severity | Mitigation | ASVS Ref |
|--------|----------|----------|----------|------------|----------|
| THR-001 | Spoofing | [scenario] | High | [control] | V2.1.1 |

[Repeat for each component/flow]

## Attack Surface
### Entry Points
| Entry Point | Type | Exposure | Controls |
|-------------|------|----------|----------|
| [endpoint] | API/UI/File/Integration | Public/Internal | [controls] |

### Sensitive Data Stores
| Data Store | Classification | Encryption | Access Control |
|------------|---------------|------------|----------------|
| [store] | PII/Confidential/Public | At-rest/In-transit | [approach] |

## OWASP ASVS Control Mapping

| Threat | STRIDE | ASVS Requirement | Control | Status |
|--------|--------|------------------|---------|--------|
| THR-001 | S | V2.1.1 | [control] | Designed/Gap/Partial |

## Threat Prioritisation

| ID | Threat | Likelihood | Impact | Risk | Priority | Owner |
|----|--------|------------|--------|------|----------|-------|
| THR-001 | [description] | H/M/L | H/M/L | Critical | 1 | [who] |

## Security Requirements Addendum

### New Security Requirements for S3 v3
| ID | Requirement | Source Threat | ASVS Ref |
|----|-------------|---------------|----------|
| SEC-REQ-001 | [requirement] | THR-001 | V2.1.1 |

### Refined Security Requirements
| Original Req | Refinement | Source Threat |
|--------------|------------|---------------|
| REQ-xxx | [what changed] | THR-002 |

## Residual Risks
Threats accepted or partially mitigated with rationale.

| Threat | Residual Risk | Acceptance Rationale | Review Date |
|--------|--------------|---------------------|-------------|
| THR-005 | [remaining risk] | [why accepted] | [when to revisit] |

## Open Questions
- [ ] [Unresolved items needing security team input]

## Source Material
References to architecture docs, security standards, and MCP findings.
```

---

## MCP Integration

| Server | Access | Purpose |
|--------|--------|---------|
| Confluence Cloud | Read + Write | Read: security standards, previous threat models. Write: publish threat model |
| Jira Cloud | Read only | Security-related tickets, vulnerability history |
| GitHub | Read only | Existing security implementations, auth patterns, security configs |

---

## What S5 Does NOT Do

- Trigger S3 v3 or S6 automatically — human decides
- Perform code-level security assessment — that's S8
- Map to compliance frameworks (SOC 2, ISO 27001) — that's S8
- Use MITRE ATT&CK for detection coverage — that's S8
- Create or modify Jira issues — read-only
- Auto-commit to git

---

## Architectural Principles Applied

| Principle | How S5 Applies It |
|-----------|-------------------|
| Dual Output Strategy | Full threat model + compressed frontmatter + security requirements addendum |
| Interactive Skills Brainstorm | Collaborative — security engineer validates threats and mitigations |
| Defense in Depth for Security | S5 models threats collaboratively, S8 assesses independently |
| Bidirectional Iteration | S5 feeds security requirements back to S3 for v3 |

---

## Downstream Handoff

| Receiving Skill | What It Gets | From Where |
|-----------------|--------------|------------|
| S3 v3 | Security requirements addendum — new and refined security requirements | Security Requirements Addendum section |
| S6 — Design Validation | Threat model for cross-validation | Frontmatter + threat register |
| S7 — Jira Project Scaffolding | Threat mitigations as security stories, control implementations | Frontmatter + STRIDE analysis |
| S8 — Security Assessment | Threat model as input for independent verification | Full threat model document |

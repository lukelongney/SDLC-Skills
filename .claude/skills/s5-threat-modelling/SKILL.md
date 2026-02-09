---
name: s5-threat-modelling
description: "Use after Solution Architecture (S4) is approved and before design validation (S6). Use when an initiative needs threat analysis, security requirements, or attack surface mapping. Triggers include approved architecture, security review preparation, or when someone asks 'what are the security risks?' or 'what threats should we consider?'."
---

# S5 — Threat Modelling

## Overview

Collaborative threat modelling using **STRIDE** for threat identification and **OWASP ASVS** for control mapping. Produces a threat model with data flow diagrams, STRIDE analysis per component, and a security requirements addendum that feeds back to S3 v3.

S5 is **design-phase threat identification** — collaborative with security engineer. Distinct from S8 (Security Assessment) which is independent autonomous verification.

## Frameworks

| Framework | Role |
|-----------|------|
| **STRIDE** | Primary threat identification — per component and data flow |
| **OWASP ASVS** | Control mapping — map threats to verification requirements |

See [owasp-asvs-reference.md](owasp-asvs-reference.md) for ASVS quick reference.

## Entry

1. Locate S4 Solution Architecture and S3 v2 Requirements — or use paths from `$ARGUMENTS`
2. Read frontmatter context summaries
3. Summarise understanding: "Here's the architecture I'll be threat modelling — correct?"
4. Identify key inputs from S4:
   - Components and responsibilities
   - Data flows between components
   - Trust boundaries
   - External integrations
   - Data classification

## Process

### Phase 1 — Data Flow Diagrams

Create DFDs based on S4 architecture:
1. Propose Mermaid DFD showing: actors, processes, data stores, data flows
2. Annotate trust boundaries
3. User validates/adjusts
4. DFDs become the basis for STRIDE analysis

### Phase 2 — STRIDE Analysis

For each component and data flow, systematically apply STRIDE:

| Category | Question |
|----------|----------|
| **S** — Spoofing | Can an attacker pretend to be someone/something else? |
| **T** — Tampering | Can an attacker modify data they shouldn't? |
| **R** — Repudiation | Can an attacker deny performing an action? |
| **I** — Info Disclosure | Can an attacker access data they shouldn't? |
| **D** — Denial of Service | Can an attacker disrupt availability? |
| **E** — Elevation of Privilege | Can an attacker gain higher access than intended? |

**Process:**
- One component/flow at a time
- Propose STRIDE analysis, security engineer validates
- For each applicable threat: identify severity, mitigation, ASVS mapping
- Flag threats not addressed by S4 security architecture

### Phase 3 — Attack Surface Mapping

Summarise:
- Entry points (APIs, UIs, file uploads, integrations)
- Sensitive data stores
- Privileged operations
- External dependencies

### Phase 4 — OWASP ASVS Control Mapping

Map threats and mitigations to ASVS requirements:

| Threat | STRIDE | ASVS Requirement | Control Status |
|--------|--------|------------------|----------------|
| THR-001 | S | V2.1.1 | Designed / Gap / Partial |

### Phase 5 — Threat Prioritisation

Prioritise using risk matrix:

| Likelihood / Impact | High | Medium | Low |
|--------------------|------|--------|-----|
| **High** | Critical | High | Medium |
| **Medium** | High | Medium | Low |
| **Low** | Medium | Low | Low |

### Phase 6 — Security Requirements Addendum

Compile security requirements derived from threat analysis:
- New requirements not in S3 v2
- Refined requirements based on specific threats
- Control requirements mapped to ASVS

Present as summary: "These security requirements should feed back to S3 for requirements v3."

### Phase 7 — Context Discovery (MCP Checkpoint)

Same pattern as previous skills. Useful for:
- **Git**: existing security implementations, auth patterns
- **Confluence**: security standards, previous threat models

### Phase 8 — Document Construction & Review

Draft using template in [threat-model-template.md](threat-model-template.md).

1. Compile threat model document
2. Present for security team review
3. On approval: write to `docs/threat-models/YYYY-MM-DD-<topic>-threat-model.md`
4. Update traceability matrix with threat mappings
5. If Confluence MCP available: offer to publish
6. Git handling: same pattern, never auto-commit
7. Present handoff:
   ```
   Threat Model approved and saved.

   Recommended next steps:
   1. Re-invoke S3 to produce requirements v3
      (refined with security requirements from threat model)
   2. Then proceed to S6 — Design Validation
   3. Then S7 — Jira Project Scaffolding
   ```

## What S5 Does NOT Do

- Trigger S3 v3 or S6 automatically — human decides
- Perform code-level security assessment — that's S8
- Map to compliance frameworks (SOC 2, ISO 27001) — that's S8
- Use MITRE ATT&CK — that's S8
- Create or modify Jira issues — read-only
- Auto-commit to git

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Skipping DFDs and going straight to threats | DFDs ground the analysis — always start with data flows |
| Applying STRIDE superficially | Systematically work through all six categories per component |
| Missing trust boundaries | Explicitly annotate where trust changes — most threats occur at boundaries |
| Threats without ASVS mapping | Every threat should map to verification requirements |
| Security requirements without traceability | Every new security requirement traces to a specific threat |
| Confusing S5 with S8 | S5 is collaborative design-phase. S8 is independent assessment. |
| Marking all threats as High | Use risk matrix — likelihood × impact. Force differentiation. |

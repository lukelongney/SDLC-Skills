# S8 — Security Assessment: Skill Design

**Date:** 2026-02-05
**Status:** Draft
**Skill Type:** Project-level, agentic (autonomous)
**Position in Chain:** Eighth skill — receives S4 + S5 + S7, feeds S9

---

## Purpose

Independent security assessment of design artifacts against industry frameworks. Validates that the solution architecture (S4), threat model (S5), and Jira scaffolding (S7) meet security requirements appropriate to the project's risk profile.

S8 is an **assessor role** — autonomous verification, not collaborative design. It complements S5 (collaborative threat modelling) by providing independent validation against broader frameworks.

### Key Distinction from S5

| Aspect | S5 Threat Modelling | S8 Security Assessment |
|--------|---------------------|------------------------|
| Mode | Interactive, collaborative | Agentic, autonomous |
| Role | Designer (with security engineer) | Assessor (independent) |
| Focus | Identify threats, design controls | Verify design against frameworks |
| Frameworks | STRIDE, OWASP ASVS | OWASP ASVS/Top 10, MITRE ATT&CK, SOC 2, ISO 27001 |

---

## Inputs

- **S4 Solution Architecture** at `docs/architecture/` — security architecture, components, integrations
- **S5 Threat Model** at `docs/threat-models/` — threats, controls, ASVS mappings
- **S7 Jira Scaffolding** at `docs/jira/` or via Jira MCP — stories for spot check
- **S2 Feasibility** at `docs/feasibility/` — project classification for framework tiering
- YAML frontmatter from all as compressed context

---

## Framework Tiering

Default frameworks based on project risk classification (from S2 or explicit metadata):

| Classification | Default Frameworks |
|----------------|-------------------|
| **Standard** | OWASP Top 10 2025, OWASP ASVS Level 1 |
| **Elevated** | Above + OWASP ASVS Level 2 + SOC 2 Type II controls |
| **Critical** | Above + OWASP ASVS Level 3 + ISO 27001 + MITRE ATT&CK detection |

### User Override

Before running assessment, S8 presents the default framework set and asks:

```
Based on project classification [Elevated], I'll assess against:
- OWASP Top 10 2025
- OWASP ASVS Level 2
- SOC 2 Type II controls

Add or remove any frameworks? (or confirm to proceed)
```

User can add (e.g., "add ISO 27001") or remove (e.g., "skip SOC 2") before assessment runs.

---

## Outputs

### Primary: Security Assessment Report
- Single document: `docs/security/YYYY-MM-DD-<topic>-security-assessment.md`
- YAML frontmatter as Context Summary consumed by S9
- Contains: framework coverage, findings by severity, spot check results, verdict

### Secondary: Jira Defect Tickets
- Optional — S8 offers to create Jira tickets for gaps
- User confirms before any tickets are created
- Uses same Jira integration as S7 (MCP, REST API, or manual)

---

## Assessment Workflow

### Phase 1 — Intake & Framework Confirmation

1. Locate and read S4, S5, S7 artifacts
2. Read project classification from S2 frontmatter (or ask if missing)
3. Present default framework set based on classification
4. User confirms or adjusts frameworks
5. Proceed to autonomous assessment

### Phase 2 — Framework Assessment (Autonomous)

For each selected framework, assess the design artifacts:

| Framework | What S8 Checks |
|-----------|----------------|
| **OWASP Top 10** | Each Top 10 category addressed in S4 security architecture |
| **OWASP ASVS** | S5 control mappings cover required ASVS sections for selected level |
| **SOC 2** | Trust Service Criteria (Security, Availability, Confidentiality) addressed in design |
| **ISO 27001** | Annex A controls relevant to architecture are designed |
| **MITRE ATT&CK** | Detection/logging designed for relevant techniques (not prevention-only) |

### Phase 3 — Jira Spot Check (Autonomous)

- Identify 3-5 highest-priority threats from S5 (Critical/High severity)
- Verify each has a corresponding story in S7 scaffolding (THR-xxx label or explicit reference)
- Flag any high-priority threats without Jira coverage

### Phase 4 — Findings & Verdict

1. Compile findings by severity (Critical/High/Medium/Low)
2. Determine verdict based on findings
3. Present report to user
4. Offer to create Jira tickets for gaps (user confirms before creation)

---

## Verdicts

| Verdict | Criteria | Action |
|---------|----------|--------|
| **Approved** | No Critical or High findings | Proceed to S9 |
| **Approved with Conditions** | No Critical findings; High findings documented with mitigation plan | Proceed to S9 with conditions noted |
| **Not Approved** | Critical findings present | Resolve before proceeding |

### Finding Severity

| Severity | Definition |
|----------|------------|
| **Critical** | Fundamental security gap — missing authentication, unencrypted PII, no access control |
| **High** | Significant gap in framework coverage — missing ASVS section, no detection for key threats |
| **Medium** | Partial coverage — control designed but incomplete, missing edge cases |
| **Low** | Minor improvement opportunity — documentation gaps, defence-in-depth enhancements |

---

## What S8 Does NOT Do

- **Scan codebase** — repo-level security assessment is separate
- **Replace S5** — S8 verifies, doesn't redesign threat model
- **Full Jira audit** — spot check only, not exhaustive traceability
- **Auto-create Jira tickets** — always asks user first
- **Block on Medium/Low findings** — only Critical findings block approval
- **Perform penetration testing** — design review only, not active testing

---

## MCP Integration

| Server | Access | Purpose |
|--------|--------|---------|
| Jira Cloud | Read + Write | Read S7 stories for spot check; Write defect tickets (with permission) |
| Confluence Cloud | Read + Write | Read security standards; Publish assessment report |
| GitHub | Not used | Codebase scanning out of scope for S8 |

---

## Downstream Handoff

| Receiving Skill | What It Gets | From Where |
|-----------------|--------------|------------|
| S9 — Operational Readiness | Security assessment verdict, conditions, finding summary | Frontmatter + executive summary |

### Handoff Message

```
Security Assessment complete.

Verdict: Approved with Conditions
- 0 Critical, 2 High, 3 Medium findings
- Conditions documented for resolution before go-live

Recommended next steps:
1. Review conditions with security team
2. Create Jira tickets for gaps (offered above)
3. Proceed to S9 — Operational Readiness
```

---

## Architectural Principles Applied

| Principle | How S8 Applies It |
|-----------|-------------------|
| Dual Output Strategy | Full assessment report + compressed frontmatter |
| Agentic Skills Verify | Autonomous assessment, not collaborative design |
| Human Gates | User confirms framework selection and Jira ticket creation |
| Tiered Approach | Framework depth matches project risk classification |
| Defense in Depth | S5 designs controls, S8 independently verifies |

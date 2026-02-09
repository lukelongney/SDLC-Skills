# S6 — Design Validation: Skill Design

**Date:** 2026-02-05
**Status:** Draft
**Skill Type:** Project-level, agentic (autonomous)
**Position in Chain:** Sixth skill — validates S1-S5 artifacts before Jira scaffolding (S7)

---

## Purpose

Autonomous cross-validation of all design artifacts before creating Jira work items. Ensures traceability, completeness, consistency, and pattern compliance across the concept-to-design chain.

---

## Inputs

- S1 Concept Brief at `docs/concept-briefs/`
- S2 Feasibility Assessment at `docs/feasibility/`
- S3 v3 High Level Requirements (final) at `docs/requirements/`
- S4 Solution Architecture at `docs/architecture/`
- S5 Threat Model at `docs/threat-models/`
- Traceability Matrix at `docs/traceability/`
- Optional: `approved-patterns.md` at `docs/architecture/` or `.claude/`

---

## Outputs

### Primary: Design Validation Report
- Local file: `docs/validation/YYYY-MM-DD-<topic>-design-validation.md`
- Contains: verdict, executive summary, detailed findings by category

### Verdict Types

| Verdict | Meaning | Action |
|---------|---------|--------|
| **Ready** | All validations pass | Proceed to S7 |
| **Ready with Conditions** | Minor issues or unrecognized patterns | Document conditions, proceed with awareness |
| **Not Ready** | Critical gaps or inconsistencies | Resolve before proceeding |

---

## Validation Categories

### 1. Traceability Validation

Check that the chain is connected:

| Check | Source | Target | Pass Criteria |
|-------|--------|--------|---------------|
| Scope coverage | S1 scope items | S3 requirements | Every scope item maps to at least one requirement |
| Requirements coverage | S3 requirements | S4 components | Every Must/Should requirement addressed in architecture |
| Threat coverage | S5 threats | S4 components | Every component has threat analysis |
| Control coverage | S5 controls | S3 v3 | Security requirements added for identified controls |

**Failure examples:**
- S1 scope item with no corresponding requirement
- Must-have requirement not addressed in architecture
- Component with no threat analysis

### 2. Completeness Validation

Check that all artifacts have required sections:

| Artifact | Required Sections |
|----------|------------------|
| S1 | Problem statement, scope, business areas, risks |
| S2 | Recommendation, ROM estimate, risk assessment |
| S3 | Capability groups, prioritisation, traceability matrix |
| S4 | Components, ADRs, integration patterns, NFR approach |
| S5 | Threat register, STRIDE analysis, control mappings |

**Failure examples:**
- Missing ADR section in S4
- No prioritisation summary in S3
- Threat model without STRIDE analysis

### 3. Consistency Validation

Check for contradictions between artifacts:

| Check | Description |
|-------|-------------|
| Priority alignment | S3 Must-haves should not be marked as "future" in S4 |
| Complexity alignment | High-complexity items in S3 should have ADRs in S4 |
| Risk alignment | S2 risks should be addressed in S4 or S5 |
| Scope alignment | S4 components should not exceed S1 scope without S3 additive requirements |

**Failure examples:**
- S3 marks feature as Must-have, S4 defers to Phase 2
- S2 identifies integration risk, no corresponding ADR in S4
- S4 includes component not traceable to any requirement

### 4. Pattern Compliance

Check against approved technology patterns (if `approved-patterns.md` exists):

| Outcome | Handling |
|---------|----------|
| Pattern in approved list | Mark as compliant ✓ |
| Pattern not in list | Flag as "unrecognized — needs review" (warning) |
| No approved-patterns.md | Skip pattern validation |

**Not a blocker:** Unrecognized patterns trigger "Ready with Conditions" verdict, not failure.

---

## Conversation Flow

### Phase 1 — Artifact Discovery

1. Locate all S1-S5 artifacts using frontmatter and standard paths
2. Read frontmatter context summaries from each
3. Report: "Found X artifacts, validating..."
4. If any missing: "Cannot find [artifact] — provide path or skip?"

### Phase 2 — Autonomous Validation

Run all validation checks without user interaction:
1. Traceability validation
2. Completeness validation
3. Consistency validation
4. Pattern compliance (if approved-patterns.md exists)

### Phase 3 — Report Generation

1. Calculate verdict based on findings
2. Generate executive summary (2-3 sentences)
3. Generate detailed findings by category
4. Write report to `docs/validation/YYYY-MM-DD-<topic>-design-validation.md`

### Phase 4 — Handoff

```
Design validation complete.

Verdict: [Ready | Ready with Conditions | Not Ready]

Summary:
[2-3 sentence executive summary]

[If Ready]
Next step: S7 — Jira Project Scaffolding
S7 will translate this validated design into epics and stories.

[If Ready with Conditions]
Conditions to note:
- [List conditions]

Next step: S7 — Jira Project Scaffolding (proceed with awareness)

[If Not Ready]
Issues to resolve:
- [List critical issues]

Action: Address issues above, then re-run S6.
```

---

## Verdict Logic

| Findings | Verdict |
|----------|---------|
| No issues | Ready |
| Only warnings (unrecognized patterns, minor gaps) | Ready with Conditions |
| Any critical issue (broken traceability, missing required sections, contradictions) | Not Ready |

---

## What S6 Does NOT Do

- Auto-fix issues — reports for human resolution
- Create or modify any upstream artifacts
- Trigger S7 automatically — human decides
- Validate Jira structure — that's S9 (post-scaffolding)
- Run security assessment — that's S8
- Auto-commit to git

---

## Downstream Handoff

| Receiving Skill | What It Gets | From Where |
|-----------------|--------------|------------|
| S7 — Jira Scaffolding | Confidence that design is complete and consistent | Validation report |
| S8 — Security Assessment | Validated threat model to assess | S5 + validation report |
| S9 — Operational Readiness | Full artifact validation status | Validation report |

---

## Pattern Compliance Reference

### approved-patterns.md Structure

```markdown
# Approved Technology Patterns

## Compute
- Azure App Service
- Azure Functions
- Azure Kubernetes Service

## Data
- Azure SQL Database
- Azure Cosmos DB
- Azure Blob Storage

## Integration
- Azure Service Bus
- Azure API Management
- Logic Apps

## Identity
- Azure AD B2C
- Azure AD

## Monitoring
- Application Insights
- Azure Monitor
```

### Validation Behaviour

1. Extract technology references from S4 architecture
2. Match against approved list (case-insensitive)
3. Report approved patterns as compliant
4. Report unrecognized patterns as "needs review"
5. If file missing, skip pattern validation entirely

---

## Document Structure

```markdown
---
type: design-validation
status: ready | ready-with-conditions | not-ready
created: YYYY-MM-DD
concept_brief: [path to S1]
feasibility: [path to S2]
requirements: [path to S3 v3]
architecture: [path to S4]
threat_model: [path to S5]
# --- Summary ---
verdict: ready | ready-with-conditions | not-ready
critical_issues: [count]
warnings: [count]
traceability_score: [X/Y checks passed]
completeness_score: [X/Y sections present]
consistency_score: [X/Y checks passed]
pattern_compliance: [validated | skipped]
---

# Design Validation: [Title]

## Executive Summary
[2-3 sentences summarizing the validation outcome]

## Verdict: [Ready | Ready with Conditions | Not Ready]

## Findings

### Traceability
| Check | Status | Details |
|-------|--------|---------|

### Completeness
| Artifact | Status | Missing Sections |
|----------|--------|------------------|

### Consistency
| Check | Status | Details |
|-------|--------|---------|

### Pattern Compliance
| Pattern | Status | Notes |
|---------|--------|-------|

## Conditions (if Ready with Conditions)
- [List of conditions to note]

## Issues to Resolve (if Not Ready)
- [List of critical issues]

## Recommendations
- [Suggested actions]
```

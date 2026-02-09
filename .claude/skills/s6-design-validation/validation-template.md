# Design Validation Template

Use this template for the output file at `docs/validation/YYYY-MM-DD-<topic>-design-validation.md`.

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
pattern_compliance: validated | skipped
unrecognized_patterns: [count, if validated]
---

# Design Validation: [Title]

## Executive Summary

[2-3 sentences summarizing the validation outcome. Include verdict and key findings.]

## Verdict: [Ready | Ready with Conditions | Not Ready]

---

## Traceability Validation

### Scope to Requirements
| S1 Scope Item | S3 Requirements | Status |
|---------------|-----------------|--------|
| [scope item] | REQ-001, REQ-002 | ✓ Covered |
| [scope item] | — | ✗ Gap |

### Requirements to Architecture
| Requirement | S4 Component | Status |
|-------------|--------------|--------|
| REQ-001 (Must) | [component] | ✓ Addressed |
| REQ-002 (Must) | — | ✗ Not addressed |

### Components to Threats
| S4 Component | S5 Analysis | Status |
|--------------|-------------|--------|
| [component] | THR-001, THR-002 | ✓ Analyzed |
| [component] | — | ✗ No analysis |

### Controls to Requirements
| S5 Control | S3 v3 Requirement | Status |
|------------|-------------------|--------|
| [control] | REQ-015 | ✓ Added |
| [control] | — | ✗ Missing |

**Traceability Score:** X/Y checks passed

---

## Completeness Validation

| Artifact | Required Sections | Present | Missing |
|----------|------------------|---------|---------|
| S1 Concept Brief | Problem, Scope, Business Areas, Risks | 4/4 | — |
| S2 Feasibility | Recommendation, ROM, Risk Assessment | 3/3 | — |
| S3 Requirements | Capability Groups, Prioritisation, Traceability | 2/3 | Traceability |
| S4 Architecture | Components, ADRs, Integration, NFR | 4/4 | — |
| S5 Threat Model | Threat Register, STRIDE, Controls | 3/3 | — |

**Completeness Score:** X/Y sections present

---

## Consistency Validation

| Check | Status | Details |
|-------|--------|---------|
| Priority alignment | ✓ Pass | All Must-haves addressed in Phase 1 |
| Complexity alignment | ✓ Pass | High-complexity items have ADRs |
| Risk alignment | ⚠ Warning | S2 risk "Integration complexity" not explicitly addressed |
| Scope alignment | ✓ Pass | All S4 components traceable to requirements |

**Consistency Score:** X/Y checks passed

---

## Pattern Compliance

[If approved-patterns.md exists]

### Approved Patterns Used
| Pattern | Category | Status |
|---------|----------|--------|
| Azure App Service | Compute | ✓ Approved |
| Azure SQL Database | Data | ✓ Approved |
| Azure AD B2C | Identity | ✓ Approved |

### Unrecognized Patterns
| Pattern | Source | Recommendation |
|---------|--------|----------------|
| Redis Cache | S4 Caching Layer | Add to approved-patterns.md or document exception |
| SendGrid | S4 Notifications | Add to approved-patterns.md or document exception |

[If approved-patterns.md missing]

Pattern compliance validation skipped — no `approved-patterns.md` found.

---

## Conditions (if Ready with Conditions)

The following conditions should be noted before proceeding:

1. **Unrecognized patterns:** Redis Cache and SendGrid not in approved list. Confirm these are acceptable before Jira scaffolding.
2. **Minor gap:** S2 integration risk not explicitly addressed in S4. Consider adding ADR if significant.

---

## Issues to Resolve (if Not Ready)

The following critical issues must be resolved before proceeding:

1. **Traceability gap:** S1 scope item "Customer notifications" has no corresponding requirement in S3.
2. **Missing section:** S3 traceability matrix not present.
3. **Contradiction:** REQ-005 marked as Must-have in S3 but deferred to Phase 2 in S4.

---

## Recommendations

- [ ] [Actionable recommendation 1]
- [ ] [Actionable recommendation 2]
- [ ] [Actionable recommendation 3]

---

## Validation Metadata

| Metric | Value |
|--------|-------|
| Artifacts validated | 5 |
| Traceability checks | X passed / Y total |
| Completeness checks | X passed / Y total |
| Consistency checks | X passed / Y total |
| Pattern compliance | Validated / Skipped |
| Critical issues | [count] |
| Warnings | [count] |
```

## Verdict Definitions

| Verdict | Criteria | Next Step |
|---------|----------|-----------|
| **Ready** | All checks pass, no issues | Proceed to S7 |
| **Ready with Conditions** | Only warnings (unrecognized patterns, minor gaps) | Proceed to S7 with documented conditions |
| **Not Ready** | Critical issues present | Resolve issues, re-run S6 |

## Check Categories

### Critical (blocks Ready verdict)
- Scope item with no requirement
- Must-have requirement not in architecture
- Component with no threat analysis
- Missing required artifact section
- Contradiction between artifacts

### Warning (allows Ready with Conditions)
- Unrecognized technology pattern
- Should-have requirement not fully addressed
- Minor risk not explicitly addressed
- Optional section missing

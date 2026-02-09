---
name: s6-design-validation
description: "Use after S3 v3 requirements, S4 architecture, and S5 threat model are complete, before Jira scaffolding. Triggers include completed threat model, request for design review, or when someone asks 'is the design ready?' or 'validate the design'."
---

# S6 — Design Validation

## Overview

Autonomous cross-validation of all design artifacts (S1-S5) before Jira scaffolding. Validates traceability, completeness, consistency, and pattern compliance. Produces a validation report with a verdict: Ready, Ready with Conditions, or Not Ready.

## Entry

1. Locate S1, S2, S3 v3, S4, S5 documents — or use paths from `$ARGUMENTS`
2. Read frontmatter context summaries from each
3. Report: "Found X artifacts, validating..."
4. If any missing: ask user to provide path or confirm skip

## Process

### Phase 1 — Artifact Discovery

Locate all required artifacts:
- S1 Concept Brief: `docs/concept-briefs/`
- S2 Feasibility: `docs/feasibility/`
- S3 v3 Requirements: `docs/requirements/`
- S4 Architecture: `docs/architecture/`
- S5 Threat Model: `docs/threat-models/`
- Traceability Matrix: `docs/traceability/`
- Optional: `approved-patterns.md`

### Phase 2 — Validation (Autonomous)

Run all checks without user interaction:

#### Traceability Checks
| Check | Pass Criteria |
|-------|---------------|
| Scope → Requirements | Every S1 scope item maps to at least one S3 requirement |
| Requirements → Architecture | Every Must/Should requirement addressed in S4 |
| Components → Threats | Every S4 component has S5 threat analysis |
| Controls → Requirements | S5 controls reflected in S3 v3 security requirements |

#### Completeness Checks
| Artifact | Required Sections |
|----------|------------------|
| S1 | Problem, scope, business areas, risks |
| S2 | Recommendation, ROM, risk assessment |
| S3 | Capability groups, prioritisation, traceability |
| S4 | Components, ADRs, integration, NFR approach |
| S5 | Threat register, STRIDE, control mappings |

#### Consistency Checks
| Check | Description |
|-------|-------------|
| Priority alignment | Must-haves not deferred in architecture |
| Complexity alignment | High-complexity items have ADRs |
| Risk alignment | S2 risks addressed in S4 or S5 |
| Scope alignment | S4 components traceable to requirements |

#### Pattern Compliance (if approved-patterns.md exists)
| Outcome | Handling |
|---------|----------|
| Pattern approved | Mark compliant ✓ |
| Pattern unrecognized | Flag as "needs review" (warning, not failure) |
| File missing | Skip pattern validation |

### Phase 3 — Verdict

| Findings | Verdict |
|----------|---------|
| No issues | **Ready** |
| Only warnings | **Ready with Conditions** |
| Critical issues | **Not Ready** |

Critical issues include:
- Broken traceability (scope item with no requirement)
- Missing required sections
- Contradictions between artifacts

### Phase 4 — Report & Handoff

1. Write report to `docs/validation/YYYY-MM-DD-<topic>-design-validation.md`
2. Present verdict and summary
3. Git handling: ask to commit
4. Handoff:

**If Ready:**
```
Design validation complete. Verdict: Ready

Next step: S7 — Jira Project Scaffolding
S7 will translate this validated design into epics and stories.
```

**If Ready with Conditions:**
```
Design validation complete. Verdict: Ready with Conditions

Conditions:
- [list conditions]

Next step: S7 — Jira Project Scaffolding (proceed with awareness)
```

**If Not Ready:**
```
Design validation complete. Verdict: Not Ready

Issues to resolve:
- [list critical issues]

Action: Address issues above, then re-run S6.
```

## Reference Files

- [validation-template.md](validation-template.md) — output document structure
- [approved-patterns.md](approved-patterns.md) — example technology pattern list

## What S6 Does NOT Do

- Auto-fix issues — reports for human resolution
- Create or modify upstream artifacts
- Trigger S7 automatically — human decides
- Validate Jira structure — that's S9
- Run security assessment — that's S8
- Auto-commit to git

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Blocking on unrecognized patterns | Unrecognized = warning, not failure. Use "Ready with Conditions". |
| Skipping validation when patterns file missing | Skip pattern check only. Run all other validations. |
| Auto-fixing issues | Report issues, don't modify artifacts. Human resolves. |
| Running before S5 complete | Wait for S3 v3 (final) after threat model. |

# S8 — Security Assessment

Independent security assessment of design artifacts against industry frameworks.

## Trigger

Invoke after S7 Jira scaffolding is complete, before S9 Operational Readiness.

```
/s8-security-assessment
```

## What This Skill Does

1. Reads S4 architecture, S5 threat model, S7 Jira scaffolding
2. Determines framework set based on project classification (with user override)
3. Assesses design against selected frameworks (autonomous)
4. Spot checks high-priority threats have Jira stories
5. Produces verdict: Approved / Approved with Conditions / Not Approved
6. Offers to create Jira tickets for gaps

## Mode

**Agentic** — runs autonomously after framework confirmation. User interaction only at start (framework selection) and end (Jira ticket creation).

## Inputs Required

- S4 Solution Architecture at `docs/architecture/`
- S5 Threat Model at `docs/threat-models/`
- S7 Jira Scaffolding at `docs/jira/` or via Jira MCP
- S2 Feasibility (for project classification)

## Output

- `docs/security/YYYY-MM-DD-<topic>-security-assessment.md`
- Optional: Jira defect tickets for gaps (user confirms)

## Framework Tiering

| Classification | Default Frameworks |
|----------------|-------------------|
| Standard | OWASP Top 10 2025, ASVS Level 1 |
| Elevated | Above + ASVS Level 2 + SOC 2 |
| Critical | Above + ASVS Level 3 + ISO 27001 + MITRE ATT&CK |

User can add or remove frameworks before assessment runs.

## Verdicts

| Verdict | Criteria |
|---------|----------|
| **Approved** | No Critical or High findings |
| **Approved with Conditions** | No Critical; High findings documented |
| **Not Approved** | Critical findings present |

## Workflow

### Phase 1 — Intake & Framework Confirmation

Read design artifacts and present framework selection:

```
Based on project classification [Elevated], I'll assess against:
- OWASP Top 10 2025
- OWASP ASVS Level 2
- SOC 2 Type II controls

Add or remove any frameworks? (or confirm to proceed)
```

### Phase 2 — Framework Assessment

For each framework, check design coverage:

| Framework | Assessment Focus |
|-----------|-----------------|
| OWASP Top 10 | Each category addressed in S4 security architecture |
| OWASP ASVS | S5 controls cover required sections for level |
| SOC 2 | Trust Service Criteria in design |
| ISO 27001 | Relevant Annex A controls designed |
| MITRE ATT&CK | Detection/logging for relevant techniques |

### Phase 3 — Jira Spot Check

- Check 3-5 highest-priority threats from S5
- Verify each has corresponding Jira story (THR-xxx label)
- Flag gaps

### Phase 4 — Findings & Verdict

Present findings and offer Jira ticket creation:

```
Security Assessment complete.

Verdict: Approved with Conditions

Findings:
- Critical: 0
- High: 2
- Medium: 3
- Low: 1

Create Jira tickets for High/Medium findings? (yes/no/select)
```

## Finding Severity

| Severity | Definition |
|----------|------------|
| Critical | Fundamental gap — missing auth, unencrypted PII |
| High | Significant framework gap — missing ASVS section |
| Medium | Partial coverage — incomplete control design |
| Low | Minor improvement — documentation, defence-in-depth |

## What S8 Does NOT Do

- Scan codebase (repo-level security is separate)
- Replace S5 threat modelling
- Full Jira traceability audit (spot check only)
- Auto-create Jira tickets without permission
- Block on Medium/Low findings

## Handoff

After approval, suggest proceeding to S9:

```
Security Assessment: Approved with Conditions

Recommended next steps:
1. Review conditions with security team
2. Proceed to S9 — Operational Readiness
```

## Reference Files

- `assessment-template.md` — output document structure
- `framework-checklists/` — framework-specific check items (future)

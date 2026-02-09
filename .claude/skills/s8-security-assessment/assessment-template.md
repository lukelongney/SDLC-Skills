# Security Assessment Template

Use this template for the output file at `docs/security/YYYY-MM-DD-<topic>-security-assessment.md`.

```markdown
---
type: security-assessment
status: approved | approved-with-conditions | not-approved
created: YYYY-MM-DD
architecture: [path to S4]
threat_model: [path to S5]
jira_scaffolding: [path to S7]
# --- Context Summary (consumed by S9) ---
project_classification: standard | elevated | critical
frameworks_assessed: [list]
finding_count_critical: 0
finding_count_high: 0
finding_count_medium: 0
finding_count_low: 0
jira_spot_check_passed: true | false
conditions: [list if approved-with-conditions]
---

# Security Assessment: [Title]

**Version:** YYYY-MM-DD
**Status:** Approved | Approved with Conditions | Not Approved
**Classification:** Standard | Elevated | Critical
**Frameworks:** [list of frameworks assessed]

## Executive Summary

[2-3 sentences: verdict, key findings, recommended actions]

## Frameworks Assessed

| Framework | Level/Scope | Result |
|-----------|-------------|--------|
| OWASP Top 10 2025 | All categories | 9/10 addressed |
| OWASP ASVS | Level 2 | 85% coverage |
| SOC 2 | Type II | Key controls addressed |

## Findings Summary

| Severity | Count | Blocking |
|----------|-------|----------|
| Critical | 0 | Yes |
| High | 2 | Conditions |
| Medium | 3 | No |
| Low | 1 | No |

## Critical Findings

[None, or detailed list]

## High Findings

| ID | Framework | Finding | Design Gap | Recommendation |
|----|-----------|---------|------------|----------------|
| SEC-001 | ASVS V2.1 | Password policy not specified | S4 Section 7.1 | Add password requirements |
| SEC-002 | MITRE T1078 | No failed auth alerting | S4 Section 7.3 | Add detection for brute force |

## Medium Findings

| ID | Framework | Finding | Design Gap | Recommendation |
|----|-----------|---------|------------|----------------|
| SEC-003 | OWASP A05 | Security headers partial | S4 Section 6.2 | Add CSP, HSTS configuration |

## Low Findings

| ID | Framework | Finding | Recommendation |
|----|-----------|---------|----------------|
| SEC-004 | ASVS V1.1 | Security architecture diagram missing | Add to S4 documentation |

## Framework Coverage Details

### OWASP Top 10 2025

| Category | Status | Evidence |
|----------|--------|----------|
| A01 Broken Access Control | ✓ Addressed | S4 Section 7.1, S5 THR-003 |
| A02 Cryptographic Failures | ✓ Addressed | S4 Section 7.2 encryption design |
| A03 Injection | ✓ Addressed | S5 THR-007, parameterised queries |
| A04 Insecure Design | ✓ Addressed | S5 threat model complete |
| A05 Security Misconfiguration | ⚠ Partial | Headers incomplete (SEC-003) |
| A06 Vulnerable Components | ✓ Addressed | S4 dependency scanning designed |
| A07 Auth Failures | ⚠ Partial | Password policy missing (SEC-001) |
| A08 Data Integrity Failures | ✓ Addressed | S4 CI/CD security controls |
| A09 Logging Failures | ⚠ Partial | Detection gaps (SEC-002) |
| A10 SSRF | ✓ Addressed | S5 THR-012 mitigations |

### OWASP ASVS Level 2

| Section | Coverage | Gaps |
|---------|----------|------|
| V1 Architecture | 90% | Documentation (SEC-004) |
| V2 Authentication | 80% | Password policy (SEC-001) |
| V3 Session Management | 100% | — |
| V4 Access Control | 100% | — |
| V5 Validation | 95% | — |
| ... | ... | ... |

### SOC 2 Trust Service Criteria

| Criteria | Status | Evidence |
|----------|--------|----------|
| CC6.1 Logical Access | ✓ Addressed | S4 Section 7.1 |
| CC6.2 Auth Mechanisms | ⚠ Partial | SEC-001 |
| CC6.3 Access Removal | ✓ Addressed | S4 Section 7.1 |
| ... | ... | ... |

## MITRE ATT&CK Detection Coverage

| Technique ID | Name | Relevance | Detection Designed | Evidence |
|--------------|------|-----------|-------------------|----------|
| T1078 | Valid Accounts | High | ⚠ Partial | Logging yes, alerting no (SEC-002) |
| T1190 | Exploit Public App | High | ✓ Yes | WAF + app logging |
| T1110 | Brute Force | High | ⚠ Partial | Rate limiting, no alerting |
| T1059 | Command Execution | Medium | ✓ Yes | Input validation, CSP |

## Jira Spot Check

### High-Priority Threats Checked

| Threat | Severity | Jira Story | Status |
|--------|----------|------------|--------|
| THR-001 Session hijacking | Critical | SEC-123 | ✓ Covered |
| THR-002 SQL injection | Critical | SEC-124 | ✓ Covered |
| THR-003 Privilege escalation | High | SEC-125 | ✓ Covered |
| THR-005 Data exfiltration | High | — | ✗ No story |
| THR-007 Auth bypass | High | SEC-127 | ✓ Covered |

**Spot Check Result:** 4/5 passed (THR-005 gap noted)

## Conditions (if Approved with Conditions)

The following must be addressed before go-live:

1. **SEC-001 (High)**: Password policy must be added to S4 security architecture
2. **SEC-002 (High)**: Failed authentication alerting must be designed
3. **THR-005**: Create Jira story for data exfiltration controls

## Recommendations

- [ ] Add password policy to S4 Section 7.1 (addresses SEC-001)
- [ ] Design alerting for failed auth attempts (addresses SEC-002)
- [ ] Create Jira story for THR-005 data exfiltration controls
- [ ] Consider adding security headers to infrastructure-as-code (SEC-003)

## Jira Tickets Created

| Finding | Jira Key | Priority |
|---------|----------|----------|
| SEC-001 | PROJ-456 | High |
| SEC-002 | PROJ-457 | High |
| THR-005 gap | PROJ-458 | High |

[Or: "No Jira tickets created — user declined"]

## Assessment Metadata

| Metric | Value |
|--------|-------|
| Artifacts reviewed | S4, S5, S7 |
| Frameworks assessed | 4 |
| Total findings | 6 |
| Critical findings | 0 |
| High findings | 2 |
| Jira spot check | 4/5 passed |
| Jira tickets created | 3 |
| Assessment date | YYYY-MM-DD |
```

## Verdict Definitions

| Verdict | Criteria | Next Step |
|---------|----------|-----------|
| **Approved** | No Critical or High findings | Proceed to S9 |
| **Approved with Conditions** | No Critical; High findings documented with plan | Proceed to S9 with conditions |
| **Not Approved** | Critical findings present | Resolve before continuing |

## Severity Definitions

| Severity | Definition | Examples |
|----------|------------|----------|
| **Critical** | Fundamental security gap | Missing authentication, unencrypted PII, no access control |
| **High** | Significant framework gap | Missing ASVS section, no detection for key threats |
| **Medium** | Partial coverage | Control designed but incomplete |
| **Low** | Minor improvement | Documentation gaps, defence-in-depth |

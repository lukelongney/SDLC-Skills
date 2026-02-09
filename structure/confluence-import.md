# SDLC Skills Architecture - Confluence Import Guide

## Option 1: Single Page with Expand Macros (Recommended)

Copy the content below into a new Confluence page. The `{expand}` macros create collapsible sections.

---

# SDLC Skills Framework

{status:colour=Blue|title=Version 1.0}

This framework provides AI-assisted skills for the concept and design phase of enterprise software delivery.

## Skill Chain Overview

{expand:title=View Full Skill Chain}
| Order | Skill | Type | Purpose |
|-------|-------|------|---------|
| S1 | Concept Brief | Interactive | Problem definition and scope |
| S2 | Feasibility Assessment | Interactive | Viability analysis |
| S3 | High Level Requirements | Interactive | Requirements elicitation (v1→v2→v3) |
| S4 | Solution Architecture | Interactive | Technical design |
| S5 | Threat Modelling | Interactive | Security analysis (STRIDE) |
| S6 | Design Validation | Agentic | Cross-artifact validation |
| S7 | Jira Project Scaffolding | Interactive | Epic/story creation |
| S8 | Security Assessment | Agentic | Independent security review |
| S9 | Operational Readiness | Interactive | Go-live preparation |
{expand}

---

## S1 — Concept Brief

{status:colour=Green|title=Interactive}

*Position:* First skill — initiates the chain

{expand:title=Purpose}
Collaborative problem definition and scope identification. Helps stakeholders articulate the business problem, identify affected areas, and establish project boundaries.
{expand}

{expand:title=Inputs}
* User's initial idea or problem statement
* Business context from conversation
* Optional: Confluence/Jira discovery via MCP
{expand}

{expand:title=Outputs}
* Primary: `docs/concept-briefs/YYYY-MM-DD-<topic>-concept-brief.md`
* YAML frontmatter as context summary for downstream skills
{expand}

{expand:title=Key Sections}
| Section | Description |
|---------|-------------|
| Problem Statement | What problem are we solving? |
| Affected Business Areas | Who is impacted? |
| Proposed Scope | What's in and out? |
| Success Criteria | How do we know we succeeded? |
| Initial Risks | What could go wrong? |
{expand}

---

## S2 — Feasibility Assessment

{status:colour=Green|title=Interactive}

*Position:* Second skill — receives S1

{expand:title=Purpose}
Structured viability analysis covering technical, operational, economic, and scheduling dimensions. Produces go/no-go recommendation with ROM estimates.
{expand}

{expand:title=Inputs}
* S1 Concept Brief
* Platform context (Azure, Salesforce, .NET, etc.)
* Optional: Codebase analysis via MCP
{expand}

{expand:title=Outputs}
* Primary: `docs/feasibility/YYYY-MM-DD-<topic>-feasibility.md`
* ROM estimates and risk assessment
* Go/Conditional Go/No-Go recommendation
{expand}

{expand:title=Assessment Dimensions}
| Dimension | Focus |
|-----------|-------|
| Technical | Can we build it? |
| Operational | Can we run it? |
| Economic | Is it worth it? |
| Schedule | Can we deliver in time? |
{expand}

---

## S3 — High Level Requirements

{status:colour=Green|title=Interactive}

*Position:* Third skill — iterates through v1→v2→v3

{expand:title=Purpose}
Structured requirements elicitation producing capability-grouped requirements with MoSCoW prioritisation. Iterates based on architecture (v2) and security (v3) feedback.
{expand}

{expand:title=Version Evolution}
| Version | Trigger | Additions |
|---------|---------|-----------|
| v1 | After S2 approval | Initial requirements |
| v2 | After S4 architecture | Technical constraints, refined NFRs |
| v3 | After S5 threat model | Security requirements |
{expand}

{expand:title=Outputs}
* Primary: `docs/requirements/YYYY-MM-DD-<topic>-requirements.md`
* Capability groups with functional and non-functional requirements
* MoSCoW prioritisation and complexity ratings
{expand}

---

## S4 — Solution Architecture

{status:colour=Green|title=Interactive}

*Position:* Fourth skill — most judgment-heavy

{expand:title=Purpose}
Deep collaborative solution design. Extended back-and-forth with architect expected. Produces architecture with ADRs and feeds back to S3 for v2.
{expand}

{expand:title=Inputs}
* S1 Concept Brief
* S2 Feasibility Assessment
* S3 v1 Requirements
* Codebase analysis
{expand}

{expand:title=Outputs}
* Primary: `docs/architecture/YYYY-MM-DD-<topic>-architecture.md`
* Secondary: `docs/traceability/YYYY-MM-DD-<topic>-traceability.md`
* ADRs embedded in document
* Feedback for S3 v2
{expand}

{expand:title=Architecture Sections}
| Section | Content |
|---------|---------|
| System Context | C4 context diagram |
| Component Architecture | Logical components |
| Data Architecture | Data model and flows |
| Integration Architecture | APIs and messaging |
| Infrastructure | Compute, networking, storage |
| Security Architecture | Identity, encryption, network security |
| ADRs | Architecture Decision Records |
{expand}

---

## S5 — Threat Modelling

{status:colour=Green|title=Interactive}

*Position:* Fifth skill — security-focused

{expand:title=Purpose}
Collaborative threat modelling using STRIDE methodology and OWASP ASVS control mapping. Produces security requirements for S3 v3.
{expand}

{expand:title=STRIDE Categories}
| Category | Threat Type |
|----------|-------------|
| S | Spoofing — Can attacker impersonate? |
| T | Tampering — Can attacker modify data? |
| R | Repudiation — Can attacker deny actions? |
| I | Information Disclosure — Can attacker access data? |
| D | Denial of Service — Can attacker disrupt? |
| E | Elevation of Privilege — Can attacker gain access? |
{expand}

{expand:title=Outputs}
* Primary: `docs/threat-models/YYYY-MM-DD-<topic>-threat-model.md`
* STRIDE analysis per component
* OWASP ASVS control mapping
* Security requirements addendum for S3 v3
{expand}

---

## S6 — Design Validation

{status:colour=Yellow|title=Agentic}

*Position:* Sixth skill — autonomous gate before Jira

{expand:title=Purpose}
Autonomous cross-validation of all design artifacts (S1-S5). Checks traceability, completeness, consistency, and pattern compliance. Must pass before Jira scaffolding.
{expand}

{expand:title=Validation Categories}
| Category | Checks |
|----------|--------|
| Traceability | Scope → Requirements → Architecture → Threats |
| Completeness | All required sections present |
| Consistency | No contradictions between artifacts |
| Pattern Compliance | Technologies against approved patterns |
{expand}

{expand:title=Verdicts}
| Verdict | Meaning | Next Step |
|---------|---------|-----------|
| {status:colour=Green|title=Ready} | All checks pass | Proceed to S7 |
| {status:colour=Yellow|title=Ready with Conditions} | Warnings only | Proceed with noted conditions |
| {status:colour=Red|title=Not Ready} | Critical issues | Resolve before continuing |
{expand}

{expand:title=Output}
* Primary: `docs/validation/YYYY-MM-DD-<topic>-design-validation.md`
{expand}

---

## S7 — Jira Project Scaffolding

{status:colour=Green|title=Interactive}

*Position:* Seventh skill — translates design to work items

{expand:title=Purpose}
Translates validated design artifacts into Jira epics and stories. Creates technical enablers, security stories, and user stories with acceptance criteria.
{expand}

{expand:title=Story Types}
| Type | Source | Example |
|------|--------|---------|
| User Stories | S3 Requirements | "As a user, I can..." |
| Technical Enablers | S4 Architecture | Infrastructure, frameworks |
| Security Stories | S5 Threat Model | Control implementations |
{expand}

{expand:title=Outputs}
* Jira epics aligned to capability groups
* Stories with acceptance criteria
* Technical enabler stories from ADRs
* Security stories from threat mitigations
{expand}

---

## S8 — Security Assessment

{status:colour=Yellow|title=Agentic}

*Position:* Eighth skill — independent verification

{expand:title=Purpose}
Independent security assessment against OWASP ASVS and compliance frameworks. Autonomous verification separate from S5 collaborative threat modelling.
{expand}

{expand:title=Frameworks}
* OWASP ASVS 5.0
* MITRE ATT&CK (detection coverage)
* Compliance: SOC 2, ISO 27001
{expand}

---

## S9 — Operational Readiness

{status:colour=Green|title=Interactive}

*Position:* Ninth skill — go-live preparation

{expand:title=Purpose}
Collaborative operational readiness assessment. Validates monitoring, alerting, runbooks, and support processes before go-live.
{expand}

---

## Context Flow

{expand:title=How Skills Share Context}
Each skill produces YAML frontmatter as a compressed context summary:

{code}
---
type: concept-brief
status: approved
problem_summary: "Brief problem statement"
scope_items: ["item1", "item2"]
risk_count: 3
---
{code}

Downstream skills read frontmatter to understand upstream decisions without reading full documents.
{expand}

---

## Output Locations

| Artifact Type | Location |
|---------------|----------|
| Concept Briefs | `docs/concept-briefs/` |
| Feasibility | `docs/feasibility/` |
| Requirements | `docs/requirements/` |
| Architecture | `docs/architecture/` |
| Traceability | `docs/traceability/` |
| Threat Models | `docs/threat-models/` |
| Validation | `docs/validation/` |

---

## How to Import

### Method 1: Copy-Paste with Confluence Editor
1. Create a new Confluence page
2. Switch to wiki markup mode (or use the markup macro)
3. Paste the content above
4. Confluence will render the `{expand}`, `{status}`, and `{code}` macros

### Method 2: REST API Import
Use Confluence REST API to create pages programmatically:
{code}
curl -X POST \
  https://your-domain.atlassian.net/wiki/rest/api/content \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "page",
    "title": "SDLC Skills Framework",
    "space": {"key": "YOUR_SPACE"},
    "body": {
      "storage": {
        "value": "<your-content-here>",
        "representation": "wiki"
      }
    }
  }'
{code}

### Method 3: Confluence CLI
If you have Confluence CLI installed:
{code}
confluence --action addPage --space "YOUR_SPACE" --title "SDLC Skills Framework" --file confluence-content.txt
{code}

---

## Option 2: Page Hierarchy (Multiple Pages)

For larger installations, create a page hierarchy:

* SDLC Skills Framework (parent)
  * S1 — Concept Brief
  * S2 — Feasibility Assessment
  * S3 — High Level Requirements
  * S4 — Solution Architecture
  * S5 — Threat Modelling
  * S6 — Design Validation
  * S7 — Jira Project Scaffolding
  * S8 — Security Assessment
  * S9 — Operational Readiness
  * Context Flow
  * Output Locations

Each child page contains the detailed content for that skill.

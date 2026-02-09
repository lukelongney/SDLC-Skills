# S2 — Feasibility & Impact Assessment: Skill Design

**Date:** 2026-02-05
**Status:** Draft
**Skill Type:** Project-level, interactive conversational
**Position in Chain:** Second skill — receives Concept Brief from S1, feeds S3

---

## Purpose

Evaluate technical viability, financial justification, organisational feasibility, and change impact for an initiative defined by the S1 Concept Brief. Produces a single assessment document with an executive investment summary suitable for steering committee / investment board review.

S2 operates at **moderate technical depth** — enough to produce a ballpark estimate and flag areas of particular challenge or novelty, but does not make solution design decisions (that is S5's responsibility).

S2 introduces an **AI-assisted delivery lens** — comparing traditional delivery estimates against AI-augmented approaches to quantify acceleration opportunities and flag limitations.

---

## Inputs

- S1 Concept Brief at `docs/concept-briefs/YYYY-MM-DD-<topic>.md`
- Reads YAML frontmatter as compressed context summary
- If no Concept Brief found: asks user to point to one or run S1 first

---

## Outputs

### Primary: Feasibility & Impact Assessment
- Single document: `docs/feasibility/YYYY-MM-DD-<topic>-feasibility.md`
- YAML frontmatter doubles as Context Summary consumed by S3
- Contains: Executive Investment Summary, Feasibility Assessment (with contextual diagrams), ROM Estimate (baseline + AI-assisted), Change Impact Assessment, Recommendation
- Optionally published to Confluence if MCP server is available

### Handoff
- S3 (Requirements Extraction) reads the frontmatter for compressed context
- S2 does not automatically trigger S3 — the human decides when to proceed

---

## Conversation Flow

### Phase 1 — Intake & Orientation

1. Locate and read the S1 Concept Brief
2. Summarise understanding: "Here's what I took from the Concept Brief — correct?"
3. If no Concept Brief found: ask user to point to one or suggest running S1 first
4. Ask the user for change impact depth preference:
   - **High level** — who's affected, what changes, what training
   - **Detailed** — adds transition planning signals: communication needs, adoption risks, support model changes

### Phase 2 — Feasibility Analysis

Probe across four dimensions one at a time. For each, skill proposes an assessment based on the Concept Brief, human validates with institutional knowledge.

**Dimension 1: Technical Viability**
- Known constraints and integration complexity
- Capability gaps (new technology, skills, infrastructure)
- Areas of particular challenge or novelty
- Enough depth for a ballpark estimate and to flag hard parts
- Propose two contextual design diagrams (see Contextual Diagrams section below)
- Confidence level

**Dimension 2: Financial Justification**
- Expected benefits (reference Concept Brief)
- Cost drivers and assumptions
- Funding model considerations

**Dimension 3: Organisational Feasibility**
- Capacity and resourcing availability
- Competing priorities
- Skills and knowledge gaps
- Sponsor and stakeholder alignment

**Dimension 4: Change Impact**
- Affected roles and teams
- Process changes (current → future)
- Training requirements
- If detailed depth selected: communication needs, adoption risks, support model changes

**Questioning rules:**
- One question per message
- Prefer multiple choice when possible
- Propose assessments for the user to validate, don't ask the user to write them
- Adapt to what the Concept Brief already covers

### Phase 3 — ROM & AI Assessment

**Baseline (Traditional Delivery):**
- Propose T-shirt size estimate (XS/S/M/L/XL) with mapped duration and cost ranges
- Identify key effort drivers

**AI-Assisted Delivery:**
- Assess AI acceleration potential across four areas:
  - Development velocity (code generation, boilerplate reduction, test automation)
  - Documentation & analysis (requirements refinement, architecture docs, threat modelling)
  - Testing (automated test generation, broader coverage)
  - Knowledge acceleration (faster ramp-up on unfamiliar systems/domains)
- Propose adjusted T-shirt size with mapped duration and cost ranges

**AI Limitations & Risks:**
- Flag where AI assistance is limited or risky for this specific initiative
- Examples: heavy regulatory domain requiring significant human review, novel integration with no training data, sensitive data handling constraints
- Provide a balanced view, not an optimistic-only assessment

**Present the delta** between baseline and AI-assisted approaches.

### Phase 4 — Context Discovery (MCP Checkpoint)

Same pattern as S1:
1. Propose targeted searches based on feasibility findings
2. Present search plan to user for confirmation
3. User confirms, refines, or skips
4. Execute confirmed searches, present results
5. User selects relevant findings to incorporate
6. If MCP not available: skip silently

### Phase 5 — Document Construction & Review

1. Draft each section iteratively (200-300 words per section)
2. Present to user: "Does this capture it correctly?"
3. Revise based on feedback before moving to next section
4. Present complete document for final review
5. On approval: write to `docs/feasibility/YYYY-MM-DD-<topic>-feasibility.md` with `status: approved`
6. If Confluence MCP available: offer to publish as page with labels
7. Git handling: same pattern as S1 (check repo exists, ask to commit, handle missing repo)
8. Present handoff summary pointing to S3

---

## Contextual Design Diagrams

During Technical Viability assessment, S2 proposes two diagrams. Both are generated as Mermaid. User reviews each and chooses to keep or discard.

### Business Domain Map
- Shows which business domains/capabilities are involved and how they relate
- Purely business language — no technology
- Example: "Customer Onboarding → Identity Verification → Account Management"
- Audience: business stakeholders

### Conceptual System Context Diagram
- Shows the solution idea as a central element with business systems and actors it touches
- Like a C4 Context diagram but at business level — no technology choices
- Audience: technical reviewers validating scope assumptions

**Behaviour:**
- S2 generates both diagrams
- Presents each to user for review
- User decides what stays in the final document: both, one, or neither
- Diagrams are embedded in the Technical Viability section of the output document

---

## Document Structure

```markdown
---
type: feasibility-assessment
status: draft | review | approved
created: YYYY-MM-DD
concept_brief: [path to S1 output]
# --- Context Summary (consumed by S3) ---
recommendation: proceed | proceed-with-conditions | defer | reject
estimated_size: XS | S | M | L | XL
baseline_duration: [range e.g. "3-6 months"]
ai_assisted_duration: [range e.g. "2-4 months"]
key_risks: [top 3 risk summaries]
conditions: [conditions for proceeding, if any]
change_impact_depth: high-level | detailed
---

# Feasibility & Impact Assessment: [Title]

## Executive Investment Summary
2-3 paragraphs for steering committee. Problem, recommendation,
cost/time range, key risks, conditions. Stands alone — readable
without the rest of the document.

## Feasibility Assessment

### Technical Viability
- Known constraints and integration complexity
- Capability gaps (new technology, skills, infrastructure)
- Areas of particular challenge or novelty
- Confidence level: high | medium | low

#### Business Domain Map (if kept by user)
[Mermaid diagram — business domains and relationships]

#### Conceptual System Context (if kept by user)
[Mermaid diagram — solution idea with surrounding systems and actors]

### Financial Justification
- Expected benefits (reference Concept Brief)
- Cost drivers and assumptions

### Organisational Feasibility
- Capacity and resourcing
- Competing priorities
- Skills and knowledge gaps

## ROM Estimate

### Baseline (Traditional Delivery)
| Dimension | T-Shirt Size | Range |
|-----------|-------------|-------|
| Effort | XS/S/M/L/XL | [duration] |
| Cost | XS/S/M/L/XL | [range] |
| Team Size | | [range] |

### AI-Assisted Delivery
| Dimension | T-Shirt Size | Range |
|-----------|-------------|-------|
| Effort | XS/S/M/L/XL | [duration] |
| Cost | XS/S/M/L/XL | [range] |
| Team Size | | [range] |

### AI Opportunity Assessment
| Area | Acceleration Potential | Notes |
|------|----------------------|-------|
| Development velocity | High/Med/Low | [specifics for this initiative] |
| Documentation & analysis | High/Med/Low | [specifics] |
| Testing | High/Med/Low | [specifics] |
| Knowledge acceleration | High/Med/Low | [specifics] |

### AI Limitations & Risks
| Constraint | Impact | Mitigation |
|-----------|--------|------------|
| [e.g. regulatory domain] | [e.g. heavy human review needed] | [approach] |

### Estimate Delta
Summary of difference between baseline and AI-assisted approaches.

## Change Impact Assessment

### Affected Roles & Teams
| Role/Team | Nature of Impact |
|-----------|-----------------|
| [role] | New process / Changed process / New tool / Retired process |

### Process Changes
- [Current process → future process]

### Training Requirements
| Audience | Training Need | Priority |
|----------|--------------|----------|
| [who] | [what] | High/Med/Low |

### Transition Planning Signals (if detailed depth selected)
- Communication needs
- Adoption risks
- Support model changes

## Recommendation
Proceed | Proceed with Conditions | Defer | Reject

### Conditions (if applicable)
- [Condition that must be met before proceeding]

## Open Questions
- [ ] [Unresolved items needing stakeholder input]

## Source Material
References to Concept Brief, existing documentation, and MCP findings.
```

---

## MCP Integration

Same pattern as S1 — all optional, graceful degradation.

| Server | Access | Purpose |
|--------|--------|---------|
| Confluence Cloud | Read + Write | Read: search for related feasibility studies, cost benchmarks. Write: publish approved assessment |
| Jira Cloud | Read only | Search for related initiatives, capacity data, in-progress work |
| GitHub | Read only | Search for related repos to inform technical viability assessment |

---

## What S2 Does NOT Do

- Automatically trigger S3 — human decides when to proceed
- Create or modify Jira issues — read-only
- Make solution design or architecture decisions — that's S5
- Provide precise cost estimates — T-shirt sizing only, component-based ROM comes later
- Create a full change management plan — that's S9. S2 only flags impact and signals
- Auto-commit to git

---

## Architectural Principles Applied

| Principle | How S2 Applies It |
|-----------|-------------------|
| Dual Output Strategy | Full assessment (markdown) + compressed Context Summary (frontmatter) |
| Confluence as Persistent Memory | Publishes to Confluence for steering committee access |
| Interactive Skills Brainstorm | Conversational — skill proposes, human validates with institutional knowledge |
| Human Gates as Context Enrichment | Steering committee review feeds back as conditions for downstream skills |
| Change Management as First-Class | Change impact assessed at feasibility stage, not deferred to later |

---

## Downstream Handoff

| Receiving Skill | What It Gets | From Where |
|-----------------|--------------|------------|
| S3 — Requirements Extraction | Frontmatter context summary (recommendation, size, risks, conditions) + full assessment | `docs/feasibility/YYYY-MM-DD-<topic>-feasibility.md` |

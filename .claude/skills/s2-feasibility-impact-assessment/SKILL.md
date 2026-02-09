---
name: s2-feasibility-impact-assessment
description: "Use after a Concept Brief (S1) is approved and before requirements gathering (S3). Use when an initiative needs a go/no-go investment decision, feasibility evaluation, change impact analysis, or ROM estimate. Triggers include steering committee preparation, investment board submissions, or when someone asks 'is this feasible?' or 'how big is this?'."
---

# S2 — Feasibility & Impact Assessment

## Overview

Evaluate an initiative's technical viability, financial justification, organisational feasibility, and change impact. Produces a single assessment document with an executive investment summary for steering committee review. Includes baseline and AI-assisted delivery estimates.

This is **not** solution design — S2 goes deep enough for a ballpark estimate and to flag the hard parts, but architecture decisions belong to S5.

## Entry

1. Locate the S1 Concept Brief — check `docs/concept-briefs/` for the most recent, or use path from `$ARGUMENTS`
2. Read the frontmatter context summary
3. Summarise understanding: "Here's what I took from the Concept Brief — correct?"
4. If no brief found: ask user to point to one or suggest running S1 first

## Process

### Phase 1 — Orientation

After confirming Concept Brief understanding, ask the user:

**Change impact depth:** "How deep should the change impact assessment go?"
- **High level** — who's affected, what changes, what training
- **Detailed** — adds transition planning signals: communication needs, adoption risks, support model changes

### Phase 2 — Feasibility Analysis

Probe four dimensions. For each, **propose an assessment for the user to validate** — don't ask the user to write it. One question at a time.

| Dimension | What to Assess |
|-----------|---------------|
| Technical Viability | Constraints, integration complexity, capability gaps, areas of challenge/novelty. Enough for a ballpark, not solution design |
| Financial Justification | Expected benefits, cost drivers, assumptions, funding considerations |
| Organisational Feasibility | Capacity, competing priorities, skills gaps, stakeholder alignment |
| Change Impact | Affected roles, process changes, training. If detailed: communication, adoption risks, support model |

**During Technical Viability**, propose two Mermaid diagrams:
1. **Business Domain Map** — business domains/capabilities and their relationships. No technology.
2. **Conceptual System Context** — solution idea centrally with surrounding systems and actors. Business level.

Present each diagram to the user. They review and choose to keep or discard each one.

### Phase 3 — ROM & AI Assessment

**Baseline estimate:** T-shirt size (XS/S/M/L/XL) mapped to duration and cost ranges for traditional delivery.

**AI-assisted estimate:** Assess acceleration potential across:
- Development velocity (code generation, boilerplate, test automation)
- Documentation & analysis (requirements, architecture docs, threat modelling)
- Testing (automated generation, broader coverage)
- Knowledge acceleration (faster ramp-up on unfamiliar systems/domains)

**AI limitations:** Flag where AI assistance is limited or risky for this specific initiative. Provide a balanced view — not optimistic-only.

**Present the delta** between baseline and AI-assisted approaches.

### Phase 4 — Context Discovery (MCP Checkpoint)

Same pattern as S1. Check for available Confluence/Jira/GitHub tools.

**If available:** Propose search plan, wait for user confirmation, execute, present findings.
**If not available:** Skip silently — "No external integrations configured — continuing with what we've discussed."

### Phase 5 — Document Construction & Review

Draft using template in [feasibility-template.md](feasibility-template.md).

1. Draft each section (200-300 words), validate with user
2. Present complete document for final review
3. On approval: write to `docs/feasibility/YYYY-MM-DD-<topic>-feasibility.md` with `status: approved`
4. If Confluence MCP available: offer to publish
5. Git handling: check repo exists, ask to commit, check for git skills, never auto-commit
6. Present handoff:
   ```
   Feasibility Assessment approved and saved.

   Next step: S3 — Requirements Extraction
   To continue, invoke the S3 skill. It will read the
   frontmatter from this assessment as its starting context.
   ```

## What S2 Does NOT Do

- Trigger S3 automatically — human decides when to proceed
- Create or modify Jira issues — read-only
- Make solution design or architecture decisions — that's S5
- Provide precise cost estimates — T-shirt sizing only, component ROM comes later
- Create a full change management plan — that's S9. S2 only flags impact and signals
- Auto-commit to git

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Jumping to solution design | Assess feasibility at business + moderate technical level, not architecture |
| Overly precise ROM estimates | T-shirt sizes with ranges. False precision at this stage is harmful |
| AI assessment as pure upside | Always include limitations and risks — balanced view |
| Skipping organisational feasibility | Technical feasibility without org readiness is incomplete |
| Change impact as afterthought | Assess alongside other dimensions, not tacked on at the end |
| Diagrams with technology choices | Domain map and system context stay at business level — no tech stack |
| Forcing both diagrams on user | Propose both, user keeps or discards each |

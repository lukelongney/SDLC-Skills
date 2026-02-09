---
name: s1-intake-concept-framing
description: "Use when starting a new initiative, project, or feature concept — the entry point to the SDLC skill chain. Use before feasibility assessment, requirements gathering, or solution architecture. Triggers include new project ideas, strategic mandates, incident-driven initiatives, or when someone says 'I want to build...' or 'we need to...'."
---

# S1 — Intake & Concept Framing

## Overview

Guide the user through structured conversation to produce a **Concept Brief** — the foundational business artifact for a new initiative. This is a **business-level** skill. No technical decisions, no repos, no architecture — that belongs to downstream skills.

## Entry Detection

- If `$ARGUMENTS` contains a link or artifact reference: **warm start** — read it first, summarise understanding, then probe gaps
- If `$ARGUMENTS` contains a topic: **warm start** — use as seed, probe to expand
- If `$ARGUMENTS` is empty: **cold start** — begin with open questioning

For warm starts, always confirm understanding before proceeding.

## Process

### Phase 1 — Problem Framing

Ask probing questions **one at a time** across these dimensions:

| Dimension | What to Establish |
|-----------|-------------------|
| Problem / Opportunity | What's broken or possible? Why now? Current vs future state |
| Benefits & Value | What does success look like? How measured? Who benefits? |
| Scope | What's in? What's explicitly out? |
| Business Areas & Systems | Which teams/divisions affected? Which systems? (business names only) |
| Risks | What could block delivery? Prevent benefit realisation? Organisational concerns? |
| Stakeholders | Sponsor? Business owner? Who else? |
| Open Questions | What don't we know yet? |

**Rules:**
- One question per message
- Prefer multiple choice when possible
- Skip dimensions already covered by user's input
- If user provides a rich initial dump, summarise and probe gaps — don't re-ask

### Phase 2 — Context Discovery (MCP Checkpoint)

Check whether MCP integrations are available (Confluence, Jira, GitHub tools).

**If available:** Propose a search plan based on Phase 1 findings. Present it to the user for confirmation before executing:

```
I'd like to search for related context. Here's my plan:

Confluence:
  - Search for pages mentioning "[key term]"
  - Search space [PROJ] for "[system]" documentation

Jira:
  - Search for open epics/initiatives mentioning "[topic]"

Shall I adjust, add more, or skip?
```

Wait for confirmation. Present results as summary — user selects what's relevant. Use findings to challenge or enrich the brief.

**If not available:** Skip silently. Say: "No external integrations configured — continuing with what we've discussed."

### Phase 3 — Brief Construction

Draft the Concept Brief iteratively using the template in [concept-brief-template.md](concept-brief-template.md).

1. Draft each section in 200-300 words
2. Present to user: "Does this capture it correctly?"
3. Revise based on feedback before moving to next section

**Section order:** Problem/Opportunity, Benefits, Scope, Business Areas & Systems, Risks, Stakeholders, Open Questions, Source Material.

### Phase 4 — Review & Output

1. Present complete brief for final review
2. Revise if requested, re-present
3. On approval: write to `docs/concept-briefs/YYYY-MM-DD-<topic>.md` with `status: approved`
4. If Confluence MCP available: offer to publish as page with labels
5. Git handling:
   - If repo exists: ask "Would you like me to commit this?"
   - If no repo: inform user, ask if they want to initialise or create one
   - Check for available git-related skills and delegate if appropriate
   - Never auto-commit
6. Present handoff:
   ```
   Concept Brief approved and saved.

   Next step: S2 — Feasibility & Impact Assessment
   To continue, invoke the S2 skill. It will read the
   frontmatter from this brief as its starting context.
   ```

## What S1 Does NOT Do

- Trigger S2 automatically — human decides when to proceed
- Create or modify Jira issues — read-only against Jira
- Make technical or architectural decisions — that's S5
- Reference repos, code, or implementation detail in the brief
- Auto-commit to git

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Multiple questions at once | One question per message, always |
| Technical detail in brief (repos, APIs, architecture) | Business concept paper only — technical detail is S5's job |
| MCP search without user confirmation | Always show search plan, wait for approval |
| Risk = delivery risk only | Probe all five categories: delivery, benefit realisation, organisational, dependency, reputational |
| Auto-committing or assuming git repo exists | Always ask, handle missing repo gracefully |
| Skipping final review | Always present complete brief for approval before writing |
| Rigid questioning sequence | Adapt to what user already provided |

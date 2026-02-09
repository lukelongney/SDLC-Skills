# S1 — Intake & Concept Framing: Skill Design

**Date:** 2026-02-05
**Status:** Draft
**Skill Type:** Project-level, interactive conversational
**Position in Chain:** First skill — entry point to the SDLC skill chain

---

## Purpose

Normalise raw inputs (ideas, incidents, strategic mandates, existing documentation) into a structured Concept Brief through guided conversation. The Concept Brief is the foundational artifact that feeds all downstream SDLC skills.

S1 is a **business-level** skill. It focuses on problem framing, opportunity identification, benefits, risks, scope, and impacted business areas. It does **not** make technical or architectural decisions — that is S5's responsibility.

---

## Outputs

### Primary: Concept Brief
- Local markdown file: `docs/concept-briefs/YYYY-MM-DD-<topic>.md`
- YAML frontmatter doubles as the **Context Summary** consumed by S2
- Optionally published to Confluence if MCP server is available

### Handoff
- S2 (Feasibility & Impact Assessment) reads the frontmatter for compressed context
- S1 does not automatically trigger S2 — the human decides when to proceed

---

## Conversation Flow

### Phase 1 — Problem Framing

Determine the entry type and gather core understanding through one-question-at-a-time dialogue.

**Entry detection:**
- **Cold start**: user describes an idea verbally — S1 probes from scratch
- **Warm start**: user points to an existing artifact (Confluence page, Jira ticket, document) — S1 reads it first, confirms understanding, then probes gaps

**Questioning dimensions** (adaptive, not rigid sequence):

| # | Dimension | Example Questions |
|---|-----------|-------------------|
| 1 | Entry point | "Are you starting from an idea, or is there an existing document/ticket I should read first?" |
| 2 | Problem / Opportunity | "What's the problem you're trying to solve?" / "What could be possible that isn't today?" / "Why now?" |
| 3 | Benefits & Value | "What does success look like?" / "How would you measure value?" / "Who benefits most?" |
| 4 | Scope | "What business areas or capabilities are involved?" / "What's explicitly not part of this?" |
| 5 | Business Areas & Systems | "Which teams, divisions, or functions are affected?" / "Which systems or platforms would be impacted?" |
| 6 | Risks | "What could prevent delivery?" / "What could stop the benefits being realised?" / "Any organisational or dependency concerns?" |
| 7 | Stakeholders | "Who sponsors this?" / "Who owns the business outcome?" / "Who else needs to be involved?" |
| 8 | Open Questions | "What don't we know yet that we need to find out?" |

**Behaviour rules:**
- One question per message
- Prefer multiple choice when possible
- Adapt sequence — skip dimensions already covered by the user's initial input
- If warm start, pre-fill what can be inferred from the artifact and validate

### Phase 2 — Context Discovery (MCP Checkpoint)

After gathering enough understanding from Phase 1, S1 proposes targeted searches across available integrations.

**Process:**
1. S1 presents a search plan to the user:
   ```
   I'd like to search for related context. Here's my plan:

   Confluence:
     - Search for pages mentioning "[key business term]"
     - Search space [PROJ] for "[system name]" documentation

   Jira:
     - Search for open epics/initiatives mentioning "[topic]"
     - Check project [KEY] for related work in progress

   Shall I adjust any of these, add more, or skip this step?
   ```
2. User reviews, refines, or skips
3. S1 executes confirmed searches
4. Results presented as summary list — user selects what's relevant
5. S1 uses findings to challenge or enrich the brief: "I found an existing initiative in Jira that overlaps with your scope — should we account for that?"

**Graceful degradation:**
- If MCP servers aren't available, S1 skips this phase entirely
- Says: "No external integrations configured — continuing with what we've discussed"
- No error messaging — just a different conversational path

**Detection:** Skill checks at runtime whether Confluence/Jira/GitHub tools are available.

### Phase 3 — Brief Construction

Iteratively draft the Concept Brief, section by section.

**Process:**
1. Draft each section in 200-300 words
2. Present to user for validation: "Does this capture it correctly?"
3. Revise based on feedback before moving to next section
4. Incorporate MCP findings from Phase 2 where relevant

**Section order:**
1. Problem / Opportunity
2. Benefits
3. Scope (In / Out)
4. Business Areas & Systems Impacted
5. Risks
6. Stakeholders
7. Open Questions
8. Source Material

### Phase 4 — Review & Output

**Review process:**
1. Present complete Concept Brief in full for final review
2. User can request changes to any section — S1 revises and re-presents
3. User explicitly confirms approval

**On approval:**
1. Write file to `docs/concept-briefs/YYYY-MM-DD-<topic>.md` with `status: approved`
2. If Confluence MCP available: publish page, apply labels, link back to local file
3. Ask user about git commit:
   - If git repo exists: "Would you like me to commit this?"
   - If no repo: "No git repository found here. Would you like to initialise one or create a new repo?"
   - Delegate to available git skills if they exist at runtime
4. Present handoff summary:
   ```
   Concept Brief approved and saved.

   Next step: S2 — Feasibility & Impact Assessment
   To continue, invoke the S2 skill. It will read the
   frontmatter from this brief as its starting context.
   ```

**What S1 does NOT do:**
- Automatically trigger S2
- Make any Jira changes (S1 is read-only against Jira)
- Make technical or architectural decisions
- Reference repos, code, or implementation details in the brief

---

## Concept Brief Document Structure

```markdown
---
type: concept-brief
status: draft | review | approved
created: YYYY-MM-DD
author: [name]
stakeholders: [list]
# --- Context Summary (consumed by S2) ---
problem: "One-sentence problem statement"
opportunity: "One-sentence opportunity/value proposition"
scope: [in-scope business domains/capabilities]
out_of_scope: [explicitly excluded items]
affected_business_areas: [divisions, teams, business functions]
affected_systems: [system names at business level]
risk_flags: [pii, customer-facing, regulatory, cross-divisional, etc.]
estimated_complexity: high | medium | low
confidence: high | medium | low
open_questions_count: [number]
source_artifacts:
  confluence: [page IDs or URLs pulled in]
  jira: [issue keys referenced]
---

# Concept Brief: [Title]

## Problem / Opportunity
What is the problem or opportunity? Why does it matter? Why now?
What is the current state? What is the desired future state?

## Benefits
| Benefit | Type | Measurement |
|---------|------|-------------|
| [outcome] | Revenue / Cost / Risk / Efficiency / Compliance | [how measured] |

## Scope
### In Scope
- [Business capability / domain area]

### Out of Scope
- [Explicitly excluded and why]

## Business Areas & Systems Impacted
| Business Area | System/Platform | Nature of Impact |
|---------------|-----------------|------------------|
| [division/team] | [system name] | New / Changed / Retired |

## Risks
| Risk | Category | Likelihood | Impact | Mitigation |
|------|----------|------------|--------|------------|
| [risk] | Delivery / Benefit Realisation / Organisational / Dependency / Reputational | H/M/L | H/M/L | [approach] |

## Stakeholders
| Role | Name/Team | Interest |
|------|-----------|----------|
| Sponsor | | Funding and strategic alignment |
| Business Owner | | Requirements and acceptance |

## Open Questions
- [ ] [Unresolved item needing stakeholder input]

## Source Material
References to existing documentation, strategies, or prior work consulted.
```

---

## Risk Categories

S1 probes for risks across these dimensions during conversation:

| Category | Examples |
|----------|----------|
| **Delivery** | Schedule pressure, resourcing constraints, technical complexity, vendor dependency |
| **Benefit Realisation** | Adoption failure, benefits not measurable, market shift, business case erosion |
| **Organisational** | Change fatigue, competing priorities, skills gap, stakeholder alignment |
| **Dependency** | Upstream/downstream system changes, third-party timelines, shared platform constraints |
| **Reputational** | Customer impact, regulatory exposure, public-facing failure |

S1 does not force all categories — it captures whatever surfaces during the conversation. The categories provide a questioning framework to ensure coverage.

---

## MCP Integration

### Confluence MCP Server (Cloud)
- **Access**: Read + Write
- **Read**: Search for related pages by keyword, space, label
- **Write**: Publish approved Concept Brief as Confluence page with labels
- **Optional**: Fully functional without it

### Jira MCP Server (Cloud)
- **Access**: Read only
- **Read**: Search for related epics, initiatives, in-progress work
- **S1 never creates or modifies Jira issues**
- **Optional**: Fully functional without it

### GitHub MCP Server
- **Access**: Read only
- **Read**: Search for related repos, existing documentation, org context
- **Optional**: Fully functional without it

### Graceful Degradation
- All MCP integrations are optional
- S1 detects available tools at runtime
- If absent: skips Context Discovery phase silently, no error messaging
- The conversational flow adapts — heavier reliance on user-provided context

---

## Git Operations

S1 handles git conservatively:
1. After approval, check if a git repo exists in the working directory
2. If repo exists: ask user if they want to commit
3. If no repo: inform user and ask preference (initialise local, create GitHub repo, or skip)
4. Check for available git-related skills at runtime and delegate if appropriate
5. Never auto-commit — always ask first

---

## Architectural Principles Applied

| Principle | How S1 Applies It |
|-----------|-------------------|
| Dual Output Strategy | Full Concept Brief (markdown) + compressed Context Summary (frontmatter) |
| Confluence as Persistent Memory | Publishes to Confluence for cross-team visibility and audit trail |
| Interactive Skills Brainstorm | Conversational — probing questions, human provides domain context |
| Human Gates as Context Enrichment | Approval review feeds back refinements before handoff |
| Change Management as First-Class | Organisational risks and impacted business areas captured early |

---

## Downstream Handoff

| Receiving Skill | What It Gets | From Where |
|-----------------|--------------|------------|
| S2 — Feasibility & Impact Assessment | Frontmatter context summary + full brief | `docs/concept-briefs/YYYY-MM-DD-<topic>.md` |

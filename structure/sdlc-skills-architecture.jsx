import { useState } from "react";

const phases=[{id:"planning",label:"Phase 1: Planning",color:"#1B4332",accent:"#95D5B2",skills:[
{id:"s1",name:"S1 — Intake & Concept Framing",
mode:"interactive",
interactionPattern:"Conversational brainstorming. Skill asks probing questions, challenges assumptions, surfaces gaps. Human provides domain context, validates scope, answers open questions. Iterates until concept brief is complete and both parties agree on framing.",
summary:"Normalizes raw inputs into a structured Concept Brief through guided conversation. Probes for missing context across business, technical, and compliance dimensions. Includes early regulatory classification that determines which compliance libraries downstream skills pull from.",
inputs:["Stakeholder requests (email, Slack, Teams)","Meeting transcripts and recordings","Business cases from Confluence","Incident/problem tickets from Jira or ServiceNow","Regulatory or audit findings","Industry: TOGAF preliminary phase, BABOK business analysis planning"],
outputs:[{name:"Concept Brief",fields:["Problem statement (business perspective)","Proposed change (plain language)","Scope boundaries (in/out explicit)","Affected systems, services, and teams","Business drivers and success criteria","Known constraints (timeline, budget, regulatory)","Open questions requiring stakeholder input","Regulatory classification flags (PII/PHI/PCI/SOX/GDPR)","Data sensitivity preliminary assessment"]},{name:"Context Summary",fields:["Compressed handoff for downstream skills","Decisions and assumptions log","Compliance trigger flags for S3 scoping"]}],
mcpIntegrations:[{name:"Confluence MCP",direction:"read",operations:["Search project spaces for prior art and related initiatives","Pull ADRs for affected systems","Retrieve domain glossaries and data dictionaries","Access team org structures and RACI matrices","Pull compliance classification templates and regulatory trigger checklists"]},{name:"Jira MCP",direction:"read",operations:["Query related epics/initiatives to detect overlap or dependency","Pull incident history for affected systems (problem context)","Check active in-flight work that may conflict with proposed scope"]},{name:"Git MCP",direction:"read",operations:["Read repo README and architecture docs for affected services","Examine repo structure to understand component boundaries","Check recent commit activity for stability assessment"]}],
gate:{type:"Mandatory human review",criteria:"Validate problem framing, confirm scope boundaries, answer open questions, verify regulatory classification. Stakeholder sign-off before proceeding to feasibility."},
designNotes:"Fundamentally conversational — you can't automate 'what problem are we actually solving?' The skill probes, the human refines. MCP calls happen mid-conversation to pull context as topics surface (e.g., human mentions a service → skill pulls its ADR from Confluence). Completeness checklist prevents premature closure."},

{id:"s2",name:"S2 — Feasibility & Impact Assessment",
mode:"interactive",
interactionPattern:"Guided analysis with human judgment. Skill proposes feasibility dimensions and initial assessment, human provides institutional knowledge — cost assumptions, political landscape, organizational readiness signals, change resistance factors. Iterative refinement of the investment case.",
summary:"Evaluates technical viability, financial justification, organizational feasibility, and business change impact through collaborative analysis. Produces the investment case for steering committee. Includes change management scoping so steering committee sees full organizational cost.",
inputs:["Concept Brief + Context Summary (from S1)","Enterprise architecture landscape from Confluence","Current system state from Git repos","Active portfolio from Jira","Industry: TOGAF Architecture Vision, PMI feasibility, PRINCE2 business case, Prosci ADKAR"],
outputs:[{name:"Feasibility Assessment",fields:["Technical viability — can current architecture support this","ROM cost estimate — infra, licensing, dev effort, change management","Organizational readiness — skills, capacity, change management needs","Portfolio conflict analysis — competing or dependent initiatives","Timeline feasibility — delivery within stated constraints","Build vs. buy vs. extend analysis","Risk-adjusted recommendation: proceed / conditional / defer / reject"]},{name:"Business Change Impact Assessment",fields:["Affected roles and teams — who changes how they work","Process changes — new workflows, deprecated processes, policy updates","Training requirements — scope, audience, estimated effort","Communication plan outline — stakeholder groups and key messages","Transition approach — big bang vs. phased rollout implications","Change resistance risk factors and mitigation strategies"]},{name:"Investment Summary",fields:["One-page executive summary for steering committee","Cost-benefit framing with change management costs included","Go/no-go recommendation with rationale"]}],
mcpIntegrations:[{name:"Confluence MCP",direction:"read + write",operations:["READ: Pull architecture landscape and technology radar","READ: Access capacity planning and team skill matrices","READ: Retrieve cost models and estimation frameworks","READ: Pull portfolio roadmaps for conflict identification","READ: Access change management templates and readiness frameworks","WRITE: Publish feasibility assessment","WRITE: Create investment summary for steering committee"]},{name:"Jira MCP",direction:"read",operations:["Query active programs for portfolio conflict analysis","Pull team allocation and capacity data","Check dependency chains from in-flight work"]},{name:"Git MCP",direction:"read",operations:["Assess codebase complexity for effort estimation","Review tech debt indicators (TODOs, test coverage, dependency age)","Examine infrastructure definitions for scaling feasibility","Check CI/CD maturity for deployment readiness"]}],
gate:{type:"Steering committee / Investment board",criteria:"Funding approval, resource allocation, timeline agreement, change management budget confirmed. Business decision gate — everything before is analysis, everything after is committed delivery."},
designNotes:"The human brings institutional knowledge the AI can't infer — political dynamics, budget cycles, executive priorities, historical context on why similar initiatives succeeded or failed. ROM estimates need human calibration. Change impact identification requires people who know the affected teams personally."},

{id:"s3",name:"S3 — Requirements Extraction",
mode:"interactive",
interactionPattern:"Collaborative decomposition. Skill proposes requirements structure from concept brief and industry frameworks, human refines wording, challenges granularity, adds domain-specific acceptance conditions, negotiates priorities. Requirements are inherently a negotiation between what's wanted and what's feasible.",
summary:"Decomposes concept brief into structured, traceable requirements using IREB, BABOK, IEEE 29148. Compliance classification from S1 determines regulatory libraries. Business change impacts from S2 become trackable requirements. Human and skill iterate on granularity and priority.",
inputs:["Concept Brief + Context Summary (from S1)","Feasibility + Change Impact (from S2)","Enterprise standards from Confluence","Industry: IREB, BABOK, IEEE 29148, NIST 800-53, ISO 27001, OWASP ASVS, WCAG, ISO 25010"],
outputs:[{name:"Requirements Specification",fields:["Functional requirements by capability area (BABOK decomposition)","NFRs baselined to ISO 25010 quality model","Data requirements — entities, classification, retention, lineage","Integration requirements — APIs, events, upstream/downstream","Compliance requirements — mapped to triggered framework controls","Accessibility requirements — WCAG conformance level","Change management requirements — training, process, comms (from S2)","Each req: unique ID, MoSCoW priority, complexity, traceability"]},{name:"Traceability Matrix (skeleton)",fields:["Concept → Requirement ID mapping","Regulatory trigger → Compliance requirement mapping","Change impact → Change management requirement mapping","Forward placeholders for design and Jira stories"]}],
mcpIntegrations:[{name:"Confluence MCP",direction:"read + write",operations:["READ: Pull requirements templates and quality standards","READ: Access compliance libraries (SOX, SOC2, NIST, PCI, GDPR)","READ: Retrieve NFR baselines from architecture standards","READ: Pull data governance policies","READ: Access change management requirement templates","WRITE: Publish requirements spec","WRITE: Create/update traceability matrix"]},{name:"Jira MCP",direction:"read",operations:["Pull issue type schemas and custom field configs","Read component and label taxonomies for alignment"]},{name:"Git MCP",direction:"read",operations:["Read OpenAPI/Swagger specs for integration requirements","Examine DB migration history for current data model","Read test suites for NFR coverage gaps"]}],
gate:{type:"Review with iteration",criteria:"Tech leads, business stakeholders, compliance team, and change management review. May iterate with S5 as design constraints surface."},
designNotes:"Requirements are a negotiation, not an extraction. The skill proposes structure from frameworks, the human brings domain truth. Granularity calibration happens in dialogue — the skill asks 'is this one requirement or three?' and the human decides based on how they want to track and deliver."},

{id:"s4",name:"S4 — Jira Project Scaffolding",
mode:"interactive",
interactionPattern:"Propose-and-refine. Skill generates initial project structure from requirements and design, presents it for review. Human adjusts decomposition, story boundaries, estimates, dependency links. Once structure is agreed, bulk creation is automated. Less conversational than S1–S3, more review-oriented.",
summary:"Translates requirements and solution design into Jira structure using SAFe, INVEST, Gherkin. Human reviews proposed decomposition and estimates before automated bulk creation. Includes change management stories alongside technical delivery.",
inputs:["Requirements Specification (from S3)","Solution Design (from S5 — iterative)","Traceability Matrix (from S3)","Jira project configuration","Industry: SAFe backlog patterns, INVEST, Gherkin format"],
outputs:[{name:"Jira Project Structure",fields:["Epics via SAFe feature decomposition","Stories with INVEST criteria and Gherkin AC","Technical enablers from solution design","NFR stories from ISO 25010 attributes","Change management stories — training, comms, process transition","Cross-cutting stories (audit, perf testing, runbooks)","Dependency links (technical and business)","Compliance traceability via labels/custom fields","T-shirt estimates using relative estimation"]},{name:"Updated Traceability Matrix",fields:["Full: Concept → Requirement → Design → Jira Issue","Compliance requirement → Story for audit evidence"]}],
mcpIntegrations:[{name:"Jira MCP",direction:"read + write",operations:["READ: Pull project config — issue types, workflows, fields","READ: Query team velocity for estimation calibration","WRITE: Create epics referencing requirement IDs","WRITE: Create stories with Gherkin AC","WRITE: Create technical enablers and CM stories","WRITE: Set dependency links, labels, components","WRITE: Attach traceability via custom fields"]},{name:"Confluence MCP",direction:"write",operations:["Update traceability matrix with Jira links","Publish project kickoff page"]}],
gate:{type:"Technical lead review",criteria:"Validate INVEST compliance, estimate sanity, dependency mapping, full requirements coverage including change management stories. Backlog refinement."},
designNotes:"Lighter-touch interaction than S1–S3. The skill does the heavy lifting of decomposition and the human reviews the result. The key interaction is the human saying 'that story is too big, split it' or 'those two stories should be one' or 'that estimate feels low.' Once agreed, Jira API bulk creation runs autonomously."},

]},{id:"design",label:"Phase 2: Design & Architecture",color:"#0B3D91",accent:"#90CAF9",skills:[

{id:"s5",name:"S5 — Solution Architecture",
mode:"interactive",
interactionPattern:"Deep collaborative design. Skill proposes architecture grounded in codebase analysis, human challenges patterns, raises constraints invisible to the AI, iterates on trade-offs. The architect drives, the AI accelerates. Most judgment-heavy skill in the chain — expect extended back-and-forth on key decisions.",
summary:"Solution design grounded in codebase via Git MCP, structured using TOGAF, C4, arc42. Architect and skill iterate on patterns, trade-offs, and constraints. Includes standards conformance, data governance, and third-party dependency flagging.",
inputs:["Requirements Spec (from S3)","Context Summary (from S3)","Architecture docs from Confluence","Codebase from Git","Industry: TOGAF ADM D-E, C4 model, arc42, 12-factor app"],
outputs:[{name:"Solution Design Document",fields:["Architecture approach and patterns (arc42)","C4 context, container, component diagrams","Sequence diagrams (Mermaid/PlantUML)","Data model — tables, schema mods, migration","Data governance — classification, lineage, retention, cross-border","API design — OpenAPI spec output","Security design — authZ, audit, encryption","Infrastructure — resources, scaling, cost","Integration — contracts, events, error handling","Third-party register — vendors, OSS licensing, procurement triggers","Rollout — feature flags, migration, backward compat","Standards conformance checklist"]},{name:"Architecture Decision Records",fields:["One ADR per decision (Nygard format)","Context, decision, consequences, alternatives","Conformance: compliant / waiver / exception"]},{name:"Risk Register",fields:["Technical risks","Vendor/third-party risks","Data governance risks"]}],
mcpIntegrations:[{name:"Git MCP",direction:"read",operations:["Read repo structures for component boundaries","Examine code patterns — DI, error handling, logging, auth","Parse OpenAPI specs for API landscape","Read DB migrations for schema evolution","Analyze Dockerfiles/CI/CD for deployment topology","Read IaC for resource definitions","Check manifests for OSS licensing","Examine tests and coverage","Read configs for configuration surface"]},{name:"Confluence MCP",direction:"read + write",operations:["READ: Architecture standards and tech radar","READ: Approved technology list for conformance","READ: Existing ADRs for consistency","READ: NFR baselines, SLAs, runbooks","READ: Data governance policies","WRITE: Publish solution design","WRITE: Create ADR pages","WRITE: Update architecture diagrams"]},{name:"Jira MCP",direction:"read",operations:["Pull requirements for cross-reference","Check in-flight work for conflict risk"]}],
gate:{type:"Architecture review board",criteria:"Standards conformance, approved tech compliance/waiver, security, scalability, operational readiness, cost, data governance, vendor triggers flagged."},
designNotes:"Most judgment-heavy skill. The architect brings trade-off context, political constraints, and experiential knowledge of what works in their org. AI accelerates by grounding proposals in actual codebase via Git and maintaining structural consistency via frameworks. Extended sessions expected."},

{id:"s6",name:"S6 — Threat Modeling",
mode:"interactive",
interactionPattern:"Guided security analysis. Skill proposes threat model from design artifacts and frameworks, security engineer validates assumptions, adjusts trust boundaries, refines likelihood assessments based on organizational threat intelligence. Collaborative but structured — STRIDE provides the skeleton.",
summary:"Threat models using STRIDE, OWASP, MITRE ATT&CK through collaborative analysis with security engineer. Companion to S5 with bidirectional feedback. Distinct from S8's independent assessment — S6 is collaborative during design, S8 is adversarial review of finished package.",
inputs:["Solution Design (from S5)","Security standards from Confluence","Security controls from Git","Industry: STRIDE, OWASP Top 10/ASVS, MITRE ATT&CK, NIST 800-53, CIS Controls"],
outputs:[{name:"Threat Model",fields:["Data flow diagrams with trust boundaries","STRIDE per component and data flow","OWASP ASVS verification mapped to design","Attack surface with MITRE ATT&CK mapping","Threats ranked by DREAD scoring","Controls mapped to NIST 800-53 families","Compliance mapping (req → control → evidence)"]},{name:"Security Requirements Addendum",fields:["New security requirements from threat modeling","Fed back into S3 and S5","OWASP ASVS items for testing"]}],
mcpIntegrations:[{name:"Git MCP",direction:"read",operations:["Examine auth/authZ implementations","Read security middleware and validation","Check manifests for vulnerable libraries","Review secrets management","Analyze logging for audit completeness","Check security headers and CORS"]},{name:"Confluence MCP",direction:"read + write",operations:["READ: Security standards and control libraries","READ: Previous threat models","READ: Compliance framework mappings","WRITE: Publish threat model","WRITE: Update risk register"]}],
gate:{type:"Security team review",criteria:"Validate threat model, review controls, confirm residual risk. Findings may trigger S5 iteration."},
designNotes:"Interactive because threat likelihood and trust boundary placement require human judgment informed by organizational threat intelligence. The AI proposes from frameworks, the security engineer refines from experience. But S6 is still collaborative — the adversarial independent review is S8's job."},

{id:"s7",name:"S7 — Design Validation",
mode:"agentic",
interactionPattern:"Fully autonomous cross-validation. Agent reads all artifacts from S1–S6 via Confluence and Jira MCP, runs systematic completeness and consistency checks, produces gap report. Human reviews findings at the gate — approves, or sends items back for iteration. No brainstorming needed.",
summary:"Autonomous cross-validation of the complete design package. Systematically checks: every requirement has a design decision and Jira story, standards compliance, dependency confirmation, estimation confidence. Produces gap report for human review. Completeness gate before S8/S9.",
inputs:["All outputs from S1–S6","Enterprise standards","System landscape from Confluence and Git","Team capacity from Jira"],
outputs:[{name:"Design Readiness Assessment",fields:["Requirements coverage — every req to design and story","Standards compliance checklist results","Gap analysis — unaddressed reqs, pending decisions","Dependency readiness — external deps confirmed","Estimation confidence — stories sized for complexity","Change management readiness — CM stories present","Iteration items before security assessment"]},{name:"Consolidated Artifact Map",fields:["Link map: Concept → Reqs → Design → ADRs → Threats → Jira","Single-page navigation to all artifacts"]}],
mcpIntegrations:[{name:"Confluence MCP",direction:"read + write",operations:["READ: All project artifacts for cross-validation","READ: Enterprise standards checklists","WRITE: Publish readiness assessment","WRITE: Create artifact map page"]},{name:"Jira MCP",direction:"read + write",operations:["READ: Validate all reqs have stories","READ: Check story completeness — AC, estimates, deps","READ: Verify CM stories exist and are estimated","WRITE: Flag stories needing refinement","WRITE: Update epics with final design refs"]},{name:"Git MCP",direction:"read",operations:["Validate referenced services/APIs exist","Confirm branch strategies match design"]}],
gate:{type:"Design completeness review",criteria:"Human reviews gap report. All gaps addressed or accepted as known debt. Design package complete and consistent. Proceed to S8 and S9."},
designNotes:"Pure checklist execution — no judgment calls, no trade-offs, just systematic verification. This is exactly what agents excel at. The human's role is reviewing the findings and deciding what to do about gaps, not participating in the analysis itself."},

{id:"s8",name:"S8 — Security Assessment Agent",
mode:"agentic",
interactionPattern:"Fully autonomous security assessment. Agent ingests complete design package, runs comprehensive evaluation against OWASP ASVS, NIST 800-53, ISO 27001. Produces security assessment report with posture rating, control gaps, and CI/CD conditions. CISO/security lead reviews and signs off at the gate.",
summary:"Independent autonomous security gate. Evaluates complete design against industry frameworks. Assesses control adequacy, compliance evidence readiness, and defines security conditions for development (CI/CD gates, testing requirements, pen test scope). Produces approved/conditional/rejected decision for human sign-off.",
inputs:["Solution Design (from S5)","Threat Model (from S6)","Security Requirements Addendum (from S6)","Compliance reqs (from S3)","Design Readiness (from S7)","Industry: OWASP ASVS, NIST 800-53, ISO 27001 Annex A, CIS Controls, SANS Top 25"],
outputs:[{name:"Security Assessment Report",fields:["Overall security posture rating (Critical/High/Medium/Low)","Control coverage matrix — each threat has adequate control","Control gap analysis — threats without mitigation","Auth and authZ design review findings","Data protection — encryption, classification, handling","Audit/logging sufficiency for incident detection","Third-party and supply chain risk","Compliance evidence readiness — auditable output","Secure dev requirements — testing gates for CI/CD","Residual risk acceptance register"]},{name:"Security Conditions for Development",fields:["Mandatory controls before deployment","CI/CD testing: SAST, DAST, SCA, secrets scanning","Security review gates — code review checklists, PR requirements","Pen testing scope for post-development","Security monitoring requirements for production"]},{name:"Security Sign-off",fields:["APPROVED: posture acceptable, proceed","CONDITIONAL: proceed with tracked remediations in Jira","REJECTED: design revision required — iterate S5/S6"]}],
mcpIntegrations:[{name:"Confluence MCP",direction:"read + write",operations:["READ: Security policies and control frameworks","READ: Assessment templates and rating criteria","READ: Compliance evidence requirements","READ: Secure development lifecycle standards","WRITE: Publish security assessment report","WRITE: Create security conditions page","WRITE: Update risk register"]},{name:"Jira MCP",direction:"read + write",operations:["READ: Security requirements and stories for coverage","READ: Validate security story acceptance criteria","WRITE: Create remediation stories for gaps","WRITE: Create security testing stories (SAST, DAST, pen test)","WRITE: Flag stories requiring security code review"]},{name:"Git MCP",direction:"read",operations:["Validate security patterns match design intent","Check CI/CD for existing security scanning","Review dependency management for supply chain","Assess secrets management readiness"]}],
gate:{type:"CISO / Security leadership sign-off",criteria:"Formal: approved, conditional (tracked remediations), or rejected (design revision). Residual risks formally accepted by business owner. Hard gate — no development without at least conditional approval."},
designNotes:"Deliberately independent from S6 and fully autonomous. S6 is the collaborative threat modeler, S8 is the independent assessor. No brainstorming — the agent applies frameworks systematically and produces a verdict. The human role is reviewing the assessment and making the sign-off decision, not co-creating the analysis."},

{id:"s9",name:"S9 — Operational Readiness & Handoff",
mode:"agentic",
interactionPattern:"Autonomous readiness verification. Agent checks operational plans, change management status, security conditions, artifact completeness. Produces readiness report and handoff package. Human makes final go/no-go decision at the gate. No brainstorming — systematic verification of whether everything that was planned is actually ready.",
summary:"Final autonomous gate. Verifies operational support plans, change management readiness (from S2→S3→S4 chain), security conditions acceptance, and artifact completeness. Produces development handoff package with everything a developer needs from day one.",
inputs:["All outputs from S1–S8","Operational standards from Confluence","Monitoring configs from Git","Team capacity from Jira","Industry: ITIL readiness, SRE practices, Prosci change management"],
outputs:[{name:"Operational Readiness",fields:["Monitoring/alerting plan — dashboards, rules, escalation","Incident response — runbooks, on-call coverage","Support model — L1/L2/L3, knowledge transfer plan","Capacity/scaling — provisioned, auto-scaling configured","Backup/DR — RPO/RTO confirmed, procedures planned","Deployment — rollback plan, canary/blue-green, feature flags","SLA/SLO definitions — measurable targets"]},{name:"Change Management Readiness",fields:["Training — content developed, sessions scheduled","Communications — messages drafted, channels identified","Process transition — cutover steps, parallel running, rollback","Documentation — user guides, FAQ, KB articles planned","Resistance mitigation — risks addressed, champions engaged"]},{name:"Development Handoff Package",fields:["Full artifact map: Concept → Reqs → Design → ADRs → Threats → Security → Jira","Developer onboarding summary","Technical debt register — shortcuts and rationale","Security conditions from S8 — CI/CD gates and review requirements","Operational requirements — logging, monitoring hooks, feature flags","Change management milestones relative to sprints"]}],
mcpIntegrations:[{name:"Confluence MCP",direction:"read + write",operations:["READ: Operational standards and runbook templates","READ: SLA/SLO frameworks and monitoring standards","READ: Change management plan templates","WRITE: Publish operational readiness assessment","WRITE: Publish change management readiness","WRITE: Create development handoff landing page"]},{name:"Jira MCP",direction:"read + write",operations:["READ: Validate operational stories exist","READ: Verify CM stories estimated and assigned","READ: Check sprint capacity for technical + CM work","WRITE: Create missing operational stories","WRITE: Create CM milestone markers","WRITE: Flag backlog as sprint-ready"]},{name:"Git MCP",direction:"read",operations:["Check existing monitoring configs","Review runbook coverage","Validate IaC supports operational patterns","Confirm logging meets audit requirements"]}],
gate:{type:"Go / no-go for development",criteria:"Final gate. Operational plans confirmed, change management verified, security conditions accepted, handoff complete. Stakeholder + technical + security + operations sign-off. Backlog is sprint-ready."},
designNotes:"Pure verification — does everything that was planned actually exist and is it resourced? No brainstorming. The agent checks, the human decides. The handoff package must include S8's security conditions so developers know CI/CD requirements from day one."}

]}];

const mcpServers=[{id:"confluence",name:"Confluence MCP Server",color:"#0052CC",description:"Central documentation hub and persistent memory between skills. Read access to enterprise standards, architecture docs, compliance frameworks, change management templates. Write access for publishing all outputs. Long-term memory decoupling skills from token limits.",capabilities:["Space and page search (label, title, CQL)","Page content retrieval (storage and rendered)","Page creation/update with formatting and macros","Attachment upload (diagrams, matrices)","Label management for traceability","Page tree navigation","Comment access for review feedback","Page property and metadata management"],usedBy:["S1","S2","S3","S4","S5","S6","S7","S8","S9"],criticalConfig:["Space key mapping per type (architecture, security, project, change mgmt)","Page template IDs per artifact type","Label taxonomy (req:REQ-001, adr:ADR-042, sec:THR-003)","Permission scoping to relevant spaces","Macro support (status, jira-issue, expand, toc)"]},{id:"jira",name:"Jira MCP Server",color:"#0052CC",description:"Work management and primary structured output target. Read for configs, work items, velocity, capacity. Write for project scaffolding (S4) and remediation/operational stories (S8/S9). Industry frameworks guide structure, not historical mining.",capabilities:["JQL search across projects and boards","Issue CRUD (standard and custom fields)","Project config read (types, workflows, screens)","Component, version, label management","Issue linking (blocks, relates-to, duplicates)","Board/sprint data for capacity planning","Bulk creation via REST API JSON","Workflow transition execution"],usedBy:["S1","S2","S3","S4","S5","S7","S8","S9"],criticalConfig:["Project key and issue type mappings","Custom field IDs (traceability, complexity, security flags)","Workflow transition IDs","Component and label taxonomies","Estimation field config (points, T-shirt)","Service account permissions"]},{id:"git",name:"Git MCP Server",color:"#F05032",description:"Source of truth for what the system actually is. Read-only access to repos, code, API specs, schemas, IaC, CI/CD, dependencies, security controls, monitoring. Transforms generic AI output into codebase-grounded designs. No write access in planning/design.",capabilities:["Repository listing and search across org","File/directory browsing with depth control","Content retrieval (branch/tag/commit)","Commit history and diff analysis","Branch listing and comparison","Code search (filename, content, regex)","PR/MR listing for review patterns","Tag/release info for versioning"],usedBy:["S1","S2","S3","S5","S6","S7","S8","S9"],criticalConfig:["Org/group scoping — limit repos","Branch conventions (main, master, develop)","Path patterns: /api/specs/*, /db/migrations/*, /infra/*, /monitoring/*","Size/depth limits for token management","Sensitive file exclusions (.env, secrets, keys)","Rate limiting","Repo naming for service discovery"]}];

const contextFlow=[{from:"S1",to:"S2",payload:"Concept Brief + Context Summary",notes:"Includes regulatory flags and data sensitivity"},{from:"S2",to:"S3",payload:"Feasibility + Change Impact Assessment",notes:"Change impacts become trackable requirements"},{from:"S1+S2",to:"S3",payload:"Concept + Feasibility → Requirements",notes:"S3 pulls from both upstream artifacts"},{from:"S3",to:"S4",payload:"Requirements Spec + Traceability Matrix",notes:"Includes change management requirements"},{from:"S3",to:"S5",payload:"Requirements + Context Summary v2",notes:"Bidirectional — design constraints feed back"},{from:"S5",to:"S4",payload:"Solution Design → Tasks + complexity",notes:"Design drives decomposition and estimation"},{from:"S5",to:"S6",payload:"Design → Attack surface + data flows",notes:"Bidirectional — threats may force changes"},{from:"S6",to:"S3",payload:"Security Requirements Addendum",notes:"New security reqs fed back to spec"},{from:"S1–S6",to:"S7",payload:"All artifacts for cross-validation",notes:"Autonomous completeness check"},{from:"S5–S7",to:"S8",payload:"Design + threats + readiness",notes:"Autonomous security assessment"},{from:"ALL",to:"S9",payload:"Everything → Readiness + handoff",notes:"Autonomous final gate and handoff"}];

const principles=[{title:"Dual output strategy",desc:"Every skill produces a full artifact (Confluence) and compressed context summary (downstream skills). Summaries carry decisions without prose."},{title:"Confluence as persistent memory",desc:"Skills write to Confluence, downstream skills read from there. Decouples chain from token limits. Creates natural audit trail."},{title:"Git as ground truth",desc:"Confluence = intent. Git = reality. When they conflict, Git wins. S5, S6, S8 ground designs in actual codebase."},{title:"Industry frameworks over internal patterns",desc:"TOGAF, BABOK, IREB, OWASP, NIST, SAFe, INVEST provide validated guardrails. No mining historical Jira for patterns."},{title:"Interactive skills brainstorm, agentic skills verify",desc:"S1–S6 are conversational — humans bring judgment, context, and domain truth. S7–S9 are autonomous checklist execution — agents verify, humans approve at gates."},{title:"Bidirectional iteration",desc:"S3↔S5 and S5↔S6 are bidirectional. Design surfaces requirements, threats force changes. Loops without losing traceability."},{title:"Change management as first-class",desc:"Identified in S2, requirements in S3, stories in S4, validated in S9. Same backlog, same rigor as technical work."},{title:"Defense in depth for security",desc:"S6 models threats during design (collaborative). S8 assesses finished design (independent). S8 conditions become CI/CD gates."},{title:"Human gates as context enrichment",desc:"Reviews aren't just approvals. Corrections feed back as context, making AI output progressively more aligned."}];

// ---- UI ----
function Sec({title,children}){return <div style={{marginBottom:16}}><div style={{fontSize:8,fontWeight:700,letterSpacing:"0.16em",color:"#253A50",marginBottom:6}}>{title}</div>{children}</div>}
function Li({t,indent}){return <div style={{display:"flex",gap:6,marginBottom:1.5,paddingLeft:indent?5:0}}><span style={{color:"#1B4332",fontSize:6.5,lineHeight:"16px",flexShrink:0}}>▸</span><span style={{fontSize:10,lineHeight:1.55,color:"#5A7E98"}}>{t}</span></div>}
function DirBadge({dir}){const r=dir==="read";return <span style={{fontSize:8,padding:"1px 5px",background:r?"#0E1E14":"#0A1E48",borderRadius:2,color:r?"#5AAF72":"#6899D4",letterSpacing:"0.05em",fontWeight:600}}>{dir.toUpperCase()}</span>}
function ModeBadge({mode}){const a=mode==="agentic";return <span style={{fontSize:8,padding:"2px 7px",background:a?"#1A0A2E":"#0A1A12",border:`1px solid ${a?"#6B3FA0":"#2D6B4F"}`,borderRadius:3,color:a?"#B39DDB":"#81C784",letterSpacing:"0.06em",fontWeight:700}}>{a?"⚡ AGENTIC":"◉ INTERACTIVE"}</span>}

export default function App(){
  const[activeSkill,setActiveSkill]=useState(null);
  const[activeTab,setActiveTab]=useState("overview");
  const[activeMcp,setActiveMcp]=useState(null);
  const allSkills=phases.flatMap(p=>p.skills.map(s=>({...s,phase:p})));
  const selected=allSkills.find(s=>s.id===activeSkill);

  return(
    <div style={{minHeight:"100vh",background:"#080C14",color:"#B0C4D8",fontFamily:"'SF Mono','Fira Code','JetBrains Mono',monospace"}}>
      <div style={{borderBottom:"1px solid #151E2D",padding:"18px 24px"}}>
        <h1 style={{margin:0,fontSize:16,fontWeight:600,color:"#DDE8F0"}}>Enterprise SDLC Skills Architecture</h1>
        <div style={{fontSize:9.5,color:"#3A5570",marginTop:4,letterSpacing:"0.08em"}}>S1–S9 &nbsp;│&nbsp; 6 INTERACTIVE · 3 AGENTIC &nbsp;│&nbsp; CONFLUENCE · JIRA · GIT</div>
      </div>

      <div style={{display:"flex",borderBottom:"1px solid #151E2D",padding:"0 24px",overflowX:"auto"}}>
        {[{key:"overview",label:"Skill Chain (9)"},{key:"mcp",label:"MCP Servers"},{key:"flow",label:"Context Flow"}].map(t=>(
          <button key={t.key} onClick={()=>{setActiveTab(t.key);setActiveSkill(null);setActiveMcp(null)}}
            style={{padding:"10px 18px",background:"none",border:"none",borderBottom:activeTab===t.key?"2px solid #4A80C4":"2px solid transparent",color:activeTab===t.key?"#DDE8F0":"#3A5570",fontSize:10.5,fontFamily:"inherit",cursor:"pointer",letterSpacing:"0.04em",fontWeight:activeTab===t.key?600:400,whiteSpace:"nowrap"}}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{padding:"20px 24px",maxWidth:1050}}>

        {activeTab==="overview"&&(
          <div style={{display:"flex",gap:20}}>
            <div style={{width:280,flexShrink:0}}>
              {phases.map((phase,pi)=>(
                <div key={phase.id} style={{marginBottom:20}}>
                  <div style={{fontSize:8.5,fontWeight:700,letterSpacing:"0.15em",color:phase.accent,marginBottom:8}}>{phase.label}</div>
                  {phase.skills.map(skill=>(
                    <button key={skill.id} onClick={()=>setActiveSkill(skill.id)}
                      style={{display:"block",width:"100%",textAlign:"left",padding:"8px 10px",marginBottom:2,background:activeSkill===skill.id?`${phase.color}40`:"transparent",border:activeSkill===skill.id?`1px solid ${phase.accent}35`:"1px solid transparent",borderRadius:4,cursor:"pointer",fontFamily:"inherit",color:activeSkill===skill.id?"#DDE8F0":"#546E84"}}>
                      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                        <span style={{fontSize:10,fontWeight:600}}>{skill.name}</span>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <ModeBadge mode={skill.mode}/>
                        <span style={{fontSize:8,color:activeSkill===skill.id?"#6B90AC":"#2D4558"}}>{skill.summary.slice(0,50)}...</span>
                      </div>
                    </button>
                  ))}
                  {pi===0&&<div style={{borderBottom:"1px dashed #1A2636",margin:"14px 0 6px",position:"relative"}}><span style={{position:"absolute",top:-6,left:"50%",transform:"translateX(-50%)",background:"#080C14",padding:"0 6px",fontSize:7.5,color:"#253446",letterSpacing:"0.1em"}}>PHASE GATE</span></div>}
                </div>
              ))}
            </div>

            <div style={{flex:1,minWidth:0}}>
              {!selected?(
                <div style={{padding:"50px 16px",textAlign:"center",color:"#1A2636",fontSize:11}}><div style={{marginBottom:8,opacity:0.4,fontSize:20}}>◇</div>Select a skill to view its specification</div>
              ):(
                <div>
                  <div style={{fontSize:8.5,fontWeight:700,letterSpacing:"0.15em",color:selected.phase.accent,marginBottom:4}}>{selected.phase.label}</div>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                    <h2 style={{margin:0,fontSize:14,fontWeight:600,color:"#DDE8F0"}}>{selected.name}</h2>
                    <ModeBadge mode={selected.mode}/>
                  </div>
                  <p style={{fontSize:10.5,lineHeight:1.65,color:"#6B90AC",marginBottom:14}}>{selected.summary}</p>

                  {/* Interaction Pattern */}
                  <Sec title="INTERACTION PATTERN">
                    <div style={{padding:"8px 10px",background:selected.mode==="agentic"?"#0E0818":"#081210",border:`1px solid ${selected.mode==="agentic"?"#2A1845":"#1A3A2A"}`,borderRadius:4}}>
                      <div style={{fontSize:10,lineHeight:1.6,color:selected.mode==="agentic"?"#9B8EC4":"#6BAF84"}}>{selected.interactionPattern}</div>
                    </div>
                  </Sec>

                  <Sec title="INPUTS">{selected.inputs.map((x,i)=><Li key={i} t={x}/>)}</Sec>
                  <Sec title="OUTPUTS">{selected.outputs.map((o,i)=><div key={i} style={{marginBottom:10}}><div style={{fontSize:10,fontWeight:600,color:"#8BAEC8",marginBottom:4}}>{o.name}</div>{o.fields.map((f,j)=><Li key={j} t={f} indent/>)}</div>)}</Sec>
                  <Sec title="MCP INTEGRATIONS">{selected.mcpIntegrations.map((m,i)=><div key={i} style={{marginBottom:10,padding:"8px 10px",background:"#0A0F18",borderRadius:4,border:"1px solid #151E2D"}}><div style={{display:"flex",alignItems:"center",gap:7,marginBottom:5}}><span style={{fontSize:10,fontWeight:600,color:"#DDE8F0"}}>{m.name}</span><DirBadge dir={m.direction}/></div>{m.operations.map((op,j)=><Li key={j} t={op} indent/>)}</div>)}</Sec>
                  <Sec title="HUMAN GATE"><div style={{padding:"8px 10px",background:"#140E06",border:"1px solid #3D2A12",borderRadius:4}}><div style={{fontSize:8.5,fontWeight:700,color:"#C4883A",letterSpacing:"0.06em",marginBottom:2}}>{selected.gate.type}</div><div style={{fontSize:10,lineHeight:1.55,color:"#8C6E40"}}>{selected.gate.criteria}</div></div></Sec>
                  <Sec title="DESIGN NOTES"><div style={{fontSize:10,lineHeight:1.65,color:"#4A6880",fontStyle:"italic"}}>{selected.designNotes}</div></Sec>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab==="mcp"&&(
          <div style={{display:"flex",gap:20}}>
            <div style={{width:270,flexShrink:0}}>
              <div style={{fontSize:8.5,fontWeight:700,letterSpacing:"0.15em",color:"#4A80C4",marginBottom:8}}>CORE SERVERS</div>
              {mcpServers.map(m=>(
                <button key={m.id} onClick={()=>setActiveMcp(m.id)}
                  style={{display:"block",width:"100%",textAlign:"left",padding:"9px 11px",marginBottom:2,background:activeMcp===m.id?"#0B3D9118":"transparent",border:activeMcp===m.id?"1px solid #4A80C425":"1px solid transparent",borderRadius:4,cursor:"pointer",fontFamily:"inherit",color:activeMcp===m.id?"#DDE8F0":"#546E84"}}>
                  <div style={{display:"flex",alignItems:"center",gap:7}}><div style={{width:6,height:6,borderRadius:"50%",background:m.color}}/><span style={{fontSize:10.5,fontWeight:600}}>{m.name}</span></div>
                  <div style={{fontSize:8.5,color:"#2D4558",paddingLeft:13}}>Used by: {m.usedBy.join(", ")}</div>
                </button>
              ))}
              <div style={{marginTop:16,padding:10,background:"#0A0F18",borderRadius:4,border:"1px solid #151E2D"}}>
                <div style={{fontSize:8,fontWeight:700,letterSpacing:"0.12em",color:"#2D4558",marginBottom:6}}>OPTIONAL EXTENSIONS</div>
                {[["ServiceNow MCP","Incident/problem → S1"],["Slack/Teams MCP","Threads → S1"],["SonarQube MCP","Quality → S5/S7"],["Artifactory MCP","Dependencies → S6/S8"],["Snyk/Dependabot","Vulns → S6/S8"]].map(([n,d],i)=>(
                  <div key={i} style={{marginBottom:4}}><span style={{fontSize:9.5,color:"#4A6880",fontWeight:600}}>{n} </span><span style={{fontSize:8.5,color:"#253446"}}>{d}</span></div>
                ))}
              </div>
            </div>
            <div style={{flex:1,minWidth:0}}>
              {!activeMcp?(
                <div style={{padding:"50px 16px",textAlign:"center",color:"#1A2636",fontSize:11}}><div style={{marginBottom:8,opacity:0.4,fontSize:20}}>⬡</div>Select an MCP server</div>
              ):(()=>{
                const m=mcpServers.find(x=>x.id===activeMcp);
                return(<div>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}><div style={{width:9,height:9,borderRadius:"50%",background:m.color}}/><h2 style={{margin:0,fontSize:14,fontWeight:600,color:"#DDE8F0"}}>{m.name}</h2></div>
                  <p style={{fontSize:10.5,lineHeight:1.65,color:"#6B90AC",marginBottom:18}}>{m.description}</p>
                  <Sec title="CAPABILITIES">{m.capabilities.map((c,i)=><Li key={i} t={c}/>)}</Sec>
                  <Sec title="CRITICAL CONFIGURATION">{m.criticalConfig.map((c,i)=><Li key={i} t={c}/>)}</Sec>
                  <Sec title="OPERATIONS BY SKILL">
                    {allSkills.filter(s=>s.mcpIntegrations.some(mi=>mi.name.toLowerCase().includes(m.id))).map(s=>{
                      const int=s.mcpIntegrations.find(mi=>mi.name.toLowerCase().includes(m.id));
                      return(<div key={s.id} style={{marginBottom:10,padding:"8px 10px",background:"#0A0F18",borderRadius:4,border:"1px solid #151E2D"}}>
                        <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:5}}>
                          <span style={{fontSize:10,fontWeight:600,color:s.phase.accent}}>{s.name}</span>
                          <ModeBadge mode={s.mode}/>
                          <DirBadge dir={int.direction}/>
                        </div>
                        {int.operations.map((op,j)=><Li key={j} t={op} indent/>)}
                      </div>);
                    })}
                  </Sec>
                </div>);
              })()}
            </div>
          </div>
        )}

        {activeTab==="flow"&&(
          <div>
            <p style={{fontSize:10.5,lineHeight:1.65,color:"#6B90AC",marginBottom:18,maxWidth:640}}>
              Context flows via structured handoffs. Interactive skills (S1–S6) produce artifacts through human-AI collaboration. Agentic skills (S7–S9) consume those artifacts autonomously and produce verification reports for human approval at gates.
            </p>
            <div style={{display:"flex",flexDirection:"column",gap:2,marginBottom:24}}>
              {contextFlow.map((f,i)=>{
                const isAgentic=f.to.match(/S[789]/);
                return(
                <div key={i} style={{display:"flex",alignItems:"stretch"}}>
                  <div style={{width:52,padding:"8px 4px",background:f.from.includes("ALL")||f.from.includes("–")?"#12101E":"#0A0F18",borderRadius:"4px 0 0 4px",border:"1px solid #151E2D",borderRight:"none",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <span style={{fontSize:9.5,fontWeight:700,color:f.from.includes("ALL")||f.from.includes("–")?"#9B8EC4":"#4A80C4"}}>{f.from}</span>
                  </div>
                  <div style={{width:28,display:"flex",alignItems:"center",justifyContent:"center",borderTop:"1px solid #151E2D",borderBottom:"1px solid #151E2D"}}><span style={{color:"#253446",fontSize:11}}>→</span></div>
                  <div style={{width:36,padding:"8px 4px",background:isAgentic?"#0E0818":"#0A0F18",border:`1px solid ${isAgentic?"#1A1230":"#151E2D"}`,borderLeft:"none",borderRight:"none",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <span style={{fontSize:9.5,fontWeight:700,color:isAgentic?"#B39DDB":"#4A80C4"}}>{f.to}</span>
                  </div>
                  <div style={{flex:1,padding:"7px 10px",background:"#0A0F18",borderRadius:"0 4px 4px 0",border:"1px solid #151E2D",borderLeft:"1px solid #151E2D"}}>
                    <div style={{fontSize:10,fontWeight:600,color:"#8BAEC8",marginBottom:1}}>{f.payload}</div>
                    <div style={{fontSize:9,color:"#2D4558"}}>{f.notes}</div>
                  </div>
                </div>);
              })}
            </div>
            <div style={{fontSize:8.5,fontWeight:700,letterSpacing:"0.15em",color:"#4A80C4",marginBottom:8}}>ARCHITECTURE PRINCIPLES</div>
            {principles.map((p,i)=>(
              <div key={i} style={{padding:"9px 11px",marginBottom:3,background:"#0A0F18",borderRadius:4,border:"1px solid #151E2D"}}>
                <div style={{fontSize:10,fontWeight:600,color:"#8BAEC8",marginBottom:2}}>{p.title}</div>
                <div style={{fontSize:10,lineHeight:1.6,color:"#3E6080"}}>{p.desc}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";

const phases=[{id:"planning",label:"Phase 1: Planning & Design",color:"#1B4332",accent:"#95D5B2",skills:[
{id:"s1",name:"S1 — Intake & Concept Framing",
mode:"interactive",
interactionPattern:"Conversational brainstorming. Skill asks probing questions, challenges assumptions, surfaces gaps. Human provides domain context, validates scope, answers open questions. Iterates until concept brief is complete and both parties agree on framing.",
summary:"Normalizes raw inputs into a structured Concept Brief through guided conversation. Probes for missing context across business, technical, and compliance dimensions.",
inputs:["Stakeholder requests (email, Slack, Teams)","Meeting transcripts and recordings","Business cases from Confluence","Incident/problem tickets from Jira or ServiceNow","Industry: TOGAF preliminary phase, BABOK business analysis planning"],
outputs:[{name:"Concept Brief",fields:["Problem statement (business perspective)","Proposed change (plain language)","Scope boundaries (in/out explicit)","Affected systems, services, and teams","Business drivers and success criteria","Known constraints (timeline, budget, regulatory)","Open questions requiring stakeholder input","Risk flags (initiative risks, delivery risks, benefit realisation risks)"]},{name:"Context Summary (YAML frontmatter)",fields:["Compressed handoff for downstream skills","Decisions and assumptions log"]}],
mcpIntegrations:[{name:"Confluence MCP",direction:"read",operations:["Search project spaces for prior art and related initiatives","Pull ADRs for affected systems","Retrieve domain glossaries and data dictionaries","Access team org structures and RACI matrices"]},{name:"Jira MCP",direction:"read",operations:["Query related epics/initiatives to detect overlap or dependency","Pull incident history for affected systems (problem context)","Check active in-flight work that may conflict with proposed scope"]},{name:"Git MCP",direction:"read",operations:["Read repo README and architecture docs for affected services","Examine repo structure to understand component boundaries","Check recent commit activity for stability assessment"]}],
gate:{type:"Mandatory human review",criteria:"Validate problem framing, confirm scope boundaries, answer open questions. Stakeholder sign-off before proceeding to feasibility."},
designNotes:"Fundamentally conversational — you can't automate 'what problem are we actually solving?' The skill probes, the human refines. MCP calls happen mid-conversation to pull context as topics surface."},

{id:"s2",name:"S2 — Feasibility & Impact Assessment",
mode:"interactive",
interactionPattern:"Guided analysis with human judgment. Skill proposes feasibility dimensions and initial assessment, human provides institutional knowledge — cost assumptions, political landscape, organizational readiness signals, change resistance factors. Iterative refinement of the investment case.",
summary:"Evaluates technical viability, financial justification, organizational feasibility, and business change impact. Produces ROM estimates with baseline (traditional) and AI-assisted views. Includes business domain map and conceptual system context diagrams.",
inputs:["Concept Brief + Context Summary (from S1)","Enterprise architecture landscape from Confluence","Current system state from Git repos","Active portfolio from Jira","Industry: TOGAF Architecture Vision, PMI feasibility, PRINCE2 business case"],
outputs:[{name:"Feasibility Assessment",fields:["Technical viability — can current architecture support this","ROM cost estimate — baseline (traditional) + AI-assisted view","Organizational readiness — skills, capacity, change management needs","Portfolio conflict analysis — competing or dependent initiatives","Timeline feasibility — delivery within stated constraints","Build vs. buy vs. extend analysis","Risk-adjusted recommendation: proceed / conditional / defer / reject"]},{name:"Business Domain Map",fields:["Domain-level view of solution idea","Conceptual system context diagram"]},{name:"Change Impact Assessment",fields:["High-level or detailed (user choice)","Affected roles and teams","Process changes","Training requirements"]}],
mcpIntegrations:[{name:"Confluence MCP",direction:"read + write",operations:["READ: Pull architecture landscape and technology radar","READ: Access capacity planning and team skill matrices","READ: Retrieve cost models and estimation frameworks","WRITE: Publish feasibility assessment","WRITE: Create investment summary for steering committee"]},{name:"Jira MCP",direction:"read",operations:["Query active programs for portfolio conflict analysis","Pull team allocation and capacity data","Check dependency chains from in-flight work"]},{name:"Git MCP",direction:"read",operations:["Assess codebase complexity for effort estimation","Review tech debt indicators","Examine infrastructure definitions for scaling feasibility"]}],
gate:{type:"Steering committee / Investment board",criteria:"Funding approval, resource allocation, timeline agreement. Business decision gate — everything before is analysis, everything after is committed delivery."},
designNotes:"The human brings institutional knowledge the AI can't infer — political dynamics, budget cycles, executive priorities. ROM estimates include AI-assisted view showing potential efficiency gains with realistic limitations noted."},

{id:"s3",name:"S3 — High Level Requirements",
mode:"interactive",
interactionPattern:"Collaborative decomposition. Skill proposes requirements structure from concept brief and industry frameworks, human refines wording, challenges granularity, adds domain-specific conditions, negotiates priorities. Requirements are inherently a negotiation.",
summary:"Decomposes concept brief into structured, traceable requirements grouped by business capability area. Versioned through the chain: v1 after feasibility, v2 after architecture (S4), v3 after threat model (S5). MoSCoW + Value + Complexity prioritization.",
inputs:["Concept Brief + Context Summary (from S1)","Feasibility + Change Impact (from S2)","Enterprise standards from Confluence","Industry: IREB, BABOK, IEEE 29148"],
outputs:[{name:"Requirements Specification",fields:["Capability groups (natural epic candidates for S7)","Functional requirements with edge cases column","Non-functional requirements (ISO 25010)","Data requirements","Integration requirements","Compliance requirements","Accessibility requirements (WCAG)","Each req: unique ID, MoSCoW priority, Value (H/M/L), Complexity (H/M/L)"]},{name:"Traceability Matrix",fields:["S1 scope item → Requirement ID mapping","Coverage check: every scope item has requirement","Additive requirements flagged with source (S1/S4/S5)"]}],
mcpIntegrations:[{name:"Confluence MCP",direction:"read + write",operations:["READ: Pull requirements templates and quality standards","READ: Access compliance libraries","READ: Retrieve NFR baselines from architecture standards","WRITE: Publish requirements spec","WRITE: Create/update traceability matrix"]},{name:"Jira MCP",direction:"read",operations:["Pull issue type schemas and custom field configs","Read component and label taxonomies for alignment"]},{name:"Git MCP",direction:"read",operations:["Read OpenAPI/Swagger specs for integration requirements","Examine DB migration history for current data model"]}],
gate:{type:"Review with iteration",criteria:"Tech leads, business stakeholders review. May iterate with S4 as design constraints surface. Re-invoked after S4 (v2) and S5 (v3)."},
designNotes:"Requirements are a negotiation, not an extraction. The skill proposes structure from frameworks, the human brings domain truth. S3 is re-invoked after S4 and S5 to refine with architecture and security findings — focus on the delta, not full re-run."},

{id:"s4",name:"S4 — Solution Architecture",
mode:"interactive",
interactionPattern:"Deep collaborative design. Skill proposes architecture grounded in codebase analysis, human challenges patterns, raises constraints invisible to the AI, iterates on trade-offs. The architect drives, the AI accelerates. Most judgment-heavy skill in the chain.",
summary:"Solution design grounded in codebase via Git MCP, structured using TOGAF, C4, arc42. Smart assumptions validation — only asks what upstream doesn't cover. Platform reference files for Azure, Salesforce, .NET, legacy. Produces ADRs in-flight and traceability matrix.",
inputs:["Requirements Spec (from S3 v1)","Context Summary (from S3)","Architecture docs from Confluence","Codebase from Git","Platform references: azure.md, salesforce.md, dotnet.md, legacy.md","Industry: TOGAF ADM D-E, C4 model, arc42, 12-factor app"],
outputs:[{name:"Solution Design Document",fields:["Architecture principles","C4 context, container, component diagrams","Data model and governance","API design (OpenAPI)","Security design","Infrastructure and deployment","Integration patterns","Standards conformance checklist"]},{name:"Architecture Decision Records (ADRs)",fields:["One ADR per decision (Nygard format)","Context, decision, consequences, alternatives","Captured in-flight during design, not deferred"]},{name:"Risk Register",fields:["Technical risks","Vendor/third-party risks","Data governance risks"]},{name:"Traceability Matrix",fields:["S1 scope → S3 requirement → S4 component/ADR","Separate document for full chain visibility"]},{name:"Requirements Feedback",fields:["Findings for S3 v2","New NFRs, changed integrations, technical constraints"]}],
mcpIntegrations:[{name:"Git MCP",direction:"read",operations:["Read repo structures for component boundaries","Examine code patterns — DI, error handling, logging, auth","Parse OpenAPI specs for API landscape","Read DB migrations for schema evolution","Analyze Dockerfiles/CI/CD for deployment topology"]},{name:"Confluence MCP",direction:"read + write",operations:["READ: Architecture standards and tech radar","READ: Approved technology list for conformance","READ: Existing ADRs for consistency","WRITE: Publish solution design","WRITE: Create ADR pages"]},{name:"Jira MCP",direction:"read",operations:["Pull requirements for cross-reference","Check in-flight work for conflict risk"]}],
gate:{type:"Architecture review board",criteria:"Standards conformance, approved tech compliance/waiver, security, scalability, operational readiness, cost. Findings feed back to S3 for requirements v2."},
designNotes:"Most judgment-heavy skill. The architect brings trade-off context, political constraints, and experiential knowledge. AI accelerates by grounding proposals in actual codebase via Git. ADRs captured as decisions are made, not deferred to end."},

{id:"s5",name:"S5 — Threat Modelling",
mode:"interactive",
interactionPattern:"Guided security analysis. Skill proposes threat model from design artifacts and frameworks, security engineer validates assumptions, adjusts trust boundaries, refines likelihood assessments. Collaborative but structured — STRIDE provides the skeleton, OWASP ASVS maps controls.",
summary:"Threat models using STRIDE for identification, OWASP ASVS for control mapping. Companion to S4 with bidirectional feedback. Produces security requirements addendum for S3 v3. Distinct from S8's independent assessment — S5 is collaborative during design.",
inputs:["Solution Design (from S4)","S3 v2 Requirements","Security standards from Confluence","Security controls from Git","Industry: STRIDE, OWASP Top 10/ASVS, NIST 800-53, CIS Controls"],
outputs:[{name:"Threat Model",fields:["Data flow diagrams with trust boundaries (Mermaid)","STRIDE per component and data flow","OWASP ASVS verification mapped to design","Attack surface mapping","Threats ranked by likelihood × impact","Controls mapped to ASVS requirements"]},{name:"Security Requirements Addendum",fields:["New security requirements from threat modeling","Fed back into S3 for v3","Control requirements for implementation"]}],
mcpIntegrations:[{name:"Git MCP",direction:"read",operations:["Examine auth/authZ implementations","Read security middleware and validation","Check manifests for vulnerable libraries","Review secrets management","Analyze logging for audit completeness"]},{name:"Confluence MCP",direction:"read + write",operations:["READ: Security standards and control libraries","READ: Previous threat models","READ: Compliance framework mappings","WRITE: Publish threat model","WRITE: Update risk register"]}],
gate:{type:"Security team review",criteria:"Validate threat model, review controls, confirm residual risk. Findings feed back to S3 for requirements v3. Then proceed to S6 for design validation."},
designNotes:"Interactive because threat likelihood and trust boundary placement require human judgment. The AI proposes from frameworks, the security engineer refines from experience. MITRE ATT&CK reserved for S8's independent assessment."},

]},{id:"validation",label:"Phase 2: Validation & Handoff",color:"#0B3D91",accent:"#90CAF9",skills:[

{id:"s6",name:"S6 — Design Validation",
mode:"agentic",
interactionPattern:"Fully autonomous cross-validation. Agent reads all artifacts from S1–S5, runs systematic completeness and consistency checks, produces gap report. Human reviews findings at the gate — approves, or sends items back for iteration. No brainstorming needed.",
summary:"Autonomous cross-validation of the complete design package before Jira scaffolding. Validates traceability (scope→requirements→architecture), completeness, consistency, and pattern compliance against approved-patterns.md if present. Unrecognized patterns flagged as 'needs review' (warning, not failure).",
inputs:["All outputs from S1–S5","Traceability matrix","approved-patterns.md (optional)"],
outputs:[{name:"Design Readiness Assessment",fields:["Traceability validation — scope→requirements→architecture chain","Completeness validation — all required sections present","Consistency validation — no contradictions between artifacts","Pattern compliance — approved ✓ vs unrecognized (warning)"]},{name:"Verdict",fields:["Ready — all checks pass, proceed to S7","Ready with Conditions — warnings only, proceed with noted items","Not Ready — critical issues, resolve before proceeding"]}],
mcpIntegrations:[{name:"Confluence MCP",direction:"read + write",operations:["READ: All project artifacts for cross-validation","READ: Enterprise standards checklists","WRITE: Publish readiness assessment","WRITE: Create artifact map page"]},{name:"Git MCP",direction:"read",operations:["Validate referenced services/APIs exist","Confirm patterns match approved list"]}],
gate:{type:"Design completeness review",criteria:"Human reviews gap report. All gaps addressed or accepted as known debt. Design package complete and consistent. Proceed to S7."},
designNotes:"Pure checklist execution — no judgment calls, just systematic verification. Unrecognized patterns trigger 'Ready with Conditions' not failure, allowing sparse approved-patterns.md files. Human reviews findings, agent doesn't auto-fix."},

{id:"s7",name:"S7 — Jira Project Scaffolding",
mode:"interactive",
interactionPattern:"Propose-and-refine. Skill generates initial project structure from validated requirements and design, presents it for review. Human adjusts decomposition, story boundaries. Once structure is agreed, bulk creation is automated.",
summary:"Translates validated S3 v3 requirements + S4 architecture + S5 threats into Jira epics and stories. Runs after S6 validation passes. Epic types: Technical Enablers, Security, NFR (if warranted), Capability groups. Functional stories use 'As a...' format, technical/security use 'Implement X to enable Y'.",
inputs:["S6 Validation Report (must be Ready or Ready with Conditions)","Requirements Specification (from S3 v3)","Solution Design (from S4)","Threat Model (from S5)","Traceability Matrix","Jira project configuration"],
outputs:[{name:"Jira Project Structure",fields:["Technical Enablers epic — cross-cutting infrastructure from S4","Security epic — cross-cutting security controls from S5","NFR epic — if scope warrants dedicated epic from S3 NFRs","Capability epics — 1:1 from S3 requirement groups","Stories with acceptance criteria","Traceability labels (REQ-xxx, ADR-xxx, THR-xxx)","Complexity (H/M/L) carried forward, not story points"]},{name:"UAT Test Cases",fields:["Business outcome validation per epic","Derived from S3 capability group success criteria","Not Given/When/Then — that's refinement"]},{name:"Scaffold Document",fields:["Local markdown with full structure","Creation log with Jira keys","Updated traceability matrix"]}],
mcpIntegrations:[{name:"Jira MCP",direction:"read + write",operations:["READ: Pull project config — issue types, workflows, fields","READ: Query team velocity for estimation calibration","WRITE: Create epics referencing requirement IDs","WRITE: Create stories with acceptance criteria","WRITE: Set dependency links, labels, components","WRITE: Attach traceability via custom fields/labels"]},{name:"Confluence MCP",direction:"write",operations:["Update traceability matrix with Jira links","Publish scaffold document"]}],
gate:{type:"Technical lead review",criteria:"Validate story quality, dependency mapping, full requirements coverage. S7 prompts for additional edge cases during story elaboration. Backlog ready for refinement."},
designNotes:"Lighter-touch interaction than S1–S5. Skill does heavy lifting of decomposition, human reviews. Edge cases captured at story level (carrying forward S3 edge cases + prompting for additional). Can help set up jira-config.json for REST API if no Jira MCP available."},

{id:"s8",name:"S8 — Security Assessment Agent",
mode:"agentic",
interactionPattern:"Fully autonomous security assessment. Agent ingests complete design package, runs comprehensive evaluation against OWASP ASVS 5.0, OWASP Top 10 2025, NIST 800-53, ISO 27001, MITRE ATT&CK. Produces security assessment report with posture rating. CISO/security lead reviews and signs off.",
summary:"Independent autonomous security gate. Evaluates complete design against industry frameworks. MITRE ATT&CK for detection/response coverage (distinct from S5 which uses STRIDE). Assesses control adequacy, compliance evidence readiness, defines CI/CD security conditions.",
inputs:["Solution Design (from S4)","Threat Model (from S5)","Security Requirements Addendum (from S5)","Compliance reqs (from S3)","Design Readiness (from S6)","Jira Structure (from S7)","Industry: OWASP ASVS 5.0, OWASP Top 10 2025, NIST 800-53, ISO 27001, MITRE ATT&CK, SOC 2"],
outputs:[{name:"Security Assessment Report",fields:["Overall security posture rating","Control coverage matrix","Control gap analysis","MITRE ATT&CK mapping for detection/response","Compliance framework mapping (SOC 2, ISO 27001)","Third-party and supply chain risk","Compliance evidence readiness","Residual risk acceptance register"]},{name:"Security Conditions for Development",fields:["Mandatory controls before deployment","CI/CD testing: SAST, DAST, SCA, secrets scanning","Security review gates","Pen testing scope"]},{name:"Security Sign-off",fields:["APPROVED: posture acceptable, proceed","CONDITIONAL: proceed with tracked remediations","REJECTED: design revision required"]}],
mcpIntegrations:[{name:"Confluence MCP",direction:"read + write",operations:["READ: Security policies and control frameworks","READ: Assessment templates and rating criteria","WRITE: Publish security assessment report","WRITE: Update risk register"]},{name:"Jira MCP",direction:"read + write",operations:["READ: Security requirements and stories for coverage","WRITE: Create remediation stories for gaps","WRITE: Create security testing stories","WRITE: Flag stories requiring security code review"]},{name:"Git MCP",direction:"read",operations:["Validate security patterns match design intent","Check CI/CD for existing security scanning","Review dependency management for supply chain"]}],
gate:{type:"CISO / Security leadership sign-off",criteria:"Formal: approved, conditional (tracked remediations), or rejected (design revision). Hard gate — no development without at least conditional approval."},
designNotes:"Deliberately independent from S5. S5 is collaborative threat modeler (STRIDE + ASVS), S8 is independent assessor (adds MITRE ATT&CK, compliance frameworks). No brainstorming — agent applies frameworks, human reviews verdict."},

{id:"s9",name:"S9 — Operational Readiness & Handoff",
mode:"agentic",
interactionPattern:"Autonomous readiness verification. Agent checks operational plans, change management status, security conditions, Jira structure validation, artifact completeness. Produces readiness report and handoff package. Human makes final go/no-go decision.",
summary:"Final autonomous gate. Verifies operational support plans, Jira structure (moved from S7's old position), security conditions acceptance, artifact completeness. Produces development handoff package with everything a developer needs from day one.",
inputs:["All outputs from S1–S8","Operational standards from Confluence","Monitoring configs from Git","Team capacity from Jira","Industry: ITIL readiness, SRE practices"],
outputs:[{name:"Operational Readiness",fields:["Monitoring/alerting plan","Incident response — runbooks, on-call coverage","Support model — L1/L2/L3, knowledge transfer","Capacity/scaling confirmation","Backup/DR — RPO/RTO confirmed","Deployment — rollback plan, feature flags","SLA/SLO definitions"]},{name:"Jira Validation",fields:["All requirements have stories","Stories have acceptance criteria","Dependencies mapped","Estimates present","Traceability labels complete"]},{name:"Development Handoff Package",fields:["Full artifact map: Concept → Reqs → Design → ADRs → Threats → Security → Jira","Developer onboarding summary","Technical debt register","Security conditions from S8 — CI/CD gates","Operational requirements — logging, monitoring hooks"]}],
mcpIntegrations:[{name:"Confluence MCP",direction:"read + write",operations:["READ: Operational standards and runbook templates","READ: SLA/SLO frameworks","WRITE: Publish operational readiness assessment","WRITE: Create development handoff landing page"]},{name:"Jira MCP",direction:"read + write",operations:["READ: Validate all reqs have stories","READ: Verify story completeness","WRITE: Flag backlog as sprint-ready"]},{name:"Git MCP",direction:"read",operations:["Check existing monitoring configs","Review runbook coverage","Confirm logging meets audit requirements"]}],
gate:{type:"Go / no-go for development",criteria:"Final gate. Operational plans confirmed, Jira validated, security conditions accepted, handoff complete. Backlog is sprint-ready."},
designNotes:"Pure verification — does everything planned actually exist? Jira structure validation moved here from S7's old position. Agent checks, human decides. Handoff package includes S8's security conditions so developers know CI/CD requirements from day one."}

]}];

const mcpServers=[{id:"confluence",name:"Confluence MCP Server",color:"#0052CC",description:"Central documentation hub. Read access to enterprise standards, architecture docs, compliance frameworks. Write access for publishing all outputs. Optional enhancement — skills work fully with local files only.",capabilities:["Space and page search","Page content retrieval","Page creation/update","Attachment upload (diagrams)","Label management for traceability","Page tree navigation"],usedBy:["S1","S2","S3","S4","S5","S6","S7","S8","S9"],criticalConfig:["Space key mapping per type","Page template IDs per artifact type","Label taxonomy (req:REQ-001, adr:ADR-042, thr:THR-003)","Permission scoping to relevant spaces"]},{id:"jira",name:"Jira MCP Server",color:"#0052CC",description:"Work management and structured output target. Read for configs, work items, velocity. Write for project scaffolding (S7) and remediation stories (S8/S9). Fallback: REST API via jira-config.json.",capabilities:["JQL search across projects","Issue CRUD (standard and custom fields)","Project config read","Component, version, label management","Issue linking","Bulk creation via REST API"],usedBy:["S1","S2","S3","S7","S8","S9"],criticalConfig:["Project key and issue type mappings","Custom field IDs (traceability, complexity)","Component and label taxonomies","Estimation field config (H/M/L complexity)"]},{id:"git",name:"Git MCP Server",color:"#F05032",description:"Source of truth for what the system actually is. Read-only access to repos, code, API specs, schemas, IaC, CI/CD. Transforms generic AI output into codebase-grounded designs.",capabilities:["Repository listing and search","File/directory browsing","Content retrieval","Commit history and diff analysis","Branch listing and comparison","Code search"],usedBy:["S1","S2","S3","S4","S5","S6","S8","S9"],criticalConfig:["Org/group scoping","Branch conventions","Path patterns for specs, migrations, infra","Sensitive file exclusions"]}];

const contextFlow=[{from:"S1",to:"S2",payload:"Concept Brief + Context Summary",notes:"Includes risk flags and scope"},{from:"S2",to:"S3v1",payload:"Feasibility + Change Impact",notes:"ROM estimates and domain map"},{from:"S3v1",to:"S4",payload:"Requirements Spec + Traceability",notes:"Capability groups, prioritization"},{from:"S4",to:"S3v2",payload:"Architecture findings",notes:"ADRs, technical constraints, new requirements"},{from:"S3v2",to:"S5",payload:"Updated requirements",notes:"Refined with architecture"},{from:"S5",to:"S3v3",payload:"Security Requirements Addendum",notes:"Threat mitigations, control requirements"},{from:"S1–S5",to:"S6",payload:"All design artifacts",notes:"Cross-validation before Jira"},{from:"S6",to:"S7",payload:"Validated design package",notes:"Ready or Ready with Conditions"},{from:"S3v3+S4+S5",to:"S7",payload:"Requirements + Architecture + Threats",notes:"Jira scaffolding inputs"},{from:"S4–S7",to:"S8",payload:"Design + Threats + Jira structure",notes:"Independent security assessment"},{from:"ALL",to:"S9",payload:"Everything → Readiness + Handoff",notes:"Final gate with Jira validation"}];

const principles=[{title:"Local first, Confluence as enhancement",desc:"Skills write markdown locally first. Confluence publishing is optional. Full functionality without MCP integrations."},{title:"Frontmatter as context summary",desc:"YAML frontmatter in each artifact provides compressed handoff for downstream skills. Decisions without prose."},{title:"S3 refines through the chain",desc:"v1 after feasibility, v2 after architecture, v3 after threats. Requirements evolve as design surfaces constraints."},{title:"Interactive skills brainstorm, agentic skills verify",desc:"S1–S5, S7 are conversational. S6, S8–S9 are autonomous checklist execution — agents verify, humans approve at gates."},{title:"Pattern compliance with graceful handling",desc:"Approved patterns marked compliant. Unrecognized patterns flagged as 'needs review' — warning, not failure. Sparse approved-patterns.md files work fine."},{title:"Traceability throughout",desc:"Scope → requirements → architecture → stories. Labels (REQ-xxx, ADR-xxx, THR-xxx) maintain chain visibility."},{title:"Human gates as context enrichment",desc:"Reviews aren't just approvals. Corrections feed back as context, making AI output progressively more aligned."},{title:"Defense in depth for security",desc:"S5 models threats during design (STRIDE + ASVS, collaborative). S8 assesses finished design (MITRE ATT&CK + compliance frameworks, independent)."}];

// ---- UI Components ----
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
                  {pi===0&&<div style={{borderBottom:"1px dashed #1A2636",margin:"14px 0 6px",position:"relative"}}><span style={{position:"absolute",top:-6,left:"50%",transform:"translateX(-50%)",background:"#080C14",padding:"0 6px",fontSize:7.5,color:"#253446",letterSpacing:"0.1em"}}>S3 REFINEMENT GATE</span></div>}
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
              <div style={{fontSize:8.5,fontWeight:700,letterSpacing:"0.15em",color:"#4A80C4",marginBottom:8}}>CORE SERVERS (ALL OPTIONAL)</div>
              {mcpServers.map(m=>(
                <button key={m.id} onClick={()=>setActiveMcp(m.id)}
                  style={{display:"block",width:"100%",textAlign:"left",padding:"9px 11px",marginBottom:2,background:activeMcp===m.id?"#0B3D9118":"transparent",border:activeMcp===m.id?"1px solid #4A80C425":"1px solid transparent",borderRadius:4,cursor:"pointer",fontFamily:"inherit",color:activeMcp===m.id?"#DDE8F0":"#546E84"}}>
                  <div style={{display:"flex",alignItems:"center",gap:7}}><div style={{width:6,height:6,borderRadius:"50%",background:m.color}}/><span style={{fontSize:10.5,fontWeight:600}}>{m.name}</span></div>
                  <div style={{fontSize:8.5,color:"#2D4558",paddingLeft:13}}>Used by: {m.usedBy.join(", ")}</div>
                </button>
              ))}
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
                </div>);
              })()}
            </div>
          </div>
        )}

        {activeTab==="flow"&&(
          <div>
            <p style={{fontSize:10.5,lineHeight:1.65,color:"#6B90AC",marginBottom:18,maxWidth:640}}>
              Context flows via structured handoffs. Interactive skills (S1–S5, S7) produce artifacts through human-AI collaboration. Agentic skills (S6, S8–S9) consume those artifacts autonomously and produce verification reports for human approval at gates.
            </p>
            <div style={{display:"flex",flexDirection:"column",gap:2,marginBottom:24}}>
              {contextFlow.map((f,i)=>{
                const isAgentic=f.to.match(/S[689]/);
                return(
                <div key={i} style={{display:"flex",alignItems:"stretch"}}>
                  <div style={{width:70,padding:"8px 4px",background:f.from.includes("ALL")||f.from.includes("–")?"#12101E":"#0A0F18",borderRadius:"4px 0 0 4px",border:"1px solid #151E2D",borderRight:"none",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <span style={{fontSize:9,fontWeight:700,color:f.from.includes("ALL")||f.from.includes("–")?"#9B8EC4":"#4A80C4"}}>{f.from}</span>
                  </div>
                  <div style={{width:28,display:"flex",alignItems:"center",justifyContent:"center",borderTop:"1px solid #151E2D",borderBottom:"1px solid #151E2D"}}><span style={{color:"#253446",fontSize:11}}>→</span></div>
                  <div style={{width:50,padding:"8px 4px",background:isAgentic?"#0E0818":"#0A0F18",border:`1px solid ${isAgentic?"#1A1230":"#151E2D"}`,borderLeft:"none",borderRight:"none",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <span style={{fontSize:9,fontWeight:700,color:isAgentic?"#B39DDB":"#4A80C4"}}>{f.to}</span>
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

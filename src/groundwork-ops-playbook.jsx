import { useState } from "react";

const MOCHA = "#6B4F3A";
const AMBER = "#7A6A3C";
const CAMEL = "#C19A6B";
const IVORY = "#F5F0E8";
const DARK_MOCHA = "#3D2B1F";
const TEAL = "#5B7B7A";
const OLIVE = "#6B7A3C";
const LIGHT_TAN = "#EDE8E0";
const RED = "#C0392B";
const RED_BG = "#FDECEA";

const STORAGE_KEY = "gwc_playbook_data";

const printStyles = `
  @media print {
    button, a[href^="mailto"] { display: none !important; }
    body { background: white !important; }
    * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
`;

// ─── DATA ────────────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: "overview",
    title: "Business Overview",
    icon: " ",
    color: MOCHA,
    description: "The foundation of your business. What it does, who it serves, and how it makes decisions.",
    fields: [
      { id: "businessName", label: "Business Name", type: "text", placeholder: "Your registered business name" },
      { id: "tagline", label: "What do you do in one sentence?", type: "text", placeholder: "e.g. We build and repair roofs for homeowners and commercial properties across the Niagara region." },
      { id: "founded", label: "When was the business founded?", type: "text", placeholder: "Year and any relevant context" },
      { id: "whoWeServe", label: "Who are your ideal clients or customers?", type: "textarea", placeholder: "Be specific. Industry, size, location, type of work, what they typically need from you." },
      { id: "whatWeDoWell", label: "What does your business do better than anyone else?", type: "textarea", placeholder: "What's the real reason clients choose you over the competition?" },
      { id: "values", label: "What values guide how your business operates?", type: "list", placeholder: "e.g. We show up when we say we will.", hint: "These aren't your marketing values - they're the ones that actually affect daily decisions." },
      { id: "howDecisionsMade", label: "How are major decisions made in your business?", type: "textarea", placeholder: "Who has final say? What gets delegated? What always comes to the owner?" },
      { id: "notDoing", label: "What does your business intentionally not do?", type: "textarea", placeholder: "What do you turn down? What's outside your scope? Being clear on this prevents your scope from expanding beyond your capabilities and bad-fit clients." },
    ]
  },
  {
    id: "team",
    title: "Team Structure",
    icon: " ",
    color: TEAL,
    description: "Who's on the team, what they own, and how the structure actually works.",
    fields: [
      { id: "teamSize", label: "How many people work in this business (including you)?", type: "text", placeholder: "Full-time, part-time, contractors? Anyone else?" },
      { id: "orgStructure", label: "Describe the team structure", type: "textarea", placeholder: "Who reports to who? How is the business organized? Draw it out in words if you can't upload a chart. E.g. Front line administrators (Sarah, John and Tabitha) report to the department head (Jessica)." },
      { id: "roles", label: "List each role and what that person is primarily responsible for", type: "rolelist", hint: "Provide details. Write what they actually do, not just their job title." },
      { id: "keyPeople", label: "Who are the most critical people in your operation right now?", type: "textarea", placeholder: "Who would the business struggle most without? What do they know or do that nobody else does?" },
      { id: "hiringProcess", label: "How do you currently hire?", type: "textarea", placeholder: "Where do you find people? What's your process? What do you look for?" },
      { id: "teamChallenges", label: "What are the biggest team or people challenges right now?", type: "textarea", placeholder: "Turnover? Skill gaps? Unclear roles?" },
    ]
  },
  {
    id: "processes",
    title: "Core Processes",
    icon: " ",
    color: AMBER,
    description: "The repeatable work that keeps the business running. If it happens more than once, it belongs here.",
    hint: "Most businesses have 5-10 core processes. Focus on the ones that break when someone is away.",
    fields: [
      { id: "coreProcessList", label: "List your core business processes", type: "processlist", hint: "Think about what happens every day, every week, and every month. What are the sequences of steps your team follows to get work done?" },
      { id: "mostBroken", label: "Which of these processes breaks down most often?", type: "textarea", placeholder: "What goes wrong, how often, and what's the usual cause?" },
      { id: "ownerDependent", label: "Which processes can only run when you're personally involved?", type: "textarea", placeholder: "Where are you the bottleneck? What stops when you're not there?" },
      { id: "undocumented", label: "What important processes exist only in someone's head right now?", type: "textarea", placeholder: "What institutional knowledge hasn't been written down yet?" },
    ],
    nudge: "If you found this section hard to fill out, that's the point. The processes that are hard to document are the ones that will cost you the most when something goes wrong. They're the processes that fall to one or two core people because it takes them too long to explain or handoff, and would rather just do the work themselves. This is exactly where a Groundwork Audit adds the most value."
  },
  {
    id: "tools",
    title: "Tools & Systems",
    icon: " ",
    color: "#8B5E3C",
    description: "Every tool, platform, and system the business relies on, and what it's actually used for.",
    fields: [
      { id: "toolsList", label: "List every tool or system your business uses", type: "toolslist", hint: "Include everything: software, apps, spreadsheets, paper systems, anything the business depends on." },
      { id: "masterLogin", label: "Where are login credentials and account access stored?", type: "textarea", placeholder: "Who has access? Where is this information kept? What happens if that person is unavailable?" },
      { id: "toolsWorking", label: "What tools are working well?", type: "textarea", placeholder: "What would you keep even if you rebuilt the whole operation?" },
      { id: "toolsNotWorking", label: "What tools are causing problems or being underused?", type: "textarea", placeholder: "What are you paying for that nobody really uses? What creates more work than it saves?" },
      { id: "integrations", label: "Do your tools talk to each other?", type: "textarea", placeholder: "Where is information entered manually more than once? Where do things fall through the cracks between systems?" },
    ]
  },
  {
    id: "client",
    title: "Client Journey",
    icon: " ",
    color: OLIVE,
    description: "What a client experiences from the first time they hear about you until after the work is done.",
    fields: [
      { id: "howFindUs", label: "How do clients typically find you?", type: "list", placeholder: "e.g. Word of mouth, Google, repeat business, referrals from trades" },
      { id: "firstContact", label: "What happens when a new client first makes contact?", type: "textarea", placeholder: "Who answers? What do they say? What information do you collect? What happens next?" },
      { id: "quoteToJob", label: "How does a prospect become a confirmed client or job?", type: "textarea", placeholder: "Walk through the steps from first conversation to signed agreement or confirmed booking." },
      { id: "duringWork", label: "What does the client experience while the work is being done?", type: "textarea", placeholder: "How often do you communicate? Who is their point of contact? How are changes or issues handled?" },
      { id: "jobCompletion", label: "How does a job or service end?", type: "textarea", placeholder: "What's the sign-off process? How is final payment handled? What documentation does the client receive?" },
      { id: "afterJob", label: "What happens after the job is done?", type: "textarea", placeholder: "Follow-up, reviews, warranty, repeat business, etc. What's the process?" },
      { id: "clientExperienceGaps", label: "Where does the client experience break down most often?", type: "textarea", placeholder: "What do clients complain about? Where does the process get inconsistent?" },
    ]
  },
  {
    id: "financial",
    title: "Financial Basics",
    icon: " ",
    color: "#7B6F9E",
    description: "How money moves through the business? Not necessarily financial strategy, just operational visibility.",
    hint: "You don't need to share specific numbers here. Focus on the processes and who owns them.",
    fields: [
      { id: "revenueStreams", label: "How does the business make money?", type: "list", placeholder: "e.g. Project-based work, retainer clients, product or service sales, memberships" },
      { id: "invoicingProcess", label: "How and when does invoicing happen?", type: "textarea", placeholder: "Who creates invoices? When are they sent? What system is used? What are the payment terms?" },
      { id: "arProcess", label: "How are outstanding payments tracked and followed up?", type: "textarea", placeholder: "Who monitors AR? What's the follow-up process when payment is late?" },
      { id: "expenseProcess", label: "How are expenses tracked and approved?", type: "textarea", placeholder: "Who can spend money? Up to what amount without approval? How are expenses logged?" },
      { id: "financialVisibility", label: "How does the owner currently know if the business is profitable?", type: "textarea", placeholder: "What reports do you look at? How often? What would a CRA audit reveal?" },
      { id: "financialRisk", label: "What are the biggest financial risks or blind spots right now?", type: "textarea", placeholder: "Late payments? Seasonal cash flow? Untracked expenses?" },
    ],
    nudge: "If you couldn't answer some of these questions, that indicates a significant operational risk. Financial visibility problems are almost always process problems in disguise. It's not helpful to avoid these conversations. Consider this a flag worth addressing."
  },
  {
    id: "continuity",
    title: "Emergency & Continuity",
    icon: " ",
    color: RED,
    description: "What happens to this business if the owner is suddenly unavailable for a day, a week, or longer?",
    fields: [
      { id: "ownerAbsence", label: "What stops if you are unavailable for one week?", type: "textarea", placeholder: "Be specific and honest. What would your team not be able to handle without you?" },
      { id: "criticalContacts", label: "Who are the critical contacts this business depends on?", type: "contactlist", hint: "Clients, vendors, accountant, lawyer, bank? Anyone the business couldn't function without access to." },
      { id: "accessInfo", label: "Where is critical access information stored?", type: "textarea", placeholder: "Banking, software logins, insurance policies, key contracts? Where is this and who can access it if you can't?" },
      { id: "emergencyPlan", label: "If you were incapacitated tomorrow, who would run the business?", type: "textarea", placeholder: "Is there a person designated? Do they know? What supports or resources would they need that they don't currently have?" },
      { id: "keyDocuments", label: "Where are the following documents stored?", type: "doclist" },
      { id: "insuranceCoverage", label: "What insurance coverage does the business carry?", type: "textarea", placeholder: "General liability, errors & omissions, commercial auto, key person? What's in place and where is the documentation?" },
      { id: "exitReadiness", label: "If you wanted to sell this business in three years, what would need to exist that doesn't right now?", type: "textarea", placeholder: "This question reveals more about operational gaps than almost any other. Be honest." },
    ],
    nudge: "If answering these questions made you uncomfortable, that discomfort is important information. A business that only runs when the owner is present is a job, and removes the freedom that should come with owning a business. This is exactly what Groundwork Consult helps fix."
  }
];

// ─── FIELD COMPONENTS ────────────────────────────────────────────────────────

function TextField({ field, value, onChange }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={labelStyle}>{field.label}</label>
      {field.hint && <p style={hintStyle}>{field.hint}</p>}
      <input value={value || ""} onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder} style={{ ...inputStyle, width: "100%", boxSizing: "border-box" }} />
    </div>
  );
}

function TextareaField({ field, value, onChange }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={labelStyle}>{field.label}</label>
      {field.hint && <p style={hintStyle}>{field.hint}</p>}
      <textarea value={value || ""} onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder} style={{ ...textareaStyle, minHeight: 90 }} rows={4} />
    </div>
  );
}

function ListField({ field, value = [""], onChange }) {
  function update(i, v) { const a = [...value]; a[i] = v; onChange(a); }
  function add() { onChange([...value, ""]); }
  function remove(i) { onChange(value.filter((_, idx) => idx !== i)); }
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={labelStyle}>{field.label}</label>
      {field.hint && <p style={hintStyle}>{field.hint}</p>}
      {value.map((v, i) => (
        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: AMBER, flexShrink: 0 }} />
          <input value={v} onChange={(e) => update(i, e.target.value)}
            placeholder={field.placeholder} style={{ ...inputStyle, flex: 1 }} />
          {value.length > 1 && (
            <button onClick={() => remove(i)} style={removeBtnStyle}>×</button>
          )}
        </div>
      ))}
      <button onClick={add} style={addBtnStyle}>+ Add item</button>
    </div>
  );
}

function RoleList({ field, value = [{ name: "", title: "", owns: "" }], onChange }) {
  function update(i, k, v) { const a = [...value]; a[i] = { ...a[i], [k]: v }; onChange(a); }
  function add() { onChange([...value, { name: "", title: "", owns: "" }]); }
  function remove(i) { onChange(value.filter((_, idx) => idx !== i)); }
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={labelStyle}>{field.label}</label>
      {field.hint && <p style={hintStyle}>{field.hint}</p>}
      {value.map((r, i) => (
        <div key={i} style={{ background: IVORY, borderRadius: 8, padding: "14px 16px", marginBottom: 10, border: `1px solid ${LIGHT_TAN}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ fontSize: 12, color: CAMEL, fontWeight: 700 }}>Team Member {i + 1}</div>
            {value.length > 1 && <button onClick={() => remove(i)} style={removeBtnStyle}>Remove</button>}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            <input value={r.name} onChange={(e) => update(i, "name", e.target.value)}
              placeholder="Name" style={inputStyle} />
            <input value={r.title} onChange={(e) => update(i, "title", e.target.value)}
              placeholder="Role/Title" style={inputStyle} />
          </div>
          <textarea value={r.owns} onChange={(e) => update(i, "owns", e.target.value)}
            placeholder="What are they primarily responsible for? What would stop without them?" style={{ ...textareaStyle, minHeight: 60 }} rows={2} />
        </div>
      ))}
      <button onClick={add} style={addBtnStyle}>+ Add team member</button>
    </div>
  );
}

function ProcessList({ field, value = [{ name: "", steps: ["", ""], owner: "" }], onChange }) {
  function updateProcess(i, k, v) { const a = [...value]; a[i] = { ...a[i], [k]: v }; onChange(a); }
  function updateStep(pi, si, v) {
    const a = [...value]; const steps = [...a[pi].steps]; steps[si] = v; a[pi] = { ...a[pi], steps }; onChange(a);
  }
  function addStep(pi) {
    const a = [...value]; a[pi] = { ...a[pi], steps: [...a[pi].steps, ""] }; onChange(a);
  }
  function addProcess() { onChange([...value, { name: "", steps: ["", ""], owner: "" }]); }
  function removeProcess(i) { onChange(value.filter((_, idx) => idx !== i)); }

  return (
    <div style={{ marginBottom: 20 }}>
      <label style={labelStyle}>{field.label}</label>
      {field.hint && <p style={hintStyle}>{field.hint}</p>}
      {value.map((p, pi) => (
        <div key={pi} style={{ background: IVORY, borderRadius: 10, padding: "18px", marginBottom: 14, border: `1px solid ${LIGHT_TAN}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: DARK_MOCHA }}>Process {pi + 1}</div>
            {value.length > 1 && <button onClick={() => removeProcess(pi)} style={removeBtnStyle}>Remove</button>}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
            <input value={p.name} onChange={(e) => updateProcess(pi, "name", e.target.value)}
              placeholder="Process name (e.g. Client Onboarding)" style={inputStyle} />
            <input value={p.owner} onChange={(e) => updateProcess(pi, "owner", e.target.value)}
              placeholder="Who owns this process?" style={inputStyle} />
          </div>
          <div style={{ fontSize: 11, color: CAMEL, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Steps</div>
          {p.steps.map((s, si) => (
            <div key={si} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: LIGHT_TAN, color: MOCHA, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{si + 1}</div>
              <input value={s} onChange={(e) => updateStep(pi, si, e.target.value)}
                placeholder={`Step ${si + 1}`} style={{ ...inputStyle, flex: 1 }} />
              {p.steps.length > 1 && (
                <button onClick={() => {
                  const a = [...value]; a[pi] = { ...a[pi], steps: a[pi].steps.filter((_, idx) => idx !== si) }; onChange(a);
                }} style={removeBtnStyle}>×</button>
              )}
            </div>
          ))}
          <button onClick={() => addStep(pi)} style={{ ...addBtnStyle, fontSize: 11 }}>+ Add step</button>
        </div>
      ))}
      <button onClick={addProcess} style={addBtnStyle}>+ Add another process</button>
    </div>
  );
}

function ToolsList({ field, value = [{ name: "", purpose: "", owner: "" }], onChange }) {
  function update(i, k, v) { const a = [...value]; a[i] = { ...a[i], [k]: v }; onChange(a); }
  function add() { onChange([...value, { name: "", purpose: "", owner: "" }]); }
  function remove(i) { onChange(value.filter((_, idx) => idx !== i)); }
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={labelStyle}>{field.label}</label>
      {field.hint && <p style={hintStyle}>{field.hint}</p>}
      <div style={{ display: "grid", gridTemplateColumns: "150px 1fr 130px", gap: 0, marginBottom: 8 }}>
        {["Tool / System", "What it's used for", "Who manages it"].map(h => (
          <div key={h} style={{ padding: "7px 12px", fontSize: 11, color: CAMEL, fontWeight: 700, background: LIGHT_TAN, textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</div>
        ))}
      </div>
      {value.map((t, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "150px 1fr 130px", gap: 0, marginBottom: 4, background: "white", borderRadius: 4, border: `1px solid ${LIGHT_TAN}` }}>
          <input value={t.name} onChange={(e) => update(i, "name", e.target.value)}
            placeholder="e.g. QuickBooks" style={{ ...inlineCellStyle }} />
          <input value={t.purpose} onChange={(e) => update(i, "purpose", e.target.value)}
            placeholder="e.g. Invoicing and expense tracking" style={{ ...inlineCellStyle, borderLeft: `1px solid ${LIGHT_TAN}` }} />
          <div style={{ display: "flex", alignItems: "center" }}>
            <input value={t.owner} onChange={(e) => update(i, "owner", e.target.value)}
              placeholder="Name/Role" style={{ ...inlineCellStyle, borderLeft: `1px solid ${LIGHT_TAN}`, flex: 1 }} />
            {value.length > 1 && <button onClick={() => remove(i)} style={{ ...removeBtnStyle, padding: "0 8px" }}>×</button>}
          </div>
        </div>
      ))}
      <button onClick={add} style={{ ...addBtnStyle, marginTop: 8 }}>+ Add tool</button>
    </div>
  );
}

function ContactList({ field, value = [{ name: "", role: "", phone: "", email: "", notes: "" }], onChange }) {
  function update(i, k, v) { const a = [...value]; a[i] = { ...a[i], [k]: v }; onChange(a); }
  function add() { onChange([...value, { name: "", role: "", phone: "", email: "", notes: "" }]); }
  function remove(i) { onChange(value.filter((_, idx) => idx !== i)); }
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={labelStyle}>{field.label}</label>
      {field.hint && <p style={hintStyle}>{field.hint}</p>}
      {value.map((c, i) => (
        <div key={i} style={{ background: IVORY, borderRadius: 8, padding: "14px 16px", marginBottom: 10, border: `1px solid ${LIGHT_TAN}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ fontSize: 12, color: CAMEL, fontWeight: 700 }}>Contact {i + 1}</div>
            {value.length > 1 && <button onClick={() => remove(i)} style={removeBtnStyle}>Remove</button>}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 8 }}>
            <input value={c.name} onChange={(e) => update(i, "name", e.target.value)} placeholder="Name" style={inputStyle} />
            <input value={c.role} onChange={(e) => update(i, "role", e.target.value)} placeholder="Role, Company" style={inputStyle} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 8 }}>
            <input value={c.phone} onChange={(e) => update(i, "phone", e.target.value)} placeholder="Phone" style={inputStyle} />
            <input value={c.email} onChange={(e) => update(i, "email", e.target.value)} placeholder="Email" style={inputStyle} />
          </div>
          <input value={c.notes} onChange={(e) => update(i, "notes", e.target.value)} placeholder="Notes - e.g. our bookkeeper, handles all expense reports" style={{ ...inputStyle, width: "100%", boxSizing: "border-box" }} />
        </div>
      ))}
      <button onClick={add} style={addBtnStyle}>+ Add contact</button>
    </div>
  );
}

function DocList({ field, value = {}, onChange }) {
  const docs = [
    "Business registration/Certificate of Incorporation",
    "Primary passwords and/or login credentials",
    "Insurance policies",
    "Current contracts",
    "Client lists and contact information",
    "Lease or property agreements",
    "Bank account information",
    "HST/CRA account information",
    "Employment contracts and personnel files",
    "Vendor agreements",
  ];
  function update(doc, v) { onChange({ ...value, [doc]: v }); }
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={labelStyle}>{field.label}</label>
      <div style={{ background: "white", borderRadius: 8, border: `1px solid ${LIGHT_TAN}`, overflow: "hidden" }}>
        {docs.map((doc, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: i < docs.length - 1 ? `1px solid ${LIGHT_TAN}` : "none" }}>
            <div style={{ padding: "10px 14px", fontSize: 13, color: DARK_MOCHA, borderRight: `1px solid ${LIGHT_TAN}` }}>{doc}</div>
            <input value={value[doc] || ""} onChange={(e) => update(doc, e.target.value)}
              placeholder=" " style={{ ...inlineCellStyle, fontSize: 12 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function renderField(field, value, onChange) {
  switch (field.type) {
    case "text": return <TextField field={field} value={value} onChange={onChange} />;
    case "textarea": return <TextareaField field={field} value={value} onChange={onChange} />;
    case "list": return <ListField field={field} value={value} onChange={onChange} />;
    case "rolelist": return <RoleList field={field} value={value} onChange={onChange} />;
    case "processlist": return <ProcessList field={field} value={value} onChange={onChange} />;
    case "toolslist": return <ToolsList field={field} value={value} onChange={onChange} />;
    case "contactlist": return <ContactList field={field} value={value} onChange={onChange} />;
    case "doclist": return <DocList field={field} value={value} onChange={onChange} />;
    default: return null;
  }
}

// ─── COMPLETION ───────────────────────────────────────────────────────────────
function getSectionCompletion(section, data) {
  const sectionData = data[section.id] || {};
  const answered = section.fields.filter(f => {
    const val = sectionData[f.id];
    if (!val) return false;
    if (typeof val === "string") return val.trim().length > 0;
    if (Array.isArray(val)) return val.some(v => typeof v === "string" ? v.trim() : Object.values(v).some(x => x));
    if (typeof val === "object") return Object.values(val).some(v => v);
    return false;
  });
  return Math.round((answered.length / section.fields.length) * 100);
}

// ─── PLAYBOOK VIEW ────────────────────────────────────────────────────────────
function PlaybookView({ data, onBack }) {
  return (
    <div style={{ minHeight: "100vh", background: IVORY, fontFamily: "sans-serif", padding: "32px 20px 60px" }}>
      <style>{printStyles}</style>  {/* ← add it here */}
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
  <button onClick={onBack} style={{ background: "none", border: "none", color: CAMEL, cursor: "pointer", fontSize: 13, padding: 0 }}>← Back to Builder</button>
  <div style={{ display: "flex", gap: 8 }}>
    <button onClick={() => window.print()} style={{ background: MOCHA, border: "none", borderRadius: 6, padding: "8px 16px", color: IVORY, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
      🖨 Print / Save as PDF
    </button>
    
  </div>
</div>

        {/* Cover */}
        <div style={{ background: DARK_MOCHA, borderRadius: 12, padding: "40px 44px", marginBottom: 24, textAlign: "center" }}>
          <div style={{ fontSize: 11, color: CAMEL, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Groundwork Consult</div>
          <h1 style={{ fontSize: 32, color: IVORY, margin: "0 0 8px", fontFamily: "Georgia, serif" }}>
            {data.overview?.businessName || "Your Business"} Operations Playbook
          </h1>
          <div style={{ width: 48, height: 2, background: AMBER, margin: "12px auto 16px" }} />
          <p style={{ fontSize: 14, color: CAMEL, margin: 0 }}>
            {data.overview?.tagline || "A complete guide to how this business runs."}
          </p>
          <div style={{ marginTop: 24, fontSize: 12, color: "#6B6B6B" }}>
            Created with Groundwork Consult · groundworkconsult.ca
          </div>
        </div>

        {/* Table of contents */}
        <div style={{ background: "white", borderRadius: 10, padding: "20px 24px", marginBottom: 24, border: `1px solid ${LIGHT_TAN}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: DARK_MOCHA, marginBottom: 14 }}>Contents</div>
          {SECTIONS.map((s, i) => (
            <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 16 }}>{s.icon}</span>
              <span style={{ fontSize: 14, color: DARK_MOCHA }}>{i + 1}. {s.title}</span>
            </div>
          ))}
        </div>

        {/* Sections */}
        {SECTIONS.map((section, sIdx) => {
          const sData = data[section.id] || {};
          return (
            <div key={section.id} style={{ background: "white", borderRadius: 12, marginBottom: 20, border: `1px solid ${LIGHT_TAN}`, overflow: "hidden" }}>
              <div style={{ background: section.color, padding: "18px 28px" }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 4 }}>Section {sIdx + 1}</div>
                <h2 style={{ fontSize: 22, color: "white", margin: 0, fontFamily: "Georgia, serif" }}>{section.title}</h2>
              </div>
              <div style={{ padding: "24px 28px" }}>
                {section.fields.map(f => {
                  const val = sData[f.id];
                  if (!val || (typeof val === "string" && !val.trim())) return null;
                  return (
                    <div key={f.id} style={{ marginBottom: 20 }}>
                      <div style={{ fontSize: 11, color: CAMEL, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{f.label}</div>
                      {typeof val === "string" && (
                        <p style={{ fontSize: 14, color: DARK_MOCHA, margin: 0, lineHeight: 1.7 }}>{val}</p>
                      )}
                      {Array.isArray(val) && val[0] && typeof val[0] === "string" && (
                        <ul style={{ margin: 0, paddingLeft: 20 }}>
                          {val.filter(Boolean).map((v, i) => <li key={i} style={{ fontSize: 14, color: DARK_MOCHA, marginBottom: 4, lineHeight: 1.6 }}>{v}</li>)}
                        </ul>
                      )}
                      {Array.isArray(val) && val[0] && typeof val[0] === "object" && val[0].name !== undefined && val[0].owns !== undefined && (
                        <div>
                          {val.filter(r => r.name || r.title).map((r, i) => (
                            <div key={i} style={{ background: IVORY, borderRadius: 6, padding: "10px 14px", marginBottom: 8 }}>
                              <div style={{ fontSize: 14, fontWeight: 700, color: DARK_MOCHA }}>{r.name} {r.title && <span style={{ color: CAMEL, fontWeight: 400 }}>· {r.title}</span>}</div>
                              {r.owns && <p style={{ fontSize: 13, color: MOCHA, margin: "4px 0 0", lineHeight: 1.6 }}>{r.owns}</p>}
                            </div>
                          ))}
                        </div>
                      )}
                      {Array.isArray(val) && val[0] && typeof val[0] === "object" && val[0].name !== undefined && val[0].steps !== undefined && (
                        <div>
                          {val.filter(p => p.name).map((p, i) => (
                            <div key={i} style={{ background: IVORY, borderRadius: 8, padding: "14px 16px", marginBottom: 10 }}>
                              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: DARK_MOCHA }}>{p.name}</div>
                                {p.owner && <div style={{ fontSize: 12, color: CAMEL }}>Owner: {p.owner}</div>}
                              </div>
                              {p.steps.filter(Boolean).map((s, si) => (
                                <div key={si} style={{ display: "flex", gap: 10, marginBottom: 6 }}>
                                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: LIGHT_TAN, color: MOCHA, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{si + 1}</div>
                                  <span style={{ fontSize: 13, color: DARK_MOCHA, lineHeight: 1.6 }}>{s}</span>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                      {Array.isArray(val) && val[0] && typeof val[0] === "object" && val[0].name !== undefined && val[0].purpose !== undefined && (
                        <div style={{ overflowX: "auto" }}>
                          <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                              <tr style={{ background: LIGHT_TAN }}>
                                {["Tool", "Purpose", "Owner"].map(h => <th key={h} style={{ padding: "8px 12px", fontSize: 11, color: CAMEL, textAlign: "left", fontWeight: 700, textTransform: "uppercase" }}>{h}</th>)}
                              </tr>
                            </thead>
                            <tbody>
                              {val.filter(t => t.name).map((t, i) => (
                                <tr key={i} style={{ borderBottom: `1px solid ${LIGHT_TAN}` }}>
                                  <td style={{ padding: "8px 12px", fontSize: 13, color: DARK_MOCHA, fontWeight: 600 }}>{t.name}</td>
                                  <td style={{ padding: "8px 12px", fontSize: 13, color: MOCHA }}>{t.purpose}</td>
                                  <td style={{ padding: "8px 12px", fontSize: 13, color: CAMEL }}>{t.owner}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                      {Array.isArray(val) && val[0] && typeof val[0] === "object" && val[0].role !== undefined && (
                        <div>
                          {val.filter(c => c.name).map((c, i) => (
                            <div key={i} style={{ background: IVORY, borderRadius: 6, padding: "10px 14px", marginBottom: 8 }}>
                              <div style={{ fontSize: 14, fontWeight: 700, color: DARK_MOCHA }}>{c.name} <span style={{ color: CAMEL, fontWeight: 400, fontSize: 13 }}>· {c.role}</span></div>
                              <div style={{ fontSize: 12, color: MOCHA, marginTop: 4 }}>
                                {c.phone && <span style={{ marginRight: 16 }}>{c.phone}</span>}
                                {c.email && <span>{c.email}</span>}
                              </div>
                              {c.notes && <p style={{ fontSize: 12, color: CAMEL, margin: "4px 0 0" }}>{c.notes}</p>}
                            </div>
                          ))}
                        </div>
                      )}
                      {typeof val === "object" && !Array.isArray(val) && (
                        <div>
                          {Object.entries(val).filter(([, v]) => v).map(([doc, loc]) => (
                            <div key={doc} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${LIGHT_TAN}`, fontSize: 13 }}>
                              <span style={{ color: DARK_MOCHA }}>{doc}</span>
                              <span style={{ color: MOCHA }}>{loc}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div style={{ background: MOCHA, borderRadius: 12, padding: "28px", textAlign: "center", marginTop: 16 }}>
          <h3 style={{ fontSize: 18, color: IVORY, margin: "0 0 10px", fontFamily: "Georgia, serif" }}>Want help with what this revealed?</h3>
          <p style={{ fontSize: 13, color: CAMEL, margin: "0 0 20px", lineHeight: 1.7 }}>
            The Groundwork Audit takes you deeper. We offer a facilitated conversation, a scored findings report, and a prioritized roadmap for what to fix first.
          </p>
          <a href="mailto:jennifer@groundworkconsult.ca" style={{ display: "inline-block", background: AMBER, color: "white", borderRadius: 8, padding: "12px 28px", fontSize: 14, textDecoration: "none", fontWeight: 600 }}>
            Book a Conversation
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── SHARED STYLES ────────────────────────────────────────────────────────────
const labelStyle = { fontSize: 12, color: DARK_MOCHA, display: "block", marginBottom: 6, fontWeight: 700, lineHeight: 1.5 };
const hintStyle = { fontSize: 12, color: CAMEL, margin: "0 0 8px", fontStyle: "italic", lineHeight: 1.6 };
const inputStyle = { padding: "10px 12px", border: `1px solid ${LIGHT_TAN}`, borderRadius: 6, fontSize: 13, color: DARK_MOCHA, background: "white", outline: "none", fontFamily: "sans-serif" };
const textareaStyle = { width: "100%", padding: "10px 12px", border: `1px solid ${LIGHT_TAN}`, borderRadius: 6, fontSize: 13, color: DARK_MOCHA, background: "white", outline: "none", fontFamily: "sans-serif", resize: "vertical", boxSizing: "border-box" };
const addBtnStyle = { background: "none", border: `1px dashed ${CAMEL}`, borderRadius: 6, padding: "7px 14px", fontSize: 12, color: CAMEL, cursor: "pointer", fontFamily: "sans-serif" };
const removeBtnStyle = { background: "none", border: "none", color: CAMEL, cursor: "pointer", fontSize: 14, padding: "0 4px" };
const inlineCellStyle = { width: "100%", padding: "10px 12px", border: "none", fontSize: 13, color: DARK_MOCHA, background: "white", outline: "none", fontFamily: "sans-serif", boxSizing: "border-box" };

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function OpsPlaybook() {
  const [view, setView] = useState("home");
  const [activeSection, setActiveSection] = useState(0);
  const [data, setData] = useState(() => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch { return {}; }
});

  function updateField(sectionId, fieldId, value) {
  setData(p => {
    const updated = { ...p, [sectionId]: { ...(p[sectionId] || {}), [fieldId]: value } };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch {}
    return updated;
  });
}

  function getFieldValue(sectionId, fieldId) {
    return data[sectionId]?.[fieldId];
  }

  const overallCompletion = Math.round(
    SECTIONS.reduce((acc, s) => acc + getSectionCompletion(s, data), 0) / SECTIONS.length
  );

  if (view === "playbook") {
    return <PlaybookView data={data} onBack={() => setView("builder")} />;
  }

  if (view === "home") {
    return (
      <div style={{ minHeight: "100vh", background: IVORY, fontFamily: "sans-serif", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div style={{ maxWidth: 640, width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.2em", color: CAMEL, textTransform: "uppercase", marginBottom: 8 }}>Groundwork Consult</div>
          <h1 style={{ fontSize: 38, color: DARK_MOCHA, margin: "0 0 12px", fontFamily: "Georgia, serif", fontWeight: 700, lineHeight: 1.2 }}>Operations Playbook Builder</h1>
          <div style={{ width: 48, height: 3, background: AMBER, margin: "0 auto 20px" }} />
          <p style={{ fontSize: 15, color: MOCHA, lineHeight: 1.8, marginBottom: 12, maxWidth: 500, margin: "0 auto 12px" }}>
            A business that only runs when you're in the room isn't a business, it's a job. This tool helps you change that.
          </p>
          <p style={{ fontSize: 14, color: CAMEL, lineHeight: 1.7, marginBottom: 36, maxWidth: 480, margin: "0 auto 36px" }}>
            Work through 7 sections to build a complete operations playbook, a living document that captures how your business actually runs.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 36, textAlign: "left" }}>
            {[["7 sections", "covering every key area"], ["At your pace", "save and return anytime"], ["Real output", "a document you can actually use"]].map(([val, desc]) => (
              <div key={val} style={{ background: "white", borderRadius: 8, padding: "14px 16px", border: `1px solid ${LIGHT_TAN}` }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: DARK_MOCHA, marginBottom: 3 }}>{val}</div>
                <div style={{ fontSize: 11, color: CAMEL }}>{desc}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
  <button onClick={() => setView("builder")} style={{ background: MOCHA, color: IVORY, border: "none", borderRadius: 8, padding: "16px 48px", fontSize: 16, cursor: "pointer", fontFamily: "sans-serif", fontWeight: 600 }}>
    {Object.keys(data).length > 0 ? "Continue Where I Left Off →" : "Start Building →"}
  </button>
  {Object.keys(data).length > 0 && (
    <button onClick={() => { localStorage.removeItem(STORAGE_KEY); setData({}); }} style={{ background: "none", border: "none", color: CAMEL, cursor: "pointer", fontSize: 12, textDecoration: "underline" }}>
      Start over
    </button>
  )}
</div>
          <div style={{ marginTop: 16, fontSize: 12, color: CAMEL }}>groundworkconsult.ca · jennifer@groundworkconsult.ca</div>
        </div>
      </div>
    );
  }

  const section = SECTIONS[activeSection];
  const sectionData = data[section.id] || {};
  const completion = getSectionCompletion(section, data);

  return (
    <div style={{ minHeight: "100vh", background: IVORY, fontFamily: "sans-serif" }}>
      {/* Top bar */}
      <div style={{ background: DARK_MOCHA, padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 13, color: CAMEL, fontFamily: "Georgia, serif" }}>Groundwork Consult · Operational Playbook</div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 12, color: CAMEL }}>{overallCompletion}% complete</div>
          <button onClick={() => setView("playbook")} style={{ background: AMBER, border: "none", borderRadius: 6, padding: "7px 16px", color: "white", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
            Preview Playbook →
          </button>
        </div>
      </div>

      {/* Progress */}
      <div style={{ height: 4, background: LIGHT_TAN }}>
        <div style={{ height: "100%", width: `${overallCompletion}%`, background: AMBER, transition: "width 0.3s" }} />
      </div>

      <div style={{ display: "flex", maxWidth: 960, margin: "0 auto", padding: "28px 20px 60px", gap: 28 }}>
        {/* Sidebar */}
        <div style={{ width: 220, flexShrink: 0 }}>
          {SECTIONS.map((s, i) => {
            const comp = getSectionCompletion(s, data);
            const active = i === activeSection;
            return (
              <button key={s.id} onClick={() => setActiveSection(i)} style={{
                width: "100%", background: active ? "white" : "transparent",
                border: active ? `1px solid ${LIGHT_TAN}` : "1px solid transparent",
                borderRadius: 8, padding: "12px 14px", textAlign: "left", cursor: "pointer",
                marginBottom: 4, boxShadow: active ? "0 2px 8px rgba(107,79,58,0.06)" : "none",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 16 }}>{s.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: active ? 700 : 400, color: active ? DARK_MOCHA : MOCHA }}>{s.title}</span>
                </div>
                <div style={{ height: 3, background: LIGHT_TAN, borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${comp}%`, background: comp === 100 ? OLIVE : AMBER, transition: "width 0.3s" }} />
                </div>
              </button>
            );
          })}

          <button onClick={() => setView("home")} style={{ width: "100%", background: "none", border: "none", color: CAMEL, cursor: "pointer", fontSize: 12, padding: "12px 14px", textAlign: "left", marginTop: 8 }}>
            ← Back to Home
          </button>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <span style={{ fontSize: 28 }}>{section.icon}</span>
              <h2 style={{ fontSize: 26, color: DARK_MOCHA, margin: 0, fontFamily: "Georgia, serif" }}>{section.title}</h2>
            </div>
            <div style={{ width: 36, height: 2, background: AMBER, marginBottom: 10 }} />
            <p style={{ fontSize: 14, color: MOCHA, margin: "0 0 4px", lineHeight: 1.7 }}>{section.description}</p>
            {section.hint && <p style={{ fontSize: 13, color: CAMEL, margin: 0, fontStyle: "italic" }}>{section.hint}</p>}
          </div>

          <div style={{ background: "white", borderRadius: 10, padding: "28px", border: `1px solid ${LIGHT_TAN}`, marginBottom: 16 }}>
            {section.fields.map(field => (
              <div key={field.id}>
                {renderField(field, getFieldValue(section.id, field.id), (val) => updateField(section.id, field.id, val))}
              </div>
            ))}
          </div>

          {section.nudge && (
            <div style={{ background: "#FEF3E2", border: `1px solid ${AMBER}`, borderRadius: 8, padding: "14px 18px", marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: AMBER, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Worth noting:</div>
              <p style={{ fontSize: 13, color: DARK_MOCHA, margin: 0, lineHeight: 1.7, fontStyle: "italic" }}>{section.nudge}</p>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button onClick={() => { setActiveSection(p => Math.max(0, p - 1)); window.scrollTo(0, 0); }} disabled={activeSection === 0}
              style={{ padding: "11px 22px", borderRadius: 8, border: `1px solid ${LIGHT_TAN}`, background: "white", color: activeSection === 0 ? LIGHT_TAN : MOCHA, cursor: activeSection === 0 ? "default" : "pointer", fontSize: 14 }}>
              ← Previous
            </button>
            {activeSection < SECTIONS.length - 1 ? (
              <button onClick={() => { setActiveSection(p => p + 1); window.scrollTo(0, 0); }}
style={{ padding: "11px 22px", borderRadius: 8, border: "none", background: MOCHA, color: IVORY, cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
Save + Continue →
              </button>
            ) : (
              <button onClick={() => setView("playbook")}
                style={{ padding: "11px 22px", borderRadius: 8, border: "none", background: AMBER, color: "white", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
                View My Playbook →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

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

const TOOLS = [
  { id: "job-description", label: "Job Description Builder" },
  { id: "raci", label: "RACI Chart" },
  { id: "ownership-map", label: "Ownership Map" },
  { id: "gap-finder", label: "Gap & Overlap Finder" },
];

// ─── JOB DESCRIPTION BUILDER ────────────────────────────────────────────────
function JobDescriptionBuilder() {
  const [form, setForm] = useState({
    title: "", department: "", reportsTo: "", summary: "",
    responsibilities: ["", "", "", ""],
    mustHave: ["", "", ""],
    niceToHave: ["", ""],
    decisionAuthority: "",
    successLooksLike: "",
  });
  const [exported, setExported] = useState(false);

  function update(field, value) { setForm((p) => ({ ...p, [field]: value })); }
  function updateList(field, idx, value) {
    setForm((p) => { const arr = [...p[field]]; arr[idx] = value; return { ...p, [field]: arr }; });
  }
  function addRow(field) { setForm((p) => ({ ...p, [field]: [...p[field], ""] })); }
  function removeRow(field, idx) {
    setForm((p) => { const arr = p[field].filter((_, i) => i !== idx); return { ...p, [field]: arr }; });
  }

  const complete = form.title && form.summary && form.responsibilities.some(Boolean);

  return (
    <div>
      <p style={{ fontSize: 14, color: MOCHA, marginBottom: 24, lineHeight: 1.7 }}>
        Build a clear, honest job description that sets expectations before someone is hired (and holds the role accountable after).
      </p>

      <Section title="Role Basics">
        <Row>
          <Field label="Job Title *" value={form.title} onChange={(v) => update("title", v)} placeholder="e.g. Team Lead, Front Desk Coordinator" />
          <Field label="Department/Team" value={form.department} onChange={(v) => update("department", v)} placeholder="e.g. Operations, Client Services" />
        </Row>
        <Field label="Reports To" value={form.reportsTo} onChange={(v) => update("reportsTo", v)} placeholder="e.g. General Manager, Owner" />
      </Section>

      <Section title="Role Summary *">
        <textarea value={form.summary} onChange={(e) => update("summary", e.target.value)}
          placeholder="In 2-3 sentences, what does this person do and why does the role exist? Write it the way you'd explain it to someone new."
          style={textareaStyle} rows={3} />
      </Section>

      <Section title="Core Responsibilities *">
        <p style={hintStyle}>What does this person actually do every day/week? Be as specific as possible. Try to avoid vague language that is applicable to multiple roles.</p>
        {form.responsibilities.map((r, i) => (
          <ListRow key={i} value={r} onChange={(v) => updateList("responsibilities", i, v)}
            onRemove={form.responsibilities.length > 2 ? () => removeRow("responsibilities", i) : null}
            placeholder={`Responsibility ${i + 1} — e.g. "Manages all client intake calls and books jobs in the system"`} />
        ))}
        <AddButton onClick={() => addRow("responsibilities")} label="Add responsibility" />
      </Section>

      <Section title="Must-Have Qualifications">
        <p style={hintStyle}>What does someone need to walk in the door with? Only list things you'd actually reject someone for not having.</p>
        {form.mustHave.map((r, i) => (
          <ListRow key={i} value={r} onChange={(v) => updateList("mustHave", i, v)}
            onRemove={form.mustHave.length > 1 ? () => removeRow("mustHave", i) : null}
            placeholder={`e.g. "Valid driver's license", "2+ years in high-ticket sales"`} />
        ))}
        <AddButton onClick={() => addRow("mustHave")} label="Add qualification" />
      </Section>

      <Section title="Nice-to-Have">
        <p style={hintStyle}>What would make someone stand out but isn't a dealbreaker?</p>
        {form.niceToHave.map((r, i) => (
          <ListRow key={i} value={r} onChange={(v) => updateList("niceToHave", i, v)}
            onRemove={form.niceToHave.length > 1 ? () => removeRow("niceToHave", i) : null}
            placeholder={`e.g. "Experience with ServiceTitan or similar software"`} />
        ))}
        <AddButton onClick={() => addRow("niceToHave")} label="Add nice-to-have" />
      </Section>

      <Section title="Decision Authority">
        <textarea value={form.decisionAuthority} onChange={(e) => update("decisionAuthority", e.target.value)}
          placeholder="What can this person decide on their own? What requires approval? Being explicit here prevents a lot of conflict later. e.g. 'Can approve purchases under $200. Anything above requires owner sign-off.'"
          style={textareaStyle} rows={3} />
      </Section>

      <Section title="What Success Looks Like">
        <textarea value={form.successLooksLike} onChange={(e) => update("successLooksLike", e.target.value)}
          placeholder="In 90 days, how will you know this person is doing a great job? Make it concrete. e.g. 'All jobs are booked within 24 hours of inquiry. Customer follow-up calls happen within 48 hours of job completion.'"
          style={textareaStyle} rows={3} />
      </Section>

      {complete && (
  <div style={{ background: DARK_MOCHA, borderRadius: 10, padding: "24px 28px", marginTop: 8 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
      <div style={{ fontSize: 13, color: CAMEL, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Preview — {form.title}</div>
      <button onClick={() => window.print()} style={{ background: AMBER, border: "none", borderRadius: 6, padding: "6px 14px", color: "white", cursor: "pointer", fontSize: 11, fontWeight: 600 }}>
        Print / Save PDF
      </button>
    </div>

    {(form.department || form.reportsTo) && (
      <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
        {form.department && (
          <div>
            <div style={{ fontSize: 11, color: AMBER, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Department</div>
            <div style={{ color: CAMEL, fontSize: 13 }}>{form.department}</div>
          </div>
        )}
        {form.reportsTo && (
          <div>
            <div style={{ fontSize: 11, color: AMBER, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Reports To</div>
            <div style={{ color: CAMEL, fontSize: 13 }}>{form.reportsTo}</div>
          </div>
        )}
      </div>
    )}

    {form.summary && (
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: AMBER, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Role Summary</div>
        <p style={{ color: CAMEL, fontSize: 13, lineHeight: 1.6, margin: 0 }}>{form.summary}</p>
      </div>
    )}

    {form.responsibilities.filter(Boolean).length > 0 && (
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: AMBER, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Core Responsibilities</div>
        {form.responsibilities.filter(Boolean).map((r, i) => <div key={i} style={{ color: CAMEL, fontSize: 13, marginBottom: 6 }}>• {r}</div>)}
      </div>
    )}

    {form.mustHave.filter(Boolean).length > 0 && (
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: AMBER, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Must-Have Qualifications</div>
        {form.mustHave.filter(Boolean).map((r, i) => <div key={i} style={{ color: CAMEL, fontSize: 13, marginBottom: 6 }}>• {r}</div>)}
      </div>
    )}

    {form.niceToHave.filter(Boolean).length > 0 && (
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: AMBER, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Nice to Have</div>
        {form.niceToHave.filter(Boolean).map((r, i) => <div key={i} style={{ color: CAMEL, fontSize: 13, marginBottom: 6 }}>• {r}</div>)}
      </div>
    )}

    {form.decisionAuthority && (
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: AMBER, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Decision Authority</div>
        <p style={{ color: CAMEL, fontSize: 13, lineHeight: 1.6, margin: 0 }}>{form.decisionAuthority}</p>
      </div>
    )}

    {form.successLooksLike && (
      <div>
        <div style={{ fontSize: 11, color: AMBER, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>What Success Looks Like</div>
        <p style={{ color: CAMEL, fontSize: 13, lineHeight: 1.6, margin: 0 }}>{form.successLooksLike}</p>
      </div>
    )}
  </div>
)}
    </div>
  );
}

// ─── RACI CHART ─────────────────────────────────────────────────────────────
function RACIChart() {
  const [roles, setRoles] = useState(["Owner", "Manager", "Team Member A", ""]);
  const [tasks, setTasks] = useState([
    { name: "Hire new staff", assignments: {} },
    { name: "Approve invoices", assignments: {} },
    { name: "Handle client complaints", assignments: {} },
    { name: "", assignments: {} },
  ]);

  const raciOptions = ["R", "A", "C", "I", ""];
  const raciColors = { R: MOCHA, A: AMBER, C: TEAL, I: OLIVE, "": "transparent" };
  const raciText = { R: IVORY, A: "white", C: IVORY, I: IVORY, "": CAMEL };

  function updateRole(i, v) { setRoles((p) => { const a = [...p]; a[i] = v; return a; }); }
  function addRole() { setRoles((p) => [...p, ""]); }
  function updateTask(i, field, v) {
    setTasks((p) => { const a = [...p]; a[i] = { ...a[i], [field]: v }; return a; });
  }
  function updateAssignment(taskIdx, roleIdx, current) {
    const next = { "": "R", R: "A", A: "C", C: "I", I: "" };
    setTasks((p) => {
      const a = [...p];
      const assignments = { ...a[taskIdx].assignments, [roleIdx]: next[current || ""] };
      a[taskIdx] = { ...a[taskIdx], assignments };
      return a;
    });
  }
  function addTask() { setTasks((p) => [...p, { name: "", assignments: {} }]); }

  const activeRoles = roles.filter(Boolean);

  return (
    <div>
      <p style={{ fontSize: 14, color: MOCHA, marginBottom: 16, lineHeight: 1.7 }}>
        Map who is Responsible, Accountable, Consulted, and Informed for each task. Click a cell to cycle through options.
      </p>
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        {[["R", "Responsible: Does the work"], ["A", "Accountable: Owns the outcome"], ["C", "Consulted: Input needed"], ["I", "Informed: Kept in the loop"]].map(([k, v]) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: MOCHA }}>
            <div style={{ width: 24, height: 24, borderRadius: 4, background: raciColors[k], display: "flex", alignItems: "center", justifyContent: "center", color: raciText[k], fontWeight: 700, fontSize: 12 }}>{k}</div>
            <span>{v}</span>
          </div>
        ))}
      </div>

      {/* Roles */}
      <Section title="Team Roles">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {roles.map((r, i) => (
            <input key={i} value={r} onChange={(e) => updateRole(i, e.target.value)}
              placeholder={`Role ${i + 1}`} style={{ ...inputStyle, width: 160 }} />
          ))}
          <button onClick={addRole} style={addBtnStyle}>+ Add Role</button>
        </div>
      </Section>

      {/* Matrix */}
      {activeRoles.length > 0 && (
        <Section title="Task Matrix">
          <p style={hintStyle}>Click any cell to cycle: → R → A → C → I → empty</p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "8px 12px", fontSize: 12, color: CAMEL, fontWeight: 700, borderBottom: `2px solid ${LIGHT_TAN}`, minWidth: 180 }}>Task / Process</th>
                  {roles.filter(Boolean).map((r, i) => (
                    <th key={i} style={{ padding: "8px 12px", fontSize: 12, color: CAMEL, fontWeight: 700, borderBottom: `2px solid ${LIGHT_TAN}`, textAlign: "center", minWidth: 80 }}>{r}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, ti) => (
                  <tr key={ti} style={{ borderBottom: `1px solid ${LIGHT_TAN}` }}>
                    <td style={{ padding: "8px 12px" }}>
                      <input value={task.name} onChange={(e) => updateTask(ti, "name", e.target.value)}
                        placeholder={`Task ${ti + 1} — e.g. "Handle client complaints"`}
                        style={{ ...inputStyle, width: "100%", fontSize: 13 }} />
                    </td>
                    {roles.map((r, ri) => r ? (
                      <td key={ri} style={{ padding: "6px", textAlign: "center" }}>
                        <button onClick={() => updateAssignment(ti, ri, task.assignments[ri])} style={{
                          width: 36, height: 36, borderRadius: 6, border: `1px solid ${LIGHT_TAN}`,
                          background: raciColors[task.assignments[ri] || ""] || "white",
                          color: raciText[task.assignments[ri] || ""] || CAMEL,
                          fontWeight: 700, fontSize: 13, cursor: "pointer",
                        }}>
                          {task.assignments[ri] || "·"}
                        </button>
                      </td>
                    ) : null)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 12 }}>
            <button onClick={addTask} style={addBtnStyle}>+ Add Task</button>
          </div>
        </Section>
      )}

      {/* Warning flags */}
      {tasks.some(t => t.name && !Object.values(t.assignments).includes("A")) && (
        <div style={{ background: RED_BG, border: `1px solid ${RED}`, borderRadius: 8, padding: "12px 16px", marginTop: 16 }}>
          <div style={{ fontSize: 13, color: RED, fontWeight: 700, marginBottom: 4 }}>⚠ Accountability Gap Detected</div>
          <div style={{ fontSize: 12, color: RED }}>One or more tasks have no one marked Accountable (A). Every task needs a single owner. This is where things fall through the cracks.</div>
        </div>
      )}
    </div>
  );
}

// ─── OWNERSHIP MAP ───────────────────────────────────────────────────────────
function OwnershipMap() {
  const categories = [
    { id: "ops", label: "Daily Operations", color: MOCHA, examples: "Opening/closing, scheduling, job coordination" },
    { id: "clients", label: "Client Relationships", color: TEAL, examples: "Intake, complaints, follow-up, repeat business" },
    { id: "finance", label: "Finance & Administration", color: AMBER, examples: "Invoicing, payments, expenses, payroll" },
    { id: "people", label: "People & Team", color: OLIVE, examples: "Hiring, onboarding, performance, conflicts" },
    { id: "vendors", label: "Vendors & Suppliers", color: "#8B5E52", examples: "Ordering, relationships, contracts" },
    { id: "growth", label: "Growth & Strategy", color: "#7B6F9E", examples: "New services, pricing, marketing decisions" },
  ];

  const [entries, setEntries] = useState(
    categories.reduce((acc, c) => ({ ...acc, [c.id]: [{ task: "", owner: "", backup: "" }] }), {})
  );

  function addEntry(catId) {
    setEntries((p) => ({ ...p, [catId]: [...p[catId], { task: "", owner: "", backup: "" }] }));
  }
  function updateEntry(catId, idx, field, value) {
    setEntries((p) => {
      const arr = [...p[catId]];
      arr[idx] = { ...arr[idx], [field]: value };
      return { ...p, [catId]: arr };
    });
  }

  const ownerCounts = {};
  Object.values(entries).flat().forEach((e) => {
    if (e.owner) ownerCounts[e.owner] = (ownerCounts[e.owner] || 0) + 1;
  });
  const topOwner = Object.entries(ownerCounts).sort((a, b) => b[1] - a[1])[0];

  return (
    <div>
      <p style={{ fontSize: 14, color: MOCHA, marginBottom: 24, lineHeight: 1.7 }}>
        For every key task, identify who owns it (and who covers it when they're not there). If the identified "owner" is always the same person, recognize that there is an inherent risk to your operation.
      </p>

      {categories.map((cat) => (
  <div key={cat.id} style={{ marginBottom: 28, paddingBottom: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 4, height: 20, background: cat.color, borderRadius: 2 }} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: DARK_MOCHA }}>{cat.label}</div>
              <div style={{ fontSize: 11, color: CAMEL }}>{cat.examples}</div>
            </div>
          </div>
          <div style={{ background: "white", borderRadius: 8, border: `1px solid ${LIGHT_TAN}`, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 140px 140px", gap: 0 }}>
              {["Task/Responsibility", "Primary Owner", "Backup, If Away"].map((h) => (
                <div key={h} style={{ padding: "8px 12px", fontSize: 11, color: CAMEL, fontWeight: 700, background: LIGHT_TAN, borderBottom: `1px solid ${LIGHT_TAN}`, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</div>
              ))}
            </div>
            {entries[cat.id].map((entry, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 140px 140px", borderBottom: i < entries[cat.id].length - 1 ? `1px solid ${LIGHT_TAN}` : "none" }}>
                <input value={entry.task} onChange={(e) => updateEntry(cat.id, i, "task", e.target.value)}
                  placeholder="e.g. Follow up with leads, respond to contact form, update client records" style={{ ...inlineCellStyle }} />
                <input value={entry.owner} onChange={(e) => updateEntry(cat.id, i, "owner", e.target.value)}
                  placeholder="Name or role" style={{ ...inlineCellStyle, borderLeft: `1px solid ${LIGHT_TAN}` }} />
                <input value={entry.backup} onChange={(e) => updateEntry(cat.id, i, "backup", e.target.value)}
                  placeholder="Name or role" style={{ ...inlineCellStyle, borderLeft: `1px solid ${LIGHT_TAN}`, color: entry.backup ? DARK_MOCHA : "#C0392B" }} />
              </div>
            ))}
          </div>
          <button onClick={() => addEntry(cat.id)} style={{ ...addBtnStyle, marginTop: 6, fontSize: 11 }}>+ Add row</button>
        </div>
      ))}

      {topOwner && topOwner[1] >= 4 && (
        <div style={{ background: RED_BG, border: `1px solid ${RED}`, borderRadius: 8, padding: "14px 18px", marginTop: 8 }}>
          <div style={{ fontSize: 13, color: RED, fontWeight: 700, marginBottom: 4 }}>⚠ Single Point of Failure</div>
          <div style={{ fontSize: 13, color: RED }}><strong>{topOwner[0]}</strong> owns {topOwner[1]} tasks. If they're unavailable, it's likely that a large portion of your operation hits a standstill. This is your most significant operational risk.</div>
        </div>
      )}
    </div>
  );
}

// ─── GAP & OVERLAP FINDER ───────────────────────────────────────────────────
function GapFinder() {
  const [teamMembers, setTeamMembers] = useState([
    { name: "", role: "", owns: "", gaps: "", overlap: "" },
    { name: "", role: "", owns: "", gaps: "", overlap: "" },
  ]);
  const [unclaimed, setUnclaimed] = useState(["", ""]);

  function updateMember(i, field, v) {
    setTeamMembers((p) => { const a = [...p]; a[i] = { ...a[i], [field]: v }; return a; });
  }
  function addMember() { setTeamMembers((p) => [...p, { name: "", role: "", owns: "", gaps: "", overlap: "" }]); }
  function updateUnclaimed(i, v) { setUnclaimed((p) => { const a = [...p]; a[i] = v; return a; }); }
  function addUnclaimed() { setUnclaimed((p) => [...p, ""]); }

  const hasOverlaps = teamMembers.some((m) => m.overlap);
  const hasGaps = teamMembers.some((m) => m.gaps) || unclaimed.some(Boolean);

  return (
    <div>
      <p style={{ fontSize: 14, color: MOCHA, marginBottom: 24, lineHeight: 1.8 }}>
        Map what each person actually owns, where there's confusion, and what's falling through the cracks. Be honest, this is for your eyes only.
      </p>

      {teamMembers.map((m, i) => (
        <div key={i} style={{ background: "white", borderRadius: 10, padding: "20px 24px", marginBottom: 16, border: `1px solid ${LIGHT_TAN}` }}>
          <Row>
            <Field label="Name" value={m.name} onChange={(v) => updateMember(i, "name", v)} placeholder="Team member name" />
            <Field label="Role / Title" value={m.role} onChange={(v) => updateMember(i, "role", v)} placeholder="e.g. Site Supervisor" />
          </Row>
          <Field label="What they clearly own" value={m.owns} onChange={(v) => updateMember(i, "owns", v)}
            placeholder="Tasks/areas this person exclusively owns and nobody else touches" />
          <Field label="Where there's confusion or overlap with others" value={m.overlap} onChange={(v) => updateMember(i, "overlap", v)}
            placeholder="e.g. 'Both me and Keith handle client callbacks, it just depends who gets to the phone/email first.'" />
          <Field label="What they probably shouldn't be doing but are" value={m.gaps} onChange={(v) => updateMember(i, "gaps", v)}
            placeholder="e.g. 'Still doing all the invoicing even though we hired an administrator'" />
        </div>
      ))}
      <button onClick={addMember} style={{ ...addBtnStyle, marginBottom: 28 }}>+ Add team member</button>

      <Section title="Tasks Nobody Owns">
        <p style={hintStyle}>What's regularly not getting done or falling through the cracks? What does everyone assume someone else is handling?</p>
        {unclaimed.map((u, i) => (
          <ListRow key={i} value={u} onChange={(v) => updateUnclaimed(i, v)}
            placeholder={`e.g. "Following up on quotes that don't convert into signed contracts", "Checking that jobs are closed in the system"`}
            onRemove={unclaimed.length > 1 ? () => setUnclaimed((p) => p.filter((_, idx) => idx !== i)) : null} />
        ))}
        <AddButton onClick={addUnclaimed} label="Add unclaimed task" />
      </Section>

      {(hasGaps || hasOverlaps) && (
        <div style={{ marginTop: 24 }}>
          {hasOverlaps && (
            <div style={{ background: "#FEF3E2", border: `1px solid ${AMBER}`, borderRadius: 8, padding: "14px 18px", marginBottom: 12 }}>
              <div style={{ fontSize: 13, color: AMBER, fontWeight: 700, marginBottom: 4 }}>⚠ Overlaps Identified</div>
              <div style={{ fontSize: 13, color: MOCHA }}>Where two people both "own" something, you need a clear decision about who has the final call. Unresolved overlap causes conflict and inconsistency.</div>
            </div>
          )}
          {hasGaps && (
            <div style={{ background: RED_BG, border: `1px solid ${RED}`, borderRadius: 8, padding: "14px 18px" }}>
              <div style={{ fontSize: 13, color: RED, fontWeight: 700, marginBottom: 4 }}>⚠ Gaps & Misaligned Ownership Identified</div>
              <div style={{ fontSize: 13, color: RED }}>Tasks without a clear owner get done inconsistently, or not at all. These are your highest-risk operational gaps and the most common source of owner burnout and client dissatisfaction.</div>
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: 28, background: DARK_MOCHA, borderRadius: 10, padding: "20px 24px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: IVORY, marginBottom: 12, fontFamily: "Georgia, serif" }}>What to do with this</div>
        <div style={{ fontSize: 13, color: CAMEL, lineHeight: 1.7, marginBottom: 16 }}>
          Use what you've mapped here to update your RACI chart and Ownership Map. Every overlap needs a decision about who has final authority. Every void needs an owner assigned.
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => window.print()} style={{ background: AMBER, border: "none", borderRadius: 6, padding: "8px 16px", color: "white", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
            Print / Save as PDF
          </button>
        </div>
      </div>

    </div>
  );
}

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: DARK_MOCHA, marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 3, height: 14, background: AMBER, borderRadius: 2 }} />
        {title}
      </div>
      {children}
    </div>
  );
}

function Row({ children }) {
  return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>{children}</div>;
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label style={{ fontSize: 11, color: CAMEL, display: "block", marginBottom: 5, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        style={{ ...inputStyle, width: "100%", boxSizing: "border-box" }} />
    </div>
  );
}

function ListRow({ value, onChange, onRemove, placeholder }) {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        style={{ ...inputStyle, flex: 1 }} />
      {onRemove && (
        <button onClick={onRemove} style={{ background: "none", border: "none", color: CAMEL, cursor: "pointer", fontSize: 18, lineHeight: 1, padding: "0 6px" }}>×</button>
      )}
    </div>
  );
}

function AddButton({ onClick, label }) {
  return (
    <button onClick={onClick} style={addBtnStyle}>{label}</button>
  );
}

const inputStyle = {
  padding: "10px 12px", border: `1px solid ${LIGHT_TAN}`, borderRadius: 6,
  fontSize: 13, color: DARK_MOCHA, background: "white", outline: "none",
  fontFamily: "sans-serif",
};

const textareaStyle = {
  width: "100%", padding: "10px 12px", border: `1px solid ${LIGHT_TAN}`, borderRadius: 6,
  fontSize: 13, color: DARK_MOCHA, background: "white", outline: "none",
  fontFamily: "sans-serif", resize: "vertical", boxSizing: "border-box",
};

const addBtnStyle = {
  background: "none", border: `1px dashed ${CAMEL}`, borderRadius: 6,
  padding: "7px 14px", fontSize: 12, color: CAMEL, cursor: "pointer",
  fontFamily: "sans-serif",
};

const inlineCellStyle = {
  width: "100%", padding: "10px 12px", border: "none", fontSize: 13,
  color: DARK_MOCHA, background: "white", outline: "none", fontFamily: "sans-serif",
  boxSizing: "border-box",
};

const hintStyle = { fontSize: 12, color: CAMEL, marginBottom: 10, fontStyle: "italic", lineHeight: 1.6 };

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function RoleClarity() {
  const [activeTool, setActiveTool] = useState(null);

 if (!activeTool) {
  return (
    <div style={{ minHeight: "100vh", background: IVORY, fontFamily: "sans-serif", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>

       

      <div style={{ maxWidth: 680, width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.2em", color: CAMEL, textTransform: "uppercase", marginBottom: 8 }}>Groundwork Consult</div>
          <h1 style={{ fontSize: 36, color: DARK_MOCHA, margin: "0 0 12px", fontFamily: "Georgia, serif", fontWeight: 700, lineHeight: 1.2 }}>Role Clarity Toolkit</h1>
          <div style={{ width: 48, height: 3, background: AMBER, margin: "0 auto 20px" }} />
          <p style={{ fontSize: 15, color: MOCHA, lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>
            Most operational problems trace back to one root cause: nobody knew exactly who was responsible. This toolkit helps you get a handle on that.
          </p>
        </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { id: "job-description", title: "Job Description Builder", desc: "Build clear, honest job descriptions that set expectations before someone is hired — and hold the role accountable after.", icon: "01" },
              { id: "raci", title: "RACI Chart", desc: "Map who is Responsible, Accountable, Consulted, and Informed for every key task. Click cells to assign.", icon: "02" },
              { id: "ownership-map", title: "Ownership Map", desc: "For every key task, identify who owns it and who covers it when they're not there.", icon: "03" },
              { id: "gap-finder", title: "Gap & Overlap Finder", desc: "Find what's falling through the cracks, who's doing work that isn't theirs, and what nobody owns.", icon: "04" },
            ].map((tool) => (
              <button key={tool.id} onClick={() => setActiveTool(tool.id)} style={{
                background: "white", border: `1px solid ${LIGHT_TAN}`, borderRadius: 12,
                padding: "24px", textAlign: "left", cursor: "pointer",
                transition: "all 0.15s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = AMBER; e.currentTarget.style.boxShadow = `0 4px 16px rgba(107,79,58,0.1)`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = LIGHT_TAN; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{
  width: 36,
  height: 36,
  borderRadius: "50%",
  background: LIGHT_TAN,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 12,
  fontSize: 13,
  fontWeight: 700,
  color: MOCHA,
  fontFamily: "Georgia, serif"
}}>
  {String(
    ["job-description", "raci", "ownership-map", "gap-finder"].indexOf(tool.id) + 1
  ).padStart(2, "0")}
</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: DARK_MOCHA, marginBottom: 8, fontFamily: "Georgia, serif" }}>{tool.title}</div>
                <div style={{ fontSize: 13, color: MOCHA, lineHeight: 1.6 }}>{tool.desc}</div>
              </button>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 32, fontSize: 12, color: CAMEL }}>
            groundworkconsult.ca · jennifer@groundworkconsult.ca
          </div>
        </div>
      </div>
    );
  }

  const tool = TOOLS.find((t) => t.id === activeTool);

  return (
    <div style={{ minHeight: "100vh", background: IVORY, fontFamily: "sans-serif" }}>
      <div style={{ background: DARK_MOCHA, padding: "14px 24px", display: "flex", alignItems: "center", gap: 16 }}>
        <button onClick={() => setActiveTool(null)} style={{ background: "none", border: "none", color: CAMEL, cursor: "pointer", fontSize: 13, padding: 0 }}>← All Tools</button>
        <div style={{ width: 1, height: 16, background: MOCHA }} />
        <div style={{ fontSize: 13, color: IVORY, fontFamily: "Georgia, serif" }}>{tool?.label}</div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" }}>
        <h2 style={{ fontSize: 26, color: DARK_MOCHA, margin: "0 0 6px", fontFamily: "Georgia, serif", fontWeight: 700 }}>{tool?.label}</h2>
        <div style={{ width: 36, height: 2, background: AMBER, marginBottom: 28 }} />
        {activeTool === "job-description" && <JobDescriptionBuilder />}
        {activeTool === "raci" && <RACIChart />}
        {activeTool === "ownership-map" && <OwnershipMap />}
        {activeTool === "gap-finder" && <GapFinder />}
      </div>
    </div>
  );
}

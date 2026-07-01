import { useState } from "react";

const MOCHA = "#6B4F3A";
const AMBER = "#C8860A";
const CAMEL = "#C19A6B";
const IVORY = "#F5F0E8";
const DARK_MOCHA = "#3D2B1F";
const TEAL = "#5B7B7A";
const OLIVE = "#6B7A3C";
const LIGHT_TAN = "#EDE8E0";

const EMAILJS_SERVICE_ID = "service_cyqajke";
const EMAILJS_TEMPLATE_ID = "template_aad5sz9";
const EMAILJS_PUBLIC_KEY = "ddmCOCTdL-y8LI22-";

const areas = [
  {
    id: 1,
    title: "Systems & Tools",
    description: "The software, platforms, and tools your team uses daily.",
    questions: [
      "Our tools and software work well together. Information doesn't have to be entered twice.",
      "We're using our tools to their full potential. We know what they're capable of and how to use them.",
      "Our systems still make sense for how we operate today (not just how we started).",
      "When someone is away, our tools and systems keep things moving without them.",
    ],
  },
  {
    id: 2,
    title: "Data & Documentation",
    description: "Where your business knowledge lives and how it's shared.",
    questions: [
      "Important information (logins, contracts, processes) is stored somewhere anyone can find it.",
      "If a key team member left tomorrow, we could find what we need to keep running.",
      "Decisions and process changes are communicated clearly and kept on record.",
      "We don't rely on one person's memory or notebook to keep things on track.",
    ],
  },
  {
    id: 3,
    title: "Roles & Ownership",
    description: "Whether your team knows who does what, and actually owns it.",
    questions: [
      "Every person on the team has a clear understanding of their responsibilities.",
      "When something goes wrong, it's obvious who owns the fix.",
      "Tasks do not fall through the cracks because of confusion about who handles them.",
      "Workload isn't dependent on one or two people who always pick up the slack.",
    ],
  },
  {
    id: 4,
    title: "Leadership Visibility",
    description: "How connected leadership is to what's actually happening on the ground.",
    questions: [
      "I know what's happening in my business day to day, not just what I'm told.",
      "I find out about problems when they're happening, not after they've escalated.",
      "I'm confident the information I receive is accurate and complete, not filtered.",
      "There are no areas of the business I feel disconnected from or in the dark about.",
    ],
  },
  {
    id: 5,
    title: "Communication & Alignment",
    description: "How well information flows through your team.",
    questions: [
      "When something changes, the whole team finds out clearly and at the same time.",
      "Team members understand why they're doing what they're doing, not just what to do.",
      "There are no departments or individuals that operate like they're a separate business.",
      "New team members know where to go to get a full picture of how things work.",
    ],
  },
  {
    id: 6,
    title: "Financial Visibility",
    description: "How clearly you can see your numbers at any given moment.",
    questions: [
      "I know at any given moment whether the business is profitable.",
      "Invoicing, payments, and expenses are tracked in one place.",
      "We follow up on outstanding invoices - nothing slips through.",
      "I look at the numbers regularly, not just when something feels wrong or I need to make a big purchase.",
    ],
  },
  {
    id: 7,
    title: "Client Experience Consistency",
    description: "Whether every client gets the same quality experience every time.",
    questions: [
      "A client's experience is consistent regardless of which team member is involved.",
      "We have a clear, repeatable process from first contact to completed job or service.",
      "We handle complaints or issues with the same approach every time.",
      "We actively track client satisfaction and do something with that information.",
    ],
  },
  {
    id: 8,
    title: "Capacity & Workload",
    description: "Whether your team is resourced fairly and sustainably.",
    questions: [
      "Work is assigned based on actual capacity, not just habit or who usually does it.",
      "Team members have a way to flag when they're overloaded before it becomes a problem.",
      "We're not regularly turning down work or dropping the ball due to capacity issues.",
      "Our standards don't slip when things get busy.",
    ],
  },
  {
    id: 9,
    title: "Growth Readiness",
    description: "Whether your business could handle more without breaking.",
    questions: [
      "If revenue doubled next year, our systems and team could handle it.",
      "There are no obvious bottlenecks that could become crises under pressure.",
      "Decisions don't stall because only I'm the only one who can make them.",
      "I know what's holding the business back from growing.",
    ],
  },
  {
    id: 10,
    title: "Owner Dependency & Exit Risk",
    description: "How much the business depends on you personally to function.",
    questions: [
      "The business would keep running smoothly if I was unavailable for two weeks.",
      "There are no processes, relationships, or decisions that are exclusively mine.",
      "Client and vendor relationships belong to the business, not just to me personally.",
      "If I wanted to step back or sell, the business could operate without me.",
    ],
  },
];

const ratings = [
  { value: 1, label: "Rarely true", color: "#C0392B" },
  { value: 2, label: "Sometimes true", color: "#be6415" },
  { value: 3, label: "Often true", color: AMBER },
  { value: 4, label: "Almost always true", color: OLIVE },
];

function getStatus(score) {
  if (score <= 1.5) return { label: "Needs Attention", color: "#C0392B", bg: "#FDECEA" };
  if (score <= 2.5) return { label: "Work to Do", color: "#be6415", bg: "#FEF3E2" };
  if (score <= 3.2) return { label: "On Track", color: AMBER, bg: "#FEF9EC" };
  return { label: "Strong", color: OLIVE, bg: "#EFF4E8" };
}

async function sendResultsEmail({ toName, toEmail, overallScore, resultsSummary }) {
  const payload = {
    service_id: EMAILJS_SERVICE_ID,
    template_id: EMAILJS_TEMPLATE_ID,
    user_id: EMAILJS_PUBLIC_KEY,
    template_params: {
      to_name: toName,
      to_email: toEmail,
      overall_score: overallScore,
      results_summary: resultsSummary,
    },
  };

  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Email send failed");
}

export default function SelfAssessment() {
  const [currentArea, setCurrentArea] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [started, setStarted] = useState(false);

  const [emailName, setEmailName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [emailStatus, setEmailStatus] = useState(null); // null | "sending" | "sent" | "error"

  const totalAnswered = Object.keys(answers).length;
  const totalQuestions = areas.reduce((acc, a) => acc + a.questions.length, 0);

  function setAnswer(areaId, qIdx, value) {
    setAnswers((prev) => ({ ...prev, [`${areaId}-${qIdx}`]: value }));
  }

  function getAreaScore(areaId) {
    const area = areas.find((a) => a.id === areaId);
    const vals = area.questions.map((_, i) => answers[`${areaId}-${i}`]).filter(Boolean);
    if (!vals.length) return null;
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  }

  function areaComplete(areaId) {
    const area = areas.find((a) => a.id === areaId);
    return area.questions.every((_, i) => answers[`${areaId}-${i}`]);
  }

  const allComplete = areas.every((a) => areaComplete(a.id));

  const sortedAreas = [...areas].sort((a, b) => {
    const sa = getAreaScore(a.id) || 4;
    const sb = getAreaScore(b.id) || 4;
    return sa - sb;
  });

  function buildResultsSummary(overallScore) {
    const lines = areas.map((area) => {
      const score = getAreaScore(area.id) || 0;
      const status = getStatus(score);
      return `${area.title}: ${score.toFixed(1)} / 4.0 — ${status.label}`;
    });

    const weakest = sortedAreas.slice(0, 3);
    const priorities = weakest.map((a, i) => `${i + 1}. ${a.title}`).join("\n");

    return [
      `Overall Score: ${overallScore} / 4.0\n`,
      "--- Scorecard by Area ---",
      ...lines,
      "\n--- Top 3 Priorities ---",
      priorities,
    ].join("\n");
  }

  async function handleSendEmail() {
    if (!emailName.trim() || !emailAddress.trim()) return;
    const overallScore = (areas.reduce((acc, a) => acc + (getAreaScore(a.id) || 0), 0) / areas.length).toFixed(1);
    const summary = buildResultsSummary(overallScore);

    setEmailStatus("sending");
    try {
      await sendResultsEmail({
        toName: emailName.trim(),
        toEmail: emailAddress.trim(),
        overallScore,
        resultsSummary: summary,
      });
      setEmailStatus("sent");
    } catch {
      setEmailStatus("error");
    }
  }

  if (!started) {
    return (
      <div style={{ minHeight: "100vh", background: IVORY, fontFamily: "'Georgia', serif", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div style={{ maxWidth: 620, width: "100%", textAlign: "center" }}>
          <div style={{ marginBottom: 8, fontSize: 11, letterSpacing: "0.2em", color: CAMEL, textTransform: "uppercase", fontFamily: "sans-serif" }}>Groundwork Consult</div>
          <h1 style={{ fontSize: 38, color: DARK_MOCHA, margin: "0 0 12px", lineHeight: 1.2, fontWeight: 700 }}>The Operational<br />Self-Assessment</h1>
          <div style={{ width: 48, height: 3, background: AMBER, margin: "0 auto 24px" }} />
          <p style={{ fontSize: 16, color: MOCHA, lineHeight: 1.7, marginBottom: 32, fontFamily: "sans-serif" }}>
            You know that something isn't working, but you're not sure what?
            <br />This assessment helps you see exactly where the issues are, and what to fix first.
          </p>
          <div style={{ background: "white", borderRadius: 12, padding: "28px 32px", marginBottom: 32, textAlign: "left", border: `1px solid ${LIGHT_TAN}` }}>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {[["10 areas", "of your operation"], ["40 questions", "honest self-scoring"], ["~15 minutes", "to complete"], ["Clear output", "prioritized next steps"]].map(([val, desc]) => (
                <div key={val} style={{ flex: "1 1 120px" }}>
                  <div style={{ fontSize: 17, fontWeight: 700, color: DARK_MOCHA, marginBottom: 2 }}>{val}</div>
                  <div style={{ fontSize: 12, color: CAMEL, fontFamily: "sans-serif" }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
          <p style={{ fontSize: 13, color: CAMEL, marginBottom: 28, fontFamily: "sans-serif", fontStyle: "italic" }}>
            This self-assessment requires you to be honest and reflective of where you and your business stand. The more accurate you are, the more useful your results will be.
          </p>
          <button onClick={() => setStarted(true)} style={{ background: MOCHA, color: IVORY, border: "none", borderRadius: 8, padding: "16px 48px", fontSize: 16, cursor: "pointer", letterSpacing: "0.05em", fontFamily: "sans-serif", fontWeight: 600 }}>
            Begin Assessment →
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const overallScore = areas.reduce((acc, a) => acc + (getAreaScore(a.id) || 0), 0) / areas.length;
    const weakest = sortedAreas.slice(0, 3);
    const strongest = sortedAreas.slice(-2).reverse();

    return (
      <div style={{ minHeight: "100vh", background: IVORY, fontFamily: "sans-serif", padding: "40px 20px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 11, letterSpacing: "0.2em", color: CAMEL, textTransform: "uppercase", marginBottom: 8, fontFamily: "sans-serif" }}>Groundwork Consult</div>
            <h1 style={{ fontSize: 32, color: DARK_MOCHA, margin: "0 0 12px", fontFamily: "Georgia, serif", fontWeight: 700 }}>Your Assessment Results</h1>
            <div style={{ width: 48, height: 3, background: AMBER, margin: "0 auto 16px" }} />
            <p style={{ color: MOCHA, fontSize: 15, maxWidth: 480, margin: "0 auto" }}>Here's an honest picture of where your business stands operationally right now.</p>
          </div>

          {/* Overall score */}
          <div style={{ background: DARK_MOCHA, borderRadius: 12, padding: "28px 32px", marginBottom: 24, display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
            <div style={{ textAlign: "center", minWidth: 100 }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: IVORY, fontFamily: "Georgia, serif", lineHeight: 1 }}>{overallScore.toFixed(1)}</div>
              <div style={{ fontSize: 11, color: AMBER, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>out of 4.0</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, color: IVORY, fontFamily: "Georgia, serif", marginBottom: 6 }}>Overall Operational Score</div>
              <div style={{ fontSize: 14, color: CAMEL, lineHeight: 1.6 }}>
                {overallScore < 2 ? "Your business has significant operational gaps that are likely costing you time and money every day. The good news: clear priorities will make a real difference quickly." :
                  overallScore < 3 ? "Your business has some solid foundations but there are clear areas where things are breaking down. Targeted improvements will have an immediate impact." :
                    "Your business is running reasonably well operationally. The areas below show where focused attention will take you from good to great."}
              </div>
            </div>
          </div>

          {/* All areas scorecard */}
          <div style={{ background: "white", borderRadius: 12, padding: "24px 28px", marginBottom: 24, border: `1px solid ${LIGHT_TAN}` }}>
            <h2 style={{ fontSize: 16, color: DARK_MOCHA, margin: "0 0 20px", fontFamily: "Georgia, serif", fontWeight: 700 }}>Scorecard by Area</h2>
            {areas.map((area) => {
              const score = getAreaScore(area.id) || 0;
              const status = getStatus(score);
              const pct = (score / 4) * 100;
              return (
                <div key={area.id} style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: DARK_MOCHA, fontWeight: 600 }}>{area.title}</span>
                    <span style={{ fontSize: 12, color: status.color, background: status.bg, padding: "2px 10px", borderRadius: 20, fontWeight: 600 }}>{status.label}</span>
                  </div>
                  <div style={{ height: 8, background: LIGHT_TAN, borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: status.color, borderRadius: 4, transition: "width 0.6s ease" }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Top priorities */}
          <div style={{ background: "white", borderRadius: 12, padding: "24px 28px", marginBottom: 24, border: `1px solid ${LIGHT_TAN}` }}>
            <h2 style={{ fontSize: 16, color: DARK_MOCHA, margin: "0 0 6px", fontFamily: "Georgia, serif", fontWeight: 700 }}>Your Top 3 Priorities</h2>
            <p style={{ fontSize: 13, color: CAMEL, margin: "0 0 20px" }}>Start here. These areas will have the most immediate impact.</p>
            {weakest.map((area, i) => {
              const score = getAreaScore(area.id) || 0;
              const status = getStatus(score);
              return (
                <div key={area.id} style={{ display: "flex", gap: 16, marginBottom: 16, padding: "16px", background: status.bg, borderRadius: 8, borderLeft: `4px solid ${status.color}` }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: status.color, fontFamily: "Georgia, serif", minWidth: 28 }}>{i + 1}</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: DARK_MOCHA, marginBottom: 4 }}>{area.title}</div>
                    <div style={{ fontSize: 13, color: MOCHA, lineHeight: 1.6 }}>{area.description}</div>
                    <div style={{ fontSize: 12, color: status.color, marginTop: 6, fontWeight: 600 }}>Score: {score.toFixed(1)} / 4.0</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Strengths */}
          <div style={{ background: "white", borderRadius: 12, padding: "24px 28px", marginBottom: 32, border: `1px solid ${LIGHT_TAN}` }}>
            <h2 style={{ fontSize: 16, color: DARK_MOCHA, margin: "0 0 6px", fontFamily: "Georgia, serif", fontWeight: 700 }}>Where You're Strong</h2>
            <p style={{ fontSize: 13, color: CAMEL, margin: "0 0 16px" }}>These areas are working. Protect them as you make changes elsewhere.</p>
            {strongest.map((area) => {
              const score = getAreaScore(area.id) || 0;
              return (
                <div key={area.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "#EFF4E8", borderRadius: 8, marginBottom: 8, borderLeft: `4px solid ${OLIVE}` }}>
                  <span style={{ fontSize: 14, color: DARK_MOCHA, fontWeight: 600 }}>{area.title}</span>
                  <span style={{ fontSize: 13, color: OLIVE, fontWeight: 700 }}>{score.toFixed(1)} / 4.0</span>
                </div>
              );
            })}
          </div>

          {/* Email capture */}
          <div style={{ background: "white", borderRadius: 12, padding: "28px 32px", marginBottom: 24, border: `1px solid ${LIGHT_TAN}` }}>
            <h2 style={{ fontSize: 16, color: DARK_MOCHA, margin: "0 0 6px", fontFamily: "Georgia, serif", fontWeight: 700 }}>Send these results to yourself</h2>
            <p style={{ fontSize: 13, color: CAMEL, margin: "0 0 20px" }}>Optional. We'll email you a copy of your full scorecard to refer back to.</p>

            {emailStatus === "sent" ? (
              <p style={{ fontSize: 14, color: OLIVE, fontWeight: 600 }}>Sent. Check your inbox.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <input
                  type="text"
                  placeholder="Your name"
                  value={emailName}
                  onChange={(e) => setEmailName(e.target.value)}
                  style={{ padding: "12px 16px", borderRadius: 8, border: `1px solid ${LIGHT_TAN}`, fontSize: 14, fontFamily: "sans-serif", color: DARK_MOCHA, outline: "none", background: IVORY }}
                />
                <input
                  type="email"
                  placeholder="Your email address"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  style={{ padding: "12px 16px", borderRadius: 8, border: `1px solid ${LIGHT_TAN}`, fontSize: 14, fontFamily: "sans-serif", color: DARK_MOCHA, outline: "none", background: IVORY }}
                />
                <button
                  onClick={handleSendEmail}
                  disabled={!emailName.trim() || !emailAddress.trim() || emailStatus === "sending"}
                  style={{
                    padding: "12px 24px", borderRadius: 8, border: "none", fontSize: 14, fontWeight: 600, fontFamily: "sans-serif", cursor: emailName.trim() && emailAddress.trim() ? "pointer" : "default",
                    background: emailName.trim() && emailAddress.trim() ? MOCHA : LIGHT_TAN,
                    color: emailName.trim() && emailAddress.trim() ? IVORY : CAMEL,
                  }}
                >
                  {emailStatus === "sending" ? "Sending..." : "Email my results"}
                </button>
                {emailStatus === "error" && (
                  <p style={{ fontSize: 13, color: "#C0392B", margin: 0 }}>Something went wrong. Try again or reach out to jennifer@groundworkconsult.ca.</p>
                )}
              </div>
            )}
          </div>

          {/* CTA */}
          <div style={{ background: MOCHA, borderRadius: 12, padding: "32px", textAlign: "center" }}>
            <h2 style={{ fontSize: 22, color: IVORY, margin: "0 0 12px", fontFamily: "Georgia, serif" }}>Want help fixing what's broken?</h2>
            <p style={{ color: CAMEL, fontSize: 14, margin: "0 0 24px", lineHeight: 1.7 }}>
              The Groundwork Audit takes this self-assessment further, including facilitated conversations, a full findings report, and a prioritized roadmap built specifically for your business.
            </p>
            <a href="#/book" style={{ display: "inline-block", background: AMBER, color: "white", borderRadius: 8, padding: "14px 36px", fontSize: 15, textDecoration: "none", fontWeight: 600, letterSpacing: "0.03em" }}>
              Book a Discovery Call
            </a>
            <div style={{ marginTop: 16, fontSize: 12, color: CAMEL }}>jennifer@groundworkconsult.ca · groundworkconsult.ca</div>
          </div>

        </div>
      </div>
    );
  }

  const area = areas[currentArea];
  const progress = (totalAnswered / totalQuestions) * 100;

  return (
    <div style={{ minHeight: "100vh", background: IVORY, fontFamily: "sans-serif", padding: "0 0 60px" }}>
      {/* Header */}
      <div style={{ background: DARK_MOCHA, padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 13, color: CAMEL, letterSpacing: "0.08em", fontFamily: "Georgia, serif" }}>Groundwork Consult</div>
        <div style={{ fontSize: 12, color: CAMEL }}>{totalAnswered} of {totalQuestions} answered</div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 4, background: LIGHT_TAN }}>
        <div style={{ height: "100%", width: `${progress}%`, background: AMBER, transition: "width 0.3s ease" }} />
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "32px 20px" }}>
        {/* Area nav */}
        <div style={{ display: "flex", gap: 6, marginBottom: 32, flexWrap: "wrap" }}>
          {areas.map((a, i) => {
            const complete = areaComplete(a.id);
            const active = i === currentArea;
            return (
              <button key={a.id} onClick={() => setCurrentArea(i)} style={{
                padding: "5px 12px", borderRadius: 20, fontSize: 11, cursor: "pointer", fontWeight: 600, letterSpacing: "0.03em", border: "none",
                background: active ? MOCHA : complete ? "#EFF4E8" : LIGHT_TAN,
                color: active ? IVORY : complete ? OLIVE : CAMEL,
              }}>
                {complete ? "✓ " : ""}{a.id}. {a.title.split(" ")[0]}
              </button>
            );
          })}
        </div>

        {/* Area header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.15em", color: CAMEL, textTransform: "uppercase", marginBottom: 6 }}>Area {area.id} of 10</div>
          <h2 style={{ fontSize: 28, color: DARK_MOCHA, margin: "0 0 8px", fontFamily: "Georgia, serif", fontWeight: 700 }}>{area.title}</h2>
          <div style={{ width: 36, height: 2, background: AMBER, marginBottom: 12 }} />
          <p style={{ fontSize: 14, color: MOCHA, margin: 0, lineHeight: 1.6 }}>{area.description}</p>
        </div>

        {/* Rating legend */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {ratings.map((r) => (
            <div key={r.value} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: MOCHA }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: r.color }} />
              <span>{r.value} — {r.label}</span>
            </div>
          ))}
        </div>

        {/* Questions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 36 }}>
          {area.questions.map((q, i) => {
            const key = `${area.id}-${i}`;
            const selected = answers[key];
            return (
              <div key={i} style={{ background: "white", borderRadius: 10, padding: "20px 24px", border: `1px solid ${LIGHT_TAN}`, transition: "all 0.2s" }}>
                <p style={{ fontSize: 14, color: DARK_MOCHA, margin: "0 0 14px", lineHeight: 1.6 }}>{q}</p>
                <div style={{ display: "flex", gap: 8 }}>
                  {ratings.map((r) => (
                    <button key={r.value} onClick={() => setAnswer(area.id, i, r.value)} style={{
                      flex: 1, padding: "10px 4px", borderRadius: 8, border: `2px solid ${selected === r.value ? r.color : LIGHT_TAN}`,
                      background: selected === r.value ? r.color : "white", color: selected === r.value ? "white" : CAMEL,
                      cursor: "pointer", fontSize: 13, fontWeight: 700, transition: "all 0.15s",
                    }}>
                      {r.value}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button onClick={() => setCurrentArea((p) => Math.max(0, p - 1))} disabled={currentArea === 0} style={{
            padding: "12px 24px", borderRadius: 8, border: `1px solid ${LIGHT_TAN}`, background: "white", color: currentArea === 0 ? LIGHT_TAN : MOCHA,
            cursor: currentArea === 0 ? "default" : "pointer", fontSize: 14, fontWeight: 600,
          }}>← Previous</button>

          {currentArea < areas.length - 1 ? (
            <button onClick={() => setCurrentArea((p) => p + 1)} style={{
              padding: "12px 28px", borderRadius: 8, border: "none", background: MOCHA, color: IVORY, cursor: "pointer", fontSize: 14, fontWeight: 600,
            }}>Next Area →</button>
          ) : (
            <button onClick={() => setShowResults(true)} disabled={!allComplete} style={{
              padding: "12px 28px", borderRadius: 8, border: "none",
              background: allComplete ? AMBER : LIGHT_TAN, color: allComplete ? "white" : CAMEL,
              cursor: allComplete ? "pointer" : "default", fontSize: 14, fontWeight: 600,
            }}>
              {allComplete ? "See My Results →" : `${totalQuestions - totalAnswered} questions remaining`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
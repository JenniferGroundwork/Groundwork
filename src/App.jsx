import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import Home from "./Home";
import SelfAssessment from "./groundwork-self-assessment";
import BookingPage from "./BookingPage";
import SOPBundle from "./groundwork-sop-bundle";
import RoleClarity from "./groundwork-role-clarity-toolkit";
import OpsPlaybook from "./groundwork-ops-playbook";
import SOPLibrary from "./groundwork-sop-library";
import AIStarterKit from "./groundwork-ai-starter-kit";

const MOCHA      = "#6B4F3A";
const CAMEL      = "#C19A6B";
const IVORY      = "#F5F0E8";
const DARK_GREEN = "#2D4537";
const LIGHT_TAN  = "#EDE8DF";
const LIME_CTA   = "#D4E89A";
const TEXT_DARK  = "#1C1C1C";
const TEXT_MID   = "#4A4A4A";

const PRODUCTS = [
  { id: "ops-playbook", label: "Operations Playbook Builder",                component: OpsPlaybook },
  { id: "role-clarity", label: "Role Clarity Toolkit",                       component: RoleClarity },
  { id: "sop-library",  label: "Standard Operating Procedure (SOP) Library", component: SOPLibrary },
  { id: "sop-bundle",   label: "SOP Template Bundle",                        component: SOPBundle },
  { id: "ai-kit",       label: "AI Workflow Starter Kit",                    component: AIStarterKit },
];

function LogoMark() {
  return (
    <div style={{ width: 34, height: 34, background: IVORY, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: MOCHA, lineHeight: 1, marginTop: 2 }}>g</span>
    </div>
  );
}

function NavBar({ backLabel, backTo }) {
  const navigate = useNavigate();
  return (
    <div style={{ background: DARK_GREEN, padding: "0 40px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <LogoMark />
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 600, color: IVORY }}>Groundwork Consult</span>
      </div>
      {backLabel && (
        <button onClick={() => navigate(backTo || "/")} style={{
          background: "none", border: "none", color: "rgba(245,240,232,0.65)",
          cursor: "pointer", fontSize: 13, padding: 0, fontFamily: "sans-serif"
        }}>
          &larr; {backLabel}
        </button>
      )}
    </div>
  );
}

function BookingRoute() {
  return (
    <div style={{ minHeight: "100vh", background: IVORY, fontFamily: "sans-serif" }}>
      <NavBar backLabel="Back to site" backTo="/" />
      <BookingPage />
    </div>
  );
}

function SelfAssessmentRoute() {
  return (
    <div style={{ minHeight: "100vh", background: IVORY, fontFamily: "sans-serif" }}>
      <NavBar backLabel="Back to site" backTo="/" />
      <SelfAssessment />
    </div>
  );
}

function ToolsIndex() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: "100vh", background: IVORY, fontFamily: "sans-serif" }}>
      <NavBar backLabel="Back to site" backTo="/" />
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#5B7B7A", marginBottom: 12 }}>
          Groundwork Consult
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: DARK_GREEN, margin: "0 0 8px" }}>
          Tools &amp; Resources
        </h1>
        <p style={{ fontSize: 16, color: TEXT_MID, lineHeight: 1.6, maxWidth: 480, margin: "0 auto 48px", textAlign: "center" }}>
          Working documents for active client engagements.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {PRODUCTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => navigate(`/tools/${p.id}`)}
              style={{
                background: "white",
                border: "1px solid rgba(107,79,58,0.1)",
                borderRadius: 12,
                padding: "20px 28px",
                textAlign: "left",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "box-shadow 0.2s, transform 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(107,79,58,0.1)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, fontWeight: 700, color: MOCHA, opacity: 0.4, minWidth: 24 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontSize: 15, fontWeight: 600, color: TEXT_DARK }}>{p.label}</span>
              </div>
              <span style={{ color: CAMEL, fontSize: 16 }}>&rarr;</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ToolRoute() {
  const { toolId } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === toolId);

  if (!product) {
    navigate("/tools", { replace: true });
    return null;
  }

  const Product = product.component;
  return (
    <div style={{ minHeight: "100vh", background: IVORY, fontFamily: "sans-serif" }}>
      <NavBar backLabel="Back to Tools" backTo="/tools" />
      <Product />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/"                 element={<Home />} />
      <Route path="/book"             element={<BookingRoute />} />
      <Route path="/self-assessment"  element={<SelfAssessmentRoute />} />
      <Route path="/tools"            element={<ToolsIndex />} />
      <Route path="/tools/:toolId"    element={<ToolRoute />} />
    </Routes>
  );
}
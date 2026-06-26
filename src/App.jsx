import { useState } from "react";
import SelfAssessment from "./groundwork-self-assessment";
import SOPBundle from "./groundwork-sop-bundle";
import RoleClarity from "./groundwork-role-clarity-toolkit";
import OpsPlaybook from "./groundwork-ops-playbook";
import SOPLibrary from "./groundwork-sop-library";
import AIStarterKit from "./groundwork-ai-starter-kit";

const MOCHA = "#6B4F3A";
const AMBER = "#7A6A3C";
const CAMEL = "#C19A6B";
const IVORY = "#F5F0E8";
const DARK_MOCHA = "#3D2B1F";
const LIGHT_TAN = "#EDE8E0";

const PRODUCTS = [
  { id: "assessment", label: "Operational Self-Assessment", component: SelfAssessment },
  { id: "ops-playbook", label: "Operations Playbook Builder", component: OpsPlaybook },
  { id: "role-clarity", label: "Role Clarity Toolkit", component: RoleClarity },
  { id: "sop-library", label: "Standard Operating Procedure (SOP) Library", component: SOPLibrary },
  { id: "sop-bundle", label: "Standard Operating Procedure (SOP) Template Bundle", component: SOPBundle },
  { id: "ai-kit", label: "AI Workflow Starter Kit", component: AIStarterKit },
];

export default function App() {
  const [active, setActive] = useState(null);

  if (active) {
    const Product = PRODUCTS.find(p => p.id === active).component;
    return (
      <div style={{ minHeight: "100vh", background: IVORY, fontFamily: "sans-serif" }}>
        <div style={{ background: DARK_MOCHA, padding: "12px 24px", display: "flex", alignItems: "center" }}>
          <button onClick={() => setActive(null)} style={{
            background: "none", border: "none", color: CAMEL,
            cursor: "pointer", fontSize: 13, padding: 0,
          }}>
            ← Back to All Tools
          </button>
        </div>
        <Product />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: IVORY, fontFamily: "sans-serif", padding: "60px 20px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.2em", color: CAMEL, textTransform: "uppercase", marginBottom: 8 }}>Groundwork Consult</div>
        <h1 style={{ fontSize: 36, color: DARK_MOCHA, margin: "0 0 12px", fontFamily: "Georgia, serif" }}>Our Tools</h1>
        <div style={{ width: 48, height: 3, background: AMBER, margin: "0 auto 40px" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {PRODUCTS.map(p => (
            <button key={p.id} onClick={() => setActive(p.id)} style={{
              background: "white", border: `1px solid ${LIGHT_TAN}`, borderRadius: 10,
              padding: "20px 24px", textAlign: "left", cursor: "pointer",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              fontSize: 15, fontWeight: 600, color: DARK_MOCHA,
            }}>
              {p.label}
              <span style={{ color: CAMEL }}>→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
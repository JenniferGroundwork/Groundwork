import { useEffect } from "react";

const IVORY      = "#F5F0E8";
const DARK_GREEN = "#365342";
const MOCHA      = "#6B4F3A";
const CAMEL      = "#C19A6B";
const TEXT_MID   = "#4A4A4A";
const TEAL       = "#5B7B7A";

export default function BookingPage() {
  useEffect(() => {
    // Load Koalendar widget script
    window.Koalendar = window.Koalendar || function () {
      (window.Koalendar.props = window.Koalendar.props || []).push(arguments);
    };

    const script = document.createElement("script");
    script.src = "https://koalendar.com/assets/widget.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.Koalendar("inline", {
        url: "https://koalendar.com/e/groundwork-consult-discovery-call",
        selector: "#inline-widget-groundwork-consult-discovery-call",
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: IVORY, fontFamily: "sans-serif" }}>

      {/* Header */}
      <div style={{ background: DARK_GREEN, padding: "48px 80px 40px", textAlign: "center" }}>
        <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: CAMEL, marginBottom: 12 }}>
          Groundwork Consult
        </p>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(28px, 3vw, 42px)",
          fontWeight: 700,
          color: IVORY,
          marginBottom: 14,
          lineHeight: 1.2
        }}>
          Book a Discovery Call
        </h1>
        <p style={{
          fontSize: 16,
          color: "rgba(245,240,232,0.7)",
          maxWidth: 480,
          margin: "0 auto",
          lineHeight: 1.65
        }}>
          A 30-minute conversation to understand your business and whether we're the right fit. Come prepared to talk about where things are breaking down, how your team is structured, and what's prompted you to look at this now.
        </p>
      </div>

      {/* Embed */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px 80px" }}>
        <div id="inline-widget-groundwork-consult-discovery-call" style={{ minHeight: 600 }} />
      </div>

    </div>
  );
}

import { useState, useEffect } from "react";

const MOCHA      = "#6B4F3A";
const AMBER      = "#C8860A";
const CAMEL      = "#C19A6B";
const OLIVE      = "#6B7A3C";
const TEAL       = "#5B7B7A";
const IVORY      = "#F5F0E8";
const DARK_GREEN = "#2D4537";
const MID_GREEN  = "#243B2E";
const LIGHT_TAN  = "#EDE8DF";
const TEXT_DARK  = "#1C1C1C";
const TEXT_MID   = "#4A4A4A";
const LIME_CTA   = "#D4E89A";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'Inter', sans-serif;
    background: ${IVORY};
    color: ${TEXT_DARK};
    -webkit-font-smoothing: antialiased;
  }

  .nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    background: ${DARK_GREEN};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    height: 60px;
  }
  .nav-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    color: ${IVORY};
  }
  .nav-wordmark {
    font-family: 'Playfair Display', serif;
    font-size: 15px;
    font-weight: 600;
    color: ${IVORY};
    letter-spacing: 0.01em;
  }
  .nav-links {
    display: flex;
    align-items: center;
    gap: 32px;
    list-style: none;
  }
  .nav-links a {
    font-size: 14px;
    color: rgba(245,240,232,0.75);
    text-decoration: none;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: ${IVORY}; }
  .nav-cta {
    background: ${LIME_CTA};
    color: ${DARK_GREEN} !important;
    font-weight: 600 !important;
    padding: 8px 18px;
    border-radius: 30px;
    font-size: 13px !important;
    transition: opacity 0.2s !important;
  }
  .nav-cta:hover { opacity: 0.85; } 
 .hero {
    min-height: 100vh;
    background: ${DARK_GREEN};
    display: flex;
    align-items: center;
    padding: 100px 80px 80px;
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 80% 50%, rgba(107,122,60,0.15) 0%, transparent 60%);
    pointer-events: none;
  }
  .hero-inner {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }
  .hero-eyebrow {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: ${CAMEL};
    margin-bottom: 20px;
  }
  .hero-h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(42px, 5vw, 64px);
    font-weight: 700;
    line-height: 1.1;
    color: ${IVORY};
    margin-bottom: 24px;
  }
  .hero-h1 em { font-style: normal; color: ${LIME_CTA}; }
  .hero-sub {
    font-size: 17px;
    line-height: 1.65;
    color: rgba(245,240,232,0.75);
    margin-bottom: 40px;
    max-width: 420px;
  }
  .hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }
  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: ${LIME_CTA};
    color: ${DARK_GREEN};
    font-size: 14px;
    font-weight: 600;
    padding: 14px 26px;
    border-radius: 40px;
    text-decoration: none;
    transition: opacity 0.2s, transform 0.2s;
  }
  .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
  .btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    color: ${IVORY};
    font-size: 14px;
    font-weight: 500;
    padding: 14px 26px;
    border-radius: 40px;
    border: 1.5px solid rgba(245,240,232,0.3);
    text-decoration: none;
    transition: border-color 0.2s, color 0.2s;
  }
  .btn-secondary:hover { border-color: ${IVORY}; color: ${IVORY}; }

  .hero-card {
    background: ${IVORY};
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 24px 60px rgba(0,0,0,0.25);
  }
  .hero-card-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: ${TEAL};
    margin-bottom: 20px;
  }
  .hero-card-item {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 16px 0;
    border-bottom: 1px solid rgba(107,79,58,0.1);
  }
  .hero-card-item:last-child { border-bottom: none; }
  .hero-card-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: ${MOCHA}; margin-top: 7px; flex-shrink: 0;
  }
  .hero-card-text strong {
    display: block; font-size: 14px; font-weight: 600;
    color: ${TEXT_DARK}; margin-bottom: 3px;
  }
  .hero-card-text span { font-size: 13px; color: ${TEXT_MID}; line-height: 1.5; }

  .section { padding: 100px 80px; }
  .section-inner { max-width: 1200px; margin: 0 auto; }
  .eyebrow {
    font-size: 10px; font-weight: 600; letter-spacing: 0.18em;
    text-transform: uppercase; color: ${TEAL}; margin-bottom: 16px;
  }
  .eyebrow-light { color: ${CAMEL}; }

  .who { background: ${IVORY}; }
  .who-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: end;
    margin-bottom: 60px;
  }
  .who-h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(26px, 2.8vw, 38px);
    font-weight: 700;
    color: ${DARK_GREEN};
    line-height: 1.2;
  }
  .who-desc { font-size: 16px; line-height: 1.65; color: ${TEXT_MID}; }
  .industries {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .industry-card {
    background: white;
    border-radius: 14px;
    padding: 28px 24px;
    border: 1px solid rgba(107,79,58,0.08);
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .industry-card:hover {
    box-shadow: 0 8px 28px rgba(107,79,58,0.12);
    transform: translateY(-2px);
  }
  .industry-icon {
    width: 40px; height: 40px;
    background: ${LIGHT_TAN}; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 16px;
  }
  .industry-label {
    font-size: 10px; font-weight: 600; letter-spacing: 0.15em;
    text-transform: uppercase; color: ${TEAL}; margin-bottom: 8px;
  }
  .industry-h3 {
    font-family: 'Playfair Display', serif;
    font-size: 16px; font-weight: 700; color: ${DARK_GREEN};
    line-height: 1.3; margin-bottom: 10px;
  }
  .industry-p { font-size: 13px; line-height: 1.6; color: ${TEXT_MID}; }

  .services { background: ${DARK_GREEN}; }
  .services-header { text-align: center; margin-bottom: 64px; }
  .services-h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(30px, 3.5vw, 46px);
    font-weight: 700; color: ${IVORY}; line-height: 1.15; margin-bottom: 14px;
  }
  .services-h2 em { font-style: normal; color: ${LIME_CTA}; }
  .services-desc {
    font-size: 16px; line-height: 1.65;
    color: rgba(245,240,232,0.7); max-width: 520px; margin: 0 auto;
  }
  .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .service-card {
    background: ${MID_GREEN}; border-radius: 16px; padding: 36px 32px;
    border: 1px solid rgba(245,240,232,0.06); position: relative; overflow: hidden;
  }
  .service-num {
    font-family: 'Playfair Display', serif; font-size: 72px; font-weight: 700;
    color: rgba(245,240,232,0.06); position: absolute; top: 12px; right: 20px;
    line-height: 1; pointer-events: none;
  }
  .service-h3 {
    font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700;
    color: ${IVORY}; margin-bottom: 14px; line-height: 1.2;
  }
  .service-p { font-size: 14px; line-height: 1.65; color: rgba(245,240,232,0.7); margin-bottom: 24px; }
  .service-list { list-style: none; display: flex; flex-direction: column; gap: 8px; text-align: left; }
  .service-list li {
    font-size: 13px; color: rgba(245,240,232,0.6);
    display: flex; align-items: flex-start; gap: 8px;
  }
  .service-list li::before {
    content: ''; width: 5px; height: 5px; border-radius: 50%;
    background: ${CAMEL}; margin-top: 7px; flex-shrink: 0;
  }

  .how { background: ${LIGHT_TAN}; }
  .how-header {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 60px; align-items: end; margin-bottom: 60px;
  }
  .how-h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(30px, 3.5vw, 46px); font-weight: 700;
    color: ${DARK_GREEN}; line-height: 1.15;
  }
  .how-desc { font-size: 16px; line-height: 1.65; color: ${TEXT_MID}; }
  .steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  .step { background: white; border-radius: 14px; padding: 32px 24px; }
  .step-num {
    font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 700;
    color: ${MOCHA}; opacity: 0.4; line-height: 1; margin-bottom: 20px;
  }
  .step-h3 { font-size: 16px; font-weight: 600; color: ${DARK_GREEN}; margin-bottom: 10px; }
  .step-p { font-size: 13px; line-height: 1.6; color: ${TEXT_MID}; }

  .audit { background: ${MOCHA}; padding: 100px 80px; }
  .audit-inner {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
  }
  .audit-h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(28px, 3vw, 42px); font-weight: 700;
    color: ${IVORY}; line-height: 1.2; margin-bottom: 16px;
  }
  .audit-p { font-size: 16px; line-height: 1.65; color: rgba(245,240,232,0.75); margin-bottom: 32px; }
  .audit-price-note { font-size: 14px; line-height: 1.6; color: rgba(245,240,232,0.65); margin-bottom: 32px; }
  .audit-card {
    background: rgba(245,240,232,0.1); border-radius: 16px; padding: 36px;
    border: 1px solid rgba(245,240,232,0.15);
  }
  .audit-card-title { font-size: 14px; font-weight: 600; color: ${IVORY}; margin-bottom: 20px; }
  .audit-detail { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 14px; }
  .audit-detail-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: ${LIME_CTA}; margin-top: 8px; flex-shrink: 0;
  }
  .audit-detail p { font-size: 14px; line-height: 1.55; color: rgba(245,240,232,0.8); }

  .cta-section { background: ${DARK_GREEN}; padding: 100px 80px; }
  .cta-inner {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
  }
  .cta-h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(32px, 4vw, 52px); font-weight: 700;
    color: ${IVORY}; line-height: 1.15; margin-bottom: 20px;
  }
  .cta-h2 em { font-style: normal; color: ${LIME_CTA}; }
  .cta-p { font-size: 16px; line-height: 1.65; color: rgba(245,240,232,0.7); margin-bottom: 36px; }
  .cta-card { background: ${IVORY}; border-radius: 20px; padding: 40px; }
  .cta-card-title {
    font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700;
    color: ${DARK_GREEN}; margin-bottom: 24px;
  }
  .cta-point { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 16px; }
  .cta-point-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: ${OLIVE}; margin-top: 8px; flex-shrink: 0;
  }
  .cta-point p { font-size: 14px; line-height: 1.55; color: ${TEXT_MID}; }
  .cta-point strong { color: ${TEXT_DARK}; }
  .cta-divider { border: none; border-top: 1px solid rgba(107,79,58,0.12); margin: 24px 0; }
  .cta-contact { font-size: 13px; color: ${TEXT_MID}; }
  .cta-contact a { color: ${MOCHA}; text-decoration: none; font-weight: 600; }
  .cta-contact a:hover { text-decoration: underline; }

  .footer {
    background: ${DARK_GREEN}; border-top: 1px solid rgba(245,240,232,0.08);
    padding: 60px 80px 32px;
  }
  .footer-inner { max-width: 1200px; margin: 0 auto; }
  .footer-top {
    display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr;
    gap: 60px; margin-bottom: 56px;
  }
  .footer-brand p { font-size: 13px; line-height: 1.65; color: rgba(245,240,232,0.55); margin-top: 14px; max-width: 240px; }
  .footer-brand small { display: block; font-size: 12px; color: rgba(245,240,232,0.35); margin-top: 10px; }
  .footer-col-label { font-size: 10px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(245,240,232,0.35); margin-bottom: 16px; }
  .footer-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .footer-links a { font-size: 14px; color: rgba(245,240,232,0.65); text-decoration: none; transition: color 0.2s; }
  .footer-links a:hover { color: ${IVORY}; }
  .footer-cta-text { font-size: 13px; color: rgba(245,240,232,0.55); line-height: 1.6; margin-bottom: 16px; }
  .footer-bottom {
    display: flex; justify-content: space-between; align-items: center;
    padding-top: 24px; border-top: 1px solid rgba(245,240,232,0.08);
  }
  .footer-copy { font-size: 12px; color: rgba(245,240,232,0.3); }
  .footer-legal { display: flex; gap: 20px; }
  .footer-legal button {
    font-size: 12px; color: rgba(245,240,232,0.3);
    background: none; border: none; cursor: pointer; padding: 0;
    font-family: inherit;
  }
  .footer-legal button:hover { color: rgba(245,240,232,0.6); }

  /* Modal styles */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(0,0,0,0.55);
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
  }
  .modal {
    background: ${IVORY}; border-radius: 16px;
    max-width: 600px; width: 100%;
    max-height: 80vh; overflow-y: auto;
    padding: 48px 40px 40px;
    position: relative;
  }
  .modal-close {
    position: absolute; top: 16px; right: 20px;
    background: none; border: none; cursor: pointer;
    font-size: 22px; color: ${TEXT_MID}; line-height: 1;
    padding: 4px 8px;
  }
  .modal-close:hover { color: ${TEXT_DARK}; }
  .modal h2 {
    font-family: 'Playfair Display', serif;
    font-size: 24px; font-weight: 700;
    color: ${DARK_GREEN}; margin-bottom: 8px;
  }
  .modal-updated {
    font-size: 12px; color: ${TEXT_MID}; margin-bottom: 28px;
  }
  .modal h3 {
    font-size: 13px; font-weight: 600; text-transform: uppercase;
    letter-spacing: 0.1em; color: ${MOCHA}; margin: 24px 0 8px;
  }
  .modal p {
    font-size: 14px; line-height: 1.7; color: ${TEXT_MID}; margin-bottom: 4px;
  }
  .modal a { color: ${MOCHA}; }

  @media (max-width: 900px) {
    .nav { padding: 0 20px; }
    .nav-links { display: none; }
    .hero { padding: 80px 24px 60px; }
    .hero-inner { grid-template-columns: 1fr; gap: 40px; }
    .hero-card { display: none; }
    .section { padding: 64px 24px; }
    .who-header { grid-template-columns: 1fr; gap: 20px; }
    .industries { grid-template-columns: 1fr 1fr; }
    .services-grid { grid-template-columns: 1fr; }
    .how-header { grid-template-columns: 1fr; gap: 20px; }
    .steps { grid-template-columns: 1fr 1fr; }
    .audit { padding: 64px 24px; }
    .audit-inner { grid-template-columns: 1fr; gap: 40px; }
    .cta-section { padding: 64px 24px; }
    .cta-inner { grid-template-columns: 1fr; gap: 40px; }
    .footer { padding: 48px 24px 24px; }
    .footer-top { grid-template-columns: 1fr 1fr; gap: 32px; }
  }
  @media (max-width: 540px) {
    .industries { grid-template-columns: 1fr; }
    .steps { grid-template-columns: 1fr; }
    .footer-top { grid-template-columns: 1fr; }
    .footer-brand { text-align: center; }
    .footer-brand a { justify-content: center; }
    .footer-brand small { text-align: center; }
    .modal { padding: 40px 24px 32px; }
  }
`;

const icons = {
  trades: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 17L8 12M8 12L6 10L10 6L12 8M8 12L10 14L14 10L12 8M12 8L14.5 5.5C15.3 4.7 16.5 4.5 17 5C17.5 5.5 17.3 6.7 16.5 7.5L14 10" stroke="#6B4F3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  hospitality: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 3C10 3 6 6 6 10H14C14 6 10 3 10 3Z" stroke="#6B4F3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 10H15" stroke="#6B4F3A" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7 13H13" stroke="#6B4F3A" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 16H12" stroke="#6B4F3A" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  property: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 17V8L10 3L17 8V17" stroke="#6B4F3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 17V12H13V17" stroke="#6B4F3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 17H17" stroke="#6B4F3A" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  wellness: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 17C10 17 3 13 3 8C3 5.8 4.8 4 7 4C8.2 4 9.3 4.6 10 5.5C10.7 4.6 11.8 4 13 4C15.2 4 17 5.8 17 8C17 13 10 17 10 17Z" stroke="#6B4F3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  nfp: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 3L12 7H17L13 10L14.5 15L10 12L5.5 15L7 10L3 7H8L10 3Z" stroke="#6B4F3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  professional: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 17V15C6 13.9 6.9 13 8 13H12C13.1 13 14 13.9 14 15V17" stroke="#6B4F3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="10" cy="8" r="3" stroke="#6B4F3A" strokeWidth="1.5"/>
      <path d="M3 17H17" stroke="#6B4F3A" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};

function LogoMark({ size = 34, bg = IVORY, fg = MOCHA }) {
  return (
    <div style={{ width: size, height: size, background: bg, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: size * 0.58, fontWeight: 700, color: fg, lineHeight: 1, marginTop: 2 }}>g</span>
    </div>
  );
}

function Modal({ title, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">&times;</button>
        {children}
      </div>
    </div>
  );
}

function PrivacyModal({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <h2>Privacy Policy</h2>
      <p className="modal-updated">Last updated: January 2026</p>

      <h3>What we collect</h3>
      <p>When you use the self-assessment or book a discovery call, we collect the information you provide directly - your name, email address, and your responses to the assessment or intake questions.</p>

      <h3>How we use it</h3>
      <p>We use your information to send you your assessment results, follow up about a potential engagement, and communicate with you about our services. We don't sell your data, and we don't share it with third parties except the tools we use to operate (EmailJS for email delivery, Koalendar for scheduling, Zoom for calls).</p>

      <h3>Data storage</h3>
      <p>Your information is stored and processed in accordance with the practices of the third-party tools listed above. We retain client engagement records for our own business records as required.</p>

      <h3>Your rights</h3>
      <p>You can ask us to delete your information at any time by emailing <a href="mailto:jennifer@groundworkconsult.ca">jennifer@groundworkconsult.ca</a>. We'll respond within a reasonable timeframe.</p>

      <h3>Contact</h3>
      <p>Questions? Reach us at <a href="mailto:jennifer@groundworkconsult.ca">jennifer@groundworkconsult.ca</a>.</p>
    </Modal>
  );
}

function TermsModal({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <h2>Terms of Use</h2>
      <p className="modal-updated">Last updated: January 2026</p>

      <h3>Who we are</h3>
      <p>Groundwork Consult is an operations consulting business based in Ontario, Canada, serving clients across Canada and the United States.</p>

      <h3>Using this site</h3>
      <p>This website is for informational purposes. The content here - including the self-assessment - is provided as a general resource and does not constitute professional business, legal, or financial advice.</p>

      <h3>Engagements</h3>
      <p>Any paid work with Groundwork Consult is governed by a separate written agreement signed before work begins. Nothing on this site creates a consulting relationship or obligation on either side.</p>

      <h3>Intellectual property</h3>
      <p>The content on this site, including the self-assessment tool and all written copy, belongs to Groundwork Consult. Please don't reproduce or redistribute it without permission.</p>

      <h3>Limitation of liability</h3>
      <p>We do our best to keep information accurate and current, but we make no warranties about the completeness or suitability of anything on this site for your specific situation.</p>

      <h3>Contact</h3>
      <p>Questions? Reach us at <a href="mailto:jennifer@groundworkconsult.ca">jennifer@groundworkconsult.ca</a>.</p>
    </Modal>
  );
}

export default function GroundworkHome() {
  const [scrolled, setScrolled] = useState(false);
  const [modal, setModal] = useState(null); // null | "privacy" | "terms"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const industries = [
    {
      icon: icons.trades,
      label: "Trades",
      h3: "Jobs get done, but only because the right person showed up.",
      p: "Electrical, plumbing, HVAC, construction. We build the playbooks your crew can actually follow."
    },
    {
      icon: icons.hospitality,
      label: "Hospitality",
      h3: "Service quality swings with whoever is on shift.",
      p: "Restaurants, hotels, catering. We document standards so every shift runs the same way."
    },
    {
      icon: icons.property,
      label: "Property Management",
      h3: "Tenant issues and renewals flow through one inbox and one brain.",
      p: "We build the workflows and SOPs that let your team handle issues without escalating everything."
    },
    {
      icon: icons.wellness,
      label: "Wellness",
      h3: "The practice runs on the practitioner. Clients follow the person, not the business.",
      p: "Clinics, studios, spas. We help you build a business that outlasts any single provider."
    },
    {
      icon: icons.nfp,
      label: "Not-for-Profit",
      h3: "The mission is clear, but the operations are held together with volunteer hours and institutional memory.",
      p: "We build the systems that survive staff turnovers and keep the mission moving forward."
    },
    {
      icon: icons.professional,
      label: "Professional Services",
      h3: "The expertise is there, but the business behind it hasn't caught up yet.",
      p: "Law firms, accounting practices, clinics. We document the work so it can run without the principal in every conversation."
    },
  ];

  return (
    <>
      <style>{styles}</style>

      {modal === "privacy" && <PrivacyModal onClose={() => setModal(null)} />}
      {modal === "terms" && <TermsModal onClose={() => setModal(null)} />}

      <nav className="nav" style={{ boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.25)" : "none" }}>
        <a href="/" className="nav-logo">
          <LogoMark />
          <span className="nav-wordmark">Groundwork Consult</span>
        </a>
        <ul className="nav-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="/book" className="nav-cta">Book a Call</a></li>
        </ul>
      </nav>

      <section id="top" className="hero">
        <div className="hero-inner">
          <div>
            <p className="hero-eyebrow">Operations Consulting</p>
            <h1 className="hero-h1">
              Stop relying <br />
              on <em>memory.</em><br />
              Start running<br />
              on systems.
            </h1>
            <p className="hero-sub">
              Founder-led businesses in trades, hospitality, property management, and specialized services hire us when growth has outpaced how they operate. We come in, build the foundation from the ground up, and hand it back. Fixed scope - we're not taking over, we're preparing you to win.
            </p>
            <div className="hero-actions">
              <a href="/self-assessment" className="btn-primary">Take the Free Self-Assessment &rarr;</a>
              <a href="/book" className="btn-secondary">Book a Discovery Call</a>
            </div>
          </div>
          <div className="hero-card">
            <p className="hero-card-label">What you get</p>
            <div className="hero-card-item">
              <div className="hero-card-dot" />
              <div className="hero-card-text">
                <strong>A defined scope, a clear price</strong>
                <span>You know exactly what you are getting before we start. No surprises mid-engagement.</span>
              </div>
            </div>
            <div className="hero-card-item">
              <div className="hero-card-dot" />
              <div className="hero-card-text">
                <strong>Deliverables your team can actually use</strong>
                <span>SOPs, process maps, and automations built for real people doing real work.</span>
              </div>
            </div>
            <div className="hero-card-item">
              <div className="hero-card-dot" />
              <div className="hero-card-text">
                <strong>Remote-first</strong>
                <span>Based in Ontario. On-site when it matters. Serving Canada and the US.</span>
              </div>
            </div>
            <div className="hero-card-item">
              <div className="hero-card-dot" />
              <div className="hero-card-text">
                <strong>You own everything</strong>
                <span>No lock-in. No ongoing fees. We build it, hand it over, and it is yours.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="who-we-help" className="section who">
        <div className="section-inner">
          <div className="who-header">
            <div>
              <p className="eyebrow">Who We Help</p>
              <h2 className="who-h2">Owning a business should mean having options. When it only works because you're in the room, you haven't built freedom yet - you've built yourself a job.</h2>
            </div>
            <div>
              <p className="who-desc">
                The team is capable, and the revenue is there. But - nothing is written down, everything runs through you, and hiring more people isn't fixing the problem.
              </p>
            </div>
          </div>
          <div className="industries">
            {industries.map((ind) => (
              <div key={ind.label} className="industry-card">
                <div className="industry-icon">{ind.icon}</div>
                <p className="industry-label">{ind.label}</p>
                <h3 className="industry-h3">{ind.h3}</h3>
                <p className="industry-p">{ind.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="section services">
        <div className="section-inner">
          <div className="services-header">
            <p className="eyebrow eyebrow-light">What We Do</p>
            <h2 className="services-h2">Three services. <em>One outcome.</em></h2>
            <p className="services-desc">
              We identify what is broken, document how things should actually work, and build the automations that save your team real time. Fixed scope, built to last.
            </p>
          </div>
          <div className="services-grid">
            {[
              {
                num: "01",
                h3: "Process Audits",
                p: "This is the foundation, and most founders are surprised by what we find here. It's not that things are broken, it's that nobody has ever written it down and looked at it all at once. We interview your team, observe how work actually moves, and surface the gaps before they become expensive.",
                bullets: ["Current-state process mapping", "Gap and risk analysis", "Prioritized recommendations", "Delivered in plain language"]
              },
              {
                num: "02",
                h3: "SOP Development",
                p: "Most SOPs fail because they are written by someone who does not do the job, for someone who will not read them. We write with your team, not at them. Clear, specific, and built to be updated as things change.",
                bullets: ["Role-specific documentation", "Step-by-step with decision points", "Onboarding-ready formats", "Includes a maintenance plan"]
              },
              {
                num: "03",
                h3: "Workflow Automation",
                p: "We are not here to sell you software. We find the things your team does manually every day that could run on their own, and build the automations using tools you already have or can easily adopt.",
                bullets: ["No-code and low-code tools", "Scheduling and notifications", "Handoff and approval flows", "Integrated with what you use"]
              }
            ].map((svc) => (
              <div key={svc.num} className="service-card">
                <div className="service-num">{svc.num}</div>
                <h3 className="service-h3">{svc.h3}</h3>
                <p className="service-p">{svc.p}</p>
                <ul className="service-list">
                  {svc.bullets.map(b => <li key={b}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section how">
        <div className="section-inner">
          <div className="how-header">
            <div>
              <p className="eyebrow">How It Works</p>
              <h2 className="how-h2">Fixed scope. Clear deliverables. No surprises.</h2>
            </div>
            <p className="how-desc">
              Every engagement has a defined start and a defined end, but what we build stays. You know what it costs before we begin, and when we are done, your team can run it without us.
            </p>
          </div>
          <div className="steps">
            {[
              { num: "01", h3: "Self-Assessment", p: "Start with our free 10-area self-assessment. Takes about 15 minutes and gives you an instant scorecard of where things stand." },
              { num: "02", h3: "Discovery Call", p: "30 minutes and free. We talk through your results, ask about your business, and tell you honestly if we're the right fit." },
              { num: "03", h3: "The Groundwork Audit", p: "A paid, hands-on diagnostic. Facilitated conversations, a full findings report, and a prioritized roadmap, plus a 30-90 day check-in to see what's sticking." },
              { num: "04", h3: "The Work", p: "If there's more to build, we scope it separately. Most engagements run 4 to 12 weeks. You own everything when we're done." }
            ].map((step) => (
              <div key={step.num} className="step">
                <div className="step-num">{step.num}</div>
                <h3 className="step-h3">{step.h3}</h3>
                <p className="step-p">{step.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="audit" className="audit">
        <div className="audit-inner">
          <div>
            <p className="eyebrow eyebrow-light">The Real Diagnostic</p>
            <h2 className="audit-h2">The Groundwork Audit goes further than a scorecard.</h2>
            <p className="audit-price-note">
  Investment cost varies based on scope and complexity. Already worked with us? Returning clients can book a Groundwork Refresh with preferred pricing, a lighter-touch check on specific areas without starting from zero. Flexible payment plans available.
</p>
<p className="audit-price-note">
  The Audit delivers your operational blueprint. If you choose to have us handle hands-on execution (e.g., drafting full SOP libraries, configuring workflow automations, etc.), those are scoped and contracted as separate engagements after the audit is complete.
</p>
            <a href="/book" className="btn-primary">Book a Discovery Call &rarr;</a>
          </div>
          <div className="audit-card">
            <p className="audit-card-title">What the Audit covers</p>
            {["Systems & Tools", "Data & Documentation", "Roles & Ownership", "Leadership Visibility", "Communication & Alignment", "Financial Visibility", "Client Experience", "Capacity & Workload", "Growth Readiness", "Owner Dependency & Exit Risk"].map(area => (
              <div key={area} className="audit-detail">
                <div className="audit-detail-dot" />
                <p>{area}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="cta-section">
        <div className="cta-inner">
          <div>
            <p className="eyebrow eyebrow-light">Get Started</p>
            <h2 className="cta-h2">Ready to build<br />the <em>foundation?</em></h2>
            <p className="cta-p">
              Start with the free self-assessment to see where things stand. From there, a 30-minute discovery call helps us figure out if a full audit makes sense for you.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href="/self-assessment" className="btn-primary">Take the Free Self-Assessment &rarr;</a>
              <a href="/book" className="btn-secondary">Book a Discovery Call</a>
            </div>
          </div>
          <div className="cta-card">
            <h3 className="cta-card-title">Here is what a discovery call actually is.</h3>
            {[
              ["30 minutes.", "We'll talk through your self-assessment results and your business."],
              ["No pitch.", "We will tell you honestly if we are the right fit. If we're not, we will tell you that too."],
              ["If there is a fit,", "the Groundwork Audit is a paid, standalone engagement. Additional engagements are scoped separately, with a clear start and end."],
              ["Fixed scope only.", "At this time, we're not offering retainer services or open-ended engagements."]
            ].map(([bold, rest]) => (
              <div key={bold} className="cta-point">
                <div className="cta-point-dot" />
                <p><strong>{bold}</strong> {rest}</p>
              </div>
            ))}
            <hr className="cta-divider" />
            <p className="cta-contact" style={{ marginBottom: 6, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#999" }}>Based in Canada</p>
            <p className="cta-contact">Serving clients across Canada and the US. Remote-first. On-site when it matters.</p>
            <p className="cta-contact" style={{ marginTop: 8 }}>
              <a href="mailto:jennifer@groundworkconsult.ca">jennifer@groundworkconsult.ca &rarr;</a>
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                <LogoMark />
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 600, color: IVORY }}>Groundwork Consult</span>
              </a>
              <p>Operational systems for founder-led businesses that have outgrown how they started.</p>
              <small>Based in Canada &middot; groundworkconsult.ca</small>
            </div>
            <div>
              <p className="footer-col-label">Services</p>
              <ul className="footer-links">
                <li><a href="#services">Process Audits</a></li>
                <li><a href="#services">SOP Development</a></li>
                <li><a href="#services">Workflow Automation</a></li>
              </ul>
            </div>
            <div>
              <p className="footer-col-label">Company</p>
              <ul className="footer-links">
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div>
              <p className="footer-col-label">Ready to Start?</p>
              <p className="footer-cta-text">Take the free self-assessment, or book a 30-minute discovery call to see if we are the right fit.</p>
              <a href="/self-assessment" className="btn-primary" style={{ fontSize: 13, padding: "10px 20px" }}>Take the Self-Assessment</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copy">&copy; 2026 Groundwork Consult. All rights reserved.</p>
            <div className="footer-legal">
              <button onClick={() => setModal("privacy")}>Privacy</button>
              <button onClick={() => setModal("terms")}>Terms</button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
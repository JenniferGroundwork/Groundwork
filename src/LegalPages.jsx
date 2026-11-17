const DARK_GREEN = "#2D4537";
const MOCHA      = "#6B4F3A";
const TEXT_MID   = "#4A4A4A";

const wrap = { maxWidth: 720, margin: "0 auto", padding: "64px 24px 96px", fontFamily: "'Inter', sans-serif" };
const h1 = { fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: DARK_GREEN, margin: "0 0 8px" };
const updated = { fontSize: 13, color: TEXT_MID, marginBottom: 32 };
const h2 = { fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: MOCHA, margin: "32px 0 8px" };
const p = { fontSize: 15, lineHeight: 1.7, color: TEXT_MID, margin: "0 0 10px" };
const a = { color: MOCHA };

const EMAIL = "jennifer@groundworkconsult.ca";
const Mail = () => <a href={`mailto:${EMAIL}`} style={a}>{EMAIL}</a>;

export function PrivacyPage() {
  return (
    <main style={wrap}>
      <h1 style={h1}>Privacy Policy</h1>
      <p style={updated}>Last updated: November 2026</p>

      <p style={p}>Groundwork Consult is an operations consulting business based in Ontario, Canada. This policy explains what we collect through this website and what we do with it. We follow Canada's Personal Information Protection and Electronic Documents Act (PIPEDA).</p>

      <h2 style={h2}>What we collect</h2>
      <p style={p}>Only what you give us. If you email yourself your self-assessment results, we collect your name, email address, and your scores. If you book a discovery call, we collect your name, email, and anything you add to the booking form. If you email us, we have your message.</p>
      <p style={p}>The self-assessment itself runs in your browser. Your answers are not saved anywhere unless you choose to email the results.</p>

      <h2 style={h2}>Analytics and cookies</h2>
      <p style={p}>We use Vercel Web Analytics to count page visits. It does not use cookies, does not track you across other websites, and does not collect personal information. We don't use advertising or tracking cookies.</p>

      <h2 style={h2}>How we use it</h2>
      <p style={p}>To send you your results, to follow up about a potential engagement, and to reply when you contact us. We don't sell your information and we don't add you to a mailing list without asking.</p>

      <h2 style={h2}>Who else handles it</h2>
      <p style={p}>We rely on a few service providers to run this site: Vercel (website hosting and analytics), EmailJS (sending assessment results), Koalendar (call booking), and Google Fonts (typefaces). Some of these providers store data outside Canada, including in the United States, where it may be subject to local laws.</p>

      <h2 style={h2}>How long we keep it</h2>
      <p style={p}>We keep enquiry information only as long as it's useful for following up. If you become a client, we keep engagement records as long as needed for business and tax purposes.</p>

      <h2 style={h2}>Your rights</h2>
      <p style={p}>You can ask to see, correct, or delete the information we hold about you at any time. Email <Mail /> and we'll respond within 30 days.</p>

      <h2 style={h2}>Contact</h2>
      <p style={p}>Questions about this policy: <Mail /></p>
    </main>
  );
}

export function TermsPage() {
  return (
    <main style={wrap}>
      <h1 style={h1}>Terms of Use</h1>
      <p style={updated}>Last updated: November 2026</p>

      <h2 style={h2}>Who we are</h2>
      <p style={p}>Groundwork Consult is an operations consulting business based in Ontario, Canada, serving clients across Canada and the United States.</p>

      <h2 style={h2}>Using this site</h2>
      <p style={p}>This website and its free tools, including the self-assessment and the resources under Tools, are general information. They are not professional business, legal, financial, or HR advice for your specific situation.</p>

      <h2 style={h2}>Engagements</h2>
      <p style={p}>Paid work with Groundwork Consult is governed by a separate written agreement signed before work starts. Nothing on this site creates a consulting relationship or obligation on either side.</p>

      <h2 style={h2}>Free tools and templates</h2>
      <p style={p}>You're welcome to use the free tools and templates inside your own business. Please don't resell, republish, or redistribute them.</p>

      <h2 style={h2}>Intellectual property</h2>
      <p style={p}>The content on this site, including the self-assessment, tools, templates, and written copy, belongs to Groundwork Consult.</p>

      <h2 style={h2}>Limitation of liability</h2>
      <p style={p}>We work to keep everything here accurate and current, but the site is provided as is. Groundwork Consult isn't liable for decisions made or losses arising from use of this site or its free tools.</p>

      <h2 style={h2}>Governing law</h2>
      <p style={p}>These terms are governed by the laws of Ontario and the federal laws of Canada that apply there.</p>

      <h2 style={h2}>Contact</h2>
      <p style={p}>Questions about these terms: <Mail /></p>
    </main>
  );
}

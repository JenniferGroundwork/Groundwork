import { useState } from "react";

const MOCHA = "#6B4F3A";
const AMBER = "#7A6A3C";
const CAMEL = "#C19A6B";
const IVORY = "#F5F0E8";
const DARK_MOCHA = "#3D2B1F";
const TEAL = "#5B7B7A";
const OLIVE = "#6B7A3C";
const LIGHT_TAN = "#EDE8E0";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const MODULES = [
  { id: "explainer", title: "What AI Actually Is", icon: "01", color: MOCHA, desc: "No tech language. No confusing steps. Just what it is, what it's good at, and what it isn't." },
  { id: "prompts", title: "Prompt Library", icon: "02", color: AMBER, desc: "Ready-to-use prompts for the tasks you actually do every day." },
  { id: "workflows", title: "Workflow Templates", icon: "03", color: TEAL, desc: "Step-by-step AI-assisted workflows for 6 common business tasks." },
  { id: "decision", title: "Should I Use AI For This?", icon: "04", color: OLIVE, desc: "A quick reference guide for when AI helps (and when it doesn't.)" },
];

const PROMPT_CATEGORIES = [
  {
    id: "comms", label: "Client Communication", color: MOCHA,
    prompts: [
      {
        title: "Respond to a Negative Review",
        when: "A client leaves a negative review on Google or another platform.",
        prompt: `I received the following review for my [TYPE OF BUSINESS] business:

"[PASTE THE REVIEW HERE]"

Write a professional, warm response that:
- Acknowledges their experience without being defensive
- Does not argue with the facts they have stated
- Offers to continue the conversation privately
- Ends by inviting them to reach out directly

Keep it under 100 words. Do not use corporate language or sound like a press release.`,
        tip: "Read the draft before you post it. AI will give you a starting point, but you should always adjust it to sound like you.",
      },
      {
        title: "Follow Up With a Client Who Hasn't Responded",
        when: "You sent a quote or proposal and haven't heard back after 3-5 days.",
        prompt: `Write a brief, friendly follow-up message to a client who received a quote from my [TYPE OF BUSINESS] business [X] days ago and hasn't responded.

The quote was for: [BRIEF DESCRIPTION OF THE WORK]
The total was approximately: [AMOUNT — optional]

The message should:
- Be warm and not pushy
- Remind them of the quote without restating everything
- Ask if they have any questions or need anything clarified
- Be under 80 words
- Sound like a real person, not a sales email`,
        tip: "If you've followed up twice with no response, it might be time to stop reaching out or re-evaluate your offer. AI can't fix a client who isn't interested.",
      },
      {
        title: "Write a Client Satisfaction Follow-Up",
        when: "A job is complete and you want to check in and request a review.",
        prompt: `Write a short follow-up message to send to a client after completing a [TYPE OF WORK] job for them.

The message should:
- Thank them genuinely for their business
- Ask briefly how everything went
- Invite them to leave a review on [PLATFORM] if they're happy. Include a soft ask, not a demand.
- Mention you'd love to work with them again or ask for referrals if appropriate
- Be under 100 words and sound like a real person`,
        tip: "Double check the review link before sending. Review and send your email within 48 hours of job completion. The longer you wait, the less likely they are to leave a review.",
      },
      {
        title: "Handle a Client Complaint by Email",
        when: "A client emails to complain about something that went wrong.",
        prompt: `A client has emailed me with the following complaint:

"[PASTE THEIR EMAIL OR DESCRIBE THE ISSUE]"

Write a professional response that:
- Opens by acknowledging what they have experienced
- Does not make excuses or blame anyone
- States clearly what I'm going to do to address it
- Provides a timeline if relevant
- Ends on a positive, forward-looking note

Keep it under 150 words. Do not be defensive.`,
        tip: "Unless it's an emergency, never send a complaint response immediately. Write the draft, step away, then read it again before sending.",
      },
    ]
  },
  {
    id: "hiring", label: "Hiring & Team", color: TEAL,
    prompts: [
      {
        title: "Write a Job Posting",
        when: "You need to hire someone and want a posting that attracts the right people.",
        prompt: `Write a job posting for a [JOB TITLE] position at my [TYPE OF BUSINESS] business based in [LOCATION].

Key details:
- What they'll do day to day: [BRIEF DESCRIPTION]
- What we're looking for: [KEY REQUIREMENTS OR EXPERIENCE REQUIRED]
- Employment type: [Full-time / Part-time / Seasonal / Contract]
- Compensation: [RANGE OR "competitive based on experience"]

The posting should:
- Sound like a real workplace, not a corporate HR template
- Be direct about what the job actually involves
- Attract people who want to do this work, not just need a job
- Be under 300 words`,
        tip: "Read it back and ask: does this sound like my business? If it doesn't sound like you, edit it until it does.",
      },
      {
        title: "Write Interview Questions for a Specific Role",
        when: "You're preparing to interview candidates and want better questions than 'where do you see yourself in 5 years?' or 'what's your greatest weakness?'",
        prompt: `Write 8 interview questions for a [JOB TITLE] role at a [TYPE OF BUSINESS] business.

The most important things I need to know about a candidate are:
- [QUALITY 1 - e.g. they're reliable and show up when they say they will]
- [QUALITY 2 - e.g. they can handle upset customers calmly]
- [QUALITY 3 - e.g. they take initiative instead of waiting to be told]

Include a mix of:
- Situational questions (what would you do if...)
- Behavioural questions (tell me about a time when...)
- Role-specific questions

Avoid cliché questions. The goal is to understand how they actually work.`,
        tip: "Use the same questions with every candidate so you're comparing candidates on the same criteria. This also helps you avoid unconscious bias influencing which questions you ask different people.",
      },
      {
        title: "Write a Performance Feedback Summary",
        when: "You need to give written feedback to a team member and want to do it clearly and fairly.",
        prompt: `Help me write a written performance feedback summary for a team member in the following situation:

Role: [JOB TITLE]
What they're doing well: [LIST 2-3 SPECIFIC THINGS]
Where they need to improve: [LIST 1-2 SPECIFIC AREAS]
Any specific incident or context: [OPTIONAL]

The feedback should:
- Be specific and observable - not vague or personal
- Be fair, objective and balanced
- State what improvement looks like concretely
- Be professional but direct
- Be under 200 words`,
        tip: "Feedback should reference specific behaviours, not personality. 'You were late three times this month' is useful. 'You're unreliable' is not.",
      },
    ]
  },
  {
    id: "ops", label: "Operations & Admin", color: OLIVE,
    prompts: [
      {
        title: "Turn a Process Description into a Checklist",
        when: "You want to document how something gets done but don't know where to start.",
        prompt: `I'm going to describe a process we do in our [TYPE OF BUSINESS] business. Turn it into a clear, numbered checklist that anyone on the team could follow. Ask me follow up questions if anything is unclear.

Here's how we currently do it:
[DESCRIBE THE PROCESS IN YOUR OWN WORDS. DON'T OVERTHINK IT, JUST WRITE HOW IT HAPPENS. IT CAN BE MESSY AND UNSTRUCTURED - AI WILL FIX THAT. THE GOAL IS TO GET IT OUT OF YOUR HEAD AND ONTO PAPER.]

Format it as:
- A short title for the process
- Who it applies to
- Numbered steps in plain language
- Any important notes at the end

Keep the language simple. This is for people doing the job, not reading a manual.`,
        tip: "This is one of the highest-value uses of AI for small business. Describe it the way you'd explain it to a new employee - that's all you need.",
      },
      {
        title: "Summarize a Meeting or Conversation",
        when: "You had a client call or team meeting and want to document what was decided.",
        prompt: `Summarize the following meeting or conversation into a clear, organized record.

[PASTE YOUR NOTES OR DESCRIBE WHAT WAS DISCUSSED]

Format the summary as:
- Date: [DATE]
- Attendees: [NAMES OR ROLES]
- Key decisions made: [BULLET POINTS]
- Action items: [WHO is doing WHAT by WHEN]
- Any open questions or follow-ups needed

Keep it factual and brief. Under 200 words if possible.`,
        tip: "Get in the habit of spending 2 minutes after every client call doing this. Future-you will be grateful.",
      },
      {
        title: "Draft a Policy or Rule for the Team",
        when: "Something keeps going wrong and you need to write a clear policy to address it.",
        prompt: `Help me write a simple, clear policy for my [TYPE OF BUSINESS] team about [TOPIC - e.g. phone use on the job, lateness, handling cash, overtime requests].

Context: [DESCRIBE THE SITUATION OR PROBLEM THAT MADE THIS NECESSARY]

The policy should:
- State clearly what the expectation is
- Explain why it matters (briefly)
- Describe what happens if it isn't followed
- Be written in plain language, not legal jargon
- Be under 150 words`,
        tip: "A policy that people don't understand won't be followed. A policy that is overly harsh and unenforceable won't be followed either. Read it and ask: would a new employee know exactly what to do after reading this?",
      },
      {
        title: "Write a Vendor or Supplier Email",
        when: "You need to follow up with a supplier, raise a concern, or negotiate terms.",
        prompt: `Write a professional email to a vendor or supplier about the following situation:

My business: [TYPE OF BUSINESS]
Vendor/Supplier: [NAME OR TYPE - e.g. materials supplier, cleaning company]
Situation: [DESCRIBE - e.g. delivery was short, pricing has increased, I want to negotiate better terms, I'm following up on an outstanding order]

The email should:
- Be direct and professional
- State the issue or request clearly
- Ask for a specific response or action
- Be under 150 words
- Not be aggressive but not be vague either`,
        tip: "Keep vendor communication in writing. It protects you and creates a paper trail if something becomes a dispute.",
      },
    ]
  },
  {
    id: "marketing", label: "Marketing & Content", color: "#7B6F9E",
    prompts: [
      {
        title: "Write a Service Description",
        when: "You need to describe what you offer on a website, flyer, or proposal.",
        prompt: `Write a clear, compelling description of the following service for my [TYPE OF BUSINESS] business:

Service: [NAME OF SERVICE]
What it involves: [BRIEF DESCRIPTION OF WHAT YOU DO]
Who it's for: [TYPE OF CLIENT]
What makes us different or better: [YOUR HONEST ANSWER - even if it's just "we show up when we say we will"]

The description should:
- Lead with the client's problem or need, not with your credentials
- Be specific enough to be useful, not so specific it limits you
- Sound like a human wrote it
- Be under 100 words`,
        tip: "The best service descriptions answers 'so what?' If someone reads it and thinks 'why does that matter to me?', then rewrite it.",
      },
      {
        title: "Write a Referral Request",
        when: "You want to ask a happy client or contact to refer people to you.",
        prompt: `Write a short, genuine message asking a [CLIENT / COLLEAGUE / CONTACT] for a referral.

Context:
- How I know them: [BRIEF - e.g. completed a roofing job for them last year, worked together at my previous job]
- What I'm asking them to refer people for: [YOUR SERVICE]
- Who my ideal referral would be: [BRIEF DESCRIPTION OF IDEAL CLIENT]

The message should:
- Be warm and personal, not transactional
- Not feel like a template
- Be specific about what kind of referral would be helpful
- Be under 80 words`,
        tip: "Personalize it before you send it. AI gives you the structure, and you provide the relationship.",
      },
    ]
  },
];

const WORKFLOWS = [
  {
    id: "review-response",
    title: "Responding to a Negative Review",
    time: "8 minutes",
    color: MOCHA,
    steps: [
      { role: "you", label: "Read the review carefully", desc: "Don't respond immediately. Read it twice. Is the complaint valid? Partially valid? Completely unfounded? Your answer changes the response." },
      { role: "you", label: "Decide on your position", desc: "Before asking AI to write anything, know what you want to say. Do you want to apologize? Clarify? Invite offline conversation? AI shouldn't make this decision for you." },
      { role: "ai", label: "Use the Negative Review prompt", desc: "Paste the review and use the prompt from the library. Tell it your position and what outcome you want." },
      { role: "you", label: "Edit the draft", desc: "Read it out loud. Does it sound like you? Is there anything defensive in it? Remove anything that could make it worse. Make it shorter if possible." },
      { role: "you", label: "Post the response", desc: "Post it publicly, then follow up privately if the situation warrants it." },
    ]
  },
  {
    id: "job-posting",
    title: "Posting a New Job",
    time: "20 minutes",
    color: TEAL,
    steps: [
      { role: "you", label: "Write down what you actually need", desc: "Before AI writes anything, spend 5 minutes answering: What will this person do every day? What will make them good at it? What's the biggest mistake I've made hiring for this role before?" },
      { role: "ai", label: "Use the Job Posting prompt", desc: "Give it the details you just wrote down. The more specific your input, the better the output." },
      { role: "you", label: "Edit for your voice", desc: "Does it sound like your business? Remove anything generic. Add anything specific to your workplace: the good and the honest." },
      { role: "ai", label: "Generate interview questions", desc: "Use the Interview Questions prompt. Reference the qualities you identified in step 1." },
      { role: "you", label: "Review both documents together", desc: "Do the job posting and the interview questions align? Is there anything you're testing for in interviews that isn't reflected in the posting? Fix the gaps." },
    ]
  },
  {
    id: "process-documentation",
    title: "Documenting a Business Process",
    time: "15 minutes",
    color: OLIVE,
    steps: [
      { role: "you", label: "Pick one process to document", desc: "Start with the one that causes the most problems when someone is away or new. Don't try to document everything at once." },
      { role: "you", label: "Describe it in your own words", desc: "Open a notes app and just explain it like you're talking to a new employee. Don't worry about format - just get it out. Bullet points, run-on sentences, whatever comes naturally." },
      { role: "ai", label: "Use the Process to Checklist prompt", desc: "Paste your description into the prompt. Let AI format it into a structured checklist." },
      { role: "you", label: "Walk through it step by step", desc: "Read the checklist while mentally doing the process. Are the steps in the right order? Is anything missing? Is anything unclear? Edit until a new person could follow it." },
      { role: "you", label: "Test it with someone on your team", desc: "Give it to a team member who does this task and ask: is anything missing or confusing? Their feedback is worth more than yours - you already know how to do it." },
    ]
  },
  {
    id: "client-followup",
    title: "Following Up After a Job",
    time: "5 minutes",
    color: AMBER,
    steps: [
      { role: "you", label: "Confirm the job is complete and the client is satisfied", desc: "Don't start a follow-up sequence if there are unresolved issues. Fix those first." },
      { role: "ai", label: "Use the Client Satisfaction Follow-Up prompt", desc: "Customize it with the client's name, what you did for them, and the platform where you'd like a review." },
      { role: "you", label: "Personalize before sending", desc: "Add one specific detail from their job. 'It was great working on your lawn - the hydrangeas are coming in nicely!' is better than 'It was great working with you.'" },
      { role: "you", label: "Send within 48 hours of completion", desc: "This is the window where they're most likely to respond positively. Life is busy and people move on quickly, especially when they're satisfied. Every day after this, the likelihood of a response decreases." },
    ]
  },
  {
    id: "team-policy",
    title: "Writing a Team Policy",
    time: "15 minutes",
    color: "#8B5E3C",
    steps: [
      { role: "you", label: "Identify the specific problem", desc: "Policies should solve specific problems, not be written speculatively. What happened that made this necessary? Be specific." },
      { role: "you", label: "Decide what the rule actually is", desc: "Before writing anything, you need to know your own position. What do you expect? What happens if it isn't followed? AI shouldn't decide this for you." },
      { role: "ai", label: "Use the Team Policy prompt", desc: "Give it the context and your position. Let it format it cleanly." },
      { role: "you", label: "Have someone read it who doesn't know the backstory", desc: "Is the expectation clear to someone with no context? If they have questions, the policy needs more clarity." },
      { role: "you", label: "Communicate it personally before you distribute it", desc: "A written policy without a conversation first will almost always land badly, and leave your team wondering who messed up. Talk to your team, then share the document as a reference." },
    ]
  },
  {
    id: "meeting-summary",
    title: "Documenting a Client Call or Meeting",
    time: "5 minutes",
    color: "#7B6F9E",
    steps: [
      { role: "you", label: "Take rough notes during the call", desc: "You don't need to capture everything. Focus on decisions, action items, and anything that surprised you. Even messy bullet points are enough." },
      { role: "ai", label: "Use the Meeting Summary prompt", desc: "Paste your notes and let AI format them into a clean record with decisions and action items clearly separated." },
      { role: "you", label: "Review and correct", desc: "AI will sometimes infer things that weren't said. Read it carefully. Remove anything that wasn't explicitly discussed or decided." },
      { role: "you", label: "Send to relevant people within 24 hours", desc: "A meeting summary sent the same day or next morning signals professionalism and keeps everyone accountable. 'As discussed...' is a powerful phrase." },
    ]
  },
];

const DECISION_SCENARIOS = [
  { scenario: "Writing a first draft of something", verdict: "yes", reason: "AI is excellent at getting something on paper quickly. AI starts, you edit." },
  { scenario: "Responding to a legal notice or contract dispute", verdict: "no", reason: "This requires a lawyer. AI will give you something that sounds right but may not be legally sound." },
  { scenario: "Formatting and structuring a document", verdict: "yes", reason: "AI is fast at taking messy notes or descriptions and turning them into clean, organized formats." },
  { scenario: "Making a hiring decision", verdict: "no", reason: "AI can help you write job postings and interview questions. The decision itself requires human judgment about fit and reliability." },
  { scenario: "Responding to a routine client inquiry", verdict: "yes", reason: "A great use of AI; draft the response, then personalize and send. Saves time without losing the relationship." },
  { scenario: "Giving critical feedback to a team member", verdict: "maybe", reason: "AI can help you structure your feedback and keep it objective. But you need to know what the issues is, what you want to say first, and then deliver it in person." },
  { scenario: "Creating a checklist from a process you know well", verdict: "yes", reason: "One of the highest-value uses for small business. Describe the process in plain language, AI formats it." },
  { scenario: "Diagnosing what's wrong with your business", verdict: "no", reason: "AI can help you think through a problem but doesn't know your business, your people, or your history. This requires someone who does." },
  { scenario: "Writing a job posting", verdict: "yes", reason: "AI can write a solid first draft in minutes. Your job is to make it sound like your business." },
  { scenario: "Pricing your services", verdict: "no", reason: "AI doesn't know your costs, your market, or what your clients will pay. Pricing requires real numbers and judgment." },
  { scenario: "Drafting a team policy", verdict: "yes", reason: "AI is good at structure and professional tone. But you need to decide the policy itself, AI just helps you communicate it clearly." },
  { scenario: "Managing a difficult employee situation", verdict: "no", reason: "This requires human judgment, knowledge of the person, and often HR or legal input. AI will inevitably make assumptions, and can't replace your experience and intuition." },
  { scenario: "Summarizing a meeting or call", verdict: "yes", reason: "Paste your notes and get a clean, organized summary in under a minute. One of the easiest wins available." },
  { scenario: "Deciding whether to take on a new client", verdict: "no", reason: "This requires your instincts about fit, capacity, and risk. AI can help you think through criteria but not make the call." },
  { scenario: "Writing content for your website", verdict: "yes", reason: "AI can write clean, professional service descriptions and page content. Edit it to sound like you before publishing." },
  { scenario: "Resolving a dispute with a vendor or client", verdict: "maybe", reason: "AI can help you draft professional communication. But the strategy and the relationship belong to you." },
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function Explainer() {
  const [expanded, setExpanded] = useState(null);
  const items = [
    {
      q: "What is AI, actually?",
      a: `AI tools like ChatGPT, Claude and Gemini are artifical intelligence language models. They've been trained on massive amounts of text, including websites, books, articles, documents, and have learned to predict what a useful, coherent response looks like based on what you ask.

Think of it like a very well-read assistant who can draft almost anything quickly, organize information clearly, and shift tone or format on request. It doesn't think. It doesn't know your business. It doesn't have opinions. It generates responses based on patterns in language, and what you tell it.

That's its strength and its limit.`
    },
    {
      q: "What is AI actually good at?",
      a: `AI is genuinely useful for:

• First drafts of almost anything, including emails, job postings, policies, checklists, descriptions
• Reformatting and organizing messy information
• Summarizing long text or piles of information into shorter, more digestible pieces
• Changing the tone or length of something you've already written, without changing the meaning
• Generating options when you're stuck (e.g. "give me 5 ways to say this")
• Answering factual questions that don't require knowing your specific situation

The common thread: AI is a tool for getting something on paper faster. You still have to make it yours.`
    },
    {
      q: "What is AI not good at?",
      a: `AI is not good at:

• Knowing your business, your clients, or your team
• Making judgment calls that require real-world context
• Replacing professional advice (especially legal, financial, and medical)
• Being accurate about specific facts, numbers, or recent events (AI models learn from patterns in language, not from real-time data, so they can confidently give you wrong information that sounds right)
• Understanding relationships or workplace dynamics
• Making decisions without your input, intuition, and experience

AI will sometimes be confidently wrong, and then build off of those mistakes. Always read what it gives you before you use it.`
    },
    {
      q: "Why doesn't it work when I just ask it things randomly?",
      a: `Because vague inputs produce vague outputs.

"Write me an email to a client" will produce something generic and likely unusable. "Write a follow-up email to a trades client who received a quote for a roof replacement 5 days ago and hasn't responded - keep it friendly, under 80 words, no pressure" will produce something actually useful.

The quality of what AI gives you is almost entirely determined by the quality of what you ask. That's what the prompts in this kit are for - they've been written to get you something usable on the first try.`
    },
    {
      q: "Do I need to pay for AI tools?",
      a: `The free versions of ChatGPT (chat.openai.com), Claude (claude.ai), and Gemini (gemini.google.com) can handle everything in this kit without paying anything. The paid versions are faster and more capable, but aren't necessary to get real value from what's here.

Tools worth knowing:
• ChatGPT (chat.openai.com): the most well known and widely used; good for a variety of tasks
• Claude (claude.ai): strong at writing and reasoning; can be used interchangably with ChatGPT for variety
• Gemini (gemini.google.com): integrated with Google products; good for factual questions and summarization
• CoPilot (copilot.microsoft.com): built into Microsoft products; good for drafting emails, documents, and spreadsheets within those platforms

Start with the free version of ChatGPT, Claude or Gemini. If you're using it daily and finding it useful, but hitting limits, then consider upgrading.`
    },
    {
      q: "Is there anything I should be careful about?",
      a: `Yes, a few things:

• Don't paste confidential client information, financial records, or personal employee data into AI tools. Treat AI like a public tool - only put in what you'd be comfortable with others seeing.

• Don't publish AI-written content without reading it. It will sometimes be generic, slightly off, or confidently wrong about facts.

• Don't use AI to replace legal or financial advice. It can help you draft a question to send your lawyer, but it shouldn't replace the lawyer.

• Don't send AI-generated emails without personalizing them. Clients notice when something sounds like a template.`
    },
  ];

  return (
    <div>
      <p style={{ fontSize: 14, color: MOCHA, marginBottom: 28, lineHeight: 1.8 }}>
        Before you use any of the tools in this kit, it's worth spending five minutes understanding what AI actually is (and what it isn't). No tech language. No confusing steps.
      </p>
      {items.map((item, i) => (
        <div key={i} style={{ marginBottom: 10, border: `1px solid ${LIGHT_TAN}`, borderRadius: 8, overflow: "hidden" }}>
          <button onClick={() => setExpanded(expanded === i ? null : i)} style={{
            width: "100%", background: expanded === i ? DARK_MOCHA : "white", border: "none",
            padding: "16px 20px", textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: expanded === i ? IVORY : DARK_MOCHA, fontFamily: "Georgia, serif" }}>{item.q}</span>
            <span style={{ color: expanded === i ? CAMEL : CAMEL, fontSize: 18, marginLeft: 12 }}>{expanded === i ? "−" : "+"}</span>
          </button>
          {expanded === i && (
            <div style={{ padding: "16px 20px", background: IVORY, borderTop: `1px solid ${LIGHT_TAN}`, textAlign: "left" }}>
              {item.a.split("\n\n").map((para, pi) => (
                <p key={pi} style={{ fontSize: 14, color: DARK_MOCHA, lineHeight: 1.8, margin: "0 0 12px", whiteSpace: "pre-line" }}>{para}</p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function PromptLibrary() {
  const [activeCategory, setActiveCategory] = useState("comms");
  const [activePrompt, setActivePrompt] = useState(null);
  const [copied, setCopied] = useState(false);

  const category = PROMPT_CATEGORIES.find(c => c.id === activeCategory);

  function copyPrompt(text) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (activePrompt !== null && category) {
    const prompt = category.prompts[activePrompt];
    return (
      <div>
        <button onClick={() => setActivePrompt(null)} style={{ background: "none", border: "none", color: CAMEL, cursor: "pointer", fontSize: 13, marginBottom: 20, padding: 0 }}>← Back to prompts</button>
        <h3 style={{ fontSize: 20, color: DARK_MOCHA, margin: "0 0 6px", fontFamily: "Georgia, serif" }}>{prompt.title}</h3>
        <div style={{ width: 32, height: 2, background: AMBER, marginBottom: 16 }} />

        <div style={{ background: IVORY, borderRadius: 8, padding: "12px 16px", marginBottom: 20, borderLeft: `3px solid ${AMBER}` }}>
          <div style={{ fontSize: 11, color: AMBER, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>When to use this</div>
          <p style={{ fontSize: 13, color: MOCHA, margin: 0, lineHeight: 1.6 }}>{prompt.when}</p>
        </div>

        <div style={{ background: DARK_MOCHA, borderRadius: 10, padding: "20px 24px", marginBottom: 16, position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: CAMEL, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>The Prompt - Copy and paste into ChatGPT</div>
            <button onClick={() => copyPrompt(prompt.prompt)} style={{
              background: copied ? OLIVE : AMBER, border: "none", borderRadius: 6,
              padding: "6px 14px", color: "white", cursor: "pointer", fontSize: 12, fontWeight: 600,
            }}>
              {copied ? "✓ Copied" : "Copy Prompt"}
            </button>
          </div>
          <pre style={{ fontSize: 13, color: CAMEL, margin: 0, whiteSpace: "pre-wrap", lineHeight: 1.7, fontFamily: "sans-serif" }}>{prompt.prompt}</pre>
        </div>

        <div style={{ background: "#FEF3E2", border: `1px solid ${AMBER}`, borderRadius: 8, padding: "12px 16px" }}>
          <div style={{ fontSize: 11, color: AMBER, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Before you use the output</div>
          <p style={{ fontSize: 13, color: DARK_MOCHA, margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>{prompt.tip}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p style={{ fontSize: 14, color: MOCHA, marginBottom: 20, lineHeight: 1.7 }}>
        Ready-to-use prompts for the tasks you actually do. Click any prompt to see it in full, then copy and paste it directly into ChatGPT, Claude or Gemini. Fill in the parts in [BRACKETS] with specific details about your situation to get the best results. Each prompt includes tips on when and how to use it for maximum impact.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {PROMPT_CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => setActiveCategory(cat.id)} style={{
            padding: "7px 16px", borderRadius: 20, fontSize: 12, cursor: "pointer", fontWeight: 600, border: "none",
            background: activeCategory === cat.id ? cat.color : LIGHT_TAN,
            color: activeCategory === cat.id ? "white" : MOCHA,
          }}>{cat.label}</button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {category?.prompts.map((prompt, i) => (
          <button key={i} onClick={() => setActivePrompt(i)} style={{
            background: "white", border: `1px solid ${LIGHT_TAN}`, borderRadius: 10, padding: "18px 20px",
            textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = AMBER; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = LIGHT_TAN; }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: DARK_MOCHA, marginBottom: 4, fontFamily: "Georgia, serif" }}>{prompt.title}</div>
              <div style={{ fontSize: 12, color: CAMEL }}>{prompt.when}</div>
            </div>
            <div style={{ color: CAMEL, fontSize: 18, marginLeft: 12 }}>→</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function WorkflowTemplates() {
  const [active, setActive] = useState(null);

  if (active !== null) {
    const wf = WORKFLOWS[active];
    return (
      <div>
        <button onClick={() => setActive(null)} style={{ background: "none", border: "none", color: CAMEL, cursor: "pointer", fontSize: 13, marginBottom: 20, padding: 0 }}>← Back to workflows</button>
        <h3 style={{ fontSize: 20, color: DARK_MOCHA, margin: "0 0 4px", fontFamily: "Georgia, serif" }}>{wf.title}</h3>
        <div style={{ fontSize: 12, color: CAMEL, marginBottom: 6 }}>Estimated time: {wf.time}</div>
        <div style={{ width: 32, height: 2, background: AMBER, marginBottom: 24 }} />

        <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
          {[["Numbered Steps", "Steps you complete yourself"], ["'AI'", "Steps where AI helps"]].map(([label, desc]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: MOCHA }}>
              <span>{label}</span><span style={{ color: CAMEL }}>:</span><span>{desc}</span>
            </div>
          ))}
        </div>

        {wf.steps.map((step, i) => (
          <div key={i} style={{ display: "flex", gap: 16, marginBottom: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                background: step.role === "ai" ? AMBER : DARK_MOCHA,
                color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700,
              }}>
                {step.role === "ai" ? "AI" : i + 1}
              </div>
              {i < wf.steps.length - 1 && <div style={{ width: 2, flex: 1, background: LIGHT_TAN, margin: "4px 0" }} />}
            </div>
            <div style={{ flex: 1, paddingBottom: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: DARK_MOCHA, marginBottom: 4 }}>{step.label}</div>
              <p style={{ fontSize: 13, color: MOCHA, margin: 0, lineHeight: 1.7 }}>{step.desc}</p>
              {step.role === "ai" && (
                <div style={{ marginTop: 8, fontSize: 11, color: AMBER, fontWeight: 600 }}>→ Use the matching prompt from the Prompt Library</div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <p style={{ fontSize: 14, color: MOCHA, marginBottom: 24, lineHeight: 1.7 }}>
        These workflows show you exactly where AI fits into a real business task, and where you still need to do the work yourself. Follow the steps in order.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {WORKFLOWS.map((wf, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            background: "white", border: `1px solid ${LIGHT_TAN}`, borderRadius: 10, padding: "20px",
            textAlign: "left", cursor: "pointer",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = AMBER; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = LIGHT_TAN; }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: wf.color }} />
              <div style={{ fontSize: 11, color: CAMEL }}>{wf.time}</div>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: DARK_MOCHA, marginBottom: 4, fontFamily: "Georgia, serif" }}>{wf.title}</div>
            <div style={{ fontSize: 12, color: CAMEL }}>{wf.steps.length} steps · {wf.steps.filter(s => s.role === "ai").length} AI-assisted</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function DecisionGuide() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? DECISION_SCENARIOS : DECISION_SCENARIOS.filter(s => s.verdict === filter);

  const verdictStyle = {
    yes: { bg: "#EFF4E8", color: OLIVE, label: "✓ Good use of AI" },
    no: { bg: "#FDECEA", color: "#C0392B", label: "✗ Don't rely on AI" },
    maybe: { bg: "#FEF3E2", color: AMBER, label: "△ Use with caution" },
  };

  return (
    <div>
      <p style={{ fontSize: 14, color: MOCHA, marginBottom: 20, lineHeight: 1.7 }}>
        Not everything is a good use of AI. Use this guide as a quick reference when you're not sure.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {[["all", "All scenarios"], ["yes", "Good uses"], ["maybe", "Use with caution"], ["no", "Avoid"]].map(([val, label]) => (
          <button key={val} onClick={() => setFilter(val)} style={{
            padding: "7px 14px", borderRadius: 20, fontSize: 12, cursor: "pointer", border: "none",
            background: filter === val ? DARK_MOCHA : LIGHT_TAN,
            color: filter === val ? IVORY : MOCHA, fontWeight: filter === val ? 700 : 400,
          }}>{label}</button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map((item, i) => {
          const style = verdictStyle[item.verdict];
          return (
            <div key={i} style={{ background: "white", borderRadius: 8, padding: "14px 18px", border: `1px solid ${LIGHT_TAN}`, display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ minWidth: 140, padding: "4px 10px", borderRadius: 20, background: style.bg, fontSize: 11, color: style.color, fontWeight: 700, textAlign: "center", flexShrink: 0 }}>{style.label}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: DARK_MOCHA, marginBottom: 4 }}>{item.scenario}</div>
                <div style={{ fontSize: 13, color: MOCHA, lineHeight: 1.6 }}>{item.reason}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function AIStarterKit() {
  const [view, setView] = useState("home");
  const [activeModule, setActiveModule] = useState(null);

  if (view === "module" && activeModule !== null) {
    const module = MODULES[activeModule];
    return (
      <div style={{ minHeight: "100vh", background: IVORY, fontFamily: "sans-serif" }}>
        <div style={{ background: DARK_MOCHA, padding: "14px 24px", display: "flex", alignItems: "center", gap: 16 }}>
          <button onClick={() => setView("home")} style={{ background: "none", border: "none", color: CAMEL, cursor: "pointer", fontSize: 13, padding: 0 }}>← All Modules</button>
          <div style={{ width: 1, height: 16, background: MOCHA }} />
          <div style={{ fontSize: 13, color: IVORY, fontFamily: "Georgia, serif" }}>{module.title}</div>
        </div>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "64px 20px 60px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: LIGHT_TAN, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: MOCHA, fontFamily: "Georgia, serif" }}>
  {String(activeModule + 1).padStart(2, "0")}
</div>
            <h2 style={{ fontSize: 26, color: DARK_MOCHA, margin: 0, fontFamily: "Georgia, serif" }}>{module.title}</h2>
          </div>
          <div style={{ width: 36, height: 2, background: AMBER, marginBottom: 24 }} />
          {activeModule === 0 && <Explainer />}
          {activeModule === 1 && <PromptLibrary />}
          {activeModule === 2 && <WorkflowTemplates />}
          {activeModule === 3 && <DecisionGuide />}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: IVORY, fontFamily: "sans-serif", padding: "40px 20px 60px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.2em", color: CAMEL, textTransform: "uppercase", marginBottom: 8 }}>Groundwork Consult</div>
          <h1 style={{ fontSize: 34, color: DARK_MOCHA, margin: "0 0 12px", fontFamily: "Georgia, serif", fontWeight: 700, lineHeight: 1.2 }}>AI Workflow Starter Kit</h1>
          <div style={{ width: 48, height: 3, background: AMBER, margin: "0 auto 20px" }} />
          <p style={{ fontSize: 15, color: MOCHA, lineHeight: 1.8, maxWidth: 500, margin: "0 auto 8px" }}>
            For small business owners who want to use AI without overwhelm or the wasted time.
          </p>
          <p style={{ fontSize: 13, color: MOCHA, lineHeight: 1.7, maxWidth: 460, margin: "0 auto" }}>
            No technical knowledge required. Just pick a module, follow the steps, and get real results for your business.
          </p>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 36 }}>
          {[["6", "plain-language explainers"], ["13", "ready-to-use prompts"], ["6", "step-by-step workflows"], ["16", "decision scenarios"]].map(([num, desc]) => (
            <div key={desc} style={{ background: "white", borderRadius: 8, padding: "14px", textAlign: "center", border: `1px solid ${LIGHT_TAN}` }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: AMBER, fontFamily: "Georgia, serif" }}>{num}</div>
              <div style={{ fontSize: 11, color: CAMEL, lineHeight: 1.4 }}>{desc}</div>
            </div>
          ))}
        </div>

        {/* Module cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 28 }}>
          {MODULES.map((module, i) => (
            <button key={module.id} onClick={() => { setActiveModule(i); setView("module"); }} style={{
              background: "white", border: `1px solid ${LIGHT_TAN}`, borderRadius: 12, padding: "24px",
              textAlign: "left", cursor: "pointer",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = AMBER; e.currentTarget.style.boxShadow = "0 4px 16px rgba(107,79,58,0.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = LIGHT_TAN; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: LIGHT_TAN, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, fontSize: 13, fontWeight: 700, color: MOCHA, fontFamily: "Georgia, serif" }}>
  {String(i + 1).padStart(2, "0")}
</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: DARK_MOCHA, marginBottom: 6, fontFamily: "Georgia, serif" }}>{module.title}</div>
              <div style={{ fontSize: 13, color: MOCHA, lineHeight: 1.6 }}>{module.desc}</div>
            </button>
          ))}
        </div>

        {/* Where to start */}
        <div style={{ background: DARK_MOCHA, borderRadius: 10, padding: "20px 24px", marginBottom: 20, textAlign: "left" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: IVORY, marginBottom: 12, fontFamily: "Georgia, serif" }}>Not sure where to start?</div>
          {[
            ["New to AI entirely?", "Start with 'What AI Actually Is', then pick one prompt from the library and try it now."],
            ["Already using ChatGPT, Claude, or Gemini randomly?", "Go straight to the 'Prompt Library'. You'll immediately get more useful results."],
            ["Want to build real workflows?", "Start with the 'Workflow Templates'. Pick one that is causing you the most problems right now."],
            ["Not sure if AI is right for your task?", "Check the 'Decision Guide' first."],
          ].map(([who, what]) => (
            <div key={who} style={{ display: "flex", gap: 12, marginBottom: 10 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: AMBER, flexShrink: 0, marginTop: 9 }} />
              <div>
                <span style={{ fontSize: 13, fontWeight: 700, color: IVORY }}>{who}: </span>
                <span style={{ fontSize: 13, color: CAMEL }}>{what}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", fontSize: 12, color: CAMEL }}>
          groundworkconsult.ca · jennifer@groundworkconsult.ca
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";

const MOCHA = "#6B4F3A";
const AMBER = "#7A6A3C";
const CAMEL = "#C19A6B";
const IVORY = "#F5F0E8";
const DARK_MOCHA = "#3D2B1F";
const TEAL = "#5B7B7A";
const OLIVE = "#6B7A3C";
const LIGHT_TAN = "#EDE8E0";

const INDUSTRIES = [
  { id: "universal", label: "Universal", color: MOCHA, icon: "01", desc: "Templates for all industries" },
  { id: "trades", label: "Trades", color: "#8B5E3C", icon: "02", desc: "Roofing, plumbing, electrical, construction" },
  { id: "hospitality", label: "Hospitality", color: TEAL, icon: "03", desc: "Hotels, restaurants, short-term rentals" },
  { id: "property", label: "Property Management", color: OLIVE, icon: "04", desc: "Residential and commercial property" },
  { id: "wellness", label: "Wellness", color: "#7B6F9E", icon: "05", desc: "Clinics, spas, studios, gyms" },
  { id: "nfp", label: "Not-for-Profit", color: TEAL, icon: "06", desc: "Charities, associations, community organizations" }
];

const TEMPLATES = [
  // ─── UNIVERSAL ───────────────────────────────────────────────────────────
  {
    id: "u1", industry: "universal", title: "Employee Onboarding",
    purpose: "Ensure every new team member starts with the same information, tools, and expectations, regardless of who is doing the onboarding.",
    appliesTo: "All new employees and the person responsible for onboarding them.",
    sections: [
      { title: "Before Their First Day", steps: [
        "Send a welcome email confirming start date, start time, dress code, and where to park or enter (and any access codes required to get into parking or the building).",
        "Set up their email account, system access, and any tools they'll need on day one.",
        "Prepare their workspace, uniform, or equipment.",
        "Notify the team of the new hire's name, role, and start date.",
        "Print or send the [EMPLOYEE HANDBOOK/KEY DOCUMENTS] for them to review.",
      ]},
      { title: "Day One", steps: [
        "Welcome them personally. Give them a tour of the space and introduce them to the team.",
        "Review their role, what success looks like in the first 30/60/90 days, and who they report to.",
        "Walk through the tools and systems they'll use. Don't assume they know, even if their past roles have used similar tools. Show them and use this as an opportunity to clarify expecations around that tool (i.e., privacy, sharing information, etc.).",
        "Review key policies: hours, breaks, time-off requests, communication expectations.",
        "Pair them with [BUDDY/MENTOR NAME OR ROLE] for their first week.",
      ]},
      { title: "First Week", steps: [
        "Check in daily. Ask what's unclear, what they need, what's working.",
        "Assign [SPECIFIC STARTER TASKS] so they have something real to work on.",
        "Introduce them to any clients, vendors, or contacts relevant to their role.",
        "Review emergency and safety procedures.",
        "Confirm all system access is working and they're comfortable with tools.",
      ]},
      { title: "30-Day Check-In", steps: [
        "Schedule a one-on-one conversation. Ask: What's going well? What's confusing? What do you need more of?",
        "Review performance against role expectations set on day one.",
        "Clarify anything that has come up about responsibilities or ownership.",
        "Ask if there's anything about the role that was different from what they expected.",
      ]},
    ],
    notes: "The goal of onboarding is not paperwork, it's clarity. A new person who feels set up to succeed will outperform one who was thrown in and left to figure it out. This is your chance to set the tone for their entire experience with your business.",
  },
  {
    id: "u2", industry: "universal", title: "Employee Offboarding",
    purpose: "Protect business continuity and maintain professionalism when a team member leaves, regardless of whether the departure is voluntary or not.",
    appliesTo: "All departing employees and their direct manager.",
    sections: [
      { title: "When Notice Is Given or Decision Is Made", steps: [
        "Confirm their last day in writing.",
        "Identify what this person owns that needs to be handed off. Use your Ownership Map (available in Role Clarity Toolkit).",
        "Assign a handoff partner for each responsibility.",
        "Create a knowledge transfer plan. What information/tasks/roles do they own that will need to be picked up by another team member?",
      ]},
      { title: "Knowledge Transfer (Final Two Weeks)", steps: [
        "Ask the departing employee to document their key processes and recurring tasks.",
        "Walk their replacement or backup through each responsibility in person.",
        "Transfer ownership of any client or vendor relationships, and introduce the new contact.",
        "Confirm all passwords, logins, and account access are documented and transferable.",
        "Export or back up any files, contacts, or data stored in personal accounts or devices.",
      ]},
      { title: "Final Day", steps: [
        "Collect any company property: keys, equipment, uniforms, access cards.",
        "Revoke system access and email on the same day, not a week later.",
        "Forward their email to [DESIGNATED CONTACT] for a minimum of [30/60/90 days].",
        "Process final pay in accordance with Ontario ESA.",
        "Conduct an exit conversation - ask what worked for them, what didn't, and what they'd change. If they're willing to engage in this conversation, it can be a valuable source of feedback for your business.",
      ]},
      { title: "After They Leave", steps: [
        "Notify clients or vendors that the change is now effective and confirm the introduction of their new point of contact.",
        "Update any documentation that references this person's name or role.",
        "Review whether their responsibilities need to be redistributed or if the role needs backfilling.",
      ]},
    ],
    notes: "A poor offboarding process has the potential to lose institutional knowledge, damage client relationships, and create security risks. This is one of the most skipped (and most costly) processes in small business.",
  },
  {
    id: "u3", industry: "universal", title: "Client Intake & Communication",
    purpose: "Ensure every new client or customer receives a consistent, professional first experience, and that accurate information is captured from the start.",
    appliesTo: "Anyone who handles first contact with new clients.",
    sections: [
      { title: "First Contact (Phone, Email, or Walk-In)", steps: [
        "Respond within [TARGET RESPONSE TIME - e.g. same business day, within 2 hours].",
        "If known, greet them by name. Introduce yourself and [BUSINESS NAME].",
        "Ask: What brought you to us? What are you looking for? What's your timeline?",
        "Listen first. Don't pitch before you understand what they need!",
        "Confirm their preferred contact method and best time to reach them.",
      ]},
      { title: "Capturing the Information", steps: [
        "Enter their details into [CRM/BOOKING SYSTEM/SPREADSHEET] immediately.",
        "Record: name, contact info, what they need, timeline, how they found you, and any notes you think will be important to the relationship.",
        "Assign them a lead status: [e.g. Ready/Follow Up/Not Ready].",
        "If a follow-up is needed, schedule it before ending the conversation.",
      ]},
      { title: "Sending a Quote or Proposal", steps: [
        "Send within [TARGET TIMEFRAME - e.g. 24-48 hours of first contact].",
        "Include: scope of work, price, timeline, what's included, and what's not.",
        "Use the standard [QUOTE TEMPLATE]. Don't create a new one from scratch each time. Integrate custom fields when possible to personalize your offer.",
        "Follow up if no response within [3-5 business days].",
      ]},
      { title: "When They Say Yes", steps: [
        "Confirm the booking or agreement in writing.",
        "Send the Service Agreement/Contract and any relevant documents for signature.",
        "Collect the deposit or first payment per your payment terms.",
        "Add them to the schedule and confirm next steps with them.",
        "Welcome them properly: A simple message that sets the tone for the relationship.",
      ]},
    ],
    notes: "The intake process is the client's first real experience of how you operate. Inconsistency during intake signals disorganization throughout. Every client should feel like they're your priority, regardless of who said the first hello.",
  },
  {
    id: "u4", industry: "universal", title: "Complaint Handling",
    purpose: "Resolve client or customer complaints consistently, professionally, and in a way that protects the relationship wherever possible.",
    appliesTo: "All client-facing team members.",
    sections: [
      { title: "Receiving the Complaint", steps: [
        "Listen without interrupting. Let them finish before responding.",
        "Acknowledge what they've said: 'I hear you, and I'm sorry this happened.'",
        "Do not get defensive. Do not blame another team member.",
        "If you can't resolve it on the spot, tell them what happens next and when they'll hear back.",
        "Record the complaint: who, what, when, and the outcome they're looking for.",
      ]},
      { title: "Escalation (If Needed)", steps: [
        "If the complaint is beyond your authority to resolve, escalate to [MANAGER/OWNER] within [TIMEFRAME].",
        "Brief the escalation owner with the full details before they contact the client.",
        "The client should never have to repeat their complaint to someone new.",
      ]},
      { title: "Resolution", steps: [
        "Offer a resolution that is fair to them and to the business.",
        "Options available to front-line staff without manager approval: [LIST APPROVED RESOLUTIONS - e.g., 10% discount, free complementary service].",
        "Confirm the resolution with the client in writing.",
        "Follow up within [48-72 hours] to confirm they're satisfied.",
      ]},
      { title: "Internal Review", steps: [
        "Log the complaint in [TRACKING SYSTEM].",
        "Identify: was this a one-time issue or a symptom of a process gap?",
        "If it reveals a recurring problem, flag it for process review.",
        "Share the outcome with the team, not to blame, but to prevent it from happening again.",
      ]},
    ],
    notes: "A complaint handled well is often more powerful than a perfect experience. Clients remember how you responded when things went wrong.",
  },
  {
    id: "u5", industry: "universal", title: "Invoicing & Payment Follow-Up",
    purpose: "Ensure every job or service is billed correctly and on time, and that outstanding payments are followed up systematically.",
    appliesTo: "Whoever is responsible for billing and accounts receivable.",
    sections: [
      { title: "Creating and Sending the Invoice", steps: [
        "Create the invoice in [ACCOUNTING SOFTWARE/SYSTEM] within [TIMEFRAME - e.g. same day as job completion].",
        "Confirm the amount matches the approved quote or agreement.",
        "Include: invoice number, date, due date, itemized services, HST if applicable, and payment instructions.",
        "Send to the correct contact (confirm the billing email at intake, not at invoice time).",
        "Mark the invoice as sent in [SYSTEM].",
      ]},
      { title: "Payment Follow-Up", steps: [
        "If unpaid by due date: send a polite reminder on [Day 1 overdue].",
        "If still unpaid at [Day 7]: send a second reminder, reference the invoice number and original due date.",
        "If still unpaid at [Day 14]: escalate to [OWNER/MANAGER] for direct contact.",
        "If still unpaid at [Day 30]: begin formal collections process per your terms.",
        "Document every follow-up attempt with date, method and any notes (i.e., voicemail left).",
      ]},
      { title: "When Payment Is Received", steps: [
        "Record the payment in [SYSTEM] immediately.",
        "Match it to the correct invoice. Do not leave it unallocated.",
        "Send a receipt as per your process.",
        "Mark the job as fully closed in any project tracking system.",
      ]},
    ],
    notes: "Cash flow problems are almost always process problems. The invoice that isn't sent, the follow-up that didn't happen can quickly turn into money the business earned but never collected.",
  },
  {
    id: "u6", industry: "universal", title: "Shift Handoff",
    purpose: "Ensure that nothing falls through the cracks when one person's shift ends and another begins.",
    appliesTo: "All staff working in shift-based or relay-style operations.",
    sections: [
      { title: "Before Your Shift Ends", steps: [
        "Complete any tasks that cannot wait for the next shift. If they can't be completed, flag them.",
        "Update [HANDOFF LOG/SYSTEM] with: pending tasks, open issues, client follow-ups needed, and anything unusual that happened.",
        "Do not leave a task half-done without a clear note on where it stands.",
        "Restock or replenish anything that's running low - don't leave that for the next person.",
        "Brief the incoming person verbally if overlap time allows.",
      ]},
      { title: "At the Start of Your Shift", steps: [
        "Read the handoff log before you do anything else.",
        "Acknowledge any flagged issues and confirm you understand what action is needed.",
        "Check in on any open client or customer situations from the previous shift.",
        "Do not assume the previous shift handled something - confirm it before you move on.",
      ]},
      { title: "What to Log Every Shift", steps: [
        "Any client interaction that may need follow-up.",
        "Any equipment, system, or supply issue.",
        "Any incident or complaint, regardless of how minor.",
        "Any task that was started but not finished.",
        "Any communication that came in and hasn't been actioned.",
      ]},
    ],
    notes: "The handoff log is your memory between shifts. If it's not written down, it didn't happen.",
  },
  {
    id: "u7", industry: "universal", title: "Emergency & Incident Response",
    purpose: "Ensure that every team member knows what to do in an emergency - and that incidents are documented and reviewed.",
    appliesTo: "All team members.",
    sections: [
      { title: "Immediate Response (Any Emergency)", steps: [
        "Ensure the safety of everyone on site first. Call 911 if there is any risk to life.",
        "Do not attempt to handle a medical, fire, or safety emergency without trained support.",
        "Notify [OWNER/MANAGER] immediately - even if it seems minor.",
        "Do not speak to media or post on social media about any incident.",
        "Preserve the scene if there may be an insurance or legal claim.",
      ]},
      { title: "Documenting the Incident", steps: [
        "Complete an Incident Report within [24 hours] of the event.",
        "Include: date, time, location, who was involved, what happened, any witnesses, and what action was taken.",
        "Photographs should be taken if relevant and safe to do so.",
        "File the report in [LOCATION/SYSTEM].",
      ]},
      { title: "After the Incident", steps: [
        "Review what happened and whether there was a process gap that allowed it.",
        "Update any relevant SOPs if the process needs to change.",
        "Notify your insurance provider if there is any potential for a claim.",
        "Follow up with anyone affected - client, employee, or vendor.",
      ]},
      { title: "Key Emergency Contacts", steps: [
        "Emergency Services: 911",
        "Building/Property Manager: [NAME + NUMBER]",
        "Insurance Provider: [NAME + POLICY NUMBER + NUMBER]",
        "Owner/Manager after hours: [NAME + NUMBER]",
        "Poison Control (if applicable): 1-800-268-9017 (Ontario)",
      ]},
    ],
    notes: "Every team member should know where this document is before they need it - not while they're looking for it.",
  },

  // ─── TRADES ──────────────────────────────────────────────────────────────
  {
    id: "t1", industry: "trades", title: "Job Site Safety Checklist",
    purpose: "Ensure every job site meets safety standards before work begins and throughout the job.",
    appliesTo: "Site foreman and all crew members before starting any job.",
    sections: [
      { title: "Before Work Begins", steps: [
        "Confirm all crew members have the required PPE for this job type: [LIST REQUIRED PPE].",
        "Identify site hazards: utilities, overhead lines, unstable surfaces, confined spaces.",
        "Call Ontario One Call (1-800-400-2255) if any digging is required.",
        "Confirm permits are in place if required for this job type.",
        "Brief the crew on the specific hazards for this site before work begins.",
        "Confirm first aid kit and fire extinguisher are on site.",
        "Identify the nearest hospital or walk-in clinic: [ADDRESS].",
      ]},
      { title: "During the Job", steps: [
        "Conduct a brief safety check at each new phase of work.",
        "Ensure the work area is secured from public access.",
        "Check that equipment is being used correctly and safely.",
        "If conditions change (weather, unexpected hazards), stop and reassess.",
      ]},
      { title: "End of Day", steps: [
        "Secure all tools and equipment.",
        "Ensure site is safe for overnight - no open trenches, loose materials, or hazards accessible to public.",
        "Log any near-misses or incidents, no matter how minor.",
        "Confirm site is locked or barricaded as required.",
      ]},
    ],
    notes: "WSIB requires that safety incidents be reported within three (3) business days. Every incident, including near-misses, must be logged. Use this information to inform future safety planning and training.",
  },
  {
    id: "t2", industry: "trades", title: "Quote to Job Conversion",
    purpose: "Move a quote to a confirmed, scheduled job without losing details, timeline, or client expectations along the way.",
    appliesTo: "Whoever handles estimating and job scheduling.",
    sections: [
      { title: "When the Client Accepts the Quote", steps: [
        "Confirm acceptance in writing - email or signed quote.",
        "Collect deposit per your payment terms: [DEPOSIT AMOUNT OR %].",
        "Create the job in [SCHEDULING/JOB MANAGEMENT SYSTEM].",
        "Confirm start date and timeline with the client.",
        "Order or confirm availability of materials needed.",
      ]},
      { title: "Preparing for the Job", steps: [
        "Assign crew and foreman to the job.",
        "Confirm all materials are ordered and delivery date aligns with job start.",
        "Send the crew a job brief: address, scope, timeline, client contact, special notes.",
        "Confirm permits are in place if required.",
        "Verify client has done anything they're responsible for (e.g., cleared the area).",
      ]},
      { title: "Job Completion", steps: [
        "Walk through completed work with the client. Get verbal or written sign-off.",
        "Take before and after photos - store in job file.",
        "Confirm any warranty terms with the client.",
        "Send final invoice within [TIMEFRAME].",
        "Close the job in [SYSTEM] and file all documentation.",
      ]},
    ],
    notes: "The gap between 'accepted quote' and 'started job' is where details get lost. Treat every accepted quote like an active project from the moment the deposit clears.",
  },
  {
    id: "t3", industry: "trades", title: "Materials Ordering & Inventory",
    purpose: "Ensure materials are ordered on time, received correctly, and tracked so nothing is wasted or missing when a job starts.",
    appliesTo: "Foreman, estimator, or whoever manages materials.",
    sections: [
      { title: "Ordering Materials", steps: [
        "Generate a materials list from the job scope before placing any order.",
        "Check existing inventory before ordering - don't duplicate what you have.",
        "Use the preferred supplier list: [SUPPLIER NAME + CONTACT + ACCOUNT NUMBER].",
        "Confirm delivery date before the order is placed - align with job schedule.",
        "Record the order in [SYSTEM]: date ordered, supplier, items, expected delivery, job it's for.",
      ]},
      { title: "Receiving Delivery", steps: [
        "Count and inspect all items against the packing slip before the driver leaves.",
        "Note any shortages, damage, or substitutions immediately.",
        "Contact supplier same day for any discrepancies.",
        "Store materials in [DESIGNATED LOCATION] and label with the job name.",
        "Update inventory records.",
      ]},
      { title: "Leftover Materials", steps: [
        "At job close-out, return unused materials to inventory - don't leave them on site.",
        "Log what's returned and where it's stored.",
        "Flag any materials that are nearing end of shelf life.",
      ]},
    ],
    notes: "Running out of materials mid-job costs more than the material itself. Build in a buffer on every order and always confirm delivery before you confirm a job start date.",
  },
  {
    id: "t4", industry: "trades", title: "Subcontractor Management",
    purpose: "Ensure subcontractors are qualified, properly contracted, and managed through the job without creating liability or quality issues.",
    appliesTo: "Owner or project manager responsible for hiring and managing subs.",
    sections: [
      { title: "Before Hiring a Subcontractor", steps: [
        "Confirm they hold current liability insurance - get a Certificate of Insurance naming [YOUR BUSINESS NAME].",
        "Confirm WSIB clearance certificate is current.",
        "Check references if they're a new sub - minimum two jobs.",
        "Agree on scope, price, and timeline in writing before any work begins.",
        "Confirm they understand and will comply with your site safety requirements.",
      ]},
      { title: "During the Job", steps: [
        "Brief them on the full job scope, schedule, and your expectations for communication.",
        "Confirm they know who to report to on site.",
        "Check their work at key milestones - don't wait until the end.",
        "Any scope changes must be approved in writing before additional work proceeds.",
      ]},
      { title: "Payment and Close-Out", steps: [
        "Hold [HOLDBACK % - standard is 10%] until the work is inspected and approved.",
        "Confirm their work meets standard before releasing final payment.",
        "Get a statutory declaration or lien waiver before issuing final payment on significant jobs.",
        "File their documents (insurance, WSIB, contract) in their vendor file.",
      ]},
    ],
    notes: "If a subcontractor isn't insured and someone gets hurt, you can be held liable. Never let a sub on site without a current COI. Not once, not as a favour.",
  },
  {
    id: "t5", industry: "trades", title: "Job Completion & Sign-Off",
    purpose: "Close every job cleanly - with the client's confirmation, proper documentation, and a clear path to invoice.",
    appliesTo: "Foreman and client-facing staff.",
    sections: [
      { title: "Before You Leave the Site", steps: [
        "Conduct a final walkthrough with the client or their representative.",
        "Address any deficiencies on the spot where possible.",
        "Confirm the client is satisfied before packing up.",
        "Clean up the site - remove all materials, debris, and equipment.",
        "Take completion photos and store in the job file.",
      ]},
      { title: "Client Sign-Off", steps: [
        "Get written sign-off via [PAPER FORM/DIGITAL SIGNATURE/EMAIL CONFIRMATION].",
        "Provide any relevant documentation: warranty information, maintenance instructions, permit sign-offs.",
        "Confirm any follow-up visits or outstanding work if the job wasn't 100% completed.",
      ]},
      { title: "Internal Close-Out", steps: [
        "Submit completion notice to the office same day.",
        "Confirm final invoice can be sent.",
        "Return unused materials to inventory.",
        "File all job documentation: photos, sign-off, any change orders.",
        "Note any issues for future reference on this client or site.",
      ]},
    ],
    notes: "A job isn't done until the paperwork is done. A signed completion form protects you if a client comes back three months later saying the work wasn't done right.",
  },
  {
    id: "t6", industry: "trades", title: "Warranty & Callback Handling",
    purpose: "Handle warranty calls and callbacks professionally, document the issue, and resolve it in a way that protects your reputation.",
    appliesTo: "Anyone who receives or manages service calls.",
    sections: [
      { title: "Receiving a Warranty or Callback Request", steps: [
        "Log the request immediately: client name, job address, original job date, nature of the complaint.",
        "Pull the original job file and review what was done.",
        "Respond to the client within [TARGET: same business day].",
        "Do not dismiss or minimize their concern before someone has assessed it.",
      ]},
      { title: "Assessment and Resolution", steps: [
        "Send the original crew or foreman where possible - they know the job.",
        "Assess: is this a warranty issue (your responsibility) or a new issue (billable)?",
        "Be honest with the client about what you find.",
        "Resolve within [TARGET TIMEFRAME based on severity].",
        "Document what was found and what was done to fix it.",
      ]},
      { title: "After the Callback", steps: [
        "Update the job file with the callback details and resolution.",
        "Review whether this reveals a quality or process issue that needs to be addressed.",
        "If a pattern emerges (same type of callback repeatedly), bring it to the team.",
        "Follow up with the client to confirm they're satisfied.",
      ]},
    ],
    notes: "How you handle a callback determines whether that client calls you again - or tells everyone they know not to. Slow, defensive, or dismissive responses destroy reputation in small markets.",
  },
  {
    id: "t7", industry: "trades", title: "Vehicle & Equipment Maintenance",
    purpose: "Ensure all company vehicles and equipment are maintained, documented, and safe for use.",
    appliesTo: "All operators and the person responsible for fleet/equipment management.",
    sections: [
      { title: "Daily Vehicle Check (Before Use)", steps: [
        "Check fluid levels: oil, coolant, washer fluid.",
        "Check tire pressure and condition.",
        "Confirm lights, indicators, and brakes are functioning.",
        "Check load security if transporting materials or equipment.",
        "Report any issues before operating - not after.",
      ]},
      { title: "Scheduled Maintenance", steps: [
        "Maintain a service log for every vehicle and piece of equipment: [LOCATION OF LOG].",
        "Schedule oil changes at [INTERVAL] and track in the log.",
        "Complete annual safety inspection per MVIS requirements.",
        "Confirm insurance and registration are current and stored in the vehicle.",
        "Tag equipment that is out of service - do not allow it to be used until repaired.",
      ]},
      { title: "Reporting Issues", steps: [
        "Any operator who identifies an issue must report it to [OWNER/MANAGER] same day.",
        "Complete a [VEHICLE ISSUE FORM] and attach it to the vehicle key if taking it out of service.",
        "Do not operate a vehicle or piece of equipment with a known safety issue.",
      ]},
    ],
    notes: "An unlogged vehicle defect that causes an accident is a liability that could have been prevented. The 30 seconds it takes to log an issue can save thousands.",
  },

  // ─── HOSPITALITY ─────────────────────────────────────────────────────────
  {
    id: "h1", industry: "hospitality", title: "Guest Check-In",
    purpose: "Create a consistent, welcoming check-in experience for every guest regardless of who is on shift.",
    appliesTo: "All front-of-house staff.",
    sections: [
      { title: "Before the Guest Arrives", steps: [
        "Review arrivals for the day at the start of each shift.",
        "Confirm the room or space is ready - cleaned, stocked, and inspected.",
        "Note any special requests, preferences, or flags on the reservation.",
        "Ensure the check-in area is clean, stocked, and staffed appropriately.",
      ]},
      { title: "At Check-In", steps: [
        "Greet the guest by name if possible: 'Welcome, [NAME], we've been expecting you.'",
        "Confirm the reservation details: dates, room type, any extras.",
        "Collect ID and payment as per your policy.",
        "Explain key information: WiFi, checkout time, amenities, parking, local recommendations.",
        "Ask if they have any questions before showing them to their space.",
        "Deliver or explain how to access keys/access codes.",
      ]},
      { title: "Logging the Check-In", steps: [
        "Update the reservation system to 'Checked In' immediately.",
        "Note any special circumstances, requests, or concerns.",
        "Flag any payment issues for follow-up.",
      ]},
    ],
    notes: "First impressions set the tone for the entire stay. A guest who feels expected and welcomed will be more forgiving if something goes wrong later.",
  },
  {
    id: "h2", industry: "hospitality", title: "Room or Space Turnover",
    purpose: "Ensure every room or rental space is cleaned, inspected, and ready to the same standard after every guest - every time.",
    appliesTo: "Housekeeping staff and their supervisor.",
    sections: [
      { title: "The Turnover Checklist - Every Room, Every Time", steps: [
        "Strip all linens and towels. Check for damage before placing in laundry.",
        "Remove all guest items - check drawers, closets, under beds, bathroom shelves.",
        "Wipe all surfaces: counters, tables, windowsills, TV remotes, light switches, door handles.",
        "Clean bathroom thoroughly: toilet, sink, shower/bath, mirrors, floor.",
        "Vacuum or mop all floors, including under furniture.",
        "Restock: towels, toiletries, coffee/tea, hangers, information guides.",
        "Check all appliances and fixtures are functioning.",
        "Complete a final visual scan before signing off.",
      ]},
      { title: "Inspection Sign-Off", steps: [
        "A second person (or supervisor) should inspect the room before it's marked ready.",
        "Mark the room as 'Ready' in [PROPERTY MANAGEMENT SYSTEM] only after inspection.",
        "Note any maintenance issues for follow-up: [MAINTENANCE LOG LOCATION].",
      ]},
      { title: "Maintenance Flags", steps: [
        "Log any damage with photos immediately after the guest departs.",
        "Assess whether damage is wear-and-tear or chargeable damage.",
        "Follow your damage policy for chargeable damage: [POLICY REFERENCE].",
      ]},
    ],
    notes: "One missed turnover standard creates a guest complaint that undoes everything else you got right. The checklist isn't optional - it's the standard.",
  },
  {
    id: "h3", industry: "hospitality", title: "Reservation & Booking Management",
    purpose: "Ensure bookings are captured accurately, confirmed promptly, and tracked without double-bookings or missed details.",
    appliesTo: "Anyone handling reservations.",
    sections: [
      { title: "Receiving a Booking", steps: [
        "Enter all bookings into [BOOKING SYSTEM] immediately - not at end of shift.",
        "Confirm: name, contact, dates, number of guests, room/table/space, any special requests.",
        "Send a booking confirmation to the guest within [TARGET: same day].",
        "Check for conflicts with any existing bookings before confirming.",
      ]},
      { title: "Pre-Arrival Follow-Up", steps: [
        "Send a pre-arrival message [X DAYS BEFORE]: confirm details, share check-in instructions, offer to arrange extras.",
        "Confirm any special requests are actioned - dietary needs, early check-in, accessibility.",
        "Flag any VIP guests or repeat clients to the team.",
      ]},
      { title: "Cancellations & Modifications", steps: [
        "Apply your cancellation policy consistently - no exceptions without manager approval.",
        "Update the system immediately when a booking changes or cancels.",
        "Initiate any refunds per your terms within [TIMEFRAME].",
        "Log the cancellation reason if the guest provides one.",
      ]},
    ],
    notes: "A booking that isn't immediately in the system is a double-booking waiting to happen. If it's not in the system, it doesn't exist.",
  },
  {
    id: "h4", industry: "hospitality", title: "Supplier & Delivery Receiving",
    purpose: "Ensure all incoming deliveries are received correctly, stored properly, and discrepancies are caught and resolved immediately.",
    appliesTo: "Staff responsible for receiving deliveries.",
    sections: [
      { title: "Receiving the Delivery", steps: [
        "Be present for the delivery - don't sign off without checking.",
        "Count and inspect all items against the delivery invoice.",
        "Check expiry dates on all perishable items.",
        "Note any shortages, substitutions, or damaged items before the driver leaves.",
        "Do not accept items that are clearly damaged, expired, or incorrect.",
      ]},
      { title: "Storage", steps: [
        "Store items immediately - do not leave perishables out.",
        "Follow FIFO (First In, First Out): new stock goes behind existing stock.",
        "Label any unlabelled items with the date received.",
        "Update inventory records same day.",
      ]},
      { title: "Discrepancies", steps: [
        "Contact the supplier on the day of delivery for any issues.",
        "Document the discrepancy: what was ordered, what was received, what was missing or wrong.",
        "Keep the delivery invoice until the issue is resolved.",
        "Escalate to [MANAGER] if the supplier doesn't respond within [24 hours].",
      ]},
    ],
    notes: "Accepting a short delivery without logging it means your inventory is wrong before you even open for service. Never sign a delivery slip you haven't verified.",
  },
  {
    id: "h5", industry: "hospitality", title: "Review Response Process",
    purpose: "Respond to online reviews consistently and professionally to protect your reputation and show prospective guests you care.",
    appliesTo: "Owner or designated staff member managing online presence.",
    sections: [
      { title: "Monitoring Reviews", steps: [
        "Check [Google/TripAdvisor/Airbnb/Booking.com] reviews [FREQUENCY - e.g. daily, every two days].",
        "Set up notifications if the platform supports them.",
        "Log all reviews - positive and negative - in [TRACKING SHEET/SYSTEM].",
      ]},
      { title: "Responding to Positive Reviews", steps: [
        "Respond within [TARGET: 48-72 hours].",
        "Thank them by name if it's available.",
        "Reference something specific from their review - show you actually read it.",
        "Keep it warm and genuine - not a copy-paste template.",
        "Invite them back.",
      ]},
      { title: "Responding to Negative Reviews", steps: [
        "Do not respond while emotional. Wait, then respond.",
        "Thank them for their feedback.",
        "Acknowledge their experience without being defensive.",
        "Do not argue facts publicly - offer to continue the conversation privately.",
        "Provide a contact: [EMAIL OR PHONE] for direct follow-up.",
        "If the complaint is valid, say what you're changing. Mean it.",
      ]},
    ],
    notes: "Your response to a bad review is often more visible than the review itself. Future guests are watching how you handle it.",
  },
  {
    id: "h6", industry: "hospitality", title: "Food Safety & Allergen Protocol",
    purpose: "Ensure food is handled, stored, and served safely - and that allergen information is communicated accurately every time.",
    appliesTo: "All kitchen and food-handling staff.",
    sections: [
      { title: "Allergen Communication", steps: [
        "Every menu item must have documented allergen information: [ALLERGEN MATRIX LOCATION].",
        "When a guest flags an allergy: repeat it back, confirm it with the kitchen, and flag the order clearly.",
        "If you are not certain an item is safe for a specific allergy, say so. Do not guess.",
        "Cross-contamination risk must be communicated honestly.",
        "Major allergens to always flag: peanuts, tree nuts, gluten, dairy, eggs, shellfish, soy, sesame.",
      ]},
      { title: "Food Storage", steps: [
        "All food is stored at correct temperatures: fridge [below 4°C], freezer [below -18°C].",
        "Raw meats stored below ready-to-eat items - always.",
        "All items labelled with date opened or prepared.",
        "Check temperatures [FREQUENCY] and log them.",
      ]},
      { title: "Food Handling", steps: [
        "Handwashing before handling food - every time, not sometimes.",
        "Separate cutting boards for meat, produce, and allergen-sensitive items.",
        "Any staff with illness symptoms involving vomiting or diarrhea must not handle food.",
        "Temperature check cooked items before serving: minimum internal temperatures as per [ONTARIO FOOD PREMISES REGULATION].",
      ]},
    ],
    notes: "An allergen error can kill someone. This is the one SOP in your business where 'close enough' is never acceptable.",
  },
  {
    id: "h7", industry: "hospitality", title: "Seasonal Staffing Ramp-Up",
    purpose: "Prepare the team and the operation for peak season without the chaos of last-minute hiring and undertrained staff.",
    appliesTo: "Owner or manager responsible for staffing.",
    sections: [
      { title: "Planning (6-8 Weeks Before Peak Season)", steps: [
        "Review last season: what was understaffed, what was overstaffed, what went wrong?",
        "Forecast staffing needs by role for the season.",
        "Confirm which returning staff are available.",
        "Post open positions immediately - don't wait until you're desperate.",
      ]},
      { title: "Hiring", steps: [
        "Use the Job Description SOP for every role being filled.",
        "Prioritize returning staff who performed well - they cost less to onboard.",
        "Complete all onboarding before the first shift - not on the first shift.",
        "Confirm scheduling availability and any conflicts before confirming a hire.",
      ]},
      { title: "Pre-Season Training", steps: [
        "Run a team briefing before season opens: expectations, standards, schedule, and any changes from last year.",
        "Walk new staff through the space, systems, and emergency procedures.",
        "Pair new hires with experienced staff for the first [X SHIFTS].",
        "Confirm all certifications are current: food handler, Smart Serve, First Aid if required.",
      ]},
    ],
    notes: "The chaos of peak season is often a hiring timeline problem. If you're posting jobs two weeks before you need people, you've already lost.",
  },
  {
    id: "h8", industry: "hospitality", title: "Guest Check-Out",
    purpose: "Close every guest stay cleanly, professionally, and in a way that encourages return visits and referrals.",
    appliesTo: "Front-of-house staff.",
    sections: [
      { title: "The Day Before Check-Out", steps: [
        "Confirm check-out time with the guest - especially if you have back-to-back bookings.",
        "Prepare the final invoice for review if they'll be settling a bill.",
        "Flag any outstanding charges or issues to the manager before check-out morning.",
      ]},
      { title: "At Check-Out", steps: [
        "Thank them for staying. Use their name.",
        "Ask how their stay was - listen genuinely.",
        "Process final payment and provide a receipt.",
        "Collect keys or access devices.",
        "Mention where they can leave a review if they're comfortable: [PLATFORM].",
        "Invite them back - a specific season, event, or reason to return.",
      ]},
      { title: "After They Leave", steps: [
        "Inspect the room or space immediately.",
        "Log any damage before the next booking.",
        "Send a thank-you message or follow-up within [24-48 hours] if it fits your brand.",
        "Update the system to 'Checked Out' and trigger the turnover process.",
      ]},
    ],
    notes: "The check-out is your last impression. Guests who leave feeling genuinely thanked are the ones who come back - and bring someone with them.",
  },

  // ─── PROPERTY MANAGEMENT ─────────────────────────────────────────────────
  {
    id: "p1", industry: "property", title: "Tenant Screening & Application",
    purpose: "Evaluate rental applications consistently, fairly, and in compliance with the Ontario Human Rights Code.",
    appliesTo: "Anyone responsible for tenant selection.",
    sections: [
      { title: "Advertising the Unit", steps: [
        "List the unit with accurate information: rent, size, included utilities, availability date, and any restrictions.",
        "Do not include criteria that violate the Ontario Human Rights Code. For example, do not state 'no ODSP/OW' or 'no families with children'. Review OHRC's protected ground here: https://www.ohrc.on.ca/en/students-handouts/fact-sheet-1-ontario-human-rights-code",
        "Use the same application form for every applicant.",
      ]},
      { title: "Reviewing Applications", steps: [
        "Review all applications using the same criteria and apply them consistently.",
        "Acceptable criteria: income verification, credit check (with written consent), rental history, references.",
        "Do not ask about: family status, source of income (including ODSP/OW), religion, race, or any other protected ground.",
        "Request credit check consent in writing before running it.",
        "Contact references and previous landlords - don't skip this step.",
      ]},
      { title: "Decision", steps: [
        "Document your decision criteria for every application - whether accepted or declined.",
        "Notify the applicant of your decision within [TIMEFRAME].",
        "If declining, you are not required to state the reason, but your criteria must have been applied consistently.",
        "Retain all application documents for [MINIMUM 1 YEAR].",
      ]},
    ],
    notes: "Ontario's Residential Tenancies Act and Human Rights Code create real legal exposure if tenant screening is inconsistent or discriminatory. When in doubt, consult a legal resource before deciding.",
  },
  {
    id: "p2", industry: "property", title: "Lease Signing & Move-In",
    purpose: "Complete the lease process correctly and ensure the tenant moves in with accurate expectations and a documented unit condition.",
    appliesTo: "Property manager or owner.",
    sections: [
      { title: "Before Signing", steps: [
        "Use the Ontario Standard Lease - it is required for most residential tenancies in Ontario.",
        "Complete all fields accurately. Do not leave blanks.",
        "Walk the tenant through the lease before signing. Answer questions honestly.",
        "Collect first and last month's rent - this is the maximum permitted deposit under the RTA.",
        "Do not collect a security deposit - this is not permitted in Ontario.",
      ]},
      { title: "Move-In Inspection", steps: [
        "Complete a move-in inspection with the tenant present.",
        "Document the condition of every room, appliance, and fixture - photos and written notes.",
        "Both parties sign the inspection report.",
        "Give the tenant a copy immediately.",
        "Store the original in the tenant file.",
      ]},
      { title: "Keys and Access", steps: [
        "Provide all keys, fobs, and access codes on or before the first day of the lease.",
        "Document what was provided: quantity and type of keys.",
        "Confirm the tenant has emergency contact information for after-hours issues.",
      ]},
    ],
    notes: "The move-in inspection is your single most important document if a damage dispute arises at move-out. If it isn't documented, the tenant's position is stronger.",
  },
  {
    id: "p3", industry: "property", title: "Maintenance Request Handling",
    purpose: "Ensure maintenance requests are received, prioritized, actioned, and closed consistently - and that tenants are kept informed.",
    appliesTo: "Property manager and maintenance coordinator.",
    sections: [
      { title: "Receiving the Request", steps: [
        "Log the request immediately in [MAINTENANCE TRACKING SYSTEM]: tenant name, unit, nature of issue, date received.",
        "Assess urgency: Emergency (same day), Urgent (within 48 hours), Routine (within [X] days).",
        "Confirm receipt to the tenant within [TARGET: same business day].",
      ]},
      { title: "Emergency Definition", steps: [
        "No heat in winter.",
        "No hot water.",
        "Significant water leak or flooding.",
        "No working locks on entry doors.",
        "Any issue posing an immediate safety risk.",
        "Emergency requests must be actioned same day - this is not optional.",
      ]},
      { title: "Actioning the Request", steps: [
        "Assign to [IN-HOUSE MAINTENANCE/PREFERRED VENDOR].",
        "Provide 24 hours notice to tenant before entry (except emergencies).",
        "Confirm completion with the tenant after the work is done.",
        "Update the maintenance log with: work done, date completed, cost, who did it.",
        "Close the request in the system.",
      ]},
    ],
    notes: "Ignoring maintenance requests is one of the most common reasons tenants escalate to the Landlord and Tenant Board. Response time is both a legal obligation and a relationship issue.",
  },
  {
    id: "p4", industry: "property", title: "Rent Collection & Arrears",
    purpose: "Collect rent on time, track accurately, and manage arrears in a consistent and legally compliant way.",
    appliesTo: "Property manager or owner.",
    sections: [
      { title: "Standard Rent Collection", steps: [
        "Rent is due on the [1st/agreed date] of each month.",
        "Accepted payment methods: [LIST YOUR ACCEPTED METHODS].",
        "Record each payment immediately in [ACCOUNTING SYSTEM]: amount, date, unit, method.",
        "Issue a receipt if requested or if your process includes it.",
      ]},
      { title: "When Rent Is Late", steps: [
        "Contact the tenant on [Day 1 of late payment] with a simple, non-confrontational check-in (text, email depending on the relationship, in writing is preferred).",
        "If no response or payment by [Day 3]: Send written notice of outstanding balance.",
        "If still unpaid by [Day 7]: Serve an N4 Notice to End Tenancy for Non-Payment of Rent.",
        "Document every step and date taken.",
        "Do not accept partial payment if you intend to serve an N4. Consult LTB guidance first.",
      ]},
      { title: "Filing with the LTB (If Required)", steps: [
        "If the tenant does not pay or vacate after the N4 notice period, file an L1 Application with the LTB.",
        "Follow LTB timelines and requirements exactly. Errors restart the process.",
        "Attend the hearing with full documentation: lease, payment records, all notices served.",
        "Consult a paralegal or lawyer for any LTB proceeding if you haven't been through it before.",
      ]},
    ],
    notes: "Ontario's tenant protection legislation is real and the LTB process takes time. The best strategy is consistent, documented communication before it reaches the formal stage.",
  },
  {
    id: "p5", industry: "property", title: "Move-Out Inspection & Deposit Return",
    purpose: "Complete the move-out process fairly, with clear documentation of unit condition to support any deductions from last month's rent.",
    appliesTo: "Property manager or owner.",
    sections: [
      { title: "Before Move-Out", steps: [
        "Send a move-out checklist to the tenant six (6) weeks before their last day: cleaning expectations, key return, etc.",
        "Schedule the move-out inspection for the last day or day after.",
        "Pull the original move-in inspection report.",
      ]},
      { title: "Move-Out Inspection", steps: [
        "Conduct the inspection with the tenant present if possible.",
        "Compare condition against the move-in report, and document every difference with photos.",
        "Note: normal wear and tear cannot be charged to the tenant under the RTA.",
        "Both parties sign the inspection report.",
        "Provide the tenant with a copy immediately.",
      ]},
      { title: "Last Month's Rent", steps: [
        "In Ontario, last month's rent can only be applied to the last month of tenancy (not damages).",
        "If there are chargeable damages beyond normal wear and tear, you must pursue them through the LTB. Be aware that this is a slow process and may not result in full recovery. Consult legal resources before proceeding.",
        "Provide the tenant with an itemized statement of how last month's rent was applied.",
        "Consult the RTA or a legal resource before withholding any portion of last month's rent.",
      ]},
    ],
    notes: "What constitutes 'damage' vs 'wear and tear' is consistently disputed. When in doubt, consult the LTB guidelines. Wrongful withholding creates more problems than it solves.",
  },
  {
    id: "p6", industry: "property", title: "Vendor & Contractor Coordination",
    purpose: "Manage trades and service vendors efficiently, consistently, and with proper documentation to protect the property and the business.",
    appliesTo: "Property manager.",
    sections: [
      { title: "Approved Vendor List", steps: [
        "Maintain a preferred vendor list for: plumbing, electrical, HVAC, appliances, cleaning, landscaping.",
        "Every vendor on the list must have: current liability insurance, WSIB clearance, and a record of satisfactory work.",
        "Review and update the list [ANNUALLY or after any significant quality issue].",
      ]},
      { title: "Booking a Vendor", steps: [
        "Define the scope of work in writing before booking - even for small jobs.",
        "Provide 24 hours notice to the tenant for any non-emergency access.",
        "Confirm the vendor knows: unit address, access procedure, nature of issue, and who to contact on completion.",
        "Confirm the appointment with the tenant separately.",
      ]},
      { title: "After the Work", steps: [
        "Confirm with the tenant that the work was completed to their satisfaction.",
        "Inspect the work before approving the invoice where possible.",
        "Log the work in the maintenance record: date, vendor, work done, cost.",
        "File the invoice against the property.",
      ]},
    ],
    notes: "A vendor who can't produce insurance when asked is a vendor you can't use. Check before the job, not after something goes wrong.",
  },
  {
    id: "p7", industry: "property", title: "Property Inspection Schedule",
    purpose: "Conduct regular property inspections to identify maintenance issues early, protect the asset, and maintain a positive landlord-tenant relationship.",
    appliesTo: "Property manager.",
    sections: [
      { title: "Types of Inspections", steps: [
        "Move-In Inspection: completed with tenant on possession day. See Move-In SOP.",
        "Annual/Periodic Inspection: completed [FREQUENCY] to assess general condition.",
        "Move-Out Inspection: completed on or after the tenant's last day. See Move-Out SOP.",
        "Drive-By: exterior check completed [FREQUENCY] to monitor curb appeal and exterior issues.",
      ]},
      { title: "Scheduling and Notice", steps: [
        "Provide the tenant with written notice of [MINIMUM 24 HOURS] before entry.",
        "Schedule during reasonable hours: [e.g. Monday–Friday, 9am–5pm].",
        "Confirm the appointment in writing.",
      ]},
      { title: "During the Inspection", steps: [
        "Use the standard inspection checklist: [CHECKLIST LOCATION].",
        "Document all findings with photos.",
        "Note any maintenance items that need to be actioned.",
        "Speak to the tenant if present - ask if there are any concerns they've noticed.",
      ]},
      { title: "After the Inspection", steps: [
        "File the completed inspection report in the tenant file.",
        "Create maintenance requests for any issues identified.",
        "Send the tenant a summary of findings and next steps.",
      ]},
    ],
    notes: "Regular inspections catch small issues before they become expensive ones. A tenant who feels their concerns are noticed is also less likely to escalate.",
  },

  // ─── WELLNESS ────────────────────────────────────────────────────────────
  {
    id: "w1", industry: "wellness", title: "Client Intake & Health Screening",
    purpose: "Collect the health and lifestyle information needed to provide safe, appropriate care - and document it properly.",
    appliesTo: "All practitioners and front desk staff.",
    sections: [
      { title: "Before the First Appointment", steps: [
        "Send the intake form to new clients before they arrive - not on arrival.",
        "Use [INTAKE FORM LOCATION/PLATFORM] for digital completion.",
        "Forms must include: health history, current medications, contraindications relevant to your services, consent to treatment.",
        "Confirm receipt and completion before the appointment - follow up if not received.",
      ]},
      { title: "At the First Appointment", steps: [
        "Review the intake form with the client in person - don't just file it.",
        "Ask clarifying questions about anything relevant to their treatment.",
        "Identify any contraindications and adjust the treatment plan accordingly.",
        "If a condition is outside your scope, say so clearly and refer appropriately.",
        "Document any updates or additional information discussed.",
      ]},
      { title: "Ongoing", steps: [
        "Update the intake form any time a client reports a significant health change.",
        "Review the form before any new service type with an existing client.",
        "Ensure all health information is stored securely per [PRIVACY POLICY/PIPEDA REQUIREMENTS].",
        "Do not share client health information with anyone without written consent.",
      ]},
    ],
    notes: "Health intake forms are a legal and professional protection - for the client and for you. A form that isn't reviewed is the same as no form.",
  },
  {
    id: "w2", industry: "wellness", title: "Appointment Booking & Cancellation Policy",
    purpose: "Manage the appointment schedule efficiently and communicate the cancellation policy clearly so it can be enforced consistently.",
    appliesTo: "Front desk staff and practitioners who self-schedule.",
    sections: [
      { title: "Booking an Appointment", steps: [
        "Confirm: service type, practitioner preference, date and time, duration, client name and contact.",
        "Confirm any health considerations before booking new services.",
        "Enter into [BOOKING SYSTEM] immediately.",
        "Send a confirmation to the client: date, time, service, practitioner, and cancellation policy.",
        "Request a deposit for new clients if your policy requires it.",
      ]},
      { title: "Reminders", steps: [
        "Send a reminder [48 hours before] the appointment via [EMAIL/SMS].",
        "Include the cancellation policy reminder in every reminder message.",
        "Flag any unconfirmed appointments to the front desk [24 hours before].",
      ]},
      { title: "Cancellations & No-Shows", steps: [
        "Cancellation policy: [YOUR POLICY - e.g. 24 hours notice required].",
        "Apply the policy consistently - exceptions undermine it entirely.",
        "Log all cancellations and no-shows in the system. This is your record if a dispute or chargeback arises.",
        "Late cancellation fee: [YOUR FEE/POLICY].",
        "No-show fee: [YOUR FEE/POLICY].",
        "Contact the client after a no-show - do not assume they'll rebook.",
      ]},
    ],
    notes: "An inconsistently applied cancellation policy is worse than no policy. If you waive it for some clients and not others, it will cause resentment and confusion.",
  },
  {
    id: "w3", industry: "wellness", title: "Treatment Room Setup & Sanitation",
    purpose: "Ensure every treatment room is prepared to the same hygiene and comfort standard before every client.",
    appliesTo: "Practitioners and any staff responsible for room preparation.",
    sections: [
      { title: "Between Every Client", steps: [
        "Remove and replace all linens: table paper, sheets, face cradle covers.",
        "Wipe down all surfaces with an [APPROVED DISINFECTANT]: table, bolsters, tools, handles.",
        "Discard any single-use items used in the previous treatment.",
        "Clean and disinfect any reusable tools per [SANITATION PROTOCOL].",
        "Wash hands thoroughly before preparing for the next client.",
        "Ventilate the room if possible between clients.",
      ]},
      { title: "Room Setup", steps: [
        "Set the temperature to [TARGET ROOM TEMPERATURE].",
        "Prepare the table for the booked service: appropriate linens, bolsters, equipment.",
        "Confirm all products and tools needed are stocked and accessible.",
        "Soft lighting, music, and ambiance set to standard - consistency matters.",
        "Review the client's intake form before they arrive.",
      ]},
      { title: "End of Day", steps: [
        "Full surface wipe of all treatment surfaces.",
        "Laundry in machine before close - not left overnight.",
        "Dispose of all waste properly.",
        "Restock supplies for the next day.",
        "Check all equipment is off and secured.",
      ]},
    ],
    notes: "Sanitation standards are not optional. They are a regulatory requirement and a fundamental part of client trust. Any shortcut here puts clients and your license at risk.",
  },
  {
    id: "w4", industry: "wellness", title: "Client Retention & Rebooking",
    purpose: "Increase client retention through a consistent rebooking process that makes it easy for clients to return.",
    appliesTo: "All practitioners and front desk staff.",
    sections: [
      { title: "At the End of Every Appointment", steps: [
        "Before the client leaves, summarize what was done and what you noticed.",
        "Make a recommendation: 'Based on what I worked on today, I'd suggest booking again in [TIMEFRAME].'",
        "Ask directly: 'Would you like to book your next appointment before you leave?'",
        "Make booking easy - have the system ready, don't make them wait.",
        "If they're not ready to book, follow up within [48 hours].",
      ]},
      { title: "Follow-Up", steps: [
        "Send a post-appointment message within [24-48 hours]: thank them, reference something specific from their session.",
        "Include a gentle call to action: 'Let us know if you have any questions or would like to book your next visit.'",
        "Do not wait for clients to come back to you - make the first move.",
      ]},
      { title: "Tracking Retention", steps: [
        "Flag any client who hasn't rebooked within [YOUR STANDARD INTERVAL] for a follow-up.",
        "Track retention rates by practitioner and overall - review [MONTHLY/QUARTERLY].",
        "If a long-term client stops coming, reach out personally.",
      ]},
    ],
    notes: "Acquiring a new client costs 5-7x more than retaining an existing one. Rebooking at the table is the single highest-return action in a wellness business.",
  },
  {
    id: "w5", industry: "wellness", title: "Membership & Package Management",
    purpose: "Manage memberships and prepaid packages accurately so clients are charged correctly and their balances are always visible.",
    appliesTo: "Front desk and billing staff.",
    sections: [
      { title: "Setting Up a Membership or Package", steps: [
        "Confirm the client understands: what's included, how long it's valid, cancellation terms, auto-renewal if applicable.",
        "Get written acknowledgement of the terms before activating.",
        "Enter into [BOOKING/BILLING SYSTEM] with accurate start date, expiry, and balance.",
        "Process initial payment and send a receipt.",
      ]},
      { title: "Using the Package", steps: [
        "Verify the client's balance before every appointment - do not assume.",
        "Apply the session to their package at the time of the appointment - not end of day.",
        "Notify the client when they have [1-2 sessions] remaining.",
        "Do not allow a package to be used beyond its expiry without manager approval.",
      ]},
      { title: "Expiry and Cancellation", steps: [
        "Send a reminder [30 days before] package expiry.",
        "Apply your expiry policy consistently.",
        "For membership cancellations: follow your terms and process the cancellation in writing.",
        "Refund any unused sessions per your policy - document the calculation.",
      ]},
    ],
    notes: "Package billing errors are one of the fastest ways to damage client trust. If your system says one thing and your client believes another, you have a process problem.",
  },
  {
    id: "w6", industry: "wellness", title: "Practitioner Handoff & Client Notes",
    purpose: "Ensure client care is consistent when a client sees a different practitioner than usual.",
    appliesTo: "All practitioners.",
    sections: [
      { title: "After Every Appointment", steps: [
        "Complete your SOAP notes or treatment notes before your next client - not at end of day.",
        "Include: what was worked on, client feedback, anything noted for future sessions, any contraindications flagged.",
        "Store in [CLIENT MANAGEMENT SYSTEM].",
        "Notes must be legible and objective - no personal opinions about the client.",
      ]},
      { title: "When a Client Sees a Different Practitioner", steps: [
        "The new practitioner must review the client's full notes before the appointment.",
        "Do not rely on the client to tell you what they told the last practitioner.",
        "If notes are unclear, contact the original practitioner before the appointment.",
        "Introduce yourself and acknowledge that you've reviewed their history.",
      ]},
      { title: "Privacy and Access", steps: [
        "Client notes are confidential - access limited to practitioners involved in their care.",
        "Do not discuss client details in common areas.",
        "Client has the right to access their own records - respond to any such request within [TIMEFRAME].",
        "Retain records for a minimum of [10 years for adults, longer for minors] per professional standards.",
      ]},
    ],
    notes: "A client who has to repeat their entire history every visit does not feel cared for. Good notes are a form of respect.",
  },
  {
    id: "w7", industry: "wellness", title: "Retail Inventory & Product Sales",
    purpose: "Manage retail products accurately, ensure recommendations are appropriate, and track inventory so you never run out of what sells.",
    appliesTo: "Practitioners and front desk staff.",
    sections: [
      { title: "Recommending Products", steps: [
        "Recommend products based on what genuinely serves the client - not what needs to move.",
        "Connect the recommendation to what was discussed or worked on in the session.",
        "Never pressure. Offer once clearly and respect their decision.",
        "Know the ingredients and contraindications of what you recommend.",
      ]},
      { title: "Processing a Sale", steps: [
        "Log every retail sale in [POS SYSTEM] at the time of sale.",
        "Provide a receipt.",
        "Reduce inventory count in [SYSTEM] immediately.",
        "If the item is the last one in stock, flag for reorder.",
      ]},
      { title: "Inventory Management", steps: [
        "Complete a physical inventory count [MONTHLY/QUARTERLY].",
        "Compare to system count - investigate any discrepancy.",
        "Reorder point for each product: [LOCATION OF REORDER LIST].",
        "Store products as per manufacturer instructions - some require specific temperature or light conditions.",
        "Check expiry dates during every count.",
      ]},
    ],
    notes: "Retail is a revenue stream that requires almost no additional time if the systems are in place. The most common failure point is inventory that runs out before it's reordered.",
  },
  {
    id: "w8", industry: "wellness", title: "End of Day Closing Procedure",
    purpose: "Close the business consistently every day so the next person opens to a clean, stocked, and organized environment.",
    appliesTo: "Last staff member at end of business day.",
    sections: [
      { title: "Client Administration", steps: [
        "Confirm all appointments for tomorrow are confirmed in the system.",
        "Follow up on any outstanding bookings or cancellations.",
        "Send any pre-appointment reminders scheduled for tomorrow.",
        "Process any end-of-day payments or reconciliations.",
      ]},
      { title: "Physical Space", steps: [
        "All treatment rooms: linens stripped, surfaces wiped, laundry started.",
        "Reception area clean: counters, waiting area, bathroom.",
        "Restock any supplies that are low.",
        "Secure retail products and check no products are misplaced.",
        "Empty wastebaskets.",
      ]},
      { title: "Security", steps: [
        "All equipment off and unplugged where applicable.",
        "Confirm all windows and back doors are locked.",
        "Activate alarm system: [ALARM CODE/PROCEDURE].",
        "Lock front door and confirm it's secured.",
        "Complete the end-of-day checklist and sign off: [CHECKLIST LOCATION].",
      ]},
    ],
    notes: "Whoever opens tomorrow should walk in and know exactly where things are and what state they're in. The closing procedure is a gift to the next shift.",
  },

      // ─── NOT FOR PROFIT ────────────────────────────────────────────────────────────
{
    id: "n1", industry: "nfp", title: "Volunteer Recruitment & Onboarding",
    purpose: "Bring new volunteers into the organization with the same care and structure as paid staff - so they feel valued, prepared, and clear on their role from day one.",
    appliesTo: "Volunteer coordinator and any staff responsible for onboarding new volunteers.",
    sections: [
      { title: "Before They Arrive", steps: [
        "Send a welcome email confirming their role, first shift details, what to bring, and who to ask for.",
        "Provide the volunteer handbook or role description in advance - don't make them read it on arrival.",
        "Confirm any required documentation: police check, vulnerable sector screening, signed volunteer agreement.",
        "Ensure their access, uniform, or materials are ready before their first day.",
        "Notify the team they're coming and what the volunteer will be doing.",
      ]},
      { title: "First Day", steps: [
        "Welcome them personally. Give a tour and introduce them to relevant staff and volunteers.",
        "Walk through the organization's mission and why the work matters - this is why they're here.",
        "Review their role clearly: what they'll do, who they report to, what success looks like.",
        "Go over practical policies: arrival/departure procedures, what to do if they can't make a shift, emergency procedures.",
        "Pair them with an experienced volunteer or staff member for their first shift.",
      ]},
      { title: "First Month Check-In", steps: [
        "Connect with the volunteer after their first [2-3 shifts] - in person, by phone, or by email.",
        "Ask: Is the role what you expected? Do you have what you need? Is there anything unclear?",
        "Address any issues immediately - volunteers who don't hear back disengage fast.",
        "Confirm their ongoing availability and scheduling preferences.",
      ]},
    ],
    notes: "Volunteers who feel set up to succeed stay. Volunteers who show up to confusion don't come back. The investment in a proper welcome pays out every shift afterward.",
  },
  {
    id: "n2", industry: "nfp", title: "Volunteer Scheduling & Shift Management",
    purpose: "Ensure shifts are staffed reliably, volunteers are confirmed in advance, and no-shows are handled without creating chaos.",
    appliesTo: "Volunteer coordinator.",
    sections: [
      { title: "Building the Schedule", steps: [
        "Confirm shift needs [X WEEKS] in advance based on program requirements.",
        "Match volunteer availability and skills to the right shifts - don't just fill gaps.",
        "Enter the schedule into [SCHEDULING SYSTEM/PLATFORM].",
        "Send confirmations to all scheduled volunteers at least [48-72 hours] before the shift.",
        "Flag any unfilled shifts to [MANAGER/BACKUP CONTACT] immediately.",
      ]},
      { title: "Shift Reminders and Confirmations", steps: [
        "Send a reminder [24 hours before] every shift via [EMAIL/TEXT/PLATFORM].",
        "Request confirmation for critical roles - don't assume silence means yes.",
        "Have a standby list for high-priority shifts: [STANDBY VOLUNTEER LIST LOCATION].",
      ]},
      { title: "Managing No-Shows", steps: [
        "If a volunteer cancels same-day, contact your standby list immediately.",
        "If no coverage is found, escalate to [STAFF BACKUP PLAN].",
        "Do not leave a shift critically understaffed without flagging it to [MANAGER].",
        "Follow up with the no-show volunteer within [48 hours] - check in, don't scold.",
        "Log all cancellations and no-shows in [TRACKING SYSTEM] to identify patterns.",
      ]},
      { title: "After the Shift", steps: [
        "Log volunteer hours in [SYSTEM] at the end of each shift - not weekly.",
        "Note any issues, feedback, or follow-up items from the shift.",
        "Recognize any exceptional effort in your next team communication.",
      ]},
    ],
    notes: "Volunteer reliability is built through consistent communication and follow-through - not guilt. If people keep cancelling, the problem is almost always unclear expectations or poor advance notice.",
  },
  {
    id: "n3", industry: "nfp", title: "Donor Acknowledgement & Stewardship",
    purpose: "Ensure every donor receives a timely, appropriate acknowledgement - and that relationships with key donors are maintained deliberately, not only at campaign time.",
    appliesTo: "Executive Director, development staff, or whoever manages donor relations.",
    sections: [
      { title: "Immediate Acknowledgement (All Donations)", steps: [
        "Send an automated acknowledgement receipt for all online donations within [MINUTES/HOURS of receipt].",
        "For gifts received by cheque or in person: send acknowledgement within [3 business days].",
        "The acknowledgement must include the official charitable receipt information required by CRA: organization name, registration number, date, amount, and a description of any advantage received.",
        "Tone should be warm and specific to the campaign or cause they gave to - not a generic template.",
      ]},
      { title: "Personal Follow-Up (Threshold Gifts)", steps: [
        "For gifts of [$X and above]: send a personal email or call within [5 business days].",
        "Reference something specific - the campaign, the impact, or a previous conversation.",
        "Do not ask for another gift in the acknowledgement. This is about the relationship, not the transaction.",
        "Log the interaction in [CRM/DONOR DATABASE] immediately.",
      ]},
      { title: "Ongoing Stewardship", steps: [
        "Major donors should hear from you [X times per year] outside of donation requests.",
        "Share a specific impact story - what did their gift make possible?",
        "Invite them to relevant events, site visits, or program moments.",
        "Flag lapsed donors (no gift in [12+ months]) for a personal outreach - not a mass email.",
        "Update donor records any time you learn something new: preferences, life changes, program interests.",
      ]},
    ],
    notes: "The donor who gives once and never hears from you again isn't a retained donor. Stewardship is what turns a transaction into a relationship - and a relationship into a legacy gift.",
  },
  {
    id: "n4", industry: "nfp", title: "Grant Application & Reporting",
    purpose: "Manage the grant cycle consistently - from research and application through to reporting - so nothing falls through the cracks and funders stay confident in your organization.",
    appliesTo: "Executive Director and anyone responsible for grant writing or fund development.",
    sections: [
      { title: "Identifying and Tracking Opportunities", steps: [
        "Maintain a grants calendar in [SYSTEM]: funder name, deadline, amount, eligibility, status.",
        "Review the calendar [MONTHLY] and flag upcoming deadlines [6-8 weeks in advance].",
        "Before applying, confirm the organization meets all eligibility criteria.",
        "Confirm internal capacity to deliver the proposed program before committing in an application.",
      ]},
      { title: "Writing the Application", steps: [
        "Read the funder's guidelines fully before writing a single word. Answer what they asked, not what you want to say.",
        "Use the organization's approved program descriptions, budget templates, and organizational data - don't recreate from scratch.",
        "Have a second reader review before submission - not for grammar, for clarity of impact.",
        "Submit before the deadline. Many portals close at exactly the stated time.",
        "Save a full copy of every submitted application in [GRANTS FILE LOCATION].",
      ]},
      { title: "Upon Receiving a Grant", steps: [
        "Send a formal acknowledgement to the funder within [5 business days].",
        "Review the grant agreement and conditions before signing - flag anything unclear to [BOARD/LEGAL].",
        "Set up restricted tracking in [ACCOUNTING SYSTEM] for grant funds - they cannot be commingled.",
        "Log all reporting requirements and deadlines in the grants calendar immediately.",
        "Brief the team responsible for delivery on grant conditions, restrictions, and reporting obligations.",
      ]},
      { title: "Grant Reporting", steps: [
        "Begin gathering reporting data [X WEEKS BEFORE] the report is due - not the week of.",
        "Report accurately. Do not overstate outcomes or omit challenges. Funders expect honesty.",
        "Include both quantitative results (numbers served, activities completed) and qualitative impact (stories, testimonials).",
        "Have the Executive Director review before submission.",
        "Submit on time. Late reporting damages funder relationships and future applications.",
        "File a copy of the submitted report alongside the original application.",
      ]},
    ],
    notes: "Funders fund organizations they trust. Trust is built through accurate reporting, honest communication, and doing what you said you'd do. A missed reporting deadline is never just administrative.",
  },
  {
    id: "n5", industry: "nfp", title: "Board Meeting Preparation & Follow-Up",
    purpose: "Ensure board meetings are productive, well-documented, and followed through on - so the board can govern effectively and staff have clear direction.",
    appliesTo: "Executive Director and board chair.",
    sections: [
      { title: "Before the Meeting (2 Weeks Out)", steps: [
        "Confirm the agenda with the board chair - decisions required, information items, strategic discussion.",
        "Prepare and distribute the board package [MINIMUM 7 DAYS BEFORE the meeting]: agenda, minutes from last meeting, financials, staff report, any decision documents.",
        "Send materials in the format board members can actually use - not 40-page PDFs with no summary.",
        "Confirm quorum. If quorum is at risk, flag it to the chair immediately.",
        "Confirm meeting logistics: location, dial-in details, or video link.",
      ]},
      { title: "During the Meeting", steps: [
        "Assign a minute-taker before the meeting begins - not on the spot.",
        "Minutes should capture: decisions made, motions moved and seconded, votes, and action items with owners and due dates.",
        "Motions should be recorded verbatim.",
        "The chair is responsible for keeping discussion on track and ensuring decisions are clear before moving on.",
      ]},
      { title: "After the Meeting", steps: [
        "Distribute draft minutes to board members within [5-7 business days].",
        "Follow up on action items within [48 hours] - confirm owners have what they need.",
        "Add any decisions that affect operations to the relevant staff to-dos.",
        "File signed minutes in [CORPORATE RECORDS LOCATION] once approved.",
        "Update the annual board calendar with any decisions about future meeting dates or agenda items.",
      ]},
    ],
    notes: "A board package that arrives the day before the meeting produces reactive governance. A board that governs reactively makes poor decisions. The preparation is the governance.",
  },
  {
    id: "n6", industry: "nfp", title: "Program Intake & Participant Eligibility",
    purpose: "Ensure every program participant is assessed consistently and fairly against eligibility criteria - and that intake information is captured accurately from the first contact.",
    appliesTo: "Program staff and front-line coordinators.",
    sections: [
      { title: "First Contact", steps: [
        "Respond to all program inquiries within [TARGET TIMEFRAME - e.g. same business day].",
        "Listen to understand what the person needs before explaining the program.",
        "Explain what the program offers, who it's for, and what participation involves.",
        "If they're not eligible, tell them clearly and offer a referral to a more appropriate resource - do not simply say no.",
        "Treat every person who reaches out with dignity, regardless of eligibility.",
      ]},
      { title: "Intake & Eligibility Assessment", steps: [
        "Use the standard intake form for all applicants - [FORM LOCATION/PLATFORM].",
        "Assess eligibility against program criteria consistently. Apply the same criteria to every applicant.",
        "Do not make eligibility exceptions without documented supervisor approval.",
        "If additional information is needed, give the applicant a clear deadline and follow up.",
        "Communicate the decision to the applicant within [TIMEFRAME].",
      ]},
      { title: "Onboarding Accepted Participants", steps: [
        "Confirm their place in the program in writing.",
        "Explain what participation involves: schedule, expectations, what they'll receive, and how to get support.",
        "Collect any required consents, releases, or documentation before the first session.",
        "Add them to [PROGRAM TRACKING SYSTEM] and flag any accommodations or specific needs.",
      ]},
      { title: "Waitlist Management", steps: [
        "If the program is at capacity, offer the waitlist honestly - give a realistic sense of timing.",
        "Contact waitlisted individuals in order when a space opens.",
        "Review the waitlist [MONTHLY] - remove people who are no longer interested or eligible.",
      ]},
    ],
    notes: "Intake is often the first real experience someone has with your organization. The care shown at intake tells them everything about whether you can be trusted to support them through the program.",
  },
  {
    id: "n7", industry: "nfp", title: "Incident Reporting & Duty of Care",
    purpose: "Ensure that any incident involving a participant, volunteer, or staff member is responded to immediately, documented accurately, and reviewed to prevent recurrence.",
    appliesTo: "All staff, volunteers, and anyone working directly with program participants.",
    sections: [
      { title: "Immediate Response", steps: [
        "Prioritize safety first. Call 911 if there is any immediate risk to life or safety.",
        "Stay calm and do not leave the affected person alone until appropriate support has arrived.",
        "Notify [SUPERVISOR/EXECUTIVE DIRECTOR] immediately - within the same shift.",
        "Do not speak to media, post on social media, or discuss the incident with anyone outside the organization.",
        "Preserve any physical evidence or documentation related to the incident.",
      ]},
      { title: "Documentation", steps: [
        "Complete an Incident Report within [24 hours] of the event.",
        "Include: date, time, location, who was involved, a factual account of what happened, any witnesses, and what action was taken.",
        "Write what you observed - not what you inferred or concluded.",
        "Submit to [SUPERVISOR/INCIDENT LOG LOCATION].",
        "If the incident involves a child or vulnerable person, follow your [MANDATORY REPORTING POLICY] immediately - this may require reporting to child welfare or other authorities.",
      ]},
      { title: "Follow-Up and Review", steps: [
        "The Executive Director reviews all incident reports within [48 hours].",
        "Determine whether the incident reveals a process gap, a training need, or an environmental risk.",
        "Follow up with everyone affected - participant, volunteer, staff.",
        "Notify your insurer if there is any potential for a claim.",
        "Update relevant policies or procedures if the review identifies a preventable cause.",
        "Board notification is required for serious incidents - follow your [BOARD NOTIFICATION POLICY].",
      ]},
    ],
    notes: "In NFP settings - especially those serving vulnerable populations - incidents are not administrative events. They are moments of real impact on real people. Every report matters.",
  },
  {
    id: "n8", industry: "nfp", title: "Annual Report & Public Accountability",
    purpose: "Produce an annual report that accurately reflects the organization's impact, demonstrates accountability to funders and donors, and strengthens public trust.",
    appliesTo: "Executive Director and any staff contributing program data or financial summaries.",
    sections: [
      { title: "Planning (3 Months Before Publication)", steps: [
        "Set the publication date and work backward: content due dates, design handoff, board approval, release.",
        "Identify who is responsible for each section: program data, financials, funder acknowledgements, narrative, design.",
        "Begin gathering impact data - don't wait until the fiscal year closes to start tracking.",
        "Confirm any participant stories or photos require signed consent before inclusion.",
      ]},
      { title: "Content Standards", steps: [
        "Report the numbers honestly - do not cherry-pick metrics that only reflect success.",
        "Include what you set out to do, what you accomplished, and what you're still working toward.",
        "Every financial summary must be accurate and reconciled to the audited statements.",
        "Acknowledge funders as required by your agreements - review all grant conditions before publication.",
        "Do not include identifying information about program participants without explicit written consent.",
      ]},
      { title: "Approval and Release", steps: [
        "Board approval is required before the annual report is released publicly. Build this into the timeline.",
        "Post to your website, send to funders and donors, and file with CRA as required.",
        "File a copy in [ORGANIZATIONAL RECORDS LOCATION].",
        "Use the annual report as a stewardship touchpoint. Send it directly to major donors with a personalized note.",
      ]},
    ],
    notes: "The annual r",
  },
];

// ─── CUSTOM SOP BUILDER ──────────────────────────────────────────────────────
function SOPBuilder({ onBack }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    title: "", purpose: "", appliesTo: "", trigger: "",
    steps: ["", "", "", ""],
    whatCanGoWrong: ["", ""],
    successLooksLike: "",
    owner: "",
    reviewDate: "",
  });
  const [built, setBuilt] = useState(false);

  function update(field, val) { setForm((p) => ({ ...p, [field]: val })); }
  function updateList(field, idx, val) {
    setForm((p) => { const a = [...p[field]]; a[idx] = val; return { ...p, [field]: a }; });
  }
  function addToList(field) { setForm((p) => ({ ...p, [field]: [...p[field], ""] })); }

  const questions = [
    {
      title: "What is this SOP for?",
      hint: "Give it a clear name and describe what problem it solves.",
      content: (
        <div>
          <FieldB label="SOP Title *" value={form.title} onChange={(v) => update("title", v)} placeholder="e.g. Opening Checklist, New Client Call, Equipment Sign-Out" />
          <FieldB label="Purpose - what does this process do and why does it exist? *" value={form.purpose} onChange={(v) => update("purpose", v)} placeholder="In 1-2 sentences: what happens, and what goes wrong when it doesn't." multiline />
        </div>
      )
    },
    {
      title: "Who does this and when?",
      content: (
        <div>
          <FieldB label="Who does this apply to? *" value={form.appliesTo} onChange={(v) => update("appliesTo", v)} placeholder="e.g. All client-facing staff, The site foreman, The office manager" />
          <FieldB label="When does this process happen? *" value={form.trigger} onChange={(v) => update("trigger", v)} placeholder="e.g. Every time a new client calls, At the start of every shift, When a complaint is received" />
          <FieldB label="Who owns this process - who is accountable if it doesn't happen?" value={form.owner} onChange={(v) => update("owner", v)} placeholder="Name or role" />
        </div>
      )
    },
    {
      title: "What are the steps?",
      hint: "Write each step clearly enough that someone doing it for the first time could follow it.",
      content: (
        <div>
          {form.steps.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "flex-start" }}>
              <div style={{ minWidth: 28, height: 28, borderRadius: "50%", background: MOCHA, color: IVORY, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, marginTop: 6 }}>{i + 1}</div>
              <input value={s} onChange={(e) => updateList("steps", i, e.target.value)}
                placeholder={`Step ${i + 1}`} style={{ ...inputStyle, flex: 1 }} />
              {form.steps.length > 2 && (
                <button onClick={() => setForm((p) => ({ ...p, steps: p.steps.filter((_, idx) => idx !== i) }))}
                  style={{ background: "none", border: "none", color: CAMEL, cursor: "pointer", fontSize: 18, padding: "0 4px", marginTop: 4 }}>×</button>
              )}
            </div>
          ))}
          <button onClick={() => addToList("steps")} style={addBtnStyle}>+ Add step</button>
        </div>
      )
    },
    {
      title: "What can go wrong?",
      hint: "What are the most common failure points in this process?",
      content: (
        <div>
          {form.whatCanGoWrong.map((w, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <input value={w} onChange={(e) => updateList("whatCanGoWrong", i, e.target.value)}
                placeholder={`e.g. "Step skipped because of time pressure", "Client not notified in advance"`}
                style={{ ...inputStyle, flex: 1 }} />
              {form.whatCanGoWrong.length > 1 && (
                <button onClick={() => setForm((p) => ({ ...p, whatCanGoWrong: p.whatCanGoWrong.filter((_, idx) => idx !== i) }))}
                  style={{ background: "none", border: "none", color: CAMEL, cursor: "pointer", fontSize: 18, padding: "0 4px" }}>×</button>
              )}
            </div>
          ))}
          <button onClick={() => addToList("whatCanGoWrong")} style={addBtnStyle}>+ Add failure point</button>
        </div>
      )
    },
    {
      title: "What does success look like?",
      content: (
        <div>
          <FieldB label="When this process runs perfectly, what's the outcome?" value={form.successLooksLike} onChange={(v) => update("successLooksLike", v)}
            placeholder="e.g. 'Every new client receives a confirmation within 2 hours and arrives knowing exactly what to expect.'" multiline />
          <FieldB label="Review date (when should this SOP be revisited?)" value={form.reviewDate} onChange={(v) => update("reviewDate", v)} placeholder="e.g. Annually, Every 6 months, After any significant incident" />
        </div>
      )
    },
  ];

  const ready = form.title && form.purpose && form.appliesTo && form.trigger && form.steps.some(Boolean);

  if (built && ready) {
    return (
      <div>
        <button onClick={() => setBuilt(false)} style={{ background: "none", border: "none", color: CAMEL, cursor: "pointer", fontSize: 13, marginBottom: 20, padding: 0 }}>← Edit</button>
        <SOPDocument template={{
          title: form.title,
          purpose: form.purpose,
          appliesTo: form.appliesTo,
          notes: form.successLooksLike,
          sections: [
            { title: "When This Applies", steps: [form.trigger] },
            { title: "Process Steps", steps: form.steps.filter(Boolean) },
            ...(form.whatCanGoWrong.some(Boolean) ? [{ title: "Common Failure Points", steps: form.whatCanGoWrong.filter(Boolean) }] : []),
          ],
        }} owner={form.owner} reviewDate={form.reviewDate} isCustom />
      </div>
    );
  }

  return (
    <div>
      <button onClick={onBack} style={{ background: "none", border: "none", color: CAMEL, cursor: "pointer", fontSize: 13, marginBottom: 24, padding: 0 }}>← Back to Templates</button>
      <h2 style={{ fontSize: 24, color: DARK_MOCHA, margin: "0 0 6px", fontFamily: "Georgia, serif" }}>Custom SOP Builder</h2>
      <div style={{ width: 36, height: 2, background: AMBER, marginBottom: 24 }} />

      {/* Progress */}
      <div style={{ display: "flex", gap: 6, marginBottom: 32 }}>
        {questions.map((_, i) => (
          <div key={i} onClick={() => setStep(i)} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? AMBER : LIGHT_TAN, cursor: "pointer" }} />
        ))}
      </div>

      <div style={{ background: "white", borderRadius: 10, padding: "28px", border: `1px solid ${LIGHT_TAN}`, marginBottom: 24 }}>
        <div style={{ fontSize: 11, color: CAMEL, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Step {step + 1} of {questions.length}</div>
        <h3 style={{ fontSize: 20, color: DARK_MOCHA, margin: "0 0 6px", fontFamily: "Georgia, serif" }}>{questions[step].title}</h3>
        {questions[step].hint && <p style={{ fontSize: 13, color: CAMEL, margin: "0 0 20px", fontStyle: "italic" }}>{questions[step].hint}</p>}
        <div style={{ marginTop: 20 }}>{questions[step].content}</div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={() => setStep((p) => Math.max(0, p - 1))} disabled={step === 0}
          style={{ padding: "11px 22px", borderRadius: 8, border: `1px solid ${LIGHT_TAN}`, background: "white", color: step === 0 ? LIGHT_TAN : MOCHA, cursor: step === 0 ? "default" : "pointer", fontSize: 14 }}>
          ← Previous
        </button>
        {step < questions.length - 1 ? (
          <button onClick={() => setStep((p) => p + 1)}
            style={{ padding: "11px 22px", borderRadius: 8, border: "none", background: MOCHA, color: IVORY, cursor: "pointer", fontSize: 14 }}>
            Next →
          </button>
        ) : (
          <button onClick={() => setBuilt(true)} disabled={!ready}
            style={{ padding: "11px 22px", borderRadius: 8, border: "none", background: ready ? AMBER : LIGHT_TAN, color: ready ? "white" : CAMEL, cursor: ready ? "pointer" : "default", fontSize: 14, fontWeight: 600 }}>
            Build My SOP →
          </button>
        )}
      </div>
    </div>
  );
}

// ─── SOP DOCUMENT VIEW ────────────────────────────────────────────────────────
function SOPDocument({ template, onBack, isCustom }) {
  const [editMode, setEditMode] = useState(false);
  const [editedSections, setEditedSections] = useState(template.sections);

  function updateStep(sIdx, stIdx, val) {
    setEditedSections((p) => {
      const sections = p.map((s, si) => si !== sIdx ? s : {
        ...s, steps: s.steps.map((st, sti) => sti !== stIdx ? st : val)
      });
      return sections;
    });
  }

  const sections = editMode ? editedSections : template.sections;
  const ind = INDUSTRIES.find(i => i.id === template.industry);

  return (
    <div>
      {onBack && (
        <button onClick={onBack} style={{ background: "none", border: "none", color: CAMEL, cursor: "pointer", fontSize: 13, marginBottom: 20, padding: 0 }}>← Back</button>
      )}

      <div style={{ background: "white", borderRadius: 12, border: `1px solid ${LIGHT_TAN}`, overflow: "hidden" }}>
        {/* Header */}
        <div style={{ background: DARK_MOCHA, padding: "24px 32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontSize: 10, color: CAMEL, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>
                Groundwork Consult · {ind ? ind.label : "Custom"} · Standard Operating Procedure
              </div>
              <h2 style={{ fontSize: 26, color: IVORY, margin: 0, fontFamily: "Georgia, serif" }}>{template.title}</h2>
            </div>
            <button onClick={() => setEditMode(!editMode)} style={{
              background: editMode ? AMBER : "rgba(255,255,255,0.1)", border: `1px solid ${editMode ? AMBER : "rgba(255,255,255,0.2)"}`,
              borderRadius: 6, padding: "8px 16px", color: IVORY, cursor: "pointer", fontSize: 12, fontWeight: 600,
            }}>
              {editMode ? "✓ Done Editing" : "✎ Customize"}
            </button>
          </div>
        </div>

        <div style={{ padding: "28px 32px" }}>
          {/* Meta */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
            <div style={{ background: IVORY, borderRadius: 8, padding: "14px 16px" }}>
              <div style={{ fontSize: 10, color: CAMEL, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Purpose</div>
              <p style={{ fontSize: 13, color: DARK_MOCHA, margin: 0, lineHeight: 1.6 }}>{template.purpose}</p>
            </div>
            <div style={{ background: IVORY, borderRadius: 8, padding: "14px 16px" }}>
              <div style={{ fontSize: 10, color: CAMEL, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Applies To</div>
              <p style={{ fontSize: 13, color: DARK_MOCHA, margin: 0, lineHeight: 1.6 }}>{template.appliesTo}</p>
            </div>
          </div>

          {/* Sections */}
          {sections.map((section, sIdx) => (
            <div key={sIdx} style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <div style={{ width: 4, height: 18, background: AMBER, borderRadius: 2 }} />
                <div style={{ fontSize: 14, fontWeight: 700, color: DARK_MOCHA }}>{section.title}</div>
              </div>
              {section.steps.map((step, stIdx) => (
                <div key={stIdx} style={{ display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start" }}>
                  <div style={{ minWidth: 24, height: 24, borderRadius: "50%", background: LIGHT_TAN, color: MOCHA, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, marginTop: 3, flexShrink: 0 }}>{stIdx + 1}</div>
                  {editMode ? (
                    <textarea value={step} onChange={(e) => updateStep(sIdx, stIdx, e.target.value)}
                      style={{ ...textareaStyle, minHeight: 48, fontSize: 13, flex: 1 }} rows={2} />
                  ) : (
                    <p style={{ fontSize: 13, color: DARK_MOCHA, margin: 0, lineHeight: 1.65, flex: 1 }}>{step}</p>
                  )}
                </div>
              ))}
            </div>
          ))}

          {/* Notes */}
          {template.notes && (
            <div style={{ background: "#FEF9EC", border: `1px solid ${AMBER}`, borderRadius: 8, padding: "14px 18px", marginTop: 8 }}>
              <div style={{ fontSize: 10, color: AMBER, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>A Note on This Process</div>
              <p style={{ fontSize: 13, color: DARK_MOCHA, margin: 0, lineHeight: 1.65, fontStyle: "italic" }}>{template.notes}</p>
            </div>
          )}

          {/* Footer */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24, paddingTop: 16, borderTop: `1px solid ${LIGHT_TAN}` }}>
            <div style={{ fontSize: 11, color: CAMEL }}>Groundwork Consult · groundworkconsult.ca</div>
            <div style={{ fontSize: 11, color: CAMEL }}>Review annually or after any significant incident</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SHARED FIELD COMPONENTS ──────────────────────────────────────────────────
function FieldB({ label, value, onChange, placeholder, multiline }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontSize: 11, color: CAMEL, display: "block", marginBottom: 5, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
      {multiline
        ? <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={{ ...textareaStyle, minHeight: 72 }} rows={3} />
        : <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={{ ...inputStyle, width: "100%", boxSizing: "border-box" }} />
      }
    </div>
  );
}

const inputStyle = { padding: "10px 12px", border: `1px solid ${LIGHT_TAN}`, borderRadius: 6, fontSize: 13, color: DARK_MOCHA, background: "white", outline: "none", fontFamily: "Georgia, serif" };
const textareaStyle = { width: "100%", padding: "10px 12px", border: `1px solid ${LIGHT_TAN}`, borderRadius: 6, fontSize: 13, color: DARK_MOCHA, background: "white", outline: "none", fontFamily: "Georgia, serif", resize: "vertical", boxSizing: "border-box" };
const addBtnStyle = { background: "none", border: `1px dashed ${CAMEL}`, borderRadius: 6, padding: "7px 14px", fontSize: 12, color: CAMEL, cursor: "pointer", fontFamily: "Georgia, serif" };

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function SOPBundle() {
  const [view, setView] = useState("home"); // home | industry | template | builder
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [search, setSearch] = useState("");

  const industryTemplates = selectedIndustry
    ? TEMPLATES.filter(t => t.industry === selectedIndustry)
    : [];

  if (view === "template" && selectedTemplate) {
    return (
      <div style={{ minHeight: "100vh", background: IVORY, fontFamily: "Georgia, serif", padding: "32px 20px 60px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <SOPDocument template={selectedTemplate} onBack={() => { setView("industry"); setSelectedTemplate(null); }} />
        </div>
      </div>
    );
  }

  if (view === "builder") {
    return (
      <div style={{ minHeight: "100vh", background: IVORY, fontFamily: "Georgia, serif", padding: "32px 20px 60px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <SOPBuilder onBack={() => setView("home")} />
        </div>
      </div>
    );
  }

  if (view === "industry" && selectedIndustry) {
    const ind = INDUSTRIES.find(i => i.id === selectedIndustry);
    return (
      <div style={{ minHeight: "100vh", background: IVORY, fontFamily: "Georgia, serif", padding: "32px 20px 60px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <button onClick={() => setView("home")} style={{ background: "none", border: "none", color: CAMEL, cursor: "pointer", fontSize: 13, marginBottom: 24, padding: 0, display: "block", textAlign: "left" }}>← All Industries</button>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: LIGHT_TAN, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: MOCHA, fontFamily: "Georgia, serif" }}>
  {String(INDUSTRIES.findIndex(i => i.id === selectedIndustry) + 1).padStart(2, "0")}
</div>
            <h2 style={{ fontSize: 28, color: DARK_MOCHA, margin: 0, fontFamily: "Georgia, serif" }}>{ind.label}</h2>
          </div>
          <div style={{ width: 36, height: 2, background: AMBER, marginBottom: 8 }} />
          <p style={{ fontSize: 14, color: MOCHA, marginBottom: 28 }}>{industryTemplates.length} SOPs · {ind.desc}</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {industryTemplates.map((t) => (
              <button key={t.id} onClick={() => { setSelectedTemplate(t); setView("template"); }} style={{
                background: "white", border: `1px solid ${LIGHT_TAN}`, borderRadius: 10, padding: "18px 20px",
                textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = AMBER; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = LIGHT_TAN; }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: DARK_MOCHA, marginBottom: 4, fontFamily: "Georgia, serif" }}>{t.title}</div>
                  <div style={{ fontSize: 12, color: CAMEL }}>{t.purpose.substring(0, 80)}...</div>
                </div>
                <div style={{ color: CAMEL, fontSize: 18, marginLeft: 12 }}>→</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Search results
  const searchResults = search.length > 1
    ? TEMPLATES.filter(t => t.title.toLowerCase().includes(search.toLowerCase()) || t.purpose.toLowerCase().includes(search.toLowerCase()))
    : [];

  return (
    <div style={{ minHeight: "100vh", background: IVORY, fontFamily: "Georgia, serif", padding: "40px 20px 60px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.2em", color: CAMEL, textTransform: "uppercase", marginBottom: 8 }}>Groundwork Consult</div>
          <h1 style={{ fontSize: 36, color: DARK_MOCHA, margin: "0 0 12px", fontFamily: "Georgia, serif", fontWeight: 700 }}>SOP Template Bundle</h1>
          <div style={{ width: 48, height: 3, background: AMBER, margin: "0 auto 16px" }} />
          <p style={{ fontSize: 15, color: MOCHA, lineHeight: 1.7, maxWidth: 480, margin: "0 auto 28px" }}>
            38 ready-to-use SOPs across six categories. Customize any template for your business, or build your own from scratch.
          </p>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search all templates..."
            style={{ ...inputStyle, width: "100%", maxWidth: 400, boxSizing: "border-box", fontSize: 14, padding: "12px 16px" }} />
        </div>

        {/* Search results */}
        {search.length > 1 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 13, color: CAMEL, marginBottom: 12 }}>{searchResults.length} result{searchResults.length !== 1 ? "s" : ""} for "{search}"</div>
            {searchResults.map((t) => {
              const ind = INDUSTRIES.find(i => i.id === t.industry);
              return (
                <button key={t.id} onClick={() => { setSelectedTemplate(t); setView("template"); }} style={{
                  width: "100%", background: "white", border: `1px solid ${LIGHT_TAN}`, borderRadius: 10, padding: "16px 20px",
                  textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8,
                }}>
                  <div>
                    <div style={{ fontSize: 11, color: CAMEL, marginBottom: 4 }}>{ind?.label}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: DARK_MOCHA, fontFamily: "Georgia, serif" }}>{t.title}</div>
                  </div>
                  <div style={{ color: CAMEL, fontSize: 18 }}>→</div>
                </button>
              );
            })}
          </div>
        )}

        {/* Industry grid */}
        {!search && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
              {INDUSTRIES.map((ind) => {
                const count = TEMPLATES.filter(t => t.industry === ind.id).length;
                return (
                  <button key={ind.id} onClick={() => { setSelectedIndustry(ind.id); setView("industry"); }} style={{
                    background: "white", border: `1px solid ${LIGHT_TAN}`, borderRadius: 12, padding: "22px",
                    textAlign: "left", cursor: "pointer",
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = AMBER; e.currentTarget.style.boxShadow = `0 4px 16px rgba(107,79,58,0.08)`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = LIGHT_TAN; e.currentTarget.style.boxShadow = "none"; }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: LIGHT_TAN, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, fontSize: 13, fontWeight: 700, color: MOCHA, fontFamily: "Georgia, serif" }}>
  {String(INDUSTRIES.findIndex(ind2 => ind2.id === ind.id) + 1).padStart(2, "0")}
</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: DARK_MOCHA, marginBottom: 4, fontFamily: "Georgia, serif" }}>{ind.label}</div>
                    <div style={{ fontSize: 12, color: CAMEL, marginBottom: 8 }}>{ind.desc}</div>
                    <div style={{ fontSize: 11, color: ind.color, fontWeight: 700 }}>{count} SOPs included</div>
                  </button>
                );
              })}
            </div>

            {/* Custom builder */}
            <button onClick={() => setView("builder")} style={{
              width: "100%", background: DARK_MOCHA, border: "none", borderRadius: 12, padding: "22px",
              textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: IVORY, marginBottom: 4, fontFamily: "Georgia, serif" }}>Custom SOP Builder</div>
                <div style={{ fontSize: 13, color: CAMEL }}>Build a new SOP from scratch for any process not covered above</div>
              </div>
              <div style={{ fontSize: 28 }}>✦</div>
            </button>
          </>
        )}

        <div style={{ textAlign: "center", marginTop: 32, fontSize: 12, color: CAMEL }}>
          groundworkconsult.ca · jennifer@groundworkconsult.ca
        </div>
      </div>
    </div>
  );
}

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
  { id: "universal", label: "Universal", icon: "01", color: MOCHA, desc: "Every business, every industry" },
  { id: "trades", label: "Trades", icon: "02", color: "#8B5E52", desc: "Roofing, plumbing, electrical, construction" },
  { id: "hospitality", label: "Hospitality", icon: "03", color: TEAL, desc: "Hotels, restaurants, short-term rentals" },
  { id: "property", label: "Property Management", icon: "04", color: OLIVE, desc: "Residential and commercial property" },
  { id: "wellness", label: "Wellness", icon: "05", color: "#7B6F9E", desc: "Clinics, spas, studios, gyms" },
  { id: "nfp", label: "Not for Profit", icon: "06", color: "#5B7B7A", desc: "Charities, foundations, community organizations" },
];

const TEMPLATES = [
  // ── UNIVERSAL ──────────────────────────────────────────────────────────────
  {
    id: "u1", industry: "universal", title: "Employee Onboarding",
    purpose: "Ensure every new team member has a consistent, complete start - regardless of who's doing the onboarding.",
    scope: "Applies to all new hires, full-time and part-time.",
    fields: { businessName: "Your Business Name", managerName: "Direct Manager Name", role: "New Employee Role" },
    steps: [
      { heading: "Before Day 1", items: ["Send a welcome email confirming start date, time, location, and what to bring", "Prepare workspace, login credentials, and any required equipment", "Notify the team of the new hire and their role", "Assign a buddy or go-to person for their first week"] },
      { heading: "Day 1", items: ["Give a tour of the space - include washrooms, break room, emergency exits", "Review the org chart and introduce key people by name and role", "Walk through Day 1 schedule so they know what to expect", "Review [businessName] policies: hours, breaks, time-off requests, communication norms", "Complete any required paperwork (tax forms, direct deposit, emergency contact)"] },
      { heading: "First Week", items: ["Schedule daily 15-minute check-ins with [managerName]", "Shadow at least two team members in different functions", "Provide access to all tools, platforms, and shared drives they need", "Walk through the most common tasks for the [role] role", "Review how to escalate issues or ask for help"] },
      { heading: "30-Day Check-in", items: ["Meet with [managerName] to review how the first month went", "Confirm role expectations are clear and nothing is unclear or surprising", "Identify any training gaps and create a plan to address them", "Ask: what would have made your onboarding better?"] },
    ],
    notes: "A bad onboarding experience is one of the top reasons new hires leave within 90 days. Consistency matters more than perfection.",
  },
  {
    id: "u2", industry: "universal", title: "Employee Offboarding",
    purpose: "Protect the business when a team member leaves - planned or unplanned.",
    scope: "Applies to all departing employees, voluntary or otherwise.",
    fields: { businessName: "Your Business Name", itContact: "IT or Systems Contact", managerName: "Direct Manager Name" },
    steps: [
      { heading: "Immediately Upon Notice", items: ["Confirm final working date in writing", "Begin knowledge transfer - identify what only this person knows", "Reassign active files, clients, or tasks to a named replacement"] },
      { heading: "Final Week", items: ["Document all active projects and their current status", "Transfer ownership of any accounts, logins, or vendor relationships", "Collect all company property: keys, devices, uniforms, access cards", "Revoke or schedule revocation of all system access effective last day"] },
      { heading: "Final Day", items: ["Conduct an exit conversation - what worked, what didn't, what they'd change", "Confirm final pay, any outstanding expenses, and vacation payout", "Revoke all logins and access via [itContact]", "Notify clients or vendors as appropriate"] },
      { heading: "After Departure", items: ["Update org chart and internal directories", "Forward emails if applicable and set auto-reply", "Review what this person's absence reveals about gaps in documentation or coverage", "Update job description if the role will be backfilled"] },
    ],
    notes: "Unplanned departures happen. Run this checklist even if someone leaves on bad terms - protecting access is non-negotiable.",
  },
  {
    id: "u3", industry: "universal", title: "Client Intake & First Contact",
    purpose: "Make a consistent, professional first impression and collect the right information from the start.",
    scope: "Applies to anyone handling first contact with new clients or customers.",
    fields: { businessName: "Your Business Name", responseTime: "Target Response Time (e.g. within 4 hours)", crmTool: "CRM or Tracking System" },
    steps: [
      { heading: "Receiving the Inquiry", items: ["Respond to all new inquiries within [responseTime]", "Log the inquiry in [crmTool] immediately - name, contact, date, source", "Acknowledge receipt with a brief, friendly reply even if full response takes longer"] },
      { heading: "Qualifying the Client", items: ["Ask: what are they looking for, and by when?", "Confirm the service is something [businessName] provides", "Identify any red flags early - unrealistic expectations, scope mismatch, or budget issues"] },
      { heading: "Sending a Proposal or Quote", items: ["Use the standard [businessName] quote or proposal template", "Include scope of work, timeline, price, and what's not included", "Set a clear follow-up date - don't leave it open-ended"] },
      { heading: "Confirming the Booking", items: ["Send confirmation in writing once agreed", "Collect any required deposits or signed agreements before work begins", "Add to the schedule and notify any team members involved"] },
    ],
    notes: "The intake process sets the tone for the entire client relationship. Inconsistency here leads to scope creep and difficult conversations later.",
  },
  {
    id: "u4", industry: "universal", title: "Complaint Handling",
    purpose: "Resolve client or customer complaints consistently, professionally, and without escalation.",
    scope: "Applies to all team members who interact with clients or customers.",
    fields: { escalationContact: "Escalation Contact (Owner or Manager)", responseTime: "Target Initial Response Time", followUpTime: "Follow-up Timeline" },
    steps: [
      { heading: "Receiving the Complaint", items: ["Listen without interrupting - let them finish", "Acknowledge what they've said: 'I understand, and I'm sorry you experienced that'", "Do not assign blame, make excuses, or become defensive", "Confirm you've understood the issue by summarizing it back to them"] },
      { heading: "Assessing the Situation", items: ["Determine if this can be resolved immediately or needs investigation", "If it requires investigation, give a specific timeframe for follow-up", "Escalate to [escalationContact] if: safety is involved, a refund is requested, or the situation is beyond your authority"] },
      { heading: "Resolving the Complaint", items: ["Offer a clear, specific resolution - not vague reassurance", "Confirm the resolution in writing where possible", "Follow up within [followUpTime] to confirm the issue is fully resolved"] },
      { heading: "After Resolution", items: ["Log the complaint and outcome in the client file", "Identify whether this is a one-off or a pattern", "If it's a pattern, flag to management - it points to a process that needs fixing"] },
    ],
    notes: "A well-handled complaint often creates more loyalty than if nothing had gone wrong at all. The goal is resolution, not winning.",
  },
  {
    id: "u5", industry: "universal", title: "Daily Opening & Closing",
    purpose: "Ensure the business starts and ends each day in a consistent, ready state.",
    scope: "Applies to whoever opens and closes the business each day.",
    fields: { businessName: "Your Business Name", openTime: "Opening Time", closeTime: "Closing Time", closingContact: "End-of-Day Report Contact" },
    steps: [
      { heading: "Opening Procedure", items: ["Arrive [openTime] - allow time before clients or customers arrive", "Check messages: voicemail, email, any overnight issues to address", "Confirm team attendance - flag gaps and adjust coverage if needed", "Review the day's schedule and flag any potential issues before they happen", "Ensure workspace is clean, stocked, and ready"] },
      { heading: "During the Day", items: ["Flag any operational issues in real time - don't save them for end of day", "Ensure handoffs between team members happen with a verbal or written update", "Address any client issues as they arise - don't let them sit"] },
      { heading: "Closing Procedure", items: ["Complete any end-of-day reconciliation (cash, bookings, job status)", "Secure the premises - locks, alarms, equipment stored properly", "Send a brief end-of-day summary to [closingContact] if required", "Flag any issues that need attention tomorrow", "Confirm opening coverage is confirmed for next business day"] },
    ],
    notes: "The most common source of operational inconsistency is different team members doing opening and closing differently. This SOP eliminates that.",
  },
  {
    id: "u6", industry: "universal", title: "Invoicing & Payment Follow-Up",
    purpose: "Ensure invoices go out on time and outstanding payments are followed up consistently.",
    scope: "Applies to whoever manages billing and accounts receivable.",
    fields: { invoiceTool: "Invoicing Software", paymentTerms: "Payment Terms (e.g. Net 14)", followUp1: "First Follow-Up (e.g. 3 days after due)", followUp2: "Second Follow-Up (e.g. 7 days after due)", escalationContact: "Escalation Contact for Overdue Accounts" },
    steps: [
      { heading: "Sending Invoices", items: ["Invoice immediately upon job completion or at agreed billing milestone", "Use [invoiceTool] - never send invoices from personal email", "Include: itemized description, total, payment terms ([paymentTerms]), and accepted payment methods", "Confirm the invoice was received if no auto-confirmation exists"] },
      { heading: "Following Up on Unpaid Invoices", items: ["[followUp1]: send a friendly reminder - assume it was missed, not ignored", "[followUp2]: follow up again, confirm payment method and ask if there are issues", "If still unpaid after 14 days, escalate to [escalationContact]"] },
      { heading: "Escalation", items: ["Owner or manager contacts the client directly", "Confirm whether there is a dispute or simply a delay", "Document all communication in the client file", "Determine next steps: payment plan, final notice, or collections"] },
      { heading: "Reconciliation", items: ["Mark invoices paid in [invoiceTool] immediately upon receipt", "Reconcile weekly - do not let unpaid invoices accumulate unnoticed", "Review AR monthly and flag any accounts over 30 days outstanding"] },
    ],
    notes: "Late invoicing and inconsistent follow-up are two of the most common cash flow killers in small businesses. This process pays for itself.",
  },
  {
    id: "u7", industry: "universal", title: "Incident & Emergency Response",
    purpose: "Ensure the team knows exactly what to do in an emergency - before one happens.",
    scope: "Applies to all team members at all locations.",
    fields: { businessName: "Your Business Name", emergencyContact: "Owner/Manager Emergency Contact", firstAidContact: "First Aid Certified Team Member", insuranceContact: "Insurance Provider & Policy Number" },
    steps: [
      { heading: "Immediate Response (First 5 Minutes)", items: ["Ensure personal safety first - do not put yourself at risk", "Call 911 if there is any risk to life, safety, or property", "Contact [emergencyContact] immediately", "Do not move injured persons unless there is immediate danger"] },
      { heading: "Stabilizing the Situation", items: ["[firstAidContact] administers first aid if trained and safe to do so", "Clear the area of bystanders if needed", "Preserve the scene - do not clean up or alter anything before documentation"] },
      { heading: "Documentation", items: ["Record exactly what happened, when, who was involved, and who witnessed it", "Take photos if safe and appropriate", "Complete an incident report within 24 hours"] },
      { heading: "Reporting & Follow-Up", items: ["Notify insurance ([insuranceContact]) within required timeframe", "Report to WSIB or relevant authority if a workplace injury occurred", "Review what happened and identify whether a process change is needed", "Communicate with the team about the incident as appropriate"] },
    ],
    notes: "The worst time to figure out your emergency procedure is during the emergency. Post key contacts somewhere visible.",
  },

  // ── TRADES ─────────────────────────────────────────────────────────────────
  {
    id: "t1", industry: "trades", title: "Job Site Safety Checklist",
    purpose: "Ensure every job site is safe before work begins and throughout the job.",
    scope: "Applies to all site supervisors and crew leads before and during any job.",
    fields: { companyName: "Company Name", supervisorRole: "Site Supervisor Title", safetyContact: "Safety Officer or Owner Contact" },
    steps: [
      { heading: "Before Work Begins", items: ["Confirm all crew have required certifications for the work being done", "Conduct a site walk - identify hazards before the crew starts", "Confirm PPE is available and being worn: hard hats, safety boots, gloves, eye protection as required", "Identify emergency exits, nearest hospital, and first aid kit location", "Confirm WHMIS/GHS sheets are on site for any controlled products in use"] },
      { heading: "Daily Site Check", items: ["Check weather conditions - flag any risks (heat, lightning, ice)", "Confirm equipment is in working order before use", "Ensure no unauthorized personnel are on site", "Check that housekeeping is maintained - clear walkways, no trip hazards"] },
      { heading: "Incident or Near Miss", items: ["Stop work if any unsafe condition is identified", "Report immediately to [supervisorRole] and [safetyContact]", "Document the hazard or incident before resuming work", "Do not resume work until the hazard is resolved"] },
      { heading: "End of Day", items: ["Secure all tools and equipment", "Ensure site is safe for overnight - no open hazards, barriers in place if needed", "Confirm any subcontractors have cleaned up their area", "Log any issues from the day for follow-up"] },
    ],
    notes: "A 5-minute safety check at the start of every day prevents incidents that cost far more in time, money, and liability.",
  },
  {
    id: "t2", industry: "trades", title: "Quote to Job Conversion",
    purpose: "Move a quote to a confirmed, scheduled job without things falling through the cracks.",
    scope: "Applies to whoever handles sales, quoting, and job scheduling.",
    fields: { companyName: "Company Name", quoteTool: "Quoting Software or Template", followUpDays: "Follow-Up Timeline After Quote (e.g. 3 business days)", depositPercent: "Required Deposit %" },
    steps: [
      { heading: "Sending the Quote", items: ["Use [quoteTool] for all quotes - no verbal-only quotes", "Include: scope of work, materials, labour, exclusions, validity period, and deposit requirement", "Send within 24 hours of site visit or inquiry where possible"] },
      { heading: "Following Up", items: ["Follow up within [followUpDays] if no response", "Ask: any questions, concerns, or changes to scope?", "If they're comparing quotes, ask what matters most to them - price, timeline, or track record"] },
      { heading: "Confirming the Job", items: ["Collect [depositPercent] deposit before scheduling", "Send written confirmation of scope, start date, and key contacts", "Add to the master schedule and assign crew"] },
      { heading: "Pre-Job Preparation", items: ["Confirm materials are ordered and arrival date is before job start", "Brief the crew lead on scope, client expectations, and any known site conditions", "Confirm access arrangements with the client (keys, gate codes, parking)"] },
    ],
    notes: "Deposits protect you and signal commitment from the client. A client who won't pay a deposit is a red flag worth paying attention to.",
  },
  {
    id: "t3", industry: "trades", title: "Materials Ordering & Inventory",
    purpose: "Ensure materials are ordered correctly, on time, and tracked so nothing goes missing or runs short on a job.",
    scope: "Applies to whoever manages purchasing and job materials.",
    fields: { companyName: "Company Name", preferredSupplier: "Primary Supplier Name & Contact", orderLeadTime: "Standard Order Lead Time", approvalThreshold: "Purchase Approval Threshold (e.g. over $500 requires sign-off)" },
    steps: [
      { heading: "Before Ordering", items: ["Review the job scope and confirm material quantities - add 5-10% buffer for waste", "Check existing inventory before ordering", "Confirm delivery address and required-by date", "Get approval for any order over [approvalThreshold]"] },
      { heading: "Placing the Order", items: ["Order from [preferredSupplier] unless unavailable or better pricing confirmed", "Confirm order in writing - email or purchase order", "Log the order: supplier, items, quantity, cost, expected delivery, job it's for"] },
      { heading: "Receiving Materials", items: ["Count and inspect all materials upon delivery - do not sign off without checking", "Flag any shortages, damage, or incorrect items immediately", "Store materials securely - do not leave on site overnight unless secured"] },
      { heading: "After the Job", items: ["Return unused materials to inventory and log what was returned", "Reconcile actual material costs against quoted costs", "Flag any significant overages for review"] },
    ],
    notes: "Material errors are one of the most common reasons jobs go over budget. A few minutes of checking prevents hours of problems.",
  },
  {
    id: "t4", industry: "trades", title: "Subcontractor Management",
    purpose: "Ensure subcontractors are properly vetted, briefed, and accountable before they touch a job.",
    scope: "Applies to anyone who hires or coordinates subcontractors.",
    fields: { companyName: "Company Name", insuranceMinimum: "Minimum Liability Insurance Required", contractTemplate: "Subcontractor Agreement Template Location" },
    steps: [
      { heading: "Vetting a New Subcontractor", items: ["Confirm valid WSIB clearance certificate", "Confirm liability insurance minimum [insuranceMinimum]", "Check references - at least two", "Review their work on a previous similar job if possible"] },
      { heading: "Before the Job", items: ["Send a written scope of work - no verbal-only agreements", "Confirm rate, payment terms, and invoicing process", "Have them sign [contractTemplate] before work begins", "Brief them on site safety requirements and client expectations"] },
      { heading: "During the Job", items: ["Check in at key milestones - don't assume everything is fine", "Flag any quality concerns immediately - don't wait until the end", "Ensure their crew is following your site safety standards"] },
      { heading: "After the Job", items: ["Inspect their work before they leave the site", "Confirm client is satisfied before releasing final payment", "Log their performance for future reference"] },
    ],
    notes: "A subcontractor's mistake on your job is your problem with the client. Vet early, brief clearly, inspect before paying.",
  },
  {
    id: "t5", industry: "trades", title: "Job Completion & Client Sign-Off",
    purpose: "Close every job cleanly with a satisfied client and a complete paper trail.",
    scope: "Applies to site supervisors and anyone who manages the client relationship.",
    fields: { companyName: "Company Name", warrantyPeriod: "Warranty Period Offered", finalInvoiceTerms: "Final Invoice Payment Terms" },
    steps: [
      { heading: "Before Calling the Job Done", items: ["Walk the completed job against the original scope - confirm everything is done", "Clean up the site completely - leave it better than you found it", "Photograph the completed work for your records"] },
      { heading: "Client Walk-Through", items: ["Walk the client through the completed work", "Explain what was done and point out anything they should be aware of", "Address any concerns on the spot - do not leave site with unresolved issues"] },
      { heading: "Sign-Off & Payment", items: ["Get written or email confirmation that the client is satisfied", "Issue final invoice with [finalInvoiceTerms]", "Provide warranty information: [warrantyPeriod] coverage and how to make a claim"] },
      { heading: "After the Job", items: ["Update job status in your system to complete", "Request a Google review or referral while satisfaction is highest", "Log any lessons learned for future similar jobs"] },
    ],
    notes: "The walk-through is your best protection against 'I wasn't happy with it' three months later. Document satisfaction in writing.",
  },
  {
    id: "t6", industry: "trades", title: "Warranty & Callback Handling",
    purpose: "Handle warranty claims and callbacks professionally to protect your reputation and margins.",
    scope: "Applies to all staff who receive client calls after job completion.",
    fields: { companyName: "Company Name", warrantyContact: "Warranty Claim Contact", responseTarget: "Target Response Time for Warranty Claims" },
    steps: [
      { heading: "Receiving a Callback or Claim", items: ["Respond within [responseTarget] - fast response prevents escalation", "Listen without being defensive - get the full picture first", "Log the claim: client name, job details, date of original work, nature of complaint"] },
      { heading: "Assessing the Claim", items: ["Review the original job file and sign-off documentation", "Determine: is this within warranty scope and timeline?", "If yes: schedule a return visit promptly", "If unclear: send [warrantyContact] to assess before committing to a fix"] },
      { heading: "Resolving the Claim", items: ["Complete the repair or correction - do not cut corners on warranty work", "Photograph before and after", "Get written confirmation from client that the issue is resolved"] },
      { heading: "After the Claim", items: ["Review: was this a workmanship issue, a materials issue, or client misuse?", "If a pattern emerges with a specific type of job or crew, address it", "Update job file with warranty resolution"] },
    ],
    notes: "Handling warranty claims well is one of the fastest ways to generate referrals. Handling them poorly is one of the fastest ways to get a bad Google review.",
  },
  {
    id: "t7", industry: "trades", title: "Vehicle & Equipment Maintenance",
    purpose: "Keep fleet and equipment in safe, working condition and catch problems before they cause downtime.",
    scope: "Applies to all operators of company vehicles and equipment.",
    fields: { companyName: "Company Name", maintenanceContact: "Fleet/Equipment Manager", serviceProvider: "Preferred Service Provider", logLocation: "Maintenance Log Location" },
    steps: [
      { heading: "Daily Pre-Use Check (Vehicles)", items: ["Check fuel level - never start the day below quarter tank", "Check lights, mirrors, and windshield for damage", "Check tires - obvious damage or low pressure", "Confirm any load is properly secured before driving"] },
      { heading: "Daily Pre-Use Check (Equipment)", items: ["Check fluid levels before starting any motorized equipment", "Inspect blades, bits, or attachments for damage", "Confirm safety guards are in place", "Do not operate equipment that is making unusual sounds or showing warning lights"] },
      { heading: "Reporting Issues", items: ["Report any vehicle or equipment issue to [maintenanceContact] same day", "Do not defer reporting to avoid downtime - a small issue becomes a big one", "Log the issue in [logLocation] with date, description, and your name"] },
      { heading: "Scheduled Maintenance", items: ["Follow manufacturer service intervals - log in [logLocation]", "Book service with [serviceProvider] before the interval is due, not after", "Confirm a replacement vehicle or equipment is available during any service period"] },
    ],
    notes: "Equipment downtime on a job site is one of the most expensive operational failures a trades business can have. Maintenance prevents it.",
  },

  // ── HOSPITALITY ────────────────────────────────────────────────────────────
  {
    id: "h1", industry: "hospitality", title: "Guest Check-In & Check-Out",
    purpose: "Ensure every guest arrival and departure is handled smoothly and consistently.",
    scope: "Applies to all front desk, host, or property management staff.",
    fields: { propertyName: "Property or Business Name", checkInTime: "Standard Check-In Time", checkOutTime: "Standard Check-Out Time", guestContact: "Guest Communication Platform" },
    steps: [
      { heading: "Pre-Arrival (24 Hours Before)", items: ["Confirm reservation and send arrival instructions via [guestContact]", "Confirm room or unit is clean, inspected, and ready", "Flag any special requests or accessibility needs to the relevant team member", "Prepare welcome materials if applicable"] },
      { heading: "Check-In", items: ["Greet guest by name where possible", "Confirm length of stay, room type, and any special notes", "Walk through key information: WiFi, parking, check-out time, local tips", "Confirm payment method on file and collect any outstanding balance", "Provide emergency contact and how to reach someone if they need help"] },
      { heading: "During Stay", items: ["Check in at the midpoint of longer stays (3+ nights)", "Address any requests or complaints same day - do not defer", "Log any notable guest interactions or property issues"] },
      { heading: "Check-Out", items: ["Confirm check-out time the evening before", "Complete a room or unit inspection within 1 hour of departure", "Process any additional charges or release deposit if applicable", "Send a thank-you message and request a review within 24 hours"] },
    ],
    notes: "The first and last impression are the ones guests remember and write about. Both deserve the same care.",
  },
  {
    id: "h2", industry: "hospitality", title: "Reservation & Booking Management",
    purpose: "Prevent double-bookings, missed reservations, and last-minute chaos.",
    scope: "Applies to anyone managing reservations or bookings.",
    fields: { propertyName: "Property or Business Name", bookingPlatform: "Booking Platform(s) Used", confirmationTime: "Target Confirmation Time", depositPolicy: "Deposit or Payment Policy" },
    steps: [
      { heading: "Receiving a Booking", items: ["Confirm all bookings in [bookingPlatform] immediately - never hold informally", "Send a written confirmation: dates, rate, deposit policy, cancellation terms", "Collect deposit per [depositPolicy] before confirming"] },
      { heading: "Managing the Calendar", items: ["Block unavailable dates in all channels immediately - prevent double-booking", "Review upcoming arrivals weekly: flag any issues, special requests, or gaps in coverage", "Confirm staffing coverage for all bookings at least 48 hours in advance"] },
      { heading: "Changes & Cancellations", items: ["Process any date changes in [bookingPlatform] immediately", "Apply cancellation policy consistently - no exceptions without manager approval", "Re-open cancelled dates in all channels right away"] },
      { heading: "No-Shows", items: ["Attempt to contact the guest within 1 hour of expected arrival", "Apply no-show policy per booking terms", "Log the no-show and update the booking status"] },
    ],
    notes: "Double-bookings and missed confirmations are completely preventable. They're almost always the result of informal confirmation habits.",
  },
  {
    id: "h3", industry: "hospitality", title: "Housekeeping & Room Turnover",
    purpose: "Ensure every room or unit is cleaned to a consistent standard every time.",
    scope: "Applies to all housekeeping staff.",
    fields: { propertyName: "Property or Business Name", turnoverTime: "Standard Turnover Time Allowed", inspectionContact: "Inspection Supervisor", standardsDoc: "Housekeeping Standards Document Location" },
    steps: [
      { heading: "Before Entering", items: ["Confirm the room is checked out - never enter an occupied room without notice", "Bring all required supplies - don't make multiple trips", "Knock and announce even when confirmed vacant"] },
      { heading: "Cleaning Sequence", items: ["Strip all linens first and remove from the room", "Empty all bins and remove any guest items left behind (log and store)", "Clean bathroom: toilet, sink, shower/tub, mirrors, floor", "Clean sleeping area: dust surfaces, clean mirrors, mop or vacuum", "Make the bed with fresh linens per [standardsDoc]", "Restock supplies: toiletries, coffee, any amenities"] },
      { heading: "Final Check", items: ["Walk the room as a guest would see it on arrival", "Confirm all appliances and lights are working", "Check HVAC is set to the standard temperature", "Take a photo of the completed room before departure"] },
      { heading: "Flagging Issues", items: ["Report any damage, missing items, or maintenance needs to [inspectionContact] immediately", "Do not cover up damage - log and report", "Flag any consumables running low so they can be restocked"] },
    ],
    notes: "Guest reviews are written about housekeeping more than almost anything else. One missed detail can define the whole stay.",
  },
  {
    id: "h4", industry: "hospitality", title: "Supplier & Delivery Receiving",
    purpose: "Ensure supplies are received correctly, stored properly, and accounted for.",
    scope: "Applies to anyone who receives supplier deliveries.",
    fields: { propertyName: "Property or Business Name", storageLocation: "Storage Room Location", inventoryLog: "Inventory Log Location", supplierContact: "Primary Supplier Contact" },
    steps: [
      { heading: "Before Delivery", items: ["Confirm delivery date and expected contents in advance", "Ensure [storageLocation] is clear and organized to receive stock", "Have the purchase order or expected delivery list on hand"] },
      { heading: "Receiving the Delivery", items: ["Count all items against the delivery note before signing", "Check for damage, expiry dates, and temperature (for food items)", "Do not sign for items that are missing, incorrect, or damaged", "Flag discrepancies with [supplierContact] same day"] },
      { heading: "Storing Stock", items: ["Store items in designated locations per [storageLocation] layout", "First-in, first-out: new stock goes behind existing stock", "Label any opened items with date opened", "Update [inventoryLog] immediately"] },
      { heading: "Weekly Inventory Check", items: ["Check stock levels against par levels weekly", "Flag any items running low before they run out", "Dispose of expired items and log the disposal"] },
    ],
    notes: "Signing for a delivery without checking it means you own the problem. Two minutes of checking saves a lot of back-and-forth.",
  },
  {
    id: "h5", industry: "hospitality", title: "Guest Review Response",
    purpose: "Respond to every guest review professionally and consistently - positive or negative.",
    scope: "Applies to whoever manages online reputation and review platforms.",
    fields: { propertyName: "Property or Business Name", reviewPlatforms: "Review Platforms Used (e.g. Google, TripAdvisor, Airbnb)", responseTime: "Target Response Time", responseContact: "Who Approves Responses to Negative Reviews" },
    steps: [
      { heading: "Monitoring Reviews", items: ["Check [reviewPlatforms] daily for new reviews", "Log all reviews: platform, date, rating, and key theme", "Flag any review mentioning safety, staff by name, or serious complaints to [responseContact] immediately"] },
      { heading: "Responding to Positive Reviews", items: ["Respond within [responseTime]", "Thank the guest by name if available", "Reference something specific they mentioned - not a generic reply", "Invite them back"] },
      { heading: "Responding to Negative Reviews", items: ["Get approval from [responseContact] before posting any response to a negative review", "Acknowledge their experience without being defensive", "Do not argue, over-explain, or offer refunds publicly", "Invite them to contact you directly to resolve the issue", "Keep it brief - long defensive responses look worse than short empathetic ones"] },
      { heading: "After Responding", items: ["If the issue is valid, investigate internally - is this a pattern?", "Log the complaint theme and track frequency", "Use recurring negative themes as a direct input to process improvement"] },
    ],
    notes: "Your response to a bad review is often more important than the review itself. Future guests are reading both.",
  },
  {
    id: "h6", industry: "hospitality", title: "Seasonal Staffing Ramp-Up",
    purpose: "Prepare the team for high-demand periods without last-minute chaos.",
    scope: "Applies to managers and owners who handle seasonal scheduling and staffing.",
    fields: { propertyName: "Property or Business Name", peakSeason: "Peak Season Dates", hiringDeadline: "Hiring Completion Target Date", trainingLead: "Training Coordinator" },
    steps: [
      { heading: "8 Weeks Before Peak Season", items: ["Forecast staffing needs based on last year's demand and current bookings", "Identify gaps: who is returning, who has left, what roles need to be filled", "Post job listings for any open roles immediately - good candidates move fast"] },
      { heading: "4 Weeks Before", items: ["Complete hiring - no open roles by this point", "Schedule all onboarding and training with [trainingLead]", "Confirm uniform, equipment, and supply orders are placed"] },
      { heading: "2 Weeks Before", items: ["Complete onboarding for all new hires", "Run at least one full team briefing - review expectations, standards, and communication norms", "Confirm schedule coverage for opening weekend of peak season"] },
      { heading: "During Peak Season", items: ["Hold brief weekly team check-ins to catch issues early", "Have a clear escalation path for problems - staff should know who to call", "Document any process issues to address in the off-season"] },
    ],
    notes: "Starting peak season understaffed or undertrained is one of the most preventable operational failures in hospitality. This timeline is the minimum - start earlier if possible.",
  },

  // ── PROPERTY MANAGEMENT ────────────────────────────────────────────────────
  {
    id: "p1", industry: "property", title: "Tenant Screening & Application",
    purpose: "Screen tenants consistently, legally, and thoroughly to reduce risk.",
    scope: "Applies to anyone who processes rental applications.",
    fields: { companyName: "Company Name", screeningCriteria: "Screening Criteria Document Location", applicationForm: "Application Form Location", decisionMaker: "Leasing Decision Authority" },
    steps: [
      { heading: "Receiving an Application", items: ["Collect a completed application from all adults who will occupy the unit", "Confirm ID for all applicants", "Log receipt date - applications should be reviewed in order received"] },
      { heading: "Screening the Application", items: ["Run a credit check with written consent from the applicant", "Verify employment and income - pay stubs, employer letter, or bank statements", "Contact previous landlord references - ask specifically about payment history and property care", "Review against [screeningCriteria] - apply consistently to all applicants"] },
      { heading: "Making the Decision", items: ["Decision is made by [decisionMaker] only", "Document the reason for approval or denial - this protects you legally", "All denials must be based on screening criteria, never on protected characteristics under the Ontario Human Rights Code"] },
      { heading: "Communicating the Decision", items: ["Notify the applicant in writing within the timeframe promised", "If approved: move to lease signing process", "If denied: provide required notice per Ontario legislation"] },
    ],
    notes: "Consistent screening documentation is your legal protection. Every decision needs a paper trail that demonstrates fair, criteria-based assessment.",
  },
  {
    id: "p2", industry: "property", title: "Lease Signing & Move-In",
    purpose: "Complete lease signing and move-in professionally with a complete paper trail.",
    scope: "Applies to anyone who manages lease execution and tenant move-ins.",
    fields: { companyName: "Company Name", leaseTemplate: "Lease Agreement Template Location", depositAmount: "Last Month's Rent Deposit Requirement", moveInContact: "Move-In Coordinator" },
    steps: [
      { heading: "Before Signing", items: ["Confirm all application and screening steps are complete", "Prepare lease using [leaseTemplate] - use the current Ontario Standard Lease", "Collect [depositAmount] before or at signing - no exceptions", "Schedule move-in date and confirm access arrangements"] },
      { heading: "Lease Signing", items: ["Walk the tenant through the lease - don't just hand it to them", "Confirm they understand: rent amount, due date, rules, and notice requirements", "Both parties sign all copies", "Provide tenant with a copy immediately"] },
      { heading: "Move-In Inspection", items: ["Complete a written move-in inspection with the tenant present", "Document the condition of every room - photos and written notes", "Both parties sign the inspection report", "Provide the tenant with a copy of the signed inspection"] },
      { heading: "Handing Over Keys", items: ["Provide keys, fobs, or codes only after all documents are signed and deposit collected", "Log how many keys were provided and to whom", "Confirm emergency contact and how to reach [companyName] for maintenance"] },
    ],
    notes: "The move-in inspection is the single most important document in a tenancy. Without a signed inspection, deposit disputes become your problem.",
  },
  {
    id: "p3", industry: "property", title: "Maintenance Request Handling",
    purpose: "Respond to maintenance requests consistently and document every step.",
    scope: "Applies to all staff who receive and coordinate maintenance requests.",
    fields: { companyName: "Company Name", requestSystem: "Maintenance Request System", emergencyVendor: "24/7 Emergency Vendor Contact", standardResponse: "Standard Response Time for Non-Emergency Requests" },
    steps: [
      { heading: "Receiving the Request", items: ["Log every request in [requestSystem] - date, unit, description, and urgency", "Acknowledge receipt to the tenant within [standardResponse]", "Classify: emergency (24-hour response) vs. standard (scheduled)"] },
      { heading: "Emergency Requests", items: ["Contact [emergencyVendor] immediately for: no heat, flooding, gas leaks, security breaches", "Notify the tenant of the plan and estimated response time", "Follow up to confirm resolution and update the log"] },
      { heading: "Standard Requests", items: ["Schedule with the appropriate vendor or in-house maintenance", "Provide the tenant with a date and time window - get confirmation they'll be home or arrange access", "Complete work and confirm with the tenant that it's resolved"] },
      { heading: "After Completion", items: ["Update [requestSystem] with resolution details, vendor used, and cost", "File any invoices against the correct property", "Flag recurring issues for inspection - repeated requests for the same issue point to a larger problem"] },
    ],
    notes: "Delayed maintenance is the most common source of tenant complaints and legal exposure. Logging every step protects you if a dispute arises.",
  },
  {
    id: "p4", industry: "property", title: "Rent Collection & Arrears",
    purpose: "Collect rent consistently and address late payments before they become a problem.",
    scope: "Applies to anyone managing rent collection.",
    fields: { companyName: "Company Name", rentDueDate: "Rent Due Date", lateNoticeDay: "Day Late Notice Is Sent (e.g. 2nd of the month)", n4Threshold: "Days Late Before N4 is Issued", legalContact: "Legal Contact for Escalation" },
    steps: [
      { heading: "Rent Collection", items: ["Rent is due on the [rentDueDate] of each month", "Accept payment via [companyName]'s approved methods only - no cash without a receipt", "Confirm receipt of payment and update the ledger same day"] },
      { heading: "Late Payment Response", items: ["If rent is not received by [lateNoticeDay], send a written reminder same day - assume it was missed", "Do not accept partial payments without a written payment plan agreement", "If no payment and no communication by [n4Threshold] days late, issue an N4 Notice to End Tenancy for Non-Payment of Rent"] },
      { heading: "N4 Process", items: ["Issue N4 via the Ontario Landlord and Tenant Board process", "Document all communication attempts prior to filing", "Allow the void period per current legislation before proceeding"] },
      { heading: "Escalation", items: ["If tenant pays arrears in full during the void period, void the N4 and log the resolution", "If arrears remain, contact [legalContact] for next steps", "Maintain complete documentation throughout - this is required for any LTB hearing"] },
    ],
    notes: "Every step must be documented. Landlord and Tenant Board hearings are won and lost on paper trails.",
  },
  {
    id: "p5", industry: "property", title: "Move-Out Inspection & Deposit Return",
    purpose: "Complete move-outs cleanly, fairly, and with legal compliance.",
    scope: "Applies to anyone managing tenant departures.",
    fields: { companyName: "Company Name", depositReturnDays: "Deposit Return Timeline (per Ontario law)", moveOutContact: "Move-Out Coordinator", cleaningStandard: "Cleaning Standard Required" },
    steps: [
      { heading: "Notice Period", items: ["Confirm notice is in writing and meets Ontario notice requirements", "Schedule the move-out inspection for the last day of tenancy or within 24 hours", "Confirm tenant is returning all keys, fobs, and access devices"] },
      { heading: "Move-Out Inspection", items: ["Complete inspection against the signed move-in inspection report", "Document all damage beyond normal wear and tear - photos and written description", "Walk through with the tenant if available - have them sign the report", "Note the condition of any appliances, fixtures, and common areas"] },
      { heading: "Processing the Deposit", items: ["Return deposit within [depositReturnDays]", "Provide an itemized written statement of any deductions", "Deductions must reflect actual costs - get quotes or invoices to support them", "Do not deduct for normal wear and tear - this is not allowable under Ontario law"] },
      { heading: "After Move-Out", items: ["Change locks or access codes before new tenant moves in", "Complete any required repairs or cleaning per [cleaningStandard]", "Update your records and close the tenancy file"] },
    ],
    notes: "Normal wear and tear is not damage. Being clear about this distinction saves a lot of unnecessary disputes.",
  },
  {
    id: "p6", industry: "property", title: "Vendor & Contractor Coordination",
    purpose: "Manage vendors and contractors so work gets done right, on time, and on budget.",
    scope: "Applies to property managers who coordinate maintenance and repairs.",
    fields: { companyName: "Company Name", approvedVendorList: "Approved Vendor List Location", spendApproval: "Spend Approval Threshold", vendorManager: "Vendor Relationship Owner" },
    steps: [
      { heading: "Using Approved Vendors", items: ["Use vendors from [approvedVendorList] for all standard work", "Do not use unapproved vendors without [vendorManager] sign-off", "Get at least two quotes for any work over [spendApproval]"] },
      { heading: "Assigning Work", items: ["Provide a written scope of work for every job - no verbal-only instructions", "Confirm the timeline and confirm tenant access arrangements if needed", "Confirm the expected invoice amount before work begins"] },
      { heading: "Overseeing the Work", items: ["Check in at the midpoint of larger jobs", "Inspect work before signing off - do not pay until complete and satisfactory", "Collect photos of completed work for the property file"] },
      { heading: "Processing Invoices", items: ["Match invoice to the scope of work and approve for payment", "Flag any invoices that exceed the agreed amount before paying", "File invoice against the correct property and unit"] },
    ],
    notes: "A vendor you trust is worth more than the cheapest quote. Track performance over time and update your approved list accordingly.",
  },

  // ── WELLNESS ───────────────────────────────────────────────────────────────
  {
    id: "w1", industry: "wellness", title: "Client Intake & Health Screening",
    purpose: "Collect the health information needed to provide safe, appropriate services - and protect yourself legally.",
    scope: "Applies to all practitioners and reception staff at first client booking.",
    fields: { businessName: "Business Name", intakeFormLink: "Intake Form Location or Link", retentionPolicy: "Health Information Retention Policy", privacyContact: "Privacy Officer or Owner" },
    steps: [
      { heading: "Before the First Appointment", items: ["Send [intakeFormLink] at time of booking - before arrival, not in the waiting room", "Confirm the form is completed before the appointment begins", "Review the form before seeing the client - flag any contraindications or conditions that need discussion"] },
      { heading: "At the Appointment", items: ["Confirm key health information verbally - don't rely on the form alone", "Ask: any changes since you completed the form?", "Document any verbal additions to the intake in the client file"] },
      { heading: "Storing Health Information", items: ["Store all intake forms per [retentionPolicy] - health information has specific legal requirements in Ontario", "Never leave intake forms visible to other clients or staff without need-to-know", "Digital storage must be secure and access-controlled"] },
      { heading: "Updating Information", items: ["Confirm for returning clients: any changes to your health history since your last visit?", "Update the file with any changes noted", "Flag any changes that may affect the service being provided"] },
    ],
    notes: "Health information is among the most sensitive data you'll handle. How you store and protect it is a legal obligation, not just good practice.",
  },
  {
    id: "w2", industry: "wellness", title: "Appointment Booking & Cancellation",
    purpose: "Manage scheduling clearly and enforce cancellation policy consistently.",
    scope: "Applies to all reception staff and practitioners who manage bookings.",
    fields: { businessName: "Business Name", bookingSystem: "Booking System Used", cancellationPolicy: "Cancellation Policy (e.g. 24 hours notice required)", lateCancel: "Late Cancellation Fee", noShowFee: "No-Show Fee" },
    steps: [
      { heading: "Booking an Appointment", items: ["Confirm all bookings in [bookingSystem] - no informal holds", "Collect name, contact, service requested, and any relevant health notes", "Send confirmation with date, time, location, and cancellation policy", "Collect payment information at booking if [lateCancel] or [noShowFee] policy applies"] },
      { heading: "Reminders", items: ["Send a reminder 48 hours before the appointment", "Send a same-day reminder for new clients or early morning appointments", "Confirm any intake forms are complete"] },
      { heading: "Cancellations", items: ["Apply [cancellationPolicy] consistently - exceptions must be approved by management", "Offer to reschedule at the time of cancellation", "Release the slot immediately in [bookingSystem]"] },
      { heading: "No-Shows", items: ["Attempt to contact the client 15 minutes after the appointment was due to start", "Apply [noShowFee] per policy", "Follow up same day to reschedule - do not let the relationship go cold"] },
    ],
    notes: "Inconsistent cancellation policy enforcement is one of the fastest ways to lose revenue and create resentment among practitioners who hold time for no-shows.",
  },
  {
    id: "w3", industry: "wellness", title: "Treatment Room Setup & Sanitation",
    purpose: "Ensure every treatment room meets consistent safety and sanitation standards between every client.",
    scope: "Applies to all practitioners and any support staff responsible for room setup.",
    fields: { businessName: "Business Name", sanitationStandard: "Sanitation Protocol Document", productLocation: "Sanitation Product Storage Location", inspectionContact: "Quality/Sanitation Check Contact" },
    steps: [
      { heading: "Between Clients", items: ["Remove and launder all used linens - no reuse between clients", "Wipe all surfaces that had client contact with approved sanitizing product from [productLocation]", "Clean and sanitize any tools or equipment used per [sanitationStandard]", "Replace any disposable items", "Allow sanitized surfaces to dry before use"] },
      { heading: "Setting Up for the Next Client", items: ["Fresh linens on the table or chair", "All required products and tools ready and within reach", "Room temperature set appropriately", "Confirm intake form has been reviewed before client arrives"] },
      { heading: "End of Day Deep Clean", items: ["Full wipe-down of all surfaces, equipment, and floors", "Launder all remaining linens", "Dispose of any single-use items and restock supplies for next day", "Log completion in [inspectionContact]'s checklist"] },
      { heading: "Reporting Issues", items: ["Report any equipment malfunction or damage to [inspectionContact] same day", "Do not use equipment that is not functioning correctly", "Report any sanitation standard violations immediately - this is never a small issue"] },
    ],
    notes: "Sanitation compliance is a legal and licensing requirement, not optional. Every practitioner is responsible for their own room.",
  },
  {
    id: "w4", industry: "wellness", title: "Client Retention & Rebooking",
    purpose: "Turn first-time clients into regulars through consistent, intentional follow-up.",
    scope: "Applies to all practitioners and reception staff.",
    fields: { businessName: "Business Name", rebookWindow: "Ideal Rebooking Window for Your Service", followUpDay: "Days After Visit to Send Follow-Up", loyaltyProgram: "Loyalty Program or Referral Incentive (if applicable)" },
    steps: [
      { heading: "At the End of Every Appointment", items: ["Ask: how are you feeling? Give the client a moment to respond before rushing checkout", "Recommend a rebooking timeframe based on the service: [rebookWindow]", "Offer to book the next appointment before they leave - this is the highest-conversion moment"] },
      { heading: "Same-Day Follow-Up", items: ["Send a thank-you message same day - brief and personal, not templated", "Include any aftercare instructions relevant to their service", "Include a link to rebook if they didn't book before leaving"] },
      { heading: "Follow-Up for Clients Who Didn't Rebook", items: ["If no rebook within [followUpDay] days, send a gentle check-in", "Reference their last visit specifically - not a generic message", "Mention any new services, availability, or relevant promotions"] },
      { heading: "Lapsed Clients", items: ["Flag clients who haven't visited in 90+ days for a re-engagement message", "Offer a specific reason to return - [loyaltyProgram] or seasonal promotion", "If no response after two attempts, archive as lapsed - do not over-message"] },
    ],
    notes: "Rebooking at the appointment is 10x easier than winning back a lapsed client. Build the habit of asking every single time.",
  },
  {
    id: "w5", industry: "wellness", title: "Practitioner Handoff & Client Notes",
    purpose: "Ensure client continuity when a client sees a different practitioner.",
    scope: "Applies to all practitioners and clinic or studio managers.",
    fields: { businessName: "Business Name", notesSystem: "Client Notes System", handoffProcess: "Handoff Communication Process", clientConsent: "Client Consent for Note Sharing Process" },
    steps: [
      { heading: "After Every Appointment", items: ["Complete client notes in [notesSystem] before seeing the next client - not at end of day", "Notes should include: what was done, client feedback, any concerns flagged, and recommended next steps", "Keep notes clinical and factual - never include personal opinions about the client"] },
      { heading: "When a Client Sees a Different Practitioner", items: ["Confirm client has signed [clientConsent] for notes to be shared", "Reviewing practitioner reads notes before the appointment - not during", "Greet the client as if you know them - reference their history where appropriate", "Note anything that differs from previous sessions"] },
      { heading: "Client Preferences & Flags", items: ["Document any stated preferences: pressure, temperature, communication style", "Flag any health changes that affect treatment", "Document any previous adverse reactions or complaints"] },
      { heading: "Privacy & Access", items: ["Only practitioners treating the client should access their notes", "Never discuss a client's notes or health history where others can hear", "Lock [notesSystem] when not in use"] },
    ],
    notes: "A client who sees a new practitioner and feels unknown is a client at risk of leaving. Good notes make continuity possible.",
  },
  // ── NOT FOR PROFIT ────────────────────────────────────────────────────────
  {
    id: "n1", industry: "nonprofit", title: "Volunteer Onboarding & Management",
    purpose: "Ensure every volunteer starts with a consistent experience and understands their role, responsibilities, and boundaries.",
    scope: "Applies to all volunteer coordinators and staff who supervise volunteers.",
    fields: { orgName: "Organization Name", volunteerCoordinator: "Volunteer Coordinator Name", roleDescription: "Volunteer Role Description", backgroundCheckPolicy: "Background Check Policy" },
    steps: [
      { heading: "Before the First Shift", items: ["Complete a volunteer application and emergency contact form", "Conduct a background check per [backgroundCheckPolicy] if the role requires it", "Send a welcome email with start date, location, dress code, and what to bring", "Confirm the volunteer understands the role: [roleDescription]"] },
      { heading: "Orientation", items: ["Introduce them to the team and key staff contacts", "Walk through [orgName]'s mission, values, and how their role contributes", "Review policies: confidentiality, code of conduct, media and social media guidelines", "Walk through health and safety procedures relevant to their role", "Pair with an experienced volunteer or staff member for their first shift"] },
      { heading: "Ongoing Management", items: ["Schedule regular check-ins — volunteers are more likely to continue if they feel connected", "Recognize contributions consistently — verbal acknowledgement, volunteer appreciation events", "Address any performance or conduct issues promptly — volunteers are not exempt from standards", "Log hours and track engagement in [volunteerCoordinator]'s system"] },
      { heading: "When a Volunteer Leaves", items: ["Conduct a brief exit conversation — what worked, what didn't, would they recommend volunteering here?", "Revoke any system access or keys on the last day", "Send a genuine thank-you message", "Note their skills and interests in case of future re-engagement"] },
    ],
    notes: "Volunteers who feel well-onboarded are significantly more likely to return and refer others. The investment in a consistent experience pays off in retention.",
  },
  {
    id: "n2", industry: "nonprofit", title: "Donor Relations & Gift Processing",
    purpose: "Ensure every donation is acknowledged promptly, recorded accurately, and that donor relationships are maintained.",
    scope: "Applies to anyone who receives, processes, or acknowledges donations.",
    fields: { orgName: "Organization Name", charityNumber: "CRA Registered Charity Number", receiptingSystem: "Donation Management System", acknowledgementTime: "Target Acknowledgement Time (e.g. within 48 hours)" },
    steps: [
      { heading: "Receiving a Gift", items: ["Record the donation in [receiptingSystem] immediately: donor name, amount, date, method, designated fund if applicable", "Confirm the gift is directed correctly — unrestricted vs. restricted funds", "Flag any gifts with conditions or restrictions for review before accepting"] },
      { heading: "Issuing a Tax Receipt", items: ["Issue official donation receipt with [orgName] and [charityNumber] within [acknowledgementTime]", "Receipt must include: charity name, registration number, date, amount, donor name", "Cash donations over $20 must be receipted — no exceptions", "Digital receipts are acceptable — confirm delivery"] },
      { heading: "Donor Acknowledgement", items: ["Send a personal acknowledgement within [acknowledgementTime] — separate from the tax receipt", "Reference what the gift will support — make it specific, not generic", "For major gifts, a phone call or handwritten note is more appropriate than email", "Log all acknowledgement activity in [receiptingSystem]"] },
      { heading: "Ongoing Donor Stewardship", items: ["Send impact reports or updates to active donors at least annually", "Acknowledge donor milestones: anniversary of first gift, multi-year giving", "Do not contact donors only when you need something — stewardship is year-round", "Flag lapsed donors (12+ months since last gift) for a re-engagement outreach"] },
    ],
    notes: "CRA has specific requirements for official donation receipts. Errors or omissions can result in your charity's ability to issue receipts being revoked. When in doubt, consult your accountant or CRA guidelines.",
  },
  {
    id: "n3", industry: "nonprofit", title: "Board Meeting Management",
    purpose: "Ensure board meetings are well-prepared, productive, and properly documented.",
    scope: "Applies to the Executive Director, Board Chair, and whoever manages governance administration.",
    fields: { orgName: "Organization Name", boardChair: "Board Chair Name", edName: "Executive Director Name", minutesTaker: "Minutes Recorder" },
    steps: [
      { heading: "Two Weeks Before", items: ["Confirm meeting date, time, and location with all board members", "Prepare the agenda in collaboration with [boardChair] and [edName]", "Circulate any materials that require pre-reading — financials, reports, proposals"] },
      { heading: "One Week Before", items: ["Send the full meeting package to all board members: agenda, minutes from last meeting, financial statements, reports", "Confirm attendance and flag any quorum risks", "Prepare any resolutions that require a formal vote"] },
      { heading: "During the Meeting", items: ["[minutesTaker] records attendance, quorum confirmation, all motions, votes, and action items", "Decisions and dissents must be captured accurately", "Action items recorded with: what, who, by when"] },
      { heading: "After the Meeting", items: ["Circulate draft minutes within 5 business days for board review", "File final signed minutes in the governance records", "Follow up on all action items within one week of the meeting", "Update board calendar with next meeting date"] },
    ],
    notes: "Board minutes are legal documents. They must accurately reflect what was decided, not just what was discussed. When in doubt, err on the side of more detail.",
  },
  {
    id: "n4", industry: "nonprofit", title: "Grant Application & Reporting",
    purpose: "Manage grant applications and reporting requirements so no deadlines are missed and funder relationships are protected.",
    scope: "Applies to whoever manages fundraising and funder relations.",
    fields: { orgName: "Organization Name", grantManager: "Grant Manager or ED Name", trackingSystem: "Grant Tracking System", financeContact: "Finance Contact for Budget Preparation" },
    steps: [
      { heading: "Identifying a Grant Opportunity", items: ["Confirm eligibility before investing time in an application", "Log the opportunity in [trackingSystem]: funder, deadline, amount, requirements", "Confirm internal capacity to complete the application and fulfill reporting requirements before applying", "Get [grantManager] sign-off before submitting any application"] },
      { heading: "Preparing the Application", items: ["Read all guidelines carefully — funders disqualify for non-compliance, not just weak applications", "Prepare budget with [financeContact] — ensure it aligns with program costs and funder eligibility rules", "Have a second person review the application before submission", "Submit before the deadline — never on the deadline day if avoidable"] },
      { heading: "After the Decision", items: ["Log the outcome in [trackingSystem]: approved, declined, or pending", "If declined, request feedback where the funder offers it", "If approved: note all reporting requirements and deadlines immediately", "Send a thank-you to the funder regardless of outcome"] },
      { heading: "Grant Reporting", items: ["Set reporting reminders in your calendar the day you receive the grant confirmation", "Track expenditures against the approved budget throughout — don't reconstruct at report time", "Submit reports on time — late reports damage your relationship with the funder", "Keep all receipts and documentation for the full grant period plus any required retention period"] },
    ],
    notes: "Missing a reporting deadline is one of the fastest ways to lose a funder permanently. Build the reporting schedule into your workplan before you spend a single dollar of the grant.",
  },
  {
    id: "n5", industry: "nonprofit", title: "Program Intake & Registration",
    purpose: "Ensure program participants are registered consistently and that required consents and data are captured accurately.",
    scope: "Applies to all program staff who manage participant intake.",
    fields: { orgName: "Organization Name", programName: "Program Name", intakeForm: "Intake Form Location", dataSystem: "Participant Data System", consentForm: "Consent Form Location" },
    steps: [
      { heading: "Receiving an Application or Registration", items: ["Direct all registrations through the official intake process — no informal holds", "Collect a completed [intakeForm] for every participant", "Confirm eligibility criteria are met before confirming registration", "Log in [dataSystem] immediately: name, contact, date, program, status"] },
      { heading: "Consent and Documentation", items: ["Collect signed [consentForm] before the participant accesses any services", "For minors: consent must be from a parent or legal guardian", "Store all consent forms securely — these are legal documents", "Confirm privacy policy has been reviewed and acknowledged"] },
      { heading: "Confirming Registration", items: ["Send written confirmation: program details, start date, location, what to bring, cancellation policy", "Flag any accessibility or accommodation needs to the program lead before the first session", "Confirm any waitlist process if the program is full"] },
      { heading: "During the Program", items: ["Track attendance consistently — often required for funders and regulators", "Log any incidents, concerns, or notable interactions in the participant file", "Update contact information if it changes during the program"] },
    ],
    notes: "Participant data in NFP programs often includes sensitive information about vulnerable populations. How you store, access, and protect that data is a legal and ethical obligation.",
  },
  {
    id: "n6", industry: "nonprofit", title: "Annual Reporting & Compliance",
    purpose: "Ensure all regulatory filings and reporting obligations are met on time, every year.",
    scope: "Applies to the Executive Director and whoever manages finance and governance.",
    fields: { orgName: "Organization Name", fiscalYearEnd: "Fiscal Year End Date", edName: "Executive Director Name", accountant: "Accountant or Auditor Contact", craDeadline: "CRA T3010 Filing Deadline" },
    steps: [
      { heading: "Fiscal Year End Preparation (60 Days Before)", items: ["Confirm all transactions are recorded and reconciled in the accounting system", "Prepare year-end financial statements for board review", "Engage [accountant] for audit or review engagement if required by your bylaws or funders"] },
      { heading: "CRA T3010 Filing", items: ["The T3010 Registered Charity Information Return is due by [craDeadline]", "Complete in full — incomplete returns are returned and can result in late penalties", "Have [edName] and a board member review before submission", "File online through My Business Account where possible — retain confirmation of filing"] },
      { heading: "Annual General Meeting", items: ["Schedule the AGM per your bylaws — typically within a set number of days after fiscal year end", "Prepare the annual report: year in review, financial summary, program outcomes", "File any required updates to corporate registry (Ontario: annual return through ServiceOntario)", "Confirm board composition is current and any required elections are held"] },
      { heading: "After Filings", items: ["Retain all financial records for a minimum of 7 years", "Update signing authorities and banking records if board or ED has changed", "Review insurance coverage annually — confirm it reflects current activities and asset values", "Set reminders for all next-year deadlines before closing the file"] },
    ],
    notes: "A registered charity that fails to file the T3010 for two consecutive years loses its charitable status. This is not a recoverable mistake.",
  },
  {
    id: "n7", industry: "nonprofit", title: "Event Planning & Execution",
    purpose: "Plan and deliver consistent, well-run events that reflect the organization's mission and protect its reputation.",
    scope: "Applies to all staff and volunteers involved in event planning and delivery.",
    fields: { orgName: "Organization Name", eventLead: "Event Lead Name", venueContact: "Venue Contact", budgetApprover: "Budget Approver", volunteerCoordinator: "Volunteer Coordinator" },
    steps: [
      { heading: "Planning (6-8 Weeks Before)", items: ["Define the event purpose: fundraising, awareness, community building, or stewardship?", "Set a realistic budget and get approval from [budgetApprover]", "Confirm venue with [venueContact]: capacity, accessibility, A/V, catering, and any restrictions", "Create a detailed run-of-show timeline for the event day"] },
      { heading: "Preparation (2 Weeks Before)", items: ["Confirm all vendor bookings in writing: caterers, A/V, photographers, speakers", "Brief all staff and volunteers with [volunteerCoordinator] — everyone should know their role and who to escalate to", "Confirm registration numbers and prepare materials accordingly", "Conduct a venue walkthrough — confirm setup plan, emergency exits, accessibility routes"] },
      { heading: "Event Day", items: ["Arrive early — minimum 90 minutes before guests", "Brief the full team on the run-of-show before doors open", "Assign one person to manage issues so others stay on their tasks", "Track attendance if required for funder reporting"] },
      { heading: "After the Event", items: ["Send thank-you messages to attendees, sponsors, volunteers, and speakers within 48 hours", "Reconcile actual expenses against budget and document variances", "Debrief with the team: what worked, what didn't, what to change next year", "File all vendor invoices and donation records from the event"] },
    ],
    notes: "Events are often the most public representation of your organization. The experience reflects directly on your credibility with donors, funders, and community members.",
  },
];

// ── SOP BUILDER ─────────────────────────────────────────────────────────────
function SOPBuilder({ onBack }) {
  const [form, setForm] = useState({
    title: "", purpose: "", scope: "", owner: "", frequency: "",
    steps: [{ heading: "Step 1", items: [""] }],
    notes: "",
  });
  const [preview, setPreview] = useState(false);

  function update(field, val) { setForm((p) => ({ ...p, [field]: val })); }
  function updateStep(i, field, val) {
    setForm((p) => { const s = [...p.steps]; s[i] = { ...s[i], [field]: val }; return { ...p, steps: s }; });
  }
  function updateItem(si, ii, val) {
    setForm((p) => {
      const s = [...p.steps];
      const items = [...s[si].items];
      items[ii] = val;
      s[si] = { ...s[si], items };
      return { ...p, steps: s };
    });
  }
  function addStep() { setForm((p) => ({ ...p, steps: [...p.steps, { heading: `Step ${p.steps.length + 1}`, items: [""] }] })); }
  function addItem(si) {
    setForm((p) => { const s = [...p.steps]; s[si].items = [...s[si].items, ""]; return { ...p, steps: s }; });
  }
  function removeItem(si, ii) {
    setForm((p) => { const s = [...p.steps]; s[si].items = s[si].items.filter((_, i) => i !== ii); return { ...p, steps: s }; });
  }

  if (preview) {
    return (
      <SOPView sop={{
        title: form.title || "Untitled SOP",
        purpose: form.purpose,
        scope: form.scope,
        steps: form.steps.filter(s => s.heading),
        notes: form.notes,
        fields: {},
      }} fieldValues={{ owner: form.owner, frequency: form.frequency }}
        isBuilt={true} onBack={() => setPreview(false)} onBackToLibrary={onBack} />
    );
  }

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" }}>
      <button onClick={onBack} style={backBtnStyle}>← Back to Library</button>
      <h2 style={pageTitle}>Custom SOP Builder</h2>
      <div style={{ width: 36, height: 2, background: AMBER, marginBottom: 24 }} />
      <p style={{ fontSize: 14, color: MOCHA, marginBottom: 32, lineHeight: 1.7 }}>
        Build a custom SOP for any process unique to your business. Fill in the sections below and preview your finished document.
      </p>

      <FormSection title="SOP Basics">
        <FormField label="SOP Title *" value={form.title} onChange={(v) => update("title", v)} placeholder="e.g. Weekly Fleet Inspection, Opening Shift Checklist" />
        <FormField label="Who Owns This Process" value={form.owner} onChange={(v) => update("owner", v)} placeholder="Job title of the person responsible for this SOP" />
        <FormField label="How Often / When It's Used" value={form.frequency} onChange={(v) => update("frequency", v)} placeholder="e.g. Daily, Every client visit, Upon each new hire" />
      </FormSection>

      <FormSection title="Purpose *">
        <textarea value={form.purpose} onChange={(e) => update("purpose", e.target.value)}
          placeholder="Why does this process exist? What does it prevent or ensure?" style={{ ...textareaStyle, rows: 2 }} rows={2} />
      </FormSection>

      <FormSection title="Scope">
        <textarea value={form.scope} onChange={(e) => update("scope", e.target.value)}
          placeholder="Who does this apply to? Under what circumstances?" style={textareaStyle} rows={2} />
      </FormSection>

      <FormSection title="Steps *">
        {form.steps.map((step, si) => (
          <div key={si} style={{ background: "white", border: `1px solid ${LIGHT_TAN}`, borderRadius: 8, padding: "16px 20px", marginBottom: 12 }}>
            <input value={step.heading} onChange={(e) => updateStep(si, "heading", e.target.value)}
              placeholder={`Step ${si + 1} heading`} style={{ ...inputStyle, width: "100%", fontWeight: 700, marginBottom: 10, boxSizing: "border-box" }} />
            {step.items.map((item, ii) => (
              <div key={ii} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                <span style={{ color: CAMEL, fontSize: 14, paddingTop: 10 }}>•</span>
                <input value={item} onChange={(e) => updateItem(si, ii, e.target.value)}
                  placeholder="Describe this step clearly - write it the way you'd explain it to someone new"
                  style={{ ...inputStyle, flex: 1 }} />
                {step.items.length > 1 && (
                  <button onClick={() => removeItem(si, ii)} style={{ background: "none", border: "none", color: CAMEL, cursor: "pointer", fontSize: 18 }}>×</button>
                )}
              </div>
            ))}
            <button onClick={() => addItem(si)} style={{ ...addBtnStyle, fontSize: 11, marginTop: 4 }}>+ Add item</button>
          </div>
        ))}
        <button onClick={addStep} style={addBtnStyle}>+ Add Step</button>
      </FormSection>

      <FormSection title="Notes or Important Reminders">
        <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)}
          placeholder="Anything the person following this SOP should know. Common mistakes, exceptions, or non-obvious context." style={textareaStyle} rows={3} />
      </FormSection>

      <button onClick={() => setPreview(true)} disabled={!form.title || !form.purpose}
        style={{ ...primaryBtn, opacity: form.title && form.purpose ? 1 : 0.5, cursor: form.title && form.purpose ? "pointer" : "default" }}>
        Preview My SOP →
      </button>
    </div>
  );
}

// ── SOP VIEW ────────────────────────────────────────────────────────────────
function SOPView({ sop, fieldValues = {}, isBuilt = false, onBack, onBackToLibrary }) {
  const [values, setValues] = useState(fieldValues);

  function interpolate(text) {
    if (!text) return text;
    return text.replace(/\[(\w+)\]/g, (_, key) => {
      return values[key] ? `<strong>${values[key]}</strong>` : `<span style="color:${AMBER};font-weight:700">[${key}]</span>`;
    });
  }

  function renderHTML(text) {
    return <span dangerouslySetInnerHTML={{ __html: interpolate(text) }} />;
  }

  const hasFields = sop.fields && Object.keys(sop.fields).length > 0;

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" }}>
      <button onClick={onBack} style={backBtnStyle}>← Back</button>

      {hasFields && !isBuilt && (
        <div style={{ background: "white", border: `1px solid ${AMBER}`, borderRadius: 10, padding: "20px 24px", marginBottom: 28 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: DARK_MOCHA, marginBottom: 4 }}>Customize This Template</div>
          <div style={{ fontSize: 12, color: CAMEL, marginBottom: 14 }}>Fill in your business details - they'll replace the placeholders in the SOP below.</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {Object.entries(sop.fields).map(([key, label]) => (
              <div key={key}>
                <label style={{ fontSize: 11, color: CAMEL, display: "block", marginBottom: 4, fontWeight: 600 }}>{label}</label>
                <input value={values[key] || ""} onChange={(e) => setValues((p) => ({ ...p, [key]: e.target.value }))}
                  placeholder={`Enter ${label.toLowerCase()}`} style={{ ...inputStyle, width: "100%", boxSizing: "border-box", fontSize: 12 }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SOP Document */}
      <div style={{ background: "white", borderRadius: 12, border: `1px solid ${LIGHT_TAN}`, overflow: "hidden" }}>
        {/* Header */}
        <div style={{ background: DARK_MOCHA, padding: "24px 32px" }}>
          <div style={{ fontSize: 10, color: CAMEL, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>Standard Operating Procedure</div>
          <div style={{ fontSize: 24, color: IVORY, fontFamily: "Georgia, serif", fontWeight: 700, marginBottom: 4 }}>{sop.title}</div>
          <div style={{ fontSize: 11, color: CAMEL }}>Groundwork Consult · groundworkconsult.ca</div>
        </div>

        <div style={{ padding: "28px 32px" }}>
          {/* Meta */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24, padding: "16px", background: IVORY, borderRadius: 8 }}>
            {[["Purpose", sop.purpose], ["Scope", sop.scope]].map(([label, val]) => val ? (
              <div key={label}>
                <div style={{ fontSize: 10, color: CAMEL, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 13, color: DARK_MOCHA, lineHeight: 1.6 }}>{val}</div>
              </div>
            ) : null)}
          </div>

          {/* Steps */}
          {sop.steps.map((step, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ background: MOCHA, color: IVORY, width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: DARK_MOCHA }}>{step.heading}</div>
              </div>
              <div style={{ marginLeft: 36 }}>
                {step.items.filter(Boolean).map((item, j) => (
                  <div key={j} style={{ display: "flex", gap: 8, marginBottom: 7, fontSize: 13, color: DARK_MOCHA, lineHeight: 1.6 }}>
                    <span style={{ color: AMBER, fontWeight: 700, flexShrink: 0, paddingTop: 1 }}>→</span>
                    <span>{renderHTML(item)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Notes */}
          {sop.notes && (
            <div style={{ background: IVORY, borderLeft: `4px solid ${AMBER}`, borderRadius: "0 8px 8px 0", padding: "14px 18px", marginTop: 8 }}>
              <div style={{ fontSize: 11, color: AMBER, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Note</div>
              <div style={{ fontSize: 13, color: MOCHA, lineHeight: 1.7 }}>{sop.notes}</div>
            </div>
          )}

          <div style={{ marginTop: 24, paddingTop: 16, borderTop: `1px solid ${LIGHT_TAN}`, display: "flex", justifyContent: "space-between", fontSize: 11, color: CAMEL }}>
            <span>Groundwork Consult · groundworkconsult.ca</span>
            <span>Version 1.0 · {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>

      {onBackToLibrary && (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <button onClick={onBackToLibrary} style={{ ...addBtnStyle }}>← Back to Library</button>
        </div>
      )}
    </div>
  );
}

// ── SHARED COMPONENTS ────────────────────────────────────────────────────────
function FormSection({ title, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: DARK_MOCHA, marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 3, height: 14, background: AMBER, borderRadius: 2 }} /> {title}
      </div>
      {children}
    </div>
  );
}

function FormField({ label, value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <label style={{ fontSize: 11, color: CAMEL, display: "block", marginBottom: 5, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        style={{ ...inputStyle, width: "100%", boxSizing: "border-box" }} />
    </div>
  );
}

const inputStyle = { padding: "10px 12px", border: `1px solid ${LIGHT_TAN}`, borderRadius: 6, fontSize: 13, color: DARK_MOCHA, background: "white", outline: "none", fontFamily: "Georgia, serif" };
const textareaStyle = { width: "100%", padding: "10px 12px", border: `1px solid ${LIGHT_TAN}`, borderRadius: 6, fontSize: 13, color: DARK_MOCHA, background: "white", outline: "none", fontFamily: "Georgia, serif", resize: "vertical", boxSizing: "border-box" };
const addBtnStyle = { background: "none", border: `1px dashed ${CAMEL}`, borderRadius: 6, padding: "7px 14px", fontSize: 12, color: CAMEL, cursor: "pointer", fontFamily: "Georgia, serif" };
const primaryBtn = { background: MOCHA, color: IVORY, border: "none", borderRadius: 8, padding: "14px 32px", fontSize: 14, fontWeight: 700, fontFamily: "Georgia, serif", letterSpacing: "0.03em" };
const backBtnStyle = { background: "none", border: "none", color: CAMEL, cursor: "pointer", fontSize: 13, padding: "0 0 20px", display: "block", fontFamily: "Georgia, serif" };
const pageTitle = { fontSize: 28, color: DARK_MOCHA, margin: "0 0 6px", fontFamily: "Georgia, serif", fontWeight: 700 };

// ── MAIN APP ─────────────────────────────────────────────────────────────────
export default function SOPLibrary() {
  const [view, setView] = useState("home"); // home | industry | sop | builder
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [selectedSOP, setSelectedSOP] = useState(null);
  const [search, setSearch] = useState("");

  function goHome() { setView("home"); setSelectedIndustry(null); setSelectedSOP(null); setSearch(""); }
  function goIndustry(id) { setSelectedIndustry(id); setView("industry"); setSearch(""); }
  function goSOP(sop) { setSelectedSOP(sop); setView("sop"); }
  function goBuilder() { setView("builder"); }

  if (view === "sop" && selectedSOP) {
    return (
      <div style={{ minHeight: "100vh", background: IVORY, fontFamily: "Georgia, serif" }}>
        <div style={{ background: DARK_MOCHA, padding: "14px 24px", display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={() => setView("industry")} style={{ ...backBtnStyle, padding: 0, color: CAMEL, fontSize: 13 }}>← Back</button>
          <div style={{ color: "#555", fontSize: 13 }}>/</div>
          <div style={{ color: IVORY, fontSize: 13, fontFamily: "Georgia, serif" }}>{selectedSOP.title}</div>
        </div>
        <SOPView sop={selectedSOP} onBack={() => setView("industry")} onBackToLibrary={goHome} />
      </div>
    );
  }

  if (view === "builder") {
    return (
      <div style={{ minHeight: "100vh", background: IVORY, fontFamily: "Georgia, serif" }}>
        <div style={{ background: DARK_MOCHA, padding: "14px 24px" }}>
          <div style={{ fontSize: 13, color: CAMEL, fontFamily: "Georgia, serif" }}>Groundwork Consult · SOP Builder</div>
        </div>
        <SOPBuilder onBack={goHome} />
      </div>
    );
  }

  if (view === "industry" && selectedIndustry) {
    const industry = INDUSTRIES.find((i) => i.id === selectedIndustry);
    const sops = TEMPLATES.filter((t) => t.industry === selectedIndustry &&
      (!search || t.title.toLowerCase().includes(search.toLowerCase())));

    return (
      <div style={{ minHeight: "100vh", background: IVORY, fontFamily: "Georgia, serif" }}>
        <div style={{ background: DARK_MOCHA, padding: "14px 24px", display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={goHome} style={{ ...backBtnStyle, padding: 0, color: CAMEL, fontSize: 13 }}>← All Packs</button>
          <div style={{ color: "#666", fontSize: 13 }}>/</div>
          <div style={{ color: IVORY, fontSize: 13 }}>{industry.label}</div>
        </div>

        <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 6 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: LIGHT_TAN, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: MOCHA, fontFamily: "'Georgia', serif", flexShrink: 0 }}>
  {industry.icon}
</div>
            <div>
              <h2 style={{ ...pageTitle, margin: 0 }}>{industry.label}</h2>
              <div style={{ fontSize: 13, color: CAMEL }}>{industry.desc}</div>
            </div>
          </div>
          <div style={{ width: 36, height: 2, background: AMBER, margin: "16px 0 24px" }} />

          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search templates..."
            style={{ ...inputStyle, width: "100%", boxSizing: "border-box", marginBottom: 20, fontSize: 14 }} />

          <div style={{ display: "grid", gap: 12 }}>
            {sops.map((sop) => (
              <button key={sop.id} onClick={() => goSOP(sop)} style={{
                background: "white", border: `1px solid ${LIGHT_TAN}`, borderRadius: 10, padding: "18px 22px",
                textAlign: "left", cursor: "pointer", transition: "all 0.15s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = AMBER; e.currentTarget.style.boxShadow = `0 2px 12px rgba(107,79,58,0.1)`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = LIGHT_TAN; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: DARK_MOCHA, marginBottom: 4, fontFamily: "Georgia, serif" }}>{sop.title}</div>
                <div style={{ fontSize: 13, color: MOCHA, lineHeight: 1.6, marginBottom: 8 }}>{sop.purpose}</div>
                <div style={{ fontSize: 11, color: CAMEL }}>{sop.steps.length} sections · {sop.steps.reduce((a, s) => a + s.items.length, 0)} steps</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── HOME ──────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: IVORY, fontFamily: "Georgia, serif" }}>
      <div style={{ background: DARK_MOCHA, padding: "20px 28px" }}>
        <div style={{ fontSize: 11, color: CAMEL, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>Groundwork Consult</div>
        <div style={{ fontSize: 22, color: IVORY, fontFamily: "Georgia, serif", fontWeight: 700 }}>SOP Template Library</div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "36px 20px 60px" }}>
        <p style={{ fontSize: 15, color: MOCHA, lineHeight: 1.7, margin: "0 auto 36px", maxWidth: 520 }}>
          Pre-built, customizable SOPs for the processes every small business needs, and industry-specific packs and a builder for anything custom.
        </p>

        <div style={{ fontSize: 13, fontWeight: 700, color: DARK_MOCHA, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 3, height: 14, background: AMBER, borderRadius: 2 }} />
          Template Packs
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 28 }}>
          {INDUSTRIES.map((ind) => {
            const count = TEMPLATES.filter((t) => t.industry === ind.id).length;
            return (
              <button key={ind.id} onClick={() => goIndustry(ind.id)} style={{
                background: "white", border: `1px solid ${LIGHT_TAN}`, borderRadius: 12, padding: "20px 22px",
                textAlign: "left", cursor: "pointer", transition: "all 0.15s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = ind.color; e.currentTarget.style.boxShadow = `0 4px 16px rgba(0,0,0,0.08)`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = LIGHT_TAN; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: IVORY, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, border: `1px solid ${LIGHT_TAN}`, fontFamily: "'Georgia', serif" }}>{ind.icon}</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: DARK_MOCHA, fontFamily: "Georgia, serif" }}>{ind.label}</div>
                    <div style={{ fontSize: 11, color: CAMEL }}>{count} templates</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: MOCHA }}>{ind.desc}</div>
              </button>
            );
          })}
        </div>

        <div style={{ fontSize: 13, fontWeight: 700, color: DARK_MOCHA, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 3, height: 14, background: AMBER, borderRadius: 2 }} />
          Build Your Own
        </div>
        <button onClick={goBuilder} style={{
          background: "white", border: `2px dashed ${CAMEL}`, borderRadius: 12, padding: "22px 24px",
          textAlign: "left", cursor: "pointer", width: "100%", transition: "all 0.15s",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = MOCHA; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = CAMEL; }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: DARK_MOCHA, marginBottom: 4, fontFamily: "Georgia, serif" }}>Custom SOP Builder</div>
          <div style={{ fontSize: 13, color: MOCHA }}>Build a formatted SOP from scratch for any process unique to your business.</div>
        </button>

        <div style={{ textAlign: "center", marginTop: 40, fontSize: 12, color: CAMEL }}>
          groundworkconsult.ca · jennifer@groundworkconsult.ca
        </div>
      </div>
    </div>
  );
}

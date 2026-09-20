export const programJourney = [
  "Direction",
  "Development",
  "Application",
  "Preparation",
  "Opportunity",
] as const;

export const conceptualProgramRoles = [
  {
    title: "Direction",
    copy: "Help a student understand the work they are exploring before choosing what to develop.",
  },
  {
    title: "Development",
    copy: "Give learning a defined purpose and a clearer relationship to that direction.",
  },
  {
    title: "Application",
    copy: "Create room to use knowledge in context and reflect on the decisions involved.",
  },
  {
    title: "Preparation",
    copy: "Help students practise explaining their experience for an opportunity conversation.",
  },
] as const;

export const studentProgramQuestions = [
  "What role or area of work am I preparing for?",
  "What capability am I trying to develop?",
  "What will I have a chance to practise?",
  "What should I be able to discuss afterward?",
] as const;

export const programEvaluationPrinciples = [
  "Begin with a defined student need",
  "State the intended stage of the journey",
  "Describe the learning and application honestly",
  "Separate completion from employment outcomes",
  "Publish details only after business and product approval",
] as const;

export const programBoundaries = [
  "A certificate treated as proof of employability",
  "A job-ready or placement-ready guarantee",
  "Guaranteed internships, interviews, hiring access, or salaries",
  "Unverified project, mentorship, industry, or placement support",
  "Unapproved pricing, duration, eligibility, or enrollment details",
] as const;

export const programFaqs = [
  {
    question: "Are programs part of the Pathwisse approach?",
    answer:
      "Programs may support a defined stage within the broader Pathwisse employability journey. No specific Pathwisse program is currently verified for publication.",
  },
  {
    question: "Are programs the same as courses?",
    answer:
      "The intended distinction is purpose: a structured program should connect development to a defined need in the wider journey. The exact format of any Pathwisse offering still requires business confirmation.",
  },
  {
    question: "Do programs guarantee placements?",
    answer:
      "No. A program cannot guarantee an internship, interview, job, salary, or placement result.",
  },
  {
    question: "Can colleges explore the program approach?",
    answer:
      "Yes. Colleges and universities can request a conversation about their context. Any program scope or delivery detail discussed must still be confirmed before it is treated as an offering.",
  },
] as const;

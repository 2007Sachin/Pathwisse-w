export const aboutJourney = [
  "Direction",
  "Development",
  "Application",
  "Demonstration",
  "Preparation",
  "Opportunity",
] as const;

export const beliefs = [
  {
    title: "Learning needs context",
    copy: "Development choices become easier to question when students know what they are building toward.",
  },
  {
    title: "Capability matters more than accumulation",
    copy: "More courses and certificates do not automatically create a clearer account of what someone can do.",
  },
  {
    title: "Application matters",
    copy: "Learning becomes more concrete when students use it, encounter decisions, and reflect on the result.",
  },
  {
    title: "Students should be able to explain their work",
    copy: "Employability includes describing the problem, the contribution, the choices made, and what was learned.",
  },
  {
    title: "Placement preparation should not be isolated",
    copy: "Preparation is more coherent when it draws on the development and applied work that came before it.",
  },
] as const;

export const employabilityElements = [
  "A direction to explore",
  "Development relevant to that direction",
  "Application of learning in context",
  "Communication about the work and decisions involved",
  "Preparation for an opportunity conversation",
] as const;

export const companyFacts = [
  {
    label: "Company",
    value: "Shaquantum Labs Private Limited",
    status: "VERIFIED",
  },
  {
    label: "Role",
    value: "Builder of Pathwisse",
    status: "APPROVED",
  },
] as const;

// UNKNOWN and intentionally not rendered: team identities, founding date,
// registered location, office locations, investors, employee count, awards,
// customer proof, and approved company website destination.

export const claimBoundaries = [
  "one course guarantees employability",
  "a certificate guarantees capability",
  "Pathwisse guarantees a placement or salary outcome",
  "one score can completely define someone’s readiness or potential",
  "AI should decide someone’s career",
] as const;

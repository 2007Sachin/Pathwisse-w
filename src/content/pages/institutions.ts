export const institutionActivities = [
  "Academic learning",
  "Training",
  "Skill programs",
  "Projects",
  "Placement preparation",
] as const;

export const institutionJourney = [
  "Direction",
  "Relevant development",
  "Application",
  "Demonstration",
  "Placement preparation",
  "Opportunity",
] as const;

export const studentDevelopmentJourney = [
  "Enters with uncertainty",
  "Gains a clearer direction",
  "Develops relevant capability",
  "Applies learning",
  "Prepares to discuss the work",
  "Enters placement conversations",
] as const;

export const tpoQuestions = [
  "Are students clear about the roles they are preparing for?",
  "Are development activities connected to placement preparation?",
  "Can students talk about the work they have done?",
  "Is preparation beginning before final placement events?",
] as const;

export const pathwisseConnections = [
  {
    title: "Student direction",
    copy: "A clearer context for deciding what development should support.",
  },
  {
    title: "Development activity",
    copy: "Learning considered in relation to the work students are exploring.",
  },
  {
    title: "Applied work",
    copy: "Experience students can reflect on and learn to explain.",
  },
  {
    title: "Placement preparation",
    copy: "Preparation connected to the journey that came before it.",
  },
  {
    title: "Institutional employability strategy",
    copy: "A shared way to keep the stages connected across the student journey.",
  },
] as const;

export const implementationPrinciples = [
  "Start with a clearly defined employability objective",
  "Align the journey to the student group and its context",
  "Introduce programs at the stage they are intended to support",
  "Keep the purpose and expectations clear for students",
  "Review outcomes honestly and distinguish learning from placement results",
] as const;

export const trustPrinciples = [
  "Use transparent, bounded claims",
  "Treat student information responsibly",
  "Keep placement outcomes separate from preparation",
  "Replace marketing assumptions with approved product proof",
  "Publish privacy and security specifics only after verification",
] as const;

export const institutionFaqs = [
  {
    question: "Is Pathwisse an LMS?",
    answer:
      "Pathwisse focuses on the journey from direction to placement preparation. It isn’t positioned to replace your verified learning systems.",
  },
  {
    question: "Is Pathwisse a placement management system?",
    answer:
      "Its public focus is development before and around placement preparation. Any overlap with placement workflows must be evaluated against the verified product rather than assumed from this website.",
  },
  {
    question: "Does Pathwisse guarantee placement outcomes?",
    answer:
      "No. Placement depends on many factors beyond a platform or program. Pathwisse does not promise placements, salaries, rankings, or accreditation outcomes.",
  },
  {
    question: "Where do programs fit?",
    answer:
      "A structured program may support a particular stage such as direction, development, or placement preparation. Exact programs, formats, access details, and outcomes require verification before publication.",
  },
] as const;

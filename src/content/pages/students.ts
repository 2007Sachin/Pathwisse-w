export const studentWork = [
  "Classes",
  "Courses",
  "Workshops",
  "Assignments",
  "Projects",
  "Certificates",
  "Placement preparation",
] as const;

export const studentPrinciples = {
  direction: {
    eyebrow: "Start with direction",
    title: "A destination makes the next choice clearer.",
    lead: "You don’t need a perfect career answer—just enough context to choose what’s next.",
    points: [
      "Explore the work behind a role",
      "Notice what that work asks of you",
      "Prioritise learning that has a reason",
    ],
  },
  development: {
    eyebrow: "Build with purpose",
    title: "Another course is not always the next step.",
    lead: "Development helps more when it connects to your direction.",
    contrast: ["More activity", "More relevant activity"],
  },
  application: {
    eyebrow: "Apply what you learn",
    title: "Use learning on a real task.",
    lead: "Projects and practical problems reveal decisions that completion alone may not show.",
    note: "Learning is easier to discuss once it has been used.",
  },
  demonstration: {
    eyebrow: "Something to talk about",
    title: "Move from a skill label to an example.",
    lead: "A label like Python or Excel says little about how you used it.",
    before: "I know this.",
    after: "Here is where I used it, what I did, and what I learned.",
  },
  preparation: {
    eyebrow: "Prepare for placement conversations",
    title: "Your work still needs a clear explanation.",
    lead: "Preparation can mean describing a project and connecting it to the role in front of you.",
  },
} as const;

export const aanyaJourney = [
  "Unsure where to focus",
  "Chooses a clearer direction",
  "Builds relevant capability",
  "Applies learning",
  "Develops examples she can discuss",
  "Prepares to communicate them",
] as const;

export const pathwisseFit = [
  "Career direction",
  "Relevant development",
  "Application",
  "Placement preparation",
] as const;

export const studentFaqs = [
  {
    question: "Is Pathwisse another course platform?",
    answer:
      "Pathwisse is being built around connecting direction, development, application, and preparation. Programs may support parts of it.",
  },
  {
    question: "Does Pathwisse guarantee a job?",
    answer:
      "No. No platform or program can guarantee a job. Pathwisse is focused on a clearer employability journey and preparation for opportunity, not a promised placement result.",
  },
  {
    question: "Do I need to know my career role already?",
    answer:
      "No. Direction can begin as an informed area to explore. The aim is to make your next learning decision more relevant, not to force a permanent career choice.",
  },
  {
    question: "Where do programs fit?",
    answer:
      "A structured program may support a particular stage of the employability journey. Program names, formats, access details, and outcomes will only be published after they are verified.",
  },
] as const;

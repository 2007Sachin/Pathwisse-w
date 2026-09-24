export const studentWork = [
  "Classes",
  "Courses",
  "Workshops",
  "Assignments",
  "Projects",
  "Certificates",
  "Placement preparation",
] as const;

export const studentQuestions = [
  "Which role am I actually preparing for?",
  "What should I work on next?",
  "Which skills matter for that direction?",
  "How does this project connect to hiring?",
  "What will I say when someone asks what I can do?",
] as const;

export const studentPrinciples = {
  direction: {
    eyebrow: "Start with direction",
    title: "A destination makes the next choice easier to question.",
    lead: "You do not need a perfect career answer. You need enough context to decide what deserves your attention next.",
    points: [
      "Explore the work behind a role",
      "Notice what that work asks of you",
      "Prioritise learning that has a reason",
    ],
  },
  development: {
    eyebrow: "Build with purpose",
    title: "Another course is not always the next step.",
    lead: "Development becomes more useful when it connects to the direction you are exploring instead of adding another disconnected completion.",
    contrast: ["More activity", "More relevant activity"],
  },
  application: {
    eyebrow: "Apply what you learn",
    title: "Apply what you learn in a practical context.",
    lead: "A project, assignment, case, or practical problem can reveal the decisions and limitations that completion alone may not show.",
    note: "The point is simple: learning is easier to discuss when it has been used on a real task.",
  },
  demonstration: {
    eyebrow: "Have something you can talk about",
    title: "Move from a skill label to an example.",
    lead: "A label such as Excel, Python, marketing, or data analysis says little about what happened when you used it.",
    before: "I know this.",
    after: "Here is where I used it, what I did, and what I learned.",
  },
  preparation: {
    eyebrow: "Prepare for placement conversations",
    title: "Your work still needs a clear explanation.",
    lead: "Preparation can include articulating experience in a resume, discussing a project, and connecting your contribution to the role in front of you.",
    note: "The goal is to make your work easier to explain when an opportunity conversation arrives.",
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
      "Pathwisse is being built around the connection between career direction, relevant development, application, and preparation. Programs may support parts of that journey, but a catalogue of courses is not the whole idea.",
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

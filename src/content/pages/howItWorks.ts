export const employabilityJourney = [
  "Direction",
  "Development",
  "Application",
  "Demonstration",
  "Preparation",
  "Opportunity",
] as const;

export const fragmentedJourney = [
  "Education",
  "Courses",
  "Certificates",
  "Projects",
  "Placement preparation",
  "Hiring",
] as const;

export const approachStages = [
  {
    number: "01",
    id: "direction",
    eyebrow: "Direction",
    title: "Start with a clearer destination.",
    lead: "Direction gives learning a context before it becomes another disconnected activity.",
    body: [
      "No perfect career answer is needed on day one. Start by understanding what a role involves.",
    ],
    contrast: "A direction to explore with intent.",
  },
  {
    number: "02",
    id: "development",
    eyebrow: "Relevant development",
    title: "Build for the work ahead.",
    lead: "Development becomes more intentional when it is connected to a destination.",
    body: [
      "Random learning creates activity. Relevant development asks how each skill relates to the work ahead.",
    ],
    contrast:
      "Less accumulation for its own sake. More attention to relevance.",
  },
  {
    number: "03",
    id: "application",
    eyebrow: "Application",
    title: "Use learning in context.",
    lead: "Knowledge becomes easier to understand when it is put to work.",
    body: [
      "Projects and real problems surface decisions and trade-offs that completion may not reveal.",
    ],
    contrast: "Learning → doing → reflection.",
  },
  {
    number: "04",
    id: "demonstration",
    eyebrow: "Demonstration",
    title: "Make the work discussable.",
    lead: "Employability asks students to explain what they did, not only what they completed.",
    body: [
      "Can the student describe the problem, their contribution, their choices, and what they would improve?",
    ],
    contrast:
      "An example that can be explained—not a credential treated as proof.",
  },
  {
    number: "05",
    id: "preparation",
    eyebrow: "Placement preparation",
    title: "Prepare for the conversation.",
    lead: "The final transition requires more than having completed the work.",
    body: [
      "Students need to connect their work to the opportunity in front of them—in a resume or interview.",
    ],
    contrast: "Prepare to communicate capability without claiming certainty.",
  },
] as const;

export const studentPerspective = [
  "A clearer sense of where you are heading",
  "More intentional development choices",
  "A practical connection between learning and doing",
  "Better preparation to discuss what you have done",
] as const;

export const institutionPerspective = [
  "Treat employability as a journey, not only a placement-season activity",
  "Think about development and placement preparation together",
  "Design student journeys with greater intention",
] as const;

export const boundaries = [
  "Employment cannot be reduced to a platform promise",
  "One program should not be treated as a complete path to future preparation",
  "Certificates need context before they can explain capability",
  "Student preparation should not be reduced to one universal measure",
] as const;

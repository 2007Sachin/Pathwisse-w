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
      "A student does not need a perfect career answer on day one. A useful direction can begin with understanding the kind of work a role involves and the expectations that surround it.",
      "The principle is simple: learning choices become easier to question when there is a destination against which to judge their relevance.",
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
      "Random learning can create activity without helping a student understand what matters next. Relevant development asks how a skill, concept, or experience relates to the work being explored.",
      "Development becomes more useful when each activity has a clearer reason for being there.",
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
      "Projects, assignments, practical work, and bounded real problems can help students encounter the decisions, limitations, and trade-offs that completion alone may not reveal.",
      "Learning becomes easier to explain when students have a concrete place to use it.",
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
      "A project can become more meaningful when a student can describe the problem, their contribution, the choices they made, and what they would improve.",
      "The value is in making the work understandable, not treating an artifact as proof by itself.",
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
      "Students may need to articulate experience in a resume, discuss decisions in an interview, and connect examples of work to the opportunity in front of them.",
      "Preparation helps students connect the work they have done with the conversation ahead.",
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

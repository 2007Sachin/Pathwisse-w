export const contactPage = {
  title: "Request a conversation",
  description:
    "Request a conversation about how Pathwisse could support a more connected employability journey at your institution.",
  eyebrow: "For colleges and universities",
  heading: "Let’s talk about your students’ employability journey.",
  introduction:
    "Tell us where your institution is starting and what you are trying to understand. This first conversation is for exploring fit—not making promises about outcomes.",
} as const;

export const conversationTopics = [
  "Where students currently experience gaps between learning and placement preparation",
  "How faculty, mentors, and placement teams might contribute to a more connected journey",
  "Where applied work and industry context could support that journey",
] as const;

export const emailCopy = {
  eyebrow: "Start the conversation",
  heading: "Email us to begin.",
  introduction:
    "Online demo requests are being set up. For now, the best way to reach the Pathwisse team is by email.",
  includeHeading: "It helps to include",
  include: [
    "Your name and role",
    "Your institution",
    "What you would like to discuss",
  ],
  privacyNote:
    "Please do not include student records or sensitive personal information.",
} as const;

export const nextSteps = [
  {
    title: "You reach out",
    copy: "Share who you are, your institution, and what you'd like to discuss.",
  },
  {
    title: "We respond",
    copy: "A team member will reply within a few business days to understand your needs.",
  },
  {
    title: "Let's talk",
    copy: "We'll schedule a conversation to explore how Pathwisse might fit with your institution's direction.",
  },
] as const;

// Used by DemoRequestForm.astro, which is not rendered until a form provider
// is approved.
export const alternativePaths = [
  {
    href: "/how-it-works",
    title: "Understand the approach",
    copy: "See how Pathwisse thinks about direction, development, application, and opportunity.",
  },
  {
    href: "/institutions",
    title: "Explore the institution perspective",
    copy: "Read the fuller story for colleges, universities, and placement teams.",
  },
  {
    href: "/students",
    title: "Looking for student guidance?",
    copy: "Visit the Students page instead of sharing student information here.",
  },
] as const;

import { site } from "../content/site";

// No form provider is selected, so there is no submission endpoint and the
// request form (DemoRequestForm.astro) is not rendered on any page. When a
// provider is approved, set `endpoint` and render the form again.
export const contactSubmission = {
  endpoint: null as string | null,
  fallbackEmail: site.contactEmail,
} as const;

export const contactSubmissionMessages = {
  submitting: "Sending your request…",
  success: "Thanks. We’ve received your request.",
  successDetail:
    "We’ll use the information you shared to understand the context for the conversation.",
  failure: "We couldn’t send your request. Please try again.",
  unavailable: "Online demo requests are being set up.",
  fallbackPrefix: "You can contact us at",
} as const;

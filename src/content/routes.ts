import type { RouteDefinition } from "../types/site";

export const routes: RouteDefinition[] = [
  { label: "Home", href: "/", description: "Pathwisse public homepage." },
  {
    label: "How It Works",
    href: "/how-it-works",
    description: "The connected Pathwisse employability approach.",
  },
  {
    label: "For Students",
    href: "/students",
    description: "A student-first view of the employability journey.",
  },
  {
    label: "For Institutions",
    href: "/institutions",
    description: "The institution perspective on employability development.",
  },
  {
    label: "Programs",
    href: "/programs",
    description: "How programs may fit the wider employability journey.",
  },
  {
    label: "About",
    href: "/about",
    description: "About Pathwisse and Shaquantum Labs Private Limited.",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Request an institution conversation.",
  },
];

import { productLinks } from "./site";
import type { CTAConfig, NavItem } from "../types/site";

export const primaryNavigation: NavItem[] = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "For Students", href: "/students" },
  { label: "For Institutions", href: "/institutions" },
  { label: "Programs", href: "/programs" },
  { label: "About", href: "/about" },
];

export const navigationActions: CTAConfig[] = [
  { label: "Sign In", href: productLinks.signIn, variant: "utility" },
  { label: "Get Started", href: productLinks.getStarted, variant: "primary" },
];

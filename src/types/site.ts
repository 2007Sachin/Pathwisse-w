export interface NavItem {
  label: string;
  href: string;
}

export interface CTAConfig extends NavItem {
  variant: "primary" | "utility";
}

export interface SiteMetadata {
  name: string;
  company: string;
  defaultTitle: string;
  defaultDescription: string;
  siteUrl: string;
  contactEmail: string;
}

export interface RouteDefinition extends NavItem {
  description: string;
}

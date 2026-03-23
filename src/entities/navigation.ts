// Navigation entity
export interface NavItem {
  path: string;
  label: string;
}

// Social link entity
export interface SocialLink {
  href: string;
  label: string;
  icon: string;
}

// Site configuration entity
export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  email: string;
  author: string;
  keywords: string[];
}

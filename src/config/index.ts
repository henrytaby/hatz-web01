// ============================================
// Application Configuration - Henry Taby Web Platform
// ============================================

import type { NavItem, SocialLink } from "@/types";

// Navigation items
export const navigationItems: NavItem[] = [
  { path: "/", label: "Inicio" },
  { path: "/about", label: "Acerca de mí" },
  { path: "/blog", label: "Blog" },
  { path: "/work", label: "Proyectos" },
  { path: "/contact", label: "Contacto" },
];

// Social links
export const socialLinks: SocialLink[] = [
  {
    href: "https://github.com/henrytaby/",
    label: "GitHub",
    icon: "github",
  },
  {
    href: "https://www.linkedin.com/in/henrytaby/",
    label: "LinkedIn",
    icon: "linkedin",
  },
  {
    href: "https://x.com/henrytaby/",
    label: "X (Twitter)",
    icon: "twitter",
  },
  {
    href: "https://www.youtube.com/henrytaby",
    label: "YouTube",
    icon: "youtube",
  },
];

// Site metadata
export const siteConfig = {
  name: "Henry Taby",
  title: "Henry Taby | Software Developer - Fotógrafo",
  description: "Portafolio de Henry Taby, Software Developer & Fotógrafo.",
  url: "https://henrytaby.com",
  email: "hola@henrytaby.com",
  author: "Henry Taby",
  keywords: [
    "Henry Taby",
    "Software Developer",
    "Fotógrafo",
    "Full Stack",
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    "Bolivia",
  ],
};

// Categories configuration
export const blogCategories = [
  { slug: "frontend", label: "Frontend", description: "React, Next.js, CSS, UI/UX" },
  { slug: "backend", label: "Backend", description: "Node.js, Python, APIs, Bases de datos" },
  { slug: "devops", label: "DevOps", description: "Docker, AWS, CI/CD, Infraestructura" },
  { slug: "architecture", label: "Arquitectura", description: "Clean Architecture, SOLID, Patrones" },
  { slug: "photography", label: "Fotografía", description: "Técnicas, Equipo, Proyectos" },
  { slug: "personal", label: "Personal", description: "Reflexiones, Experiencias" },
] as const;

export const workCategories = [
  { slug: "fullstack", label: "Full Stack", description: "Proyectos completos frontend + backend" },
  { slug: "frontend", label: "Frontend", description: "Interfaces y experiencias de usuario" },
  { slug: "backend", label: "Backend", description: "APIs y sistemas de servidor" },
  { slug: "consulting", label: "Consultoría", description: "Asesoría técnica y arquitectura" },
] as const;

// Constants
export const ITEMS_PER_PAGE = 6;
export const RELATED_ITEMS_LIMIT = 3;
export const MAX_WIDTH = "1440px";

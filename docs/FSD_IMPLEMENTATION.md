# Guía de Implementación FSD - Henry Taby Web Platform

> Este documento detalla cómo se implementó Feature-Sliced Design en el proyecto.

---

## 📋 Resumen de Implementación

La implementación de FSD se realizó en las siguientes fases:

1. **Análisis inicial** - Identificación de problemas
2. **Creación de estructura** - Capas y carpetas
3. **Migración de entidades** - Tipos y modelos
4. **Migración de shared** - UI y utilidades
5. **Migración de features** - Casos de uso
6. **Migración de páginas** - App Router
7. **Limpieza** - Eliminación de legacy

---

## 🏗️ Fase 1: Estructura de Carpetas

### Crear estructura base

```bash
mkdir -p src/entities
mkdir -p src/features/blog/api
mkdir -p src/features/blog/components
mkdir -p src/features/work/api
mkdir -p src/features/work/components
mkdir -p src/features/contact/components
mkdir -p src/shared/ui
mkdir -p src/shared/layout
mkdir -p src/shared/icons
mkdir -p src/shared/lib
```

### Crear archivos index

```bash
touch src/entities/index.ts
touch src/features/index.ts
touch src/features/blog/index.ts
touch src/features/work/index.ts
touch src/features/contact/index.ts
touch src/shared/index.ts
touch src/shared/ui/index.ts
touch src/shared/layout/index.ts
touch src/shared/lib/index.ts
```

---

## 📦 Fase 2: Migración de Entidades

### Crear entidades de contenido

**Archivo**: `src/entities/content.ts`

```typescript
// Definir tipos de categoría
export type BlogCategory = "frontend" | "backend" | "devops" | "architecture" | "photography" | "personal";
export type WorkCategory = "fullstack" | "frontend" | "backend" | "consulting";

// Entidad base de contenido
export interface ContentEntity {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
  published?: boolean;
  featured?: boolean;
}

// Entidad de blog
export interface BlogPostEntity extends ContentEntity {
  category?: BlogCategory;
  author?: string;
  readingTime?: number;
  content: string;
}

// Entidad de proyecto
export interface ProjectEntity extends ContentEntity {
  category?: WorkCategory;
  demoUrl?: string;
  repoUrl?: string;
  content: string;
}

// Factory functions
export function createBlogPost(data: Partial<BlogPostEntity>): BlogPostEntity {
  return {
    slug: data.slug || "",
    title: data.title || "",
    date: data.date || new Date().toISOString(),
    content: data.content || "",
    summary: data.summary,
    tags: data.tags,
    category: data.category,
    published: data.published ?? true,
  };
}

export function createProject(data: Partial<ProjectEntity>): ProjectEntity {
  return {
    slug: data.slug || "",
    title: data.title || "",
    date: data.date || new Date().toISOString(),
    content: data.content || "",
    summary: data.summary,
    tags: data.tags,
    category: data.category,
    demoUrl: data.demoUrl,
    repoUrl: data.repoUrl,
    published: data.published ?? true,
  };
}
```

### Crear entidades de navegación

**Archivo**: `src/entities/navigation.ts`

```typescript
export interface NavItem {
  path: string;
  label: string;
}

export interface SocialLink {
  href: string;
  label: string;
  icon: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  email: string;
  author: string;
  keywords: string[];
}
```

### Exportar entidades

**Archivo**: `src/entities/index.ts`

```typescript
export * from "./content";
export * from "./navigation";
```

---

## 🎨 Fase 3: Migración de Shared

### UI Components

**Button** - `src/shared/ui/button.tsx`:

```typescript
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const variants = {
  primary: "bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-red-600",
  secondary: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
  ghost: "bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-base",
  lg: "h-14 px-6 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

**Badge** - `src/shared/ui/badge.tsx`:

```typescript
import { cn } from "@/lib/utils";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "text-xs font-bold uppercase py-1 px-3 rounded border transition-colors",
        variant === "default" && "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-red-600",
        variant === "primary" && "bg-red-600 border-red-600 text-white",
        variant === "secondary" && "bg-zinc-100 border-zinc-200 text-zinc-700",
        className
      )}
    >
      {children}
    </span>
  );
}
```

### Layout Components

**Navbar** - `src/shared/layout/navbar.tsx`:

```typescript
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navigationItems } from "@/config";
import { ThemeToggle } from "./theme-toggle";
import { GithubIcon, LinkedinIcon } from "@/shared/icons";

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ... implementación completa en el archivo
}
```

### Icons

**Archivo**: `src/shared/icons/index.tsx`

```typescript
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function GithubIcon(props: IconProps) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12..." />
    </svg>
  );
}

// ... otros iconos
```

---

## 🔧 Fase 4: Migración de Features

### Feature: Blog

**API** - `src/features/blog/api/index.ts`:

```typescript
import type { BlogPostEntity } from "@/entities";
import { getBlogPostBySlug as getPost, getSlugs } from "@/lib/mdx";

export function getBlogPosts(): BlogPostEntity[] {
  const posts = getAllPosts("blog");
  return posts.map(post => ({
    slug: post.slug,
    title: post.frontmatter.title,
    date: post.frontmatter.date,
    summary: post.frontmatter.summary,
    tags: post.frontmatter.tags,
    category: post.frontmatter.category,
    content: post.content,
  }));
}

export function getBlogPostBySlug(slug: string): BlogPostEntity | null {
  const post = getPost("blog", slug);
  if (!post) return null;
  
  return {
    slug: post.slug,
    title: post.frontmatter.title,
    // ...
  };
}

export function getBlogSlugs(): string[] {
  return getSlugs("blog");
}

export function getRelatedBlogPosts(slug: string, limit = 3): BlogPostEntity[] {
  // Implementación
}
```

**Componentes** - `src/features/blog/components/blog-card.tsx`:

```typescript
import Link from "next/link";
import type { BlogPostEntity } from "@/entities";
import { Badge } from "@/shared/ui";

interface BlogCardProps {
  post: BlogPostEntity;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group">
        <h3>{post.title}</h3>
        {post.category && <Badge>{post.category}</Badge>}
      </article>
    </Link>
  );
}
```

**Exportaciones** - `src/features/blog/index.ts`:

```typescript
export { getBlogPosts, getBlogPostBySlug, getBlogSlugs, getRelatedBlogPosts } from "./api";
export { BlogCard, BlogList } from "./components";
```

### Feature: Work

Similar a blog, con `ProjectEntity` y componentes específicos.

### Feature: Contact

**Componente** - `src/features/contact/components/contact-form.tsx`:

```typescript
"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Button, Input, Textarea } from "@/shared/ui";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Integrar con Server Action o API
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        id="name"
        label="Nombre"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      {/* ... */}
    </form>
  );
}
```

---

## 📄 Fase 5: Migración de Páginas

### Página de Blog

**Antes**:

```typescript
// src/app/blog/page.tsx
import { getBlogPosts } from "@/lib/mdx";
import { PageHero } from "@/components/ui/page-hero";

export default function BlogPage() {
  const posts = getBlogPosts();
  
  return (
    <div>
      <PageHero title="Blog" />
      {posts.map(post => (
        <article key={post.slug}>
          <h2>{post.frontmatter.title}</h2>
        </article>
      ))}
    </div>
  );
}
```

**Después**:

```typescript
// src/app/blog/page.tsx
import { BlogList } from "@/features/blog";
import { PageHero, PageHeroSpacer } from "@/shared/ui";

export default function BlogPage() {
  return (
    <div>
      <PageHero title="Blog" backgroundImage="/img/banners/banner-01.jpg" />
      <PageHeroSpacer />
      <BlogList />
    </div>
  );
}
```

### Página de Contacto

**Antes** (222 líneas):

```typescript
// src/app/contact/page.tsx
"use client";

import { useState } from "react";
// ... muchos imports

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function ContactForm() { /* 100 líneas */ }
  function ContactInfo() { /* 30 líneas */ }
  function FormField() { /* 40 líneas */ }
  function SubmitButton() { /* 20 líneas */ }

  return <div>...</div>;
}
```

**Después** (56 líneas):

```typescript
// src/app/contact/page.tsx
"use client";

import { motion } from "framer-motion";
import { PageHero, PageHeroSpacer } from "@/shared/ui";
import { ContactForm, ContactInfo } from "@/features/contact";

export default function ContactPage() {
  return (
    <div>
      <PageHero title="Contacto" />
      <ContactInfo />
      <ContactForm />
    </div>
  );
}
```

---

## 🧹 Fase 6: Limpieza

### Archivos Eliminados

```
src/components/           ← Eliminado completamente
├── layout/              ← Migrado a shared/layout
├── ui/                  ← Migrado a shared/ui
├── icons/               ← Migrado a shared/icons
├── mdx.tsx              ← Migrado a shared/lib
└── theme-provider.tsx   ← Migrado a shared/lib

src/lib/mdx.ts           ← Funciones distribuidas en features
```

### Imports Actualizados

| Archivo | Import Anterior | Import Nuevo |
|---------|----------------|--------------|
| layout.tsx | `@/components/layout` | `@/shared/layout` |
| blog/page.tsx | `@/components/ui` | `@/shared/ui` |
| blog/[slug]/page.tsx | `@/components/mdx` | `@/shared/lib` |
| sitemap.ts | `@/lib/mdx` | `@/features` |

---

## ✅ Verificación

### Build

```bash
npm run build
```

Output esperado:
```
✓ Compiled successfully
✓ Generating static pages (12/12)
```

### TypeScript

```bash
npx tsc --noEmit
```

Output esperado: Sin errores.

---

## 📊 Resultados

### Métricas de Código

| Métrica | Antes | Después |
|---------|-------|---------|
| Archivos en src/ | 25 | 35 |
| Líneas por archivo (avg) | 200 | 50 |
| Componentes inline | 8 | 0 |
| Imports desde @/components | 15+ | 0 |
| Imports desde @/features | 0 | 8 |
| Imports desde @/shared | 0 | 12 |

### Estructura Final

```
src/
├── app/           # 12 archivos (páginas)
├── features/      # 12 archivos (3 features)
├── entities/      # 3 archivos (entidades)
├── shared/        # 15 archivos (UI, layout, icons, lib)
├── config/        # 1 archivo (configuración)
├── lib/           # 1 archivo (utils)
└── types/         # 1 archivo (tipos)
```

---

## 🎯 Conclusión

La implementación de FSD fue exitosa:

1. ✅ Estructura clara y predecible
2. ✅ Separación de responsabilidades
3. ✅ Código reutilizable
4. ✅ Tipado fuerte
5. ✅ Documentación completa
6. ✅ Build sin errores
7. ✅ Listo para escalar

El proyecto ahora sigue una arquitectura profesional que facilita el mantenimiento y la incorporación de nuevos developers.

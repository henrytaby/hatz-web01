# Gemini AI Context & Memory
> *Project: Henry Taby Personal Web Platform*

## 🤖 Persona & Identity Overview

**Role**: Senior Full-Stack Engineer / Jamstack Architect.

**Expertise**:
- Modern Frontend ecosystems (Next.js 16 App Router, React Server Components).
- Extreme UI/UX design quality (Vercel/Linear aesthetics, Glassmorphism, Tailwind v4).
- Web performance tuning (100% SSG, Core Web Vitals).
- Scalable architecture with Feature-Sliced Design (FSD).
- Custom MDX engines using Node.js APIs with `next-mdx-remote/rsc`.
- **Accessibility (WCAG 2.1 AA)**: ARIA labels, focus management, keyboard navigation.

---

## 🧠 Architectural Memory (The "Henry Taby Web" Project)

El proyecto es un portfolio profesional y blog técnico construido con **arquitectura Feature-Sliced Design (FSD)**.

### 1. The Strict Guidelines

- **Mandatory Tech**: Next.js 16 (App Router), TypeScript (Strict Mode), Tailwind CSS v4, Local MDX files.
- **Architecture**: Feature-Sliced Design (FSD) con capas: app → features → entities → shared.
- **Forbidden Tech**: 
  - ❌ CMS externos (Sanity, Strapi, Contentful)
  - ❌ `contentlayer` (deprecated)
  - ❌ Imports relativos entre capas
  - ❌ Componentes inline en páginas
- **Design Directive**: Estética "Senior 10x Developer" con jerarquía visual fuerte, interacciones rápidas y tipografía brutalist/minimalist.
- **Accessibility**: WCAG 2.1 AA compliance con ARIA labels, focus management, keyboard navigation.
- **Terminology**: Sección de portfolio en `/work` (no `/projects`) para alinear con estándares corporativos de *Deep Case Studies*.

---

### 2. Arquitectura FSD Implementada

```
src/
├── app/                    # Capa de Aplicación
│   ├── layout.tsx         # Layout raíz con Navbar, Footer, ThemeProvider
│   ├── page.tsx           # Home
│   ├── about/             # Página "Acerca de mí"
│   ├── blog/              # Blog pages
│   │   ├── page.tsx       # Lista de posts
│   │   └── [slug]/page.tsx # Post individual (SSG)
│   ├── contact/           # Formulario de contacto
│   └── work/              # Portfolio pages
│       ├── page.tsx       # Lista de proyectos
│       └── [slug]/page.tsx # Proyecto individual (SSG)
├── features/              # Capa de Features
│   ├── blog/              # Feature: Blog
│   │   ├── api/           # getBlogPosts, getBlogPostBySlug...
│   │   └── components/    # BlogCard, BlogList
│   ├── work/              # Feature: Work
│   │   ├── api/           # getWorkProjects, getWorkProjectBySlug...
│   │   └── components/    # WorkCard, WorkList
│   └── contact/           # Feature: Contact
│       └── components/    # ContactForm, ContactInfo
├── entities/              # Capa de Entidades
│   ├── content.ts         # BlogPostEntity, ProjectEntity
│   └── navigation.ts      # NavItem, SiteConfig
└── shared/                # Capa Shared
    ├── ui/                # Button, Badge, Card, Input, Textarea, PageHero
    ├── layout/            # Navbar, Footer, ThemeToggle
    ├── icons/             # GithubIcon, LinkedinIcon, etc.
    └── lib/               # CustomMDX, ThemeProvider
```

### Reglas de Dependencia

```
app → features → entities → shared
```

**IMPORTANTE**: Una capa SOLO puede importar de capas inferiores, NUNCA de superiores.

---

### 3. Core Implementation Decisions

#### A. Feature-Sliced Design (FSD)

El proyecto implementa FSD Simplificado, ideal para proyectos small/medium:

- **app/**: Páginas delgadas que delegan a features
- **features/**: Casos de uso con API y componentes
- **entities/**: Modelos de negocio tipados
- **shared/**: Recursos reutilizables sin lógica de negocio

#### B. El Motor MDX Local

**Features** (`src/features/blog/api/`, `src/features/work/api/`):
- Funciones de obtención de datos tipadas
- Retornan entidades (`BlogPostEntity`, `ProjectEntity`)
- Usan `fs`, `path` y `gray-matter`

**Shared Lib** (`src/shared/lib/mdx.tsx`):
- `CustomMDX` component para renderizar MDX
- Usa `next-mdx-remote/rsc` (Server Components)
- `rehype-pretty-code` para syntax highlighting
- Componentes custom para h1, h2, p, blockquote, etc.

#### C. Performance via SSG

Todas las rutas dinámicas usan `generateStaticParams`:
- `/blog/[slug]` - Posts generados en build-time
- `/work/[slug]` - Proyectos generados en build-time
- `sitemap.xml` - Generado dinámicamente desde features

#### D. UI/UX Aesthetic Rules

- **Dark Mode**: CSS Variables con `next-themes`
- **Visuals**: 
  - Navbar glassmorphism sticky
  - Hero con tipografía masiva y gradientes ambientales
  - Cards con hover effects
  - `lucide-react` para iconografía

#### E. Accessibility Implementation ✅

**Navbar** (`src/shared/layout/navbar.tsx`):
- `role="banner"`, `role="dialog"`, `aria-modal="true"`
- `aria-expanded`, `aria-controls`, `aria-haspopup` en botón menú
- Focus management: focus se mueve al botón cerrar al abrir menú
- Tab trap dentro del menú móvil
- Escape key cierra el menú
- `focus-visible:ring-2` para indicadores visuales

**Formularios** (`src/features/contact/components/contact-form.tsx`, `src/shared/ui/input.tsx`):
- `aria-required="true"` en campos requeridos
- `aria-describedby` vinculado a hints
- `aria-invalid` cuando hay errores
- `role="alert"` y `aria-live="polite"` para errores
- Screen reader announcements para envío exitoso
- `autoComplete` attributes para email

**Tarjetas** (`src/features/blog/components/blog-card.tsx`, `src/features/work/components/work-card.tsx`):
- `<article>` elements con `aria-labelledby`
- `aria-describedby` para resúmenes
- `role="list"` para tags
- `aria-label` para enlaces externos (GitHub, Live demo)
- `aria-hidden="true"` para iconos decorativos

---

### 4. Estructura de Contenido

**Blog** (`content/blog/*.mdx`):
```yaml
---
title: "Título"
date: "2024-01-15"
summary: "Resumen"
tags: ["react", "typescript"]
category: "frontend"
---
```

**Work** (`content/work/*.mdx`):
```yaml
---
title: "Proyecto"
date: "2024-01-15"
summary: "Resumen"
tags: ["nextjs", "tailwind"]
category: "fullstack"
demoUrl: "https://..."
repoUrl: "https://github.com/..."
---
```

---

### 5. Comandos Clave

```bash
# Desarrollo
npm run dev

# Build producción
npm run build

# Verificar tipos
npx tsc --noEmit

# Linting
npm run lint
```

---

### 6. Documentación

| Documento | Propósito |
|-----------|-----------|
| `docs/ARCHITECTURE.md` | Guía didáctica FSD para nuevos developers |
| `docs/ANALYSIS.md` | Análisis del proyecto y métricas (Score: 7.9/10) |
| `docs/FSD_IMPLEMENTATION.md` | Detalles de implementación FSD |
| `README.md` | Overview del proyecto |
| `gemini.md` | Contexto para AI assistants |

---

### 7. Estado Actual

- ✅ Arquitectura FSD completamente implementada
- ✅ Todas las páginas migradas a FSD
- ✅ Componentes legacy eliminados
- ✅ Build verificado sin errores
- ✅ Documentación completa
- ✅ **Accesibilidad mejorada (Score: 9/10)**
- ✅ Listo para Vercel

---

### 8. Próximos Pasos Recomendados

1. **Testing**: Jest + React Testing Library por feature
2. **Validación**: Zod para formularios con Server Actions
3. **Storybook**: Documentar componentes de shared/ui
4. **ESLint FSD**: Reglas de boundaries entre capas
5. **PWA**: Service Worker para offline support

---

## 📌 Notas para AI Assistants

Cuando trabajes en este proyecto:

1. **Respeta la arquitectura FSD**: app → features → entities → shared
2. **Usa imports con alias**: `@/features`, `@/shared`, `@/entities`
3. **Tipa todo**: Usa las entidades de `@/entities`
4. **Server Components por defecto**: Solo "use client" cuando sea necesario
5. **Componentes pequeños**: Un archivo = una responsabilidad
6. **Lee la documentación**: `docs/ARCHITECTURE.md` tiene la guía completa
7. **Accesibilidad**: Siempre incluye ARIA labels, focus management, keyboard navigation

---

## 📊 Score del Proyecto

| Categoría | Score |
|-----------|-------|
| Arquitectura | 9/10 |
| Clean Code | 8/10 |
| SOLID | 8/10 |
| Escalabilidad | 9/10 |
| Testing | 3/10 |
| Documentación | 9/10 |
| Performance | 8/10 |
| **Accesibilidad** | **9/10** |
| SEO | 8/10 |
| **TOTAL** | **7.9/10** |

---

*Última actualización: 2026-03-24*

# AI Agent Instructions & Project Context
> *Project: Henry Taby Personal Web Platform*

## 🚨 CRITICAL FRAMEWORK RULES (Next.js)
<!-- BEGIN:nextjs-agent-rules -->
**This is NOT the Next.js you know.**
This version uses Next.js 16.2.1 (App Router). It has breaking changes — APIs, conventions, and file structure may all differ from your training data. 
- Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. 
- Heed deprecation notices. 
- ALWAYS use Server Components by default. Only use `"use client"` when interactivity or React hooks are strictly required.
<!-- END:nextjs-agent-rules -->

---

## 🤖 Persona & Identity Overview

**Role**: Senior Full-Stack Engineer / Jamstack Architect.

**Expertise**:
- Modern Frontend ecosystems.
- Extreme UI/UX design quality (Vercel/Linear aesthetics, Glassmorphism, Tailwind v4).
- Web performance tuning (100% SSG, Core Web Vitals).
- Scalable architecture with Feature-Sliced Design (FSD).
- Custom MDX engines using Node.js APIs with `next-mdx-remote/rsc`.
- **Accessibility (WCAG 2.1 AA)**: ARIA labels, focus management, keyboard navigation.

---

## 🧠 Project Overview & Tech Stack

- **Name**: Henry Taby Web Platform (Personal Portfolio & Technical Blog)
- **Author**: Henry Taby
- **Status**: Production Ready (Score: 7.9/10)
- **Tech Stack**:

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.2.1 | React Framework with App Router |
| React | 19.2.4 | UI library |
| TypeScript | 5.x | Static typing (strict mode) |
| Tailwind CSS | 4.x | Utility-first styling |
| Framer Motion | 12.38.x | Animations |
| next-mdx-remote | 6.x | Structured content (MDX) |
| next-themes | 0.4.x | Dark/Light theme |
| lucide-react | 0.577.x | Icons |

**Build Commands**:
- `npm run dev` — Development server (Turbopack)
- `npm run build` — Production build
- `npm run lint` — ESLint check
- `npx tsc --noEmit` — TypeScript type checking

**Score Breakdown**:

| Category | Score |
|----------|-------|
| Architecture | 9/10 |
| Clean Code | 8/10 |
| SOLID | 8/10 |
| Scalability | 9/10 |
| Testing | 3/10 |
| Documentation | 9/10 |
| Performance | 8/10 |
| Accessibility | 9/10 |
| SEO | 8/10 |

---

## 🗂️ Routes & Content Structure

| Route | Description | Type |
|-------|-------------|------|
| `/` | Home page | Static |
| `/about` | About me | Static |
| `/blog` | Blog list | Static |
| `/blog/[slug]` | Blog post | SSG |
| `/work` | Portfolio list | Static |
| `/work/[slug]` | Project detail | SSG |
| `/contact` | Contact form | Static |

- **Blog posts**: `content/blog/*.mdx`
- **Projects**: `content/work/*.mdx`

---

## 🏗️ Architecture: Feature-Sliced Design (FSD)

This project strictly follows Feature-Sliced Design (FSD) Simplificado.
**Unidirectional dependencies**: A layer can ONLY import from layers below it.

`app` → `features` → `entities` → `shared`

- `app` imports from `features`, `entities`, `shared`
- `features` imports from `entities`, `shared`
- `entities` imports from `shared`
- `shared` imports from NOTHING (only external packages)

### app/ — Application Layer

**Purpose**: Entry points, pages, layouts, global providers.
**Rules**: Pages must be thin, delegating logic to features. No business logic in pages. Use `generateStaticParams` for dynamic routes (SSG).

```
app/
├── layout.tsx         # Root layout (Navbar, Footer, ThemeProvider)
├── page.tsx           # Home page
├── about/page.tsx     # About page
├── blog/
│   ├── page.tsx       # Blog list
│   └── [slug]/page.tsx # Blog post (SSG)
├── contact/page.tsx   # Contact form
├── work/
│   ├── page.tsx       # Portfolio list
│   └── [slug]/page.tsx # Project detail (SSG)
├── globals.css
├── robots.ts
└── sitemap.ts
```

### features/ — Business Features Layer

**Purpose**: User interactions, use cases, feature-specific logic.
**Rules**: Each feature is self-contained. Export via `index.ts` barrel file. Can have `api/` and `components/` subdirectories.

| Feature | API Functions | Components |
|---------|---------------|------------|
| `blog` | getBlogPosts, getBlogPostBySlug, getBlogSlugs, getRelatedBlogPosts, getBlogCategories, getBlogTags | BlogCard, BlogList |
| `work` | getWorkProjects, getWorkProjectBySlug, getWorkSlugs, getRelatedWorkProjects, getWorkCategories, getWorkTags | WorkCard, WorkList |
| `contact` | — | ContactForm, ContactInfo |

```
features/
├── index.ts
├── blog/
│   ├── index.ts
│   ├── api/index.ts
│   └── components/ (blog-card.tsx, blog-list.tsx)
├── work/
│   ├── index.ts
│   ├── api/index.ts
│   └── components/ (work-card.tsx, work-list.tsx)
└── contact/
    ├── index.ts
    └── components/ (contact-form.tsx, contact-info.tsx)
```

### entities/ — Business Entities Layer

**Purpose**: Domain models, data structures, business rules.
**Rules**: Define TypeScript interfaces. Provide factory functions. No UI components.

| Entity | Key Fields | Factory |
|--------|-----------|---------|
| `ContentEntity` (base) | slug, title, date, summary?, tags?, published, featured? | — |
| `BlogPostEntity` | + category?, author?, readingTime?, content | createBlogPost |
| `ProjectEntity` | + category?, githubUrl?, liveUrl?, client?, duration?, content | createProject |
| `NavItem` | path, label | — |
| `SocialLink` | href, label, icon | — |
| `SiteConfig` | name, title, description, url, email, author, keywords[] | — |
| `IContentRepository<T>` | getAll, getBySlug, getRelated, getCategories, getTags | — |
| `BlogCategory` | `"frontend" \| "backend" \| "devops" \| "architecture" \| "photography" \| "personal"` | — |
| `WorkCategory` | `"fullstack" \| "frontend" \| "backend" \| "mobile" \| "consulting"` | — |

> **Note on `src/types/`**: Contains auxiliary types (`BaseFrontmatter`, `ContentFilter`, `PaginationOptions`, `PaginatedResult`). Some types (`NavItem`, `SocialLink`, `BlogCategory`, `WorkCategory`) are duplicated in both `types/` and `entities/`; **`entities/` is the canonical source**.

```
entities/
├── index.ts          # Re-exports from content.ts and navigation.ts
├── content.ts        # ContentEntity, BlogPostEntity, ProjectEntity, categories, IContentRepository, factories
└── navigation.ts     # NavItem, SocialLink, SiteConfig
```

### shared/ — Shared Layer

**Purpose**: Reusable resources without business logic.
**Rules**: No business logic. Must be usable by any feature. Export via `index.ts` barrel files.

| Module | Contents |
|--------|----------|
| `ui/` | Button, Badge, Card, Input, Textarea, PageHero, PageHeroSpacer |
| `layout/` | Navbar, Footer, ThemeToggle |
| `icons/` | GithubIcon, LinkedinIcon, TwitterIcon, YouTubeIcon |
| `lib/` | CustomMDX, ThemeProvider |

```
shared/
├── index.ts
├── ui/ (index.ts, button.tsx, badge.tsx, card.tsx, input.tsx, page-hero.tsx)
├── layout/ (index.ts, navbar.tsx, footer.tsx, theme-toggle.tsx)
├── icons/ (index.tsx)
└── lib/ (index.ts, mdx.tsx, theme-provider.tsx)
```

---

## 💻 Coding Standards & Rules

### TypeScript & Imports
- **Strict Mode**: No `any` types. Use proper interfaces from `@/entities`. Explicit return types for public functions.
- **Interface over Type**: Prefer interfaces for object shapes.
```typescript
// ✅ Correct
interface BlogPostEntity { slug: string; title: string; }
function getBlogPosts(): BlogPostEntity[] { ... }
// ❌ Wrong
function getBlogPosts(): any[] { ... }
```
- **Import Aliases**: MUST use `@/features`, `@/entities`, `@/shared`. ❌ NO relative imports between layers.
- **Import Order**:
  1. React/Next
  2. External packages (framer-motion, lucide-react)
  3. Internal aliases (FSD layers top to bottom)
  4. Relative imports (same layer only)
```typescript
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { BlogCard } from "@/features/blog";
import { Button } from "@/shared/ui";
import type { BlogPostEntity } from "@/entities";
import { helper } from "./utils";
```

### React Components
- **Server Components by default**. Only use `"use client"` when: hooks (useState, useEffect), event handlers (onClick, onChange), or Browser APIs.
- **Structure**: Imports → Interface → Component (Hooks at top → Handlers → Render).
```typescript
import { useState } from "react";
import { Button } from "@/shared/ui";
import type { BlogPostEntity } from "@/entities";

interface BlogCardProps { post: BlogPostEntity; showTags?: boolean; }

export function BlogCard({ post, showTags = true }: BlogCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => { /* ... */ };
  return <article>...</article>;
}
```
- **Naming**: Components `PascalCase`, Functions `camelCase`, Constants `SCREAMING_SNAKE_CASE`, Files `kebab-case.tsx`, Directories `kebab-case`.
- **File Size Limits**:

| Type | Max Lines | Recommendation |
|------|-----------|----------------|
| Page component | 100 | ~50 lines |
| Feature component | 150 | ~80 lines |
| Shared component | 100 | ~50 lines |
| API function file | 200 | ~100 lines |

### Tailwind CSS v4 Rules
- **Order**: Layout → Spacing → Sizing → Typography → Colors → Effects
```typescript
className="flex flex-col gap-4 p-8 w-full text-lg text-foreground bg-card rounded-xl shadow-lg"
```
- **v4 Syntax Strict**: Use `className="leading-[1.05]!"` and `z-9999`. ❌ DO NOT USE v3 syntax like `!leading-[1.05]` or `z-[9999]`.
- **Mobile-first**: `className="text-2xl md:text-4xl lg:text-6xl"`

### Error Handling & Comments
- Always use `try/catch` with meaningful console errors.
```typescript
// ✅ Correct
try {
  const posts = await getBlogPosts();
} catch (error) {
  console.error("Failed to fetch blog posts:", error);
  return [];
}
```
- Comments should explain WHY, not WHAT.
```typescript
// ✅ Prevent body scroll when mobile menu is open
document.body.style.overflow = "hidden";
// ❌ Set overflow to hidden
document.body.style.overflow = "hidden";
```
- Use JSDoc for Public APIs.
```typescript
/**
 * Retrieves all blog posts from the file system.
 * @returns Array of blog post entities, sorted by date (newest first)
 */
export async function getBlogPosts(): Promise<BlogPostEntity[]> { ... }
```

---

## ♿ Accessibility (WCAG 2.1 AA)

- **ARIA Attributes**:
```typescript
<button aria-label="Close menu"><X aria-hidden="true" /></button>
<input aria-required="true" aria-invalid={error ? "true" : undefined} aria-describedby="field-hint" />
<a href="..." target="_blank" rel="noopener noreferrer" aria-label="View GitHub profile (opens in new tab)">
```
- **Focus Management**: ALWAYS include `focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`. Handle focus explicitly for modals/dialogs.
```typescript
useEffect(() => { if (isOpen) closeButtonRef.current?.focus(); }, [isOpen]);
```
- **Semantic HTML**:
```typescript
// ✅ <article aria-labelledby="title-id"><h2 id="title-id">Title</h2><p>Description</p></article>
// ❌ <div><div>Title</div><div>Description</div></div>
```

---

## 🧩 Shared Components Reference

Do not reinvent these; import from `@/shared/...`:

| Component | Import | Props | Notes |
|-----------|--------|-------|-------|
| Button | `@/shared/ui` | variant: `primary\|secondary\|ghost\|danger`, size: `sm\|md\|lg`, disabled, className | Primary action button |
| Badge | `@/shared/ui` | variant: `default\|primary\|outline` | Tag/label for categories |
| Card | `@/shared/ui` | — | Composed: CardHeader, CardTitle, CardDescription, CardFooter |
| Input | `@/shared/ui` | id, label, type, error, hint, required | Form input with label & error |
| Textarea | `@/shared/ui` | id, label, error, hint, required | Multiline form input |
| PageHero | `@/shared/ui` | title, subtitle, backgroundImage | Ken Burns animation banner |
| PageHeroSpacer | `@/shared/ui` | — | Spacer for hero offset |
| Navbar | `@/shared/layout` | — | Glassmorphism, mobile menu, ARIA, focus trap, Escape key |
| Footer | `@/shared/layout` | — | Site footer with social links |
| ThemeToggle | `@/shared/layout` | — | Dark/light mode toggle |
| CustomMDX | `@/shared/lib` | source: string | MDX renderer with syntax highlighting |
| ThemeProvider | `@/shared/lib` | children | Theme context provider |
| GithubIcon | `@/shared/icons` | className | SVG icon |
| LinkedinIcon | `@/shared/icons` | className | SVG icon |
| TwitterIcon | `@/shared/icons` | className | SVG icon |
| YouTubeIcon | `@/shared/icons` | className | SVG icon |

**Input/Textarea Accessibility**: `aria-required` for required fields, `aria-invalid` for error state, `aria-describedby` linked to hint/error.

---

## 🔧 Feature Components Reference

| Component | Import | Props | Notes |
|-----------|--------|-------|-------|
| BlogCard | `@/features/blog` | post: BlogPostEntity, showTags?: boolean | Blog post summary card |
| BlogList | `@/features/blog` | posts: BlogPostEntity[] | List of blog cards |
| WorkCard | `@/features/work` | project: ProjectEntity | Project summary card |
| WorkList | `@/features/work` | projects: ProjectEntity[] | List of work cards |
| ContactForm | `@/features/contact` | onSubmit: (data: ContactFormData) => void | Form with validation |
| ContactInfo | `@/features/contact` | email: string, availabilityText?: string | Contact information display |

**ContactForm Accessibility**: `aria-required` on required fields, `aria-describedby` for hints, screen reader announcements for success.

---

## ⚙️ Config & Site Metadata

`src/config/index.ts` contains:

- `navigationItems` — NavItem[] (5 items: Inicio, Acerca de mí, Blog, Proyectos, Contacto)
- `socialLinks` — SocialLink[] (GitHub, LinkedIn, X/Twitter, YouTube)
- `siteConfig` — { name, title, description, url, email, author, keywords[] }
- `blogCategories` — 6 categories (frontend, backend, devops, architecture, photography, personal) with slug, label, description
- `workCategories` — 4 categories (fullstack, frontend, backend, consulting) with slug, label, description
- `ITEMS_PER_PAGE = 6`
- `RELATED_ITEMS_LIMIT = 3`
- `MAX_WIDTH = "1440px"`

---

## 📌 Rules for Adding New Code

- **New Features**: Create `src/features/[name]/` with `index.ts`, `api/`, and `components/`. Export from `src/features/index.ts`.
- **New Entities**: Define interface in `src/entities/[name].ts` and export from `src/entities/index.ts`.
- **New Shared**: Create in `ui/`, `layout/`, or `icons/` and export properly via barrel files.

---

## 🧪 Skills Convention

Project skills are located in `.agents/skills/[skill-name]/SKILL.md`.
- **Format**: YAML frontmatter (`name`, `description`) + Markdown body.
- **Loading**: Skills are loaded on demand — the agent reads the description and decides whether to activate.
- **Naming**: `kebab-case`, max 64 chars, must match the directory name.
- **To create a skill**: `mkdir -p .agents/skills/my-skill &&` create `SKILL.md`.

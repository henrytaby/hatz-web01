# Architecture - Feature-Sliced Design (FSD)

## Overview

This project uses **Feature-Sliced Design (FSD) Simplificado**, a modern frontend architecture pattern that organizes code by business features rather than technical types.

## Layer Structure

```
src/
├── app/          # Application Layer - Pages, layouts, global providers
├── features/     # Business Features - Use cases, user interactions
├── entities/     # Business Entities - Domain models, data structures
└── shared/       # Shared Layer - Reusable UI, utilities, constants
```

## Dependency Rule

**Unidirectional dependencies**: A layer can ONLY import from layers below it.

```
app → features → entities → shared
```

- `app` imports from `features`, `entities`, `shared`
- `features` imports from `entities`, `shared`
- `entities` imports from `shared`
- `shared` imports from NOTHING (only external packages)

## Layers Detail

### 1. app/ - Application Layer

**Purpose**: Entry points, pages, layouts, global providers

**Rules**:
- Pages should be thin, delegating logic to features
- No business logic in pages
- Use `generateStaticParams` for dynamic routes (SSG)

**Structure**:
```
app/
├── layout.tsx           # Root layout with Navbar, Footer, ThemeProvider
├── page.tsx             # Home page
├── about/page.tsx       # About page
├── blog/
│   ├── page.tsx         # Blog list
│   └── [slug]/page.tsx  # Blog post (SSG)
├── contact/page.tsx     # Contact form
└── work/
    ├── page.tsx         # Portfolio list
    └── [slug]/page.tsx  # Project detail (SSG)
```

### 2. features/ - Business Features Layer

**Purpose**: User interactions, use cases, feature-specific logic

**Rules**:
- Each feature is self-contained
- Export via `index.ts` barrel file
- Can have `api/` and `components/` subdirectories

**Current Features**:
| Feature | API Functions | Components |
|---------|---------------|------------|
| `blog` | getBlogPosts, getBlogPostBySlug, getBlogSlugs, getRelatedBlogPosts | BlogCard, BlogList |
| `work` | getWorkProjects, getWorkProjectBySlug, getWorkSlugs, getRelatedWorkProjects | WorkCard, WorkList |
| `contact` | - | ContactForm, ContactInfo |

**Structure**:
```
features/
├── blog/
│   ├── index.ts
│   ├── api/index.ts
│   └── components/blog-card.tsx, blog-list.tsx
├── work/
│   ├── index.ts
│   ├── api/index.ts
│   └── components/work-card.tsx, work-list.tsx
└── contact/
    ├── index.ts
    └── components/contact-form.tsx, contact-info.tsx
```

### 3. entities/ - Business Entities Layer

**Purpose**: Domain models, data structures, business rules

**Rules**:
- Define TypeScript interfaces
- Provide factory functions for creation
- No UI components

**Current Entities**:
| Entity | Fields | Factory |
|--------|--------|---------|
| `BlogPostEntity` | slug, title, date, summary, tags, category, content | createBlogPost |
| `ProjectEntity` | slug, title, date, summary, tags, category, demoUrl, repoUrl, liveUrl, githubUrl | createProject |
| `NavItem` | path, label | - |
| `SiteConfig` | name, title, description, url, email, author | - |

**Structure**:
```
entities/
├── index.ts
├── content.ts      # BlogPostEntity, ProjectEntity
└── navigation.ts   # NavItem, SiteConfig
```

### 4. shared/ - Shared Layer

**Purpose**: Reusable resources without business logic

**Rules**:
- No business logic
- Must be usable by any feature
- Export via `index.ts` barrel files

**Modules**:
| Module | Contents |
|--------|----------|
| `ui/` | Button, Badge, Card, Input, Textarea, PageHero |
| `layout/` | Navbar, Footer, ThemeToggle |
| `icons/` | GithubIcon, LinkedinIcon, TwitterIcon, YouTubeIcon |
| `lib/` | CustomMDX, ThemeProvider |

**Structure**:
```
shared/
├── index.ts
├── ui/
│   ├── index.ts
│   ├── button.tsx
│   ├── badge.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── page-hero.tsx
├── layout/
│   ├── index.ts
│   ├── navbar.tsx
│   ├── footer.tsx
│   └── theme-toggle.tsx
├── icons/
│   └── index.tsx
└── lib/
    ├── index.ts
    ├── mdx.tsx
    └── theme-provider.tsx
```

## Import Aliases

Use TypeScript path aliases for clean imports:

```typescript
// ✅ Correct
import { BlogCard } from "@/features/blog"
import { Button } from "@/shared/ui"
import type { BlogPostEntity } from "@/entities"

// ❌ Wrong (relative imports between layers)
import { BlogCard } from "../features/blog"
```

## Adding New Features

1. Create feature directory: `src/features/new-feature/`
2. Create `index.ts` for exports
3. Create `api/` for data functions (if needed)
4. Create `components/` for UI components
5. Export from `src/features/index.ts`

## Adding New Entities

1. Define interface in `src/entities/new-entity.ts`
2. Create factory function (optional)
3. Export from `src/entities/index.ts`

## Adding New Shared Components

1. Create component in appropriate module (ui/, layout/, icons/)
2. Export from module's `index.ts`
3. Export from `src/shared/index.ts`

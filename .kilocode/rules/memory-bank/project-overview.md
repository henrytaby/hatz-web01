# Project Overview - Henry Taby Web Platform

## Project Identity

**Name**: Henry Taby Web Platform
**Type**: Personal Portfolio & Technical Blog
**Author**: Henry Taby
**Status**: Production Ready

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.2.1 | React Framework with App Router |
| TypeScript | 5.x | Static typing |
| Tailwind CSS | 4.x | Utility-first styling |
| MDX | next-mdx-remote | Structured content |
| Framer Motion | 11.x | Animations |
| next-themes | 0.x | Dark/Light theme |
| lucide-react | - | Icons |

## Architecture

**Pattern**: Feature-Sliced Design (FSD) Simplificado

```
src/
├── app/          # Application layer (pages)
├── features/     # Business features (use cases)
├── entities/     # Business entities (models)
└── shared/       # Shared resources (UI, lib)
```

## Key Features

1. **Blog**: Technical articles with MDX
2. **Work**: Portfolio projects showcase
3. **Contact**: Contact form with validation
4. **About**: Personal information page

## Pages

| Route | Description | Type |
|-------|-------------|------|
| `/` | Home page | Static |
| `/about` | About me | Static |
| `/blog` | Blog list | Static |
| `/blog/[slug]` | Blog post | SSG |
| `/work` | Portfolio list | Static |
| `/work/[slug]` | Project detail | SSG |
| `/contact` | Contact form | Static |

## Content Structure

- **Blog posts**: `content/blog/*.mdx`
- **Projects**: `content/work/*.mdx`

## Build Commands

```bash
npm run dev      # Development server
npm run build    # Production build
npm run lint     # ESLint check
```

## Project Score

**Total**: 7.9/10

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

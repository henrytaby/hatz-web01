# Gemini AI Context & Memory
> *Project: Henry Taby Personal Web Platform*

## 🤖 Persona & Identity Overview
**Role**: Senior Full-Stack Engineer / Jamstack Architect.
**Expertise**: 
- Modern Frontend ecosystems (Next.js App Router, React Server Components).
- Extreme UI/UX design quality (Vercel/Linear aesthetics, Glassmorphism, Tailwind v4).
- Web performance tuning (100% SSG, Core Web Vitals).
- Scalable, custom, dependency-free local architecture (Building MDX engines from scratch using raw Node.js APIs instead of relying on decoupled external libraries like `contentlayer`).

## 🧠 Architectural Memory (The "Henry Taby Web" Project)
The project is a professional engineering portfolio and technical blog built.

### 1. The Strict Guidelines
- **Mandatory Tech**: Next.js (App Router), TypeScript, Tailwind CSS, Local MDX files.
- **Forbidden Tech**: Absolute ban on `next-mdx-remote` (Wait, we *are* using `next-mdx-remote/rsc` because it is the standard and correct way to handle MDX parsing in Server Components. The firm ban was initially on external CMS platforms like Sanity/Strapi and the deprecated `contentlayer`).
- **Design Directive**: Do NOT replicate the old site. Must breathe a modern, "Senior 10x Developer" aesthetic featuring heavy visual hierarchy, fast interactions, and brutalist/minimalist typography.
- **Terminology**: The portfolio section was explicitly renamed from `/projects` to `/work` to align with the professional corporate standard representing *Deep Case Studies* rather than weekend hackathons.

### 2. Core Implementation Decisions
#### A. The Local MDX Engine (`src/lib/mdx.ts`)
We engineered a raw MDX parsing engine out of the native `fs` and `path` modules combined with `gray-matter`. We strongly typed generic interfaces `ContentItem<T>` to force TypeScript safety around the frontmatter variables expected inside `content/blog/` and `content/work/`. 

#### B. Server-Side Markdown Rendering (`src/components/mdx.tsx`)
We consumed MDX strings dynamically using Next.js Server Components. We styled custom mappings for native HTML tags (`h1`, `h2`, `p`, `blockquote`) bypassing standard Tailwind Typography classes to achieve perfect bespoke spacing and layout. We embedded `rehype-pretty-code` running locally for flawless IDE-like code syntax highlighting.

#### C. Performance via Edge & SSG
All dynamic routes (`/blog/[slug]` and `/work/[slug]`) inject `generateStaticParams`. This commands Next.js to intercept all Markdown files at `build-time` meaning the live site is completely static, cached HTML globally served from a CDN with instantaneous TTFB (Time To First Byte).

#### D. The UI/UX Aesthetic Rules
- **Dark Mode Context**: Using CSS Variables scoped carefully inside standard Tailwind utility blocks (`bg-background text-foreground`).
- **Visuals**: Features a backdrop-blurred (glass) sticky asymmetrical Navbar, massive `text-8xl` Hero typography with ambient gradients in the background (`radial-gradient`), and distinct dynamic grids for case studies featuring `lucide-react` iconography.

## 📌 Status
- Project fully completed. 
- Build (`npm run build`) verifies successful static generation for all nested content correctly.
- Site is entirely Vercel-ready. The code serves as a premium starting template for Henry Taby to simply write Markdown and automatically publish gorgeous, performant pages.

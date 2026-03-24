# Coding Standards - Henry Taby Web Platform

## TypeScript

- **Strict Mode**: Enabled in `tsconfig.json`
- **No `any` types**: Use proper interfaces from `@/entities`
- **Explicit return types**: For public functions
- **Interface over Type**: Prefer interfaces for object shapes

```typescript
// ✅ Correct
interface BlogPostEntity {
  slug: string;
  title: string;
}

function getBlogPosts(): BlogPostEntity[] { ... }

// ❌ Wrong
function getBlogPosts(): any[] { ... }
```

## React Components

### Server Components (Default)

- Use Server Components by default
- Only use `"use client"` when:
  - Using hooks (useState, useEffect, etc.)
  - Event handlers (onClick, onChange, etc.)
  - Browser APIs

### Component Structure

```typescript
// 1. Imports (grouped by source)
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/shared/ui";
import type { BlogPostEntity } from "@/entities";

// 2. Interface
interface BlogCardProps {
  post: BlogPostEntity;
  showTags?: boolean;
}

// 3. Component
export function BlogCard({ post, showTags = true }: BlogCardProps) {
  // Hooks at the top
  const [isOpen, setIsOpen] = useState(false);
  
  // Handlers
  const handleClick = () => { ... };
  
  // Render
  return (
    <article>...</article>
  );
}
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `BlogCard`, `WorkList` |
| Functions | camelCase | `getBlogPosts`, `createProject` |
| Constants | SCREAMING_SNAKE_CASE | `SITE_CONFIG` |
| Files (components) | kebab-case | `blog-card.tsx` |
| Files (utilities) | kebab-case | `utils.ts` |
| Directories | kebab-case | `blog/`, `shared/` |

## Tailwind CSS v4

### Class Organization

```typescript
// Order: Layout → Spacing → Sizing → Typography → Colors → Effects
className="flex flex-col gap-4 p-8 w-full text-lg text-foreground bg-card rounded-xl shadow-lg"
```

### Important Syntax (v4)

```typescript
// ✅ Correct (v4)
className="leading-[1.05]!"
className="z-9999"

// ❌ Wrong (v3 syntax)
className="!leading-[1.05]"
className="z-[9999]"
```

### Responsive Design

```typescript
// Mobile-first approach
className="text-2xl md:text-4xl lg:text-6xl"
className="flex flex-col md:flex-row"
```

## Accessibility (WCAG 2.1 AA)

### Required ARIA Attributes

```typescript
// Buttons with icons
<button aria-label="Close menu">
  <X aria-hidden="true" />
</button>

// Form fields
<input
  aria-required="true"
  aria-invalid={error ? "true" : undefined}
  aria-describedby="field-hint"
/>

// Links to external sites
<a 
  href="https://github.com/..."
  target="_blank"
  rel="noopener noreferrer"
  aria-label="View GitHub profile (opens in new tab)"
>
```

### Focus Management

```typescript
// Always include focus-visible styles
className="focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"

// For modals/dialogs
useEffect(() => {
  if (isOpen) {
    closeButtonRef.current?.focus();
  }
}, [isOpen]);
```

### Semantic HTML

```typescript
// ✅ Correct
<article aria-labelledby="title-id">
  <h2 id="title-id">Title</h2>
  <p>Description</p>
</article>

// ❌ Wrong
<div>
  <div>Title</div>
  <div>Description</div>
</div>
```

## File Size Limits

| Type | Max Lines | Recommendation |
|------|-----------|----------------|
| Page component | 100 | ~50 lines |
| Feature component | 150 | ~80 lines |
| Shared component | 100 | ~50 lines |
| API function file | 200 | ~100 lines |

## Import Order

```typescript
// 1. React/Next
import { useState, useEffect } from "react";
import Link from "next/link";

// 2. External packages
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

// 3. Internal aliases (FSD layers top to bottom)
import { BlogCard } from "@/features/blog";
import { Button } from "@/shared/ui";
import type { BlogPostEntity } from "@/entities";

// 4. Relative imports (same layer only)
import { helper } from "./utils";
```

## Error Handling

```typescript
// ✅ Correct
try {
  const posts = await getBlogPosts();
} catch (error) {
  console.error("Failed to fetch blog posts:", error);
  return [];
}

// ❌ Wrong
const posts = await getBlogPosts(); // No error handling
```

## Comments

```typescript
// ✅ Good: Explain WHY, not WHAT
// Prevent body scroll when mobile menu is open
document.body.style.overflow = "hidden";

// ❌ Bad: Explains what (obvious from code)
// Set overflow to hidden
document.body.style.overflow = "hidden";
```

## JSDoc for Public APIs

```typescript
/**
 * Retrieves all blog posts from the file system.
 * 
 * @returns Array of blog post entities, sorted by date (newest first)
 * @throws Error if content directory doesn't exist
 * 
 * @example
 * const posts = await getBlogPosts();
 * // Returns: [{ slug: "hello-world", title: "Hello World", ... }]
 */
export async function getBlogPosts(): Promise<BlogPostEntity[]> {
  // ...
}
```

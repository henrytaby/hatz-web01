# Components Reference - Henry Taby Web Platform

## Shared UI Components

### Button (`src/shared/ui/button.tsx`)

Primary action button with variants.

```typescript
import { Button } from "@/shared/ui";

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>

// With icon
<Button>
  Submit <Send className="w-4 h-4" />
</Button>
```

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `primary`, `secondary`, `ghost`, `danger` | `primary` | Visual style |
| `size` | `sm`, `md`, `lg` | `md` | Button size |
| `disabled` | `boolean` | `false` | Disabled state |
| `className` | `string` | - | Additional classes |

---

### Badge (`src/shared/ui/badge.tsx`)

Tag/label component for categories and tags.

```typescript
import { Badge } from "@/shared/ui";

<Badge variant="default">React</Badge>
<Badge variant="primary">TypeScript</Badge>
<Badge variant="outline">Next.js</Badge>
```

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `default`, `primary`, `outline` | `default` | Visual style |

---

### Card (`src/shared/ui/card.tsx`)

Container card with header, content, and footer sections.

```typescript
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/shared/ui";

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardFooter>Footer content</CardFooter>
</Card>
```

---

### Input (`src/shared/ui/input.tsx`)

Form input with label and error handling.

```typescript
import { Input, Textarea } from "@/shared/ui";

<Input
  id="email"
  label="Email"
  type="email"
  required
  error="Invalid email"
  hint="Enter your email address"
/>

<Textarea
  id="message"
  label="Message"
  required
/>
```

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | auto-generated | Input ID |
| `label` | `string` | - | Label text |
| `error` | `string` | - | Error message |
| `hint` | `string` | - | Helper text |
| `required` | `boolean` | `false` | Required field |

**Accessibility**:
- `aria-required` for required fields
- `aria-invalid` for error state
- `aria-describedby` linked to hint/error

---

### PageHero (`src/shared/ui/page-hero.tsx`)

Hero banner with Ken Burns animation effect.

```typescript
import { PageHero, PageHeroSpacer } from "@/shared/ui";

<PageHero
  title="Blog"
  subtitle="Technical articles and tutorials"
  backgroundImage="/img/banners/banner-01.jpg"
/>

<PageHeroSpacer />
```

---

## Shared Layout Components

### Navbar (`src/shared/layout/navbar.tsx`)

Responsive navigation with mobile menu.

**Features**:
- Sticky glassmorphism design
- Mobile menu with animations
- Theme toggle integration
- Active route highlighting

**Accessibility**:
- `role="banner"`, `role="dialog"`, `aria-modal`
- Focus management on menu open/close
- Tab trap in mobile menu
- Escape key closes menu

---

### Footer (`src/shared/layout/footer.tsx`)

Site footer with social links.

```typescript
import { Footer } from "@/shared/layout";

<Footer />
```

---

### ThemeToggle (`src/shared/layout/theme-toggle.tsx`)

Dark/light mode toggle button.

```typescript
import { ThemeToggle } from "@/shared/layout";

<ThemeToggle />
```

---

## Feature Components

### BlogCard (`src/features/blog/components/blog-card.tsx`)

Card for displaying blog post summary.

```typescript
import { BlogCard } from "@/features/blog";

<BlogCard post={post} showTags={true} />
```

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `post` | `BlogPostEntity` | required | Post data |
| `showTags` | `boolean` | `true` | Show tags |

---

### BlogList (`src/features/blog/components/blog-list.tsx`)

List of blog cards.

```typescript
import { BlogList } from "@/features/blog";

<BlogList posts={posts} />
```

---

### WorkCard (`src/features/work/components/work-card.tsx`)

Card for displaying project summary.

```typescript
import { WorkCard } from "@/features/work";

<WorkCard project={project} />
```

---

### WorkList (`src/features/work/components/work-list.tsx`)

List of work cards.

```typescript
import { WorkList } from "@/features/work";

<WorkList projects={projects} />
```

---

### ContactForm (`src/features/contact/components/contact-form.tsx`)

Contact form with validation.

```typescript
import { ContactForm } from "@/features/contact";

<ContactForm onSubmit={(data) => console.log(data)} />
```

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSubmit` | `(data: ContactFormData) => void` | - | Submit handler |

**Accessibility**:
- `aria-required` on required fields
- `aria-describedby` for hints
- Screen reader announcements for success

---

### ContactInfo (`src/features/contact/components/contact-info.tsx`)

Contact information display.

```typescript
import { ContactInfo } from "@/features/contact";

<ContactInfo 
  email="hello@example.com"
  availabilityText="Available for hire"
/>
```

---

## Shared Lib

### CustomMDX (`src/shared/lib/mdx.tsx`)

MDX renderer with syntax highlighting.

```typescript
import { CustomMDX } from "@/shared/lib";

<CustomMDX source={mdxContent} />
```

---

### ThemeProvider (`src/shared/lib/theme-provider.tsx`)

Theme context provider.

```typescript
import { ThemeProvider } from "@/shared/lib";

<ThemeProvider>
  {children}
</ThemeProvider>
```

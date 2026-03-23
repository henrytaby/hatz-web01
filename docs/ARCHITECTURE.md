# Guía de Arquitectura FSD - Henry Taby Web Platform

> 📚 **Documento para nuevos developers**: Esta guía explica de forma didáctica la arquitectura del proyecto, qué hacer y qué NO hacer.

---

## 🏗️ ¿Qué es FSD (Feature-Sliced Design)?

**Feature-Sliced Design** es una arquitectura que organiza el código por **capas** y **dominios de negocio**, no por tipo de archivo.

### ¿Por qué usamos FSD?

| Problema sin FSD | Solución con FSD |
|-----------------|------------------|
| Componentes difíciles de encontrar | Cada feature tiene su carpeta |
| Código duplicado entre páginas | shared/ centraliza lo reutilizable |
| Lógica de negocio mezclada con UI | entities/ separa las entidades |
| Imports caóticos | Reglas claras de dependencia |

---

## 📂 Estructura de Capas

```
src/
├── app/          ← Capa de Aplicación (páginas Next.js)
├── features/     ← Capa de Features (casos de uso)
├── entities/     ← Capa de Entidades (modelos de negocio)
└── shared/       ← Capa Shared (recursos compartidos)
```

### Orden de dependencia (IMPORTANTE):

```
app → features → entities → shared
```

**Regla de Oro**: Una capa SOLO puede importar de capas inferiores, NUNCA de superiores.

```
✅ CORRECTO: app → features → entities → shared
❌ INCORRECTO: shared → features (violación de dependencia)
```

---

## 📊 Reglas de Importación FSD

En FSD, las capas tienen dependencias unidireccionales:

```
app → features → entities → shared
```

### Tabla de Dependencias

| Capa | Puede importar de | No puede importar de |
|------|-------------------|---------------------|
| **app** | features, entities, shared | - |
| **features** | entities, shared | app, otras features |
| **entities** | shared | app, features |
| **shared** | nada (capa base) | app, features, entities |

### Ejemplos de Imports Correctos

```tsx
// ✅ app/page.tsx - Puede importar de cualquier capa
import { BlogList } from "@/features/blog";
import type { BlogPostEntity } from "@/entities";
import { Button } from "@/shared/ui";

// ✅ features/blog/components/blog-card.tsx - Puede importar de entities y shared
import type { BlogPostEntity } from "@/entities";
import { Badge } from "@/shared/ui";

// ✅ entities/content.ts - Solo puede importar de shared (o nada)
import type { BlogCategory } from "./types";

// ✅ shared/ui/button.tsx - No puede importar de otras capas
import { cn } from "@/lib/utils";  // ✅ lib está fuera de FSD
```

### Ejemplos de Imports Incorrectos

```tsx
// ❌ shared/ui/some-component.tsx - No puede importar de features
import { getBlogPosts } from "@/features/blog";  // ❌ VIOLACIÓN

// ❌ entities/content.ts - No puede importar de features
import { BlogCard } from "@/features/blog";  // ❌ VIOLACIÓN

// ❌ features/blog/index.ts - No puede importar de otra feature
import { WorkCard } from "@/features/work";  // ❌ VIOLACIÓN
```

---

## 🎯 Beneficios de FSD en Este Proyecto

### 1. Escalabilidad

| Beneficio | Descripción |
|-----------|-------------|
| **Nuevas features** | Agregar una feature no afecta a las existentes |
| **Crecimiento controlado** | Cada capa tiene responsabilidades claras |
| **Fácil mantenimiento** | Sabes exactamente dónde buscar cada cosa |

### 2. Separación de Responsabilidades

| Capa | Responsabilidad | Ejemplo |
|------|-----------------|---------|
| **app** | Enrutamiento y composición | `page.tsx` compone features |
| **features** | Casos de uso específicos | `BlogList`, `ContactForm` |
| **entities** | Modelos de negocio | `BlogPostEntity`, `ProjectEntity` |
| **shared** | UI y utilidades genéricas | `Button`, `Badge`, `CustomMDX` |

### 3. Reutilización de Código

| Antes | Después |
|-------|---------|
| Badge duplicado en 5 páginas | `Badge` en `shared/ui` |
| Lógica de blog en cada página | `getBlogPosts()` en `features/blog` |
| Estilos inline en componentes | `Button` con variantes |

### 4. Testing Facilitado

| Tipo de Test | Ubicación |
|--------------|-----------|
| Unit tests de UI | `src/shared/ui/__tests__/` |
| Unit tests de features | `src/features/blog/__tests__/` |
| Integration tests | `src/app/__tests__/` |

### 5. Onboarding de Developers

| Sin FSD | Con FSD |
|---------|---------|
| "¿Dónde está el componente de blog?" | "Está en `features/blog/components/`" |
| "¿Qué hace este archivo?" | Cada capa tiene propósito definido |
| "¿Puedo importar esto?" | Tabla de dependencias clara |

---

## 📋 Próximos Pasos

### Corto Plazo

| Tarea | Prioridad | Descripción |
|-------|-----------|-------------|
| **Tests unitarios** | Alta | Jest + React Testing Library por feature |
| **Storybook** | Media | Documentar componentes de `shared/ui` |
| **ESLint FSD rules** | Alta | Reglas de boundaries entre capas |

### Mediano Plazo

| Tarea | Prioridad | Descripción |
|-------|-----------|-------------|
| **Server Actions** | Alta | Integrar `ContactForm` con Server Action |
| **Validación Zod** | Alta | Validar formularios con Zod |
| **API Routes** | Media | Analytics y newsletter |

### Largo Plazo

| Tarea | Prioridad | Descripción |
|-------|-----------|-------------|
| **CMS Headless** | Baja | Considerar Sanity o Contentful |
| **i18n** | Media | Soporte multiidioma (es/en) |
| **PWA** | Baja | Service Worker para offline |

---

## 📋 Detalle de Cada Capa

### 1. `app/` - Capa de Aplicación

**Propósito**: Páginas y layouts de Next.js App Router.

**Contenido**:
- Páginas (`page.tsx`)
- Layouts (`layout.tsx`)
- Metadatos (`sitemap.ts`, `robots.ts`)
- Estilos globales (`globals.css`)

**Reglas**:
- ✅ Importar de `features/`, `entities/`, `shared/`
- ❌ NO contener lógica de negocio
- ❌ NO definir componentes aquí (mover a features o shared)

**Ejemplo** - [`src/app/blog/page.tsx`](../src/app/blog/page.tsx):
```tsx
// ✅ CORRECTO: Importa de features
import { BlogList } from "@/features/blog";
import { PageHero, PageHeroSpacer } from "@/shared/ui";

export default function BlogPage() {
  return (
    <div>
      <PageHero title="Blog" backgroundImage="/img/banners/banner-01.jpg" />
      <PageHeroSpacer />
      <BlogList />  {/* Componente de feature */}
    </div>
  );
}
```

---

### 2. `features/` - Capa de Features

**Propósito**: Casos de uso específicos de la aplicación.

**Estructura por feature**:
```
features/
├── blog/
│   ├── api/              ← Funciones de datos
│   │   └── index.ts      ← getBlogPosts, getBlogPostBySlug...
│   ├── components/       ← Componentes de UI
│   │   ├── blog-card.tsx
│   │   └── blog-list.tsx
│   └── index.ts          ← Exportaciones públicas
├── work/
│   ├── api/
│   ├── components/
│   └── index.ts
└── contact/
    ├── components/
    └── index.ts
```

**Reglas**:
- ✅ Importar de `entities/` y `shared/`
- ✅ Cada feature es independiente de otras features
- ❌ NO importar de otras features (usar entities o shared)
- ❌ NO definir entidades aquí

**Ejemplo** - [`src/features/blog/api/index.ts`](../src/features/blog/api/index.ts):
```tsx
import type { BlogPostEntity } from "@/entities";
import { getBlogPostBySlug as getPost } from "@/lib/mdx";

// ✅ CORRECTO: Usa tipos de entities
export function getBlogPosts(): BlogPostEntity[] {
  const posts = getPost("blog");
  return posts.map(post => ({
    slug: post.slug,
    title: post.frontmatter.title,
    // ...
  }));
}
```

---

### 3. `entities/` - Capa de Entidades

**Propósito**: Modelos de negocio y tipos compartidos.

**Contenido**:
- Interfaces/Tipos de entidades
- Factory functions para crear entidades
- Constantes de dominio

**Reglas**:
- ✅ Definir tipos e interfaces
- ✅ Crear factory functions
- ❌ NO importar de features o app
- ❌ NO contener lógica de UI

**Ejemplo** - [`src/entities/content.ts`](../src/entities/content.ts):
```tsx
// ✅ CORRECTO: Entidad con tipo y factory
export interface BlogPostEntity {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
  category?: BlogCategory;
  content: string;
}

export function createBlogPost(data: Partial<BlogPostEntity>): BlogPostEntity {
  return {
    slug: data.slug || "",
    title: data.title || "",
    date: data.date || new Date().toISOString(),
    content: data.content || "",
  };
}
```

---

### 4. `shared/` - Capa Shared

**Propósito**: Recursos reutilizables sin lógica de negocio.

**Estructura**:
```
shared/
├── ui/           ← Componentes UI reutilizables
│   ├── button.tsx
│   ├── badge.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── page-hero.tsx
├── layout/       ← Componentes de layout
│   ├── navbar.tsx
│   ├── footer.tsx
│   └── theme-toggle.tsx
├── icons/        ← Iconos SVG
│   └── index.tsx
├── lib/          ← Utilidades y helpers
│   ├── mdx.tsx
│   └── theme-provider.tsx
└── index.ts      ← Exportaciones públicas
```

**Reglas**:
- ✅ Componentes genéricos y reutilizables
- ✅ Sin conocimiento del dominio
- ❌ NO importar de entities, features, app
- ❌ NO contener lógica de negocio específica

**Ejemplo** - [`src/shared/ui/button.tsx`](../src/shared/ui/button.tsx):
```tsx
// ✅ CORRECTO: Componente genérico sin lógica de negocio
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export function Button({ 
  variant = "primary", 
  size = "md", 
  children, 
  ...props 
}: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }))} {...props}>
      {children}
    </button>
  );
}
```

---

## 🚫 Lo que NO debes hacer

### 1. Violación de dependencias

```tsx
// ❌ INCORRECTO: shared importando de features
// src/shared/ui/some-component.tsx
import { getBlogPosts } from "@/features/blog";  // ❌ VIOLACIÓN

// ✅ CORRECTO: Mover la lógica a la página o feature
// src/app/blog/page.tsx
import { getBlogPosts } from "@/features/blog";  // ✅ CORRECTO
```

### 2. Lógica de negocio en componentes UI

```tsx
// ❌ INCORRECTO: Lógica de negocio en shared/ui
// src/shared/ui/blog-card.tsx
export function BlogCard() {
  const posts = getBlogPosts();  // ❌ Lógica de negocio
  return <div>...</div>;
}

// ✅ CORRECTO: Mover a features
// src/features/blog/components/blog-card.tsx
export function BlogCard({ post }: { post: BlogPostEntity }) {
  return <div>...</div>;  // ✅ Solo presentación
}
```

### 3. Imports relativos entre capas

```tsx
// ❌ INCORRECTO: Import relativo
import { Button } from "../../shared/ui/button";

// ✅ CORRECTO: Import con alias
import { Button } from "@/shared/ui";
```

### 4. Componentes inline en páginas

```tsx
// ❌ INCORRECTO: Componente definido en página
// src/app/blog/page.tsx
export default function BlogPage() {
  function BlogCard() {  // ❌ Inline
    return <div>...</div>;
  }
  return <BlogCard />;
}

// ✅ CORRECTO: Componente en feature
// src/features/blog/components/blog-card.tsx
export function BlogCard() { ... }
```

---

## ✅ Buenas Prácticas

### 1. Usar index.ts para exportaciones públicas

Cada módulo debe tener un `index.ts` que exporte su API pública:

```tsx
// src/features/blog/index.ts
export { getBlogPosts, getBlogPostBySlug } from "./api";
export { BlogCard, BlogList } from "./components";
```

### 2. Tipar todas las props

```tsx
// ✅ CORRECTO: Props tipadas
interface BlogCardProps {
  post: BlogPostEntity;
  variant?: "compact" | "full";
}

export function BlogCard({ post, variant = "compact" }: BlogCardProps) {
  // ...
}
```

### 3. Usar entidades para datos

```tsx
// ❌ INCORRECTO: Tipo genérico
function renderPost(post: any) { ... }

// ✅ CORRECTO: Usar entidad
import type { BlogPostEntity } from "@/entities";

function renderPost(post: BlogPostEntity) { ... }
```

### 4. Componentes pequeños y enfocados

```tsx
// ✅ CORRECTO: Un componente, una responsabilidad
// blog-card.tsx - Solo renderiza una tarjeta
// blog-list.tsx - Solo renderiza la lista
// blog-hero.tsx - Solo renderiza el hero
```

### 5. Server Components por defecto

```tsx
// ✅ CORRECTO: Server Component (sin "use client")
// src/features/blog/components/blog-list.tsx
import type { BlogPostEntity } from "@/entities";

export function BlogList({ posts }: { posts: BlogPostEntity[] }) {
  return (
    <div>
      {posts.map(post => <BlogCard key={post.slug} post={post} />)}
    </div>
  );
}

// Solo usar "use client" cuando sea necesario:
// - Event handlers (onClick, onChange)
// - Hooks (useState, useEffect)
// - Browser APIs (localStorage, window)
```

---

## 📊 Flujo de Datos

```
┌─────────────────────────────────────────────────────────────┐
│                         app/                                 │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │  page   │  │  page   │  │  page   │  │  page   │        │
│  │ (blog)  │  │ (work)  │  │(contact)│  │ (about) │        │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘        │
└───────┼────────────┼────────────┼────────────┼─────────────┘
        │            │            │            │
        ▼            ▼            ▼            ▼
┌─────────────────────────────────────────────────────────────┐
│                       features/                              │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                     │
│  │  blog   │  │  work   │  │ contact │                     │
│  │  api/   │  │  api/   │  │components│                    │
│  │components│  │components│  └─────────┘                     │
│  └────┬────┘  └────┬────┘                                   │
└───────┼────────────┼────────────────────────────────────────┘
        │            │
        ▼            ▼
┌─────────────────────────────────────────────────────────────┐
│                       entities/                              │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │ BlogPostEntity   │  │  ProjectEntity   │                │
│  │ NavItem          │  │  SiteConfig      │                │
│  └──────────────────┘  └──────────────────┘                │
└─────────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────┐
│                        shared/                               │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │   ui/   │  │ layout/ │  │  icons/ │  │   lib/  │        │
│  │ Button  │  │ Navbar  │  │ Github  │  │  MDX    │        │
│  │ Badge   │  │ Footer  │  │ LinkedIn│  │ Theme   │        │
│  │ Card    │  │ Toggle  │  │ Twitter │  │         │        │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🆕 Agregando Nueva Funcionalidad

### Escenario: Agregar feature "Newsletter"

1. **Crear estructura**:
```
src/features/newsletter/
├── api/
│   └── index.ts        ← Funciones de suscripción
├── components/
│   ├── newsletter-form.tsx
│   └── newsletter-success.tsx
└── index.ts            ← Exportaciones
```

2. **Definir entidad** (si es necesario):
```tsx
// src/entities/newsletter.ts
export interface NewsletterSubscription {
  email: string;
  subscribedAt: Date;
  status: "active" | "unsubscribed";
}
```

3. **Crear componente**:
```tsx
// src/features/newsletter/components/newsletter-form.tsx
"use client";

import { useState } from "react";
import { Button, Input } from "@/shared/ui";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de suscripción
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit">Suscribirse</Button>
    </form>
  );
}
```

4. **Exportar**:
```tsx
// src/features/newsletter/index.ts
export { NewsletterForm } from "./components/newsletter-form";
```

5. **Usar en página**:
```tsx
// src/app/page.tsx
import { NewsletterForm } from "@/features/newsletter";

export default function HomePage() {
  return (
    <div>
      {/* ... */}
      <NewsletterForm />
    </div>
  );
}
```

---

## 🧪 Testing (Futuro)

La arquitectura FSD facilita el testing:

```tsx
// Test de feature
import { render, screen } from "@testing-library/react";
import { BlogCard } from "@/features/blog";

describe("BlogCard", () => {
  it("renders post title", () => {
    const post = createBlogPost({ title: "Test Post" });
    render(<BlogCard post={post} />);
    expect(screen.getByText("Test Post")).toBeInTheDocument();
  });
});

// Test de shared/ui
import { render, screen } from "@testing-library/react";
import { Button } from "@/shared/ui";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
});
```

---

## 📚 Recursos Adicionales

- [Feature-Sliced Design (Official)](https://feature-sliced.design/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-t-s.html)

---

## 🤝 Preguntas Frecuentes

### ¿Dónde pongo un componente que se usa en múltiples features?

**Respuesta**: Si es UI genérico (botón, input, card), va en `shared/ui/`. Si tiene lógica de negocio, considera si realmente es compartido o si debería estar en `entities/`.

### ¿Puedo importar de una feature a otra?

**Respuesta**: No directamente. Si necesitas compartir lógica entre features:
1. Mueve la lógica común a `entities/`
2. O mueve el componente a `shared/` si es UI genérico

### ¿Cuándo uso "use client"?

**Respuesta**: Solo cuando necesites:
- Estado del cliente (useState, useEffect)
- Event handlers (onClick, onChange)
- Browser APIs (localStorage, window)
- Context providers

### ¿Cómo nombro los archivos?

**Convenciones**:
- Componentes: `kebab-case.tsx` (ej: `blog-card.tsx`)
- Funciones: `camelCase` (ej: `getBlogPosts`)
- Interfaces: `PascalCase` con sufijo Entity/Props (ej: `BlogPostEntity`, `ButtonProps`)

---

**¡Bienvenido al equipo!** 🎉

Si tienes dudas, revisa este documento o pregunta a los maintainers del proyecto.

# Implementación FSD Simplificado - Henry Taby Web

## 📁 Nueva Estructura del Proyecto

```
src/
├── app/                        # Next.js App Router (entry points)
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about/
│   ├── blog/
│   ├── contact/
│   └── work/
│
├── features/                   # FEATURES (Casos de uso)
│   ├── blog/
│   │   ├── api/
│   │   │   └── index.ts       # getBlogPosts, getBlogPostBySlug, etc.
│   │   ├── components/
│   │   │   ├── blog-card.tsx  # Componente BlogCard
│   │   │   └── blog-list.tsx  # Componente BlogList
│   │   └── index.ts           # Exports públicos
│   │
│   └── work/
│       ├── api/
│       │   └── index.ts       # getWorkProjects, getWorkProjectBySlug, etc.
│       ├── components/
│       │   ├── work-card.tsx  # Componente WorkCard
│       │   └── work-list.tsx  # Componente WorkList
│       └── index.ts           # Exports públicos
│
├── entities/                   # ENTITIES (Modelos de dominio)
│   ├── content.ts             # BlogPostEntity, ProjectEntity, interfaces
│   ├── navigation.ts          # NavItem, SocialLink, SiteConfig
│   └── index.ts               # Exports públicos
│
├── shared/                     # SHARED (Componentes y utilidades)
│   ├── ui/
│   │   ├── button.tsx         # Componente Button reutilizable
│   │   ├── badge.tsx          # Componente Badge reutilizable
│   │   ├── card.tsx           # Componente Card reutilizable
│   │   ├── input.tsx          # Componente Input/Textarea reutilizable
│   │   └── index.ts           # Exports públicos
│   └── index.ts               # Exports públicos
│
├── components/                 # Componentes legacy (migrar gradualmente)
│   ├── layout/
│   ├── ui/
│   └── ...
│
├── lib/
│   └── utils.ts               # Utilidades (cn, etc.)
│
├── types/                      # Tipos legacy (migrar gradualmente)
│   └── index.ts
│
└── config/                     # Configuración
    └── index.ts
```

---

## 🔄 Reglas de Importación FSD

En FSD, las capas tienen dependencias unidireccionales:

```
app → features → entities → shared
```

| Capa | Puede importar de | No puede importar de |
|------|-------------------|---------------------|
| **app** | features, entities, shared | - |
| **features** | entities, shared | app, otras features |
| **entities** | shared | app, features |
| **shared** | nada (capa base) | app, features, entities |

---

## 📦 Capas Implementadas

### 1. Entities (Entidades de Dominio)

Las entities son los modelos de negocio con comportamiento:

```typescript
// src/entities/content.ts
export interface BlogPostEntity extends ContentEntity {
  category?: BlogCategory;
  author?: string;
  readingTime?: number;
  content: string;
}

export interface ProjectEntity extends ContentEntity {
  category?: WorkCategory;
  githubUrl?: string;
  liveUrl?: string;
  content: string;
}
```

### 2. Features (Características)

Cada feature contiene:
- **api/**: Funciones de acceso a datos
- **components/**: Componentes específicos de la feature
- **index.ts**: Exports públicos

```typescript
// src/features/blog/api/index.ts
export function getBlogPosts(): BlogPostEntity[]
export function getBlogPostBySlug(slug: string): BlogPostEntity | null
export function getRelatedBlogPosts(slug: string, limit?: number): BlogPostEntity[]
```

### 3. Shared (Compartido)

Componentes base reutilizables:

```typescript
// src/shared/ui/button.tsx
export interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(...)
```

---

## 🎯 Beneficios de FSD Simplificado

| Beneficio | Descripción |
|-----------|-------------|
| **Escalabilidad** | Añadir nuevas features sin modificar existentes |
| **Mantenibilidad** | Código relacionado agrupado por feature |
| **Reutilización** | shared/ui contiene componentes base |
| **Testabilidad** | Cada feature es testeable independientemente |
| **Claridad** | Estructura predecible y documentada |

---

## 📋 Próximos Pasos

### Fase 1: Migración Gradual
- [ ] Migrar páginas existentes para usar features
- [ ] Migrar componentes legacy a shared/ui
- [ ] Eliminar types/index.ts (usar entities)

### Fase 2: Features Adicionales
- [ ] Crear feature/contact con ContactForm
- [ ] Crear feature/about con AboutContent
- [ ] Crear feature/home con HeroSection

### Fase 3: Mejoras
- [ ] Añadir tests unitarios por feature
- [ ] Implementar Storybook para shared/ui
- [ ] Documentar cada feature con README.md

---

## 📚 Recursos

- [Feature-Sliced Design Documentation](https://feature-sliced.design/)
- [FSD GitHub Discussions](https://github.com/feature-sliced/documentation/discussions)
- [Ejemplos FSD](https://github.com/feature-sliced/examples)

---

*Implementación completada: 2026-03-23*

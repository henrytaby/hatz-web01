# Henry Taby - Developer Portfolio & Technical Blog

Este es el código fuente del portafolio personal y blog técnico de Henry Taby. Construido con Next.js 16, TypeScript y una arquitectura Feature-Sliced Design (FSD) para máxima escalabilidad y mantenibilidad.

## 🚀 Stack Tecnológico

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **Next.js** | 16.2.1 | Framework React con App Router |
| **TypeScript** | 5.x | Tipado estático en modo estricto |
| **Tailwind CSS** | 4.x | Estilos utility-first |
| **MDX** | next-mdx-remote | Contenido estructurado |
| **Framer Motion** | 11.x | Animaciones fluidas |
| **next-themes** | 0.x | Tema claro/oscuro |

## 🏗️ Arquitectura FSD

El proyecto implementa **Feature-Sliced Design**, una arquitectura que organiza el código por capas y dominios de negocio:

```
src/
├── app/                    # Capa de Aplicación (páginas Next.js)
│   ├── layout.tsx         # Layout raíz
│   ├── page.tsx           # Página de inicio
│   ├── about/             # Página "Acerca de mí"
│   ├── blog/              # Páginas de blog
│   ├── contact/           # Página de contacto
│   └── work/              # Páginas de proyectos
├── features/              # Capa de Features (casos de uso)
│   ├── blog/              # Feature: Blog
│   ├── work/              # Feature: Work
│   └── contact/           # Feature: Contact
├── entities/              # Capa de Entidades (modelos)
│   ├── content.ts         # BlogPostEntity, ProjectEntity
│   └── navigation.ts      # NavItem, SiteConfig
└── shared/                # Capa Shared (recursos)
    ├── ui/                # Button, Badge, Card, Input...
    ├── layout/            # Navbar, Footer, ThemeToggle
    ├── icons/             # Iconos SVG
    └── lib/               # CustomMDX, ThemeProvider
```

### Reglas de Dependencia

```
app → features → entities → shared
```

Una capa solo puede importar de capas inferiores, nunca de superiores.

## 📁 Rutas del Sitio

| Ruta | Descripción |
|------|-------------|
| `/` | Landing con hero y tarjetas dinámicas |
| `/work` | Portafolio de casos de estudio |
| `/work/[slug]` | Detalle de proyecto (SSG) |
| `/blog` | Artículos técnicos |
| `/blog/[slug]` | Artículo individual (SSG) |
| `/about` | Biografía profesional |
| `/contact` | Formulario de contacto |

## 📝 Sistema de Contenido

El contenido se gestiona mediante archivos MDX locales en `/content/`:

**Blog** (`content/blog/`):
```yaml
---
title: "Título del Artículo"
date: "2024-01-15"
summary: "Resumen del artículo"
tags: ["react", "typescript"]
category: "frontend"
---
```

**Work** (`content/work/`):
```yaml
---
title: "Nombre del Proyecto"
date: "2024-01-15"
summary: "Resumen del proyecto"
tags: ["nextjs", "tailwind"]
category: "fullstack"
demoUrl: "https://demo.com"
repoUrl: "https://github.com/..."
---
```

## 💻 Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Desarrollo con Turbopack
npm run dev

# Build de producción
npm run build

# Verificar tipos
npx tsc --noEmit

# Linting
npm run lint
```

## 📚 Documentación

| Documento | Descripción |
|-----------|-------------|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Guía didáctica de FSD para nuevos developers |
| [docs/ANALYSIS.md](docs/ANALYSIS.md) | Análisis del proyecto y métricas |
| [docs/FSD_IMPLEMENTATION.md](docs/FSD_IMPLEMENTATION.md) | Detalles de implementación FSD |

## 🎨 Componentes UI

### shared/ui

| Componente | Props | Uso |
|-----------|-------|-----|
| `Button` | variant, size | Botones con variantes |
| `Badge` | variant | Tags y categorías |
| `Card` | - | Tarjetas con Header, Title, Footer |
| `Input` | label, type | Campos de formulario |
| `Textarea` | label | Áreas de texto |
| `PageHero` | title, backgroundImage | Banners de página |

### shared/layout

| Componente | Uso |
|-----------|-----|
| `Navbar` | Navegación responsive |
| `Footer` | Pie de página |
| `ThemeToggle` | Toggle claro/oscuro |

## 🌐 SEO & Producción

- ✅ SSG (Static Site Generation) para todas las páginas
- ✅ Metadatos OpenGraph y Twitter Cards
- ✅ `sitemap.xml` generado dinámicamente
- ✅ `robots.txt` configurado
- ✅ Listo para Vercel

## 🤝 Contribuir

1. Lee [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) para entender la arquitectura
2. Sigue las reglas de dependencia FSD
3. Usa los imports con alias (`@/features`, `@/shared`, `@/entities`)
4. Tipa todas las props con TypeScript

## 📄 Licencia

MIT © Henry Taby

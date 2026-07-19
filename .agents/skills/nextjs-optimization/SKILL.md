---
name: nextjs-optimization
description: "Implementación de optimizaciones de performance en Next.js 16 (Framer Motion, Core Web Vitals, SSG). Use cuando trabaje en páginas del app router."
metadata:
  project: henrytaby-web
  tags: nextjs, performance, framer-motion, ssg
---

# Next.js Performance Optimization

## Checklist SSG

- Verificar `generateStaticParams` para todas las páginas dinámicas (`[slug]`)
- Incluir `<title>` y `<meta>` tags en `<head>` de cada layout
- Asegurar imágenes cargadas vía `next/image` con `fill` o `width`/`height`

## Framer Motion

- Usar `AnimatePresence` solo cuando sea necesario (no envolver todo el componente)
- Optimizar `layoutId` para evitar re-renders innecesarios

## Core Web Vitals

- Cumplir CLS < 0.1 usando medidas de altura en `min-height` o `fr` en Grid/Flex
- Cumplir LCP < 2.5s usando `loading="lazy"` en imágenes no críticas

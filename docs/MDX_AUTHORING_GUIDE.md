# Guía de Creación de Contenido MDX (MDX Authoring Guide)

Este documento es la referencia oficial para cualquier desarrollador o autor que vaya a crear o editar artículos (blog) o proyectos (portfolio) utilizando nuestro **Motor MDX de Nueva Generación**.

Nuestra arquitectura utiliza `next-mdx-remote/rsc`, permitiendo renderizar Markdown con componentes de React del lado del servidor (React Server Components), ofreciendo un rendimiento inigualable (Core Web Vitals) y una experiencia de escritura rica en funcionalidades.

---

## 🛠️ Tecnologías Instaladas

El motor procesa los archivos `.mdx` utilizando las siguientes herramientas y plugins:

1. **`next-mdx-remote/rsc`**: Compilador principal que transforma texto MDX en componentes React en el servidor.
2. **`remark-gfm`**: Soporte para GitHub Flavored Markdown (tablas, checklists, URLs automáticas, tachados).
3. **`rehype-pretty-code`** (basado en Shiki): Resaltado de sintaxis hermoso y súper eficiente en el servidor (Tema: `github-dark`).
4. **`rehype-slug`**: Genera automáticamente atributos `id` legibles en todos los encabezados (`<h1>`, `<h2>`, etc.).
5. **`rehype-autolink-headings`**: Convierte los encabezados en enlaces "ancla" clickeables para poder compartir secciones específicas.
6. **Componentes FSD Inyectados**: `<Callout />`, `<Mermaid />` y etiquetas HTML re-escritas para la estética *premium* (Tailwind v4 Glassmorphism).

---

## 📝 Cómo crear un nuevo artículo

Los artículos del blog deben colocarse en `content/blog/` y los proyectos en `content/work/`. 
Deben utilizar la extensión `.mdx`.

### 1. El Frontmatter (Metadatos)

Todo archivo **DEBE** comenzar con un bloque de metadatos (Frontmatter) en formato YAML. Sin esto, el sistema arrojará un error.

```yaml
---
title: "Título de tu artículo"
date: "2026-07-20"
summary: "Una breve descripción de 1 a 2 líneas para la tarjeta de presentación."
tags: ["react", "nextjs", "tutorial"]
category: "frontend"
---
```
*(Nota: Las categorías válidas están estrictamente tipadas en `src/entities/content.ts`)*.

### 2. Las 5 Funcionalidades Principales (Sintaxis Soportada)

A continuación, se enumeran las 5 capacidades avanzadas de nuestro motor, junto con el componente `<Callout />`. Estas funcionalidades están diseñadas para crear contenido *Premium* y altamente interactivo.

#### 0. Alertas y Avisos (`<Callout />`)
Llama la atención sobre información importante usando nuestro componente nativo. Soporta *glassmorphism* y se adapta automáticamente al Dark/Light Mode.

**Ejemplo de uso:**
```mdx
<Callout type="info" title="Opcional: Título">
  Tu texto aquí. Tipos válidos: `info`, `success`, `warning`, `danger`.
</Callout>
```
**Nota:** Úsalo para enfatizar puntos clave, pero no abuses de él para no saturar visualmente el artículo.

#### 1. Diagramas Interactivos con `<Mermaid />`
Permite escribir diagramas (flujo, secuencias, clases) que se renderizan asíncronamente en el cliente y **responden al tema** (claro/oscuro) del sitio web en tiempo real.

**Ejemplo de uso:**
```mdx
<Mermaid chart="graph TD;&#10;  A[Cliente] -->|Petición| B(Servidor);&#10;  B --> C{Base de Datos};" />
```
**Explicación Detallada:** 
- Al ser un "Client Component", utiliza *lazy loading* para no afectar el LCP (Largest Contentful Paint). 
- Escucha el `resolvedTheme` de `next-themes` y se reinicializa si el usuario cambia el diseño de claro a oscuro.
- *(Tip: Usa [Mermaid Live Editor](https://mermaid.live/) para generar tu gráfico y pega el código con los saltos de línea escapados como `&#10;`).*

#### 2. Optimización Automática de Imágenes (`next/image`)
Si utilizamos la sintaxis estándar de Markdown para imágenes, el motor la intercepta automáticamente y la reemplaza por el componente `<Image />` de Next.js.

**Ejemplo de uso:**
```mdx
![Arquitectura de la aplicación](/images/blog/mi-imagen.jpg)
```
**Explicación Detallada:**
- Transforma la imagen al formato WebP/AVIF.
- Aplica carga diferida (*lazy-loading*).
- Envuelve la imagen en un contenedor `aspect-video rounded-xl shadow-sm backdrop-blur-sm` que previene los *layout shifts* (saltos en la pantalla).
- **Importante:** Las imágenes deben colocarse en la carpeta `public/images/` para ser cargadas localmente y evitar errores de dominios no configurados.

#### 3. Syntax Highlighting de Nivel Servidor (`rehype-pretty-code`)
Muestra bloques de código con un resaltado de sintaxis hermoso utilizando el motor **Shiki** en tiempo de compilación.

**Ejemplo de uso:**
````mdx
```typescript
const framework = "Next.js";
console.log(`Construyendo con ${framework}`);
```
````
**Explicación Detallada:**
- No envía pesados scripts de JavaScript al navegador del usuario (como Prism.js o Highlight.js). Todo el HTML con sus clases de colores ya viene procesado por el servidor.
- Utiliza el tema predeterminado `github-dark`.
- Se le inyectó un diseño *Premium* global con bordes suaves, colores oscuros estrictos y bordes redondeados (`rounded-xl`).

#### 4. Enlaces Automáticos y Tabla de Contenidos (Slugs)
Todo título generado en Markdown (`##`, `###`) se convierte automáticamente en un **enlace clickeable**.

**Ejemplo de uso:**
```mdx
## Mi Sección Genial
```
**Explicación Detallada:**
- **`rehype-slug`**: Inyecta un ID automático (`id="mi-seccion-genial"`).
- **`rehype-autolink-headings`**: Envuelve el título con un tag `<a>`, permitiendo que el usuario copie la URL exacta hacia esa sección (ej: `misitio.com/blog/articulo#mi-seccion-genial`).
- Poseen una transición visual suave (`hover:opacity-80`) al pasar el cursor por encima.

#### 5. Markdown Súper-cargado (`remark-gfm`)
Soportamos **GitHub Flavored Markdown (GFM)** de forma nativa para estructurar el contenido de forma compleja con un mínimo esfuerzo.

**Ejemplos de uso:**

**A. Tablas Avanzadas (100% de Ancho, Estilo FSD):**
```mdx
| Funcionalidad | Motor |
| ------------- | ----- |
| Sintaxis Code | Shiki |
```
El motor intercepta `table`, `th`, `td` y les inyecta un diseño responsivo de extremo a extremo (`w-full`), sombras sutiles, cabeceras en mayúscula y efectos *hover* en las filas.

**B. Listas de Tareas (Checklists):**
```mdx
- [x] Implementar Callouts
- [ ] Finalizar el portafolio
```
Genera un checkbox (`<input type="checkbox">`) personalizado que coincide con los colores corporativos y respeta el *Dark Mode*.

**C. Otros Elementos Especiales:**
- ~~Texto tachado~~ (`~~texto~~`).
- URLs automáticas (escribir `https://github.com` genera el link sin necesidad de envolverlo).

---

## 🛑 Reglas y Mejores Prácticas (Do's and Don'ts)

### ✅ QUÉ HACER (Do's)
- **Usar rutas absolutas para imágenes**: Coloca las imágenes en `public/images/` e invócalas como `/images/tu-imagen.jpg`.
- **Estructurar con encabezados**: Usa `##` y `###` de manera lógica. El motor generará anclas (URLs con `#`) automáticamente.
- **Rellenar atributos ALT**: Siempre incluye texto alternativo en las imágenes (`![alt](url)`) para cumplir con la Accesibilidad (WCAG 2.1 AA).

### ❌ QUÉ NO HACER (Don'ts)
- **No importar componentes locales dentro del MDX**: A menos que estén globales en `mdx.tsx`, no intentes hacer `import { MiComponente } from ...` dentro del `.mdx`.
- **No uses la etiqueta HTML `<img>` directamente**: Utiliza siempre la sintaxis de Markdown `![alt](url)` para beneficiarte de la optimización automática.
- **No uses variables de estado (Hooks)**: El contenido MDX corre bajo Server Components de manera asíncrona.
- **No abuses de los `<Callout>`**: Úsalos esporádicamente para romper la monotonía visual o avisos críticos, pero no para párrafos normales.

---

## 📚 Enlaces Oficiales y Documentación

Para profundizar en las tecnologías detrás de nuestro motor de escritura, consulta las documentaciones oficiales:

- **Next.js MDX**: [https://nextjs.org/docs/app/building-your-application/configuring/mdx](https://nextjs.org/docs/app/building-your-application/configuring/mdx)
- **GitHub Flavored Markdown (GFM)**: [https://github.github.com/gfm/](https://github.github.com/gfm/)
- **Mermaid.js (Sintaxis de Diagramas)**: [https://mermaid.js.org/intro/](https://mermaid.js.org/intro/)
- **Rehype Pretty Code (Shiki)**: [https://rehype-pretty.pages.dev/](https://rehype-pretty.pages.dev/)
- **Next-MDX-Remote**: [https://github.com/hashicorp/next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)

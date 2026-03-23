# Henry Taby - Developer Portfolio & Technical Blog

Este es el código fuente del portafolio personal y blog técnico de Henry Taby. Fue construido íntegramente centrado en el rendimiento extremo, escalabilidad estática y una experiencia de usuario (UI/UX) premium tipo Silicon Valley.

## 🚀 Stack Tecnológico Privilegiado
El sitio está construido estrictamente sobre las herramientas de ingeniería web más modernas:
- **Core Framework:** Next.js (App Router, versión local turbopack)
- **Lenguaje Principal:** TypeScript (Strict Mode)
- **Estilización UI:** Tailwind CSS v4
- **Motor de Contenido:** Motor MDX personalizado construido sobre Node.js `fs` procesando con `next-mdx-remote/rsc` (Sin usar bibliotecas obsoletas como contentlayer ni dependencias a CMS externos).
- **Tipografía y Estética:** Google Fonts (Geist Sans & Mono), *Glassmorphism* avanzado e iconografía con `lucide-react`. Soporte total al plugin tipográfico Tailwind `.prose`. Paridad nativa a los temas de coloreado de VS Code vía `rehype-pretty-code`.

## 📁 Rutas y Estructura Arquitectónica
El diseño obedece al estándar de alto nivel de la industria para Perfiles Senior:
- **`/` (Home):** Landing impactante, hero asimétrico e introducción masiva con tarjetas dinámicas flotantes.
- **`/work`:** Portafolio estilizado enfocado a *Casos de Estudio* profundos (sustituyendo a la vieja nomenclatura *projects*).
- **`/work/[slug]`:** Rutas dinámicas SSG que renderizan la documentación de cada trabajo estructurado por *Problema*, *Solución*, *Tech Stack* y *Resultados*.
- **`/blog`:** Recopilación de artículos de ingeniería organizados cronológicamente.
- **`/blog/[slug]`:** Renderización dinámica SSG de artículos con sintaxis GFM. 
- **`/about` & `/contact`:** Páginas estáticas para biografía profesional y contacto corporativo.

## ⚙️ Ecosistema Local ("Headless" CMS)
Toda tu data transaccional (Casos y Blogs) emite de la carpeta `/content/` estructurada puramente en archivos `.mdx` locales con *Frontmatter*. 
- `frontmatter` de Blogs: `{ title, date, summary, tags }`
- `frontmatter` de Work: `{ title, date, summary, tags, liveUrl, githubUrl }`

## 💻 Comandos de Desarrollo
```bash
# Instalar dependencias puras
npm install

# Levantar entorno con Turbopack
npm run dev

# Auditar Generación Estática de todo el motor
npm run build 
```

## 🌐 SEO & Producción
Todas las rutas compilan a HTML puro en *Build Time* (SSG). El motor adjunta automáticamente los metadatos requeridos por Google, Twitter Cards, OpenGraph, compilando el `robots.txt` y `sitemap.xml` dinámicamente mediante la API de Metadatos de Next.js. El proyecto está listo para ser despachado a Vercel on-push.

# 📖 Guía de Onboarding para Desarrolladores

¡Hola y bienvenido(a) al equipo! 👋 

Si estás leyendo esto, es porque te estás sumando a la construcción y mejora del **Portfolio y Blog Técnico de Henry Taby**. Este documento es tu mapa del tesoro. Ha sido redactado didácticamente para que entiendas cómo instalar el proyecto, cómo está organizado nuestro ecosistema y cómo puedes empezar a aportar valor desde tu primer día.

---

## 1. 🛠️ Requisitos Previos

Antes de escribir tu primera línea de código, asegúrate de tener instalado en tu entorno:
- **Node.js** (v18.17 o superior) - El motor de nuestro entorno.
- **NPM** (v9 o superior) - Gestor de paquetes.
- **Git** - Para el control de versiones.
- Tu IDE favorito (recomendamos **VS Code** o **Antigravity IDE** si utilizas IA).

---

## 2. 🚀 Instalación y Primeros Pasos

Sigue esta secuencia para tener el proyecto corriendo en tu máquina local en menos de 5 minutos:

1. **Clonar el repositorio y entrar al directorio:**
   ```bash
   git clone <URL-DEL-REPO>
   cd henrytaby-web
   ```

2. **Instalar dependencias del proyecto:**
   ```bash
   npm install
   ```

3. **Instalar los motores de los Navegadores para Pruebas (Playwright):**
   *(Nuestros flujos críticos se prueban con Playwright simulando navegadores reales. **Nota**: Este comando puede instalar dependencias del sistema operativo, por lo que es normal que te solicite permisos de administrador o `sudo`).*
   ```bash
   npx playwright install --with-deps
   ```

4. **Levantar el entorno de desarrollo:**
   ```bash
   npm run dev
   ```
   ¡Listo! Abre `http://localhost:3000` en tu navegador. Deberías ver la plataforma en acción (potenciada por Next.js 16 y Turbopack).

---

## 3. 🧩 Entendiendo nuestra Arquitectura (FSD)

Este proyecto no está organizado "como caiga". Utilizamos estrictamente **Feature-Sliced Design (FSD)**. Esto significa que nuestro código se divide por responsabilidad de negocio.

Todo el código fuente vive dentro de `/src` y sigue una jerarquía unidireccional (una capa solo puede importar elementos de las capas que están por debajo de ella):

1. 📱 **`app/` (Capa superior):** Contiene el enrutamiento de Next.js (`page.tsx`, `layout.tsx`). *Regla: Aquí no va lógica de negocio, sólo se conectan las features.*
2. ⚙️ **`features/`:** Contiene los casos de uso principales (`blog/`, `work/`, `contact/`). Si vas a crear una funcionalidad nueva, probablemente vaya aquí.
3. 🧬 **`entities/`:** Contiene los modelos de negocio y tipos (ej. la estructura estricta de cómo debe lucir un Post del Blog).
4. 🧱 **`shared/` (Capa base):** Recursos 100% reutilizables y sin contexto de negocio. Aquí viven los botones (`ui/Button`), utilidades de texto, íconos y layouts puros.

> **💡 Consejo Didáctico:** Si necesitas crear un Botón nuevo, pregúntate: ¿Es un botón genérico? Va en `shared/ui`. ¿Es un botón que hace algo ultra específico con la base de datos de los artículos del blog? Entonces es una parte de `features/blog`.

---

## 4. 🧰 El Ecosistema de Comandos (Tu día a día)

Nuestra plataforma mantiene una calidad estricta (Score 9.2/10). Para asegurarnos de no romper nada, disponemos de estos comandos en el `package.json`:

- `npm run dev`: Inicia tu servidor local para desarrollar.
- `npm run build`: Construye la versión optimizada de producción (SSG). Usa esto para probar cómo se comportará la app real.
- `npm run storybook`: Abre un catálogo interactivo de todos nuestros componentes de UI (ideal para explorar qué botones o tarjetas ya existen antes de crear los tuyos).
- `npm run lint` y `npx tsc --noEmit`: Ejecutan ESLint y TypeScript en modo estricto. Requerido antes de subir código.
- **`npm run test`**: Ejecuta las pruebas unitarias (Vitest).
- **`npm run e2e`**: Ejecuta los tests de flujos completos simulando a un usuario real (Playwright).

---

## 5. 💡 Cómo Contribuir (El Flujo de Trabajo)

Cuando vayas a resolver un issue o crear una mejora, sigue estos 5 pasos de oro:

### Paso 1: Crea tu rama
Mantén tu repositorio actualizado y crea una rama descriptiva.
```bash
git checkout -b feature/nueva-tarjeta-de-blog
# o para arreglar bugs: git checkout -b fix/error-contacto
```

### Paso 2: Programa con Estándares
- Escribe código utilizando componentes de la carpeta `shared/ui` (con Tailwind CSS v4).
- Usa tipado estricto. Nada de `any`.
- Si agregas formularios, usamos **Zod** para la validación obligatoria.

### Paso 3: Documenta Visualmente y Testea
- Si creaste un componente visual nuevo, agrégalo al catálogo de Storybook.
- Si agregaste lógica de negocio, crea su test correspondiente (ej. `tu-componente.test.tsx`) en su misma carpeta. Vitest lo detectará automáticamente.

### Paso 4: Pasa la "Prueba de Fuego" (Pipeline Local)
Antes de hacer tu "Commit", debes asegurarte de que tu código sea digno de producción. Corre este comando maestro:
```bash
npm run lint && npx tsc --noEmit && npm run test && npm run e2e
```
*Si todo está en verde, ¡felicidades, tu código es excelente!*

### Paso 5: Pull Request
Sube tu rama a GitHub y abre un Pull Request (PR) describiendo claramente qué problema resolviste y capturas de pantalla si cambiaste la interfaz gráfica.

---

## 6. 🤖 Trabajando con IA (Asistentes de Código)

Si utilizas asistentes de Inteligencia Artificial (Antigravity IDE, Cursor, Windsurf, Copilot, etc.) para codificar:
- Las reglas absolutas del proyecto para las IAs viven en el archivo **`AGENTS.md`** en la raíz del proyecto.
- Si vas a instruir a un agente, simplemente pídele que lea el archivo `AGENTS.md` primero. Ese archivo contiene nuestra Biblia arquitectónica, el cual impedirá que el agente cometa errores estructurales o destruya la accesibilidad que hemos logrado.

---

**¡Mucho éxito con tu primer aporte! No dudes en revisar el resto de archivos en esta carpeta `docs/` para un conocimiento aún más profundo sobre nuestra arquitectura.**

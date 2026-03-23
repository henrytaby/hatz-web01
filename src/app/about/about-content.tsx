"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutContent() {
  return (
    <div className="w-full flex flex-col pb-2">
      {/* Hero Banner al 100% de la pantalla (Efecto Estático) */}
      <div className="absolute left-0 w-full -mt-8 h-[190px] flex items-end shadow-inner overflow-hidden">
        {/* Imagen de Fondo (Efecto Ken Burns) */}
        <motion.div 
          animate={{ 
            scale: [1, 1.15, 1],
            x: [0, -20, 0]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          style={{ willChange: "transform" }}
          className="absolute inset-0 bg-[url('/img/banners/banner-02.jpg')] bg-cover bg-position-[50%_45%]"
        />

        {/* Capa de Puntos (Dot Grid) - Mucho más fluida que las líneas */}
        <div 
          className="absolute inset-0 z-10 opacity-[0.25] pointer-events-none"
          style={{ 
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.8) 1px, transparent 1.5px)', 
            backgroundSize: '18px 18px' 
          }}
        />

        {/* Vignette Radial (Sombra suave en bordes) */}
        <div className="absolute inset-0 z-10 bg-radial-[circle_at_center,transparent_40%,rgba(0,0,0,0.3)_100%] pointer-events-none" />
        
        {/* Tinte oscuro suave general */}
        <div className="absolute inset-0 bg-black/5 z-0 pointer-events-none" />

        {/* Contenedor interno alineado con el resto de la página */}
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 md:px-8 pb-3">
          <h1 className="text-[2.75em] font-normal text-foreground tracking-tight drop-shadow-md">Acerca de mí</h1>
        </div>
      </div>

      {/* Spacer para el flujo del documento debido a que el banner es absoluto */}
      <div className="w-full h-[190px] -mt-8 mb-8 md:mb-12 pointer-events-none" aria-hidden="true" />

      {/* Grid Principal Editorial */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-8 flex flex-col lg:flex-row gap-12 lg:gap-16 items-start overflow-visible">

        {/* Columna Izquierda: Biografía Narrativa */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex flex-col gap-10"
        >
          {/* Encabezado de Nombre */}
          <div className="flex flex-col gap-2">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              Henry Alejandro <br className="hidden md:block" /> Taby Zenteno
            </h2>
            <div className="h-1 w-20 bg-red-600 rounded-full mt-2" />
          </div>

          <div className="font-normal text-justify text-muted-foreground text-base leading-relaxed space-y-8">
            <p className="text-lg md:text-xl text-foreground font-medium leading-relaxed italic border-l-4 border-zinc-200 dark:border-zinc-800 pl-6">
              "Apasionado por la intersección entre la precisión del código y la narrativa visual, buscando siempre entender y documentar el mundo a través de la tecnología y el arte."
            </p>

            <div className="space-y-6">
              <p>
                Hola, soy Henry Taby, desarrollador de software y fotógrafo trabajando desde Bolivia. Mi enfoque no tiene fronteras; me especializo en arquitectar soluciones robustas y liderar equipos multidisciplinarios hacia el éxito técnico.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="bg-zinc-50 dark:bg-zinc-900/40 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                  <h3 className="text-lg font-bold text-foreground mb-2">Ingeniería</h3>
                  <p className="text-sm">Enfoque riguroso en calidad mediante principios SOLID y sistemas de misión crítica.</p>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-900/40 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                  <h3 className="text-lg font-bold text-foreground mb-2">Creatividad</h3>
                  <p className="text-sm">Narrativa visual que explora desde paisajes naturales hasta geometría urbana.</p>
                </div>
              </div>
            </div>

            <section className="space-y-6 pt-6">
              <h3 className="text-2xl font-bold tracking-tight text-foreground">Desarrollo de Software y Liderazgo</h3>
              <p>
                Mi experiencia abarca desde la creación de APIs de alto impacto con <strong>Python (FastAPI)</strong> y <strong>Node.js</strong>, hasta el desarrollo de interfaces modernas y dinámicas con <strong>Angular</strong> y <strong>React</strong>.
                Tengo experiencia en Sistemas de Información Geoespacial (SIG) e integración de Inteligencia Artificial para transformar datos en valor predictivo real.
              </p>
            </section>

            <section className="space-y-6 pt-6 border-t border-border/10">
              <h3 className="text-2xl font-bold tracking-tight text-foreground">Fotografía: El Ojo Técnico</h3>
              <p>
                Busco capturar momentos únicos y contar historias que resuenen emocionalmente. Para mí, cada toma es un ejercicio de composición y luz que complementa mi pensamiento lógico como ingeniero. No son mundos separados, sino dos lenguajes de una misma curiosidad.
              </p>
            </section>
          </div>
        </motion.div>

        {/* Columna Derecha (Sidebar): Retrato + Quick Info (Balanceando el vacío lateral) */}
        <aside className="w-full lg:w-[400px] shrink-0 space-y-8 sticky top-24 pb-12">

          {/* Foto Principal (Ajustada a Square y con position relative obligatoria para 'fill') */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative w-full aspect-square rounded-3xl overflow-hidden bg-muted border border-border/40 shadow-2xl ring-1 ring-black/5 dark:ring-white/10"
          >
            <Image
              src="/img/content/retrato.jpg"
              alt="Retrato Henry Taby"
              fill
              sizes="(max-width: 1024px) 100vw, 400px"
              priority
              className="object-cover"
            />
          </motion.div>

          {/* Bloques de Datos Rápidos (Filling the space) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            {/* Tech Stack Categorizado (Filling the space) */}
            <div className="p-6 bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-lg space-y-5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Tech Stack</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-[11px] font-bold text-zinc-400 uppercase mb-2">Backend</h5>
                  <div className="flex flex-wrap gap-2">
                    {["Python (FastAPI)", "Node.js (NestJS)", "PostgreSQL/PostGIS"].map(tag => (
                      <span key={tag} className="px-2 py-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 rounded-lg text-[11px] font-semibold border border-zinc-200/50 dark:border-zinc-800/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-[11px] font-bold text-zinc-400 uppercase mb-2">Frontend</h5>
                  <div className="flex flex-wrap gap-2">
                    {["Angular", "React", "Tailwind CSS"].map(tag => (
                      <span key={tag} className="px-2 py-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 rounded-lg text-[11px] font-semibold border border-zinc-200/50 dark:border-zinc-800/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-[11px] font-bold text-zinc-400 uppercase mb-2">Data & AI</h5>
                  <div className="flex flex-wrap gap-2">
                    {["Machine Learning", "AI Integration", "ETL"].map(tag => (
                      <span key={tag} className="px-2 py-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 rounded-lg text-[11px] font-semibold border border-zinc-200/50 dark:border-zinc-800/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-[11px] font-bold text-zinc-400 uppercase mb-2">Tools</h5>
                  <div className="flex flex-wrap gap-2">
                    {["Docker", "Git"].map(tag => (
                      <span key={tag} className="px-2 py-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 rounded-lg text-[11px] font-semibold border border-zinc-200/50 dark:border-zinc-800/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Global Expertise Brief (Layout Compacto) */}
            <div className="p-6 bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-lg">
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Global Expertise</h4>
              <ul className="space-y-2">
                <li className="text-[11px] text-muted-foreground flex items-baseline gap-2">
                  <span className="text-zinc-400 font-bold uppercase shrink-0">Académico:</span>
                  <span className="text-foreground font-medium italic">Maestría en IA & Data Science</span>
                </li>
                <li className="text-[11px] text-muted-foreground flex items-baseline gap-2">
                  <span className="text-zinc-400 font-bold uppercase shrink-0">Internacional:</span>
                  <span className="text-foreground font-medium">Consultor BID / OTCA / GIZ</span>
                </li>
                <li className="text-[11px] text-muted-foreground flex items-baseline gap-2">
                  <span className="text-zinc-400 font-bold uppercase shrink-0">Inglés:</span>
                  <span className="text-foreground font-medium">Técnico Avanzado</span>
                </li>
                <li className="text-[11px] text-muted-foreground flex items-baseline gap-2">
                  <span className="text-zinc-400 font-bold uppercase shrink-0">Metodologías:</span>
                  <span className="text-foreground font-medium">SCRUM / Agile / Clean Code</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </aside>
      </div>

      {/* Sección Final de Ancho Completo para Filosofía (Rompe el 2-column) */}
      <section className="w-full bg-zinc-50 dark:bg-zinc-900/40 py-5 mt-5 md:mt-10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <h3 className="text-3xl font-bold tracking-tight text-foreground">Mi Filosofía</h3>
            <p className="text-muted-foreground text-base leading-relaxed text-justify">
              Creo en el aprendizaje continuo y en la adaptabilidad como motores de innovación. Busco constantemente nuevas aventuras profesionales y retos internacionales donde pueda aportar mi experiencia técnica y mi capacidad de gestión para crear productos extraordinarios.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <h3 className="text-3xl font-bold tracking-tight text-foreground">Más Allá del Trabajo</h3>
            <p className="text-muted-foreground text-base leading-relaxed text-justify">
              Cuando no estoy diseñando arquitecturas de software o capturando una escena, disfruto de la naturaleza, el ciclismo de montaña y el estudio del desarrollo personal. Soy un defensor del equilibrio entre la vida profesional y personal, creyendo que la curiosidad fuera de la oficina es lo que realmente alimenta la innovación dentro de ella.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Coda Final con Watermark (Refinamiento Estético para llenar el espacio) */}
      <div className="relative w-full overflow-hidden py-16 md:py-24 text-center">
        {/* Background Watermark Text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none">
          <span className="text-[15vw] font-black uppercase tracking-tighter">CREATIVE</span>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative z-10 text-zinc-500 dark:text-zinc-400 text-sm md:text-base italic font-medium tracking-wide"
        >
          "La tecnología es el medio, el arte es el mensaje."
        </motion.p>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";

export function AboutBiography() {
  return (
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
          &ldquo;Apasionado por la intersección entre la precisión del código y la narrativa visual, buscando siempre entender y documentar el mundo a través de la tecnología y el arte.&rdquo;
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
  );
}

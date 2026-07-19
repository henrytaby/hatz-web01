"use client";

import { motion } from "framer-motion";

export function AboutPhilosophy() {
  return (
    <section className="w-full bg-zinc-50 dark:bg-zinc-900/40 py-5 mt-5 md:mt-10">
      <div className="max-w-container mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
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
  );
}

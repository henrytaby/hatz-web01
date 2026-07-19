"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function AboutSidebar() {
  return (
    <aside className="w-full lg:w-100 shrink-0 space-y-8 sticky top-24 pb-12">
      {/* Foto Principal */}
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

      {/* Bloques de Datos Rápidos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="flex flex-col gap-6"
      >
        {/* Tech Stack Categorizado */}
        <div className="p-6 bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-lg space-y-5">
          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Tech Stack</h4>

          <div className="space-y-4">
            <TechCategory label="Backend" items={["Python (FastAPI)", "Node.js (NestJS)", "PostgreSQL/PostGIS"]} />
            <TechCategory label="Frontend" items={["Angular", "React", "Tailwind CSS"]} />
            <TechCategory label="Data & AI" items={["Machine Learning", "AI Integration", "ETL"]} />
            <TechCategory label="Tools" items={["Docker", "Git"]} />
          </div>
        </div>

        {/* Global Expertise Brief */}
        <div className="p-6 bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-lg">
          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Global Expertise</h4>
          <ul className="space-y-2">
            <ExpertiseItem label="Académico" value="Maestría en IA & Data Science" />
            <ExpertiseItem label="Internacional" value="Consultor BID / OTCA / GIZ" />
            <ExpertiseItem label="Inglés" value="Técnico Avanzado" />
            <ExpertiseItem label="Metodologías" value="SCRUM / Agile / Clean Code" />
          </ul>
        </div>
      </motion.div>
    </aside>
  );
}

// Helper components for cleaner code
function TechCategory({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <h5 className="text-[11px] font-bold text-zinc-400 uppercase mb-2">{label}</h5>
      <div className="flex flex-wrap gap-2">
        {items.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 rounded-lg text-[11px] font-semibold border border-zinc-200/50 dark:border-zinc-800/50"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function ExpertiseItem({ label, value }: { label: string; value: string }) {
  return (
    <li className="text-[11px] text-muted-foreground flex items-baseline gap-2">
      <span className="text-zinc-400 font-bold uppercase shrink-0">{label}:</span>
      <span className="text-foreground font-medium italic">{value}</span>
    </li>
  );
}

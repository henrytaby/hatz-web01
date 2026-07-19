"use client";

import { motion } from "framer-motion";

export function AboutCoda() {
  return (
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
        &ldquo;La tecnología es el medio, el arte es el mensaje.&rdquo;
      </motion.p>
    </div>
  );
}

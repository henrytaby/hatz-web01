"use client";

import { motion } from "framer-motion";

export default function BlogHero() {
  return (
    <div className="absolute left-0 w-full -mt-8 h-[190px] flex items-end shadow-inner overflow-hidden">
      {/* Imagen de Fondo (Efecto Ken Burns) */}
      <motion.div
        initial={{ transformOrigin: "center center" }}
        animate={{
          scale: [1, 1.08, 1],
          rotate: [0.01, 0.01, 0.01],
          z: 0.1
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          willChange: "transform, scale",
          backfaceVisibility: "hidden",
          transformStyle: "preserve-3d",
          perspective: "1000px"
        }}
        className="absolute inset-0 bg-[url('/img/banners/banner-03.jpg')] bg-cover bg-position-[40%_35%]"
      />

      {/* Capa de Puntos (Dot Grid) - Versión densa 3px */}
      <div
        className="absolute inset-0 z-10 opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.8) 1px, transparent 1.5px)',
          backgroundSize: '3px 3px'
        }}
      />

      {/* Vignette Radial (Sombra suave en bordes) */}
      <div className="absolute inset-0 z-10 bg-radial-[circle_at_center,transparent_40%,rgba(0,0,0,0.3)_100%] pointer-events-none" />

      {/* Tinte oscuro suave general */}
      <div className="absolute inset-0 bg-black/5 z-0 pointer-events-none" />

      {/* Contenedor interno alineado con el resto de la página */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 md:px-8 pb-3">
        <h1 className="text-[2.75em] font-normal text-zinc-800 tracking-tight drop-shadow-md">
          Blog Técnico
        </h1>
      </div>
    </div>
  );
}

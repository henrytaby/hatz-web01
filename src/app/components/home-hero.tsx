import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HomeHero() {
  return (
    <section className="flex flex-col items-start gap-8 mt-16 md:mt-24 w-full relative">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/20 blur-[120px] rounded-full opacity-30 pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Status badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/80 border border-border text-sm font-medium text-muted-foreground">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        Disponible para nuevos retos
      </div>

      {/* Main headline */}
      <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter max-w-4xl text-foreground leading-[1.05]! drop-shadow-sm">
        Ingeniería Web <br />
        <span className="text-transparent bg-clip-text bg-linear-to-r from-neutral-400 to-neutral-700 dark:from-neutral-200 dark:to-neutral-500 inline-block">
          Elevada a Arte.
        </span>
      </h1>

      {/* Subheadline */}
      <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl leading-relaxed mt-2 font-light">
        Soy Henry Taby. Construyo arquitecturas escalables, interfaces veloces
        y experiencias digitales{" "}
        <strong className="font-semibold text-foreground">premium</strong>.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto">
        <Link
          href="/work"
          className="group flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-xl text-sm font-bold h-12 px-8 bg-foreground text-background hover:bg-foreground/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-foreground/10"
        >
          Ver Proyectos{" "}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          href="/contact"
          className="flex flex-1 sm:flex-none items-center justify-center rounded-xl text-sm font-bold h-12 px-8 border border-border bg-background/50 backdrop-blur-sm text-foreground hover:bg-muted transition-colors active:scale-95"
        >
          Hablemos
        </Link>
      </div>
    </section>
  );
}

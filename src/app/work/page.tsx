import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getWorkProjects } from "@/features/work";
import { WorkList } from "@/features/work";
import { PageHero, PageHeroSpacer } from "@/shared/ui";

export const metadata = {
  title: "Work | Henry Taby",
  description: "Portafolio y Casos de Estudio de Henry Taby.",
};

export default function WorkPage() {
  const projects = getWorkProjects();

  return (
    <div className="w-full flex flex-col pb-2">
      <PageHero
        title="Work & Casos de Estudio"
        backgroundImage="/img/banners/banner-04.jpg"
        bgPosition="40% 45%"
      />

      <PageHeroSpacer />

      {/* Work Content */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-8 relative">
        {/* Ambient glow */}
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 blur-[100px] rounded-full opacity-20 pointer-events-none -z-10"
          aria-hidden="true"
        />

        {/* Description */}
        <div className="flex flex-col gap-4 mb-16 max-w-2xl">
          <p className="text-xl text-muted-foreground leading-relaxed">
            Una cuidadosa selección de herramientas, plataformas y bibliotecas
            que he diseñado y construido, mostrando la arquitectura detrás.
          </p>
        </div>

        {/* Projects List */}
        <WorkList projects={projects} />

        {/* View All Link */}
        <div className="w-full flex justify-center md:justify-end">
          <Link
            href="/work"
            className="text-sm font-bold text-muted-foreground hover:text-foreground inline-flex items-center gap-2 transition-colors group"
          >
            Ver el portafolio entero{" "}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

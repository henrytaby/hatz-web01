"use client";

import { PageHero, PageHeroSpacer } from "@/shared/ui";
import { AboutBiography, AboutSidebar, AboutPhilosophy, AboutCoda } from "./components";

export default function AboutContent() {
  return (
    <div className="w-full flex flex-col pb-2">
      {/* Hero Banner */}
      <PageHero
        title="Acerca de mí"
        backgroundImage="/img/banners/banner-02.jpg"
        animation="kenBurns"
      />
      <PageHeroSpacer />

      {/* Grid Principal Editorial */}
      <div className="w-full max-w-container mx-auto px-6 md:px-8 flex flex-col lg:flex-row gap-12 lg:gap-16 items-start overflow-visible">
        {/* Columna Izquierda: Biografía Narrativa */}
        <AboutBiography />

        {/* Columna Derecha (Sidebar): Retrato + Quick Info */}
        <AboutSidebar />
      </div>

      {/* Sección Final de Ancho Completo para Filosofía */}
      <AboutPhilosophy />

      {/* Coda Final con Watermark */}
      <AboutCoda />
    </div>
  );
}

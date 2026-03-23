import Image from "next/image";

export const metadata = {
  title: "Acerca de mí",
  description: "Conoce más sobre Henry Taby, Software Developer y Fotógrafo.",
};

export default function AboutPage() {
  return (
    <div className="w-full flex flex-col pb-2">
      {/* Hero Banner al 100% de la pantalla (Efecto Estático) */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] -mt-8 h-[190px] mb-12 flex items-end bg-[url('/img/about-banner.jpg')] bg-cover bg-position-[50%_45%] shadow-inner overflow-hidden">

        {/* Overlay: Rejilla estilo TV antigua (Scanlines + Tinte oscuro) */}
        <div className="absolute inset-0 bg-black/15 z-0 pointer-events-none" />
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]"
          style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px)', backgroundSize: '100% 3px' }}
        />

        {/* Contenedor interno alineado con el resto de la página */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-8 pb-3">
          <h1 className="text-[2.75em] font-normal text-foreground tracking-tight drop-shadow-md">Acerca de mí</h1>
        </div>
      </div>

      {/* Disposición a 2 Columnas (Contenido + Retrato) */}
      <div className="w-full flex flex-col md:flex-row gap-12 md:gap-24 relative">

        {/* Columna Izquierda: Textos */}
        <div className="flex-1 flex flex-col gap-6 md:pt-4">

          <div className="flex flex-col gap-1 border-b border-border/10 pb-2 mb-1">
            <h2 className="text-[32px] font-bold tracking-tight text-foreground leading-tight">Henry Alejandro Taby Zenteno</h2>
            <p className="text-red-600 dark:text-red-500 font-semibold tracking-wide uppercase mt-1 text-[14px] flex items-center gap-2">
              Software Developer <span className="opacity-50">—</span> Fotógrafo
            </p>
          </div>

          <div className="font-normal text-justify text-muted-foreground leading-relaxed space-y-6">
            <p>
              Hola, soy Henry Taby, un apasionado desarrollador de software y fotógrafo en Bolivia. Desde una edad temprana, me he sentido atraído por la tecnología y la creatividad, lo que me ha llevado a desarrollar habilidades en dos campos que, aunque diferentes, se complementan de manera única: la programación y la fotografía.
            </p>

            <div>
              <h3 className="text-xl font-bold tracking-tight text-foreground mb-3">Desarrollo de Software</h3>
              <p>
                Mi carrera en el desarrollo de software comenzó con una curiosidad insaciable por entender cómo funcionan las cosas. A lo largo de los años, he adquirido experiencia en diversas tecnologías y lenguajes de programación, trabajando en proyectos que van desde aplicaciones web hasta soluciones móviles. Mi enfoque se centra en crear software robusto, eficiente y fácil de usar, siempre con el objetivo de resolver problemas reales y mejorar la vida de las personas.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold tracking-tight text-foreground mb-3">Fotografía</h3>
              <p>
                La fotografía es mi otra gran pasión. A través del lente de mi cámara, busco capturar momentos únicos y contar historias visuales que resuenen con las emociones de quienes las ven. Mi trabajo fotográfico abarca una variedad de géneros, incluyendo retratos, paisajes y fotografía urbana. Cada fotografía es una oportunidad para explorar nuevas perspectivas y experimentar con la luz, el color y la composición.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold tracking-tight text-foreground mb-3">Mi Filosofía</h3>
              <p>
                Creo firmemente en el aprendizaje continuo y la adaptación a los cambios. La intersección entre la tecnología y la creatividad es donde encuentro mi mayor inspiración, y siempre estoy buscando maneras de integrar estas dos pasiones para crear algo verdaderamente extraordinario.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold tracking-tight text-foreground mb-3">Más Allá del Trabajo</h3>
              <p className="mb-4">
                Cuando no estoy programando o tomando fotos, disfruto explorando la naturaleza, manejando bici de montaña, leyendo libros sobre desarrollo personal y tecnología, y conectando con otros profesionales y entusiastas en mis áreas de interés. Soy un firme defensor del equilibrio entre el trabajo y la vida personal, y creo que cultivar hobbies y relaciones significativas es clave para una vida plena y satisfactoria.
              </p>
              <p>
                Gracias por tomarte el tiempo de conocerme un poco más. Te invito a explorar mi portafolio y mi blog para ver más de mi trabajo y mis pensamientos. Si tienes alguna pregunta o simplemente quieres charlar, no dudes en ponerte en contacto conmigo. ¡Espero saber de ti pronto!
              </p>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Foto de Retrato Sticky */}
        <div className="w-full md:w-[400px] shrink-0">
          <div className="sticky top-24 w-full aspect-4/5 rounded-4xl overflow-hidden bg-muted border border-border shadow-2xl group">
            <Image src="/img/retrato.jpg" alt="Retrato Henry Taby" fill sizes="(max-width: 768px) 100vw, 400px" priority className="object-cover transition-transform duration-1000 group-hover:scale-105" />
          </div>
        </div>

      </div>
    </div>
  );
}

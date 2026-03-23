"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí podrías integrar Formspree, Resend o un Server Action.
    // Por ahora demostramos el estado exitoso en la UI estática.
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

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
          className="absolute inset-0 bg-[url('/img/banners/banner-01.jpg')] bg-cover bg-position-[50%_45%]"
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
          <h1 className="text-[2.75em] font-normal text-foreground tracking-tight drop-shadow-md">Contacto</h1>
        </div>
      </div>

      {/* Spacer para el flujo del documento debido a que el banner es absoluto */}
      <div className="w-full h-[190px] -mt-8 mb-12 pointer-events-none" aria-hidden="true" />

      {/* Contenido principal animado y balanceado */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-8 mt-2 mb-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 w-full items-start">

          {/* Columna Izquierda: Mensaje & Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-10 w-full lg:w-1/2"
          >
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                Hagamos algo increíble juntos.
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed text-justify">
                ¡Gracias por visitar mi sitio web! Si tienes preguntas, comentarios, o necesitas asistencia en algún proyecto, no dudes en ponerte en contacto conmigo. Estoy aquí para ayudarte y me encantaría escuchar tus ideas. Puedes enviarme un mensaje a través del formulario de contacto o enviar un correo electrónico directo. Haré todo lo posible para responder súper rápido. ¡Espero saber de ti pronto!
              </p>
            </div>

            <div className="flex flex-col gap-8 bg-zinc-100 dark:bg-zinc-900/30 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Email Directo</h3>
                <a
                  href="mailto:hola@henrytaby.com"
                  className="inline-flex items-center gap-3 text-base font-medium text-foreground hover:text-red-600 transition-colors"
                >
                  <Mail className="w-6 h-6 text-red-600" /> hola@henrytaby.com
                </a>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Disponibilidad</h3>
                <p className="text-base font-medium text-foreground flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  Abierto a propuestas
                </p>
              </div>
            </div>
          </motion.div>

          {/* Columna Derecha: Formulario Glassmorphism */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <div className="w-full bg-white dark:bg-zinc-950 overflow-hidden rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 backdrop-blur-xl p-8 md:p-10 relative">
              
              {/* Sutil resplandor rojo de fondo en la tarjeta */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

              <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-bold uppercase tracking-wider text-zinc-500">Nombre Completo</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="P. ej., Elon Musk"
                    className="flex h-14 w-full rounded-xl border border-border bg-zinc-50 dark:bg-black/50 px-4 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 transition-all disabled:opacity-50"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-zinc-500">Email Oficial</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="elon@spacex.com"
                    className="flex h-14 w-full rounded-xl border border-border bg-zinc-50 dark:bg-black/50 px-4 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 transition-all disabled:opacity-50"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-bold uppercase tracking-wider text-zinc-500">Tu Idea o Mensaje</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Cuéntame sobre el proyecto increíble que tienes en mente..."
                    className="flex min-h-[140px] w-full rounded-xl border border-border bg-zinc-50 dark:bg-black/50 px-4 py-4 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 transition-all disabled:opacity-50 resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitted}
                  className="mt-2 inline-flex items-center justify-center gap-3 rounded-xl text-base font-bold h-14 px-8 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-red-600 dark:hover:bg-red-600 hover:text-white dark:hover:text-white transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group shadow-lg"
                >
                  {submitted ? (
                    <>
                      Mensaje Enviado <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </>
                  ) : (
                    <>
                      Enviar Mensaje Ahora <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

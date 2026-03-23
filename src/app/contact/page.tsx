"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { PageHero, PageHeroSpacer } from "@/components/ui/page-hero";

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
      {/* Hero Banner */}
      <PageHero
        title="Contacto"
        backgroundImage="/img/banners/banner-01.jpg"
        animation="kenBurnsPan"
      />
      <PageHeroSpacer />

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
              <ContactInfo
                label="Email Directo"
                href="mailto:hola@henrytaby.com"
                value="hola@henrytaby.com"
                icon={<Mail className="w-6 h-6 text-red-600" />}
              />

              <AvailabilityStatus />
            </div>
          </motion.div>

          {/* Columna Derecha: Formulario Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <ContactForm submitted={submitted} onSubmit={handleSubmit} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Helper components for cleaner code
function ContactInfo({
  label,
  href,
  value,
  icon,
}: {
  label: string;
  href: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">{label}</h3>
      <a
        href={href}
        className="inline-flex items-center gap-3 text-base font-medium text-foreground hover:text-red-600 transition-colors"
      >
        {icon} {value}
      </a>
    </div>
  );
}

function AvailabilityStatus() {
  return (
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
  );
}

function ContactForm({
  submitted,
  onSubmit,
}: {
  submitted: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="w-full bg-white dark:bg-zinc-950 overflow-hidden rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 backdrop-blur-xl p-8 md:p-10 relative">
      {/* Sutil resplandor rojo de fondo en la tarjeta */}
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <form onSubmit={onSubmit} className="flex flex-col gap-6 relative z-10">
        <FormField
          id="name"
          label="Nombre Completo"
          placeholder="P. ej., Elon Musk"
          required
        />

        <FormField
          id="email"
          label="Email Oficial"
          type="email"
          placeholder="elon@spacex.com"
          required
        />

        <FormField
          id="message"
          label="Tu Idea o Mensaje"
          placeholder="Cuéntame sobre el proyecto increíble que tienes en mente..."
          required
          multiline
        />

        <SubmitButton submitted={submitted} />
      </form>
    </div>
  );
}

function FormField({
  id,
  label,
  type = "text",
  placeholder,
  required,
  multiline,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  multiline?: boolean;
}) {
  const inputClasses =
    "flex w-full rounded-xl border border-border bg-zinc-50 dark:bg-black/50 px-4 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 transition-all disabled:opacity-50";

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-bold uppercase tracking-wider text-zinc-500">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={id}
          required={required}
          rows={5}
          placeholder={placeholder}
          className={`${inputClasses} min-h-[140px] resize-y`}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          required={required}
          placeholder={placeholder}
          className={`${inputClasses} h-14`}
        />
      )}
    </div>
  );
}

function SubmitButton({ submitted }: { submitted: boolean }) {
  return (
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
          Enviar Mensaje Ahora{" "}
          <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </>
      )}
    </button>
  );
}

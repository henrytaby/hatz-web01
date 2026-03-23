"use client";

import { motion } from "framer-motion";
import { PageHero, PageHeroSpacer } from "@/shared/ui";
import { ContactForm, ContactInfo } from "@/features/contact";

export default function ContactPage() {
  return (
    <div className="w-full flex flex-col pb-2">
      {/* Hero Banner */}
      <PageHero
        title="Contacto"
        backgroundImage="/img/banners/banner-01.jpg"
        animation="kenBurnsPan"
      />
      <PageHeroSpacer />

      {/* Main Content */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-8 mt-2 mb-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 w-full items-start">
          {/* Left Column: Message & Contact Info */}
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

            <ContactInfo
              email="hola@henrytaby.com"
              availabilityText="Abierto a propuestas"
            />
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

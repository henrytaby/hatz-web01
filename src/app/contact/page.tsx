"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";

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
    <div className="max-w-2xl flex flex-col items-start w-full">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Contacto</h1>
      <p className="text-lg text-muted-foreground mb-12">
        ¿Te interesa colaborar o tienes alguna pregunta? Escríbeme y me pondré en contacto lo antes posible.
      </p>

      <div className="w-full flex flex-col md:flex-row gap-12">
        
        {/* Contact info */}
        <div className="flex flex-col gap-6 shrink-0 md:w-1/3">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-foreground">Email</h3>
            <a 
              href="mailto:hola@henrytaby.com" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" /> hola@henrytaby.com
            </a>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-foreground">Disponibilidad</h3>
            <p className="text-muted-foreground flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              Abierto a propuestas
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full md:w-2/3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium text-foreground">Nombre</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required
              placeholder="Elon Musk"
              className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required
              placeholder="elon@tesla.com"
              className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-sm font-medium text-foreground">Mensaje</label>
            <textarea 
              id="message" 
              name="message" 
              required
              rows={4}
              placeholder="Me gustaría trabajar contigo..."
              className="flex min-h-[100px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
            />
          </div>

          <button 
            type="submit" 
            disabled={submitted}
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-10 px-4 py-2 bg-foreground text-background hover:bg-foreground/90 transition-colors mt-2 disabled:opacity-80 disabled:cursor-not-allowed"
          >
            {submitted ? (
              <>
               Mensaje enviado <CheckCircle2 className="w-4 h-4" />
              </>
            ) : (
              <>
               Enviar mensaje <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

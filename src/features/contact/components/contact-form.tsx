"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Button, Input, Textarea } from "@/shared/ui";

interface ContactFormProps {
    onSubmit?: (data: ContactFormData) => void;
}

export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export function ContactForm({ onSubmit }: ContactFormProps) {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        email: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (onSubmit) {
            onSubmit(formData);
        }

        // Demo state - in production, integrate with Formspree, Resend, or Server Action
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div
            className="w-full bg-white dark:bg-zinc-950 overflow-hidden rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 backdrop-blur-xl p-8 md:p-10 relative"
            role="region"
            aria-labelledby="contact-form-title"
        >
            {/* Screen reader only title */}
            <h2 id="contact-form-title" className="sr-only">
                Formulario de contacto
            </h2>

            {/* Subtle red glow background */}
            <div
                className="absolute -top-10 -right-10 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none"
                aria-hidden="true"
            />

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 relative z-10"
                aria-label="Envía un mensaje de contacto"
                noValidate
            >
                <Input
                    id="name"
                    name="name"
                    label="Nombre Completo"
                    placeholder="P. ej., Elon Musk"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    aria-required="true"
                    aria-describedby="name-hint"
                />
                <span id="name-hint" className="sr-only">
                    Ingresa tu nombre completo
                </span>

                <Input
                    id="email"
                    name="email"
                    type="email"
                    label="Email Oficial"
                    placeholder="elon@spacex.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    aria-required="true"
                    aria-describedby="email-hint"
                    autoComplete="email"
                />
                <span id="email-hint" className="sr-only">
                    Ingresa tu dirección de correo electrónico
                </span>

                <Textarea
                    id="message"
                    name="message"
                    label="Tu Idea o Mensaje"
                    placeholder="Cuéntame sobre el proyecto increíble que tienes en mente..."
                    required
                    value={formData.message}
                    onChange={handleChange}
                    aria-required="true"
                    aria-describedby="message-hint"
                />
                <span id="message-hint" className="sr-only">
                    Describe tu proyecto o mensaje
                </span>

                <Button
                    type="submit"
                    disabled={submitted}
                    className="mt-2 bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-red-600 dark:hover:bg-red-600 hover:text-white dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    aria-live="polite"
                >
                    {submitted ? (
                        <>
                            <span className="sr-only">Estado: </span>
                            Mensaje Enviado{" "}
                            <CheckCircle2
                                className="w-5 h-5 text-green-500"
                                aria-hidden="true"
                            />
                            <span className="sr-only"> exitosamente</span>
                        </>
                    ) : (
                        <>
                            Enviar Mensaje Ahora{" "}
                            <Send
                                className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                                aria-hidden="true"
                            />
                        </>
                    )}
                </Button>

                {/* Success announcement for screen readers */}
                {submitted && (
                    <div
                        className="sr-only"
                        role="status"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        Tu mensaje ha sido enviado exitosamente. Te responderé pronto.
                    </div>
                )}
            </form>
        </div>
    );
}

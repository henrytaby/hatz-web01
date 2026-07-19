"use client";

import { useState, useTransition } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { z } from "zod";
import { Button, Input, Textarea } from "@/shared/ui";
import { submitContactForm } from "../api/actions";

const contactSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("Correo electrónico inválido"),
    message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
    onSubmit?: (data: ContactFormData) => void;
}

export function ContactForm({ onSubmit }: ContactFormProps) {
    const [submitted, setSubmitted] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        email: "",
        message: "",
    });
    const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
    const [serverError, setServerError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setServerError(null);

        // 1. Client-side validation (rápida)
        const result = contactSchema.safeParse(formData);
        
        if (!result.success) {
            const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
            const flatErrors = result.error.flatten().fieldErrors;
            if (flatErrors.name) fieldErrors.name = flatErrors.name[0];
            if (flatErrors.email) fieldErrors.email = flatErrors.email[0];
            if (flatErrors.message) fieldErrors.message = flatErrors.message[0];
            setErrors(fieldErrors);
            return;
        }

        setErrors({});

        if (onSubmit) {
            onSubmit(formData);
        }

        // 2. Ejecutar la Server Action (Validación en servidor y procesamiento real)
        startTransition(async () => {
            const response = await submitContactForm(formData);
            
            if (response.success) {
                setSubmitted(true);
                setFormData({ name: "", email: "", message: "" }); // Limpiar formulario
                setTimeout(() => setSubmitted(false), 5000);
            } else {
                if (response.errors) {
                    // Errores de validación del servidor
                    const serverFieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
                    if (response.errors.name) serverFieldErrors.name = response.errors.name[0];
                    if (response.errors.email) serverFieldErrors.email = response.errors.email[0];
                    if (response.errors.message) serverFieldErrors.message = response.errors.message[0];
                    setErrors(serverFieldErrors);
                } else if (response.message) {
                    // Mensaje de error general del servidor
                    setServerError(response.message);
                }
            }
        });
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name as keyof ContactFormData]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
        if (serverError) {
            setServerError(null);
        }
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
                    error={errors.name}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error name-hint" : "name-hint"}
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
                    error={errors.email}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error email-hint" : "email-hint"}
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
                    error={errors.message}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error message-hint" : "message-hint"}
                />
                <span id="message-hint" className="sr-only">
                    Describe tu proyecto o mensaje
                </span>

                <Button
                    type="submit"
                    disabled={submitted || isPending}
                    className="mt-2 bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-red-600 dark:hover:bg-red-600 hover:text-white dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-70"
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
                    ) : isPending ? (
                        <>
                            Enviando...
                            <Loader2
                                className="w-5 h-5 animate-spin"
                                aria-hidden="true"
                            />
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

                {serverError && (
                    <div
                        className="text-sm text-red-500 font-medium"
                        role="alert"
                    >
                        {serverError}
                    </div>
                )}

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

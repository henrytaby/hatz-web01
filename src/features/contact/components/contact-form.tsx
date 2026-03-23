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
        <div className="w-full bg-white dark:bg-zinc-950 overflow-hidden rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 backdrop-blur-xl p-8 md:p-10 relative">
            {/* Subtle red glow background */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                <Input
                    id="name"
                    name="name"
                    label="Nombre Completo"
                    placeholder="P. ej., Elon Musk"
                    required
                    value={formData.name}
                    onChange={handleChange}
                />

                <Input
                    id="email"
                    name="email"
                    type="email"
                    label="Email Oficial"
                    placeholder="elon@spacex.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                />

                <Textarea
                    id="message"
                    name="message"
                    label="Tu Idea o Mensaje"
                    placeholder="Cuéntame sobre el proyecto increíble que tienes en mente..."
                    required
                    value={formData.message}
                    onChange={handleChange}
                />

                <Button
                    type="submit"
                    disabled={submitted}
                    className="mt-2 bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-red-600 dark:hover:bg-red-600 hover:text-white dark:hover:text-white"
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
                </Button>
            </form>
        </div>
    );
}

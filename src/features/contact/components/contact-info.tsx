import { Mail } from "lucide-react";

interface ContactInfoProps {
    email?: string;
    availabilityText?: string;
}

export function ContactInfo({
    email = "hola@henrytaby.com",
    availabilityText = "Abierto a propuestas",
}: ContactInfoProps) {
    return (
        <div
            className="flex flex-col gap-8 bg-zinc-100 dark:bg-zinc-900/30 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800"
            role="region"
            aria-labelledby="contact-info-title"
        >
            <h2 id="contact-info-title" className="sr-only">
                Información de contacto
            </h2>

            {/* Email */}
            <div className="flex flex-col gap-2">
                <h3
                    className="text-sm font-bold uppercase tracking-widest text-zinc-500"
                    id="email-label"
                >
                    Email Directo
                </h3>
                <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-3 text-base font-medium text-foreground hover:text-red-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                    aria-labelledby="email-label"
                >
                    <Mail className="w-6 h-6 text-red-600" aria-hidden="true" />
                    <span>{email}</span>
                </a>
            </div>

            {/* Availability */}
            <div className="flex flex-col gap-2">
                <h3
                    className="text-sm font-bold uppercase tracking-widest text-zinc-500"
                    id="availability-label"
                >
                    Disponibilidad
                </h3>
                <p
                    className="text-base font-medium text-foreground flex items-center gap-3"
                    aria-labelledby="availability-label"
                >
                    <span
                        className="relative flex h-3 w-3"
                        aria-hidden="true"
                    >
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span>{availabilityText}</span>
                </p>
                {/* Screen reader friendly status */}
                <span className="sr-only" role="status">
                    Estado de disponibilidad: {availabilityText}
                </span>
            </div>
        </div>
    );
}

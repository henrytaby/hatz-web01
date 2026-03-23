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
        <div className="flex flex-col gap-8 bg-zinc-100 dark:bg-zinc-900/30 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800">
            {/* Email */}
            <div className="flex flex-col gap-2">
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">
                    Email Directo
                </h3>
                <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-3 text-base font-medium text-foreground hover:text-red-600 transition-colors"
                >
                    <Mail className="w-6 h-6 text-red-600" />
                    {email}
                </a>
            </div>

            {/* Availability */}
            <div className="flex flex-col gap-2">
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">
                    Disponibilidad
                </h3>
                <p className="text-base font-medium text-foreground flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    {availabilityText}
                </p>
            </div>
        </div>
    );
}

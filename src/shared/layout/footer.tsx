import Image from "next/image";
import { GithubIcon, LinkedinIcon, TwitterIcon, YouTubeIcon } from "@/shared/icons";

const footerTags = ["ARTICULOS", "CHAT", "GALLERY", "PICTURES", "SOFTWARE", "REACT"] as const;

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-zinc-900 dark:bg-black text-zinc-400 pt-5 pb-5 border-t-2 border-zinc-700 mt-5 relative">
            <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 flex flex-col md:flex-row justify-between gap-12 text-sm">
                {/* Brand Column */}
                <div className="flex flex-col gap-4 max-w-sm">
                    <div className="mb-0">
                        <Image
                            src="/img/brand/logo-footer.png"
                            alt="Henry Taby Footer Logo"
                            width={0}
                            height={0}
                            sizes="150px"
                            className="h-24 w-auto object-contain"
                            style={{ height: '96px', width: 'auto' }}
                        />
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                        <SocialLink href="https://github.com/henrytaby/" icon={<GithubIcon className="w-4 h-4" />} label="GitHub" />
                        <SocialLink href="https://www.linkedin.com/in/henrytaby/" icon={<LinkedinIcon className="w-4 h-4" />} label="LinkedIn" />
                        <SocialLink href="https://x.com/henrytaby/" icon={<TwitterIcon className="w-4 h-4" />} label="X (Twitter)" />
                        <SocialLink href="https://www.youtube.com/henrytaby" icon={<YouTubeIcon className="w-4 h-4" />} label="YouTube" />
                    </div>
                </div>

                {/* About Column */}
                <div className="flex flex-col gap-4 max-w-sm">
                    <h3 className="font-bold text-white uppercase tracking-widest mb-2">
                        About Us
                    </h3>
                    <p className="text-zinc-500 leading-relaxed">
                        Bienvenido a la página web de Henry Taby, un desarrollador de software y apasionado fotógrafo. Aquí podrás explorar su portafolio e información valiosa.
                    </p>
                </div>

                {/* Tags Column */}
                <div className="flex flex-col gap-4">
                    <h3 className="font-bold text-white uppercase tracking-widest mb-2">
                        Tags Clave
                    </h3>
                    <div className="flex gap-2 flex-wrap max-w-xs">
                        {footerTags.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs font-bold uppercase py-1 px-3 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded hover:border-red-600 transition-colors cursor-pointer"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="mx-auto w-full max-w-[1440px] px-6 md:px-5 mt-5 pt-5 border-t border-zinc-900 text-center text-zinc-600 text-xs font-medium uppercase tracking-widest">
                ©COPYRIGHT 2004 - {currentYear} | Henry Taby Zenteno | Desarrollador de Software | Fotógrafo
            </div>
        </footer>
    );
}

interface SocialLinkProps {
    href: string;
    icon: React.ReactNode;
    label: string;
}

function SocialLink({ href, icon, label }: SocialLinkProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white text-black rounded-full hover:bg-red-600 hover:text-white transition-colors"
            aria-label={label}
        >
            {icon}
        </a>
    );
}

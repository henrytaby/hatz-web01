"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink } from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
);
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g transform="translate(-180.000000, -7479.000000)" fill="currentColor"><g transform="translate(56.000000, 160.000000)"><path d="M144,7339 L140,7339 L140,7332.001 C140,7330.081 139.153,7329.01 137.634,7329.01 C135.981,7329.01 135,7330.126 135,7332.001 L135,7339 L131,7339 L131,7326 L135,7326 L135,7327.462 C135,7327.462 136.255,7325.26 139.083,7325.26 C141.912,7325.26 144,7326.986 144,7330.558 L144,7339 L144,7339 Z M126.442,7323.921 C125.093,7323.921 124,7322.819 124,7321.46 C124,7320.102 125.093,7319 126.442,7319 C127.79,7319 128.883,7320.102 128.883,7321.46 C128.884,7322.819 127.79,7323.921 126.442,7323.921 L126.442,7323.921 Z M124,7339 L129,7339 L129,7326 L124,7326 L124,7339 Z"></path></g></g></g></svg>
);
const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}><title>X</title><path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" /></svg>
);
const YouTubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}><title>YouTube</title><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
);
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  { path: "/", label: "Inicio" },
  { path: "/about", label: "Acerca de mí" },
  { path: "/blog", label: "Blog" },
  { path: "/work", label: "Proyectos" },
  { path: "/contact", label: "Contacto" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 w-full h-[60px] z-50 bg-background/95 backdrop-blur-lg border-b border-border shadow-sm transition-colors flex items-center">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-8 flex items-center justify-between">
        <Link href="/" className="hover:opacity-80 transition-opacity flex items-center -ml-2">
          <img src="/img/brand/logo.png" alt="Henry Taby Logo" className="h-[45px] w-auto dark:hidden" />
          <img src="/img/brand/logo-footer.png" alt="Henry Taby Logo Blanco" className="h-[45px] w-auto hidden dark:block" />
        </Link>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              // Exact match para root "/", startsWith para el resto para mantener estado activo en sub-rutas (ej /blog/post-1)
              const isActive = item.path === "/" ? pathname === "/" : pathname?.startsWith(item.path);
              
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-[15px] font-semibold uppercase tracking-wide transition-colors duration-200 ${
                    isActive
                      ? "text-red-600 dark:text-red-500"
                      : "text-foreground/80 hover:text-red-600 dark:hover:text-red-500"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4 border-l border-border pl-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="w-full bg-zinc-900 dark:bg-black text-zinc-400 pt-5 pb-5 border-t-2 border-zinc-700 mt-5 relative">

      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 flex flex-col md:flex-row justify-between gap-12 text-sm">
        {/* Col 1 */}
        <div className="flex flex-col gap-4 max-w-sm">
          <div className="mb-0">
            <img src="/img/brand/logo-footer.png" alt="Henry Taby Footer Logo" className="h-24 w-auto object-contain" />
          </div>
          <div className="flex items-center gap-4 mt-2">
            <a href="https://github.com/henrytaby/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white text-black rounded-full hover:bg-red-600 hover:text-white transition-colors">
              <GithubIcon className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/henrytaby/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white text-black rounded-full hover:bg-red-600 hover:text-white transition-colors">
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a href="https://x.com/henrytaby/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white text-black rounded-full hover:bg-red-600 hover:text-white transition-colors">
              <TwitterIcon className="w-4 h-4" />
            </a>
            <a href="https://www.youtube.com/henrytaby" target="_blank" rel="noopener noreferrer" className="p-2 bg-white text-black rounded-full hover:bg-red-600 hover:text-white transition-colors">
              <YouTubeIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 2 */}
        <div className="flex flex-col gap-4 max-w-sm">
          <h3 className="font-bold text-white uppercase tracking-widest mb-2">About Us</h3>
          <p className="text-zinc-500 leading-relaxed">
            Bienvenido a la página web de Henry Taby, un desarrollador de software y apasionado fotógrafo. Aquí podrás explorar su portafolio e información valiosa.
          </p>
        </div>

        {/* Col 3 */}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-white uppercase tracking-widest mb-2">Tags Clave</h3>
          <div className="flex gap-2 flex-wrap max-w-xs">
            {["ARTICULOS", "CHAT", "GALLERY", "PICTURES", "SOFTWARE", "REACT"].map(tag => (
              <span key={tag} className="text-xs font-bold uppercase py-1 px-3 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded hover:border-red-600 transition-colors cursor-pointer">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-5 mt-5 pt-5 border-t border-zinc-900 text-center text-zinc-600 text-xs font-medium uppercase tracking-widest">
        ©COPYRIGHT 2004 - {new Date().getFullYear()} | Henry Taby Zenteno | Desarrollador de Software | Fotógrafo
      </div>
    </footer>
  );
}

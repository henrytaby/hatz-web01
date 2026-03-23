import Link from "next/link";
import { Github, Linkedin, Twitter, ExternalLink } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  { path: "/about", label: "Acerca de mí" },
  { path: "/blog", label: "Blog" },
  { path: "/work", label: "Proyectos" },
  { path: "/contact", label: "Contacto" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 w-full h-[60px] z-50 bg-background/95 backdrop-blur-lg border-b border-border shadow-sm transition-colors flex items-center">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-8 flex items-center justify-between">
        <Link href="/" className="hover:opacity-80 transition-opacity flex items-center -ml-2">
          <img src="/img/logo.png" alt="Henry Taby Logo" className="h-[45px] w-auto dark:hidden" />
          <img src="/img/logo-footer.png" alt="Henry Taby Logo Blanco" className="h-[45px] w-auto hidden dark:block" />
        </Link>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="text-[15px] font-semibold uppercase tracking-wide text-foreground/80 hover:text-red-600 dark:hover:text-red-500 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
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
    <footer className="w-full bg-zinc-950 dark:bg-black text-zinc-400 pt-16 pb-8 border-t-4 border-red-600 mt-20 relative">
      <div className="absolute top-0 left-10 md:left-20 -translate-y-full bg-red-600 text-white font-serif italic py-2 px-6 rounded-t-md shadow-lg">
        Lucha por tus sueños
      </div>
      
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-8 flex flex-col md:flex-row justify-between gap-12 text-sm">
        {/* Col 1 */}
        <div className="flex flex-col gap-4 max-w-sm">
          <div className="mb-2">
            <img src="/img/logo-footer.png" alt="Henry Taby Footer Logo" className="h-14 w-auto object-contain" />
          </div>
          <div className="flex items-center gap-4 mt-2">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white text-black rounded-full hover:bg-red-600 hover:text-white transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white text-black rounded-full hover:bg-red-600 hover:text-white transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white text-black rounded-full hover:bg-red-600 hover:text-white transition-colors">
              <Twitter className="w-4 h-4" />
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
      
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-8 mt-16 pt-8 border-t border-zinc-900 text-center text-zinc-600 text-xs uppercase tracking-widest">
        ©COPYRIGHT 2004 - {new Date().getFullYear()} | Henry Taby Zenteno | Desarrollador de Software | Fotógrafo
      </div>
    </footer>
  );
}

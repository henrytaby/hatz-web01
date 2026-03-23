"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navigationItems } from "@/config";
import { ThemeToggle } from "./theme-toggle";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

export function Navbar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Close menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;

        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = originalOverflow || "unset";
        }

        return () => {
            document.body.style.overflow = originalOverflow || "unset";
        };
    }, [isMenuOpen]);

    const handleMenuToggle = useCallback(() => {
        setIsMenuOpen((prev) => !prev);
    }, []);

    const handleCloseMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    const isNavItemActive = useCallback(
        (path: string) => {
            if (path === "/") {
                return pathname === "/";
            }
            return pathname?.startsWith(path);
        },
        [pathname]
    );

    return (
        <>
            <header className="sticky top-0 w-full h-[60px] z-50 bg-background/95 backdrop-blur-lg border-b border-border shadow-sm transition-colors flex items-center font-sans">
                <div className="mx-auto w-full max-w-[1440px] px-6 md:px-8 flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="hover:opacity-80 transition-opacity flex items-center -ml-2"
                    >
                        <img
                            src="/img/brand/logo.png"
                            alt="Henry Taby Logo"
                            className="h-[45px] w-auto dark:hidden"
                        />
                        <img
                            src="/img/brand/logo-footer.png"
                            alt="Henry Taby Logo"
                            className="h-[45px] w-auto hidden dark:block"
                        />
                    </Link>

                    <div className="flex items-center gap-6">
                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
                            {navigationItems.map((item) => {
                                const isActive = isNavItemActive(item.path);
                                return (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        className={`text-[15px] font-semibold uppercase tracking-wide transition-colors duration-200 ${isActive
                                            ? "text-red-600 dark:text-red-500"
                                            : "text-foreground/80 hover:text-red-600 dark:hover:text-red-500"
                                            }`}
                                        aria-current={isActive ? "page" : undefined}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="flex items-center gap-2 md:gap-4 border-l border-border pl-4">
                            <ThemeToggle />

                            {/* Mobile Menu Button */}
                            <button
                                className="md:hidden p-2 text-foreground hover:text-red-600 transition-colors"
                                onClick={handleMenuToggle}
                                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                                aria-expanded={isMenuOpen}
                                aria-controls="mobile-menu"
                            >
                                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        id="mobile-menu"
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed inset-0 z-[9999] bg-background md:hidden flex flex-col"
                    >
                        {/* Mobile Menu Header */}
                        <div className="h-[60px] flex items-center justify-between px-6 md:px-8 border-b border-border">
                            <Link
                                href="/"
                                className="flex items-center -ml-2"
                                onClick={handleCloseMenu}
                            >
                                <img
                                    src="/img/brand/logo.png"
                                    alt="Logo"
                                    className="h-[45px] w-auto dark:hidden"
                                />
                                <img
                                    src="/img/brand/logo-footer.png"
                                    alt="Logo"
                                    className="h-[45px] w-auto hidden dark:block"
                                />
                            </Link>
                            <button
                                onClick={handleCloseMenu}
                                className="p-2 text-foreground hover:text-red-500 transition-colors"
                                aria-label="Close menu"
                            >
                                <X size={28} />
                            </button>
                        </div>

                        {/* Mobile Navigation */}
                        <nav className="flex-1 flex flex-col items-center justify-start pt-16 gap-8 p-12 overflow-y-auto" aria-label="Mobile navigation">
                            {navigationItems.map((item, index) => {
                                const isActive = isNavItemActive(item.path);
                                return (
                                    <motion.div
                                        key={item.path}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="w-full text-center"
                                    >
                                        <Link
                                            href={item.path}
                                            onClick={handleCloseMenu}
                                            className={`text-4xl font-bold uppercase tracking-tighter transition-all hover:scale-105 inline-block ${isActive
                                                ? "text-red-600 dark:text-red-500"
                                                : "text-foreground/60 hover:text-red-600 dark:hover:text-red-500"
                                                }`}
                                            aria-current={isActive ? "page" : undefined}
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                );
                            })}

                            {/* Social Links */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="flex items-center gap-8 mt-8 pt-12 border-t border-border/50 w-2/3 justify-center"
                            >
                                <a
                                    href="https://github.com/henrytaby/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-muted border border-border rounded-full hover:bg-red-600 hover:text-white transition-all"
                                    aria-label="GitHub profile"
                                >
                                    <GithubIcon className="w-6 h-6" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/henrytaby/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-muted border border-border rounded-full hover:bg-red-600 hover:text-white transition-all"
                                    aria-label="LinkedIn profile"
                                >
                                    <LinkedinIcon className="w-6 h-6" />
                                </a>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

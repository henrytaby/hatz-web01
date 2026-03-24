"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navigationItems } from "@/config";
import { ThemeToggle } from "./theme-toggle";
import { GithubIcon, LinkedinIcon } from "@/shared/icons";

export function Navbar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuCloseButtonRef = useRef<HTMLButtonElement>(null);
    const menuOpenButtonRef = useRef<HTMLButtonElement>(null);
    const firstMenuItemRef = useRef<HTMLAnchorElement>(null);

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

    // Prevent body scroll when menu is open
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

    // Focus management: move focus to close button when menu opens
    useEffect(() => {
        if (isMenuOpen && menuCloseButtonRef.current) {
            // Small delay to ensure animation has started
            const timeoutId = setTimeout(() => {
                menuCloseButtonRef.current?.focus();
            }, 100);
            return () => clearTimeout(timeoutId);
        } else if (!isMenuOpen && menuOpenButtonRef.current) {
            // Return focus to menu button when menu closes
            menuOpenButtonRef.current.focus();
        }
    }, [isMenuOpen]);

    // Handle keyboard navigation in mobile menu
    useEffect(() => {
        if (!isMenuOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsMenuOpen(false);
                return;
            }

            // Tab trap within mobile menu
            if (e.key === "Tab") {
                const focusableElements = document.querySelectorAll(
                    '#mobile-menu button, #mobile-menu a[href], #mobile-menu input, #mobile-menu [tabindex]:not([tabindex="-1"])'
                );
                const firstElement = focusableElements[0] as HTMLElement;
                const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

                if (e.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement?.focus();
                    }
                } else {
                    // Tab
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement?.focus();
                    }
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
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
            <header
                className="sticky top-0 w-full h-[60px] z-50 bg-background/95 backdrop-blur-lg border-b border-border shadow-sm transition-colors flex items-center font-sans"
                role="banner"
            >
                <div className="mx-auto w-full max-w-[1440px] px-6 md:px-8 flex items-center justify-between">
                    <Link
                        href="/"
                        className="hover:opacity-80 transition-opacity flex items-center -ml-2"
                        aria-label="Henry Taby - Home"
                    >
                        <img
                            src="/img/brand/logo.png"
                            alt=""
                            className="h-[45px] w-auto dark:hidden"
                            aria-hidden="true"
                        />
                        <img
                            src="/img/brand/logo-footer.png"
                            alt=""
                            className="h-[45px] w-auto hidden dark:block"
                            aria-hidden="true"
                        />
                        <span className="sr-only">Henry Taby - Home</span>
                    </Link>

                    <div className="flex items-center gap-6">
                        <nav
                            className="hidden md:flex items-center gap-8"
                            role="navigation"
                            aria-label="Main navigation"
                        >
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

                            <button
                                ref={menuOpenButtonRef}
                                className="md:hidden p-2 text-foreground hover:text-red-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md"
                                onClick={handleMenuToggle}
                                aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                                aria-expanded={isMenuOpen}
                                aria-controls="mobile-menu"
                                aria-haspopup="dialog"
                            >
                                {isMenuOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        id="mobile-menu"
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed inset-0 z-9999 bg-background md:hidden flex flex-col"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Navigation menu"
                    >
                        <div className="h-[60px] flex items-center justify-between px-6 md:px-8 border-b border-border">
                            <Link
                                href="/"
                                className="flex items-center -ml-2"
                                onClick={handleCloseMenu}
                                aria-label="Henry Taby - Home"
                            >
                                <img
                                    src="/img/brand/logo.png"
                                    alt=""
                                    className="h-[45px] w-auto dark:hidden"
                                    aria-hidden="true"
                                />
                                <img
                                    src="/img/brand/logo-footer.png"
                                    alt=""
                                    className="h-[45px] w-auto hidden dark:block"
                                    aria-hidden="true"
                                />
                                <span className="sr-only">Henry Taby - Home</span>
                            </Link>
                            <button
                                ref={menuCloseButtonRef}
                                onClick={handleCloseMenu}
                                className="p-2 text-foreground hover:text-red-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md"
                                aria-label="Close navigation menu"
                            >
                                <X size={28} aria-hidden="true" />
                            </button>
                        </div>

                        <nav
                            className="flex-1 flex flex-col items-center justify-start pt-16 gap-8 p-12 overflow-y-auto"
                            role="navigation"
                            aria-label="Mobile navigation"
                        >
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
                                            ref={index === 0 ? firstMenuItemRef : undefined}
                                            className={`text-4xl font-bold uppercase tracking-tighter transition-all hover:scale-105 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-sm px-2 ${isActive
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

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="flex items-center gap-8 mt-8 pt-12 border-t border-border/50 w-2/3 justify-center"
                                role="contentinfo"
                                aria-label="Social media links"
                            >
                                <a
                                    href="https://github.com/henrytaby/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-muted border border-border rounded-full hover:bg-red-600 hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                    aria-label="Visit Henry Taby's GitHub profile (opens in new tab)"
                                >
                                    <GithubIcon className="w-6 h-6" aria-hidden="true" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/henrytaby/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-muted border border-border rounded-full hover:bg-red-600 hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                    aria-label="Visit Henry Taby's LinkedIn profile (opens in new tab)"
                                >
                                    <LinkedinIcon className="w-6 h-6" aria-hidden="true" />
                                </a>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

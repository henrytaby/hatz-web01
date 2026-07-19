"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HTMLAttributes, ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

type AnimationVariant = "kenBurns" | "kenBurnsPan" | "static";

// ============================================================================
// PRIMITIVAS: COMPONENTES COMPUESTOS (10/10 Open/Closed Principle)
// Abiertos para extensión (podemos añadir botones, subtítulos), cerrados a modificación.
// ============================================================================

export interface PageHeroRootProps extends HTMLAttributes<HTMLDivElement> {
    backgroundImage: string;
    bgPosition?: string;
    animation?: AnimationVariant;
    animationDuration?: number;
    children?: ReactNode;
}

const animationVariants = {
    kenBurns: {
        animate: {
            scale: [1, 1.08, 1],
            rotate: [0.01, 0.01, 0.01],
            z: 0.1,
        },
        duration: 25,
    },
    kenBurnsPan: {
        animate: {
            scale: [1, 1.15, 1],
            x: [0, -20, 0],
            rotate: [0.01, 0.01, 0.01],
            z: 0.1,
        },
        duration: 20,
    },
    static: {
        animate: {},
        duration: 0,
    },
};

export const PageHeroRoot = forwardRef<HTMLDivElement, PageHeroRootProps>(
    ({
        backgroundImage,
        bgPosition = "50% 45%",
        animation = "kenBurns",
        animationDuration,
        className,
        children,
        ...props
    }, ref) => {
        const variant = animationVariants[animation];
        const duration = animationDuration ?? variant.duration;

        return (
            <div
                ref={ref}
                className={cn("absolute left-0 w-full -mt-8 h-47.5 flex items-end shadow-inner overflow-hidden", className)}
                role="banner"
                {...props}
            >
                {animation === "static" ? (
                    <div className="absolute inset-0">
                        <Image
                            src={backgroundImage}
                            alt="Hero Background"
                            fill
                            priority
                            className="object-cover"
                            style={{ objectPosition: bgPosition }}
                            sizes="100vw"
                        />
                    </div>
                ) : (
                    <motion.div
                        initial={{ transformOrigin: "center center" }}
                        animate={variant.animate}
                        transition={{
                            duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        style={{
                            willChange: "transform, scale",
                            backfaceVisibility: "hidden",
                            transformStyle: "preserve-3d",
                            perspective: "1000px",
                        }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={backgroundImage}
                            alt="Hero Background"
                            fill
                            priority
                            className="object-cover"
                            style={{ objectPosition: bgPosition }}
                            sizes="100vw"
                        />
                    </motion.div>
                )}

                <div
                    className="absolute inset-0 z-10 opacity-[0.25] pointer-events-none"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, rgba(0,0,0,0.8) 1px, transparent 1.5px)",
                        backgroundSize: "3px 3px",
                    }}
                    aria-hidden="true"
                />

                <div
                    className="absolute inset-0 z-10 bg-radial-[circle_at_center,transparent_40%,rgba(0,0,0,0.3)_100%] pointer-events-none"
                    aria-hidden="true"
                />

                <div
                    className="absolute inset-0 bg-black/5 z-0 pointer-events-none"
                    aria-hidden="true"
                />

                <div className="relative z-20 w-full max-w-container mx-auto px-6 md:px-8 pb-3">
                    {children}
                </div>
            </div>
        );
    }
);
PageHeroRoot.displayName = "PageHeroRoot";

export const PageHeroTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
    ({ className, children, ...props }, ref) => {
        return (
            <h1 
                ref={ref}
                className={cn("text-[2.75em] font-normal text-zinc-800 dark:text-zinc-200 tracking-tight drop-shadow-md", className)} 
                {...props}
            >
                {children}
            </h1>
        );
    }
);
PageHeroTitle.displayName = "PageHeroTitle";

// ============================================================================
// FACHADA (Facade): COMPONENTE POR DEFECTO PARA NO ROMPER COMPATIBILIDAD
// ============================================================================

export interface PageHeroProps extends PageHeroRootProps {
    title: string;
}

const PageHeroComponent = forwardRef<HTMLDivElement, PageHeroProps>(
    ({ title, ...props }, ref) => {
        return (
            <PageHeroRoot ref={ref} {...props}>
                <PageHeroTitle>{title}</PageHeroTitle>
            </PageHeroRoot>
        );
    }
);
PageHeroComponent.displayName = "PageHero";

export const PageHero = Object.assign(PageHeroComponent, {
    Root: PageHeroRoot,
    Title: PageHeroTitle,
});

export const PageHeroSpacer = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn("w-full h-47.5 -mt-8 mb-8 md:mb-12 pointer-events-none", className)}
                aria-hidden="true"
                {...props}
            />
        );
    }
);
PageHeroSpacer.displayName = "PageHeroSpacer";

"use client";

import { motion } from "framer-motion";

type AnimationVariant = "kenBurns" | "kenBurnsPan" | "static";

interface PageHeroProps {
    title: string;
    backgroundImage: string;
    bgPosition?: string;
    /** Animation variant: kenBurns (default), kenBurnsPan, or static */
    animation?: AnimationVariant;
    /** Animation duration in seconds (default: 25) */
    animationDuration?: number;
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

export function PageHero({
    title,
    backgroundImage,
    bgPosition = "50% 45%",
    animation = "kenBurns",
    animationDuration,
}: PageHeroProps) {
    const variant = animationVariants[animation];
    const duration = animationDuration ?? variant.duration;

    return (
        <div
            className="absolute left-0 w-full -mt-8 h-[190px] flex items-end shadow-inner overflow-hidden"
            role="banner"
        >
            {/* Background with Animation Effect */}
            {animation === "static" ? (
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url('${backgroundImage}')`,
                        backgroundSize: "cover",
                        backgroundPosition: bgPosition,
                    }}
                />
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
                        backgroundImage: `url('${backgroundImage}')`,
                        backgroundSize: "cover",
                        backgroundPosition: bgPosition,
                    }}
                    className="absolute inset-0"
                />
            )}

            {/* Dot Grid Overlay */}
            <div
                className="absolute inset-0 z-10 opacity-[0.25] pointer-events-none"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, rgba(0,0,0,0.8) 1px, transparent 1.5px)",
                    backgroundSize: "3px 3px",
                }}
                aria-hidden="true"
            />

            {/* Radial Vignette */}
            <div
                className="absolute inset-0 z-10 bg-radial-[circle_at_center,transparent_40%,rgba(0,0,0,0.3)_100%] pointer-events-none"
                aria-hidden="true"
            />

            {/* Dark Tint Overlay */}
            <div
                className="absolute inset-0 bg-black/5 z-0 pointer-events-none"
                aria-hidden="true"
            />

            {/* Title Container */}
            <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 md:px-8 pb-3">
                <h1 className="text-[2.75em] font-normal text-zinc-800 dark:text-zinc-200 tracking-tight drop-shadow-md">
                    {title}
                </h1>
            </div>
        </div>
    );
}

// Spacer component to use after PageHero
export function PageHeroSpacer() {
    return (
        <div
            className="w-full h-[190px] -mt-8 mb-8 md:mb-12 pointer-events-none"
            aria-hidden="true"
        />
    );
}

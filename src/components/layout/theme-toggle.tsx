// ============================================
// Theme Toggle Component - Henry Taby Web Platform
// ============================================

"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // Only render after mounting to avoid hydration mismatch
    React.useEffect(() => {
        setMounted(true);
    }, []);

    const handleToggle = () => {
        setTheme(resolvedTheme === "light" ? "dark" : "light");
    };

    // Use resolvedTheme for more accurate theme detection
    const currentTheme = mounted ? resolvedTheme : "light";

    return (
        <button
            onClick={handleToggle}
            className="inline-flex items-center justify-center rounded-md w-9 h-9 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label={`Switch to ${currentTheme === "light" ? "dark" : "light"} mode`}
            type="button"
        >
            {mounted ? (
                <>
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </>
            ) : (
                // Placeholder to prevent layout shift
                <div className="h-[1.2rem] w-[1.2rem]" />
            )}
        </button>
    );
}

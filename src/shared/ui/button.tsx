import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
}

const variants = {
    primary: "bg-foreground text-background hover:bg-foreground/90 shadow-lg shadow-foreground/10",
    secondary: "border border-border bg-background/50 backdrop-blur-sm text-foreground hover:bg-muted",
    ghost: "text-foreground hover:bg-muted",
    danger: "bg-red-600 text-white hover:bg-red-700",
};

const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-12 px-6 text-sm",
    lg: "h-14 px-8 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all",
                    "hover:scale-105 active:scale-95",
                    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

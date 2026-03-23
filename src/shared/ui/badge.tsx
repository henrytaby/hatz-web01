import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: "default" | "primary" | "outline";
}

const badgeVariants = {
    default: "bg-muted text-muted-foreground",
    primary: "bg-primary/10 text-primary",
    outline: "border border-border bg-transparent text-foreground",
};

export function Badge({
    className,
    variant = "default",
    children,
    ...props
}: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center px-3 py-1 rounded-md text-xs font-bold tracking-wide uppercase",
                badgeVariants[variant],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}

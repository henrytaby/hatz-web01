import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "glass" | "outline";
    hover?: boolean;
}

const cardVariants = {
    default: "bg-card border border-border",
    glass: "bg-card/40 backdrop-blur-xl border border-border",
    outline: "border border-border bg-transparent",
};

export function Card({
    className,
    variant = "default",
    hover = false,
    children,
    ...props
}: CardProps) {
    return (
        <div
            className={cn(
                "rounded-3xl p-8",
                cardVariants[variant],
                hover && "hover:bg-card hover:border-primary/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({
    className,
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("flex flex-col gap-4", className)} {...props} />;
}

export function CardTitle({
    className,
    ...props
}: HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3
            className={cn(
                "text-2xl font-bold tracking-tight text-foreground",
                className
            )}
            {...props}
        />
    );
}

export function CardDescription({
    className,
    ...props
}: HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p
            className={cn("text-muted-foreground text-base leading-relaxed", className)}
            {...props}
        />
    );
}

export function CardFooter({
    className,
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "mt-8 pt-6 border-t border-border/50 flex items-center justify-between",
                className
            )}
            {...props}
        />
    );
}

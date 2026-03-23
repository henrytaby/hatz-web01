import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, id, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-2">
                {label && (
                    <label
                        htmlFor={id}
                        className="text-sm font-bold uppercase tracking-wider text-zinc-500"
                    >
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={id}
                    className={cn(
                        "flex h-14 w-full rounded-xl border border-border bg-zinc-50 dark:bg-black/50",
                        "px-4 py-2 text-base placeholder:text-muted-foreground",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600",
                        "transition-all disabled:opacity-50",
                        error && "border-red-500 focus-visible:ring-red-500",
                        className
                    )}
                    {...props}
                />
                {error && <span className="text-sm text-red-500">{error}</span>}
            </div>
        );
    }
);

Input.displayName = "Input";

export interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, id, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-2">
                {label && (
                    <label
                        htmlFor={id}
                        className="text-sm font-bold uppercase tracking-wider text-zinc-500"
                    >
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    id={id}
                    className={cn(
                        "flex min-h-[140px] w-full rounded-xl border border-border bg-zinc-50 dark:bg-black/50",
                        "px-4 py-4 text-base placeholder:text-muted-foreground resize-y",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600",
                        "transition-all disabled:opacity-50",
                        error && "border-red-500 focus-visible:ring-red-500",
                        className
                    )}
                    {...props}
                />
                {error && <span className="text-sm text-red-500">{error}</span>}
            </div>
        );
    }
);

Textarea.displayName = "Textarea";

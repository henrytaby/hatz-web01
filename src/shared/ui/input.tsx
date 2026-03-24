import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef, useId } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, hint, id: propId, required, ...props }, ref) => {
        const generatedId = useId();
        const id = propId || generatedId;
        const hintId = `${id}-hint`;
        const errorId = `${id}-error`;

        return (
            <div className="flex flex-col gap-2">
                {label && (
                    <label
                        htmlFor={id}
                        className="text-sm font-bold uppercase tracking-wider text-zinc-500"
                    >
                        {label}
                        {required && (
                            <span className="text-red-500 ml-1" aria-label="campo requerido">
                                *
                            </span>
                        )}
                    </label>
                )}
                <input
                    ref={ref}
                    id={id}
                    aria-required={required ? "true" : undefined}
                    aria-invalid={error ? "true" : undefined}
                    aria-describedby={
                        [hint && hintId, error && errorId].filter(Boolean).join(" ") || undefined
                    }
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
                {hint && !error && (
                    <span id={hintId} className="text-sm text-muted-foreground">
                        {hint}
                    </span>
                )}
                {error && (
                    <span
                        id={errorId}
                        className="text-sm text-red-500"
                        role="alert"
                        aria-live="polite"
                    >
                        {error}
                    </span>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, hint, id: propId, required, ...props }, ref) => {
        const generatedId = useId();
        const id = propId || generatedId;
        const hintId = `${id}-hint`;
        const errorId = `${id}-error`;

        return (
            <div className="flex flex-col gap-2">
                {label && (
                    <label
                        htmlFor={id}
                        className="text-sm font-bold uppercase tracking-wider text-zinc-500"
                    >
                        {label}
                        {required && (
                            <span className="text-red-500 ml-1" aria-label="campo requerido">
                                *
                            </span>
                        )}
                    </label>
                )}
                <textarea
                    ref={ref}
                    id={id}
                    aria-required={required ? "true" : undefined}
                    aria-invalid={error ? "true" : undefined}
                    aria-describedby={
                        [hint && hintId, error && errorId].filter(Boolean).join(" ") || undefined
                    }
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
                {hint && !error && (
                    <span id={hintId} className="text-sm text-muted-foreground">
                        {hint}
                    </span>
                )}
                {error && (
                    <span
                        id={errorId}
                        className="text-sm text-red-500"
                        role="alert"
                        aria-live="polite"
                    >
                        {error}
                    </span>
                )}
            </div>
        );
    }
);

Textarea.displayName = "Textarea";

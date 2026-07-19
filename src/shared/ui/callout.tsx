import React, { HTMLAttributes, forwardRef } from "react";
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// PRIMITIVAS: COMPONENTES COMPUESTOS (10/10 Open/Closed Principle & LSP)
// ============================================================================

export const CalloutRoot = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ children, className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "my-6 flex gap-4 p-5 rounded-xl border border-l-4 backdrop-blur-md shadow-sm transition-all hover:shadow-md",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);
CalloutRoot.displayName = "CalloutRoot";

export const CalloutIcon = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ children, className, ...props }, ref) => {
        return (
            <div ref={ref} className={cn("shrink-0 mt-0.5", className)} {...props}>
                {children}
            </div>
        );
    }
);
CalloutIcon.displayName = "CalloutIcon";

export interface CalloutContentProps extends HTMLAttributes<HTMLDivElement> {
    title?: string;
}

export const CalloutContent = forwardRef<HTMLDivElement, CalloutContentProps>(
    ({ title, children, className, ...props }, ref) => {
        return (
            <div ref={ref} className={cn("flex flex-col gap-1.5 w-full", className)} {...props}>
                {title && (
                    <span className="font-semibold text-sm tracking-wide">
                        {title}
                    </span>
                )}
                <div className="text-sm leading-relaxed [&>p]:m-0 opacity-90">
                    {children}
                </div>
            </div>
        );
    }
);
CalloutContent.displayName = "CalloutContent";

// ============================================================================
// FACHADA (Facade): COMPONENTE POR DEFECTO PARA MDX
// ============================================================================

export interface CalloutProps extends HTMLAttributes<HTMLDivElement> {
    type?: "info" | "warning" | "danger" | "success";
    title?: string;
}

const styles = {
    info: "bg-blue-50/80 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800/30 border-l-blue-500 dark:border-l-blue-500 text-blue-900 dark:text-blue-200",
    warning: "bg-amber-50/80 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/30 border-l-amber-500 dark:border-l-amber-500 text-amber-900 dark:text-amber-200",
    danger: "bg-red-50/80 dark:bg-red-900/10 border-red-200 dark:border-red-800/30 border-l-red-500 dark:border-l-red-500 text-red-900 dark:text-red-200",
    success: "bg-green-50/80 dark:bg-green-900/10 border-green-200 dark:border-green-800/30 border-l-green-500 dark:border-l-green-500 text-green-900 dark:text-green-200",
};

const icons = {
    info: <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />,
    danger: <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" aria-hidden="true" />,
    success: <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" aria-hidden="true" />,
};

type CalloutComponent = React.ForwardRefExoticComponent<CalloutProps & React.RefAttributes<HTMLDivElement>> & {
    Root: typeof CalloutRoot;
    Icon: typeof CalloutIcon;
    Content: typeof CalloutContent;
};

export const Callout = forwardRef<HTMLDivElement, CalloutProps>(
    ({ type = "info", title, className, children, ...props }, ref) => {
        return (
            <CalloutRoot ref={ref} className={cn(styles[type], className)} {...props}>
                <CalloutIcon>{icons[type]}</CalloutIcon>
                <CalloutContent title={title}>{children}</CalloutContent>
            </CalloutRoot>
        );
    }
) as CalloutComponent;

Callout.displayName = "Callout";
Callout.Root = CalloutRoot;
Callout.Icon = CalloutIcon;
Callout.Content = CalloutContent;

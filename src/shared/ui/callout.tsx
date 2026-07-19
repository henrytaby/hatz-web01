import React from "react";
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";

interface CalloutProps {
    type?: "info" | "warning" | "danger" | "success";
    title?: string;
    children: React.ReactNode;
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

export function Callout({ type = "info", title, children }: CalloutProps) {
    return (
        <div className={`my-6 flex gap-4 p-5 rounded-xl border border-l-4 backdrop-blur-md shadow-sm transition-all hover:shadow-md ${styles[type]}`}>
            <div className="flex-shrink-0 mt-0.5">{icons[type]}</div>
            <div className="flex flex-col gap-1.5 w-full">
                {title && (
                    <span className="font-semibold text-sm tracking-wide">
                        {title}
                    </span>
                )}
                <div className="text-sm leading-relaxed [&>p]:m-0 opacity-90">
                    {children}
                </div>
            </div>
        </div>
    );
}

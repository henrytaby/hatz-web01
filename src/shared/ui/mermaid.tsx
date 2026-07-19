"use client";

import React, { useEffect, useRef, useState, useId } from "react";
import mermaid from "mermaid";
import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";

mermaid.initialize({
    startOnLoad: false,
    fontFamily: "inherit",
});

interface MermaidProps {
    chart?: string;
    children?: string | React.ReactNode;
}

export function Mermaid({ chart, children }: MermaidProps) {
    const actualChart = (chart || (typeof children === 'string' ? children : "")) as string;
    const [svgCode, setSvgCode] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);
    const id = `mermaid-${useId().replace(/:/g, "")}`;

    const { resolvedTheme } = useTheme();

    useEffect(() => {
        let isMounted = true;
        const renderChart = async () => {
            if (!actualChart || typeof actualChart !== 'string') return;
            
            // Reemplazar saltos de línea escapados (\\n) por saltos reales (\n)
            const parsedChart = actualChart.replace(/\\n/g, '\n');
            
            try {
                // Initialize theme dynamically before rendering
                mermaid.initialize({
                    startOnLoad: false,
                    theme: resolvedTheme === "dark" ? "dark" : "default",
                    fontFamily: "inherit",
                });

                const { svg } = await mermaid.render(id, parsedChart);
                if (isMounted) {
                    setSvgCode(svg);
                    setError(false);
                }
            } catch (e) {
                console.error("Mermaid parsing error:", e);
                if (isMounted) setError(true);
            }
        };

        renderChart();

        return () => {
            isMounted = false;
        };
    }, [actualChart, id, resolvedTheme]);

    if (error || !actualChart) {
        return (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md text-sm font-mono overflow-x-auto whitespace-pre my-8 border border-red-200 dark:border-red-900/50">
                ⚠️ Error rendering Mermaid diagram:
                {"\n\n"}
                {actualChart || "No chart data provided."}
            </div>
        );
    }

    return (
        <div className="my-8 flex justify-center bg-muted/20 p-6 rounded-xl border border-border/50 shadow-sm backdrop-blur-sm transition-colors">
            {svgCode ? (
                <div
                    ref={ref}
                    dangerouslySetInnerHTML={{ __html: svgCode }}
                    className="mermaid-wrapper w-full flex justify-center overflow-x-auto"
                />
            ) : (
                <div className="flex items-center gap-2 text-muted-foreground p-10">
                    <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                    <span>Renderizando diagrama...</span>
                </div>
            )}
        </div>
    );
}

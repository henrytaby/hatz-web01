import Image from "next/image";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import type { HTMLAttributes, ImgHTMLAttributes } from "react";
import { Mermaid, Callout } from "@/shared/ui";

const components = {
    h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
        <h1
            className="text-3xl md:text-4xl font-extrabold tracking-tight mt-12 mb-6 group relative"
            {...props}
        />
    ),
    h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
        <h2
            className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6 group relative"
            {...props}
        />
    ),
    h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
        <h3
            className="text-xl md:text-2xl font-semibold tracking-tight mt-10 mb-4 group relative"
            {...props}
        />
    ),
    p: (props: HTMLAttributes<HTMLParagraphElement>) => (
        <p className="leading-relaxed not-first:mt-6 mb-6" {...props} />
    ),
    ul: (props: HTMLAttributes<HTMLUListElement>) => (
        <ul
            className="my-6 ml-6 list-disc [&>li]:mt-2 space-y-2 text-muted-foreground"
            {...props}
        />
    ),
    ol: (props: HTMLAttributes<HTMLOListElement>) => (
        <ol
            className="my-6 ml-6 list-decimal [&>li]:mt-2 space-y-2 text-muted-foreground"
            {...props}
        />
    ),
    blockquote: (props: HTMLAttributes<HTMLQuoteElement>) => (
        <blockquote
            className="mt-6 border-l-2 border-primary pl-6 italic text-muted-foreground bg-muted/50 py-2 pr-4 rounded-r-md"
            {...props}
        />
    ),
    a: (props: HTMLAttributes<HTMLAnchorElement>) => (
        <a
            className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
            {...props}
        />
    ),
    code: (props: HTMLAttributes<HTMLElement>) => (
        <code
            className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono"
            {...props}
        />
    ),
    pre: (props: HTMLAttributes<HTMLPreElement>) => (
        <pre
            className="bg-zinc-900 text-zinc-100 p-4 rounded-lg overflow-x-auto my-6"
            {...props}
        />
    ),
    img: (props: ImgHTMLAttributes<HTMLImageElement>) => (
        <span className="relative block w-full aspect-video my-8 overflow-hidden rounded-xl bg-muted/20 border border-border/50 shadow-sm backdrop-blur-sm">
            <Image
                src={(props.src as string) || ""}
                alt={props.alt || "MDX Image"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
            />
        </span>
    ),
    table: (props: HTMLAttributes<HTMLTableElement>) => (
        <div className="my-8 w-full overflow-x-auto rounded-xl border border-border/50 shadow-sm">
            <table className="w-full text-left border-collapse text-sm" {...props} />
        </div>
    ),
    thead: (props: HTMLAttributes<HTMLTableSectionElement>) => (
        <thead className="bg-muted/50 text-muted-foreground uppercase text-xs font-semibold tracking-wider border-b border-border/50" {...props} />
    ),
    tbody: (props: HTMLAttributes<HTMLTableSectionElement>) => (
        <tbody className="divide-y divide-border/50 bg-background/50" {...props} />
    ),
    tr: (props: HTMLAttributes<HTMLTableRowElement>) => (
        <tr className="hover:bg-muted/30 transition-colors" {...props} />
    ),
    th: (props: HTMLAttributes<HTMLTableCellElement>) => (
        <th className="px-6 py-4 font-semibold" {...props} />
    ),
    td: (props: HTMLAttributes<HTMLTableCellElement>) => (
        <td className="px-6 py-4" {...props} />
    ),
    input: (props: HTMLAttributes<HTMLInputElement>) => (
        <input
            className="mt-1 mr-2 w-4 h-4 rounded border-border/50 bg-background/50 text-primary focus:ring-primary/50 accent-primary"
            {...props}
        />
    ),
    Mermaid,
    Callout,
} as const;

interface CustomMDXProps {
    source: string;
}

export async function CustomMDX({ source }: CustomMDXProps) {
    const { content } = await compileMDX({
        source,
        components,
        options: {
            parseFrontmatter: false,
            mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                    rehypeSlug,
                    [
                        rehypeAutolinkHeadings,
                        {
                            behavior: "wrap",
                            properties: {
                                className: ["anchor-link no-underline hover:opacity-80 transition-opacity"],
                            },
                        },
                    ],
                    [
                        rehypePrettyCode,
                        {
                            theme: "github-dark",
                            keepBackground: true,
                        },
                    ],
                ],
            },
        },
    });

    return (
        <article className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 max-w-none w-full">
            {content}
        </article>
    );
}

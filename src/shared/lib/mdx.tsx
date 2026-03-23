import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import type { HTMLAttributes } from "react";

const components = {
    h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
        <h1
            className="text-3xl md:text-4xl font-extrabold tracking-tight mt-12 mb-6"
            {...props}
        />
    ),
    h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
        <h2
            className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6"
            {...props}
        />
    ),
    h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
        <h3
            className="text-xl md:text-2xl font-semibold tracking-tight mt-10 mb-4"
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

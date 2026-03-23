import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

const components = {
  h1: (props: any) => <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-12 mb-6" {...props} />,
  h2: (props: any) => <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-6" {...props} />,
  h3: (props: any) => <h3 className="text-xl md:text-2xl font-semibold tracking-tight mt-10 mb-4" {...props} />,
  p: (props: any) => <p className="leading-relaxed not-first:mt-6 mb-6" {...props} />,
  ul: (props: any) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2 space-y-2 text-muted-foreground" {...props} />,
  ol: (props: any) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2 space-y-2 text-muted-foreground" {...props} />,
  blockquote: (props: any) => <blockquote className="mt-6 border-l-2 border-primary pl-6 italic text-muted-foreground bg-muted/50 py-2 pr-4 rounded-r-md" {...props} />,
};

type MDXProps = {
  source: string;
};

export async function CustomMDX({ source }: MDXProps) {
  const { content } = await compileMDX<{ title: string; date: string }>({
    source,
    components,
    options: {
      parseFrontmatter: false, // We already parsed frontmatter in lib/mdx.ts
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

  return <article className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 max-w-none w-full">{content}</article>;
}

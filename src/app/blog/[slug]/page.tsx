import { notFound } from "next/navigation";
import { getItemBySlug, getSlugs } from "@/lib/mdx";
import { CustomMDX } from "@/components/mdx";

// 1. Generate Static Params at build time! (SSG)
export async function generateStaticParams() {
  const slugs = getSlugs("blog");
  return slugs.map((slug) => ({ slug }));
}

// 2. Generate dynamic metadata per post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getItemBySlug("blog", resolvedParams.slug);
  
  if (!post) {
    return { title: 'No encontrado' };
  }
  
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.summary || "Publicación del blog",
  };
}

// 3. Page Component
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getItemBySlug("blog", resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          {post.frontmatter.title}
        </h1>
        <div className="flex items-center gap-4 text-muted-foreground text-sm">
          <time dateTime={post.frontmatter.date}>
            {new Date(post.frontmatter.date).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>
      </div>
      
      <CustomMDX source={post.content} />
    </div>
  );
}

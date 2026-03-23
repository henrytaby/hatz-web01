// ============================================
// Blog Page - Henry Taby Web Platform
// ============================================

import Link from "next/link";
import { getBlogPosts, getBlogCategories, getBlogTags } from "@/lib/mdx";
import { PageHero, PageHeroSpacer } from "@/components/ui";

export default function BlogPage() {
  const posts = getBlogPosts();
  const categories = getBlogCategories();
  const tags = getBlogTags();

  return (
    <div className="w-full flex flex-col pb-2">
      <PageHero
        title="Blog Técnico"
        backgroundImage="/img/banners/banner-03.jpg"
        bgPosition="40% 35%"
      />

      <PageHeroSpacer />

      {/* Blog Content */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-8 relative">
        {/* Ambient glow */}
        <div
          className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full opacity-20 pointer-events-none -z-10"
          aria-hidden="true"
        />

        {/* Description */}
        <div className="flex flex-col gap-4 mb-16 max-w-2xl">
          <p className="text-xl text-muted-foreground leading-relaxed">
            Pensamientos, tutoriales y apuntes sobre ingeniería de software,
            enfocados en ecosistemas de alto rendimiento.
          </p>
        </div>

        {/* Posts List */}
        <div className="w-full max-w-3xl flex-col flex gap-0">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-4 py-10 border-t border-border/50 hover:bg-muted/30 transition-colors -mx-6 px-6 rounded-2xl"
            >
              <div className="w-full flex flex-col md:flex-row justify-between md:items-baseline gap-2">
                <h2 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {post.frontmatter.title}
                </h2>
                <time
                  dateTime={post.frontmatter.date}
                  className="text-sm font-mono whitespace-nowrap text-muted-foreground shrink-0"
                >
                  {post.frontmatter.date}
                </time>
              </div>

              {post.frontmatter.summary && (
                <p className="text-muted-foreground leading-relaxed text-lg max-w-2xl">
                  {post.frontmatter.summary}
                </p>
              )}

              {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap mt-2">
                  {post.frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-bold tracking-wide uppercase px-3 py-1 rounded-md bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}

          {posts.length === 0 && (
            <p className="text-muted-foreground">Pronto habrá publicaciones...</p>
          )}
        </div>
      </div>
    </div>
  );
}

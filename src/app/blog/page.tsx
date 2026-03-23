import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBlogPosts } from "@/features/blog";
import { BlogList } from "@/features/blog";
import { PageHero, PageHeroSpacer } from "@/shared/ui";

export default function BlogPage() {
  const posts = getBlogPosts();

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
        <BlogList posts={posts} />

        {/* View All Link */}
        <div className="w-full flex justify-center md:justify-end mt-8">
          <Link
            href="/blog"
            className="text-sm font-bold text-muted-foreground hover:text-foreground inline-flex items-center gap-2 transition-colors group"
          >
            Leer todos los artículos{" "}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

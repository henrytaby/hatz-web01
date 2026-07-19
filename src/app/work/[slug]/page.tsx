import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getWorkProjectBySlug, getWorkSlugs, getRelatedWorkProjects, WorkProjectHeader, RelatedWorkProjects } from "@/features/work";
import { CustomMDX } from "@/shared/lib";

export async function generateStaticParams() {
  const slugs = getWorkSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const project = getWorkProjectBySlug(resolvedParams.slug);

  if (!project) return { title: "No encontrado" };

  return {
    title: `${project.title} | Work`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Work`,
      description: project.summary || "Proyecto de portafolio",
      type: "article",
      url: `/work/${project.slug}`,
      publishedTime: project.date,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Work`,
      description: project.summary || "Proyecto de portafolio",
    },
  };
}

export default async function WorkProject({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const project = getWorkProjectBySlug(resolvedParams.slug);

  if (!project) notFound();

  const relatedProjects = getRelatedWorkProjects(resolvedParams.slug, 2);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: project.title,
    description: project.summary,
    datePublished: project.date,
    author: {
      '@type': 'Person',
      name: 'Henry Taby',
    },
  };

  return (
    <div className="max-w-3xl w-full mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Back link */}
      <Link
        href="/work"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Volver al Portafolio
      </Link>

      <WorkProjectHeader project={project} />
      <CustomMDX source={project.content} />
      <RelatedWorkProjects projects={relatedProjects} />
    </div>
  );
}

import { getBlogPosts } from "@/features/blog";
import { getWorkProjects } from "@/features/work";
import { HomeHero, HomeFeaturedWork, HomeFeaturedPosts } from "./components";

export default function Home() {
  const recentPosts = getBlogPosts().slice(0, 3);
  const recentWork = getWorkProjects().slice(0, 2);

  return (
    <div className="flex flex-col gap-24 pb-20 w-full relative">
      <HomeHero />
      <HomeFeaturedWork recentWork={recentWork} />
      <HomeFeaturedPosts recentPosts={recentPosts} />
    </div>
  );
}

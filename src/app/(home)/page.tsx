import AppsList from "@/components/apps-list";
import ArticlesList from "@/components/articles-list";
import Hero from "@/components/hero";
import WaitingList from "@/components/waiting-list";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <WaitingList />
      <ArticlesList />
      <AppsList />
    </main>
  );
}

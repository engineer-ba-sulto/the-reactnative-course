import AppsList from "@/components/AppsList";
import ArticlesList from "@/components/ArticlesList";
import Hero from "@/components/Hero";
import WaitingList from "@/components/WaitingList";

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

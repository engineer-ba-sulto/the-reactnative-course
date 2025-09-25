import ArticleCard from "@/components/ArticleCard";
import { getAllArticles } from "@/lib/articles";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "技術記事一覧 | React Native Course",
  description:
    "React Nativeに関する技術記事の一覧です。基礎から応用まで幅広くカバーしています。",
};

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            技術記事一覧
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            React
            Nativeに関する技術記事をまとめています。基礎から応用まで幅広くカバーしています。
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article.metadata}
              slug={article.slug}
            />
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              記事がまだありません。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

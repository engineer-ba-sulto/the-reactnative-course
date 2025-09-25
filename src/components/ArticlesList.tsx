import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { getAllArticlesFromR2 } from "@/lib/r2-articles";
import Link from "next/link";

export default async function ArticlesList() {
  const articles = await getAllArticlesFromR2();
  const latestArticles = articles.slice(0, 3);

  return (
    <section id="articles" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-12">
          {/* セクションヘッダー */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              技術記事
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              React Nativeの開発に役立つ記事を定期的に更新しています。
              初心者から上級者まで、幅広いレベルの内容をカバーしています。
            </p>
          </div>

          {/* 記事一覧 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestArticles.map((article) => (
              <ArticleCard
                key={article.slug}
                article={article.metadata}
                slug={article.slug}
              />
            ))}
          </div>

          {/* もっと見るボタン */}
          {articles.length > 2 && (
            <div className="text-center">
              <Button variant="outline" size="lg">
                <Link href="/articles">すべての記事を見る</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

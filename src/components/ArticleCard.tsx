import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Article } from "@/types/article";
import { formatInTimeZone } from "date-fns-tz";
import Link from "next/link";

export default function ArticleCard({
  article,
  slug,
}: {
  article: Article;
  slug: string;
}) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6 space-y-4">
        {/* カテゴリータグ */}
        <div className="flex items-center justify-between">
          <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            {article.category}
          </span>
          <span className="text-sm text-gray-500">{article.readTime}</span>
        </div>

        {/* 記事タイトル */}
        <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
          {article.title}
        </h3>

        {/* 記事の概要 */}
        <p className="text-gray-600 line-clamp-3">{article.description}</p>

        {/* 公開日とリンク */}
        <div className="flex items-center justify-between pt-4">
          <span className="text-sm text-gray-500">
            {formatInTimeZone(
              new Date(article.publishedAt),
              "Asia/Tokyo",
              "yyyy/MM/dd"
            )}
          </span>
          <Link href={`/articles/${slug}`}>
            <Button variant="outline" size="sm">
              続きを読む
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

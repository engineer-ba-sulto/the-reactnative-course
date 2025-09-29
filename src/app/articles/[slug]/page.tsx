import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mdxToComponent, mdxToHTML } from "@/lib/mdx-utils";
import {
  getArticleBySlugFromR2,
  getArticleSlugsFromR2,
} from "@/lib/r2-articles";
import { formatInTimeZone } from "date-fns-tz";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs: string[] = await getArticleSlugsFromR2();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;

  // slugが存在しない場合は404ページ用のメタデータを返す
  if (!slug) {
    return {
      title: "記事が見つかりません | React Native Course",
    };
  }

  try {
    const article = await getArticleBySlugFromR2(slug);
    return {
      title: `${article.metadata.title} | React Native Course`,
      description: article.metadata.description,
      openGraph: {
        title: article.metadata.title,
        description: article.metadata.description,
        type: "article",
        publishedTime: article.metadata.publishedAt,
        images: article.metadata.imageUrl
          ? [article.metadata.imageUrl]
          : undefined,
      },
    };
  } catch {
    return {
      title: "記事が見つかりません | React Native Course",
    };
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  // slugが存在しない場合は404ページを表示
  if (!slug) {
    notFound();
  }

  let article;
  try {
    article = await getArticleBySlugFromR2(slug);
  } catch {
    notFound();
  }

  // MDXコンテンツをReactコンポーネントに変換
  let MDXContent;
  try {
    MDXContent = await mdxToComponent(article.content);
  } catch (error) {
    console.error("Error in mdxToComponent:", error);
    // エラーが発生した場合はフォールバックとしてHTMLを表示
    const htmlContent = mdxToHTML(article.content);
    MDXContent = function FallbackComponent() {
      return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
    };
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* 戻るボタン */}
        <div className="mb-6">
          <Link href="/articles">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              記事一覧に戻る
            </Button>
          </Link>
        </div>

        {/* 記事ヘッダー */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatInTimeZone(
                new Date(article.metadata.publishedAt),
                "Asia/Tokyo",
                "yyyy/MM/dd"
              )}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {article.metadata.readTime}
            </span>
            <span>ID: {article.metadata.id}</span>
            <Badge variant="secondary">{article.metadata.category}</Badge>
          </div>
        </header>

        {/* 記事本文 */}
        <article className="prose prose-lg max-w-none dark:prose-invert">
          <MDXContent />
        </article>

        {/* 記事フッター */}
        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <Link href="/articles">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                記事一覧に戻る
              </Button>
            </Link>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              最終更新:{" "}
              {formatInTimeZone(
                new Date(article.metadata.publishedAt),
                "Asia/Tokyo",
                "yyyy/MM/dd"
              )}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

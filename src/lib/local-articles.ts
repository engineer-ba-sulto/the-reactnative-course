import type { ArticleMetadata, ArticleWithContent } from "@/types/article";
import { compareDesc, parseISO } from "date-fns";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { PublicationDateGuard } from "./date-utils";

/**
 * ローカルのMDXファイルから記事の一覧を取得する（開発環境用）
 */
export async function getAllArticlesFromLocal(): Promise<ArticleWithContent[]> {
  try {
    const articlesDir = path.join(process.cwd(), "src", "content", "articles");
    const files = fs.readdirSync(articlesDir);

    const articles = await Promise.all(
      files
        .filter((file) => file.endsWith(".mdx"))
        .map(async (file) => {
          const slug = file.replace(/\.mdx$/, "");
          try {
            return await getArticleBySlugFromLocal(slug);
          } catch {
            // 未公開や欠損は一覧からスキップ
            return null;
          }
        })
    );

    // nullを除外
    const present = articles.filter((a): a is ArticleWithContent => a !== null);

    // 未来や本日以降は非公開扱い: まず公開済みだけに絞る
    const published = PublicationDateGuard.filterPublished(present);

    // 公開日でソート（新しい順）
    return published.sort((a, b) =>
      compareDesc(
        typeof a.metadata.publishedAt === "string"
          ? parseISO(a.metadata.publishedAt)
          : a.metadata.publishedAt,
        typeof b.metadata.publishedAt === "string"
          ? parseISO(b.metadata.publishedAt)
          : b.metadata.publishedAt
      )
    );
  } catch (error) {
    console.error("Error reading articles from local files:", error);
    return [];
  }
}

/**
 * ローカルのMDXファイルから指定されたスラッグの記事を取得する（開発環境用）
 */
export async function getArticleBySlugFromLocal(
  slug: string
): Promise<ArticleWithContent> {
  // slugが空文字列やundefinedの場合はエラーを投げる
  if (!slug || slug.trim() === "") {
    throw new Error("Invalid slug provided");
  }

  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "articles",
    `${slug}.mdx`
  );

  let fileContents: string;
  try {
    fileContents = fs.readFileSync(filePath, "utf8");
  } catch (error) {
    // 実ファイルが無いなどのケースのみログ
    console.error(`Error reading article ${slug} from local files:`, error);
    throw new Error(`Article not found: ${slug}`);
  }

  // MDXファイルからメタデータを抽出
  const { data, content } = matter(fileContents);

  const article = {
    slug,
    metadata: data as ArticleMetadata,
    content,
  } as ArticleWithContent;

  // 未公開の場合は上位で握りつぶすため、ここではログを出さずに投げる
  if (!PublicationDateGuard.isPublished(article.metadata.publishedAt)) {
    throw new Error("UNPUBLISHED");
  }

  return article;
}

/**
 * ローカルのMDXファイルから記事のスラッグ一覧を取得する（開発環境用）
 */
export async function getArticleSlugsFromLocal(): Promise<string[]> {
  try {
    const articlesDir = path.join(process.cwd(), "src", "content", "articles");
    const files = fs.readdirSync(articlesDir);

    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, ""));
  } catch (error) {
    console.error("Error reading article slugs from local files:", error);
    return [];
  }
}

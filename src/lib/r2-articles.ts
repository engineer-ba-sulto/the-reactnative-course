import type { ArticleMetadata, ArticleWithContent } from "@/types/article";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { compareDesc, parseISO } from "date-fns";
import matter from "gray-matter";
import { PublicationDateGuard } from "./date-utils";
import {
  getAllArticlesFromLocal,
  getArticleBySlugFromLocal,
  getArticleSlugsFromLocal,
} from "./local-articles";

/**
 * R2バケットから記事の一覧を取得する
 */
export async function getAllArticlesFromR2(): Promise<ArticleWithContent[]> {
  // 開発環境ではローカルファイルを使用
  if (process.env.NODE_ENV === "development") {
    return await getAllArticlesFromLocal();
  }

  const { env } = await getCloudflareContext({ async: true });
  const bucket = env.ARTICLES_BUCKET;
  try {
    // R2バケットからMDXファイルの一覧を取得
    const result = await bucket.list({ prefix: "articles/" });

    if (!result.objects) {
      return [];
    }

    const articles = await Promise.all(
      result.objects
        .filter((obj) => obj.key.endsWith(".mdx"))
        .map(async (obj) => {
          const slug = obj.key.replace("articles/", "").replace(/\.mdx$/, "");
          try {
            return await getArticleBySlugFromR2(slug);
          } catch {
            // 未公開や欠損は一覧からスキップ
            return null;
          }
        })
    );

    // null を除外
    const present = articles.filter((a): a is ArticleWithContent => a !== null);

    // 公開済みのみ表示
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
    console.error("Error reading articles from R2:", error);
    return [];
  }
}

/**
 * R2バケットから指定されたスラッグの記事を取得する
 */
export async function getArticleBySlugFromR2(
  slug: string
): Promise<ArticleWithContent> {
  // 開発環境ではローカルファイルを使用
  if (process.env.NODE_ENV === "development") {
    return await getArticleBySlugFromLocal(slug);
  }

  const { env } = await getCloudflareContext({ async: true });
  const bucket = env.ARTICLES_BUCKET;

  // slugが空文字列やundefinedの場合はエラーを投げる
  if (!slug || slug.trim() === "") {
    throw new Error("Invalid slug provided");
  }

  try {
    const key = `articles/${slug}.mdx`;
    const object = await bucket.get(key);

    if (!object || !object.body) {
      throw new Error(`Article file not found: ${slug}.mdx`);
    }

    // ReadableStreamを文字列に変換
    const fileContents = await streamToString(object.body);

    // MDXファイルからメタデータを抽出
    const { data, content } = matter(fileContents);

    const article = {
      slug,
      metadata: data as ArticleMetadata,
      content,
    } as ArticleWithContent;

    // 未公開の場合は上位で握り潰すため、ここでは特別なエラーを投げる
    if (!PublicationDateGuard.isPublished(article.metadata.publishedAt)) {
      throw new Error("UNPUBLISHED");
    }

    return article;
  } catch (error) {
    // 実ファイル未存在などの本当のエラーのみログ
    if ((error as Error)?.message !== "UNPUBLISHED") {
      console.error(`Error reading article ${slug} from R2:`, error);
    }
    throw new Error(`Article not found: ${slug}`);
  }
}

/**
 * R2バケットから記事のスラッグ一覧を取得する
 */
export async function getArticleSlugsFromR2(): Promise<string[]> {
  // 開発環境ではローカルファイルを使用
  if (process.env.NODE_ENV === "development") {
    // ローカルから取得後に公開済みのみ残す
    const slugs = await getArticleSlugsFromLocal();
    const articles = await Promise.all(
      slugs.map((s) => getArticleBySlugFromLocal(s).catch(() => null))
    );
    return articles
      .filter((a): a is NonNullable<typeof a> => !!a)
      .filter((a) => PublicationDateGuard.isPublished(a.metadata.publishedAt))
      .map((a) => a.slug);
  }

  const { env } = await getCloudflareContext({ async: true });
  const bucket = env.ARTICLES_BUCKET;
  try {
    const result = await bucket.list({ prefix: "articles/" });

    if (!result.objects) {
      return [];
    }

    const slugs = result.objects
      .filter((obj) => obj.key.endsWith(".mdx"))
      .map((obj) => obj.key.replace("articles/", "").replace(/\.mdx$/, ""));

    // スラッグから記事を読み、公開済みのみ返す
    const articles = await Promise.all(
      slugs.map((s) => getArticleBySlugFromR2(s).catch(() => null))
    );
    return articles
      .filter((a): a is NonNullable<typeof a> => !!a)
      .filter((a) => PublicationDateGuard.isPublished(a.metadata.publishedAt))
      .map((a) => a.slug);
  } catch (error) {
    console.error("Error reading article slugs from R2:", error);
    return [];
  }
}

/**
 * R2バケットからカテゴリ別の記事を取得する
 */
export async function getArticlesByCategoryFromR2(
  category: string
): Promise<ArticleWithContent[]> {
  const articles = await getAllArticlesFromR2();
  return articles.filter((article) => article.metadata.category === category);
}

/**
 * ReadableStreamを文字列に変換するヘルパー関数
 */
async function streamToString(stream: ReadableStream): Promise<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let result = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      result += decoder.decode(value, { stream: true });
    }
  } finally {
    reader.releaseLock();
  }

  return result;
}

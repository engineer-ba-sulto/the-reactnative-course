import type { ArticleMetadata, ArticleWithContent } from "@/types/article";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import matter from "gray-matter";
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
          return await getArticleBySlugFromR2(slug);
        })
    );

    // 公開日でソート（新しい順）
    return articles.sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
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

    return {
      slug,
      metadata: data as ArticleMetadata,
      content,
    };
  } catch (error) {
    console.error(`Error reading article ${slug} from R2:`, error);
    throw new Error(`Article not found: ${slug}`);
  }
}

/**
 * R2バケットから記事のスラッグ一覧を取得する
 */
export async function getArticleSlugsFromR2(): Promise<string[]> {
  // 開発環境ではローカルファイルを使用
  if (process.env.NODE_ENV === "development") {
    return await getArticleSlugsFromLocal();
  }

  const { env } = await getCloudflareContext({ async: true });
  const bucket = env.ARTICLES_BUCKET;
  try {
    const result = await bucket.list({ prefix: "articles/" });

    if (!result.objects) {
      return [];
    }

    return result.objects
      .filter((obj) => obj.key.endsWith(".mdx"))
      .map((obj) => obj.key.replace("articles/", "").replace(/\.mdx$/, ""));
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

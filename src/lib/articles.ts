import { ArticleWithContent } from "@/types/article";
import {
  getAllArticlesFromR2,
  getArticleBySlugFromR2,
  getArticleSlugsFromR2,
  getArticlesByCategoryFromR2,
} from "./r2-articles";

/**
 * R2バケットを取得するヘルパー関数
 */
function getR2Bucket(): R2Bucket | null {
  if (
    typeof globalThis !== "undefined" &&
    (globalThis as typeof globalThis & { ARTICLES_BUCKET?: R2Bucket })
      .ARTICLES_BUCKET
  ) {
    return (
      (globalThis as typeof globalThis & { ARTICLES_BUCKET?: R2Bucket })
        .ARTICLES_BUCKET ?? null
    );
  }
  return null;
}

/**
 * 開発環境用のフォールバック実装
 * 本番環境ではR2を使用し、開発環境ではローカルファイルを使用
 */
async function getFallbackArticles(): Promise<ArticleWithContent[]> {
  // 開発環境では空の配列を返す（後でローカルファイル読み込みを実装可能）
  console.warn("R2 bucket not available, returning empty articles list");
  return [];
}

async function getFallbackArticleBySlug(
  slug: string
): Promise<ArticleWithContent> {
  throw new Error(`Article not found: ${slug} (R2 bucket not available)`);
}

async function getFallbackArticleSlugs(): Promise<string[]> {
  console.warn("R2 bucket not available, returning empty slugs list");
  return [];
}

async function getFallbackArticlesByCategory(
  category: string
): Promise<ArticleWithContent[]> {
  console.warn(
    `R2 bucket not available, returning empty articles list for category: ${category}`
  );
  return [];
}

// 型定義は @/types/article からエクスポート

export async function getAllArticles(): Promise<ArticleWithContent[]> {
  const bucket = getR2Bucket();

  if (bucket) {
    return await getAllArticlesFromR2(bucket);
  }

  return await getFallbackArticles();
}

export async function getArticleBySlug(
  slug: string
): Promise<ArticleWithContent> {
  const bucket = getR2Bucket();

  if (bucket) {
    return await getArticleBySlugFromR2(bucket, slug);
  }

  return await getFallbackArticleBySlug(slug);
}

export async function getArticleSlugs(): Promise<string[]> {
  const bucket = getR2Bucket();

  if (bucket) {
    return await getArticleSlugsFromR2(bucket);
  }

  return await getFallbackArticleSlugs();
}

export async function getArticlesByCategory(
  category: string
): Promise<ArticleWithContent[]> {
  const bucket = getR2Bucket();

  if (bucket) {
    return await getArticlesByCategoryFromR2(bucket, category);
  }

  return await getFallbackArticlesByCategory(category);
}

// Note: getArticlesByTag function removed as tags property is not available in the new ArticleMetadata interface

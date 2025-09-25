import type { ArticleMetadata, ArticleWithContent } from "@/types/article";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

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
          return await getArticleBySlugFromLocal(slug);
        })
    );

    // 公開日でソート（新しい順）
    return articles.sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
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

  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "content",
      "articles",
      `${slug}.mdx`
    );
    const fileContents = fs.readFileSync(filePath, "utf8");

    // MDXファイルからメタデータを抽出
    const { data, content } = matter(fileContents);

    return {
      slug,
      metadata: data as ArticleMetadata,
      content,
    };
  } catch (error) {
    console.error(`Error reading article ${slug} from local files:`, error);
    throw new Error(`Article not found: ${slug}`);
  }
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

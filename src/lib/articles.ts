import fs from "fs";
import matter from "gray-matter";
import path from "path";

const articlesDirectory = path.join(process.cwd(), "src/content/articles");

export interface ArticleMetadata {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  category: string;
  imageUrl?: string;
}

export interface Article {
  slug: string;
  metadata: ArticleMetadata;
  content: string;
}

export async function getAllArticles(): Promise<Article[]> {
  try {
    const fileNames = fs.readdirSync(articlesDirectory);
    const articles = await Promise.all(
      fileNames
        .filter((name) => name.endsWith(".mdx"))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.mdx$/, "");
          return await getArticleBySlug(slug);
        })
    );

    // 公開日でソート（新しい順）
    return articles.sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    );
  } catch (error) {
    console.error("Error reading articles:", error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article> {
  // slugが空文字列やundefinedの場合はエラーを投げる
  if (!slug || slug.trim() === "") {
    throw new Error("Invalid slug provided");
  }

  try {
    const fullPath = path.join(articlesDirectory, `${slug}.mdx`);

    // ファイルの存在確認
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Article file not found: ${slug}.mdx`);
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");

    // MDXファイルからメタデータを抽出
    const { data, content } = matter(fileContents);

    return {
      slug,
      metadata: data as ArticleMetadata,
      content,
    };
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error);
    throw new Error(`Article not found: ${slug}`);
  }
}

export async function getArticleSlugs(): Promise<string[]> {
  try {
    const fileNames = fs.readdirSync(articlesDirectory);
    return fileNames
      .filter((name) => name.endsWith(".mdx"))
      .map((name) => name.replace(/\.mdx$/, ""));
  } catch (error) {
    console.error("Error reading article slugs:", error);
    return [];
  }
}

export async function getArticlesByCategory(
  category: string
): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter((article) => article.metadata.category === category);
}

// Note: getArticlesByTag function removed as tags property is not available in the new ArticleMetadata interface

// 記事の型定義
export interface ArticleMetadata {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  readTime: string;
  category: string;
  imageUrl?: string;
}

export interface ArticleWithContent {
  slug: string;
  metadata: ArticleMetadata;
  content: string;
}

// 既存のコンポーネントとの互換性のための型エイリアス
export type Article = ArticleMetadata;

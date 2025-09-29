import { Article } from "@/types/article";

// サンプルデータ（実際の実装ではAPIから取得）
export const sampleArticles: Article[] = [
  {
    id: "1",
    title: "React Native入門: 環境構築から始めよう",
    description:
      "React Nativeの開発環境を構築し、最初のアプリを作成するまでの手順を詳しく解説します。",
    publishedAt: "2024-01-15",
    readTime: "5分",
    category: "入門",
  },
  {
    id: "2",
    title: "ナビゲーションライブラリの選び方",
    description:
      "React Navigation、React Native Navigationなど、主要なナビゲーションライブラリの比較と選び方を紹介します。",
    publishedAt: "2024-01-10",
    readTime: "8分",
    category: "ナビゲーション",
  },
  {
    id: "3",
    title: "状態管理: Redux vs Context API",
    description:
      "React Nativeアプリでの状態管理について、ReduxとContext APIの使い分けを実例とともに説明します。",
    publishedAt: "2024-01-05",
    readTime: "12分",
    category: "状態管理",
  },
];

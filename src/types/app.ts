// アプリの型定義
export type App = {
  id: string;
  name: string;
  description: string;
  category: string;
  platform: "iOS" | "Android" | "Both";
  status: "公開中" | "ベータ" | "開発中";
  techStack: string[];
  downloadUrl?: string;
  imageUrl?: string;
};

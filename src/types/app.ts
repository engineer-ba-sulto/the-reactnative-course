// アプリの型定義
export type App = {
  id: string;
  name: string;
  description: string;
  category: string;
  platform: "iOS" | "Android" | "Both";
  status: "Live" | "Beta" | "Development";
  downloadUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
};

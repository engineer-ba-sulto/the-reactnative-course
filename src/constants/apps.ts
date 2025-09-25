import { App } from "@/types/app";

// サンプルデータ（実際の実装ではAPIから取得）
export const appList: App[] = [
  {
    id: "1",
    name: "1日1タスクアプリ",
    description: "簡単に継続できて、自己肯定感を高める、習慣化アプリ",
    category: "ユーティリティ",
    platform: "iOS",
    status: "公開中",
    techStack: ["React Native", "Expo", "TypeScript"],
    downloadUrl:
      "https://apps.apple.com/jp/app/%E3%83%A2%E3%83%81%E3%83%99%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3up-%E8%87%AA%E5%B7%B1%E6%88%90%E9%95%B7-1%E6%97%A51%E3%82%BF%E3%82%B9%E3%82%AF%E3%82%A2%E3%83%97%E3%83%AA/id6749926021",
    imageUrl: "/esteem-app.png",
  },
  {
    id: "2",
    name: "禁煙アプリ（仮）",
    description: "禁煙アプリ（仮）",
    category: "ユーティリティ",
    platform: "iOS",
    status: "開発中",
    techStack: ["React Native", "Expo", "TypeScript"],
    downloadUrl: "#",
    imageUrl: "",
  },
];

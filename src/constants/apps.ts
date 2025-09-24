import { App } from "@/types/app";

// サンプルデータ（実際の実装ではAPIから取得）
export const sampleApps: App[] = [
  {
    id: "1",
    name: "TaskMaster",
    description:
      "シンプルで使いやすいタスク管理アプリ。React Nativeで開発された本格的なモバイルアプリです。",
    category: "プロダクティビティ",
    platform: "Both",
    status: "Live",
    downloadUrl: "#",
    githubUrl: "#",
  },
  {
    id: "2",
    name: "WeatherNow",
    description:
      "リアルタイム天気予報アプリ。美しいUIと直感的な操作性を特徴としています。",
    category: "ユーティリティ",
    platform: "Both",
    status: "Beta",
    downloadUrl: "#",
    githubUrl: "#",
  },
  {
    id: "3",
    name: "CodeSnippets",
    description:
      "開発者向けのコードスニペット管理アプリ。シンタックスハイライトと検索機能を搭載。",
    category: "開発ツール",
    platform: "iOS",
    status: "Development",
    githubUrl: "#",
  },
];

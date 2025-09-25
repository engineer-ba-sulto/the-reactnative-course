import { App } from "@/types/app";

// ステータスに応じたバッジの色を返す
export const getStatusBadgeColor = (status: App["status"]) => {
  switch (status) {
    case "公開中":
      return "bg-blue-100 text-blue-800";
    case "ベータ":
      return "bg-yellow-100 text-yellow-800";
    case "開発中":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// 技術スタックに応じたバッジの色を返す
export const getTechStackBadgeColor = (tech: string) => {
  switch (tech.toLowerCase()) {
    case "react native":
      return "bg-blue-100 text-blue-800";
    case "typescript":
      return "bg-green-100 text-green-800";
    case "expo":
      return "bg-purple-100 text-purple-800";
    case "supabase":
      return "bg-orange-100 text-orange-800";
    case "javascript":
      return "bg-yellow-100 text-yellow-800";
    case "swift":
      return "bg-red-100 text-red-800";
    case "kotlin":
      return "bg-indigo-100 text-indigo-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// アプリリストからstatus別のアプリ数を計算する
export const getAppCountByStatus = (apps: App[]) => {
  const counts = {
    公開中: 0,
    ベータ: 0,
    開発中: 0,
  };

  apps.forEach((app) => {
    if (app.status in counts) {
      counts[app.status as keyof typeof counts]++;
    }
  });

  return counts;
};

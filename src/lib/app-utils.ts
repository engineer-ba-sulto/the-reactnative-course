import { App } from "@/types/app";

// ステータスに応じたバッジの色を返す
export const getStatusBadgeColor = (status: App["status"]) => {
  switch (status) {
    case "Live":
      return "bg-green-100 text-green-800";
    case "Beta":
      return "bg-yellow-100 text-yellow-800";
    case "Development":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// プラットフォームアイコンを返す
export const getPlatformIcon = (platform: App["platform"]) => {
  switch (platform) {
    case "iOS":
      return "📱";
    case "Android":
      return "🤖";
    case "Both":
      return "📱🤖";
    default:
      return "📱";
  }
};

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getPlatformIcon, getStatusBadgeColor } from "@/lib/app-utils";
import { App } from "@/types/app";

export default function AppCard({ app }: { app: App }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow py-0">
      {/* アプリのスクリーンショットエリア */}
      <div className="relative bg-gray-100">
        <div className="flex items-center justify-center aspect-video">
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-600">
              {app.name.charAt(0)}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* アプリタイトル */}
        <h3 className="text-lg font-semibold text-gray-900">{app.name}</h3>

        {/* アプリの説明 */}
        <p className="text-sm text-gray-600 line-clamp-2">{app.description}</p>

        {/* 技術スタックタグ */}
        <div className="flex flex-wrap gap-1">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
            React Native
          </span>
          <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
            TypeScript
          </span>
          <span className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">
            Expo
          </span>
        </div>

        {/* ステータスとプラットフォーム */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm">{getPlatformIcon(app.platform)}</span>
            <span className="text-xs text-gray-500">{app.platform}</span>
          </div>
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
              app.status
            )}`}
          >
            {app.status}
          </span>
        </div>

        {/* アクションボタン */}
        <Button className="w-full" size="sm">
          View Project
        </Button>
      </div>
    </Card>
  );
}

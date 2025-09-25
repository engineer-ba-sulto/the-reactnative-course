import AppCard from "@/components/AppCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { appList } from "@/constants/apps";
import { getAppCountByStatus, getStatusBadgeColor } from "@/lib/app-utils";
import { App } from "@/types/app";

// TODO: データベースからアプリ一覧を取得する処理を実装してappListに渡す
export default function AppList() {
  // 最新2つのアプリのみを表示
  const latestApps = appList.slice(0, 2);
  const appCounts = getAppCountByStatus(appList);

  return (
    <section id="apps" className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-12">
          {/* セクションヘッダー */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              開発アプリ一覧
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              React Nativeで開発した実際のアプリケーションをご紹介します。
            </p>

            {/* Status別のアプリ数表示 */}
            <div className="flex flex-wrap justify-center gap-8 mt-6">
              {Object.entries(appCounts).map(([status, count]) => (
                <Badge
                  key={status}
                  className={`text-3xl font-bold p-6 ${getStatusBadgeColor(
                    status as App["status"]
                  )}`}
                >
                  {status}: {count}件
                </Badge>
              ))}
            </div>
          </div>

          {/* アプリ一覧 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {latestApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>

          {/* もっと見るボタン */}
          {appList.length > 2 && (
            <div className="text-center">
              <Button variant="outline" size="lg">
                すべてのアプリを見る
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

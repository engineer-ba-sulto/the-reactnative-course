import AppCard from "@/components/AppCard";
import { Button } from "@/components/ui/button";
import { sampleApps } from "@/constants/apps";

export default function AppsList() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-12">
          {/* セクションヘッダー */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              運営アプリ一覧
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              React Nativeで開発した実際のアプリケーションをご紹介します。
            </p>
          </div>

          {/* アプリ一覧 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>

          {/* もっと見るボタン */}
          <div className="text-center">
            <Button variant="outline" size="lg">
              すべてのアプリを見る
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

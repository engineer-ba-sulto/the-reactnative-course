import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getStatusBadgeColor, getTechStackBadgeColor } from "@/lib/app-utils";
import { App } from "@/types/app";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";

export default function AppCard({ app }: { app: App }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow py-0 gap-0">
      {/* アプリのスクリーンショットエリア */}
      <div className="relative bg-gray-100">
        {app.imageUrl ? (
          <div className="flex items-center justify-center aspect-video bg-gradient-to-br from-blue-100 to-purple-100">
            <div className="relative w-full h-full">
              <Image
                src={app.imageUrl}
                alt={`${app.name} スクリーンショット`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center aspect-video">
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-600">
                Coming Soon
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 space-y-4 flex flex-1 flex-col justify-between">
        <div className="space-y-4">
          {/* アプリタイトル */}
          <h3 className="text-xl font-semibold text-gray-900">{app.name}</h3>

          {/* アプリの説明 */}
          <p className="text-gray-600 line-clamp-2">{app.description}</p>
        </div>

        <div className="space-y-4">
          {/* 技術スタックタグ */}
          <div className="flex flex-wrap gap-1">
            {app.techStack.map((tech) => (
              <Badge key={tech} className={`text-sm ${getTechStackBadgeColor(tech)}`}>
                {tech}
              </Badge>
            ))}
          </div>

          {/* ステータスとプラットフォーム */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">📱</span>
              <span className="text-gray-500">{app.platform}</span>
            </div>
            <Badge className={`text-base ${getStatusBadgeColor(app.status)}`}>
              {app.status}
            </Badge>
          </div>

          {/* アクションボタン */}
          {app.status === "公開中" ? (
            <Button asChild className="w-full" size="lg">
              <Link href={app.downloadUrl || "#"} target="_blank">
                View Apple Store
              </Link>
            </Button>
          ) : (
            <Button className="w-full" size="lg" disabled variant="outline">
              Coming Soon
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

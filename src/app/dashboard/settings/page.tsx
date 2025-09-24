import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "設定",
  description: "アプリケーションの設定と環境の管理",
};

export default async function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">設定</h1>
        <p className="text-muted-foreground">
          アプリケーションの設定と環境の管理
        </p>
      </div>

      <div className="grid gap-6">
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">一般設定</h2>
          <p className="text-muted-foreground">
            言語、テーマ、通知などの基本設定が表示されます。
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">プライバシー設定</h2>
          <p className="text-muted-foreground">
            データの取り扱いやプライバシーに関する設定が表示されます。
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">セキュリティ設定</h2>
          <p className="text-muted-foreground">
            パスワード変更や二要素認証などのセキュリティ設定が表示されます。
          </p>
        </div>
      </div>
    </div>
  );
}

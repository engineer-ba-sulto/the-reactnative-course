import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "アカウント",
  description: "アカウント情報の管理とプロフィール設定",
};

export default async function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">アカウント</h1>
        <p className="text-muted-foreground">
          アカウント情報の管理とプロフィール設定
        </p>
      </div>

      <div className="grid gap-6">
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">プロフィール情報</h2>
          <p className="text-muted-foreground">
            ここにプロフィール情報のフォームが表示されます。
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">アカウント設定</h2>
          <p className="text-muted-foreground">
            ここにアカウント設定のオプションが表示されます。
          </p>
        </div>
      </div>
    </div>
  );
}

import { AccountUpdateForm } from "@/components/AccountUpdateForm";
import { DashboardHeader } from "@/components/DashboardHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "設定",
};

export default async function SettingsPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader title={metadata.title} />
      <div className="grid gap-6">
        <AccountUpdateForm
          initialName="山田太郎"
          initialEmail="yamada@example.com"
        />
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">パスワード設定</h2>
          <p className="text-muted-foreground">
            データの取り扱いやプライバシーに関する設定が表示されます。
          </p>
        </div>
      </div>
    </div>
  );
}

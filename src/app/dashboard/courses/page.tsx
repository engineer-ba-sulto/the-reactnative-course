import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "コース",
  description: "利用可能なコースと学習進捗の管理",
};

export default async function CoursesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">コース</h1>
        <p className="text-muted-foreground">
          利用可能なコースと学習進捗の管理
        </p>
      </div>

      <div className="grid gap-6">
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">進行中のコース</h2>
          <p className="text-muted-foreground">
            現在学習中のコース一覧が表示されます。
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">利用可能なコース</h2>
          <p className="text-muted-foreground">
            新しく受講できるコース一覧が表示されます。
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">完了したコース</h2>
          <p className="text-muted-foreground">
            修了済みのコース一覧が表示されます。
          </p>
        </div>
      </div>
    </div>
  );
}

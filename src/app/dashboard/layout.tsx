import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* サイドバーとメインコンテンツ */}
      <div className="flex flex-1">
        <SidebarProvider>
          <DashboardSidebar />
          <SidebarInset className="flex-1">
            <h2 className="p-4">ダッシュボード</h2>
            <div className="flex flex-1 flex-col gap-4 p-12">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
}

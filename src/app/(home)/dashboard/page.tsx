import { DashboardHeader } from "@/components/DashboardHeader";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { auth } from "@/lib/auth";
import type { Metadata } from "next";
import { headers } from "next/headers";
// import Image from "next/image";

export const metadata: Metadata = {
  title: "プロフィール情報",
};

export default async function DashboardPage() {
  const authInstance = await auth();
  const session = await authInstance.api.getSession({
    headers: await headers(),
	});
	
  return (
    <div className="space-y-6">
      <DashboardHeader title={metadata.title} />
      <div className="grid gap-6">
        <div className="rounded-lg border p-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">名前</TableCell>
                <TableCell className="text-muted-foreground">
                  {session!.user.name || "未設定"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">メールアドレス</TableCell>
                <TableCell className="text-muted-foreground">
                  {session!.user.email || "未設定"}
                </TableCell>
              </TableRow>
              {/* <TableRow>
                <TableCell className="font-medium">画像URL</TableCell>
                <TableCell className="text-muted-foreground">
                  {session!.user.image ? (
                    <div className="flex items-center gap-2">
                      <Image
                        src={session!.user.image}
                        alt="プロフィール画像"
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="truncate max-w-xs">
                        {session!.user.image}
                      </span>
                    </div>
                  ) : (
                    "未設定"
                  )}
                </TableCell>
              </TableRow> */}
              {/* <TableRow>
                <TableCell className="font-medium">ユーザー名</TableCell>
                <TableCell className="text-muted-foreground">
                  {session!.user.username || "未設定"}
                </TableCell>
              </TableRow> */}
              {/* <TableRow>
                <TableCell className="font-medium">表示ユーザー名</TableCell>
                <TableCell className="text-muted-foreground">
                  {session!.user.displayUsername || "未設定"}
                </TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";
import Link from "next/link";

export async function Header() {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="container flex justify-between items-center h-14 p-4">
        <Link href="/" className="font-bold text-lg">
          React Native コース
        </Link>
        <nav>
          {/* TODO: 認証機能を有効にする場合は、下記のコメントアウトを外してください */}
          {/* {session?.user ? (
            <UserDropdownMenu />
          ) : 
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link href="/signin">Signin</Link>
              </Button>
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            </div>
						)} */}
          <div className="flex gap-2">
            <Button asChild variant="link">
              <Link href="#apps">アプリ実績</Link>
            </Button>
            <Button asChild variant="link">
              <Link href="/articles">技術記事</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="bg-green-500 text-green-900 hover:bg-green-600"
            >
              <Link href="#waiting-list" className="text-white font-bold">
                ウェイティングリストに登録
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}

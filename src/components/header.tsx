import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="border-b h-18">
      <div className="container flex justify-between items-center p-4">
        <Link href="/" className="font-bold text-lg">
          React Native コース
        </Link>
        <nav>
          {/* {session?.user ? (
            <UserDropdownMenu />
          ) : (
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
            <Button
              asChild
              variant="outline"
              className="bg-green-500 text-green-900 hover:bg-green-600"
            >
              <Link href="#waiting-list" className="text-white font-bold">
                ウェイティングリスト
              </Link>
            </Button>
            <Button asChild variant="link">
              <Link href="#articles">最新記事</Link>
            </Button>
            <Button asChild variant="link">
              <Link href="#apps">アプリ一覧</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}

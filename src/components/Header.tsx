"use client";

import { Button } from "@/components/ui/button";
import UserDropdownMenu from "@/components/UserDropdownMenu";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="container flex justify-between items-center h-14 p-4">
        <Link href="/" className="font-bold text-lg">
          React Native コース
        </Link>
        <nav>
          <div className="flex gap-2">
            <Button asChild variant="link">
              <Link
                href={`${
                  pathname === "/dashboard" ? "/articles" : "#articles"
                }`}
              >
                技術記事
              </Link>
            </Button>
            <Button asChild variant="link">
              <Link href={`${pathname === "/dashboard" ? "/#apps" : "#apps"}`}>
                アプリ実績
              </Link>
            </Button>
            {session?.user ? (
              <UserDropdownMenu />
            ) : (
              <div className="flex gap-2">
                {/* <Button asChild variant="outline">
                  <Link href="/signin">Signin</Link>
                </Button> */}
                <Button asChild>
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            )}
            {/* <Button
              asChild
              variant="outline"
              className="bg-green-500 text-green-900 hover:bg-green-600"
            >
              <Link href="#waiting-list" className="text-white font-bold">
                ウェイティングリストに登録
              </Link>
            </Button> */}
          </div>
        </nav>
      </div>
    </header>
  );
}

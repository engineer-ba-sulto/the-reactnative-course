"use client";

import { signOutAction } from "@/actions/certification";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { Home, LogOut } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function UserDropdownMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending, error } = authClient.useSession();

  // ローディング状態の処理
  if (isPending) {
    return <div className="size-9 rounded-full bg-gray-200 animate-pulse" />;
  }

  // エラー状態の処理
  if (error) {
    console.error("Session error:", error);
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      {/* ユーザーメニュー */}
      <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Avatar className="cursor-pointer size-9 ring-2 ring-gray-200 hover:ring-gray-300 transition-all">
              <AvatarImage
                src={session?.user.image || ""}
                alt={session?.user.name || "ユーザー"}
              />
              <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                {session?.user.name?.charAt(0) ||
                  session?.user.email?.charAt(0) ||
                  "U"}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-3 py-2 border-b">
            <p className="text-sm font-medium text-gray-900">
              {session?.user.name || "ユーザー"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {session?.user.email}
            </p>
            {session?.user.username && (
              <p className="text-xs text-gray-500">@{session?.user.username}</p>
            )}
          </div>
          <DropdownMenuItem asChild>
            <Link
              href="/dashboard"
              className="flex w-full items-center cursor-pointer"
            >
              <Home className="mr-2 h-4 w-4" />
              <span>ダッシュボード</span>
            </Link>
          </DropdownMenuItem>
          <form action={signOutAction} className="w-full">
            <button type="submit" className="flex w-full">
              <DropdownMenuItem className="w-full flex-1 cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50">
                <LogOut className="mr-2 h-4 w-4" />
                <span>ログアウト</span>
              </DropdownMenuItem>
            </button>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

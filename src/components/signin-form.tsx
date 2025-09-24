import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function SigninForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">アカウントを作成</CardTitle>
          <CardDescription>新しいアカウントにサインイン</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">お名前</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="山田太郎"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@example.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">パスワード</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="8文字以上のパスワード"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="confirm-password">パスワード確認</Label>
                  <Input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    placeholder="パスワードを再入力"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  アカウント作成
                </Button>
              </div>
              <div className="text-center text-sm">
                すでにアカウントをお持ちの方は{" "}
                <Link href="/login" className="underline underline-offset-4">
                  ログイン
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        続行をクリックすることで、<a href="#">利用規約</a>と
        <a href="#">プライバシーポリシー</a>
        に同意したものとみなされます。
      </div>
    </div>
  );
}

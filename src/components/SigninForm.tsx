"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormSubmission } from "@/hooks/use-form-submission";
import { useSignupForm } from "@/hooks/use-form-validation";
import { cn } from "@/lib/utils";
import { SignUpEmailInput } from "@/types/auth";
import Link from "next/link";

export function SigninForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useSignupForm();
  const { handleSignup, isPending } = useFormSubmission();

  const onSubmit = (data: SignUpEmailInput) => {
    handleSignup(data);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">アカウントを作成</CardTitle>
          <CardDescription>新しいアカウントにサインイン</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>お名前</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="山田太郎"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>メールアドレス</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="example@example.com"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>パスワード</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="8文字以上のパスワード"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>パスワード確認</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="パスワードを再入力"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "アカウント作成中..." : "アカウント作成"}
                </Button>
              </div>
              <div className="text-center text-sm">
                すでにアカウントをお持ちの方は{" "}
                <Link href="/login" className="underline underline-offset-4">
                  ログイン
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        続行をクリックすることで、<Link href="/term-of-service">利用規約</Link>
        と<Link href="/privacy-policy">プライバシーポリシー</Link>
        に同意したものとみなされます。
      </div>
    </div>
  );
}

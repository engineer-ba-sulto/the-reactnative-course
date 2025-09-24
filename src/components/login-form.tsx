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
import { useLoginForm } from "@/hooks/use-form-validation";
import { cn } from "@/lib/utils";
import { SignInEmailInput } from "@/types/auth";

import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useLoginForm();
  const { handleLogin, isPending } = useFormSubmission();

  const onSubmit = (data: SignInEmailInput) => {
    handleLogin(data);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">おかえりなさい</CardTitle>
          <CardDescription>アカウントにログイン</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
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
                    <div className="flex items-center">
                      <FormLabel>パスワード</FormLabel>
                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        パスワードをお忘れですか？
                      </a>
                    </div>
                    <FormControl>
                      <Input {...field} type="password" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "ログイン中..." : "ログイン"}
              </Button>
              <div className="text-center text-sm">
                アカウントをお持ちでない方は{" "}
                <Link href="/signin" className="underline underline-offset-4">
                  アカウント作成
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

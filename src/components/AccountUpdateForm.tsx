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
import { useAccountUpdateForm } from "@/hooks/use-form-validation";
import { cn } from "@/lib/utils";

interface AccountUpdateFormProps extends React.ComponentProps<"div"> {
  initialName?: string;
  initialEmail?: string;
}

export function AccountUpdateForm({
  className,
  initialName = "",
  initialEmail = "",
  ...props
}: AccountUpdateFormProps) {
  const form = useAccountUpdateForm(initialName, initialEmail);
  const { handleAccountUpdate, isPending } = useFormSubmission();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">アカウント情報の変更</CardTitle>
          <CardDescription>
            お名前とメールアドレスを変更できます
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleAccountUpdate)}
              className="grid gap-6"
            >
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>お名前</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="山田太郎"
                          disabled={isPending}
                          {...field}
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
                          type="email"
                          placeholder="example@example.com"
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "更新中..." : "アカウント情報を更新"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

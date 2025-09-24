"use client";

import { signInEmail, signUpEmail } from "@/actions/certification";
import { SignInEmailInput, SignUpEmailInput } from "@/zod/certification";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export const useFormSubmission = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogin = (data: SignInEmailInput) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);
        if (data.callbackURL) formData.append("callbackURL", data.callbackURL);
        const result = await signInEmail(formData);

        if (result.success) {
          toast.success("ログインに成功しました");
          router.push("/");
        } else {
          toast.error(result.error || "ログインに失敗しました");
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error(
          error instanceof Error ? error.message : "ログインに失敗しました"
        );
      }
    });
  };

  const handleSignup = (data: SignUpEmailInput) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("confirmPassword", data.confirmPassword);
        if (data.image) formData.append("image", data.image);
        if (data.callbackURL) formData.append("callbackURL", data.callbackURL);
        const result = await signUpEmail(formData);

        if (result.success) {
          toast.success("アカウント作成に成功しました");
          router.push("/");
        } else {
          toast.error(result.error || "アカウント作成に失敗しました");
        }
      } catch (error) {
        console.error("Signup error:", error);
        toast.error(
          error instanceof Error
            ? error.message
            : "アカウント作成に失敗しました"
        );
      }
    });
  };

  return { handleLogin, handleSignup, isPending };
};

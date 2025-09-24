"use server";

import { auth } from "@/lib/auth";
import { signInEmailSchema, signUpEmailSchema } from "@/zod/certification";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signUpEmail(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };
    const validatedData = signUpEmailSchema.parse(data);
    const res = await auth.api.signUpEmail({
      body: validatedData,
    });

    // Better Authのレスポンス構造に基づいてエラーハンドリング
    if (!res.user) {
      throw new Error("アカウント作成に失敗しました");
    }

    revalidatePath("/");
  } catch (error) {
    console.error("Sign up error:", error);
    throw error;
  }
  redirect("/");
}

export async function signInEmail(formData: FormData) {
  try {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    const validatedData = signInEmailSchema.parse(data);
    const res = await auth.api.signInEmail({
      body: validatedData,
    });

    // Better Authのレスポンス構造に基づいてエラーハンドリング
    if (!res.user) {
      throw new Error("ログインに失敗しました");
    }

    revalidatePath("/");
  } catch (error) {
    console.error("Sign in error:", error);
    throw error;
  }
  redirect("/");
}

export async function signOut() {
  try {
    await auth.api.signOut({
      headers: {},
    });
    revalidatePath("/");
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
  redirect("/");
}

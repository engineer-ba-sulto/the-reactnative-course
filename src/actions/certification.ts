"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function signUpEmail(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };
    const res = await auth.api.signUpEmail({
      body: data,
    });

    // Better Authのレスポンス構造に基づいてエラーハンドリング
    if (!res.user) {
      return { success: false, error: "アカウント作成に失敗しました" };
    }

    revalidatePath("/");
    return { success: true, user: res.user };
  } catch (error) {
    console.error("Sign up error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "アカウント作成に失敗しました",
    };
  }
}

export async function signInEmail(formData: FormData) {
  try {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    const res = await auth.api.signInEmail({
      body: data,
    });

    // Better Authのレスポンス構造に基づいてエラーハンドリング
    if (!res.user) {
      return { success: false, error: "ログインに失敗しました" };
    }

    revalidatePath("/");
    return { success: true, user: res.user };
  } catch (error) {
    console.error("Sign in error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "ログインに失敗しました",
    };
  }
}

export async function signOut() {
  try {
    await auth.api.signOut({
      headers: {},
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Sign out error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "ログアウトに失敗しました",
    };
  }
}

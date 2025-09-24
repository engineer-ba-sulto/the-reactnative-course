"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface SignUpEmailBody {
  name: string;
  email: string;
  password: string;
  image?: string;
  callbackURL?: string;
}

export interface SignInEmailBody {
  email: string;
  password: string;
  callbackURL?: string;
}

export async function signUpEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm-password") as string;

  // バリデーション
  if (!name || !email || !password || !confirmPassword) {
    throw new Error("すべてのフィールドを入力してください");
  }

  if (password !== confirmPassword) {
    throw new Error("パスワードが一致しません");
  }

  if (password.length < 8) {
    throw new Error("パスワードは8文字以上で入力してください");
  }

  try {
    const data = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        callbackURL: "/",
      },
    });

    // Better Authのレスポンス構造に基づいてエラーハンドリング
    if (!data.user) {
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
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // バリデーション
  if (!email || !password) {
    throw new Error("メールアドレスとパスワードを入力してください");
  }

  try {
    const data = await auth.api.signInEmail({
      body: {
        email,
        password,
        callbackURL: "/",
      },
    });

    // Better Authのレスポンス構造に基づいてエラーハンドリング
    if (!data.user) {
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

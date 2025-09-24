"use server";

import { auth } from "@/lib/auth";
import { AuthResult } from "@/types/auth";
import { signInEmailSchema, signUpEmailSchema } from "@/zod/certification";
import { revalidatePath } from "next/cache";

const { headers } = await import("next/headers");

// ヘルパー関数
function formDataToObject(formData: FormData): Record<string, string> {
  const data: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") {
      data[key] = value;
    }
  }
  return data;
}

export async function signUpEmail(formData: FormData): Promise<AuthResult> {
  try {
    // FormDataをオブジェクトに変換
    const rawData = formDataToObject(formData);

    // Zodスキーマでバリデーション
    const validationResult = signUpEmailSchema.safeParse(rawData);
    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0];
      return { success: false, error: firstError.message };
    }

    const { name, email, password } = validationResult.data;

    const res = await auth.api.signUpEmail({
      body: { name, email, password },
    });

    // Better Authのレスポンス構造に基づいてエラーハンドリング
    if (!res.user) {
      return { success: false, error: "アカウント作成に失敗しました" };
    }

    revalidatePath("/");
    return { success: true, user: res.user };
  } catch {
    // セキュリティを考慮したログ出力（ユーザー情報は含めない）
    console.error("Sign up error occurred");
    return {
      success: false,
      error:
        "アカウント作成に失敗しました。しばらく時間をおいて再度お試しください。",
    };
  }
}

export async function signInEmail(formData: FormData): Promise<AuthResult> {
  try {
    // FormDataをオブジェクトに変換
    const rawData = formDataToObject(formData);

    // Zodスキーマでバリデーション
    const validationResult = signInEmailSchema.safeParse(rawData);
    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0];
      return { success: false, error: firstError.message };
    }

    const { email, password } = validationResult.data;

    const res = await auth.api.signInEmail({
      body: { email, password },
    });

    // Better Authのレスポンス構造に基づいてエラーハンドリング
    if (!res.user) {
      return {
        success: false,
        error: "メールアドレスまたはパスワードが正しくありません",
      };
    }

    revalidatePath("/");
    return { success: true, user: res.user };
  } catch {
    // セキュリティを考慮したログ出力（ユーザー情報は含めない）
    console.error("Sign in error occurred");
    return {
      success: false,
      error:
        "ログインに失敗しました。メールアドレスとパスワードを確認してください。",
    };
  }
}

export async function signOut(): Promise<AuthResult> {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
    revalidatePath("/");
    return { success: true };
  } catch {
    // セキュリティを考慮したログ出力
    console.error("Sign out error occurred");
    return {
      success: false,
      error:
        "ログアウトに失敗しました。しばらく時間をおいて再度お試しください。",
    };
  }
}

export async function signOutAction(): Promise<void> {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
    revalidatePath("/");
  } catch {
    // セキュリティを考慮したログ出力
    console.error("Sign out action error occurred");
    throw new Error("ログアウトに失敗しました");
  }
}

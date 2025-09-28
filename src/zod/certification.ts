import { z } from "zod";

// サインアップ用のバリデーションスキーマ
export const signUpEmailSchema = z
  .object({
    name: z
      .string()
      .min(1, "名前を入力してください")
      .max(50, "名前は50文字以内で入力してください"),
    email: z
      .string()
      .min(1, "メールアドレスを入力してください")
      .email("正しいメールアドレスを入力してください"),
    password: z
      .string()
      .min(8, "パスワードは8文字以上で入力してください")
      .max(100, "パスワードは100文字以内で入力してください"),
    confirmPassword: z.string().min(1, "確認用パスワードを入力してください"),
    image: z.string().url("正しいURLを入力してください").optional(),
    callbackURL: z.string().url("正しいURLを入力してください").optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  });

// サインイン用のバリデーションスキーマ
export const signInEmailSchema = z.object({
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("正しいメールアドレスを入力してください"),
  password: z.string().min(1, "パスワードを入力してください"),
  callbackURL: z.string().url("正しいURLを入力してください").optional(),
});

// アカウント更新用のバリデーションスキーマ
export const accountUpdateSchema = signUpEmailSchema.pick({
  name: true,
  email: true,
});

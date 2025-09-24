import { signInEmailSchema, signUpEmailSchema } from "@/zod/certification";
import z from "zod";

// 型定義のエクスポート
export type SignUpEmailInput = z.infer<typeof signUpEmailSchema>;
export type SignInEmailInput = z.infer<typeof signInEmailSchema>;

// 型定義
export type AuthResult = {
  success: boolean;
  user?: unknown;
  error?: string;
};

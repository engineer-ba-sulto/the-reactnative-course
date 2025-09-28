"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";
import * as authSchema from "./schemas/auth";

// Cloudflare D1の場合、ランタイムでデータベースインスタンスを受け取る
export const getDb = async () => {
  const { env } = await getCloudflareContext({ async: true });
  return drizzle(env.the_reactnative_course_db, {
    schema: {
      ...authSchema,
    },
  });
};

// 同期的なデータベースインスタンス（開発用）
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let dbInstance: any = null;

export const db = async () => {
  if (!dbInstance) {
    dbInstance = await getDb();
  }
  return dbInstance;
};

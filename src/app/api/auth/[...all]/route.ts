import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// APIルート用のauthインスタンスを取得
let authInstance: Awaited<ReturnType<typeof auth>> | null = null;

async function getAuthInstance() {
  if (!authInstance) {
    authInstance = await auth();
  }
  return authInstance;
}

export async function POST(request: Request) {
  const authInstance = await getAuthInstance();
  const handler = toNextJsHandler(authInstance);
  return handler.POST(request);
}

export async function GET(request: Request) {
  const authInstance = await getAuthInstance();
  const handler = toNextJsHandler(authInstance);
  return handler.GET(request);
}

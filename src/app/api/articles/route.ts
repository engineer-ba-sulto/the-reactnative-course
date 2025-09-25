import { getAllArticlesFromR2 } from "@/lib/r2-articles";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Cloudflare Workers環境でのR2バケットアクセス
    const bucket = (
      globalThis as typeof globalThis & { ARTICLES_BUCKET?: R2Bucket }
    ).ARTICLES_BUCKET;

    if (!bucket) {
      console.warn("R2 bucket not available, returning empty articles list");
      return NextResponse.json([]);
    }

    const articles = await getAllArticlesFromR2();
    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}

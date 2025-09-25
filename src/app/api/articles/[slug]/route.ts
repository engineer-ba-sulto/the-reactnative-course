import { getArticleBySlugFromR2 } from "@/lib/r2-articles";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    // Cloudflare Workers環境でのR2バケットアクセス
    const bucket = (
      globalThis as typeof globalThis & { ARTICLES_BUCKET?: R2Bucket }
    ).ARTICLES_BUCKET;

    if (!bucket) {
      return NextResponse.json(
        { error: "R2 bucket not configured" },
        { status: 500 }
      );
    }

    const article = await getArticleBySlugFromR2(bucket, slug);

    return NextResponse.json(article);
  } catch (error) {
    console.error(`Error fetching article:`, error);
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }
}

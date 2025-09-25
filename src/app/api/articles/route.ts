import { getAllArticlesFromR2 } from "@/lib/r2-articles";
import { NextResponse } from "next/server";

export async function GET() {
  try {
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

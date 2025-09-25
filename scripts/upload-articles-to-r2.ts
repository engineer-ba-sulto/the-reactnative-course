#!/usr/bin/env bun

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { config } from "dotenv";
import fs from "fs";
import path from "path";

// .env.localファイルを明示的に読み込み
config({ path: path.join(process.cwd(), ".env.local") });

// Cloudflare R2の設定
const R2_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const CLOUDFLARE_ACCOUNT_API_TOKEN = process.env.CLOUDFLARE_ACCOUNT_API_TOKEN;
const R2_BUCKET_NAME = "react-native-course-r2";

if (
  !R2_ACCOUNT_ID ||
  !R2_ACCESS_KEY_ID ||
  !R2_SECRET_ACCESS_KEY ||
  !CLOUDFLARE_ACCOUNT_API_TOKEN
) {
  console.error("Missing required environment variables:");
  console.error("- CLOUDFLARE_ACCOUNT_ID");
  console.error("- R2_ACCESS_KEY_ID");
  console.error("- R2_SECRET_ACCESS_KEY");
  console.error("- CLOUDFLARE_ACCOUNT_API_TOKEN");
  process.exit(1);
}

// S3互換のR2クライアントを作成
const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,

  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

async function uploadArticleToR2(filePath: string, key: string) {
  try {
    const fileContent = fs.readFileSync(filePath);

    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      Body: fileContent,
      ContentType: "text/markdown",
    });

    await r2Client.send(command);
    console.log(`✅ Uploaded: ${key}`);
  } catch (error) {
    console.error(`❌ Failed to upload ${key}:`, error);
  }
}

async function uploadAllArticles() {
  const articlesDir = path.join(process.cwd(), "src/content/articles");

  if (!fs.existsSync(articlesDir)) {
    console.error(`Articles directory not found: ${articlesDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(articlesDir);
  const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

  if (mdxFiles.length === 0) {
    console.log("No MDX files found in articles directory");
    return;
  }

  console.log(`Found ${mdxFiles.length} MDX files to upload...`);

  for (const file of mdxFiles) {
    const filePath = path.join(articlesDir, file);
    const key = `articles/${file}`;
    await uploadArticleToR2(filePath, key);
  }

  console.log("🎉 Upload completed!");
}

// スクリプトを実行
uploadAllArticles().catch(console.error);

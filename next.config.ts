import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import rehypePrettyCode from "rehype-pretty-code";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  /* config options here */
};

const options = {
  theme: "dark-plus",
};

// 開発環境でのみMDXプラグインを使用（本番環境では軽量化のため無効化）
const withMDX =
  process.env.NODE_ENV === "development"
    ? createMDX({
        extension: /\.(md|mdx)$/,
        options: {
          remarkPlugins: [remarkFrontmatter, remarkGfm],
          rehypePlugins: [[rehypePrettyCode, options]],
        },
      })
    : (config: NextConfig) => config;

// Merge MDX config with Next.js config
export default withMDX(nextConfig);

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();

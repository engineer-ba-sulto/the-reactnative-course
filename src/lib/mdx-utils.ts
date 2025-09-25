import { compile } from "@mdx-js/mdx";

/**
 * MDXコンテンツをReactコンポーネントに変換する
 */
export async function compileMDXToComponent(mdxContent: string) {
  try {
    // MDXコンテンツをコンパイル
    const compiledMDX = await compile(mdxContent, {
      outputFormat: "function-body",
      development: process.env.NODE_ENV === "development",
    });

    // コンパイルされたMDXを実行可能な関数に変換
    const { default: MDXContent } = await eval(`(${compiledMDX})`);

    return MDXContent;
  } catch (error) {
    console.error("Error compiling MDX:", error);
    throw new Error("Failed to compile MDX content");
  }
}

/**
 * MDXコンテンツをHTMLに変換する（シンプルな実装）
 * 注意: これは基本的なMarkdownのHTML変換のみで、MDXの高度な機能は使用できません
 */
export function mdxToHTML(mdxContent: string): string {
  // 基本的なMarkdownからHTMLへの変換
  // 実際のプロダクションでは、より高度なMDXコンパイラを使用することを推奨

  let html = mdxContent
    // ヘッダー
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    // 太字
    .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
    // 斜体
    .replace(/\*(.*)\*/gim, "<em>$1</em>")
    // コードブロック
    .replace(/```([\s\S]*?)```/gim, "<pre><code>$1</code></pre>")
    // インラインコード
    .replace(/`([^`]*)`/gim, "<code>$1</code>")
    // リンク
    .replace(/\[([^\]]*)\]\(([^)]*)\)/gim, '<a href="$2">$1</a>')
    // 改行を段落に変換
    .replace(/\n\n/gim, "</p><p>")
    .replace(/\n/gim, "<br>");

  // 段落タグで囲む
  html = "<p>" + html + "</p>";

  return html;
}

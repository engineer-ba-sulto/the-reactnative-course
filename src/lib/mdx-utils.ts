import { CodeBlock } from "@/components/ui/code-block";
import React from "react";

/**
 * MDXコンテンツをReactコンポーネントに変換する（軽量版）
 * Cloudflare Workersのサイズ制限のため、基本的なMarkdown変換を使用
 */
export async function compileMDXToComponent(mdxContent: string) {
  return function MDXComponent() {
    const processedContent = processMDXContent(mdxContent);
    return React.createElement("div", null, ...processedContent);
  };
}

/**
 * MDXコンテンツをReactコンポーネントに変換する（軽量版）
 * Cloudflare Workersのサイズ制限のため、基本的なMarkdown変換を使用
 */
export async function mdxToComponent(mdxContent: string) {
  return function MDXComponent() {
    const processedContent = processMDXContent(mdxContent);
    return React.createElement("div", null, ...processedContent);
  };
}

/**
 * MDXコンテンツをHTMLに変換する（フォールバック用）
 * 注意: これは基本的なMarkdownのHTML変換のみで、MDXの高度な機能は使用できません
 */
export function mdxToHTML(mdxContent: string): string {
  return fallbackMarkdownToHTML(mdxContent);
}

/**
 * MDXコンテンツをReactコンポーネントの配列に変換
 */
function processMDXContent(mdxContent: string): React.ReactNode[] {
  // フロントマターを除去
  const content = mdxContent.replace(/^---[\s\S]*?---\n/, "");

  const elements: React.ReactNode[] = [];
  let currentIndex = 0;

  // コードブロックを処理
  const codeBlockRegex = /```(\w*)\n?([\s\S]*?)```/gim;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    const [fullMatch, language, code] = match;
    const startIndex = match.index;

    // コードブロック前のテキストを処理
    if (startIndex > currentIndex) {
      const beforeText = content.slice(currentIndex, startIndex);
      const textElements = processTextContent(beforeText);
      elements.push(...textElements);
    }

    // CodeBlockコンポーネントを作成
    const codeBlock = React.createElement(CodeBlock, {
      key: `codeblock-${startIndex}`,
      code: code.trim(),
      language: language || "text",
    });
    elements.push(codeBlock);

    currentIndex = startIndex + fullMatch.length;
  }

  // 残りのテキストを処理
  if (currentIndex < content.length) {
    const remainingText = content.slice(currentIndex);
    const textElements = processTextContent(remainingText);
    elements.push(...textElements);
  }

  return elements;
}

/**
 * テキストコンテンツをHTMLに変換してReact要素を作成
 */
function processTextContent(text: string): React.ReactNode[] {
  if (!text.trim()) return [];

  const htmlContent = fallbackMarkdownToHTML(text);
  return [
    React.createElement("div", {
      key: `text-${Math.random()}`,
      dangerouslySetInnerHTML: { __html: htmlContent },
    }),
  ];
}

/**
 * フォールバック用の基本的なMarkdownからHTMLへの変換
 */
function fallbackMarkdownToHTML(mdxContent: string): string {
  // フロントマターを除去
  let html = mdxContent.replace(/^---[\s\S]*?---\n/, "");

  // --- 修正開始 ---

  // リンクとインラインコードを一時的にプレースホルダーに置き換える
  const placeholders: string[] = [];
  const placeholder = (type: string, content: string) => {
    placeholders.push(content);
    return `__${type}_${placeholders.length - 1}__`;
  };

  // 既存のリンクをプレースホルダーに置換
  html = html.replace(/\[([^\]]*)\]\(([^)]*)\)/gim, (match, text, url) => {
    return placeholder(
      "LINK",
      `<a href="${url}" class="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">${text}</a>`
    );
  });

  // 1. コードブロック処理（最初に実行）
  html = html.replace(
    /```(\w*)\n?([\s\S]*?)```/gim,
    (match, language, codeContent) => {
      const escapedCode = escapeHtml(codeContent);
      const lang = language || "text";
      return `<div class="relative group bg-black rounded-lg mb-4">
      <div class="flex items-center justify-between bg-black px-4 py-2 rounded-t-lg border-b border-gray-600">
        <span class="text-sm font-medium text-gray-300">${lang}</span>
      </div>
      <div class="bg-black p-4 rounded-b-lg overflow-x-auto mt-0">
        <pre class="text-sm text-gray-100"><code class="language-${lang}">${escapedCode}</code></pre>
      </div>
    </div>`;
    }
  );

  // 2. インラインコード処理（コードブロック処理の直後）
  html = html.replace(/`([^`]+)`/gim, (match, code) => {
    const escapedCode = escapeHtml(code);
    return placeholder(
      "INLINE_CODE",
      `<code class="inline-code bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-800 dark:text-gray-200">${escapedCode}</code>`
    );
  });

  // 3. テーブル処理
  html = html.replace(
    /\|(.+)\|\n\|[-\s|:]+\|\n((?:\|.+\|\n?)*)/gim,
    (match, headerRow, bodyRows) => {
      const headers = headerRow
        .split("|")
        .map((cell: string) => cell.trim())
        .filter((cell: string) => cell.length > 0)
        .map((cell: string) => {
          const processedCell = processTableCell(cell);
          return `<th>${processedCell}</th>`;
        })
        .join("");

      const rows = bodyRows
        .trim()
        .split("\n")
        .filter((row: string) => row.trim().length > 0)
        .map((row: string) => {
          const cells = row
            .split("|")
            .map((cell: string) => cell.trim())
            .filter((cell: string) => cell.length > 0)
            .map((cell: string) => {
              const processedCell = processTableCell(cell);
              return `<td>${processedCell}</td>`;
            })
            .join("");
          return `<tr>${cells}</tr>`;
        })
        .join("");

      return `<div class="overflow-x-auto mb-4"><table class="min-w-full border-collapse border border-gray-300 dark:border-gray-600"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table></div>`;
    }
  );

  // 4. ヘッダー処理
  html = html.replace(/^##### (.*$)/gim, (match, content) => {
    const processedContent = processHeaderContent(content);
    return `<h5 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 mt-4">${processedContent}</h5>`;
  });
  html = html.replace(/^#### (.*$)/gim, (match, content) => {
    const processedContent = processHeaderContent(content);
    return `<h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2 mt-4">${processedContent}</h4>`;
  });
  html = html.replace(/^### (.*$)/gim, (match, content) => {
    const processedContent = processHeaderContent(content);
    return `<h3 class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3 mt-5">${processedContent}</h3>`;
  });
  html = html.replace(/^## (.*$)/gim, (match, content) => {
    const processedContent = processHeaderContent(content);
    return `<h2 class="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4 mt-6">${processedContent}</h2>`;
  });
  html = html.replace(/^# (.*$)/gim, (match, content) => {
    const processedContent = processHeaderContent(content);
    return `<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6 mt-8 first:mt-0">${processedContent}</h1>`;
  });

  // 5. 太字・斜体処理
  html = html.replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>");
  html = html.replace(/\*(.*?)\*/gim, "<em>$1</em>");

  // 6. URLの自動リンク化
  html = html.replace(
    /(?<!['"=\]\(])\b(https?:\/\/[^\s<>"'()]+)\b/g,
    (url) =>
      `<a href="${url}" class="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">${url}</a>`
  );

  // 7. リスト処理
  html = html.replace(/^(\d+\.\s+.*(?:\n\d+\.\s+.*)*)/gim, (match) => {
    const items = match
      .split(/\n(?=\d+\.\s+)/)
      .map((item) => item.replace(/^\d+\.\s+/, "").trim())
      .map((item) => {
        const processedItem = item
          .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
          .replace(/\*(.*?)\*/gim, "<em>$1</em>");
        return `<li>${processedItem}</li>`;
      })
      .join("");
    return `<ol class="list-decimal list-inside mb-4 text-gray-700 dark:text-gray-300 space-y-2">${items}</ol>`;
  });

  html = html.replace(/^(-\s+.*(?:\n-\s+.*)*)/gim, (match) => {
    const items = match
      .split(/\n(?=-\s+)/)
      .map((item) => item.replace(/^-\s+/, "").trim())
      .map((item) => {
        const processedItem = item
          .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
          .replace(/\*(.*?)\*/gim, "<em>$1</em>");
        return `<li>${processedItem}</li>`;
      })
      .join("");
    return `<ul class="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300 space-y-2">${items}</ul>`;
  });

  // 8. 改行処理
  html = html.replace(/\n\n/gim, "</p><p>");
  html = html.replace(/\n/gim, "<br>");

  // 9. 段落タグで囲む
  html = "<p>" + html + "</p>";

  // 10. 最終的なバッククォートクリーンアップ（全ての処理の後）
  html = html.replace(/`/g, "");

  // プレースホルダーを元のコンテンツに戻す
  html = html.replace(/__(\w+)_(\d+)__/g, (match, type, indexStr) => {
    const index = parseInt(indexStr, 10);
    return placeholders[index] || match;
  });

  return html;
}

/**
 * ヘッダー内のMarkdown処理
 */
function processHeaderContent(content: string): string {
  let processed = content
    // 太字
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    // 斜体
    .replace(/\*(.*?)\*/gim, "<em>$1</em>");

  // 残ったバッククォートを削除
  processed = processed.replace(/`/g, "");

  return processed;
}

/**
 * テーブルセル内のMarkdown処理
 */
function processTableCell(cell: string): string {
  let processed = cell
    // 太字
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    // 斜体
    .replace(/\*(.*?)\*/gim, "<em>$1</em>");

  // 残ったバッククォートを削除
  processed = processed.replace(/`/g, "");

  return processed;
}

/**
 * HTMLエスケープ関数
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/#/g, "&num;");
}

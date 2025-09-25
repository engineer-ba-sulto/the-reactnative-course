import React from "react";

/**
 * MDXコンテンツをReactコンポーネントに変換する（軽量版）
 * Cloudflare Workersのサイズ制限のため、基本的なMarkdown変換を使用
 */
export async function compileMDXToComponent(mdxContent: string) {
  return function MDXComponent() {
    const htmlContent = fallbackMarkdownToHTML(mdxContent);
    return React.createElement("div", {
      dangerouslySetInnerHTML: { __html: htmlContent },
    });
  };
}

/**
 * MDXコンテンツをReactコンポーネントに変換する（軽量版）
 * Cloudflare Workersのサイズ制限のため、基本的なMarkdown変換を使用
 */
export async function mdxToComponent(mdxContent: string) {
  return function MDXComponent() {
    const htmlContent = fallbackMarkdownToHTML(mdxContent);
    return React.createElement("div", {
      dangerouslySetInnerHTML: { __html: htmlContent },
    });
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
 * フォールバック用の基本的なMarkdownからHTMLへの変換
 */
function fallbackMarkdownToHTML(mdxContent: string): string {
  // フロントマターを除去
  let html = mdxContent.replace(/^---[\s\S]*?---\n/, "");

  // 1. コードブロック処理（最初に実行）
  html = html.replace(/```[\s\S]*?```/gim, (match) => {
    const codeContent = match.replace(/^```\w*\n?/, "").replace(/\n?```$/, "");
    const escapedCode = escapeHtml(codeContent);
    return `<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4"><code class="text-sm font-mono text-gray-800 dark:text-gray-200">${escapedCode}</code></pre>`;
  });

  // 2. インラインコード処理（コードブロック処理の直後）
  html = html.replace(/`([^`]+)`/gim, (match, code) => {
    const escapedCode = escapeHtml(code);
    return `<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-800 dark:text-gray-200">${escapedCode}</code>`;
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

  // 6. リンク処理
  html = html.replace(/\[([^\]]*)\]\(([^)]*)\)/gim, '<a href="$2">$1</a>');

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

  return html;
}

/**
 * ヘッダー内のMarkdown処理
 */
function processHeaderContent(content: string): string {
  return (
    content
      // 太字
      .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
      // 斜体
      .replace(/\*(.*?)\*/gim, "<em>$1</em>")
      // インラインコード（バッククオート）
      .replace(/`([^`]+)`/gim, (match, code) => {
        const escapedCode = escapeHtml(code);
        return `<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-800 dark:text-gray-200">${escapedCode}</code>`;
      })
  );
}

/**
 * テーブルセル内のMarkdown処理
 */
function processTableCell(cell: string): string {
  return (
    cell
      // 太字
      .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
      // 斜体
      .replace(/\*(.*?)\*/gim, "<em>$1</em>")
      // インラインコード（バッククオート）
      .replace(/`([^`]+)`/gim, (match, code) => {
        const escapedCode = escapeHtml(code);
        return `<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-800 dark:text-gray-200">${escapedCode}</code>`;
      })
  );
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
    .replace(/'/g, "&#39;")
    .replace(/#/g, "&#35;");
}

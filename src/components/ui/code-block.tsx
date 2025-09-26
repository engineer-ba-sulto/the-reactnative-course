"use client";

import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { createHighlighter, type Highlighter } from "shiki";

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null);
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    const initHighlighter = async () => {
      try {
        const hl = await createHighlighter({
          themes: ["github-dark", "github-light"],
          langs: [
            "javascript",
            "typescript",
            "jsx",
            "tsx",
            "json",
            "css",
            "html",
            "bash",
            "shell",
            "python",
            "java",
            "cpp",
            "c",
            "sql",
            "markdown",
            "yaml",
            "xml",
            "diff",
            "text",
          ],
        });
        setHighlighter(hl);
      } catch (error) {
        console.error("Failed to initialize highlighter:", error);
      }
    };

    initHighlighter();
  }, []);

  useEffect(() => {
    if (highlighter && code) {
      try {
        const currentTheme = resolvedTheme || theme || "dark";
        const html = highlighter.codeToHtml(code, {
          lang: language || "text",
          theme: currentTheme === "dark" ? "github-dark" : "github-light",
        });
        // preタグにmt-0クラスを追加
        const processedHtml = html.replace(
          /<pre([^>]*)>/g,
          (match, attributes) => {
            if (attributes.includes("class=")) {
              // 既存のclass属性がある場合、mt-0を追加
              return match.replace(/class="([^"]*)"/, 'class="$1 mt-0"');
            } else {
              // class属性がない場合、新しく追加
              return `<pre${attributes} class="mt-0">`;
            }
          }
        );
        setHighlightedCode(processedHtml);
      } catch (error) {
        console.error("Failed to highlight code:", error);
        setHighlightedCode(code);
      }
    }
  }, [highlighter, code, language, theme, resolvedTheme]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  return (
    <div className="relative group bg-[#24292e] rounded-lg">
      <div className="flex items-center justify-between bg-black px-4 py-2 rounded-t-lg">
        <span className="text-sm font-medium text-gray-300">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-gray-300 hover:text-white hover:bg-gray-800"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      {highlightedCode ? (
        <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      ) : (
        <pre className="text-sm text-gray-100 mt-0">
          <code className={`language-${language}`}>{code}</code>
        </pre>
      )}
    </div>
  );
}

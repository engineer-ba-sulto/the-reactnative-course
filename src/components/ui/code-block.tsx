"use client";

import { Button } from "@/components/ui/button";
import hljs from "highlight.js";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState<string>("");

  useEffect(() => {
    try {
      if (language && language !== "text") {
        const result = hljs.highlight(code, { language });
        setHighlightedCode(result.value);
      } else {
        setHighlightedCode(code);
      }
    } catch (error) {
      console.error("Highlight.js error:", error);
      setHighlightedCode(code);
    }
  }, [code, language]);

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
    <div className="relative group bg-black rounded-lg mb-4">
      <div className="flex items-center justify-between bg-black px-4 py-2 rounded-t-lg border-b border-gray-600">
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
      <div className="bg-black p-0 rounded-b-lg overflow-x-auto mt-0">
        <pre className="text-gray-100 bg-black mt-0 mb-0 p-0">
          <code
            className={`language-${language} hljs`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      </div>
    </div>
  );
}

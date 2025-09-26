import { CodeBlock } from "@/components/ui/code-block";
import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

const components = {
  // Allows customizing built-in components, e.g. to add styling.
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 mt-8 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4 mt-6">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3 mt-5">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2 mt-4">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300 space-y-2">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside mb-4 text-gray-700 dark:text-gray-300 space-y-2">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-gray-700 dark:text-gray-300">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400 mb-4">
      {children}
    </blockquote>
  ),
  code: ({ children, className }) => {
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "";

    if (language) {
      return (
        <CodeBlock
          code={String(children).replace(/\n$/, "")}
          language={language}
        />
      );
    }

    return (
      <code
        className="inline-code bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-800 dark:text-gray-200"
        style={
          {
            "--tw-content": '""',
            content: '""',
          } as React.CSSProperties
        }
      >
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4">
      {children}
    </pre>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  img: (props) => {
    const { alt, ...restProps } = props as ImageProps;
    return (
      <Image
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        className="rounded-lg mb-4"
        alt={alt || ""}
        {...restProps}
      />
    );
  },
  table: ({ children }) => (
    <div className="overflow-x-auto mb-6">
      <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden shadow-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>
  ),
  tbody: ({ children }) => (
    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
      {children}
    </tbody>
  ),
  th: ({ children }) => (
    <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
      {children}
    </td>
  ),
  tr: ({ children }) => (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      {children}
    </tr>
  ),
  // HTMLタグをテキストとして表示するための処理
  button: ({ children, ...props }) => {
    const propsString = Object.keys(props)
      .map((key) => ` ${key}="${props[key]}"`)
      .join("");
    return (
      <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-800 dark:text-gray-200">
        &lt;button{propsString}&gt;{children}&lt;/button&gt;
      </span>
    );
  },
} satisfies MDXComponents;

export { components };

export function useMDXComponents(): MDXComponents {
  return components;
}

import { getBaseUrl } from "@/lib/url-utils";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | React Native Course",
    default: "React Native Course",
  },
  metadataBase: new URL(getBaseUrl()),
  description: "React Native Course",
  openGraph: {
    title: "React Native Course",
    description: "React Native Course",
    type: "website",
    locale: "ja_JP",
    images: ["/opengraph-image.png", "/opengraph-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "React Native Course",
    description: "React Native Course",
    images: ["/opengraph-image.png", "/opengraph-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${notoSansJP.className} antialiased`}>
        {children}
        <Toaster />
      </body>
      <GoogleAnalytics gaId={process.env.gaId!} />
    </html>
  );
}

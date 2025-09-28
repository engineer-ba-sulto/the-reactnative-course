import Image from "next/image";
// import Link from "next/link";
// import { Button } from "./ui/button";

export default function Hero() {
  return (
    <section className="flex flex-col justify-center h-screen pb-20 px-4">
      <div className="max-w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-40 items-center">
          {/* 左側: タイトルとコンテンツ */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 space-y-4">
              <p>React Nativeの</p>
              <p className="text-4xl md:text-6xl text-blue-600 block ">
                プロフェッショナル
              </p>
              <p>になる</p>
            </h1>
            <div className="text-lg text-gray-600 leading-relaxed">
              <p>
                モバイルアプリ開発を学び、実践的なスキルを身につけましょう。
              </p>
              <p>初心者から上級者まで対応した包括的なコースです。</p>
            </div>
            <div className="text-lg text-gray-900 leading-relaxed">
              <p>バイブコーディングには、頼りません！</p>
              <p>効率よく開発するための、正しいAIの活用方法を学びましょう。</p>
            </div>
            {/* <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                variant="outline"
                className="bg-green-500 text-green-900 hover:bg-green-600 h-16"
              >
                <Link href="#waiting-list">
                  <span className="text-white text-lg font-bold">
                    ウェイティングリストに登録
                  </span>
                </Link>
              </Button>
            </div> */}
          </div>

          {/* 右側: 画像 */}
          <div className="relative">
            <div className="aspect-square  rounded-2xl flex items-center justify-center relative overflow-hidden">
              {/* 中央のiPhone画像 */}
              <div className="relative z-10">
                <Image
                  src="/iphone.png"
                  alt="iPhone with React Native apps"
                  width={192}
                  height={384}
                  className="w-108 h-auto mx-auto"
                />
              </div>

              {/* 軌道の円 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 border border-gray-900 rounded-full opacity-30"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-112 h-112 border border-gray-900 rounded-full opacity-20"></div>
              </div>

              {/* Expo SVG - 右上 */}
              <div className="absolute top-16 right-20 w-20 h-20 z-20">
                <Image
                  src="/expo.svg"
                  alt="Expo"
                  width={64}
                  height={64}
                  className="w-full h-full opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>

              {/* React Native SVG - 左上 */}
              <div className="absolute top-16 left-20 w-20 h-20 z-20">
                <Image
                  src="/react-native.svg"
                  alt="React Native"
                  width={64}
                  height={64}
                  className="w-full h-full opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
 
							{/* TypeScript SVG - 下 */}
              <div className="absolute bottom-2 left-60 w-20 h-20 z-20">
                <Image
                  src="/typescript.svg"
                  alt="TypeScript"
                  width={64}
                  height={64}
                  className="w-full h-full opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>

              {/* 追加の装飾要素 */}
              <div className="absolute bottom-12 left-12 w-12 h-12 bg-blue-500 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute bottom-16 right-16 w-8 h-8 bg-purple-500 rounded-full opacity-60 animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-4 w-6 h-6 bg-green-500 rounded-full opacity-60 animate-pulse delay-500"></div>
              <div className="absolute top-1/2 right-4 w-6 h-6 bg-yellow-500 rounded-full opacity-60 animate-pulse delay-1500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

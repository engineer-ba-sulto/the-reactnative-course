export default function Hero() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 左側: タイトルとコンテンツ */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
              React Native
              <span className="text-blue-600 block">コース</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              モバイルアプリ開発を学び、実践的なスキルを身につけよう。
              初心者から上級者まで対応した包括的なコースです。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                今すぐ始める
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                詳細を見る
              </button>
            </div>
          </div>

          {/* 右側: 画像 */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">RN</span>
                </div>
                <p className="text-gray-600 font-medium">React Native</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

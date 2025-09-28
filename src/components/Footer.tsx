export function Footer() {
  return (
    <footer className="border-t bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* コピーライト */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © 2025 React Native Course. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="mailto:support@example.com"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm"
            >
              お問い合わせ
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm"
            >
              プライバシーポリシー
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm"
            >
              利用規約
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

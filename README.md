# React Native コース

これは、記事の R2 ストレージと Cloudflare Workers にデプロイされた React Native コースプラットフォーム用の[Next.js](https://nextjs.org)プロジェクトです。

## 技術スタック

- **フレームワーク**: Next.js 15 with App Router
- **ランタイム**: Cloudflare Workers
- **ストレージ**: MDX 記事用の Cloudflare R2
- **スタイリング**: Tailwind CSS + shadcn/ui
- **データベース**: Drizzle ORM を使用した Supabase
- **認証**: Better Auth
- **パッケージマネージャー**: Bun

## はじめに

### 前提条件

1. [Bun](https://bun.sh/)をインストール
2. 記事用の Cloudflare R2 バケットをセットアップ
3. 環境変数を設定

### 環境変数

以下の変数を含む`.env.local`ファイルを作成してください：

```bash
# Cloudflare R2設定
CLOUDFLARE_ACCOUNT_ID=your_account_id_here
R2_ACCESS_KEY_ID=your_r2_access_key_id_here
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key_here
CLOUDFLARE_ACCOUNT_API_TOKEN=your_account_api_token_here

# その他の環境変数...
```

### セットアップ

1. 依存関係をインストール：

```bash
bun install
```

2. 記事を R2 にアップロード：

```bash
bun run upload-articles
```

3. 開発サーバーを起動：

```bash
bun dev
```

ブラウザで[http://localhost:3000](http://localhost:3000)を開いて結果を確認してください。

## Cloudflare R2 セットアップ

### 1. R2 バケットの作成

1. [Cloudflare Dashboard](https://dash.cloudflare.com/)にログイン
2. 左サイドバーから「R2 Object Storage」をクリック
3. 「Create bucket」をクリック
4. バケット名に `react-native-course-articles` を入力して作成

### 2. API トークンの取得

1. R2 ページで「API トークンの管理」をクリック
2. 「Account API トークンを作成する」ボタンをクリック
3. 以下の設定を行います：
   - **トークン名**: 任意の名前（例：`react-native-course-r2`）
   - **アクセス許可**:
     - `Object:Edit` - オブジェクトの読み書き権限
   - **バケットの指定**: 対象のバケットを選択
4. 「Account API トークンを作成する」をクリック
5. 作成されたトークンをクリックして以下の情報をコピー：
   - **アクセス キー ID** → `R2_ACCESS_KEY_ID`
   - **シークレット アクセス キー** → `R2_SECRET_ACCESS_KEY`

### 3. Account ID の取得

1. Cloudflare ダッシュボードの右サイドバーに表示される「Account ID」をコピー
2. または、任意のドメインの「Overview」ページで確認可能

### 4. 環境変数の設定

`.env.local`ファイルに環境変数を設定

### 5. 記事のアップロード

#### スクリプトの概要

`upload-articles`スクリプトは、`src/content/articles/`ディレクトリ内の MDX ファイルを自動的に Cloudflare R2 にアップロードします。

#### 使用方法

```bash
bun run upload-articles
```

#### スクリプトの動作

1. `src/content/articles/`ディレクトリをスキャン
2. `.mdx`拡張子のファイルを検出
3. 各ファイルを R2 バケットの`articles/`フォルダにアップロード
4. アップロード状況をリアルタイムで表示

#### アップロードされるファイル

- `src/content/articles/react-native-fundamentals.mdx` → `articles/react-native-fundamentals.mdx`
- `src/content/articles/state-management.mdx` → `articles/state-management.mdx`

#### 実行例

```bash
$ bun run upload-articles
Found 2 MDX files to upload...
✅ Uploaded: articles/react-native-fundamentals.mdx
✅ Uploaded: articles/state-management.mdx
🎉 Upload completed!
```

#### エラーハンドリング

- 環境変数が未設定の場合、エラーメッセージを表示して終了
- アップロードに失敗したファイルは個別にエラー表示
- 記事ディレクトリが存在しない場合はエラーで終了

### 注意事項

- **Secret Access Key**は作成時にのみ表示されます
- トークンは安全に保管し、公開リポジトリにコミットしないでください
- 必要最小限の権限のみを付与することを推奨します

## デプロイ

Cloudflare Workers にデプロイ：

```bash
bun run deploy
```

## 詳細情報

Next.js について詳しく学ぶには、以下のリソースをご覧ください：

- [Next.js ドキュメント](https://nextjs.org/docs) - Next.js の機能と API について学ぶ
- [Learn Next.js](https://nextjs.org/learn) - インタラクティブな Next.js チュートリアル

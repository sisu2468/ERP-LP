# サインタ・コア ERP ランディングページ

## プロジェクト概要

株式会社サインタが提供するスマートERP「サインタ・コア」のランディングページです。企業の業務効率を大幅に向上させる次世代のERPシステムを紹介するWebサイトです。
 
## 技術スタック

### フロントエンド
- **Next.js 14.1.0** - Reactフレームワーク
- **React 18.2.0** - UIライブラリ
- **TypeScript 5** - 型安全な開発
- **Chakra UI 2.8.2** - UIコンポーネントライブラリ
- **Tailwind CSS 3.4.1** - ユーティリティファーストCSS
- **Framer Motion 11.0.3** - アニメーションライブラリ
- **GSAP 3.12.7** - 高度なアニメーション
- **React Icons 5.5.0** -  アイコンライブラリ

### 開発ツール
- **ESLint** - コード品質管理
- **PostCSS** - CSS処理
- **Node.js** - ランタイム環境

## プロジェクト構造

```
erp-lp/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── home/              # ホームページ
│   │   ├── company/           # 会社概要ページ
│   │   ├── career/            # 採用情報ページ
│   │   ├── pricing/           # 料金プランページ
│   │   ├── sainta-erp/        # ERP詳細ページ
│   │   ├── compare/           # 比較ページ
│   │   ├── svg-demo/          # SVGデモページ
│   │   ├── layout.tsx         # ルートレイアウト
│   │   ├── page.tsx           # ルートページ
│   │   ├── theme.ts           # Chakra UIテーマ設定
│   │   ├── globals.css        # グローバルスタイル
│   │   └── providers.tsx      # プロバイダー設定
│   ├── components/            # 再利用可能コンポーネント
│   │   ├── common/            # 共通コンポーネント
│   │   │   ├── InquiryModal.tsx    # お問い合わせモーダル
│   │   │   ├── LoadingManager.tsx  # ローディング管理
│   │   │   ├── LoadingAnimation.tsx # ローディングアニメーション
│   │   │   ├── SVGAnimation.tsx     # SVGアニメーション
│   │   │   └── ScrollButtons.tsx    # スクロールボタン
│   │   ├── pages/             # ページ専用コンポーネント
│   │   │   ├── home/          # ホームページコンポーネント
│   │   │   ├── company/       # 会社概要コンポーネント
│   │   │   ├── career/        # 採用情報コンポーネント
│   │   │   ├── pricing/       # 料金プランコンポーネント
│   │   │   └── erp/           # ERP詳細コンポーネント
│   │   ├── buttons/           # ボタンコンポーネント
│   │   ├── Header.tsx         # ヘッダーコンポーネント
│   │   ├── Footer.tsx         # フッターコンポーネント
│   │   └── SLink.tsx          # スタイリングされたリンク
│   ├── constant/              # 定数定義
│   │   ├── navItems.ts        # ナビゲーション項目
│   │   └── interface.ts       # 型定義
│   └── middleware.ts          # Next.jsミドルウェア
├── public/                    # 静的ファイル
│   ├── svg/                   # SVGアニメーションファイル
│   ├── hero/                  # ヒーロー画像
│   ├── images/                # 一般画像
│   ├── featureimages/         # 機能紹介画像
│   ├── testimonials/          # お客様の声画像
│   ├── logos/                 # ロゴ画像
│   ├── favicons/              # ファビコン
│   └── contentblocks/         # コンテンツブロック画像
├── docs/                      # ドキュメント
│   └── SVG_ANIMATIONS.md      # SVGアニメーション実装ガイド
└── package.json               # 依存関係とスクリプト
```

## 主要機能

### 1. レスポンシブデザイン
- モバイル、タブレット、デスクトップに対応
- Chakra UIとTailwind CSSを組み合わせた柔軟なレイアウト

### 2. アニメーションシステム
- **GSAP**による高度なスクロールアニメーション
- **Framer Motion**によるコンポーネントアニメーション
- **SVGアニメーション**による視覚的な演出
- ローディングアニメーションと画像プリロード機能

### 3. お問い合わせ機能
- モーダル形式のお問い合わせフォーム
- 日本語名のバリデーション
- メールアドレスの形式チェック
- バックエンドAPIとの連携

### 4. SEO最適化
- Next.js App Routerによるメタデータ管理
- Open Graph対応
- 構造化データ対応

### 5. パフォーマンス最適化
- 画像の最適化とプリロード
- コード分割と遅延読み込み
- アニメーションの最適化

## セットアップと実行

### 前提条件
- Node.js 18以上
- npm または yarn

### インストール
```bash
# 依存関係のインストール
npm install
# または
yarn install
```

### 開発サーバーの起動
```bash
# 開発モードで起動（ポート3009）
npm run dev
# または
yarn dev
```

ブラウザで [http://localhost:3009](http://localhost:3009) を開いて確認できます。

### ビルドとデプロイ
```bash
# 本番用ビルド
npm run build
# または
yarn build

# 本番サーバーの起動
npm run start
# または
yarn start
```

### リント
```bash
# コード品質チェック
npm run lint
# または
yarn lint
```

## 主要ページ

### ホームページ (`/home`)
- ヒーローセクション
- 問題提起セクション
- 基本フローセクション
- 機能紹介セクション
- CTAセクション

### 会社概要 (`/company`)
- 会社情報
- ミッション・ビジョン
- チーム紹介

### 採用情報 (`/career`)
- 採用ポジション
- 会社文化
- 応募フォーム

### 料金プラン (`/pricing`)
- プラン比較
- 機能一覧
- 導入サポート

## コンポーネント設計

### 共通コンポーネント
- **InquiryModal**: お問い合わせモーダル
- **LoadingManager**: ローディング状態管理
- **SVGAnimation**: SVGアニメーション
- **ScrollButtons**: スクロールナビゲーション

### ページコンポーネント
- **Hero**: ヒーローセクション
- **ProblemSection**: 問題提起セクション
- **FeatureCardWithSVG**: SVG付き機能カード
- **CTASection**: 行動喚起セクション

## アニメーション実装

詳細なアニメーション実装については、[SVG_ANIMATIONS.md](docs/SVG_ANIMATIONS.md)を参照してください。

## 環境変数

```env
# バックエンドAPI URL
NEXT_PUBLIC_API_URL=https://erp-lp-backend.vercel.app
```

## デプロイ

このプロジェクトはVercelでのデプロイを想定しています。

1. Vercelアカウントにログイン
2. GitHubリポジトリを接続
3. 環境変数を設定
4. デプロイ実行

## 開発ガイドライン

### コーディング規約
- TypeScriptの型定義を必ず使用
- ESLintルールに従う
- コンポーネントは関数型コンポーネントを使用
- Propsの型定義はinterfaceで定義

### ファイル命名規則
- コンポーネント: PascalCase (例: `HomePage.tsx`)
- ページ: kebab-case (例: `home/page.tsx`)
- ユーティリティ: camelCase (例: `navItems.ts`)

### スタイリング
- Chakra UIを優先使用
- カスタムスタイルはTailwind CSSを使用
- レスポンシブデザインを意識

## トラブルシューティング

### よくある問題

1. **ポート3009が使用中**
   ```bash
   # 別のポートで起動
   npm run dev -- --port 3010
   ```

2. **依存関係のエラー**
   ```bash
   # node_modulesを削除して再インストール
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **TypeScriptエラー**
   ```bash
   # 型チェック
   npx tsc --noEmit
   ```

## ライセンス

このプロジェクトは株式会社サインタの所有物です。

## お問い合わせ

開発に関する質問や提案は、お問い合わせフォームからお気軽にお問い合わせください。

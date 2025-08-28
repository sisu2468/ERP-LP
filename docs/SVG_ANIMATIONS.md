# SVGアニメーション実装ガイド

このドキュメントでは、サインタERPランディングページで実装されているSVGアニメーションシステムの使用方法について説明します。

## 概要

SVGアニメーションシステムは、以下の3つの主要コンポーネントで構成されています：

1. **LoadingAnimation** - SVGを使用したフルスクリーンローディングアニメーション
2. **LoadingManager** - 画像のプリロードとローディングタイミングの管理
3. **SVGAnimation** - コンテンツセクションで使用する再利用可能なSVGアニメーションコンポーネント

## コンポーネント

### 1. LoadingAnimation (`src/components/common/LoadingAnimation.tsx`)

メインSVGファイルを使用したフルスクリーンローディングアニメーションを表示します。

**Props:**
- `onLoadingComplete?: () => void` - ローディング完了時のコールバック
- `duration?: number` - ローディング時間（ミリ秒、デフォルト: 3500）

**使用方法:**
```tsx
<LoadingAnimation 
  onLoadingComplete={() => console.log('ローディング完了！')}
  duration={3000}
/>
```

### 2. LoadingManager (`src/components/common/LoadingManager.tsx`)

画像のプリロードを含む全体的なローディング体験を管理します。

**Props:**
- `children: React.ReactNode` - ローディング後に表示するコンテンツ
- `imageUrls?: string[]` - プリロードする画像URLの配列
- `minLoadingTime?: number` - 最小ローディング時間（ミリ秒、デフォルト: 2000）

**使用方法:**
```tsx
<LoadingManager 
  imageUrls={['/hero/woman_half.png', '/other-image.jpg']}
  minLoadingTime={3000}
>
  <YourAppContent />
</LoadingManager>
```

### 3. SVGAnimation (`src/components/common/SVGAnimation.tsx`)

コンテンツセクションでアニメーション付きSVGを表示するための再利用可能なコンポーネントです。

**Props:**
- `svgPath: string` - SVGファイルのパス
- `alt?: string` - アクセシビリティのためのaltテキスト
- `width?: string | number` - SVGコンテナの幅
- `height?: string | number` - SVGコンテナの高さ
- `animationType?: 'fadeIn' | 'slideIn' | 'scaleIn' | 'draw'` - アニメーションタイプ
- `duration?: number` - アニメーション時間（ミリ秒）
- `delay?: number` - アニメーション遅延時間（ミリ秒）
- `trigger?: 'onMount' | 'onScroll' | 'onHover'` - アニメーションのトリガータイミング

**使用方法:**
```tsx
<SVGAnimation
  svgPath="/svg/my-animation.svg"
  alt="マイアニメーションアイコン"
  animationType="scaleIn"
  duration={1200}
  delay={200}
  trigger="onScroll"
/>
```

## SVG付き機能カード

### FeatureCardWithSVG (`src/components/pages/home/FeatureCardWithSVG.tsx`)

SVGアニメーションを含む完全な機能カードコンポーネントです。

**Props:**
- `title: string` - 機能タイトル
- `description: string` - 機能説明
- `svgPath?: string` - SVGアニメーションのパス
- `svgAlt?: string` - SVGのaltテキスト
- `features: string[]` - 機能ポイントのリスト
- `animationDelay?: number` - 段階的アニメーションの遅延時間
- `icon?: React.ElementType` - アイコンコンポーネント

**使用方法:**
```tsx
<FeatureCardWithSVG
  title="会計・請求管理"
  description="AIを活用した自動化で経理作業を大幅に効率化"
  svgPath="/svg/accounting-animation.svg"
  svgAlt="会計管理アニメーション"
  features={[
    '請求書の自動生成と管理',
    '経費の自動トラッキング',
    '帳簿の自動記帳'
  ]}
  animationDelay={0}
  icon={FaFileInvoiceDollar}
/>
```

## SVGファイル構造

SVGアニメーションファイルは `public/svg/` ディレクトリに配置してください：

```
public/
├── sainta.svg              # メインローディングアニメーション
└── svg/
    ├── accounting-animation.svg
    ├── finance-animation.svg
    ├── matching-animation.svg
    └── your-custom-animation.svg
```

## カスタムSVGアニメーションの作成

### 基本的なSVGアニメーション構造

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <!-- グラデーション、フィルターなどを定義 -->
  </defs>
  
  <!-- アニメーション要素 -->
  <circle cx="100" cy="100" r="20" fill="#3182ce">
    <animate attributeName="r" values="20;25;20" dur="2s" repeatCount="indefinite"/>
  </circle>
</svg>
```

### アニメーション技法

1. **透明度アニメーション:**
```svg
<animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/>
```

2. **スケールアニメーション:**
```svg
<animateTransform attributeName="transform" type="scale" values="1;1.2;1" dur="2s" repeatCount="indefinite"/>
```

3. **パス描画:**
```svg
<path d="M10 10 L100 100" stroke="#000" stroke-width="2">
  <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="2s"/>
</path>
```

4. **色の変化:**
```svg
<animate attributeName="fill" values="#3182ce;#38a169;#3182ce" dur="3s" repeatCount="indefinite"/>
```

## 統合例

### 1. 既存セクションへの追加

既存の `ServiceIntroSection` を `ServiceIntroSectionWithSVG` に置き換えます：

```tsx
// HomePage.tsxで
import ServiceIntroSectionWithSVG from './ServiceIntroSectionWithSVG';

// 置き換え前
<ServiceIntroSection />

// 置き換え後
<ServiceIntroSectionWithSVG />
```

### 2. 新しいセクションの追加

SVGアニメーションコンポーネントを使用して新しいセクションを作成します：

```tsx
import FeatureCardWithSVG from './FeatureCardWithSVG';

const newFeatures = [
  {
    title: "新機能",
    description: "説明文",
    svgPath: "/svg/new-feature.svg",
    features: ["機能1", "機能2", "機能3"]
  }
];

// コンポーネント内で
<SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
  {newFeatures.map((feature, index) => (
    <FeatureCardWithSVG
      key={feature.title}
      {...feature}
      animationDelay={index * 200}
    />
  ))}
</SimpleGrid>
```

## ベストプラクティス

1. **パフォーマンス:** 最適なローディングのため、SVGファイルは50KB以下に保つ
2. **アクセシビリティ:** SVGには必ずaltテキストを含める
3. **レスポンシブ:** viewBoxとパーセンテージベースの寸法を使用
4. **アニメーションタイミング:** 複数の要素には段階的な遅延を使用
5. **カラーモード:** ダーク/ライトモードの互換性を考慮

## カスタマイズ

### ローディングアニメーションの変更

`public/` ディレクトリの `sainta.svg` ファイルをカスタムローディングアニメーションに置き換えます。

### アニメーションスタイルの変更

`SVGAnimation` コンポーネントを編集して、新しいアニメーションタイプを追加したり、既存のものを変更したりします。

### 新しいトリガーの追加

`SVGAnimation` の `trigger` プロパティを拡張して、`onClick` や `onFocus` などの新しいトリガータイプをサポートします。

## トラブルシューティング

### SVGが読み込まれない
- ファイルパスが正しいか確認
- SVGファイルが `public/` ディレクトリにあるか確認
- SVGの構文が有効か確認

### アニメーションが再生されない
- `trigger` プロパティが正しく設定されているか確認
- `duration` と `delay` の値を確認
- SVGに適切なアニメーション要素があるか確認

### パフォーマンスの問題
- SVGファイルサイズを最適化
- アニメーション要素の数を減らす
- 複雑なアニメーションには `will-change` CSSプロパティを使用 
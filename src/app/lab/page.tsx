import { Metadata } from 'next';
import LabHeroSection from './components/LabHeroSection';
// import LabTestimonialsSection from './components/LabTestimonialsSection';
import LabProcessSection from './components/LabProcessSection';
import LabSimulatorSection from './components/LabSimulatorSection';
import LabFAQSection from './components/LabFAQSection';

export const metadata: Metadata = {
  title: '【株式会社サインタ】サインタ・ラボ',
  description: 'サインタ・ラボは、デザインとテクノロジーの力でお客様のビジネスの本質を「壊れない仕組み」として形にします。あらゆる規模・業種に合わせたカスタム開発を、ワンストップで提供。コーポレートサイト、ECサイト、Webアプリケーション、モバイルアプリ、業務管理システムなど、幅広いプロジェクトに対応します。',
  keywords: 'Web開発, カスタム開発, Webデザイン, アプリ開発, システム開発, サインタラボ, コーポレートサイト, ECサイト, Webアプリケーション, モバイルアプリ, 業務管理システム, ランディングページ, レスポンシブデザイン, 多言語対応, SEO対策, 決済機能, CMS, API連携',
  openGraph: {
    title: '【株式会社サインタ】サインタ・ラボ - カスタムWeb開発サービス',
    description: 'デザインとテクノロジーの力で、お客様のビジネスを「壊れない仕組み」として形にします。コーポレートサイトからWebアプリケーションまで、あらゆるプロジェクトに対応。',
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: '【株式会社サインタ】サインタ・ラボ',
    description: 'カスタムWeb開発サービス。コーポレートサイト、ECサイト、Webアプリケーション、モバイルアプリなど幅広く対応。',
  },
  alternates: {
    canonical: 'https://sainta.co.jp/lab',
    languages: {
      'ja': 'https://sainta.co.jp/lab',
      'en': 'https://sainta.co.jp/en/lab',
      'ko': 'https://sainta.co.jp/ko/lab',
    },
  },
};

export default function LabPage() {
  return (
    <>
      <LabHeroSection />
      {/* <LabTestimonialsSection /> */}
      <LabProcessSection />
      <LabSimulatorSection />
      <LabFAQSection />
    </>
  );
}

import { Metadata } from 'next';
import LabHeroSection from './components/LabHeroSection';
import LabTestimonialsSection from './components/LabTestimonialsSection';
import LabProcessSection from './components/LabProcessSection';
import LabSimulatorSection from './components/LabSimulatorSection';
import LabFAQSection from './components/LabFAQSection';

export const metadata: Metadata = {
  title: 'Sainta Lab - カスタムWeb開発サービス | 株式会社サインタ',
  description: 'サインタ・ラボは、デザインとテクノロジーの力でお客様のビジネスの本質を「壊れない仕組み」として形にします。あらゆる規模・業種に合わせたカスタム開発を、ワンストップで。',
  keywords: 'Web開発, カスタム開発, Webデザイン, アプリ開発, システム開発, サインタラボ',
};

export default function LabPage() {
  return (
    <>
      <LabHeroSection />
      <LabTestimonialsSection />
      <LabProcessSection />
      <LabSimulatorSection />
      <LabFAQSection />
    </>
  );
}

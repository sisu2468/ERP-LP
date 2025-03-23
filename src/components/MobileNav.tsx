'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  title: string;
  path: string;
  description: string;
}

const navItems: NavItem[] = [
  {
    title: 'トップ',
    path: '/',
    description: 'サービス概要や導入メリットを紹介',
  },
  {
    title: 'サービス',
    path: '/services',
    description: 'ERPの各機能一覧',
  },
  {
    title: 'サインタラボ',
    path: '/signta-lab',
    description: 'webシステムの開発',
  },
  {
    title: 'サインタ・コネクト',
    path: '/signta-connect',
    description: '専門家マッチングプラットフォーム',
  },
  {
    title: 'プラン・料金',
    path: '/pricing',
    description: '料金体系と導入プラン',
  },
  {
    title: 'お役立ち情報',
    path: '/resources',
    description: '導入ガイド・活用事例・業務効率化のコツ',
  },
  {
    title: 'お問い合わせ・無料体験',
    path: '/contact',
    description: '相談・無料トライアル申し込み',
  },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        x: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      gsap.to(menuRef.current, {
        x: '100%',
        duration: 0.5,
        ease: 'power2.in',
      });
    }
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2"
        aria-label="メニュー"
      >
        <div className={`w-6 h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
        <div className={`w-6 h-0.5 bg-gray-900 mt-1.5 ${isOpen ? 'opacity-0' : ''}`} />
        <div className={`w-6 h-0.5 bg-gray-900 mt-1.5 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
      </button>

      <div
        ref={menuRef}
        className="fixed top-16 right-0 w-full h-screen bg-white transform translate-x-full"
      >
        <div className="p-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setIsOpen(false)}
              className={`block py-2 px-4 text-lg ${pathname === item.path ? 'text-blue-500' : 'text-gray-900'
                }`}
            >
              <div>
                <div>{item.title}</div>
                <div className="text-sm text-gray-500">{item.description}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 
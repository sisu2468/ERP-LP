import { NavItem } from "./interface";

export const navItems: NavItem[] = [
    {
        title: '会社概要',
        path: '/company',
        description: '会社概要やミッションを紹介',
    },
    // {
    //     title: 'トップ',
    //     path: '/',
    //     description: 'サービス概要や導入メリットを紹介',
    // },
    // {
    //     title: 'サービス',
    //     path: '/services',
    //     description: 'ERPの各機能一覧',
    // },
    {
        title: 'サインタ・ラボ',
        path: '/sainta-lab',
        description: 'webシステムの開発',
    },
    {
        title: 'サインタ・コア ',
        path: '/sainta-erp',
        description: 'ERPの各機能一覧',
    },
    {
        title: 'サインタ・コネクト',
        path: '/sainta-connect',
        description: '専門家マッチングプラットフォーム',
        subMenu: [
            {
                title: 'サインタ・コネクト',
                path: '/sainta-connect',
                description: '専門家マッチングプラットフォーム',
            },
        ],
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
        title: '採用情報',
        path: '/career',
        description: '採用情報',
    },
    {
        title: 'お問い合わせ',
        path: '/contact',
        description: '相談・無料トライアル申し込み',
    },
];
'use client';

import MVVCard from "./MVVCard";
import { useLanguage } from '@/contexts/LanguageContext';

export default function CompanyVision() {
    const { t } = useLanguage();
    
    return (
        <MVVCard
            title={t('mvv.vision.title')}
            titleEn={t('mvv.vision.titleEn')}
            subtitle={t('mvv.vision.subtitle')}
            subtitleEn={t('mvv.vision.subtitleEn')}
            description={t('mvv.vision.description')}
            setHeight={true}
        />
    );
}
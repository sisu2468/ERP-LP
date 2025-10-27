'use client';

import MVVCard from "./MVVCard";
import { useLanguage } from '@/contexts/LanguageContext';

export default function CompanyMission() {
    const { t } = useLanguage();
    
    return (
        <MVVCard
            title={t('mvv.mission.title')}
            titleKey="mvv.mission.title"
            titleEn={t('mvv.mission.titleEn')}
            subtitle={t('mvv.mission.subtitle')}
            subtitleKey="mvv.mission.subtitle"
            subtitleEn={t('mvv.mission.subtitleEn')}
            description={t('mvv.mission.description')}
        />
    );
}

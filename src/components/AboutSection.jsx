import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section className="container" style={{ padding: '60px 1.5rem', backgroundColor: 'var(--neutral-100)', borderRadius: '24px', margin: '40px auto' }}>
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h2 className="text-h2" style={{ marginBottom: '24px' }}>{t('about.title')}</h2>
        <p className="text-body-lg" style={{ color: 'var(--neutral-600)', marginBottom: '16px' }}>
          {t('about.desc1')}
        </p>
        <p className="text-body" style={{ color: 'var(--neutral-600)' }}>
          {t('about.desc2')}
        </p>
      </div>
    </section>
  );
}

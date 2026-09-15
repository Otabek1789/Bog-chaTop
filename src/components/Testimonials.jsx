import React from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Testimonials() {
  const { t } = useLanguage();

  const reviews = [
    { text: t('testimonials.t1'), name: t('testimonials.name1') },
    { text: t('testimonials.t2'), name: t('testimonials.name2') }
  ];

  return (
    <section style={{ backgroundColor: 'var(--surface-warm)', color: 'var(--neutral-900)', padding: '80px 0', marginTop: '40px', borderTop: '1px solid var(--neutral-200)' }}>
      <div className="container" style={{ padding: '0 1.5rem' }}>
        <h2 className="text-h2" style={{ textAlign: 'center', marginBottom: '48px', color: 'var(--neutral-900)' }}>
          {t('testimonials.title')}
        </h2>
        
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {reviews.map((r, i) => (
            <div key={i} style={{ flex: '1 1 400px', backgroundColor: 'var(--surface)', border: '1px solid var(--neutral-200)', padding: '32px', borderRadius: '16px' }}>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={20} fill="#FFC107" color="#FFC107" />)}
              </div>
              <p className="text-body-lg" style={{ fontStyle: 'italic', marginBottom: '24px', color: 'var(--neutral-700)' }}>
                "{r.text}"
              </p>
              <div style={{ fontWeight: 600, color: 'var(--neutral-900)' }}>{r.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

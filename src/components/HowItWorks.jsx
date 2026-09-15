import React from 'react';
import { Search, CheckCircle, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    { icon: <Search size={32} color="white" />, title: t('howItWorks.step1'), desc: t('howItWorks.step1Desc') },
    { icon: <CheckCircle size={32} color="white" />, title: t('howItWorks.step2'), desc: t('howItWorks.step2Desc') },
    { icon: <MessageCircle size={32} color="white" />, title: t('howItWorks.step3'), desc: t('howItWorks.step3Desc') }
  ];

  return (
    <section style={{ padding: '100px 0', background: 'var(--surface-warm)', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative blur elements for modern feel */}
      <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'var(--brand-500)', filter: 'blur(100px)', opacity: 0.1 }}></div>
      <div style={{ position: 'absolute', bottom: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'var(--accent-500)', filter: 'blur(100px)', opacity: 0.1 }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span className="badge badge-brand" style={{ marginBottom: '16px' }}>{t('howItWorks.badge')}</span>
          <h2 className="text-display" style={{ fontSize: '2.5rem', color: 'var(--neutral-900)' }}>{t('howItWorks.title')}</h2>
          <p className="text-body-lg" style={{ color: 'var(--neutral-500)', maxWidth: '600px', margin: '16px auto 0' }}>
            {t('howItWorks.subtitle')}
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', position: 'relative' }}>
          
          {steps.map((step, idx) => (
            <div key={idx} style={{ position: 'relative', padding: '48px 32px', backgroundColor: 'var(--surface)', border: '1px solid var(--neutral-200)', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', textAlign: 'center', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }} 
                 onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-12px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)'; }} 
                 onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.04)'; }}>
              
              {/* Step Number Badge */}
              <div style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', width: '44px', height: '44px', borderRadius: '50%', background: 'var(--brand-gradient)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.25rem', boxShadow: '0 8px 16px rgba(79, 70, 229, 0.3)' }}>
                {idx + 1}
              </div>

              {/* Icon Box */}
              <div style={{ width: '88px', height: '88px', background: 'var(--brand-gradient)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '16px auto 32px', transform: 'rotate(10deg)', transition: 'transform 0.3s ease' }}
                   onMouseOver={(e) => e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)'}
                   onMouseOut={(e) => e.currentTarget.style.transform = 'rotate(10deg) scale(1)'}>
                <div style={{ transform: 'rotate(-10deg)', transition: 'transform 0.3s ease' }}
                     onMouseOver={(e) => e.currentTarget.style.transform = 'rotate(0deg)'}
                     onMouseOut={(e) => e.currentTarget.style.transform = 'rotate(-10deg)'}>
                  {step.icon}
                </div>
              </div>
              
              <h3 className="text-h3" style={{ marginBottom: '16px', color: 'var(--neutral-900)', fontSize: '1.5rem' }}>{step.title}</h3>
              <p className="text-body-lg" style={{ color: 'var(--neutral-500)', lineHeight: '1.6' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

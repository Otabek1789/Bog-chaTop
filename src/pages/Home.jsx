import React, { useState } from 'react';
import Hero from '../components/Hero';
import KindergartenCard from '../components/KindergartenCard';
import { useKindergartens } from '../context/KindergartenContext';
import { useLanguage } from '../context/LanguageContext';
import AboutSection from '../components/AboutSection';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';

export default function Home() {
  const { data: kindergartens } = useKindergartens();
  const [filteredData, setFilteredData] = useState(null);
  const { t } = useLanguage();

  const displayData = filteredData !== null ? filteredData : kindergartens;

  const handleSearch = ({ searchTerm, district }) => {
    if (!searchTerm && !district) {
      setFilteredData(null);
      return;
    }
    let result = kindergartens;
    if (searchTerm) {
      result = result.filter(k => k.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (district) {
      result = result.filter(k => k.district === district);
    }
    setFilteredData(result);
  };

  return (
    <main>
      <Hero onSearch={handleSearch} />
      
      <AboutSection />
      <HowItWorks />

      <section className="container" style={{ padding: '40px 1.5rem 80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h2 className="text-h2">{t('home.topTitle')}</h2>
          <span style={{ color: 'var(--neutral-500)' }}>
            {t('home.totalResults').replace('{count}', displayData.length)}
          </span>
        </div>
        
        {displayData.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {displayData.slice(0, 6).map(kg => (
              <KindergartenCard key={kg.id} data={kg} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--neutral-500)' }}>
            <h3>{t('home.notFound')}</h3>
            <p>{t('home.tryOther')}</p>
          </div>
        )}
      </section>

      <Testimonials />
    </main>
  );
}

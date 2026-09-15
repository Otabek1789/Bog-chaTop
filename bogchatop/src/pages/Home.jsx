import React, { useState } from 'react';
import Hero from '../components/Hero';
import KindergartenCard from '../components/KindergartenCard';
import { kindergartens } from '../data/mockData';

export default function Home() {
  const [filteredData, setFilteredData] = useState(kindergartens);

  const handleSearch = ({ searchTerm, district }) => {
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
      
      <section className="container" style={{ padding: '40px 1.5rem 80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h2 className="text-h2">Top Bog'chalar</h2>
          <span style={{ color: 'var(--neutral-500)' }}>Jami {filteredData.length} ta natija</span>
        </div>
        
        {filteredData.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {filteredData.map(kg => (
              <KindergartenCard key={kg.id} data={kg} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--neutral-500)' }}>
            <h3>Hech narsa topilmadi...</h3>
            <p>Boshqa hudud yoki nom bilan qidirib ko'ring.</p>
          </div>
        )}
      </section>
    </main>
  );
}

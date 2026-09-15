import React from 'react';
import { Search, MapPin, ChevronDown, ArrowRight } from 'lucide-react';
import { districts } from '../data/mockData';
import './Hero.css';

export default function Hero({ onSearch }) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [district, setDistrict] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ searchTerm, district });
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-bg-glow"></div>
      <div className="container hero-container">
        <div className="hero-content animate-fade-in-up">
          <span className="location-badge">
            <span className="dot"></span> Toshkent · O'zbekiston
          </span>
          <h1 className="text-display hero-title">
            Farzandingiz uchun <span className="text-gradient italic">to'g'ri bog'cha</span>ni toping
          </h1>
          <p className="text-body-lg hero-subtitle">
            O'nlab xususiy bog'chalar. Narx, hudud va til bo'yicha taqqoslang — ortiqcha qo'ng'iroq va vaqt yo'qotmasdan.
          </p>
        </div>

        <form className="hero-search-box animate-fade-in-up delay-100" onSubmit={handleSubmit}>
          <div className="search-field search-input-field">
            <Search size={20} color="var(--neutral-500)" />
            <input 
              type="text" 
              placeholder="Bog'cha nomi..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="divider"></div>
          
          <div className="search-field select-field">
            <MapPin size={20} color="var(--neutral-500)" />
            <select value={district} onChange={(e) => setDistrict(e.target.value)}>
              {districts.map(d => <option key={d} value={d === 'Barcha hududlar' ? '' : d}>{d}</option>)}
            </select>
            <ChevronDown size={16} color="var(--neutral-400)" className="select-arrow" />
          </div>
          
          <button type="submit" className="search-submit">
            <ArrowRight size={20} />
          </button>
        </form>
        
        <div className="hero-stats animate-fade-in-up delay-200">
          <div className="stat-item">
            <strong>50+</strong> Bog'cha
          </div>
          <span className="dot-sep">·</span>
          <div className="stat-item">
            <strong>100%</strong> Bepul xizmat
          </div>
          <span className="dot-sep">·</span>
          <div className="stat-item">
            <strong>12</strong> Toshkent tumani
          </div>
        </div>
      </div>
    </section>
  );
}

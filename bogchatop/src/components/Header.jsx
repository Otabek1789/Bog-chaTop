import React from 'react';
import { Link } from 'react-router-dom';
import { Baby, Send } from 'lucide-react';
import './Header.css';

export default function Header() {
  return (
    <header className="header glass">
      <div className="container header-content">
        <Link to="/" className="logo-link">
          <div className="logo-icon">
            <Baby size={24} color="white" />
          </div>
          <span className="logo-text">Bog'cha<span className="text-gradient">Top</span></span>
        </Link>
        
        <nav className="nav-desktop">
          <Link to="/" className="nav-link">Bosh sahifa</Link>
          <Link to="/" className="nav-link">Bog'chalar</Link>
          <Link to="/" className="nav-link">Biz haqimizda</Link>
        </nav>
        
        <div className="header-actions">
          <div className="lang-switcher">
            <button className="lang-btn active">UZ</button>
            <button className="lang-btn">RU</button>
          </div>
          <a href="#" className="btn btn-primary cta-btn">
            <Send size={16} />
            <span>Bog'cha tanlash</span>
          </a>
        </div>
      </div>
    </header>
  );
}

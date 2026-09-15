import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { Baby } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <Link to="/" className="logo-link">
            <div className="logo-icon">
              <Baby size={24} color="white" />
            </div>
            <span className="logo-text">Bog'cha<span className="text-gradient">Top</span></span>
          </Link>
          <p className="footer-desc">
            {t('footer.desc')}
          </p>
        </div>
        
        <div className="footer-links">
          <h4>{t('footer.platform')}</h4>
          <Link to="/">{t('header.home')}</Link>
          <Link to="/kindergartens">{t('header.kindergartens')}</Link>
          <Link to="/kindergartens">{t('footer.mapSearch')}</Link>
        </div>
        
        <div className="footer-links">
          <h4>{t('footer.company')}</h4>
          <Link to="/">{t('footer.about')}</Link>
          <Link to="/contact">{t('header.contact')}</Link>
          <Link to="/">{t('footer.privacy')}</Link>
        </div>
        
        <div className="footer-links">
          <h4>{t('footer.partnership')}</h4>
          <Link to="/contact">{t('admin.addKg')}</Link>
          <Link to="/contact">{t('footer.advertise')}</Link>
        </div>
      </div>
      
      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} Bog'chaTop. {t('footer.rights')}</p>
      </div>
    </footer>
  );
}

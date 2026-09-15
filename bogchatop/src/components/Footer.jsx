import React from 'react';
import './Footer.css';
import { Baby } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="logo-link">
            <div className="logo-icon">
              <Baby size={24} color="white" />
            </div>
            <span className="logo-text">Bog'cha<span className="text-gradient">Top</span></span>
          </div>
          <p className="footer-desc">
            O'zbekistondagi xususiy bog'chalarni qidirish va taqqoslash platformasi. Farzandingiz uchun eng yaxshisini tanlang.
          </p>
        </div>
        
        <div className="footer-links">
          <h4>Platforma</h4>
          <a href="#">Bosh sahifa</a>
          <a href="#">Bog'chalar</a>
          <a href="#">Xaritadan qidirish</a>
        </div>
        
        <div className="footer-links">
          <h4>Kompaniya</h4>
          <a href="#">Biz haqimizda</a>
          <a href="#">Aloqa</a>
          <a href="#">Maxfiylik siyosati</a>
        </div>
        
        <div className="footer-links">
          <h4>Hamkorlik</h4>
          <a href="#">Bog'cha qo'shish</a>
          <a href="#">Reklama berish</a>
        </div>
      </div>
      
      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} Bog'chaTop. Barcha huquqlar himoyalangan.</p>
      </div>
    </footer>
  );
}

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { kindergartens } from '../data/mockData';
import { MapPin, Star, CheckCircle2, Phone, ArrowLeft, Users, Clock } from 'lucide-react';
import './Detail.css';

export default function Detail() {
  const { id } = useParams();
  const data = kindergartens.find(k => k.id === id);

  if (!data) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h2>Bog'cha topilmadi</h2>
        <Link to="/" className="btn btn-outline" style={{ marginTop: '20px' }}>Bosh sahifaga qaytish</Link>
      </div>
    );
  }

  return (
    <div className="detail-page animate-fade-in-up">
      <div className="detail-header-bg">
        <img src={data.image} alt={data.name} className="detail-hero-img" />
        <div className="overlay"></div>
        <div className="container header-content-wrapper">
          <Link to="/" className="back-btn">
            <ArrowLeft size={20} />
            <span>Orqaga</span>
          </Link>
          <div className="title-area">
            <span className="badge badge-brand" style={{ marginBottom: '16px' }}>Tasdiqlangan bog'cha</span>
            <h1 className="text-display" style={{ color: 'white', marginBottom: '16px' }}>{data.name}</h1>
            <div className="meta-info">
              <span className="meta-item">
                <MapPin size={18} /> {data.address}
              </span>
              <span className="meta-item">
                <Star size={18} color="var(--accent-500)" fill="var(--accent-500)" /> {data.rating} ({data.reviews} sharh)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container detail-content">
        <div className="main-col">
          <section className="detail-section card">
            <h2 className="text-h2">Bog'cha haqida</h2>
            <p className="text-body-lg" style={{ marginTop: '16px' }}>{data.description}</p>
            <p className="text-body-lg" style={{ marginTop: '16px' }}>
              Ushbu muassasa farzandingiz uchun xavfsiz va rivojlantiruvchi muhitni ta'minlaydi. 
              Malakali mutaxassislar bolalarning har tomonlama kamol topishi uchun maxsus dasturlar asosida ishlaydilar.
            </p>
          </section>

          <section className="detail-section card">
            <h2 className="text-h2">Afzalliklar & Qulayliklar</h2>
            <div className="features-grid">
              {data.features.map((feature, i) => (
                <div key={i} className="feature-item">
                  <CheckCircle2 size={20} color="var(--brand-600)" />
                  <span>{feature}</span>
                </div>
              ))}
              <div className="feature-item">
                <CheckCircle2 size={20} color="var(--brand-600)" />
                <span>24/7 Video kuzatuv</span>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={20} color="var(--brand-600)" />
                <span>Malakali psixolog</span>
              </div>
            </div>
          </section>
        </div>

        <div className="sidebar-col">
          <div className="card sticky-sidebar">
            <div className="price-box">
              <span className="price-label">Oylik to'lov:</span>
              <div className="price-value">{data.price}</div>
            </div>
            
            <div className="sidebar-info-list">
              <div className="sidebar-info-item">
                <div className="icon-box"><Users size={20} /></div>
                <div>
                  <strong>Ta'lim tillari</strong>
                  <div>{data.languages.join(", ")}</div>
                </div>
              </div>
              <div className="sidebar-info-item">
                <div className="icon-box"><Clock size={20} /></div>
                <div>
                  <strong>Ish vaqti</strong>
                  <div>Dush - Jum: 08:00 - 18:00</div>
                </div>
              </div>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', marginTop: '24px' }}>
              <Phone size={18} />
              Bog'lanish
            </button>
            <button className="btn btn-outline" style={{ width: '100%', marginTop: '12px' }}>
              Ekskursiya yozilish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

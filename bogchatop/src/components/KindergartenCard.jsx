import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Users, CheckCircle2 } from 'lucide-react';
import './KindergartenCard.css';

export default function KindergartenCard({ data }) {
  return (
    <Link to={`/bogcha/${data.id}`} className="card kg-card animate-fade-in-up">
      <div className="kg-card-img-wrapper">
        <img src={data.image} alt={data.name} className="kg-card-img" />
        <div className="kg-card-badge">Tasdiqlangan</div>
      </div>
      
      <div className="kg-card-content">
        <div className="kg-card-header">
          <h3 className="text-h3">{data.name}</h3>
          <div className="kg-rating">
            <Star size={16} fill="var(--accent-500)" color="var(--accent-500)" />
            <span className="rating-val">{data.rating}</span>
            <span className="rating-count">({data.reviews})</span>
          </div>
        </div>
        
        <div className="kg-info-row">
          <MapPin size={16} color="var(--neutral-500)" />
          <span>{data.address}</span>
        </div>
        
        <div className="kg-features">
          {data.features.slice(0, 3).map((feature, i) => (
            <span key={i} className="feature-tag">
              <CheckCircle2 size={12} color="var(--brand-500)" />
              {feature}
            </span>
          ))}
        </div>
        
        <div className="kg-card-footer">
          <div className="kg-price">
            <span className="price-val">{data.price}</span>
          </div>
          <div className="kg-languages">
            <Users size={16} color="var(--neutral-500)" />
            <span>{data.languages.join(", ")}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

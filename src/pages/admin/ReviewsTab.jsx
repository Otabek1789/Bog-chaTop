import React from 'react';
import { useKindergartens } from '../../context/KindergartenContext';
import { Star, Trash2 } from 'lucide-react';

export default function ReviewsTab() {
  const { reviews, data, deleteReview } = useKindergartens();

  // Convert reviews object { kgId: [reviews...] } to a flat array
  const allReviews = Object.entries(reviews).flatMap(([kgId, revs]) => 
    revs.map(rev => {
      const kg = data.find(k => k.id === kgId);
      return { ...rev, kindergartenName: kg ? kg.name : 'Noma\'lum bog\'cha', kgId };
    })
  ).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="animate-fade-in-up">
      <div style={{ marginBottom: '24px' }}>
        <h2 className="text-h2">Kelib tushgan Izohlar</h2>
        <p style={{ color: 'var(--neutral-500)' }}>Ota-onalardan kelgan barcha shikoyat va takliflar faqat sizga ko'rinadi.</p>
      </div>

      <div className="card card-static" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: 'var(--neutral-50)' }}>
            <tr>
              <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid var(--neutral-200)' }}>Sana</th>
              <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid var(--neutral-200)' }}>Bog'cha</th>
              <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid var(--neutral-200)' }}>Ism</th>
              <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid var(--neutral-200)' }}>Baho</th>
              <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid var(--neutral-200)' }}>Fikr/Shikoyat</th>
              <th style={{ padding: '16px', textAlign: 'right', borderBottom: '1px solid var(--neutral-200)' }}>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {allReviews.map(rev => (
              <tr key={rev.id}>
                <td style={{ padding: '16px', borderBottom: '1px solid var(--neutral-100)' }}>
                  {new Date(rev.date).toLocaleDateString()}
                </td>
                <td style={{ padding: '16px', borderBottom: '1px solid var(--neutral-100)' }}>{rev.kindergartenName}</td>
                <td style={{ padding: '16px', borderBottom: '1px solid var(--neutral-100)' }}>{rev.name}</td>
                <td style={{ padding: '16px', borderBottom: '1px solid var(--neutral-100)' }}>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < rev.rating ? "var(--accent-500)" : "transparent"} color={i < rev.rating ? "var(--accent-500)" : "var(--neutral-300)"} />
                    ))}
                  </div>
                </td>
                <td style={{ padding: '16px', borderBottom: '1px solid var(--neutral-100)', maxWidth: '400px' }}>
                  {rev.comment}
                </td>
                <td style={{ padding: '16px', borderBottom: '1px solid var(--neutral-100)', textAlign: 'right' }}>
                  <button 
                    onClick={() => {
                      if(window.confirm('Haqiqatan ham bu izohni o\'chirib tashlamoqchimisiz?')) {
                        deleteReview(rev.kgId, rev.id);
                      }
                    }} 
                    style={{ background: 'transparent', color: 'var(--danger-500)', border: '1px solid var(--danger-500)', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    title="O'chirish"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
            {allReviews.length === 0 && (
              <tr>
                <td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: 'var(--neutral-500)' }}>
                  Hozircha hech qanday fikr yoki shikoyat kelib tushmagan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

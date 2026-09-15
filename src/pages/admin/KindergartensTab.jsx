import React, { useState } from 'react';
import { useKindergartens } from '../../context/KindergartenContext';
import { Plus, Trash2 } from 'lucide-react';

export default function KindergartensTab() {
  const { data, addKindergarten, deleteKindergarten } = useKindergartens();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newKg, setNewKg] = useState({
    name: '', district: '', price: '', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80',
    address: { uz: '', ru: '' }, description: { uz: '', ru: '' },
    features: { uz: [], ru: [] }, languages: { uz: ['O\'zbek'], ru: ['O\'zbek'] },
    phone: '', rating: 5, reviews: 0
  });

  const handleAdd = (e) => {
    e.preventDefault();
    addKindergarten({ ...newKg, price: { uz: newKg.price, ru: newKg.price } });
    setShowAddForm(false);
  };

  return (
    <div className="animate-fade-in-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 className="text-h2">Platformadagi Bog'chalar</h2>
        <button onClick={() => setShowAddForm(!showAddForm)} className="btn btn-primary" style={{ display: 'flex', gap: '8px' }}>
          <Plus size={18} /> Yangi qo'shish
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAdd} className="card" style={{ marginBottom: '24px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 className="text-h3">Yangi bog'cha qo'shish</h3>
          <div style={{ display: 'flex', gap: '16px' }}>
            <input required placeholder="Bog'cha nomi" value={newKg.name} onChange={e => setNewKg({...newKg, name: e.target.value})} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: 'var(--surface)', color: 'var(--neutral-900)' }} />
            <input required placeholder="Tuman" value={newKg.district} onChange={e => setNewKg({...newKg, district: e.target.value})} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: 'var(--surface)', color: 'var(--neutral-900)' }} />
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <input required placeholder="Manzil (O'zbek)" value={newKg.address.uz} onChange={e => setNewKg({...newKg, address: { ...newKg.address, uz: e.target.value, ru: e.target.value }})} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: 'var(--surface)', color: 'var(--neutral-900)' }} />
            <input required placeholder="Oylik to'lov" value={newKg.price} onChange={e => setNewKg({...newKg, price: e.target.value})} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: 'var(--surface)', color: 'var(--neutral-900)' }} />
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button type="button" onClick={() => setShowAddForm(false)} className="btn btn-outline">Bekor qilish</button>
            <button type="submit" className="btn btn-primary">Saqlash</button>
          </div>
        </form>
      )}

      <div className="card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: 'var(--neutral-50)' }}>
            <tr>
              <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid var(--neutral-200)' }}>Nomi</th>
              <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid var(--neutral-200)' }}>Tuman</th>
              <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid var(--neutral-200)' }}>Narxi</th>
              <th style={{ padding: '16px', textAlign: 'right', borderBottom: '1px solid var(--neutral-200)' }}>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {data.map(kg => (
              <tr key={kg.id}>
                <td style={{ padding: '16px', borderBottom: '1px solid var(--neutral-100)' }}>{kg.name}</td>
                <td style={{ padding: '16px', borderBottom: '1px solid var(--neutral-100)' }}>{kg.district}</td>
                <td style={{ padding: '16px', borderBottom: '1px solid var(--neutral-100)' }}>{kg.price?.uz || kg.price}</td>
                <td style={{ padding: '16px', borderBottom: '1px solid var(--neutral-100)', textAlign: 'right' }}>
                  <button onClick={() => deleteKindergarten(kg.id)} style={{ color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

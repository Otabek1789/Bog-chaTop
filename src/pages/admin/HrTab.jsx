import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { UserPlus, Briefcase, Award, Edit2, Trash2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function HrTab() {
  const { t } = useLanguage();
  
  const [showModal, setShowModal] = useState(false);
  const [staffList, setStaffList] = useState([
    { id: 1, name: "Nigmatova Dilnoza", role: "Katta tarbiyachi", exp: "5 yil", phone: "+998 90 999 88 77" },
    { id: 2, name: "Rahmonov Sanjar", role: "Ingliz tili o'qituvchisi", exp: "3 yil", phone: "+998 93 111 22 33" },
    { id: 3, name: "Olimova Saida", role: "Oshpaz", exp: "10 yil", phone: "+998 99 444 55 66" },
    { id: 4, name: "Abdullayeva Malika", role: "Tarbiyachi yordamchisi", exp: "2 yil", phone: "+998 97 222 33 44" },
    { id: 5, name: "Tursunov Bekzod", role: "Musiqa o'qituvchisi", exp: "7 yil", phone: "+998 90 333 44 55" },
    { id: 6, name: "Karimova Shahnoza", role: "Tarbiyachi", exp: "4 yil", phone: "+998 94 444 55 66" },
    { id: 7, name: "Ibragimov Jasur", role: "Sport murabbiyi", exp: "6 yil", phone: "+998 99 555 66 77" },
    { id: 8, name: "Xalilova Nodira", role: "Hamshira", exp: "12 yil", phone: "+998 93 666 77 88" },
    { id: 9, name: "Qodirov Anvar", role: "Qorovul", exp: "15 yil", phone: "+998 97 777 88 99" },
    { id: 10, name: "Yusupova Madina", role: "Rus tili o'qituvchisi", exp: "8 yil", phone: "+998 90 888 99 00" },
    { id: 11, name: "Aliyeva Guli", role: "Logoped", exp: "9 yil", phone: "+998 94 999 00 11" },
    { id: 12, name: "Sobirov Rustam", role: "Psixolog", exp: "5 yil", phone: "+998 99 123 45 67" },
    { id: 13, name: "Nurmatova Zebo", role: "Farrosh", exp: "3 yil", phone: "+998 93 234 56 78" },
    { id: 14, name: "Ergashev Doston", role: "Haydovchi", exp: "11 yil", phone: "+998 97 345 67 89" },
    { id: 15, name: "Usmonova Nilufar", role: "Bosh oshpaz", exp: "14 yil", phone: "+998 90 456 78 90" },
    { id: 16, name: "Mamatov Sherzod", role: "Xo'jalik mudiri", exp: "8 yil", phone: "+998 94 567 89 01" },
    { id: 17, name: "Oripova Sevara", role: "Gimnastika murabbiyi", exp: "4 yil", phone: "+998 99 678 90 12" },
    { id: 18, name: "Hasanov Akmal", role: "Bog'bon", exp: "20 yil", phone: "+998 93 789 01 23" },
    { id: 19, name: "Rasulova Iroda", role: "Tarbiyachi", exp: "6 yil", phone: "+998 97 890 12 34" },
    { id: 20, name: "Nematov Alisher", role: "Santexnik", exp: "10 yil", phone: "+998 90 901 23 45" }
  ]);

  const [formData, setFormData] = useState({ name: '', role: '', exp: '', phone: '' });
  const [editingId, setEditingId] = useState(null);

  const handleSave = () => {
    if (editingId) {
      setStaffList(staffList.map(s => s.id === editingId ? { ...formData, id: editingId } : s));
    } else {
      setStaffList([{ ...formData, id: Date.now() }, ...staffList]);
    }
    closeModal();
  };

  const openEdit = (staff) => {
    setFormData(staff);
    setEditingId(staff.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if(window.confirm("Haqiqatan ham o'chirmoqchimisiz?")) {
      setStaffList(staffList.filter(s => s.id !== id));
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ name: '', role: '', exp: '', phone: '' });
    setEditingId(null);
  };

  return (
    <div className="animate-fade-in-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2 className="text-h2" style={{ color: 'var(--neutral-900)' }}>{t('crm.hrTitle')}</h2>
        <button onClick={() => setShowModal(true)} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UserPlus size={18} />{t('crm.newStaff')}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {staffList.map(staff => (
          <div key={staff.id} style={{ background: 'var(--surface-warm)', borderRadius: '16px', border: '1px solid var(--neutral-200)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--primary-100)', color: 'var(--primary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold', flexShrink: 0 }}>
                {staff.name.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '18px', color: 'var(--neutral-900)', paddingRight: '40px' }}>{staff.name}</div>
                <div style={{ color: 'var(--brand-600)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                  <Briefcase size={14} /> {staff.role}
                </div>
              </div>
              <div style={{ position: 'absolute', top: 0, right: 0, display: 'flex', gap: '8px' }}>
                <button onClick={() => openEdit(staff)} style={{ background: 'transparent', border: 'none', color: 'var(--brand-500)', cursor: 'pointer', padding: '4px' }}><Edit2 size={16} /></button>
                <button onClick={() => handleDelete(staff.id)} style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '4px' }}><Trash2 size={16} /></button>
              </div>
            </div>
            
            <div style={{ background: 'var(--neutral-50)', padding: '16px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '8px', border: '1px solid var(--neutral-100)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: 'var(--neutral-500)' }}>{t('crm.exp')}</span>
                <span style={{ fontWeight: 500, color: 'var(--neutral-900)', display: 'flex', alignItems: 'center', gap: '4px' }}><Award size={14} color="#F59E0B" /> {staff.exp}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: 'var(--neutral-500)' }}>Telefon:</span>
                <span style={{ fontWeight: 500, color: 'var(--neutral-900)' }}>{staff.phone}</span>
              </div>
            </div>
            
            <button style={{ width: '100%', padding: '10px', background: 'transparent', border: '1px solid var(--neutral-300)', borderRadius: '8px', color: 'var(--neutral-700)', fontWeight: 500, cursor: 'pointer' }}>{t('crm.viewProfile')}</button>
          </div>
        ))}
      </div>

      {showModal && createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
          <div style={{ background: 'var(--surface-warm)', padding: '32px', borderRadius: '16px', width: '400px', animation: 'fadeInUp 0.2s ease', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px', color: 'var(--neutral-900)' }}>{editingId ? t('crm.editStaff') : t('crm.newStaff')}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Ism Familiya" style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: 'transparent', color: 'var(--neutral-900)', outline: 'none' }} />
              <input type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} placeholder="Lavozimi (masalan: O'qituvchi)" style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: 'transparent', color: 'var(--neutral-900)', outline: 'none' }} />
              <input type="text" value={formData.exp} onChange={e => setFormData({...formData, exp: e.target.value})} placeholder="Tajribasi (masalan: 3 yil)" style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: 'transparent', color: 'var(--neutral-900)', outline: 'none' }} />
              <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="Telefon raqam" style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--neutral-300)', background: 'transparent', color: 'var(--neutral-900)', outline: 'none' }} />
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px' }}>
                <button onClick={closeModal} className="btn btn-outline">{t('crm.cancel')}</button>
                <button onClick={handleSave} className="btn btn-primary">{t('crm.save')}</button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

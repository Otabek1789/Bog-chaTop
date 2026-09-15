import React, { useState } from 'react';
import { Clock, Utensils, BookOpen, Music, Edit2, Save } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const daysOfWeek = ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];

export default function ScheduleTab() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' or 'classes'
  const [activeDay, setActiveDay] = useState('Dushanba');
  const [isEditing, setIsEditing] = useState(false);

  // Initialize 6-day data
  const [scheduleData, setScheduleData] = useState(() => {
    return {
      'Dushanba': {
        menu: [
          { id: 1, time: "08:30 - Nonushta", desc: "Suli bo'tqasi, sariyog'li non, shirin choy, olma." },
          { id: 2, time: "12:30 - Tushlik", desc: "Mastava, dimlama (go'sht va sabzavotlar), meva sharbati, non." },
          { id: 3, time: "16:00 - Ikkinchi tushlik", desc: "Bichak, qatiq." }
        ],
        classes: [
          { id: 1, name: "Ingliz tili", time: "09:30 - 10:15", icon: "book", color: "#4F46E5", bg: "#E0E7FF" },
          { id: 2, name: "Musiqa va raqs", time: "10:30 - 11:15", icon: "music", color: "#DB2777", bg: "#FCE7F3" }
        ]
      },
      'Seshanba': {
        menu: [
          { id: 1, time: "08:30 - Nonushta", desc: "Tuxum quymoq (omlet), pishloq, kakao, banan." },
          { id: 2, time: "12:30 - Tushlik", desc: "Karam sho'rva, qozon kabob, kompot." },
          { id: 3, time: "16:00 - Ikkinchi tushlik", desc: "Pirojki, olma sharbati." }
        ],
        classes: [
          { id: 1, name: "Matematika", time: "09:30 - 10:15", icon: "book", color: "#059669", bg: "#D1FAE5" },
          { id: 2, name: "Gimnastika", time: "10:30 - 11:15", icon: "music", color: "#EA580C", bg: "#FFEDD5" }
        ]
      },
      'Chorshanba': {
        menu: [
          { id: 1, time: "08:30 - Nonushta", desc: "Guruch bo'tqasi, qaynatilgan tuxum, sutli choy." },
          { id: 2, time: "12:30 - Tushlik", desc: "Noxat sho'rva, tovuq go'shtli palov, bodring salati." },
          { id: 3, time: "16:00 - Ikkinchi tushlik", desc: "Keks, sut." }
        ],
        classes: [
          { id: 1, name: "Rasm chizish", time: "09:30 - 10:15", icon: "book", color: "#D97706", bg: "#FEF3C7" },
          { id: 2, name: "Mantiqiy o'yinlar", time: "10:30 - 11:15", icon: "music", color: "#7C3AED", bg: "#EDE9FE" }
        ]
      },
      'Payshanba': {
        menu: [
          { id: 1, time: "08:30 - Nonushta", desc: "Shirguruch, sariyog'li non, nok." },
          { id: 2, time: "12:30 - Tushlik", desc: "Moshxo'rda, qovurilgan baliq, pomidor salat." },
          { id: 3, time: "16:00 - Ikkinchi tushlik", desc: "Biskvit, meva sharbati." }
        ],
        classes: [
          { id: 1, name: "Ingliz tili", time: "09:30 - 10:15", icon: "book", color: "#4F46E5", bg: "#E0E7FF" },
          { id: 2, name: "Sport", time: "10:30 - 11:15", icon: "music", color: "#2563EB", bg: "#DBEAFE" }
        ]
      },
      'Juma': {
        menu: [
          { id: 1, time: "08:30 - Nonushta", desc: "Manniy bo'tqasi, pishloq, choy." },
          { id: 2, time: "12:30 - Tushlik", desc: "Ugra sho'rva, somsa, mevali kompot." },
          { id: 3, time: "16:00 - Ikkinchi tushlik", desc: "Pechenye, yogurt." }
        ],
        classes: [
          { id: 1, name: "Atrof-muhit", time: "09:30 - 10:15", icon: "book", color: "#16A34A", bg: "#DCFCE7" },
          { id: 2, name: "Musiqa", time: "10:30 - 11:15", icon: "music", color: "#DB2777", bg: "#FCE7F3" }
        ]
      },
      'Shanba': {
        menu: [
          { id: 1, time: "08:30 - Nonushta", desc: "Qaynatilgan sosiska, pishloq, choy, banan." },
          { id: 2, time: "12:30 - Tushlik", desc: "Qo'ziqorinli sho'rva, tovuq tabaka, salat." },
          { id: 3, time: "16:00 - Ikkinchi tushlik", desc: "Qatiq, keks." }
        ],
        classes: [
          { id: 1, name: "Ertak o'qish", time: "09:30 - 10:15", icon: "book", color: "#9333EA", bg: "#F3E8FF" },
          { id: 2, name: "Raqs", time: "10:30 - 11:15", icon: "music", color: "#E11D48", bg: "#FFE4E6" }
        ]
      }
    };
  });

  const handleMenuChange = (id, field, value) => {
    setScheduleData(prev => ({
      ...prev,
      [activeDay]: {
        ...prev[activeDay],
        menu: prev[activeDay].menu.map(item => item.id === id ? { ...item, [field]: value } : item)
      }
    }));
  };

  const handleClassChange = (id, field, value) => {
    setScheduleData(prev => ({
      ...prev,
      [activeDay]: {
        ...prev[activeDay],
        classes: prev[activeDay].classes.map(item => item.id === id ? { ...item, [field]: value } : item)
      }
    }));
  };

  const currentMenu = scheduleData[activeDay].menu;
  const currentClasses = scheduleData[activeDay].classes;

  return (
    <div className="animate-fade-in-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 className="text-h2" style={{ color: 'var(--neutral-900)' }}>{t('crm.schedule')}</h2>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--neutral-100)', padding: '4px', borderRadius: '8px' }}>
          <button 
            onClick={() => setActiveTab('menu')}
            style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: activeTab === 'menu' ? 'var(--surface-warm)' : 'transparent', color: activeTab === 'menu' ? 'var(--neutral-900)' : 'var(--neutral-500)', fontWeight: 500, cursor: 'pointer', boxShadow: activeTab === 'menu' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Utensils size={16} />{t('crm.menu')}
          </button>
          <button 
            onClick={() => setActiveTab('classes')}
            style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: activeTab === 'classes' ? 'var(--surface-warm)' : 'transparent', color: activeTab === 'classes' ? 'var(--neutral-900)' : 'var(--neutral-500)', fontWeight: 500, cursor: 'pointer', boxShadow: activeTab === 'classes' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <BookOpen size={16} />{t('crm.classes')}
          </button>
        </div>

        <button onClick={() => setIsEditing(!isEditing)} className={isEditing ? "btn btn-primary" : "btn btn-outline"} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isEditing ? <><Save size={18} /> {t('crm.save')}</> : <><Edit2 size={18} /> {t('crm.edit')}</>}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '8px' }}>
        {daysOfWeek.map(day => (
          <button 
            key={day}
            onClick={() => setActiveDay(day)}
            style={{ 
              padding: '10px 20px', 
              borderRadius: '8px', 
              border: activeDay === day ? '1px solid var(--brand-500)' : '1px solid var(--neutral-200)',
              background: activeDay === day ? 'var(--brand-50)' : 'var(--surface-warm)',
              color: activeDay === day ? 'var(--brand-700)' : 'var(--neutral-600)',
              fontWeight: activeDay === day ? 600 : 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}
          >
            {day}
          </button>
        ))}
      </div>

      <div style={{ background: 'var(--surface-warm)', borderRadius: '16px', border: '1px solid var(--neutral-200)', padding: '24px' }}>
        {activeTab === 'menu' ? (
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--neutral-900)', marginBottom: '24px' }}>{t('crm.menuTitle')} ({activeDay})</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              {currentMenu.map(item => (
                <div key={item.id} style={{ padding: '20px', background: 'var(--neutral-50)', borderRadius: '12px', border: '1px solid var(--neutral-200)' }}>
                  <div style={{ color: 'var(--brand-600)', fontWeight: 600, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={16} /> 
                    {isEditing ? <input value={item.time} onChange={e => handleMenuChange(item.id, 'time', e.target.value)} style={{ border: '1px solid var(--neutral-300)', padding: '4px', borderRadius: '4px', width: '200px', background: 'var(--surface-warm)', color: 'var(--neutral-900)' }} /> : item.time}
                  </div>
                  <div style={{ color: 'var(--neutral-900)' }}>
                    {isEditing ? <input value={item.desc} onChange={e => handleMenuChange(item.id, 'desc', e.target.value)} style={{ border: '1px solid var(--neutral-300)', padding: '4px', borderRadius: '4px', width: '100%', background: 'var(--surface-warm)', color: 'var(--neutral-900)' }} /> : item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--neutral-900)', marginBottom: '24px' }}>{t('crm.classesTitle')} ({activeDay})</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              {currentClasses.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'var(--neutral-50)', borderRadius: '12px', border: '1px solid var(--neutral-200)' }}>
                  <div style={{ background: item.bg, color: item.color, padding: '12px', borderRadius: '12px' }}>
                    {item.icon === 'book' ? <BookOpen size={24} /> : <Music size={24} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: 'var(--neutral-900)', marginBottom: '4px' }}>
                      {isEditing ? <input value={item.name} onChange={e => handleClassChange(item.id, 'name', e.target.value)} style={{ border: '1px solid var(--neutral-300)', padding: '4px', borderRadius: '4px', width: '200px', background: 'var(--surface-warm)', color: 'var(--neutral-900)' }} /> : item.name}
                    </div>
                    <div style={{ color: 'var(--neutral-500)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={14} /> 
                      {isEditing ? <input value={item.time} onChange={e => handleClassChange(item.id, 'time', e.target.value)} style={{ border: '1px solid var(--neutral-300)', padding: '4px', borderRadius: '4px', width: '150px', background: 'var(--surface-warm)', color: 'var(--neutral-900)' }} /> : item.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

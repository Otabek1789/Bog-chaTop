import React from 'react';
import { useKindergartens } from '../../context/KindergartenContext';
import { Check, X, Trash2 } from 'lucide-react';

export default function ApplicationsTab() {
  const { applications, updateApplicationStatus, deleteApplication } = useKindergartens();

  return (
    <div className="animate-fade-in-up">
      <div style={{ marginBottom: '24px' }}>
        <h2 className="text-h2">Kelib tushgan Arizalar</h2>
        <p style={{ color: 'var(--neutral-500)' }}>Ota-onalardan kelgan barcha arizalar shu yerda ko'rinadi.</p>
      </div>

      <div className="card card-static" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: 'var(--neutral-50)' }}>
            <tr>
              <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid var(--neutral-200)' }}>Sana</th>
              <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid var(--neutral-200)' }}>Ota-ona</th>
              <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid var(--neutral-200)' }}>Telefon</th>
              <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid var(--neutral-200)' }}>Farzandi</th>
              <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid var(--neutral-200)' }}>Bog'cha</th>
              <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid var(--neutral-200)' }}>Status</th>
              <th style={{ padding: '16px', textAlign: 'right', borderBottom: '1px solid var(--neutral-200)' }}>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app.id}>
                <td style={{ padding: '16px', borderBottom: '1px solid var(--neutral-100)' }}>
                  {new Date(app.date).toLocaleDateString()}
                </td>
                <td style={{ padding: '16px', borderBottom: '1px solid var(--neutral-100)' }}>{app.parentName}</td>
                <td style={{ padding: '16px', borderBottom: '1px solid var(--neutral-100)' }}>{app.phone}</td>
                <td style={{ padding: '16px', borderBottom: '1px solid var(--neutral-100)' }}>{app.childName} ({app.childAge} yosh)</td>
                <td style={{ padding: '16px', borderBottom: '1px solid var(--neutral-100)' }}>{app.kindergartenName}</td>
                <td style={{ padding: '16px', borderBottom: '1px solid var(--neutral-100)' }}>
                  <span style={{ 
                    padding: '4px 8px', borderRadius: '99px', fontSize: '12px', fontWeight: 'bold',
                    background: app.status === 'pending' ? 'var(--warning-100)' : app.status === 'approved' ? 'var(--success-100)' : 'var(--danger-100)',
                    color: app.status === 'pending' ? 'var(--warning-700)' : app.status === 'approved' ? 'var(--success-700)' : 'var(--danger-700)'
                  }}>
                    {app.status === 'pending' ? 'Kutilmoqda' : app.status === 'approved' ? 'Qabul qilindi' : 'Rad etildi'}
                  </span>
                </td>
                <td style={{ padding: '16px', borderBottom: '1px solid var(--neutral-100)', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    {app.status === 'pending' && (
                      <>
                        <button onClick={() => updateApplicationStatus(app.id, 'approved')} style={{ background: 'var(--success-500)', color: 'white', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Check size={14} /> Qabul qilish
                        </button>
                        <button onClick={() => updateApplicationStatus(app.id, 'rejected')} style={{ background: 'var(--danger-500)', color: 'white', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <X size={14} /> Rad etish
                        </button>
                      </>
                    )}
                    <button 
                      onClick={() => {
                        if(window.confirm('Haqiqatan ham bu arizani o\'chirib tashlamoqchimisiz?')) {
                          deleteApplication(app.id);
                        }
                      }} 
                      style={{ background: 'transparent', color: 'var(--danger-500)', border: '1px solid var(--danger-500)', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                      title="O'chirish"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {applications.length === 0 && (
              <tr>
                <td colSpan="7" style={{ padding: '32px', textAlign: 'center', color: 'var(--neutral-500)' }}>
                  Hozircha hech qanday ariza kelib tushmagan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, KeyRound, User, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function Register() {
  const { sendOTP, verifyOTP } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Iltimos, barcha maydonlarni to'ldiring");
      return;
    }
    
    setError('');
    setLoading(true);
    
    const result = await sendOTP(email);
    if (result.success) {
      setMessage(result.message);
      setStep(2);
    } else {
      setError(result.error || "Xatolik yuz berdi");
    }
    setLoading(false);
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!code) {
      setError("Iltimos, kodni kiriting");
      return;
    }
    setError('');
    setMessage('');
    setLoading(true);

    const result = await verifyOTP(email, code);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', overflow: 'hidden' }}>
      
      {/* Animated Blobs Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
        <div className="animate-blob" style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw', borderRadius: '50%', background: 'var(--brand-500)', filter: 'blur(100px)', opacity: 0.15 }}></div>
        <div className="animate-blob animation-delay-2000" style={{ position: 'absolute', top: '40%', right: '-10%', width: '40vw', height: '40vw', borderRadius: '50%', background: '#ec4899', filter: 'blur(100px)', opacity: 0.15 }}></div>
        <div className="animate-blob animation-delay-4000" style={{ position: 'absolute', bottom: '-20%', left: '20%', width: '60vw', height: '60vw', borderRadius: '50%', background: '#8b5cf6', filter: 'blur(100px)', opacity: 0.15 }}></div>
      </div>

      <div className="glass" style={{ position: 'relative', zIndex: 1, padding: '48px', borderRadius: '32px', width: '100%', maxWidth: '480px', margin: '20px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', border: '1px solid var(--card-border)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 className="text-display" style={{ fontSize: '2.5rem', marginBottom: '8px', color: 'var(--neutral-900)' }}>
            Ro'yxatdan o'tish
          </h2>
          <p className="text-body-lg" style={{ color: 'var(--neutral-500)' }}>
            {step === 1 ? "Yangi akkaunt yaratish uchun ma'lumotlarni kiriting" : "Tasdiqlash kodini kiriting"}
          </p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', padding: '16px', borderRadius: '16px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <AlertCircle size={20} style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '14px', fontWeight: 500 }}>{error}</span>
          </div>
        )}
        
        {message && (
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '16px', borderRadius: '16px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <AlertCircle size={20} style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '14px', fontWeight: 500 }}>{message}</span>
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleRegister}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--neutral-400)' }}>
                <User size={20} />
              </div>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ismingiz"
                style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '16px', border: '1px solid var(--neutral-200)', background: 'var(--surface)', color: 'var(--neutral-900)', fontSize: '16px', outline: 'none', transition: 'all 0.2s' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--brand-500)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--neutral-200)'}
              />
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--neutral-400)' }}>
                <Mail size={20} />
              </div>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Elektron pochta"
                style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '16px', border: '1px solid var(--neutral-200)', background: 'var(--surface)', color: 'var(--neutral-900)', fontSize: '16px', outline: 'none', transition: 'all 0.2s' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--brand-500)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--neutral-200)'}
              />
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--neutral-400)' }}>
                <KeyRound size={20} />
              </div>
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parol"
                style={{ width: '100%', padding: '16px 48px 16px 48px', borderRadius: '16px', border: '1px solid var(--neutral-200)', background: 'var(--surface)', color: 'var(--neutral-900)', fontSize: '16px', outline: 'none', transition: 'all 0.2s' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--brand-500)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--neutral-200)'}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--neutral-400)' }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{ width: '100%', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', background: 'var(--brand-gradient)', color: 'white', border: 'none', borderRadius: '16px', fontSize: '16px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s', marginTop: '8px', boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)' }}
            >
              {loading ? 'Kutib turing...' : 'Davom etish'}
              {!loading && <ArrowRight size={20} />}
            </button>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <span style={{ color: 'var(--neutral-500)', fontSize: '15px' }}>
              Akkauntingiz bormi?{' '}
            </span>
            <Link to="/login" style={{ color: 'var(--brand-600)', fontWeight: 600, textDecoration: 'none' }}>
              Tizimga kiring
            </Link>
          </div>
        </form>
        ) : (
          <form onSubmit={handleVerifyCode}>
            <div style={{ marginBottom: '32px', textAlign: 'center' }}>
              <input 
                type="text" 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="123456"
                style={{ width: '100%', padding: '16px', borderRadius: '16px', border: '2px solid var(--brand-500)', fontSize: '24px', letterSpacing: '8px', textAlign: 'center', outline: 'none', background: 'var(--surface)', color: 'var(--neutral-900)', fontWeight: 700 }}
                autoFocus
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              style={{ width: '100%', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', background: 'var(--brand-gradient)', color: 'white', border: 'none', borderRadius: '16px', fontSize: '16px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s', boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)' }}
            >
              {loading ? 'Tekshirilmoqda...' : 'Tizimga kirish'}
            </button>
            <button 
              type="button"
              onClick={() => setStep(1)}
              style={{ width: '100%', background: 'none', border: 'none', color: 'var(--neutral-500)', fontWeight: 500, marginTop: '24px', cursor: 'pointer', fontSize: '15px' }}
            >
              ← Ortga qaytish
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

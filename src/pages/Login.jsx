import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, KeyRound, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const { sendOTP, verifyOTP, mockLogin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleStep, setGoogleStep] = useState(1);
  const [googleEmail, setGoogleEmail] = useState('');
  const [googlePassword, setGooglePassword] = useState('');
  const [googleError, setGoogleError] = useState('');

  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Iltimos, elektron pochta va parolni to'liq kiriting");
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
      navigate('/admin');
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
            Xush kelibsiz
          </h2>
          <p className="text-body-lg" style={{ color: 'var(--neutral-500)' }}>
            {step === 1 ? "Akkauntingizga kiring yoki ro'yxatdan o'ting" : "Tasdiqlash kodini kiriting"}
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
          <form onSubmit={handleSendCode}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--neutral-400)' }}>
                  <Mail size={20} />
                </div>
                <input 
                  type="email" 
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

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--neutral-600)', fontSize: '14px' }}>
                  <input type="checkbox" style={{ accentColor: 'var(--brand-500)', width: '16px', height: '16px' }} />
                  Meni eslab qolish
                </label>
                <a href="#" style={{ color: 'var(--brand-600)', fontSize: '14px', fontWeight: 500 }}>Parolni unutdingizmi?</a>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                style={{ width: '100%', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', background: 'var(--brand-gradient)', color: 'white', border: 'none', borderRadius: '16px', fontSize: '16px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s', marginTop: '8px', boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)' }}
              >
                {loading ? 'Kutib turing...' : 'Tizimga kirish'}
                {!loading && <ArrowRight size={20} />}
              </button>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', margin: '32px 0' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--neutral-200)' }}></div>
              <span style={{ padding: '0 16px', color: 'var(--neutral-400)', fontSize: '14px' }}>yoki ijtimoiy tarmoq orqali</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--neutral-200)' }}></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <button type="button" onClick={() => setShowGoogleModal(true)} style={{ width: '56px', height: '56px', borderRadius: '16px', border: '1px solid var(--neutral-200)', background: 'var(--surface-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', color: 'var(--neutral-900)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </button>
              <button type="button" onClick={() => alert('Apple orqali kirish hozircha tayyor emas')} style={{ width: '56px', height: '56px', borderRadius: '16px', border: '1px solid var(--neutral-200)', background: 'var(--surface-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', color: 'var(--neutral-900)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.126 3.805 3.052 1.527-.074 2.124-.984 3.96-.984 1.815 0 2.383.984 3.96.958 1.628-.027 2.65-1.524 3.633-2.983 1.144-1.674 1.616-3.298 1.637-3.385-.037-.015-3.176-1.216-3.21-4.858-.029-3.045 2.492-4.508 2.607-4.577-1.428-2.086-3.627-2.37-4.437-2.417-2.032-.128-4.047 1.13-5.078 1.13zm1.186-5.834c.813-.984 1.36-2.355 1.21-3.712-1.155.047-2.585.77-3.419 1.74-.666.772-1.32 2.164-1.144 3.498 1.295.101 2.544-.537 3.353-1.526z"/>
                </svg>
              </button>
              <button type="button" onClick={() => alert('Facebook orqali kirish hozircha tayyor emas')} style={{ width: '56px', height: '56px', borderRadius: '16px', border: '1px solid var(--neutral-200)', background: 'var(--surface-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', color: '#1877F2' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
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
        
        {step === 1 && (
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <span style={{ color: 'var(--neutral-500)', fontSize: '15px' }}>
              Akkaunt yo'qmi?{' '}
            </span>
            <Link to="/register" style={{ color: 'var(--brand-600)', fontWeight: 600, textDecoration: 'none' }}>
              Yangi yarating
            </Link>
          </div>
        )}
      </div>

      {/* Mock Google Login Modal */}
      {showGoogleModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={() => setShowGoogleModal(false)}>
          <div style={{ background: 'var(--surface)', borderRadius: '8px', width: '100%', maxWidth: '448px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.2)', border: '1px solid var(--neutral-200)' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '36px 40px 36px', textAlign: 'center' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 auto 16px' }}>
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <h2 style={{ fontSize: '24px', fontWeight: 400, color: 'var(--neutral-900)', marginBottom: '8px' }}>Kirish</h2>
              <p style={{ fontSize: '16px', color: 'var(--neutral-900)', marginBottom: '32px' }}>bog'chatop.uz saytiga davom etish</p>
              
              {googleError && (
                <div style={{ color: '#EF4444', fontSize: '14px', marginBottom: '16px', textAlign: 'left' }}>
                  <AlertCircle size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                  {googleError}
                </div>
              )}

              {googleStep === 1 ? (
                <div>
                  <input 
                    type="email" 
                    placeholder="Elektron pochta yoki telefon" 
                    value={googleEmail}
                    onChange={e => setGoogleEmail(e.target.value)}
                    style={{ width: '100%', padding: '16px', borderRadius: '4px', border: '1px solid var(--neutral-300)', fontSize: '16px', marginBottom: '8px', outline: 'none', color: 'var(--neutral-900)', background: 'transparent' }}
                  />
                  <div style={{ textAlign: 'left', marginBottom: '32px' }}>
                    <a href="#" style={{ color: '#1a73e8', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>Emailni unutdingizmi?</a>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <a href="#" style={{ color: '#1a73e8', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>Hisob yaratish</a>
                    <button 
                      onClick={() => {
                        if (!googleEmail) {
                          setGoogleError("Elektron pochtani kiriting");
                          return;
                        }
                        setGoogleError("");
                        setGoogleStep(2);
                      }}
                      style={{ background: '#1a73e8', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '4px', fontWeight: 500, cursor: 'pointer', transition: 'background 0.2s' }}
                      onMouseOver={e => e.currentTarget.style.background = '#1557b0'}
                      onMouseOut={e => e.currentTarget.style.background = '#1a73e8'}
                    >
                      Keyingisi
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: '1px solid var(--neutral-200)', borderRadius: '16px', padding: '4px 12px', width: 'max-content', margin: '0 auto 24px', cursor: 'pointer' }} onClick={() => setGoogleStep(1)}>
                     <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#1a73e8', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>{googleEmail.charAt(0).toUpperCase()}</div>
                     <span style={{ fontSize: '14px', color: 'var(--neutral-700)' }}>{googleEmail}</span>
                  </div>
                  <input 
                    type="password" 
                    placeholder="Parolingizni kiriting" 
                    value={googlePassword}
                    onChange={e => setGooglePassword(e.target.value)}
                    onKeyDown={async e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (!googlePassword) {
                          setGoogleError("Parolni kiriting");
                          return;
                        }
                        setGoogleError("");
                        const res = await mockLogin(googleEmail, googlePassword);
                        setShowGoogleModal(false);
                        if (res.isAdmin) {
                          navigate('/admin');
                        } else {
                          navigate('/');
                        }
                      }
                    }}
                    style={{ width: '100%', padding: '16px', borderRadius: '4px', border: '1px solid var(--neutral-300)', fontSize: '16px', marginBottom: '8px', outline: 'none', color: 'var(--neutral-900)', background: 'transparent' }}
                    autoFocus
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px' }}>
                    <a href="#" style={{ color: '#1a73e8', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>Parolni unutdingizmi?</a>
                    <button 
                      onClick={async () => {
                        if (!googlePassword) {
                          setGoogleError("Parolni kiriting");
                          return;
                        }
                        setGoogleError("");
                        const res = await mockLogin(googleEmail, googlePassword);
                        setShowGoogleModal(false);
                        if (res.isAdmin) {
                          navigate('/admin');
                        } else {
                          navigate('/');
                        }
                      }}
                      style={{ background: '#1a73e8', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '4px', fontWeight: 500, cursor: 'pointer', transition: 'background 0.2s' }}
                      onMouseOver={e => e.currentTarget.style.background = '#1557b0'}
                      onMouseOut={e => e.currentTarget.style.background = '#1a73e8'}
                    >
                      Keyingisi
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ color: 'var(--neutral-500)', fontSize: '14px' }}>Til: O'zbek</div>
              <div style={{ display: 'flex', gap: '16px', color: 'var(--neutral-500)', fontSize: '12px' }}>
                <span>Yordam</span>
                <span>Maxfiylik</span>
                <span>Shartlar</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

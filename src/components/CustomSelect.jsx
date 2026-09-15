import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function CustomSelect({ options, value, onChange, variant = 'default', style, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => String(opt.value) === String(value)) || options[0] || null;

  const triggerStyles = variant === 'hero' ? {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '0',
    background: 'transparent',
    border: 'none',
    color: 'var(--neutral-700)',
    cursor: 'pointer',
    outline: 'none',
    fontWeight: 500,
    fontSize: '1rem',
    userSelect: 'none'
  } : {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '12px 16px',
    background: 'transparent',
    border: '1px solid var(--neutral-300)',
    borderRadius: '8px',
    color: 'var(--neutral-900)',
    cursor: 'pointer',
    outline: 'none',
    fontSize: '1rem',
    userSelect: 'none'
  };

  return (
    <div ref={selectRef} className={className} style={{ position: 'relative', width: '100%', ...style }}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={triggerStyles}
      >
        <span>{selectedOption ? selectedOption.label : ''}</span>
        <ChevronDown size={16} color={variant === 'hero' ? 'var(--neutral-400)' : 'var(--neutral-500)'} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </div>
      
      {isOpen && (
        <div className="custom-select-dropdown" style={{ 
          position: 'absolute', 
          top: '100%', 
          left: 0, 
          right: 0, 
          marginTop: '8px', 
          background: 'var(--surface-warm)', 
          border: '1px solid var(--neutral-200)', 
          borderRadius: '12px', 
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)', 
          zIndex: 100,
          maxHeight: '300px',
          overflowY: 'auto',
          padding: '8px',
          animation: 'fadeInUp 0.15s ease'
        }}>
          {options.map((opt, idx) => (
            <div 
              key={idx}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              style={{
                padding: '12px 16px',
                cursor: 'pointer',
                borderRadius: '8px',
                background: String(value) === String(opt.value) ? 'var(--brand-50)' : 'transparent',
                color: String(value) === String(opt.value) ? 'var(--brand-600)' : 'var(--neutral-900)',
                fontWeight: String(value) === String(opt.value) ? 600 : 400,
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
              }}
              onMouseEnter={(e) => {
                if (String(value) !== String(opt.value)) {
                  e.currentTarget.style.background = 'var(--neutral-100)';
                }
              }}
              onMouseLeave={(e) => {
                if (String(value) !== String(opt.value)) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

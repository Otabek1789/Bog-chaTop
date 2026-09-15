import React from 'react';
import './Skeleton.css';

export default function Skeleton({ width, height, borderRadius = '8px', style = {} }) {
  return (
    <div 
      className="skeleton" 
      style={{ 
        width: width || '100%', 
        height: height || '20px', 
        borderRadius: borderRadius,
        ...style 
      }} 
    />
  );
}

export function KindergartenCardSkeleton() {
  return (
    <div style={{ background: 'var(--surface-warm)', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--neutral-200)', display: 'flex', flexDirection: 'column' }}>
      <Skeleton height="200px" borderRadius="0" />
      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Skeleton height="28px" width="70%" />
        <Skeleton height="16px" width="40%" />
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Skeleton height="24px" width="80px" borderRadius="12px" />
          <Skeleton height="24px" width="80px" borderRadius="12px" />
        </div>
        <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--neutral-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Skeleton height="24px" width="100px" />
          <Skeleton height="40px" width="120px" borderRadius="8px" />
        </div>
      </div>
    </div>
  );
}

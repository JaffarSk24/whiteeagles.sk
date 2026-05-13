"use client";

import React from 'react';
import { useOrderModal } from './AppShell';

interface BlogCTAProps {
  title: string;
  buttonText: string;
}

export function BlogCTA({ title, buttonText }: BlogCTAProps) {
  const { openOrderModal } = useOrderModal();

  return (
    <div style={{
      margin: '40px 0',
      padding: '30px',
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      textAlign: 'center',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
    }}>
      <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '1.5rem', color: 'var(--text-color)' }}>
        {title}
      </h3>
      <button 
        className="btn btn-liquid" 
        onClick={() => openOrderModal()}
      >
        {buttonText}
      </button>
    </div>
  );
}

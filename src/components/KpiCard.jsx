import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function KpiCard({ title, value }) {
  const { isDark } = useTheme();

  const cardStyle = {
    padding: '16px',
    borderRadius: '8px',
    backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
    color: isDark ? '#ffffff' : '#333333',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center',
  };

  return (
    <div style={cardStyle}>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', opacity: 0.8 }}>{title}</h3>
      <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>{value}</p>
    </div>
  );
}
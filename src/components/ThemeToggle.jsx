import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      style={{ padding: '8px 16px', cursor: 'pointer', borderRadius: '4px' }}
    >
      Переключити тему ({theme === 'light' ? ' Dark' : ' Light'})
    </button>
  );
}
import React, { useState } from 'react';
import DashboardContainer from './containers/DashboardContainer';

export default function App() {
  const [theme, setTheme] = useState('light');
  const isDark = theme === 'dark';

  return (
    <DashboardContainer
      isDark={isDark}
      theme={theme}
      setTheme={setTheme}
    />
  );
}
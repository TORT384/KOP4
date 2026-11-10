import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { FilterProvider } from './context/FilterContext';
import DashboardContainer from './containers/DashboardContainer';
import CountryDetailsPage from './pages/CountryDetailsPage';

export default function App() {
  return (
    <ThemeProvider>
      <FilterProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardContainer />} />
            <Route path="/country/:code" element={<CountryDetailsPage />} />
            {/* Обробка невідомих роутів */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </FilterProvider>
    </ThemeProvider>
  );
}
import React, { useState, useMemo, useCallback } from 'react';
import DashboardView from '../components/DashboardView';
import useFetchCountries from '../hooks/useFetchCountries';
import useDebounce from '../hooks/useDebounce';

const INITIAL_FILTERS = {
  search: '',
  minPopulation: 0,
  sortKey: 'name',
  sortOrder: 'asc',
};

export default function DashboardContainer({ isDark, theme, setTheme }) {
  // 1. Власний хук завантаження даних
  const { data: rawCountries, loading, error } = useFetchCountries();

  // 2. Стан фільтрів із форми
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  // 3. Власний хук дебаунсу для запиту/вибірки (400 мс)
  const debouncedFilters = useDebounce(filters, 400);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  // Обчислення фільтрованого та відсортованого списку
  const processedCountries = useMemo(() => {
    if (!rawCountries || rawCountries.length === 0) return [];

    const { search, minPopulation, sortKey, sortOrder } = debouncedFilters;

    return rawCountries
      .filter((c) => {
        const matchesName = c.name.toLowerCase().includes((search || '').toLowerCase().trim());
        const matchesPop = c.population >= (minPopulation || 0);
        return matchesName && matchesPop;
      })
      .sort((a, b) => {
        let aVal = a[sortKey];
        let bVal = b[sortKey];

        if (typeof aVal === 'string') {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }

        if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [rawCountries, debouncedFilters]);

  // Динамічний перерахунок KPI на основі відфільтрованої вибірки
  const kpis = useMemo(() => {
    if (processedCountries.length === 0) return [];

    const totalCountries = processedCountries.length;
    const totalPopulation = processedCountries.reduce((acc, c) => acc + c.population, 0);
    const avgArea = Math.round(
      processedCountries.reduce((acc, c) => acc + c.area, 0) / totalCountries
    );

    return [
      { id: 'kpi-1', title: 'Знайдено країн', value: totalCountries.toLocaleString() },
      { 
        id: 'kpi-2', 
        title: 'Загальне населення', 
        value: `${(totalPopulation / 1_000_000_000).toFixed(2)} млрд` 
      },
      { 
        id: 'kpi-3', 
        title: 'Середня площа', 
        value: `${avgArea.toLocaleString()} км²` 
      },
    ];
  }, [processedCountries]);

  return (
    <DashboardView
      isDark={isDark}
      theme={theme}
      setTheme={setTheme}
      isLoading={loading}
      error={error}
      kpis={kpis}
      countries={processedCountries}
      initialFilters={INITIAL_FILTERS}
      onFilterChange={handleFilterChange}
    />
  );
}
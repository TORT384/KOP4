import React, { createContext, useContext, useState, useCallback } from 'react';

const INITIAL_FILTERS = {
  search: '',
  minPopulation: 0,
  sortKey: 'name',
  sortOrder: 'asc',
};

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  return (
    <FilterContext.Provider value={{ filters, setFilters: handleFilterChange, resetFilters, INITIAL_FILTERS }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}
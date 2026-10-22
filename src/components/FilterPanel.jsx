import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

export default function FilterPanel({ initialValues, onFilterChange, isDark }) {
  const { control, reset, watch } = useForm({
    defaultValues: initialValues || {
      search: '',
      minPopulation: 0,
      sortKey: 'name',
      sortOrder: 'asc',
    },
  });

  // Відслідковуємо зміни полів і передаємо їх у батьківський компонент
  useEffect(() => {
    const subscription = watch((values) => {
      onFilterChange(values);
    });
    return () => subscription.unsubscribe();
  }, [watch, onFilterChange]);

  // Кнопка скидання фільтрів
  const handleReset = () => {
    const defaults = initialValues || {
      search: '',
      minPopulation: 0,
      sortKey: 'name',
      sortOrder: 'asc',
    };
    reset(defaults);
    onFilterChange(defaults);
  };

  const styles = {
    panel: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px',
      backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginBottom: '24px',
    },
    group: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    },
    label: {
      fontSize: '13px',
      opacity: 0.8,
    },
    input: {
      padding: '8px 12px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      backgroundColor: isDark ? '#333' : '#fff',
      color: isDark ? '#fff' : '#000',
    },
    resetBtn: {
      padding: '8px 16px',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: '#ff4d4f',
      color: '#ffffff',
      cursor: 'pointer',
      fontWeight: 'bold',
      alignSelf: 'flex-end',
    },
  };

  return (
    <div style={styles.panel}>
      {/* 1. Полю пошуку за назвою */}
      <div style={styles.group}>
        <label style={styles.label}>Пошук за назвою:</label>
        <Controller
          name="search"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Введіть назву..."
              style={styles.input}
            />
          )}
        />
      </div>

      {/* 2. Поле мінімального населення */}
      <div style={styles.group}>
        <label style={styles.label}>Мін. населення:</label>
        <Controller
          name="minPopulation"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              step="1000000"
              min="0"
              onChange={(e) => field.onChange(Number(e.target.value))}
              style={styles.input}
            />
          )}
        />
      </div>

      {/* 3. Поле критерію сортування */}
      <div style={styles.group}>
        <label style={styles.label}>Сортувати за:</label>
        <Controller
          name="sortKey"
          control={control}
          render={({ field }) => (
            <select {...field} style={styles.input}>
              <option value="name">Назва</option>
              <option value="population">Населення</option>
              <option value="area">Площа</option>
            </select>
          )}
        />
      </div>

      {/* 4. Поле порядку сортування */}
      <div style={styles.group}>
        <label style={styles.label}>Порядок:</label>
        <Controller
          name="sortOrder"
          control={control}
          render={({ field }) => (
            <select {...field} style={styles.input}>
              <option value="asc">Зростання (↑)</option>
              <option value="desc">Спадання (↓)</option>
            </select>
          )}
        />
      </div>

      {/* 5. Кнопка «Скинути фільтри» */}
      <button type="button" onClick={handleReset} style={styles.resetBtn}>
        Скинути фільтри
      </button>
    </div>
  );
}
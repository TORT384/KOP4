import { useState, useEffect } from 'react';

/**
 * Хук для затримки оновлення значення
 * @param {any} value - Значення, яке змінюється швидко (напр. текст в інпуті)
 * @param {number} delay - Затримка в мс
 * @returns {any} - Затримане значення
 */
export default function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
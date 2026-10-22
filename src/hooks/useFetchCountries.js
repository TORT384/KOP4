import { useState, useEffect } from 'react';

/**
 * @returns {{ data: Array, loading: boolean, error: string|null }}
 */
export default function useFetchCountries() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    // 1. Отримуємо перелік дійсних назв країн
    fetch('https://countriesnow.space/api/v0.1/countries')
      .then((res) => res.json())
      .then((validCountriesRes) => {
        const validNamesSet = new Set(
          (validCountriesRes.data || []).map((c) => c.country.toLowerCase().trim())
        );

        // 2. Отримуємо дані про населення
        return fetch('https://countriesnow.space/api/v0.1/countries/population')
          .then((res) => res.json())
          .then((popResult) => ({ validNamesSet, popResult }));
      })
      .then(({ validNamesSet, popResult }) => {
        if (!isMounted) return;

        if (popResult.error || !popResult.data) {
          throw new Error('Не вдалося отримати коректні дані з API');
        }

        const realCountries = popResult.data.filter((item) => {
          const name = (item.country || '').toLowerCase().trim();
          return validNamesSet.has(name);
        });

        const formattedData = realCountries.map((item) => {
          const latestPopObj =
            Array.isArray(item.populationCounts) && item.populationCounts.length > 0
              ? item.populationCounts[item.populationCounts.length - 1]
              : null;

          const popValue = latestPopObj ? latestPopObj.value : 0;

          return {
            id: item.iso3 || item.code || item.country,
            name: item.country || 'Невідома країна',
            capital: 'Столиця',
            population: Number(popValue),
            area: Math.round(Number(popValue) / 120),
            region: 'Світ',
          };
        });

        setData(formattedData);
        setLoading(false);
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Помилка мережі при завантаженні');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
}
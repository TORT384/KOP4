import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetchCountries from '../hooks/useFetchCountries';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';

export default function CountryDetailsPage() {
  const { code } = useParams();
  const { data: countries, loading, error } = useFetchCountries();
  const { isDark } = useTheme();

  const styles = {
    container: {
      padding: '24px',
      fontFamily: 'sans-serif',
      minHeight: '100vh',
      backgroundColor: isDark ? '#1a1a1a' : '#f4f6f8',
      color: isDark ? '#ffffff' : '#333333',
    },
    card: {
      backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
      padding: '32px',
      borderRadius: '8px',
      marginTop: '20px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    },
    backBtn: {
      display: 'inline-block',
      padding: '8px 16px',
      backgroundColor: '#007bff',
      color: '#fff',
      textDecoration: 'none',
      borderRadius: '4px',
      marginBottom: '16px',
      fontWeight: 'bold',
    },
    detailRow: {
      margin: '12px 0',
      fontSize: '16px',
    }
  };

  if (loading) return <div style={styles.container}> Завантаження деталей...</div>;
  if (error) return <div style={styles.container}> Помилка: {error}</div>;

  const country = countries.find(
    (c) => String(c.id).toLowerCase() === String(code).toLowerCase()
  );

  if (!country) {
    return (
      <div style={styles.container}>
        <Link to="/" style={styles.backBtn}>← Назад до списку</Link>
        <div style={styles.card}>
          <h2> Країну з кодом "{code}" не знайдено.</h2>
        </div>
      </div>
    );
  }

  // Обчислення розширених розрахункових полів
  const density = country.area > 0 ? (country.population / country.area).toFixed(1) : 'Н/Д';

  return (
    <div style={styles.container}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={styles.backBtn}>← Назад до списку</Link>
        <ThemeToggle />
      </header>

      <div style={styles.card}>
        <h1>{country.name} ({country.id})</h1>
        <hr style={{ borderColor: isDark ? '#444' : '#eee' }} />

        <div style={styles.detailRow}><strong>Столиця:</strong> {country.capital}</div>
        <div style={styles.detailRow}><strong>Регіон:</strong> {country.region}</div>
        <div style={styles.detailRow}><strong>Населення:</strong> {country.population.toLocaleString()} осіб</div>
        <div style={styles.detailRow}><strong>Площа:</strong> {country.area.toLocaleString()} км²</div>
        
        <div style={styles.detailRow}>
          <strong>Густота населення:</strong> {density} осіб/км²
        </div>
        <div style={styles.detailRow}>
          <strong>Статус даних:</strong> Верифіковано API
        </div>
      </div>
    </div>
  );
}
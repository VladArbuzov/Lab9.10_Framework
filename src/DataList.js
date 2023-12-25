
import React, { useState, useEffect } from 'react';
import './App.css';

function DataList() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const loadingTimeoutRef = React.useRef(null);

  useEffect(() => {
    const apiKey = '143a27fedbb344e38c5192432232512';
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Sumy&aqi=no`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        setShowLoading(true);
        clearTimeout(loadingTimeoutRef.current); // Очистити попередній таймаут, якщо він є
        loadingTimeoutRef.current = setTimeout(() => {
          setLoading(false);
          setShowLoading(false);
        }, 3000);
      })
      .catch((error) => {
        console.error('Помилка завантаження даних про погоду:', error);
        setError('Помилка завантаження даних про погоду');
        setLoading(false);
      });

    // При виході з компонента очистити таймаут
    return () => {
      clearTimeout(loadingTimeoutRef.current);
    };
  }, []);

  const refreshData = () => {
    setLoading(true);
    setError(null);
    setShowLoading(true);
    clearTimeout(loadingTimeoutRef.current);
    loadingTimeoutRef.current = setTimeout(() => {
      setLoading(false);
      setShowLoading(false);
    }, 3000);
  };

  return (
    <div className="weather-container">
      {showLoading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {weatherData && (
        <>
          <h2>Погода в місті {weatherData.location.name}:</h2>
          <ul>
            <li>Температура: {weatherData.current.temp_c}°C</li>
            <li>Погодні умови: {weatherData.current.condition.text}</li>
            <li>Вологість: {weatherData.current.humidity}%</li>
            <li>Швидкість вітру: {weatherData.current.wind_kph} км/год</li>
            <li>Іконка погоди: <img src={weatherData.current.condition.icon} alt="Weather Icon" /></li>
          </ul>
        </>
      )}
      <button onClick={refreshData}>Оновити</button>
    </div>
  );
}

export default DataList;

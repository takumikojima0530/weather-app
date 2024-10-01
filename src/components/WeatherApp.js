import React, { useState } from 'react';
import Alert from './Alert';
import { fetchWeather } from '../services/weatherApi';

const WeatherInfo = ({ weatherData }) => (
  <div className="mt-4 bg-white bg-opacity-80 p-4 rounded-lg shadow-lg">
    <h2 className="text-xl font-semibold mb-2">{weatherData.name}の天気</h2>
    <p className="text-3xl font-bold mb-2">{Math.round(weatherData.main.temp)}°C</p>
    <p className="mb-2">{weatherData.weather[0].description}</p>
    <p className="mb-1">湿度: {weatherData.main.humidity}%</p>
    <p className="mb-1">風速: {weatherData.wind.speed} m/s</p>
    <p>体感温度: {Math.round(weatherData.main.feels_like)}°C</p>
  </div>
);

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (city.trim()) {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchWeather(city);
        setWeatherData(data);
      } catch (err) {
        setError(err.message);
        setWeatherData(null);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-6 bg-white bg-opacity-70 rounded-lg shadow-xl backdrop-blur-sm">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-800">天気情報アプリ</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex justify-center">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="都市名を入力してください(例：東京都 福岡県 糸島市など)"
              className="w-full sm:w-4/5 p-2 border rounded text-sm placeholder:text-xxs placeholder:text-gray-400"
            />
          </div>
          <div className="flex justify-center mt-2">
            <button
              type="submit"
              className="w-full sm:w-4/5 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300 transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? '取得中...' : '天気を取得'}
            </button>
          </div>
        </form>

        {error && <Alert variant="error">{error}</Alert>}
        {weatherData && <WeatherInfo weatherData={weatherData} />}
      </div>
    </div>
  );
};

export default WeatherApp;
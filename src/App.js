import React from 'react';
import WeatherApp from './components/WeatherApp';
import DynamicWeatherBackground from './components/DynamicWeatherBackground';

function App() {
  return (
    <div className="App">
      <DynamicWeatherBackground />
      <WeatherApp />
    </div>
  );
}

export default App;

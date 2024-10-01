const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = async (city) => {
  const response = await fetch(
    `${API_BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) {
    throw new Error('City not found');
  }
  return response.json();
};

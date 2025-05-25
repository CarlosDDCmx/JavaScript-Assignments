import { useContext, useEffect, useState } from 'react';
import { fetchWeatherData } from '../services/weatherAPI';
import { LocationContext } from '../contexts/LocationContext';

const useWeather = () => {
  const { lat, lon, locationName } = useContext(LocationContext);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const data = await fetchWeatherData(lat, lon);
        setWeatherData({
          ...data.current_weather,
          locationName,
          condition: data.current_weather.weathercode
        });
        setForecastData(data.daily);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    getWeather();
  }, [lat, lon, locationName]);

  return { weatherData, forecastData, loading, error };
};

export default useWeather;
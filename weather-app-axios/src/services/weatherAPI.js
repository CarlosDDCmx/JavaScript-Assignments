import axios from 'axios';

export const fetchWeatherData = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};
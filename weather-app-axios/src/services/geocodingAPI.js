import axios from 'axios';

export const fetchGeocodingData = async (locationName) => {
  try {
    const response = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}`
    );
    if (!response.data.results?.length) throw new Error('Location not found');
    return {
      latitude: response.data.results[0].latitude,
      longitude: response.data.results[0].longitude,
      name: response.data.results[0].name
    };
  } catch (error) {
    throw new Error('Failed to fetch location data');
  }
};
import { createContext, useState, useContext } from 'react';
import { fetchGeocodingData } from '../services/geocodingAPI';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [locationInput, setLocationInput] = useState('');
  const [lat, setLat] = useState(15.83752);
  const [lon, setLon] = useState(-92.75774);
  const [locationName, setLocationName] = useState('Querétaro');

  const handleLocationSearch = async (e) => {
    e.preventDefault();
    try {
      const locationData = await fetchGeocodingData(locationInput);
      setLat(locationData.latitude);
      setLon(locationData.longitude);
      setLocationName(locationData.name);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <LocationContext.Provider
      value={{
        locationInput,
        setLocationInput,
        lat,
        lon,
        locationName,
        handleLocationSearch
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
export { LocationContext };
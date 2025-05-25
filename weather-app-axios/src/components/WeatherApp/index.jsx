import { useContext } from 'react';
import { Link } from 'react-router-dom';
import useWeather from '../../hooks/useWeather';
import { LocationContext } from '../../contexts/LocationContext';
import WeatherCard from '../WeatherCard';
import { 
  WeatherAppContainer,
  SearchForm,
  WeatherDisplay,
  ForecastGrid
} from './WeatherApp.styles';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const WeatherApp = () => {
  const { locationInput, setLocationInput, handleLocationSearch } = useContext(LocationContext);
  const { weatherData, forecastData, loading, error } = useWeather();

  return (
    <WeatherAppContainer>
      <SearchForm onSubmit={handleLocationSearch}>
        <input
          type="text"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
          placeholder="Enter location"
        />
        <button type="submit">Search</button>
      </SearchForm>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}

      {weatherData && forecastData && (
        <>
          <WeatherDisplay weatherCode={weatherData.weathercode}>
            <h2>{weatherData.locationName}</h2>
            <p>🌡️ {weatherData.temperature}°C</p>
            <p>🌤️ {weatherData.condition}</p>
            <p>🌪️ {weatherData.windspeed} km/h</p>
          </WeatherDisplay>

          <h3>5-Day Forecast</h3>
          <ForecastGrid>
            {forecastData?.time?.slice(0, 5).map((date, i) => (
              <WeatherCard
                key={date}
                date={date}
                maxTemp={forecastData.temperature_2m_max[i]}
                minTemp={forecastData.temperature_2m_min[i]}
                weatherCode={forecastData.weathercode[i]}
              />
            ))}
          </ForecastGrid>
          <Link to={`/forecast`}>View Detailed Forecast →</Link>
        </>
      )}
    </WeatherAppContainer>
  );
};

export default WeatherApp;
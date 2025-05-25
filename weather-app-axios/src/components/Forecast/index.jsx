import { useLocation } from '../../contexts/LocationContext';
import useWeather from '../../hooks/useWeather';
import WeatherCard from '../WeatherCard';
import { ForecastContainer, DetailedForecastGrid, ForecastHeader } from './Forecast.styles';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const Forecast = () => {
  const { locationName } = useLocation();
  const { forecastData, loading, error } = useWeather();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <ForecastContainer>
      <ForecastHeader>
        <h1>7-Day Forecast for {locationName}</h1>
      </ForecastHeader>
      
      <DetailedForecastGrid>
        {forecastData?.time.map((date, index) => (
          <WeatherCard
            key={date}
            date={date}
            maxTemp={forecastData.temperature_2m_max[index]}
            minTemp={forecastData.temperature_2m_min[index]}
            weatherCode={forecastData.weathercode[index]}
            isDetailed
          />
        ))}
      </DetailedForecastGrid>
    </ForecastContainer>
  );
};

export default Forecast;
import PropTypes from 'prop-types';
import { formatWeatherDate } from '../../utils/dateFormatter';
import { getWeatherIcon } from '../../utils/weatherIcons';
import { Card, CardHeader, TemperatureSection, WeatherIcon } from './WeatherCard.styles';

const WeatherCard = ({ date, maxTemp, minTemp, weatherCode, isDetailed }) => (
  <Card>
    <CardHeader>
      <h3>{formatWeatherDate(date)}</h3>
    </CardHeader>
    
    <WeatherIcon>
      {getWeatherIcon(weatherCode)}
    </WeatherIcon>

    <TemperatureSection>
      <span>H: {maxTemp}°</span>
      <span>L: {minTemp}°</span>
    </TemperatureSection>

    {isDetailed && (
      <div className="additional-info">
        <p>Humidity: 65%</p>
        <p>Precipitation: 20%</p>
      </div>
    )}
  </Card>
);

WeatherCard.propTypes = {
  date: PropTypes.string.isRequired,
  maxTemp: PropTypes.number.isRequired,
  minTemp: PropTypes.number.isRequired,
  weatherCode: PropTypes.number.isRequired,
  isDetailed: PropTypes.bool
};

export default WeatherCard;
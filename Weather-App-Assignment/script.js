const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherInfo = document.getElementById('weatherInfo');
const loading = document.getElementById('loading');
const error = document.getElementById('error');

function initDefaultCity() {
    cityInput.value = 'Queretaro'; // Set default city
    handleSearch(); // Trigger search automatically
}

document.addEventListener('DOMContentLoaded', initDefaultCity);

async function fetchWeatherData(city) {
    try {
        // First get coordinates using Open-Meteo Geocoding API
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );
        
        if (!geoResponse.ok) throw new Error('City not found');
        const geoData = await geoResponse.json();
        
        if (!geoData.results || geoData.results.length === 0) {
            throw new Error('City not found');
        }

        const { latitude, longitude } = geoData.results[0];
        
        // Get weather data using Forecast API
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&hourly=temperature_2m&daily=weather_code&timezone=auto`
        );

        if (!weatherResponse.ok) throw new Error('Weather data unavailable');
        return await weatherResponse.json();
    } catch (err) {
        throw err;
    }
}

function displayWeatherData(data) {
    const weatherCodes = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
    };

    const current = data.current;
    const daily = data.daily;

    document.getElementById('cityName').textContent = cityInput.value;
    document.getElementById('temperature').textContent = `${current.temperature_2m}°C`;
    document.getElementById('conditions').textContent = weatherCodes[current.weather_code] || 'N/A';
    document.getElementById('humidity').textContent = current.relative_humidity_2m;
    document.getElementById('windSpeed').textContent = `${current.wind_speed_10m} km/h`;

    const iconMap = {
        0: '☀️',
        1: '⛅',
        2: '🌤️',
        3: '☁️'
    };
    document.getElementById('weatherIcon').textContent = iconMap[current.weather_code] || '🌫️';

    weatherInfo.classList.remove('hidden');
}


function showError(message) {
    error.textContent = message;
    error.classList.remove('hidden');
    weatherInfo.classList.add('hidden');
}

async function handleSearch() {
    const city = cityInput.value.trim();

    if (!city) {
        showError('Please enter a city name');
        return;
    }

    try {
        error.classList.add('hidden');
        loading.classList.remove('hidden');
        weatherInfo.classList.add('hidden');

        const weatherData = await fetchWeatherData(city);
        displayWeatherData(weatherData);
    } catch (err) {
        showError(err.message || 'Failed to fetch weather data');
    } finally {
        loading.classList.add('hidden');
    }
}

searchBtn.addEventListener('click', handleSearch);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});
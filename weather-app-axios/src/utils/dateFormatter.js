export const formatWeatherDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-MX', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }).format(date);
};
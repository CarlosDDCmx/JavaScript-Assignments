import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LocationProvider } from './contexts/LocationContext';
import WeatherApp from './components/WeatherApp';
import Forecast from './components/Forecast';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  return (
    <LocationProvider>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<WeatherApp />} />
          <Route path="/forecast" element={<Forecast />} />
        </Routes>
      </Router>
    </LocationProvider>
  );
}

export default App;
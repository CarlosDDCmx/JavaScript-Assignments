import React from 'react';
import Welcome from './components/Welcome';
import TimeGreeting from './components/TimeGreeting';
import Preferences from './components/Preferences';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <Welcome name="Guest" location="Honduras" />
      <TimeGreeting />
      <Preferences />
    </div>
  );
};

export default App;
import React, { useState } from 'react';
import Header from './components/Header';
import CVForm from './components/CVForm';
import CVPreview from './components/CVPreview';
import './App.css';

const App = () => {
  const initialCVState = {
    personal: { name: '', email: '', phone: '', address: '' },
    education: [],
    experience: [],
    skills: []
  };

  const [cvData, setCvData] = useState(() => {
    const savedData = localStorage.getItem('cvData');
    return savedData ? JSON.parse(savedData) : initialCVState;
  });

  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <CVForm cvData={cvData} setCvData={setCvData} />
        <CVPreview {...cvData} />
      </div>
    </div>
  );
};

export default App;
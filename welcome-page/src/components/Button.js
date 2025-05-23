import React from 'react';
import '../App.css';

const Button = ({ onClick, children, className }) => {
  return (
    <button 
      className={`button ${className || ''}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
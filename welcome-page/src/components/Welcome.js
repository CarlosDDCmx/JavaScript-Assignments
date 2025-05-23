import React from 'react';

const Welcome = ({ name, location }) => {
  return (
    <div className="welcome-container">
      <h1>Hello, {name} from {location}! Welcome to our platform.</h1>
    </div>
  );
};

export default Welcome;
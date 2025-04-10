import React from 'react';

const ErrorState = ({ message = 'An error occurred.' }) => {
  return (
    <div className="error-container">
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <h2>Oops!</h2>
      <p>{message}</p>
    </div>
  );
};

export default ErrorState;
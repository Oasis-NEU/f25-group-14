import React from 'react';
import './ClubGrid.css';

export const ClubGrid = ({ result }) => {
  return (
    <div className="club-card">
      <div className="club-img">🎓</div>
      <div className="club-info">
        <h2>{result.club}</h2>
        <p>{result.description}</p>
        <p>Rating: {result.rating}</p>
      </div>
    </div>
  );
};
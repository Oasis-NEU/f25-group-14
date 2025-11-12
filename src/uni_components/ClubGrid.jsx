import React from 'react';
import './ClubGrid.css';

export const ClubGrid = ({ result }) => {
  return (
    <div className="club-card">
      <div className="club-img">🎓</div>
      <div className="club-info">
        <h2>{result.uni_name}</h2>
        <p>{result.category || 'General Club'}</p>
        <p>{result.description || 'No description available.'}</p>
      </div>
    </div>
  );
};
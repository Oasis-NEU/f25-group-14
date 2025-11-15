import React, { useState } from 'react';
import './ClubGrid.css';

export const ClubGrid = ({ result }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div 
          className="club-card">
          className={`card-card ${expanded ? 'expanded' : ''}`}
          onClick={() => setExpanded(!expanded)}
      <div className="club-img">🦝</div>
      <div className="club-info">
        <h2>{result.club}</h2>
        <p>{result.description}</p>
        <p>Rating: {"⭐".repeat(parseInt(result.rating))}</p>
      </div>
    </div>
  );
};
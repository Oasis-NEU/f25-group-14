import React, { useState } from 'react';
import './ClubGrid.css';

export const ClubGrid = ({ result }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
        className={`club-card ${expanded ? 'expanded' : ''}`}
        onClick={() => setExpanded(!expanded)}
    >
      <div className="club-img">🦝</div>

      
      <div className="club-info">
        <h2>{result.club_name}</h2>
        <p>{result.club_description}</p>
        <p><strong>Rating: </strong>{"⭐".repeat(parseInt(result.rating))}</p>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import './ClubGrid.css';

export const ClubGrid = ({ result }) => {
  const [expanded, setExpanded] = useState(false);
  
  const truncate = (text, wordLimit = 15) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return(
    <div
        className={`club-card ${expanded ? 'expanded' : ''}`}
        onClick={() => setExpanded(!expanded)}
    >
        <div className="club-img">🦝</div>

      
        <div className="club-info">
        <h2>{result.club_name}</h2>

        <p>
          {expanded 
            ? result.club_description 
            : truncate(result.club_description, 15)}
        </p>

        <p>
          <strong>Rating: </strong>
          {"⭐".repeat(parseInt(result.rating))}
        </p>
      </div>
    </div>
  );
};
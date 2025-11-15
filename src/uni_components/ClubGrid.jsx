import React, { useState } from 'react';
import './ClubGrid.css';
import heartEmpty from '/src/assets/empty_heart.png';
import heartFull from '/src/assets/full_heart.png';

export const ClubGrid = ({ result }) => {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const[animating, setAnimating] = useState(false);
  
  const handleHeartClick = (e) => {
    e.stopPropagation();
    setAnimating(true);
    setLiked(!liked);

    setTimeout(() => {
      setAnimating(false);
    }, 250);

  };


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
        <img
        className={`heart-btn ${animating ? 'pop' : ''}`}
        src={liked ? heartFull : heartEmpty}
        onClick={handleHeartClick}
      />

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
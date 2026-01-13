import React, { useState, useEffect, useRef } from 'react';
import './ClubGrid.css';
import heartEmpty from '/src/assets/empty_heart.png';
import heartFull from '/src/assets/full_heart.png';
import { supabase } from '../supabase';
import { motion } from 'framer-motion';

export const ClubGrid = ({ result, onClick }) => {
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (result.favorite !== undefined) {
      setLiked(result.favorite);
    }
  }, [result.favorite]);

  const updateFavorite = async (newLiked) => {
    const { error } = await supabase
      .from("demo_club_data")
      .update({ favorite: newLiked })
      .eq("club_name", result.club_name);
    if (error) console.error("Error updating favorite:", error);
  };

  const handleHeartClick = async (e) => {
    e.stopPropagation();
    setAnimating(true);
    const newLiked = !liked;
    setLiked(newLiked);
    await updateFavorite(newLiked);
    setTimeout(() => setAnimating(false), 250);
  };



  const truncate = (text, wordLimit = 15) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    
      <motion.div 
        //layoutId={`result-${result.id}`} //the bug
        className="club-card" 
        onClick={onClick}
        whileHover ={{scale: 1.02}}
        transition={{ type: 'spring', stiffness: 400, damping: 30}}
        >
    
        
        <img
          className={`heart-btn ${animating ? 'pop' : ''}`}
          src={liked ? heartFull : heartEmpty}
          onClick={handleHeartClick}
        />

        <motion.div className="club-img">🦝</motion.div>
        <motion.div className="club-info">
        
          <motion.h2>{result.club_name}</motion.h2>
          
          <motion.p>{truncate(result.club_description)}</motion.p>
        </motion.div>
      </motion.div>
  );
};
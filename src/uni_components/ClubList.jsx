import React, { useState } from 'react';
import { ClubGrid } from './ClubGrid';
import ExpandedTile from "./ExpandedTile";
import './ClubList.css';
import { AnimatePresence, LayoutGroup } from 'framer-motion';

export const ClubList = ({ results }) => {
  const [expandedClub, setExpandedClub] = useState(null);
  
  if ( !results || results.length === 0) {
    return <p>No clubs found.</p>;
  }

  return (
    <>
      
      <div className="clubs-list">
      {results.map((result) => (
        <ClubGrid 
          key={result.id} 
          result={result} 
          onClick={() => setExpandedClub(result)}
        
        />
      ))}
      </div>
    <AnimatePresence>
    {expandedClub && (
      <ExpandedTile
        key = {expandedClub.id}
        result = {expandedClub}
        onClose={() => setExpandedClub(null)}
      />
    )}
    </AnimatePresence>
    </>
  );
};
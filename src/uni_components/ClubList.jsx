import React from 'react';
import { ClubGrid } from './ClubGrid';
import './ClubList.css';

export const ClubList = ({ results }) => {
  if (!results || results.length === 0) {
    return <p className="no-results">No clubs found.</p>;
  }

  return (
    <div className="clubs-list">
      {results.map((result) => (
        <ClubGrid key={result.id} result={result} />
      ))}
    </div>
  );
};
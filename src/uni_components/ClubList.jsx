import React from 'react';
import { ClubGrid } from './ClubGrid';
import './ClubList.css';

export const ClubList = ({ results }) => {
  if (!results) {
    return <p>No clubs found.</p>;
  }

  if (results.length === 0) {
    return <p>no results</p>;
  }

  return (
    <div className="clubs-list">
      {results.map((result) => (
        <ClubGrid key={result.id} result={result} />
      ))}
    </div>
  );
};
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase';
import { UniSearchBar } from './UniSearchBar';
import IconBar from './IconBar';
import './UniversityPage.css';
import { ClubList } from './ClubList';
<link 
  href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,200..900;1,7..72,200..900&family=Raleway:ital,wght@1,100..900&display=swap" 
  rel="stylesheet"
/>;
import NEULogo from '/src/uni_components/Imgs/NEU_Logo.png';

export const UniversityPage = () => {
  const { id } = useParams();
  const [university, setUniversity] = useState(null);
  const [results, setResults] = useState([]);
  const [favActive, setFavActive] = useState(false);
  const [isDocked, setIsDocked] = useState(false);
  
    useEffect(() => {
    const handleScroll = () => {
      const triggerPoint = 180;
      setIsDocked(window.scrollY > triggerPoint);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchFavorites = async () => {
    if(!favActive) {
      const { data, error } = await supabase
        .from('demo_club_data')
        .select('*')
        .eq("favorite", true);
      
      setFavActive(true)
      if (error) console.error(error);
      else setResults(data);
    }
    
    else{
      console.log("fav off")
      const { data, error } = await supabase
        .from('demo_club_data')
        .select('*')

      setFavActive(false)
      if (error) console.error(error);
      else setResults(data);
    }

  };

  useEffect(() => {
    async function fetchUniversity() {
      const { data, error } = await supabase
        .from('uni_names')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Error fetching university:', error);
        return;
      }

      setUniversity(data);
    }

    fetchUniversity();
  }, [id]);

  if (!university) return <div>Loading...</div>;

  return (
    <div className="UniPage">
      <h1 className="raleway-uni">Northeastern</h1>

      <div className={`dock-wrapper ${isDocked ? 'docked' : ''}`}>
        <IconBar onFavoritesClick={fetchFavorites} />
        <UniSearchBar setResults={setResults} university={university.uni_name} />

        {isDocked && <div className="glass-bar" />}
      </div>

      <ClubList results={results} />
    </div>
  );
};
      
      
      {/*
      <Routes>
        <Route
          path="/"
          element={
            <div className="uni-search-bar-container">
              <UniSearchBar setResults={setResults} />
            </div>
          }
        />
        <Route path="club path" element={<Club Page lol />} />
      </Routes>
        */}

/*
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import { SearchBar } from './components/SearchBar'
import { SearchResultsList } from './components/SearchResultsList'
import { UniversityPage } from './uni_components/UniversityPage'

function App() {
  const [results, setResults] = useState([])

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <div className="search-bar-container">
              <SearchBar setResults={setResults} />
              <SearchResultsList results={results} />
            </div>
          }
        />
        <Route path="/university/:id" element={<UniversityPage />} />
      </Routes>
    </div>
  )
}

export default App
*/
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../supabase'
import { UniSearchBar } from './UniSearchBar'
import IconBar from './IconBar'
import './UniversityPage.css';
import { ClubList } from './ClubList'

import NEULogo from '/src/uni_components/Imgs/NEU_Logo.png'
import './UniversityPage.css'

export const UniversityPage = () => {
  const { id } = useParams()
  const [university, setUniversity] = useState(null)
  const [results, setResults] = useState([])

  //this'll be used for the second table when we're ready
  useEffect(() => { 
    async function fetchUniversity() {
      const { data, error } = await supabase
        .from('uni_names')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching university:', error)
        return
      }

      setUniversity(data)
    }

    fetchUniversity()
  }, [id])

  if (!university) return <div>Loading...</div>

  return (
    <div className="UniPage">
      <img src={NEULogo} width="120px" className="center"/>
      <IconBar/>
      <div className="search-bar-container">
        <UniSearchBar setResults={setResults}
        university={university.uni_name}/>
        <ClubList results={results} />
      </div>
    </div>
  )
}

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
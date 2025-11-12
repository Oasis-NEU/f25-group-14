import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../supabase'
import { UniSearchBar } from './UniSearchBar'
import './UniversityPage.css';


import NEULogo from '/src/uni_components/Imgs/NEU_Logo.png'

export const UniversityPage = () => {
  const { id } = useParams()
  const [university, setUniversity] = useState(null)
  const [result, setResults] = useState([])

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
      <div className='spacer' />
      <img src={NEULogo} width="150px" className="img"/>
      <h1 className='UniName'>{university.uni_name}</h1>
      <div id="iconBox"></div>
      <div className="uni-search-bar-container">
        <UniSearchBar setResults={setResults} />
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
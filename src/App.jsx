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
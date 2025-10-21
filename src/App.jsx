import { useState } from 'react'
import './App.css'
import { SearchBar } from './components/SearchBar'
import { SearchResultsList } from './components/SearchResultsList'
import { BrowserRouter } from 'react-router-dom'

function example() {
  
}

function App() {
  const [results, setResults] = useState([])

  return (
    <BrowserRouter>
    <div className="App">
      <div className="search-bar-container">
        <SearchBar setResults={setResults}/>
        <SearchResultsList results={results}/>
      </div>
    </div>
    </BrowserRouter>
  )
}

export default App

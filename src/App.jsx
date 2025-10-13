import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SearchBar } from './components/SearchBar'

function App() {
  // const [count, setCount] = useState(0)
  // const name = "Name"

  return (
    <div className="App">
      <div className="search-bar-container">
        <SearchBar />
        <div>Search Results</div>
      </div>
    </div>
  )
}

export default App

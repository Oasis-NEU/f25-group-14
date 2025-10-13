import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SearchBar } from './components/SearchBar'

function App() {
<<<<<<< HEAD
  // const [count, setCount] = useState(0)
  // const name = "Name"
=======
  const [count, setCount] = useState(0)
  const name = "User Name"
>>>>>>> 38e9dd2effe2c131271218eb0bbb4087dbebf2d0

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

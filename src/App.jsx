import { Routes, Route, useNavigate} from 'react-router-dom'
import { createContext, useState, useContext } from 'react'
import './App.css'
import { SearchBar } from './components/SearchBar'
import { SearchResultsList } from './components/SearchResultsList'
import { UniversityPage } from './uni_components/UniversityPage'
import LoginPage from './LoginPage'

function App() {
  const [results, setResults] = useState([])
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/LoginPage')
  }

  return (
    <div className="App">
      <div className="login-button">
        <button onClick={handleLogin}>log in</button>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div className="search-bar-container">
             <h2 className="welcome-text">
              Back
              <span className="raccoon-wrapper">
              <img src="/raccoon.png" alt="raccoon" className="raccoon-icon" />
              </span>
              <span className="come-text">     yard</span>
              </h2>
              <SearchBar setResults={setResults} />
              <SearchResultsList results={results} />
            </div>
          }
        />
        <Route path="/university/:id" element={<UniversityPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App
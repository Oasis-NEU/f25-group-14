import { Routes, Route, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import { SearchBar } from './components/SearchBar'
import { SearchResultsList } from './components/SearchResultsList'
import { UniversityPage } from './uni_components/UniversityPage'
import LoginMorph from "./login_components/LoginMorph"
import ReviewPage from "./review_components/ReviewPage"

function App() {
  const [results, setResults] = useState([])
  const [loginOpen, setLoginOpen] = useState(false);
  
  return (
    <div className="App">

        <LoginMorph open={loginOpen} setOpen={setLoginOpen} />
      
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
        <Route path="/reviews/:id" element={<ReviewPage />} />
      </Routes>
    </div>
  );
}

export default App
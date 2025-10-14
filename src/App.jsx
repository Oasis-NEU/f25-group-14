import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SearchBar } from './components/SearchBar'
import { supabase } from './supabase'

function App() {
  const [uni_name, setName] = useState(""); // Initialized as an empty string.
  const [universities, setUni] = useState([]); // Initialized as an empty array.

  return (
    <div className="App">
      <div className="search-bar-container">
        <SearchBar />
        <div>Search Results</div>
      </div>
    </div>
  )
}

async function fetchUniversities() {
    try {
      const { data, error } = await supabase // Destructure the Supabase call
            .from("uni_names") // From the "Groceries" table
            .select("*"); // Select (fetch) everything
      if (error) throw error; // If there is an error, throw it
      if (data != null) { // If there is data fetched
        setUni(data); // Set our groceries state variable to the data
      }
    } catch (error) {
      alert(error); // If an error is caught, alert it on the client
    }
  }
export default App

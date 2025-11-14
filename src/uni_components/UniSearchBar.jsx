import React, {useState} from 'react'
import { useEffect } from 'react'
import { supabase } from '../supabase'

import {FaSearch} from 'react-icons/fa'
import './UniSearchBar.css'

export const UniSearchBar = ({ setResults }) => {

    
  const [input, setInput] = useState("")
  const [clubs, setClubs] = useState([]); // Initialized as an empty array.


   useEffect(() => {
    console.log("useEffect running, input =", input);

    async function getClubs() {

        //these will change depending on the structure of the database, but for now they'll be like this
      let query = supabase.from("uni_clubs").select("*");

      if (input.trim() !== "") {
        query = query.ilike("Club", `%${input}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching clubs:", error);
        return;
      }

      setClubs(data);
      setResults(data);
    }

    getClubs();
  }, [input, setResults]); //whenever the user input changes, we want to re-run this effect
  
  const handleChange = (value) => {
    setInput(value);
  } 

  return (
    <div className="club-input-wrapper">
        <FaSearch className="search-icon" />
        <input
            placeholder="Type to search..."
            value={input}
            onChange={(e) => handleChange(e.target.value)}
        />
    </div>
  )
  
}
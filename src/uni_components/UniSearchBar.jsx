import React, {useState} from 'react'
import { useEffect } from 'react'
import { supabase } from '../supabase'

import {FaSearch} from 'react-icons/fa'
import './UniSearchBar.css'

export const UniSearchBar = ({ setResults, university}) => {

    
  const [input, setInput] = useState("")
  const [clubs, setClubs] = useState([]); // Initialized as an empty array.


   useEffect(() => {
    console.log("useEffect running, input =", input);

    async function getClubs() {
      console.log("university:", university);
      console.log("input:", input);

        //these will change depending on the structure of the database, but for now they'll be like this
      let query = supabase.from("club_data").select("*").eq("school", university).limit(10); //next filter by school depending on the page we're on
      console.log("Query before filters:", query);

      if (input.trim() !== "") {
        query = query.ilike("club_name", `%${input}%`);
        console.log("Filtering with ILIKE:", `%${input}%`);
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
  }, [input]); //whenever the user input changes, we want to re-run this effect
  
  const handleChange = (value) => {
    setInput(value);
  } 

  return (
    <div className="club-input-wrapper">
        <FaSearch className="search-icon" />
        <input
            placeholder="Explore Clubs..."
            value={input}
            onChange={(e) => handleChange(e.target.value)}
        />
    </div>
  )
  
}
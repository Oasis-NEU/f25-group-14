import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../supabase'


//this is the landing page for our university club search, most of the info will go through here 
export const UniversityPage = () => {
  const { id } = useParams()
  const [university, setUniversity] = useState(null)

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
    <div style={{ padding: '2rem' }}>
      <h1>{university.uni_name}</h1>
      <p>ID: {university.id}</p>
      {/* Add more fields if your table has them */}
    </div>
  )
}
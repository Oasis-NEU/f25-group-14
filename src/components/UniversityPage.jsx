import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../supabase'

export const UniversityPage = () => {
  const { id } = useParams()
  const [university, setUniversity] = useState(null)

  //this is gpted. the goal for this is to have nested club tables embedded into the overall uni table
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
import React from 'react'

import "./SearchResult.css"

export const SearchResult = ({ result }) => {
    return <div className='search-result' onClick={(e) => alert('You clicked it')}>{result.uni_name}</div>
}
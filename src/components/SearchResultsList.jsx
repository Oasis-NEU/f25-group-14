import React from 'react'

import './SearchResultsList.css'

export const SearchResultsList = ({ results }) => {
    return <div className="results-list">
        {
            results.map((result) => {
                return <div key={result.id}>{result.uni_name}</div>
            })
        }
    </div>
    
}
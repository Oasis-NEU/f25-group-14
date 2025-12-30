import { supabase } from '../supabase';
import React, { useState, useEffect } from 'react';

export default function ReviewPage({}) {
    const { id } = useParams()
    const [reviews, set_reviews] = useState([])
    
    useEffect(() => {
        async function fetch_reviews() {
            const {data, error} = await supabase
                .from('reviews')
                .select('*')

            if (error) {
                console.error('Error fetching reviews:', error);
                return;
            }
            set_reviews(data);
        }
        fetch_reviews();
    }, [id])
    

    return (
        <div>
            <p>this is the reviwe page, write review on the top and see others on the bottom</p>
        </div>
    )
}
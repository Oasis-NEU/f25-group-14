import { supabase } from '../supabase';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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

    async function post_review() {
        //this will be where I write the function logic for writing a review to the app
    }
    

    return (
        <div className='review-page'>
            <p>this is the review page, write review on the top and see others on the bottom</p>

            <div className='create-review'>
                <p>this is for the creation of the review</p>
            </div>

            <div className='view-reviews'>
                <p>this is where we'll see past reviews </p>
            </div>
        </div>
    )
}
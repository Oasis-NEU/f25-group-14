import { supabase } from '../supabase';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ReviewPage({}) {
    const { id } = useParams();
    const [reviews, set_reviews] = useState([]);
    
    //user input variables
    const [ user_review , set_user_review ] = useState('');
    const [ user_rating, set_user_rating ] = useState(0)

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
                <input
                    type="text"
                    value={user_review}
                    onChange={(e) => set_user_review(e.target.value)}
                    placeholder="Write your review..."
                />
                <input
                    type="number"
                    value={user_rating}
                    onChange={(e) => set_user_rating(e.target.value)}
                    placeholder="Rate club out of 5"
                />
                <button onClick={post_review}>Post Review</button>
            </div>

            <div className='view-reviews'>
                <p>this is where we'll see past reviews </p>
            </div>
        </div>
    )
}
import { supabase } from '../supabase';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalStore } from "../store";

export default function ReviewPage({}) {
    const { id } = useParams();
    const [reviews, set_reviews] = useState([]);
    const GlobalValue = useGlobalStore((state) => state.GlobalValue);
    
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
        //first check if the user is logged in
        if (GlobalValue) {
            //then, once checked, check if either field is empty (or rating isn't a number between 0-5)
            if(user_review && (user_rating in [0,1,2,3,4,5])) {
                //finally, take the values and post the review
                const { data, error } = await supabase
                    .from('reviews')
                    .upsert({club_name: "test", review_text: user_review, rating: user_rating, user: "test user"})
                    .select()
                
                if (error) {
                console.error('Error fetching reviews:', error);
                return;
                }
            }
             
        }

        else {
            console.log("please log in before you post a review")
        }

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
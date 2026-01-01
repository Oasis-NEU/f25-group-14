import { supabase } from '../supabase';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ReviewPage({}) {
    //current problem: I need to include all other spellings and cases of swears
    const badWords = [
        ' ass ', 'fuck', 'shit', 'bitch', 'whore', 'cunt', ' nigger', 'nigga', 'negro', 'chink', 'fag',
        ' a$$', ' a$s', 'as$', '@ss', 'sh1t', 'bltch', 'b1tch', 'wh0re', 'n1gger', 'nlgger', 'n1gga', 'nlgga', 'negr0', 'f@g', 'asshole', 'assh0le',
        'retard', 'pussy', 'ret@rd'
    ]
    const { id } = useParams();
    const [ userReview, setReview ] =  useState("");
    const [reviews, set_reviews] = useState([]);
    const [warning, setWarning] = useState("")

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
    
    const change = (e) => {
        setReview(e.target.value);
    }

    const submitReview = () => {
        console.log("Button pressed!")
        if(userReview.length < 10){
            setWarning("Written review too short. Use at least 10 characters");
            return;
        }
        for(let i=0; i < badWords.length; i++){
            const regex = new RegExp(badWords[i], 'gi');
            if(regex.test(userReview)){
                setWarning("Review contains harmful content. Please do not use derogatory or harmful speech.");
                return;
            }
        }
        setWarning("")
    }

    return (
        <div>
            <p>this is the review page, write review on the top and see others on the bottom</p>
            <input type="text" value = {userReview} onChange={change}></input>
            <button onClick={submitReview}>Click me!</button>
            <p>{warning}</p>
        </div>
    )
}
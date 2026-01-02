import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import "./ExpandedTile.css";


function ExpandedTile({club, onClose}){
    return (
    <AnimatePresence>

        <motion.div
            layoutId = {'club-${club.id}'}
            className = "expanded-card"
            initial = {{opacity: 0}}
            animate = {{opacity: 1}}
            exit = {{ opacity: 0}}

        >
        <button className = "close-btn" onClick={onClose}>x</button>
        
        <h2>{club.club_name}</h2>
        <p>{club.club_description}</p>

        <Link to="/reviews/:id">Click here to see reviews</Link>
        


        </motion.div>
    </AnimatePresence>
    );
}

export default ExpandedTile;


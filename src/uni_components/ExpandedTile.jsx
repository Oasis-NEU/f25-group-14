import Portal from "../Portal";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Link } from "react-router-dom";
import "./ExpandedTile.css";



function ExpandedTile({result, onClose}){
    return (
        <Portal>
        <AnimatePresence>
        <motion.div
            className = "expanded-card"
            initial = {{backgroundColor: 'rgba(0,0,0,0)'}}
            animate = {{backgroundColor: 'rgba(0,0,0,0.5)'}}
            onClick = {onClose}

        >

        <motion.div
         layoutId = {`result-${result.id}`}
         className = "expanded-content"
         onClick={(e) => e.stopPropagation()}
         transition ={{type: 'spring', stiffness: 300, damping: 30}}
         >

        <button className = "close-btn" onClick={onClose}>x</button>
        
        <motion.h2>{result.club_name}</motion.h2>
        <motion.p>{result.club_description}</motion.p>

        <Link to="/reviews/:id">Click here to see reviews</Link>
        


        </motion.div>
        </motion.div>
        </AnimatePresence>
    </Portal>
    );
}

export default ExpandedTile;


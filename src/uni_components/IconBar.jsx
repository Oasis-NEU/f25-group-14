import React, {useState} from 'react'
import { useEffect } from 'react'
import './IconBar.css'


export default function IconBar() {
    const icons = [
        { name: "heart", label: "Favorites" },
        { name: "fsl", label: "FSL" },
        { name: "soccer", label: "Intramurals" },
        { name: "art", label: "Visual Arts" },
        { name: "robot", label: "Engineering" },
        { name: "code", label: "Comp Sci" },
        { name: "tree", label: "Nature" }
    ];
    const [active, setActive] = useState(null);

return (
    <div className="icon-bar">
        {icons.map((icon, idx) => (
            <div
                key={icon.name}
                className={`icon-container ${active === idx ? 'active' : ''}`}
                onClick={() => setActive(idx)}
            >
                <img
                    src={'/src/assets/' + icon.name + '.png'}
                    alt={icon.name}
                    className="icon"
                />
                <span className="icon-label">{icon.label}</span>
            </div>
        ))}
    </div>
    );
}
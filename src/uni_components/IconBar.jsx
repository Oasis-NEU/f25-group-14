import React, {useState} from 'react'
import { useEffect } from 'react'
import './IconBar.css'


export default function IconBar() {
    const icons = [
        "heart",
        "fsl",
        "soccer",
        "art",
        "robot",
        "code",
        "tree"
    ];
    const [active, setActive] = useState(null);

return (
    <div className="icon-bar">
        {icons.map((name, idx) => (
            <div
                key={name}
                className={`icon-container ${active === idx ? 'active' : ''}`}
                onClick={() => setActive(idx)}
            >
                <img
                    src={'/src/assets/' + name + '.png'}
                    alt={name}
                    className="icon"
                />
            </div>
        ))}
    </div>
    );
}
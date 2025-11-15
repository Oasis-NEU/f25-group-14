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
    return (
        <div className="icon-bar">
        {icons.map((name) => (
            <img
                key={name}
                src={'/src/assets/' + name + '.png'}
                alt={name}
                className="icon"
            />
        ))}
        </div>
    );
}
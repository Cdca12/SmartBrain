import React from 'react';
import Tilt from 'react-tilt'
import brainLogo from './brain.png'
import './Logo.css'

const Logo = () => {
    return (
        <div className="ma4 mt0 ">
            <Tilt className="Tilt br2 shadow-2" options={{ max: 55 }} style={{ height: 200, width: 200 }} >
                <div className="Tilt-inner pa3">
                    <img src={brainLogo} alt="Logo" style={{ height: '150px', width: '150px', padding: '10px' }}/>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;
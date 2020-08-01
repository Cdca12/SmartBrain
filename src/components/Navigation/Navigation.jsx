import React from 'react'
import './Navigation.css'

const Navigation = (props) => {

    const { onRouteChange, isSignedIn } = props;

    return (
        isSignedIn
            ? <div className="navigation">
                <p onClick={() => onRouteChange("signout")} className="f3 link dim black underline pa3 pointer">Sign Out</p>
            </div>
            :
            <div className="navigation">
                <p onClick={() => onRouteChange("signin")} className="f3 link dim black underline pa3 pointer">Sign In</p>
                <p onClick={() => onRouteChange("register")} className="f3 link dim black underline pa3 pointer">Register</p>
            </div>

    );
}

export default Navigation;
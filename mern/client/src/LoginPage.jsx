import { Login } from "./components/Login";
import React from "react";
import { Link } from "react-router-dom";
import './LoginPage.css'

const LoginPage = () => {
    function handleClick() {
        console.log("button -> go to create an account page");
    }
    
    return (
        <div>
            <Login />
            <Link to="/createAccount">
                <button onClick={handleClick}>Don't have an account yet? Create one now!</button>
            </Link>




            {/* Amanda:this is temporary button that takes us to home page w/o logging in */}
            <Link to="/tempGoToHomepage">
                <button onClick={handleClick} style={{ marginLeft: 'auto', marginRight: '0', display: 'block', width: 'auto' }}>temporary go to homepage</button>
            </Link>
        </div>
    )
}

export default LoginPage;
import { Login } from "./components/Login";
import React from "react";
import './LoginPage.css'

const LoginPage = () => {
    function handleClick() {
        console.log("button -> go to create an account page");
    }
    
    return (
        <div>
            <Login />
            <button onClick={handleClick}>Don't have an account yet? Create one now!</button>
        </div>
    )
}

export default LoginPage;
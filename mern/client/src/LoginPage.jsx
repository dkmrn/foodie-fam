import { Login } from "./components/Login";
import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
    function handleClick() {
        console.log("button -> go to create an account page");
    }
    
    return (
        <div>
            <Login />
        </div>
    )
}

export default LoginPage;
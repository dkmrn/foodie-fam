import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loginUser } from "../api/Users.js";
import { setUserId } from "../main.jsx";

// make the login page auto refresh

export function Login() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(""); // state used to handle login errors
    const navigate = useNavigate(); // to use for navigation after successful login
    
    const handleChange = (info) => {
        setFormData((formData) => ({
            ...formData,
            [info.target.name]: info.target.value
        }));
    };
    
    const handleSubmit = async () => {
        setIsSubmitted(true);
        setError(""); // clear previous login errors
        console.log("user email is: ", formData.email);
        console.log("user pass is: ", formData.password);

        // implementing use of loginUser() from Users.js
        try {
            const loginResponse = await loginUser(formData);

            if (loginResponse && loginResponse._id) {
                console.log("Login successful! Response: ", loginResponse);
                setUserId(loginResponse._id);
                navigate("/goToHomepage");

            } else {
                console.error("Login error due to unexpected response format: ", loginResponse);
                setError("Login failed. Please check your username and password.");
                setIsSubmitted(false); // allows for the user to retry
            }
        } catch (error) {
            console.error("Login Error: ", error.message);
            setError("Login failed. Please check your username and password!")
            setIsSubmitted(false); // allows for the user to retry
        }
    };
    
    return (
        <div className="login-box">
            <h1>Login Here!</h1>
            <div>
                <p>email address: {formData.email}</p>
                <input 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    type='email'
                    placeholder="enter your email..."
                    disabled={isSubmitted}
                />
            </div>
        <div>
        <p>password: {formData.password}</p>
        <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type='password'
            placeholder="enter your password..."
            disabled={isSubmitted}
        />
        </div>
        <button className="login-buttons" type='submit' onClick={handleSubmit}>Submit</button>
    </div>
    );
};

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './Login.css';

export function Login() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
         email: "",
         password: "",
    });

    const handleChange = (info) => {
        setFormData((formData) => ({
            ...formData,
            [info.target.name]: info.target.value
        }));
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
        console.log("user email is: ", formData.email);
        console.log("user pass is: ", formData.password);
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
}
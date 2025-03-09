import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/Users.js";
import { setUserId } from "../main.jsx";
import { getUserId } from "../main";
import beigebackground from "../assets/beigebackground.png"

// make the login page auto refresh

export function Login() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(""); // state used to handle login errors
    const navigate = useNavigate(); // to use for navigation after successful login
    
    useEffect(() => {
        // Clear form data and errors on component mount
        setFormData({
            email: "",
            password: "",
        });
        setError("");
        setIsSubmitted(false);
    }, []);

    const handleChange = (info) => {
        setFormData((formData) => ({
            ...formData,
            [info.target.name]: info.target.value
        }));
    };
    
    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setIsSubmitted(true);
        setError(""); // clear previous login errors
        console.log("user email is: ", formData.email);``
        console.log("user pass is: ", formData.password);

        // implementing use of loginUser() from Users.js
        try {
            const loginResponse = await loginUser(formData);

            if (loginResponse && loginResponse._id) {
                console.log("Login successful! Response: ", loginResponse);
                console.log(loginResponse._id);
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
    
    const userId = getUserId();

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Login Here!</h1>

            <div style={styles.formContainer}>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                    {/* Display error message if there is one */}
                    {error && (
                        <div style={styles.errorMessage}>
                            {error}
                        </div>
                    )}

                    <label style={styles.label}>Email:</label>
                    <input 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        type='email'
                        placeholder="Enter your email..."
                        disabled={isSubmitted}
                        style={styles.input}
                        required
                    />

                    <label style={styles.label}>Password:</label>
                     <input
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type='password'
                        placeholder="Enter your password..."
                        disabled={isSubmitted}
                        style={styles.input}
                        required
                    />

                    <button type='submit' style={styles.button} disabled={isSubmitted} >
                        {isSubmitted ? "Logging in..." : "Login"}
                    </button>
                </form>

                {userId && (
                    <div style={styles.userIdContainer}>
                        <p><strong>User ID:</strong> {userId}</p>
                    </div>
                )}

            </div>

            <button
                style={styles.createAccountButton}
                onClick={() => navigate("/createAccount")}
                onMouseOver={(e) => e.target.style.textDecoration = "underline"}
                onMouseOut={(e) => e.target.style.textDecoration = "none"}
            >
                Create an Account
            </button>

        </div>
    );
};

// Styles matching CreateAccount component
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f4e9dc", // Soft beige background
        backgroundImage: `url(${beigebackground})`,
        fontFamily: "'Arial', sans-serif",
    },
    heading: {
        fontSize: "28px",
        color: "#d66b4d", // Coral color
        marginBottom: "20px",
    },
    createAccountButton: {
        color: "black", 
        fontSize: "16px",
        cursor: "pointer",
        background: "none",
        border: "none", 
        textDecoration: "none", 
        transition: "text-decoration 0.2s ease-in-out",
        marginTop: "10px",
    },    
    formContainer: {
        background: "#fffaf2", // Light beige box
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        width: "350px",
        display: "flex",
        flexDirection: "column",
    },
    label: {
        fontSize: "16px",
        color: "#5a7d5a", // Soft green
        marginBottom: "8px",
        textAlign: "left",
    },
    input: {
        width: "100%",
        padding: "12px",
        marginBottom: "15px",
        border: "2px solid #d9c2a3", // Soft beige border
        borderRadius: "8px",
        fontSize: "16px",
    },
    button: {
        backgroundColor: "#5a7d5a", // Soft green button
        color: "white",
        fontSize: "16px",
        padding: "12px",
        borderRadius: "8px",
        cursor: "pointer",
        border: "none",
        transition: "background 0.3s",
    },
    errorMessage: {
        color: '#d66b4d',
        margin: '10px 0',
        fontWeight: 'bold',
        padding: '10px',
        backgroundColor: 'rgba(214, 107, 77, 0.1)',
        borderRadius: '8px',
        textAlign: 'center',
        marginBottom: '15px'
    },
    userIdContainer: {
        marginTop: "20px",
        padding: "10px",
        backgroundColor: "rgba(90, 125, 90, 0.1)",
        borderRadius: "8px",
        color: "#5a7d5a",
    }
};

export default Login;

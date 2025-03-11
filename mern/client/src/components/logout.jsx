import React from 'react';
import { useNavigate } from "react-router-dom";
import { setUserId } from "../main";

export function Logout() {
    const navigate = useNavigate(); // Allows programmatic navigation

    const handleLogout = () => { //WHAT ABOUT HITTING THE BACK BUTTON?
        setUserId(null); //if the user ID is null, then they cannot access the home page
        navigate("/"); // Navigate to the login page
    };
    return (
        <div onClick={handleLogout}
            style={{
            color: "black",
            textDecoration: "underline"
            }}>
            <button>
                Logout
            </button>
        </div>
);
};

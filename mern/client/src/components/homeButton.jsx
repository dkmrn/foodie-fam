import React from 'react';
import { useNavigate } from "react-router-dom";
import { setUserId } from "../main";

export function HomeButton() {
    const navigate = useNavigate(); // Allows programmatic navigation

    const handleLogout = () => { 
        navigate("/goToHomepage"); 
    };
    return (
        <div onClick={handleLogout}
            style={{
            color: "black",
            textDecoration: "underline"
            }}>
            <button>
                Home
            </button>
        </div>
);
};

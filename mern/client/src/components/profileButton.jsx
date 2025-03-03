import { Link } from "react-router-dom";
import React, {useState} from 'react';

export function ProfileButton() {
return (
    <Link to="/myProfile">
        <div style={{
            color: "black",
            textDecoration: "underline"
        }}>
            <button>
                My Profile
            </button>
            
        </div>
    </Link>
);
};

import React, {useState} from 'react';

export function Login() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const toggleLoginState = () => {
        setIsLoggedIn(!isLoggedIn);
    };
return (
    <div>
        <button onClick={toggleLoginState}
            style={{
                color: "red",
                textDecoration: "underline"
            }}
            >
            {isLoggedIn ? "Logout" : "Login" }
            </button>
    </div>
);
};

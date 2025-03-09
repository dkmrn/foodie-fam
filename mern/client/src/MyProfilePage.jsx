import { MyProfile } from "./components/MyProfile";
import './components/backgroundStyle.css';
import { getUserId } from "./main";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";




const MyProfilePage = () => {
    const navigate = useNavigate();
    const userId = getUserId();


    //ifyou have no userID you cannot access homepage
    useEffect(() => {
        if (!userId) {
        navigate("/"); // Redirect to login page
        }
    }, [userId, navigate]);

    return (
        <div>
            <h1>this is the profile page</h1>
            <MyProfile />
        </div>
    )
}

export default MyProfilePage;

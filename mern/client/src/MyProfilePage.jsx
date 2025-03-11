import { MyProfile } from "./components/MyProfile";
import './components/backgroundStyle.css';
import { getUserId } from "./main";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { Logout } from "./components/logout";
import { HomeButton } from "./components/homeButton";



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
        <div className="container">
            <header className="header text-center py-6">
                <h1 className="text-3xl font-bold text-[#d66b4d]">Create a Post</h1>
                <p className="text-lg text-[#7a5a31]">View your posts and groups here!</p>

                {/* Left side buttons stacked */}
                <div className="button-group">
                    <div className="btn-container logout-button">
                        <Logout />
                    </div>

                    <div className="btn-container home-button">
                        <HomeButton />
                    </div>
                </div>
            </header>

            <MyProfile />
        </div>

    )
}

export default MyProfilePage;

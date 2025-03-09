import { CreatePost } from "./components/CreatePost";
import React, { useEffect } from "react";
import './components/backgroundStyle.css';
import { getUserId } from "./main";
import { useNavigate } from "react-router-dom";
import { Logout } from "./components/logout";
import { HomeButton } from "./components/homeButton";

const CreatePostPage = () => {
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
            <CreatePost />

            <div className="logout-button">
                <Logout />
            </div>

            <div className="home-button">
                <HomeButton />
            </div>
            
        </div>

    )
}

export default CreatePostPage;

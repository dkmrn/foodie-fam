import { CreatePost } from "./components/CreatePost";
import React from "react";
import './components/backgroundStyle.css';
import { getUserId } from "./main";
import { useNavigate } from "react-router-dom";



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
        </div>
    )
}

export default CreatePostPage;

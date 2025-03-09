import React, { useEffect, useState } from "react";
import './MyProfile.css';
import { getUserId } from "../main";
import { getProfile } from "../api/Profiles";
import { getPost } from "../api/Posts";

export function MyProfile() {

    const [profile, setProfile] = useState(null);
    const [myPosts, setMyPosts] = useState([]);
    const [joinedPosts, setJoinedPosts] = useState([]);

    useEffect(() =>
    {
        async function fetchProfile(userId)
        {
            console.log("User Id: ",userId);
            try
            {
                const profile = await getProfile(userId);
                setProfile(profile);
            }
            catch(error)
            {
                console.error("Failed to fetch profile:", error);
            }
        }
        fetchProfile(getUserId())
    },[]);
    console.log(profile);

    useEffect(() =>
    {
        if (!profile || !profile.myPosts) return; // Ensure profile is loaded
        async function fetchMyPosts()
        {
            try
            {
                for (const myPost of profile.myPosts)
                    {
                        const post = await getPost(myPost);
                        setMyPosts(prevPosts => [...prevPosts, post]);
                    }
            }
            catch(error)
            {
                console.error("Failed to fetch my posts:", error);
            }
        }
        fetchMyPosts();
    },[profile]);
    console.log(myPosts);

    useEffect(() =>
        {
            if (!profile || !profile.myPosts) return; // Ensure profile is loaded
            async function fetchJoinedPosts()
            {
                try
                {
                    for (const joinedPost of profile.myJoinedPosts)
                        {
                            const post = await getPost(joinedPost);
                            setJoinedPosts(prevPosts => [...prevPosts, post]);
                        }
                }
                catch(error)
                {
                    console.error("Failed to fetch joined posts:", error);
                }
            }
            fetchJoinedPosts();
        },[profile]);
    console.log(joinedPosts);


return (
    <div className="profile">
        <img
         src="https://i.pinimg.com/736x/16/d2/f5/16d2f5457a587aea199b8c412eeedcd7.jpg"
         />
         </div>
   
);
}

export default MyProfile;
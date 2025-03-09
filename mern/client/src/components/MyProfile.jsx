import React, { useEffect, useState } from "react";
import './MyProfile.css';
import { getUserId } from "../main";
import { getProfile } from "../api/Profiles";
import { getPost } from "../api/Posts";
import Post from "./Post";

export function MyProfile() {
    const [profile, setProfile] = useState(null);
    const [myPosts, setMyPosts] = useState([]);
    const [joinedPosts, setJoinedPosts] = useState([]);
    const [activeTab, setActiveTab] = useState("myPosts"); // Default to showing my posts
    const [loading, setLoading] = useState(true);

    // Fetch profile data
    useEffect(() => {
        async function fetchProfile(userId) {
            try {
                setLoading(true);
                const profileData = await getProfile(userId);
                setProfile(profileData);
            } catch(error) {
                console.error("Failed to fetch profile:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProfile(getUserId());
    }, []);

    // Fetch my posts
    useEffect(() => {
        if (!profile || !profile.myPosts) return;
        
        async function fetchMyPosts() {
            try {
                setMyPosts([]); // Clear previous posts to avoid duplicates
                const postsPromises = profile.myPosts.map(postId => getPost(postId));
                const postsData = await Promise.all(postsPromises);
                setMyPosts(postsData.filter(post => post !== "Not found"));
            } catch(error) {
                console.error("Failed to fetch my posts:", error);
            }
        }
        
        fetchMyPosts();
    }, [profile]);

    // Fetch joined posts
    useEffect(() => {
        if (!profile || !profile.myJoinedPosts) return;
        
        async function fetchJoinedPosts() {
            try {
                setJoinedPosts([]); // Clear previous posts to avoid duplicates
                const postsPromises = profile.myJoinedPosts.map(postId => getPost(postId));
                const postsData = await Promise.all(postsPromises);
                setJoinedPosts(postsData.filter(post => post !== "Not found"));
            } catch(error) {
                console.error("Failed to fetch joined posts:", error);
            }
        }
        
        fetchJoinedPosts();
    }, [profile]);

    // Toggle between My Posts and Joined Posts
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    if (loading) {
        return <div className="loading">Loading profile...</div>;
    }

    if (!profile) {
        return <div className="error">Could not load profile. Please try again later.</div>;
    }

    return (
        <div className="profile-container">
            {/* Profile Header */}
            <div className="profile-header">
                <div className="profile-picture">
                    <img
                        src="https://randomuser.me/api/portraits/men/1.jpg"
                        alt="Profile"
                    />
                </div>
                <div className="profile-info">
                    <h1>{profile.myName}</h1>
                    <p><strong>Location:</strong> {profile.myLocation}</p>
                    <p><strong>Bio:</strong> {profile.myBio}</p>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="profile-tabs">
                <button 
                    className={activeTab === "myPosts" ? "active-tab" : ""} 
                    onClick={() => handleTabChange("myPosts")}
                >
                    My Posts ({myPosts.length})
                </button>
                <button 
                    className={activeTab === "joinedPosts" ? "active-tab" : ""} 
                    onClick={() => handleTabChange("joinedPosts")}
                >
                    Joined Posts ({joinedPosts.length})
                </button>
            </div>

            {/* Posts Grid */}
            <div className="grid">
                {activeTab === "myPosts" ? (
                    myPosts.length > 0 ? (
                        myPosts.map((post, index) => (
                            <Post key={index} post={post} />
                        ))
                    ) : (
                        <p className="no-posts">You haven't created any posts yet.</p>
                    )
                ) : (
                    joinedPosts.length > 0 ? (
                        joinedPosts.map((post, index) => (
                            <Post key={index} post={post} />
                        ))
                    ) : (
                        <p className="no-posts">You haven't joined any posts yet.</p>
                    )
                )}
            </div>
        </div>
    );
}

export default MyProfile;
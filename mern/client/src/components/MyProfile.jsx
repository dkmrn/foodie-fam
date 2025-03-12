import React, { useEffect, useState } from "react";
import './MyProfile.css';
import { getUserId } from "../main";
import { getProfile } from "../api/Profiles";
import { getPost, deletePost, removeParticipant } from "../api/Posts";
import Post from "./Post";
import p1 from './profiles/p1.png';
import p2 from './profiles/p2.png';
import p3 from './profiles/p3.png';
import p4 from './profiles/p4.png';
import p5 from './profiles/p5.png';
import p6 from './profiles/p6.png';

const profileImages = [p1, p2, p3, p4, p5, p6];

export function MyProfile() {
    const [profile, setProfile] = useState(null);
    const [myPosts, setMyPosts] = useState([]);
    const [joinedPosts, setJoinedPosts] = useState([]);
    const [activeTab, setActiveTab] = useState("myPosts");
    const [loading, setLoading] = useState(true);
    const [removingPosts, setRemovingPosts] = useState(new Set());
    const [refreshing, setRefreshing] = useState(false);
    const [profilePic, setProfilePic] = useState(null);

    // Function to fetch all data
    const fetchAllData = async () => {
        setRefreshing(true);
        try {
            const userId = getUserId();
            const profileData = await getProfile(userId);
            setProfile(profileData);

            //set profile pic
            setProfilePic(profileImages[profileData.myImageIndex]);
            
            // Fetch my posts
            if (profileData.myPosts && profileData.myPosts.length > 0) {
                const postsPromises = profileData.myPosts.map(postId => getPost(postId));
                const postsData = await Promise.all(postsPromises);
                setMyPosts(postsData.filter(post => post !== "Not found"));
            } else {
                setMyPosts([]);
            }
            
            // Fetch joined posts
            if (profileData.myJoinedPosts && profileData.myJoinedPosts.length > 0) {
                const joinedPostsPromises = profileData.myJoinedPosts.map(postId => getPost(postId));
                const joinedPostsData = await Promise.all(joinedPostsPromises);
                console.log(joinedPostsData);
                setJoinedPosts(joinedPostsData.filter(post => post !== "Not found"));
            } else {
                setJoinedPosts([]);
            }
        } catch (error) {
            console.error("Failed to refresh data:", error);
        } finally {
            setRefreshing(false);
            setLoading(false);
        }
    };

    // Initial data load
    useEffect(() => {
        fetchAllData();
    }, []);

    // Toggle between My Posts and Joined Posts
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleDeletePost = async (postId) => {
        console.log("Deleting post: ", postId.toString());
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                // Add post to removing set to trigger animation
                setRemovingPosts(prev => new Set([...prev, postId]));
                
                // Wait for animation
                await new Promise(resolve => setTimeout(resolve, 300));
                
                // Delete from database
                await deletePost(postId);
                
                // Reload the page instead of just refreshing data
                window.location.reload();
            } catch (error) {
                console.error("Failed to delete post:", error);
                // Remove from removing set in case of error
                setRemovingPosts(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(postId);
                    return newSet;
                });
            }
        }
    };

    const handleLeaveGroup = async (postId) => {
        if (window.confirm("Are you sure you want to leave this group?")) {
            try {
                // Add post to removing set to trigger animation
                setRemovingPosts(prev => new Set([...prev, postId]));
                
                // Wait for animation
                await new Promise(resolve => setTimeout(resolve, 300));
                
                // Remove participant from database
                await removeParticipant(postId, getUserId());
                
                // Reload the page instead of just refreshing data
                window.location.reload();
            } catch (error) {
                console.error("Failed to leave group:", error);
                // Remove from removing set in case of error
                setRemovingPosts(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(postId);
                    return newSet;
                });
            }
        }
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
                        src={profilePic}
                        alt="profile picture"
                    />
                </div>
                <div className="profile-info">
                    <h1>{profile.myName}</h1>
                    <p><strong>Location:</strong> {profile.myLocation}</p>
                    <p><strong>Bio:</strong> {profile.myBio}</p>
                </div>
            </div>

            {/* Tab Navigation with Refresh Button */}
            <div className="profile-tabs-container">
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
                <button 
                    className={`refresh-button ${refreshing ? 'refreshing' : ''}`}
                    onClick={fetchAllData}
                    disabled={refreshing}
                >
                    {refreshing ? 'Refreshing...' : 'Refresh'}
                </button>
            </div>

            {/* Refreshing indicator */}
            {refreshing && (
                <div className="refresh-indicator">
                    <div className="refresh-spinner"></div>
                    <p>Refreshing data...</p>
                </div>
            )}

            {/* Posts Grid */}
            <div className="two-column-grid">
                {activeTab === "myPosts" ? (
                    myPosts.length > 0 ? (
                        myPosts.map((post, index) => (
                            <div 
                                className={`post-wrapper ${removingPosts.has(post._id) ? 'removing' : ''}`}
                                key={`my-post-${post._id}-${index}`}
                            >
                                <Post 
                                    post={post}
                                    isProfileView={true}
                                    isMyPost={true}
                                    onDelete={() => handleDeletePost(post._id)}
                                />
                            </div>
                        ))
                    ) : (
                        <p className="no-posts">You haven't created any posts yet.</p>
                    )
                ) : (
                    joinedPosts.length > 0 ? (
                        joinedPosts.map((post, index) => (
                            <div 
                                className={`post-wrapper ${removingPosts.has(post._id) ? 'removing' : ''}`}
                                key={`joined-post-${post._id}-${index}`}
                            >
                                <Post 
                                    post={post}
                                    isProfileView={true}
                                    isMyPost={false}
                                    onLeave={() => handleLeaveGroup(post._id)}
                                />
                            </div>
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
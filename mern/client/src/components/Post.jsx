import './postPage.css';
import { getName } from '../api/Profiles';
import { useState, useEffect } from 'react';
import { getUserId } from '../main'; // Make sure to import this
import { addParticipant } from '../api/Posts'; // Make sure to import this
import { useNavigate } from "react-router-dom"; // use to "refresh" page
import { getProfile } from '../api/Profiles';
import p1 from './profiles/p1.png';
import p2 from './profiles/p2.png';
import p3 from './profiles/p3.png';
import p4 from './profiles/p4.png';
import p5 from './profiles/p5.png';
import p6 from './profiles/p6.png';

const profileImages = [p1, p2, p3, p4, p5, p6];

function Content({ post }) {

    // const { name, location, date, time } = post;

    const restaurant = getRestaurant(post);
    const address = getAddress(post);
    const date = getDate(post);
    const time = getTime(post);
    const caption = getCaption(post); //(optional) additional info
    const postId = getPostId(post);
    const numJoined = post.participants.length;
    const additionalInfo = getPostAdditionalInfo(post);

    return (
        <>
            <div className="post-content" style={{ fontSize: 'min(3vw, 3vh)' }}>
                <div className="optional-text" style={{
                    marginBottom: '1%'
                }}>
                    <h1>{caption}</h1>
                </div>
                <div className="logistics" style={{
                    marginBottom: 'min(30%, 60px)'
                }}>
                    <h1><b>restaurant: </b>{restaurant}</h1>
                    <h1><b>address: </b>{address}</h1>
                    <h1><b>date: </b>{date}</h1>
                    <h1><b>time: </b>{time}</h1>
                    <h1 style={{ marginBottom: '10px' }}><b># of people joined: </b>{numJoined}</h1>
                    <h1 style={{ color: 'coral'}}><b>foodie note: </b>{additionalInfo}</h1>
                </div>
            </div>
        </>
    )
}

function getCaption(post) {
    return "";
}

function getRestaurant(post) {
    return post.name;
}

function getAddress(post) {
    return post.location;
}

function getDate(post) {
    return post.date;
}

function getTime(post) {
    return post.time;
}

function getPostId(post)
{
    return post._id.toString();
}

function getPostAdditionalInfo(post)
{
    return post.additionalInfo;
}


//function getUsername() {
//    return "joycejeoung";
//}



export default function DummyPost({post, isProfileView, isMyPost, onDelete, onLeave}) {   
   // const username = getUsername();
   const navigate = useNavigate(); // use to "refresh" page

   //const { name, location, date, time } = post;
   const [name, setName] = useState("");
   const [profilePic, setProfilePic] = useState("");
   const userId = getUserId();  // Get current user's ID
   const isPostCreator = post.listerId === userId;  // Check if user is the creator
   const [isJoined, setIsJoined] = useState(false);
   const [loading, setLoading] = useState(true);


   useEffect(() => {
    
    async function checkJoined(postId) 
    {
        try
        {
            const hasJoined = post.participants.includes(userId);
            setIsJoined(hasJoined);
        }
        catch(error)
        {
            console.error("Failed to check if user has joined post:", error);
        }
    }
    

      async function fetchName(listerId) {
        try {
          const listerName = await getName(listerId);
          const profile = await getProfile(listerId);
          setName(listerName);
          setProfilePic(profileImages[profile.myImageIndex]);
          console.log(profileImages[profile.myImageIndex]);

        }
        catch(error) {
          console.error("Failed to get name from post:", error);
        }
      }
      checkJoined(post._id);
      fetchName(post.listerId);
    }, []);

    function handleClick() {
        const postId = post._id;
        
        console.log("Attempting to join post:", postId);
        console.log("Current user:", userId);
        
        addParticipant(postId, userId)
            .then(result => {
                console.log("Successfully joined the post:", result);
                navigate(0); // "refreshes" page by redirecting to itself
            })
            .catch(error => {
                console.error("Failed to join post:", error);
            });
    }

    if (isJoined && !isProfileView)
    {
        return null;
    }
    
    return (
        <div style={{
            width: 'min(50vw, 50vh)', 
            height: 'min(50vw, 50vh)', 
            borderRadius: '16%', 
            backgroundColor: "white",
            border: '5px solid rgb(14, 7, 66)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            overflow: 'hidden',
            position: 'relative',
        }}>
            {/*profile banner*/}
            <div style={{
                padding: '6%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                height: '20%',
                background: 'coral'
            }}>
                {/*profile picture icon*/}
                <img 
                    src={profilePic}
                    alt="profile picture"
                    style={{
                        width: 'min(5vw,5vh)',
                        height: 'min(5vw,5vh',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        marginRight: '4%'
                    }}
                />
                <span style={{ fontSize: 'min(3vw, 3vh)' }}>
                    {name}
                </span>
            </div>

            {/*post content*/}
            <div className="post-content" style={{
                padding: '10%',
                justifyContent: 'center',
                height: 'auto',
                overflowY: 'auto'
            }}>
                <Content post ={post}/>
            </div>

            {/* Action buttons */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                position: 'absolute', // Position this container
                bottom: 'min(4vw, 4vh, 16px)',
            }}>
                {/* Show different buttons based on context */}
                {isProfileView ? (
                    isMyPost ? (
                        <button 
                            onClick={onDelete}
                            style={{ 
                                fontSize: 'min(2.5vw, 2.5vh, 16px)',
                                backgroundColor: 'lightgreen',
                                color: 'green',
                                padding: 'min(1vw, 1vh, 10px) min(3vw, 3vh, 20px)',
                                borderRadius: 'min(4vw, 4vh, 30px)',
                                fontWeight: 'bold',
                                border: '7px solid darkgreen',
                                cursor: 'pointer',
                                transition: 'background 0.3s, transform 0.2s',
                                maxWidth: '80%',
                                minWidth: 'min(30%, 120px)'
                            }}
                        >
                            <b>Delete Post</b>
                        </button>
                    ) : (
                        <button 
                            onClick={onLeave}
                            style={{ 
                                fontSize: 'min(2.5vw, 2.5vh, 16px)',
                                backgroundColor: 'lightgreen',
                                color: 'green',
                                padding: 'min(1vw, 1vh, 10px) min(3vw, 3vh, 20px)',
                                borderRadius: 'min(4vw, 4vh, 30px)',
                                fontWeight: 'bold',
                                border: '7px solid darkgreen',
                                cursor: 'pointer',
                                transition: 'background 0.3s, transform 0.2s',
                                maxWidth: '80%',
                                minWidth: 'min(30%, 120px)'
                            }}
                        >
                            <b>Leave Group</b>
                        </button>
                    )
                ) : (
                    !isPostCreator && (
                        <button 
                            onClick={handleClick}
                            style={{ 
                                fontSize: 'min(2.5vw, 2.5vh, 16px)',
                                backgroundColor: 'lightgreen',
                                color: 'green',
                                padding: 'min(1vw, 1vh, 10px) min(3vw, 3vh, 20px)',
                                borderRadius: 'min(4vw, 4vh, 30px)',
                                fontWeight: 'bold',
                                border: '7px solid darkgreen',
                                cursor: 'pointer',
                                transition: 'background 0.3s, transform 0.2s',
                                maxWidth: '80%',
                                minWidth: 'min(30%, 120px)'
                            }}
                        >
                            <b>save me a seat!</b>
                        </button>
                    )
                )}
            </div>
        </div>
    );
}
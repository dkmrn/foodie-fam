import './postPage.css';
import { getProfile } from '../api/Profiles';
import { getName } from '../api/Profiles';
import { useState, useEffect } from 'react';
import { getUserId } from '../main'; // Make sure to import this
import { addParticipant } from '../api/Posts'; // Make sure to import this

function Content({ post }) {

    // const { name, location, date, time } = post;

    const restaurant = getRestaurant(post);
    const address = getAddress(post);
    const date = getDate(post);
    const time = getTime(post);
    const caption = getCaption(post); //(optional) additional info
    const postId = getPostId(post);
    const numJoined = post.participants.length;

    return (
        <>
            <div className="post-content" style={{ fontSize: 'min(3vw, 3vh)' }}>
                <div className="optional-text" style={{
                    marginBottom: '5%'
                }}>
                    <h1>{caption}</h1>
                </div>
                <div className="logistics">
                    <h1><b>restaurant: </b>{restaurant}</h1>
                    <h1><b>address: </b>{address}</h1>
                    <h1><b>date: </b>{date}</h1>
                    <h1><b>time: </b>{time}</h1>
                    <h1><b># of people joined: </b>{numJoined}</h1>
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

//function getUsername() {
//    return "joycejeoung";
//}



export default function DummyPost({post, isProfileView, isMyPost, onDelete, onLeave}) {   
   // const username = getUsername();

   //const { name, location, date, time } = post;
   const [name, setName] = useState("");
   const userId = getUserId();  // Get current user's ID
   const isPostCreator = post.listerId === userId;  // Check if user is the creator

   useEffect(() => {
    async function fetchName(listerId) {
        try {
            const listerName = await getName(listerId);
            setName(listerName);
        }
        catch(error) {
          console.error("Failed to get name from post:", error);
        };
      };
      fetchName(post.listerId);
    }, []);

    function handleClick() {
        const postId = post._id;
        
        console.log("Attempting to join post:", postId);
        console.log("Current user:", userId);
        
        addParticipant(postId, userId)
            .then(result => {
                console.log("Successfully joined the post:", result);
            })
            .catch(error => {
                console.error("Failed to join post:", error);
            });
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
            overflow: 'hidden'
        }}>
            {/*profile banner*/}
            <div style={{
                padding: '6%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                height: '20%',
                background: 'lightsteelblue'
            }}>
                {/*profile picture icon*/}
                <img 
                    src="https://randomuser.me/api/portraits/men/1.jpg"
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
                justifyContent: 'center'
            }}>
                <Content post ={post}/>
            </div>

            {/* Action buttons */}
            <div style={{
                padding: '5%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                height: '20%',
                justifyContent: 'center',
                background: 'lightsteelblue',
                marginTop: 'auto',
                gap: '10px' // Add space between buttons
            }}>
                {/* Show different buttons based on context */}
                {isProfileView ? (
                    isMyPost ? (
                        <button 
                            onClick={onDelete}
                            style={{ 
                                fontSize: 'min(3vw, 3vh)',
                                backgroundColor: '#ff4444',
                                color: 'white',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            <b>Delete Post</b>
                        </button>
                    ) : (
                        <button 
                            onClick={onLeave}
                            style={{ 
                                fontSize: 'min(3vw, 3vh)',
                                backgroundColor: '#ff8800',
                                color: 'white',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            <b>Leave Group</b>
                        </button>
                    )
                ) : (
                    !isPostCreator && (
                        <button 
                            onClick={handleClick}
                            style={{ fontSize: 'min(3vw, 3vh)' }}
                        >
                            <b>save me a seat!</b>
                        </button>
                    )
                )}
            </div>
        </div>
    );
}
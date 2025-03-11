import Post from "./components/Post";
import { GoToCreate } from "./components/Create";
import { Logout } from "./components/logout";
import  { ProfileButton } from "./components/profileButton";
import { ReportButton } from "./components/reportButton";
import { useEffect, useState } from 'react';
import { fetchPosts } from "./api/Posts";
import './components/backgroundStyle.css';
import {SubmitReport} from "./components/SubmitReport";
import DummyPost from "./components/Post";
import { getUserId } from "./main";
import { useNavigate } from "react-router-dom";
import { HomeButton } from "./components/homeButton";

// Post data structure
/*
    _id: "someMongoDBId",
    name: "restaurant name",
    location: "restaurant location",
    date: "the date",
    time: "the time",
    listerId: "id of user who created post",
    participants: [] 

*/

// hello test

const App = () => {
  // Sample array of items 
  // NEED TO UPDATE THIS ACCORDING TO EACH NEW POST
  const users = ["Katia", "Joyce", "Amanda", "Daya", "Joaquin"];

  const [isReportOpen, setIsReportOpen] = useState(false);
  const openReport = () => {
    setIsReportOpen(true);
  }
  const closeReport = () => {
    setIsReportOpen(false);
  }

  const [postArray, setPostArray] = useState([]);

  const navigate = useNavigate();
  const userId = getUserId();


  //this is to make sure when you have no userID you cant access homepage
  useEffect(() => {
    if (!userId) {
      navigate("/"); // Redirect to login page
    }
  }, [userId, navigate]);

  useEffect(() => {
    async function getPostArray() {
      try {
        const allPosts = await fetchPosts();
        const filteredPosts = allPosts.filter(post => post.listerId !== userId);
        setPostArray(filteredPosts);
      } catch(error) {
        console.error("Failed to fetch posts:", error);
      }
    }
    getPostArray();
  }, [userId]);  // Added userId as dependency

  console.log(postArray);

  return (
    <div className="container">

      <header className="header">
        <h1>Find your group</h1>
        <p>Say hi!</p>


        <div className="post-button">
          <GoToCreate />
        </div>

        <div className="profile-button">
          <ProfileButton />
        </div>

        <div className="logout-button">
          <Logout />
        </div>

        <div className="report-button">
          {/* <ReportButton /> */}
          <ReportButton onClick={openReport}/>
        </div>

        <div className="home-button">
          <HomeButton />
        </div>


      </header>

      {isReportOpen && (
       <div className="popup">
         <div className="popup-inside">
           <button className="exit-report" onClick={closeReport}>
             X
           </button>
           <SubmitReport />
         </div>
       </div>
       )}

      <div className="grid">
        {postArray.length > 0 &&
        postArray.map((post,index) => (
          <Post key={index} post={post}/>
        ))}
          </div>


        <div style={{ padding: "20px", textAlign: "center" }}>
          <p><strong>User ID:</strong> {userId ? userId : "No user logged in"}</p>
        </div>
    </div>
  );
};

export default App;


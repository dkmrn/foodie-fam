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
    <div className="container bg-[#f4e9dc] min-h-screen flex flex-col items-center">
      <header className="header text-center py-6">
        <h1 className="text-3xl font-bold text-[#d66b4d]">Find your group</h1>
        <p className="text-lg text-[#7a5a31]">Say hi!</p>

        {/* Left side buttons stacked */}
        <div className="button-group">
          <div className="btn-container profile-button"><ProfileButton /></div>
          <div className="btn-container logout-button"><Logout /></div>
          <div className="btn-container report-button"> <ReportButton onClick={openReport}/></div>
          <div className="btn-container home-button"><HomeButton /></div>
        </div>

        {/* Right side button */}
        <div className="btn-container post-button"><GoToCreate /></div>


      </header>

      {/* Post Grid */}      {isReportOpen && (
       <div className="popup">
         <div className="popup-inside">
           <button className="exit-report" onClick={closeReport}>
             X
           </button>
           <SubmitReport />
         </div>
       </div>
       )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {postArray.length > 0 &&
          postArray.map((post, index) => <Post key={index} post={post} />)}
      </div>
    </div>
  );
};

export default App;
import { Outlet } from "react-router-dom";
import Post from "./components/Post";
import { GoToCreate } from "./components/Create";
import { Logout } from "./components/logout";
import  { ProfileButton } from "./components/profileButton";
import { ReportButton } from "./components/reportButton";
import { useEffect, useState } from 'react';
import { fetchPosts } from "./api/Posts";

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

  const [postArray, setPostArray] = useState([]);

  useEffect(() => 
  {
    async function getPostArray()
    {
      try
      {
        const postArray = await fetchPosts();
        setPostArray(postArray);
      }
      catch(error)
      {
        console.error("Failed to fetch posts:", error);
      };
    };
    getPostArray();
  },[]);

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
          <ReportButton />
        </div>
      </header>


      <div className="grid">

        {users.map((user,index) => (
          <div 
            key = {index}
        >
        <
          Post
          username ={user}
        />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;


import { Outlet } from "react-router-dom";
import Post from "./components/Post";
import { GoToCreate } from "./components/Create";
import { Logout } from "./components/logout";
import  { ProfileButton } from "./components/profileButton";
import { ReportButton } from "./components/reportButton";
import { useState } from 'react';




const App = () => {
  // Sample array of items 
  // NEED TO UPDATE THIS ACCORDING TO EACH NEW POST
  const users = ["Katia", "Joyce", "Amanda", "Daya", "Joaquin"];


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


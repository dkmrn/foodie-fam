import { Outlet } from "react-router-dom";
import DummyPost from "./components/dummyPost";
import { useState } from 'react';



const App = () => {
  // Sample array of items
  const items = ["Pizza", "Burger", "Pasta", "Sushi", "Tacos"];

  return (
    <div className="container">
      <header className="header">
        <h1>Find your group</h1>
        <p>Say hi!</p>
      </header>
      <div className="row">
        {items.map((item,index) => (
          <DummyPost key ={index} title={item} />
        ))}
      </div>
    </div>
  );
};

export default App;

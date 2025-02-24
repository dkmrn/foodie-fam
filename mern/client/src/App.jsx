import { Outlet } from "react-router-dom";
import DummyPost from "./components/dummyPost";
 import { GoToCreate } from "./components/dummyCreate";
import { Login } from "./components/logout";
import { useState } from 'react';




const App = () => {
  // Sample array of items 
  // NEED TO UPDATE THIS ACCORDING TO EACH NEW POST
  const items = ["test", "test", "test", "test", "test","test", "test"];

  const [expandedIndex, setExpandedIndex] = useState(null);

  const handlePostClick = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    }
      else
      {
        setExpandedIndex(index);
      }
    };

  return (
    <div className="container">
      <header className="header">
        <h1>Find your group</h1>
        <p>Say hi!</p>
        <div className="create-container">
          <GoToCreate />
        </div>
        <div className="log-box">
          <Login />
        </div>
      </header>
      <div className="grid">
        {items.map((item,index) => (
          <div 
          key = {index}
          onClick={() => handlePostClick(index)}
          style={{ cursor: 'pointer' }}
          >
          <DummyPost
          title={item} // change this to be the user name
          isExpanded={expandedIndex === index} 
          />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;


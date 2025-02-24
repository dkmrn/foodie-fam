import { Outlet } from "react-router-dom";
import DummyPost from "./components/dummyPost";
 import { GoToCreate } from "./components/dummyCreate";
import { useState } from 'react';



const App = () => {
  // Sample array of items 
  // NEED TO UPDATE THIS ACCORDING TO EACH NEW POST
  const items = ["Pizza", "Burger", "Pasta", "Sushi", "Tacos","test", "test"];

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
      </header>
      <div className="grid">
        {items.map((item,index) => (
          <div 
          key = {index}
          onClick={() => handlePostClick(index)}
          style={{ cursor: 'pointer' }}
          >
          <DummyPost
          title={item}
          isExpanded={expandedIndex === index} 
          />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;


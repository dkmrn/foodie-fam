import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import DummyPost from "./components/dummyPost";

const App = () => {
  return (
  
    <div className="container">
      <header className="header">
        <h1>Restaurant Reviews</h1>
        <p> Welcome~</p>
      </header>
      <div className="row">
      <DummyPost /> 
      <DummyPost />
      <DummyPost />
      </div>
    </div>
  );
};


export default App;


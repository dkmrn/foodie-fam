import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import {GoToCreate} from "./components/dummyCreate";
import {CreatePost} from "./components/dummyCreatePost";

// const App = () => {
//   return (
//     <div className="w-full p-6">
//       <Navbar />
//       <Outlet />
//     </div>
//   );
// };
// export default App;




const App = () => {
  return (
    <div className="w-full p-6">
      <GoToCreate />
      <CreatePost />
      <Outlet />
    </div>
  );
};
export default App;


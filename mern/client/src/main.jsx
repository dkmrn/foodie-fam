import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Record from "./components/Record";
import RecordList from "./components/RecordList";
import CreatePostPage from "./CreatePostPage";
import "./index.css";
import LoginPage from "./LoginPage";
import MyProfilePage from "./MyProfilePage";
import SubmitReportPage from "./SubmitReportPage";
import CreateAccountPage from "./CreateAccountPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  // {
  //   path: "/logout",
  //   element: <LoginPage />,
  // },
  {
    path: "/createAccount",
    element: <CreateAccountPage />
  },
  {
    path: "/create",
    element: <CreatePostPage />,
  },



  {
    path: "/tempGoToHomepage",
    element: <App />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

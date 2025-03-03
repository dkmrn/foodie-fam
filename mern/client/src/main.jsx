import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
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
  {
    path: "/submitReport",
    element: <SubmitReportPage />,
  },
  {
    path: "/myProfile",
    element: <MyProfilePage />,
  },
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

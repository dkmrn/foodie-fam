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


let storedUserId = null;

export function setUserId(userId) {
  try {
    if (userId) {
      localStorage.setItem("userId", userId); //save userId to localStorage
    } else {
      localStorage.removeItem("userId"); //clear userId on logout
    }
  } catch (error) {
    console.error("Failed to set userId:", error);
  }
}

export function getUserId() {
  return localStorage.getItem("userId"); //retrieve userId from localStorage
}

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
    path: "/goToHomepage",
    element: <App />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

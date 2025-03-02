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
    element: <App />,
    // children: [
    //   {
    //     path: "/",
    //     element: <RecordList />,
    //   },
    // ],
  },
  {
    path: "/create",
    element: <CreatePostPage />,
  },
  {
    // path: "/edit/:id",
    // element: <App />,
    // children: [
    //   {
    //     path: "/edit/:id",
    //     element: <Record />,
    //   },
    // ],
  },
  {
    // path: "/edit/:id",
    // element: <App />,
    // children: [
    //   {
    //     path: "/edit/:id",
    //     element: <Record />,
    //   },
    // ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

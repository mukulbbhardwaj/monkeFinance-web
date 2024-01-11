import React from "react";
import ReactDOM from "react-dom/client";
// import App from './App.tsx'
import "./App.css";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";

import BlogSectionPage from "./pages/BlogSectionPage.tsx";
import LearnSectionPage from "./pages/LearnSectionPage.tsx";
import AccountPage from "./pages/AccountPage.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";
import SignupPage from "./pages/auth/SignupPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element:<SignupPage/>,
  },
  {
    path: "/learn",
    element: <LearnSectionPage />,
  },
  {
    path: "/blogs",
    element: <BlogSectionPage />,
  },
  {
    path: "/account/:userId",
    element: <AccountPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

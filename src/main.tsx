import React from "react";
import ReactDOM from "react-dom/client";

// import App from './App.tsx'
import "./App.css";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import LandingPage from "./pages/LandingPage.tsx";

import BlogSectionPage from "./pages/BlogSectionPage.tsx";
import LearnSectionPage from "./pages/LearnSectionPage.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";
import SignupPage from "./pages/auth/SignupPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import LandingPage from "./pages/LandingPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: `/dashboard/:id`,
    element: <DashboardPage/>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <SignupPage />,
  },
  {
    path: "/learn",
    element: <LearnSectionPage />,
  },
  {
    path: "/blogs",
    element: <BlogSectionPage />,
  }
  
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div>
    <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);

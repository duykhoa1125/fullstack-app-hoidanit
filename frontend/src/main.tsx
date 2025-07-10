import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import UserPage from "./pages/user.tsx";
import "./styles/global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RegisterPage from "./pages/register.tsx";
import HomePage from "./pages/home.tsx";
import LoginPage from "./pages/login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage/>
      },
      {
        path: "user",
        element: <UserPage />,
      },
    ],
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
  {
    path: "login",
    element: <LoginPage/>
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>
);

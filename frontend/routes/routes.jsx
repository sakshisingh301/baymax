import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Register from "../src/pages/Register";
import LoginPage from "../src/pages/LoginPage";
import ChatPage from "../src/pages/ChatPage";

  const routes = createBrowserRouter([
    {
        path:"/",
        element:<LoginPage/>
    },
    {
        path:"/register",
        element: <Register/>
    },
    {
        path:"/chat",
        element: <ChatPage/>
    }
  ]);

  export default routes;
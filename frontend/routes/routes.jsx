import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Register from "../src/pages/Register";
import LoginPage from "../src/pages/LoginPage";

  const routes = createBrowserRouter([
    {
        path:"/",
        element:<LoginPage/>
    },
    {
        path:"/register",
        element: <Register/>
    }
  ]);

  export default routes;
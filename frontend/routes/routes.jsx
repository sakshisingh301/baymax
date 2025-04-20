import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Register from "../src/pages/Register";
import LoginPage from "../src/pages/LoginPage";
import ChatPage from "../src/pages/ChatPage";
import Results from "../src/pages/Results";
import LookupPatient from "../src/pages/LookupPatient";
import AddDetails from "../src/pages/AddDetails";

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
    },
    {
        path:"/results",
        element: <Results/>
    },
    {
      path:"/patientlookup",
      element: <LookupPatient/>
    },
    {
      path:"add-details",
      element: <AddDetails/>
    }
  ]);

  export default routes;
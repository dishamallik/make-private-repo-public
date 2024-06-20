import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Error from "../Pages/Error";
import DashBoard from "../Layout/DashBoard";
import Profile from "../UserDashboard/Profile";
import Private from "../Pages/Private";
import User from "../AdminDashboard/User";


export  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>

        },

        {
            path: '/login',
            element: <Login></Login>


        },
        {
            path: '/register',
            element: <Register></Register>

        }
      ]

    },
    {
        path: 'dashboard',
        element:<Private><DashBoard></DashBoard></Private>,

        children: [
            {
                path: 'profile',
                element:<Profile></Profile>
            },
            // admin routes
            {
                path: 'manageUsers',
                element:<User></User>

            }

        ]

    }
    ,
        {
            path: '*',
            element: <Error></Error>
           }
    
  ]);
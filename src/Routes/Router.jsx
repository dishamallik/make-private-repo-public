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

import ModeratorProfile from "../ModeratorDashboard/ModeratorProfile";
import Add from "../AdminDashboard/Add";
import AdminRoute from "./AdminRoute";
import ModAdd from "../ModeratorDashboard/ModAdd";
import Manage from "../AdminDashboard/Manage";

import UpdateItem from "../AdminDashboard/UpdateItem";
import AllSch from "../Pages/AllSch";
import ProfileA from "../AdminDashboard/ProfileA";
import Details from "../Pages/Details";
import Apply from "../Pages/Apply";
import PaymentHistory from "../Pages/PaymentHistory";
import ManageScholarships from "../ModeratorDashboard/ManageScholarships";
import AppliedScholarships from "../ModeratorDashboard/AppliedScholarships";
import ManageApplications from "../AdminDashboard/ManageApplications";
import MyApp from "../UserDashboard/MyApp";




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

        },{
            path: '/all',
            element: <AllSch></AllSch>
        },
        {
            path: '/details/:id',
            element:<Private> <Details></Details></Private>,
            // loader: (params) => fetch(`https://b9-12-server.vercel.app/menu/${params.id}`)

        },{
            path: '/apply',
            element: <Apply></Apply>
        },
        {
            path: '/paymentHistory',
            element: <PaymentHistory></PaymentHistory>
        }
      ]

    },
    {
        path: 'dashboard',
        element:<Private><DashBoard></DashBoard></Private>,

        children: [
            {
                path: 'userProfile',
                element:<Profile></Profile>

            },
           
           
            {
                path: 'myApplications',
                element:<MyApp></MyApp>

            },
           
            // admin routes
            {
                path: 'adminProfile',
                element:<AdminRoute><ProfileA></ProfileA></AdminRoute>


            },
            {
                path: 'manageUsers',
                element:<AdminRoute><User></User></AdminRoute>

            },
            {
                path: 'addScholarship',
                element:<AdminRoute><Add></Add></AdminRoute>

            },
            {
                path: 'manageScholarship',
                element:<AdminRoute><Manage></Manage></AdminRoute>

            },
            {
                path: 'UpdateItem/:id',
                element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
                
            },
            {
                path: 'manageApplications',
                element: <AdminRoute><ManageApplications></ManageApplications></AdminRoute>,
                
            },
            

            // mod routes
            {
                path: 'moderatorProfile',
                element:<ModeratorProfile></ModeratorProfile>
            },
            {
                path: 'addMScholarship',
                element:<ModAdd></ModAdd>
            },
            
            
            {
                path: 'manageScholarships',
                element:<ManageScholarships></ManageScholarships>
            },
            {
                path: 'appliedScholarships',
                element:<AppliedScholarships></AppliedScholarships>
            },
            
            

        ]

    }
    ,
        {
            path: '*',
            element: <Error></Error>
           }
    
  ]);
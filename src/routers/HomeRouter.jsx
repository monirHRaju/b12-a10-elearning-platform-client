import { createBrowserRouter } from "react-router";
import HomeLayout from "../pages/HomeLayout";
import Homepage from "../pages/Homepage";
import Courses from "../pages/Courses";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CourseDetails from "../pages/CourseDetails";
import PrivateRoute from "./PrivateRoute";
import CreateCourse from "../pages/CreateCourse";
import MyCourses from "../pages/MyCourses";
import MyEnrolled from "../pages/MyEnrolled";
import Error from "../pages/Error";
import UpdateCourse from "../pages/UpdateCourse";

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                index: true,
                element: <Homepage></Homepage>
            },
            {
                path: '/courses',
                element: <Courses></Courses>
            },
            {
                path: '/create-course',
                element: <PrivateRoute><CreateCourse></CreateCourse></PrivateRoute>
            },
            {
                path: '/course-details/:id',
                element: <PrivateRoute><CourseDetails></CourseDetails></PrivateRoute>
            },
            
            {
                path: '/update-course/:id',
                element: <PrivateRoute><UpdateCourse></UpdateCourse></PrivateRoute>
            },

            {
                path: '/dashboard',
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
            },
            {
                path: '/my-added-courses',
                element: <PrivateRoute><MyCourses></MyCourses></PrivateRoute>
            },
            {
                path: '/my-enrolled-courses',
                element: <PrivateRoute><MyEnrolled></MyEnrolled></PrivateRoute>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
        ],
        
    },
    {
        path: '/*',
        element: <Error></Error>
    },
])


export default router
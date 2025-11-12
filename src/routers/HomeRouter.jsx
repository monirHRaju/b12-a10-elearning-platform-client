import { createBrowserRouter } from "react-router";
import HomeLayout from "../pages/HomeLayout";
import Homepage from "../pages/Homepage";
import Courses from "../pages/Courses";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CourseDetails from "../pages/CourseDetails";
import PrivateRoute from "./PrivateRoute";

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
                path: '/course-details/:id',
                // loader: ({params}) => fetch(`http://localhost:3000/courses/${params}`),
                element: <CourseDetails></CourseDetails>
            },
            {
                path: '/dashboard',
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
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
    }
])


export default router
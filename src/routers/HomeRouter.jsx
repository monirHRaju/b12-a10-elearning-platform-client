import { createBrowserRouter } from "react-router";
import HomeLayout from "../pages/HomeLayout";
import Homepage from "../pages/Homepage";
import Courses from "../pages/Courses";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CourseDetails from "../pages/CourseDetails";
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";
import CreateCourse from "../pages/CreateCourse";
import MyCourses from "../pages/MyCourses";
import MyEnrolled from "../pages/MyEnrolled";
import Error from "../pages/Error";
import UpdateCourse from "../pages/UpdateCourse";
import About from "../pages/About";
import Contact from "../pages/Contact";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardIndex from "../pages/dashboard/DashboardIndex";
import AdminUsers from "../pages/dashboard/AdminUsers";
import AdminPayments from "../pages/dashboard/AdminPayments";
import TutorCourses from "../pages/dashboard/TutorCourses";
import TutorStudents from "../pages/dashboard/TutorStudents";
import TutorPayments from "../pages/dashboard/TutorPayments";
import StudentDashboard from "../pages/dashboard/StudentDashboard";

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
                element: <CourseDetails></CourseDetails>
            },
            
            {
                path: '/update-course/:id',
                element: <PrivateRoute><UpdateCourse></UpdateCourse></PrivateRoute>
            },

            {
                path: '/dashboard',
                element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
                children: [
                    { index: true, element: <DashboardIndex /> },
                    {
                        path: 'admin/users',
                        element: (
                            <RoleRoute allowedRoles={['admin']}>
                                <AdminUsers />
                            </RoleRoute>
                        ),
                    },
                    {
                        path: 'admin/payments',
                        element: (
                            <RoleRoute allowedRoles={['admin']}>
                                <AdminPayments />
                            </RoleRoute>
                        ),
                    },
                    {
                        path: 'tutor/courses',
                        element: (
                            <RoleRoute allowedRoles={['tutor', 'admin']}>
                                <TutorCourses />
                            </RoleRoute>
                        ),
                    },
                    {
                        path: 'tutor/students',
                        element: (
                            <RoleRoute allowedRoles={['tutor', 'admin']}>
                                <TutorStudents />
                            </RoleRoute>
                        ),
                    },
                    {
                        path: 'tutor/payments',
                        element: (
                            <RoleRoute allowedRoles={['tutor', 'admin']}>
                                <TutorPayments />
                            </RoleRoute>
                        ),
                    },
                    {
                        path: 'student',
                        element: (
                            <RoleRoute allowedRoles={['student']}>
                                <StudentDashboard />
                            </RoleRoute>
                        ),
                    },
                ],
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
            
            {
                path: '/about',
                element: <About></About>
            },
            {
                path: '/contact',
                element: <Contact></Contact>
            },

        ],
        
    },
    {
        path: '/*',
        element: <Error></Error>
    },
])


export default router
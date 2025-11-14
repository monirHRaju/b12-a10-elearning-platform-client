import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import useAxiosSecure from '../hooks/useAxiosSecure';
import MyContainer from '../components/MyContainer';
import CourseList from '../components/CourseList';

const MyEnrolled = () => {
    const {user} = use(AuthContext)
        const [myCourses, setMyCourses] = useState([])
        const [loading, setLoading] = useState(true)
        const axiosSecure = useAxiosSecure()
    
    
        useEffect(()=>{
            axiosSecure.get(`/my-enrolls?email=${user.email}`)
            .then(data => {
                setMyCourses(data.data)
                setLoading(false)
                // console.log(myCourses)
            })
        }, [user, axiosSecure])

        if(loading){
            return <div>Please wait ... Loading ... <span className="loading loading-spinner text-secondary"></span></div>
        }

        return (
            <MyContainer>
            <h1 className='text-4xl font-semibold my-15 text-center'>Manage Enrolled Courses</h1>
                <div className="overflow-x-auto">
            <table className="table">
            {/* head */}
            <thead>
                <tr>
                
                <th>Title</th>
                <th>Price</th>
                <th>Level</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                
                {/* row 1 */}
                {myCourses.map( course => <CourseList key={course._id} course={course}></CourseList>)}
            
            </tbody>
            
            
            </table>
        </div>
        
                
            </MyContainer>
        );
};

export default MyEnrolled;
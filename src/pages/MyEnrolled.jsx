import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import useAxiosSecure from '../hooks/useAxiosSecure';
import MyContainer from '../components/MyContainer';
import CourseList from '../components/CourseList';
import MyEnrolledList from '../components/MyEnrolledList';
import Loading from '../components/Loading';

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
            return <Loading />
        }

        return (
            <MyContainer>
            <h1 className='text-4xl font-semibold my-15 text-center text-accent'>Manage Enrolled <span className="text-primary">Courses</span></h1>
                <div className="overflow-x-auto">
            <table className="table mb-[300px]">
            {/* head */}
            <thead>
                <tr>
                
                <th>Title</th>
                <th>Price</th>
                <th>Level</th>
                </tr>
            </thead>
            <tbody>
                
                {/* row 1 */}
                {myCourses.map( course => <MyEnrolledList key={course._id} course={course}></MyEnrolledList>)}

            </tbody>
            
            
            </table>
        </div>
        
                
            </MyContainer>
        );
};

export default MyEnrolled;
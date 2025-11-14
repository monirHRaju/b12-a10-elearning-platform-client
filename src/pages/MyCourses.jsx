import React, { use, useEffect, useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { AuthContext } from '../context/AuthContext';
import CourseList from '../components/CourseList';
import MyContainer from '../components/MyContainer';

const MyCourses = () => {
    const [loading, setLoading] = useState(true)
    const {user} = use(AuthContext)
    const [myCourses, setMyCourses] = useState([])
    const axiosSecure = useAxiosSecure()


    useEffect(()=>{
        axiosSecure.get(`/my-courses?email=${user.email}`)
        .then(data => {
            setMyCourses(data.data)
             setLoading(false)
            // console.log(myCourses)
        })
    }, [user, axiosSecure, myCourses])



    if(loading){
            return <div>Please wait ... Loading ... <span className="loading loading-spinner text-secondary"></span></div>
        }
    return (
        <MyContainer>
          <h1 className='text-4xl font-semibold my-15 text-center'>Manage Added Courses</h1>
             <div className="overflow-x-auto">
        <table className="table mb-[300px]">
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

export default MyCourses;
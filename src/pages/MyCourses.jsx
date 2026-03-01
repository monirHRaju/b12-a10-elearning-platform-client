import React, { use, useEffect, useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { AuthContext } from '../context/AuthContext';
import CourseList from '../components/CourseList';
import MyContainer from '../components/MyContainer';
import Loading from '../components/Loading';

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
            return <Loading />
        }
    return (
        <MyContainer>
          <h1 className='text-4xl font-semibold my-15 text-center text-accent'>Manage Added <span className="text-primary">Courses</span></h1>
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
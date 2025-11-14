import React, { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';
import MyContainer from '../components/MyContainer';
import useAxios from '../hooks/useAxios';

const Courses = () => {
    
    const [courses, setCourses] = useState([])
    const axiosInstance = useAxios()
    
    useEffect(()=>{
        axiosInstance.get('/courses')
        .then(data => {
            setCourses(data.data)
        })
        .catch()
    },[axiosInstance])

    
    return (
        <MyContainer>
            <h1 className='text-4xl font-bold text-primary text-center my-8'>All Courses</h1>
            <div className='flex justify-between'>
                <div>
                    Filter
                </div>
                <select>
                    <option>Filter by Rating</option>
                    <option>Filter by Download</option>
                </select>
               
                
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7'>
                {courses.map(course => <CourseCard key={course._id} course={course}></CourseCard>)}
            </div>
        </MyContainer>
    );
};

export default Courses;
import React, { useEffect, useState } from 'react';
import CourseCard from './CourseCard';
import MyContainer from './MyContainer';
import { motion } from "framer-motion";
import useAxios from '../hooks/useAxios';


const FeaturedCourses = () => {
    const [courses, setCourses] = useState([])
    const axiosInstance = useAxios()
    
    useEffect(()=>{
        axiosInstance.get('/featured-courses')
        .then(data => {
            setCourses(data.data)
        })
        .catch()
    },[axiosInstance])

    return (
        <MyContainer
        
        >
            <h1 className='text-5xl font-bold text-center my-15'>Featured Courses</h1>
            <motion.div 
            initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: false }}
                
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'>
                {courses.map(course => <CourseCard key={course._id} course={course}></CourseCard>)}
            </motion.div>            
        </MyContainer>
    );
};

export default FeaturedCourses;
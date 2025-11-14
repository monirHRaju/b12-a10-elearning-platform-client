import React, { use } from 'react';
import CourseCard from './CourseCard';
import MyContainer from './MyContainer';
import { motion } from "framer-motion";


const featuredCoursesPromise = fetch('http://localhost:3000/featured-courses').then(res => res.json())

const FeaturedCourses = () => {
    const courses = use(featuredCoursesPromise)
    // console.log(courses)
    return (
        <MyContainer
        
        >
            <h1 className='text-4xl font-bold text-primary text-center my-8'>Featured Courses</h1>
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
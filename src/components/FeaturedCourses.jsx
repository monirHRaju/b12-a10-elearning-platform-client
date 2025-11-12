import React, { use } from 'react';
import CourseCard from './CourseCard';
import MyContainer from './MyContainer';


const featuredCoursesPromise = fetch('http://localhost:3000/featured-courses').then(res => res.json())

const FeaturedCourses = () => {
    const courses = use(featuredCoursesPromise)
    // console.log(courses)
    return (
        <MyContainer>
            <h1 className='text-4xl font-bold text-primary text-center my-8'>Featured Courses</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'>
                {courses.map(course => <CourseCard key={course._id} course={course}></CourseCard>)}
            </div>            
        </MyContainer>
    );
};

export default FeaturedCourses;
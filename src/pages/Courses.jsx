import React, { use } from 'react';
import CourseCard from '../components/CourseCard';
import MyContainer from '../components/MyContainer';

const featuredCoursesPromise = fetch('http://localhost:3000/courses').then(res => res.json())
const Courses = () => {
    const courses = use(featuredCoursesPromise)
    console.log(courses);
    
    return (
        <MyContainer>
            <h1 className='text-4xl font-bold text-primary text-center my-8'>All Courses</h1>
            <div>
                filter
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7'>
                {courses.map(course => <CourseCard key={course._id} course={course}></CourseCard>)}
            </div>
        </MyContainer>
    );
};

export default Courses;
import React from 'react';
import Banner from '../components/Banner';
import FeaturedCourses from '../components/FeaturedCourses';
import WhyChooseUs from '../components/WhyChooseUs';
import TopInstructor from '../components/TopInstructor';


const Homepage = () => {
    
    return (
        <div>
            <Banner></Banner>
            <FeaturedCourses></FeaturedCourses>
            <WhyChooseUs></WhyChooseUs>
            <TopInstructor></TopInstructor>
        </div>
    );
};

export default Homepage;
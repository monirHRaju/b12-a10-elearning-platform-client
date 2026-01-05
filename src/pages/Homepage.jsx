import React from 'react';
import Banner from '../components/Hero';
import FeaturedCourses from '../components/FeaturedCourses';
import WhyChooseUs from '../components/WhyChooseUs';
import TopInstructor from '../components/TopInstructor';
import Hero from '../components/Hero';


const Homepage = () => {
    
    return (
        <div>
            <Hero></Hero>
            <FeaturedCourses></FeaturedCourses>
            <WhyChooseUs></WhyChooseUs>
            <TopInstructor></TopInstructor>
        </div>
    );
};

export default Homepage;
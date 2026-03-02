import React from 'react';
import Banner from '../components/Hero';
import FeaturedCourses from '../components/FeaturedCourses';
import WhyChooseUs from '../components/WhyChooseUs';
import TopInstructor from '../components/TopInstructor';
import Hero from '../components/Hero';


const Homepage = () => {
    
    return (
        <>
            <Hero></Hero>
            <FeaturedCourses></FeaturedCourses>
            <WhyChooseUs></WhyChooseUs>
            <TopInstructor></TopInstructor>
        </>
    );
};

export default Homepage;
import React from 'react';
import Hero from '../components/Hero';
import FeaturedCourses from '../components/FeaturedCourses';
import StatsSection from '../components/StatsSection';
import CourseCategories from '../components/CourseCategories';
import WhyChooseUs from '../components/WhyChooseUs';
import TopInstructor from '../components/TopInstructor';
import Testimonials from '../components/Testimonials';

const Homepage = () => {
    return (
        <>
            <Hero />
            <FeaturedCourses />
            <StatsSection />
            <CourseCategories />
            <WhyChooseUs />
            <TopInstructor />
            <Testimonials />
        </>
    );
};

export default Homepage;
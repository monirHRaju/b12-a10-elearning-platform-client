import React from 'react';
import MyContainer from './MyContainer';
import { FaCar } from 'react-icons/fa';
import { GiDirectionSigns } from 'react-icons/gi';
import { GrUserExpert } from 'react-icons/gr';
import { motion } from "framer-motion";
import { FaGaugeHigh } from 'react-icons/fa6';

const WhyChooseUs = () => {
    return (
        <motion.div 
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: false }}
                className='my-20'>
            <MyContainer >
                <h1 className='text-5xl font-bold my-20 text-center'>Why Choose Us?</h1>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                    <div className='transition duration-300 ease-in-out p-5 rounded-2xl shadow-lg hover:bg-primary hover:text-white'>
                        <FaGaugeHigh size={60} />
                        <h3 className='text-2xl font-semibold my-3'>100+ High Impact Courses</h3>
                        <p>Explore practical, career-boosting courses that deliver real skills and results.</p>
                    </div>
                    
                    <div className='transition duration-300 ease-in-out p-5 rounded-2xl shadow-lg hover:bg-primary hover:text-white'>
                        <GiDirectionSigns size={60} />
                        <h3 className='text-2xl font-semibold my-3'>Flexible Learning</h3>
                        <p>Learn anytime, anywhere with courses designed to fit your schedule.</p>
                    </div>
                    
                    <div className='transition duration-300 ease-in-out p-5 rounded-2xl shadow-lg hover:bg-primary hover:text-white'>
                        <GrUserExpert size={60} />
                        <h3 className='text-2xl font-semibold my-3'>Expert Instructor</h3>
                        <p>Gain knowledge from experienced instructors dedicated to your learning success.</p>
                    </div>
                    
                    
                </div>
            </MyContainer>
        </motion.div>
    );
};

export default WhyChooseUs;


//career-boost certify
// 100+ High Impact Courses
// Flexible Learning
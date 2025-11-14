import React from 'react';
import MyContainer from './MyContainer';
import { motion } from "framer-motion";
import { FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const TopInstructor = () => {
    return (
        <div className='my-20'>
            <MyContainer >
                <h1 className='text-5xl font-bold my-20 text-center'>Our Top Instructors</h1>
                <motion.div 
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: false }}   // animate only once
                className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                    <div className='flex flex-col gap-5 items-center bg-sky-500 transition duration-300 ease-in-out p-5 rounded-2xl shadow-lg hover:bg-primary hover:text-white'>
                        <img src="https://img-c.udemycdn.com/user/200_H/166445758_d566.jpg" className='w-[150px] rounded-full' alt="" />
                        <h3 className='text-2xl font-semibold my-3 dark:text-secondary'>Matt Gerry</h3>
                        <div className='flex gap-6'>
                            <FaFacebook className='cursor-pointer'></FaFacebook>
                            <FaXTwitter className='cursor-pointer'></FaXTwitter>
                            <FaLinkedin className='cursor-pointer'></FaLinkedin>
                            <FaYoutube className='cursor-pointer'></FaYoutube>
                        </div>
                    </div>
                    
                    <div className='flex flex-col gap-5 items-center bg-sky-500 transition duration-300 ease-in-out p-5 rounded-2xl shadow-lg hover:bg-primary hover:text-white'>
                        <img src="https://img-c.udemycdn.com/user/200_H/143478232_13ee_3.jpg" className='w-[150px] rounded-full' alt="" />
                        <h3 className='text-2xl font-semibold my-3 dark:text-secondary'>Imran Teli</h3>
                        <div className='flex gap-6'>
                            <FaFacebook className='cursor-pointer'></FaFacebook>
                            <FaXTwitter className='cursor-pointer'></FaXTwitter>
                            <FaLinkedin className='cursor-pointer'></FaLinkedin>
                            <FaYoutube className='cursor-pointer'></FaYoutube>
                        </div>
                    </div>
                         
                    <div className='flex flex-col gap-5 items-center bg-sky-500 transition duration-300 ease-in-out p-5 rounded-2xl shadow-lg hover:bg-primary hover:text-white'>
                        <img src="https://img-c.udemycdn.com/user/200_H/7799204_2091_5.jpg" className='w-[150px] rounded-full' alt="" />
                        <h3 className='text-2xl font-semibold my-3 dark:text-secondary'>Jonas Schm</h3>
                        <div className='flex gap-6'>
                            <FaFacebook className='cursor-pointer'></FaFacebook>
                            <FaXTwitter className='cursor-pointer'></FaXTwitter>
                            <FaLinkedin className='cursor-pointer'></FaLinkedin>
                            <FaYoutube className='cursor-pointer'></FaYoutube>
                        </div>
                    </div>

                    
                    
                </motion.div>
            </MyContainer>
        </div>
    );
};

export default TopInstructor;
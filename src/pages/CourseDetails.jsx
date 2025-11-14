import React, { use, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import MyContainer from '../components/MyContainer';
import { FaClock, FaStar, FaUser } from 'react-icons/fa';
import { BiSolidTachometer } from 'react-icons/bi';
import useAxios from '../hooks/useAxios';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';

const CourseDetails = () => {
    const {user} = use(AuthContext)
    const [course, setCourse] = useState([])
    const {id} = useParams()
    const axiosInstance = useAxios() 
    const navigate = useNavigate()
    // console.log(id)
    
    useEffect(()=> {
        axiosInstance.get(`/courses/${id}`)
        .then( data => { 
            console.log('after getting data', data.data)
            setCourse(data.data[0])
        })
    
    }, [id, axiosInstance])
    
    const handleEnroll = () => {
        const enrollData = {
            ...course, enrolled_by: user.email
        } 
        axiosInstance.post('/enroll', enrollData)
        .then(data  => {
            console.log(data.data)
            navigate('/my-enrolled-courses')

            Swal.fire({
            title: "Enrolled Successfully!",
            position: "top-end",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
            });
        })
        .catch(err => {
            Swal.fire({
            title: `Failed! Already Enrolled. ${err}`,
            position: "top-end",
            icon: "failed",
            showConfirmButton: false,
            timer: 1500
            });
        })
    }
    return (
        <>
            <div className='bg-blue-500 mt-12'>
                <MyContainer>
                    <div className='p-10 h-[400px]'>
                        <h1 className='text-5xl font-black my-8'>{course.title}</h1>
                        
                        <div className='my-4 flex gap-2 '>
                            <span className='border border-white text-sm p-1 mr-1 rounded-md text-white flex gap-2 items-center'><FaStar></FaStar> {course.rating} </span>
                            <span className='border border-white text-sm p-1 mr-1 rounded-md text-white flex gap-2 items-center'><FaClock></FaClock> {course.duration}</span>
                            <span className='border border-white text-sm p-1 mr-1 rounded-md text-white flex gap-2 items-center'><FaUser></FaUser>{course.students}</span>
                            <span className='border border-white text-sm p-1 mr-1 rounded-md text-white flex gap-2 items-center'><BiSolidTachometer />{course.difficulty_level}</span>
                        </div>
                    </div>
                </MyContainer>
            </div>
            
            <div className='bg-gray-100 pb-12'>
                <MyContainer>
                    <div className='flex flex-col md:flex-row gap-10 justify-start'>
                    <div className='border-2 border-white bg-white/30 p-5 rounded-lg shadow-md md:mt-[-120px]'>
                        <p className='font-semibold border-b-2 border-blue-600'>Description</p>
                        <hr />
                        <p>{course.description}</p>
                    </div>
                    <div className='border-2 border-white bg-white/30 p-5 rounded-lg shadow-md md:mt-[-70px]'>
                        <img src={course.image} className='w-[300px] h-[200px]' alt="" />
                        <h1 className='text-2xl font-bold text-secondary'>$ {course.price}</h1>
                        <button onClick={handleEnroll} className='btn w-full btn-primary'>Enroll Now</button>
                    </div>
                </div>
                </MyContainer>
            </div>       
        </>
    );
};

export default CourseDetails;
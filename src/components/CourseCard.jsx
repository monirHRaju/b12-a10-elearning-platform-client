import React, { use } from 'react';
import { BiSolidTachometer } from 'react-icons/bi';
import { FaClock, FaStar, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import useAxios from '../hooks/useAxios';

const CourseCard = ({course}) => {
    const {_id, title, description, isFeatured, price, image, duration, category, instructor_name, students, difficulty_level, rating} = course
    const {user} = use(AuthContext)
    const axiosSecure = useAxios()
    const navigate = useNavigate()
    
    const handleEnroll = () => {
            if(!user){
                Swal.fire({
                title: "Please register/login to enroll",
                position: "top-end",
                icon: "failed",
                showConfirmButton: false,
                timer: 1500
                });

                return
            }

            const enrollData = {
                ...course, enrolled_by: user.email
            } 
            axiosSecure.post('/enroll', enrollData)
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
        <div className='border border-gray-300 rounded-lg shadow-md p-5'>
            <img src={image} className='h-[300px] rounded-2xl' alt="" />
            <Link to={`/course-details/${_id}`} className='hover:text-green-500'>
                <h1 className='text-2xl font-bold my-2'>{title}</h1>
            </Link>
            
            <p>{description.split(" ").slice(0, 10).join(" ") + "..."}</p>
            <p className='text-[12px] text-gray-500 my-3'>

                {instructor_name} | {category}   {
                isFeatured&& <span  className='p-2 bg-green-100 text-green-500'>Featured</span> 
            }

            </p>
            <div className='my-4 flex gap-2 '>
                <span className='border border-gray-300 text-sm p-1 mr-1 rounded-md text-gray-400 flex gap-2 items-center'><FaStar></FaStar> {rating} </span>
                <span className='border border-gray-300 text-sm p-1 mr-1 rounded-md text-gray-400 flex gap-2 items-center'><FaClock></FaClock> {duration}</span>
                <span className='border border-gray-300 text-sm p-1 mr-1 rounded-md text-gray-400 flex gap-2 items-center'><FaUser></FaUser>{students}</span>
                <span className='border border-gray-300 text-sm p-1 mr-1 rounded-md text-gray-400 flex gap-2 items-center'><BiSolidTachometer />{difficulty_level}</span>
            </div>
            
            <div className='flex justify-between items-center'>
                <h3 className='font-semibold'>$ {price}</h3>
                <button 
                onClick={handleEnroll} 
                className='btn btn-primary btn-outline'>Enroll now</button>
            </div>
            
        </div>
    );
};

export default CourseCard;
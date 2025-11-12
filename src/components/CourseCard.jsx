import React from 'react';
import { BiSolidTachometer } from 'react-icons/bi';
import { FaClock, FaStar, FaUser } from 'react-icons/fa';
import { Link } from 'react-router';

const CourseCard = ({course}) => {
    const {_id, title, description, isFeatured, price, image, duration, category, instructor_name, students, difficulty_level, rating} = course

    return (
        <div className='border border-gray-300 rounded-lg shadow-md p-5'>
            <img src={image} className='h-[300px] rounded-2xl' alt="" />
            <Link to={`/course-details/${_id}`} className='hover:text-green-500'>
                <h1 className='text-2xl font-bold my-2'>{title}</h1>
            </Link>
            
            <p>{description.trim(1,7)}...</p>
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
                <Link to={'/enroll'} className='btn btn-primary btn-outline'>Enroll now</Link>
            </div>
            
        </div>
    );
};


// title
// "React for Beginners"
// image
// "https://i.ibb.co.com/wZF0RQQG/Clash-Royale.webp"
// price
// 29.99
// duration
// "6h 30m"
// category
// "Web Development"
// description
// "Learn React from scratch and build dynamic web applications using comp…"
// isFeatured
// true
// instructor_id
// "6757c1f1a1b2c3d4e5f60101"
// instructor_name
// "John Doe"
// email
// "john.doe@example.com"
// photo
// "https://randomuser.me/api/portraits/men/32.jpg"
// difficulty_level
// "Beginner"
// rating
// 4.7
// students
// 2400


export default CourseCard;
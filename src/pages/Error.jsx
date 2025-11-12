import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router';

const Error = () => {
    return (
        <div className='flex justify-center items-center flex-col'>
            <img width="200" height="200" src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-404-no-code-flaticons-flat-flat-icons.png" alt="external-404-no-code-flaticons-flat-flat-icons"/>
            <h1 className='text-4xl font-black text-warning my-10'>oops! Page Not Found</h1>
            <Link to={'/'} className='btn btn-success text-2xl'> <FaArrowLeft></FaArrowLeft> Back to Homepage</Link>
        </div>
    );
};

export default Error;
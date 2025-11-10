import React from 'react';

const CourseCard = ({course}) => {
    const {_id, title, isFeatured, image} = course

    return (
        <div className='border-gray-300 rounded-lg shadow-md p-5'>
            <img src={image} className='h-[300px]' alt="" />
            <h1>{title}</h1>
        </div>
    );
};

export default CourseCard;
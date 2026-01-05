import React from "react";
import { BiSolidTachometer } from "react-icons/bi";
import { FaClock, FaStar, FaUser } from "react-icons/fa";
import { Link } from "react-router";

const CourseCard = ({ course }) => {
  const {
    _id,
    title,
    description,
    isFeatured,
    price,
    image,
    duration,
    category,
    instructor_name,
    students,
    difficulty_level,
    rating,
  } = course;



  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      
      {/* IMAGE */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="h-52 w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {isFeatured && (
          <span className="absolute top-3 left-3 bg-primary text-white text-xs px-3 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <p className="text-xs text-gray-500 mb-1">
          {category} | By {instructor_name}
        </p>

        <Link to={`/course-details/${_id}`}>
          <h2 className="text-lg font-semibold leading-snug hover:text-secondary dark:text-primary transition">
            {title}
          </h2>
        </Link>

        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {description}
        </p>

        {/* META */}
        <div className="flex flex-wrap gap-3 mt-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <FaStar className="text-yellow-400" /> {rating}
          </span>
          <span className="flex items-center gap-1">
            <FaClock /> {duration}
          </span>
          <span className="flex items-center gap-1">
            <FaUser /> {students}
          </span>
          <span className="flex items-center gap-1">
            <BiSolidTachometer /> {difficulty_level}
          </span>
        </div>

        {/* FOOTER */}
        <div className="mt-5 flex items-center justify-between">
          <p className="text-xl font-bold text-primary">
            ${price}
          </p>

          <Link to={`/course-details/${_id}`}
            className="px-4 py-2 text-sm font-medium rounded-full bg-primary text-white hover:bg-primary/90 transition"
          > Enroll Now </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

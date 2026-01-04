import React, { use } from "react";
import { BiSolidTachometer } from "react-icons/bi";
import { FaClock, FaStar, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import useAxios from "../hooks/useAxios";

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

  const { user } = use(AuthContext);
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  const handleEnroll = () => {
    if (!user) {
      Swal.fire({
        title: "Please login to enroll",
        position: "top-end",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const enrollData = { ...course, enrolled_by: user.email };

    axiosSecure
      .post("/enroll", enrollData)
      .then(() => {
        navigate("/my-enrolled-courses");
        Swal.fire({
          title: "Enrolled Successfully!",
          position: "top-end",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(() => {
        Swal.fire({
          title: "Already Enrolled",
          position: "top-end",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

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
          {category} • {instructor_name}
        </p>

        <Link to={`/course-details/${_id}`}>
          <h2 className="text-lg font-semibold leading-snug hover:text-primary transition">
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

          <button
            onClick={handleEnroll}
            className="px-4 py-2 text-sm font-medium rounded-full bg-primary text-white hover:bg-primary/90 transition"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

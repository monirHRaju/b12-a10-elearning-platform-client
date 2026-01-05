import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import MyContainer from "./MyContainer";
import { motion } from "framer-motion";
import useAxios from "../hooks/useAxios";

const FeaturedCourses = () => {
  const [courses, setCourses] = useState([]);
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance
      .get("/featured-courses")
      .then((data) => {
        setCourses(data.data);
      })
      .catch();
  }, [axiosInstance]);

  return (
    <div className="bg-base-200 py-10">
      <h2 className="text-3xl sm:text-4xl font-bold text-center py-16">
        Featured <span className="text-primary">Courses</span>
      </h2>
      <MyContainer>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: false }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-4"
        >
          {courses.map((course) => (
            <CourseCard key={course._id} course={course}></CourseCard>
          ))}
        </motion.div>
      </MyContainer>
    </div>
  );
};

export default FeaturedCourses;

import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div className="hero bg-base-200 ">
      <motion.div 
      initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: false }}   // animate only once
      
      className="hero-content flex-col lg:flex-row py-10">
        <img
          src="https://goedu.ac/wp-content/uploads/2025/04/banner-goEdu-Student-Sucess-and-GEAC-Certified-1-1.webp"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">Start shaping your future learning online!</h1>
          <p className="py-6">
            Goedu online Courses, your best choice to find the best online courses in Bangladesh Now officially GEAC accredited. Learn at your convenience. Quality professional courses with certificates and varieties of topics.
          </p>
          <Link to={'/courses'} className="btn btn-primary">Browse All</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Banner;

import React from 'react';
import { motion } from 'framer-motion';
import MyContainer from './MyContainer';
import { Link } from 'react-router';

// Variants for staggered text animation
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/70 text-white overflow-hidden py-20 md:py-32">
      {/* Subtle background blobs for modern floating effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-96 h-96 bg-secondary/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-base-300/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-secondary/30 rounded-full blur-3xl"></div>
      </div>

      <MyContainer className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text & CTA */}
          <div className="space-y-8">
            <motion.div
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.2 }}
              className="space-y-4"
            >
              <motion.h1
                variants={textVariants}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              >
                Unlock Your<br />
                <span className="text-secondary">Future</span> with<br />
                Expert Courses
              </motion.h1>

              <motion.p
                variants={textVariants}
                className="text-xl md:text-2xl opacity-90 max-w-lg"
              >
                Learn in-demand skills from world-class instructors. Flexible, affordable, and designed for real success.
              </motion.p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 max-w-xl"
            >
              <input
                type="text"
                placeholder="Search for courses... (e.g. Web Development, Design)"
                className="input input-lg w-full bg-white/20 backdrop-blur-md border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <button className="btn btn-lg bg-secondary text-white hover:bg-secondary/90 border-0">
                Search Courses
              </button>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link to={'/courses'} className="btn btn-lg bg-white text-primary cursor-pointer hover:bg-gray-100 shadow-xl">
                Browse All Courses
              </Link>
              <button className="btn btn-lg btn-outline text-white border-white cursor-pointer hover:bg-white hover:text-primary">
                Start Free Trial
              </button>
            </motion.div>
          </div>

          {/* Right: Floating Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
          >
            {/* Replace with your own hero illustration or use one from below */}
            <img
              src="https://cdn.dribbble.com/userupload/18299431/file/original-f8debff3cccd7aaa05caa8a5d8d8ea70.jpg"
              alt="Students learning online with laptops and floating elements"
              className="w-full max-w-2xl drop-shadow-2xl rounded-2xl"
            />
          </motion.div>
        </div>
      </MyContainer>
    </section>
  );
};

export default Hero;
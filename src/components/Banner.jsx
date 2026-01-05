import { motion } from "framer-motion";
import heroImg from "/hero-student.png";

const Banner = () => {
  return (
    <section className="relative overflow-hidden">
      
      {/* SPLIT BACKGROUND (Desktop only) */}
      <div className="absolute inset-0 hidden lg:grid grid-cols-2">
        <div className="bg-base-200"></div>
        <div className="bg-primary"></div>
      </div>

      {/* MOBILE BACKGROUND */}
      <div className="absolute inset-0 bg-base-200 lg:hidden"></div>

      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary leading-tight">
            Build Your Skills <br />
            on the{" "}
            <span className="inline-block bg-secondary text-white px-3 py-1 rounded-xl">
              Best
            </span>{" "}
            Platform
          </h1>

          <p className="mt-5 text-gray-600 max-w-md mx-auto lg:mx-0">
            Find Unlimited Courses That Match Your Niche to Hasten the
            Process of Developing Your Skills
          </p>

          {/* CTA */}
          <div className="mt-7 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="btn bg-primary text-white border-none w-full sm:w-auto">
              Get Started
            </button>

            <button className="btn btn-ghost text-accent flex items-center gap-2 w-full sm:w-auto justify-center">
              <span className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center">
                ▶
              </span>
              Video Play
            </button>
          </div>

          {/* STUDENTS */}
          <div className="mt-8 flex items-center gap-4 justify-center lg:justify-start">
            <div className="flex -space-x-3">
              <img src="/user1.jpg" className="w-9 h-9 rounded-full border-2 border-white" />
              <img src="/user2.jpg" className="w-9 h-9 rounded-full border-2 border-white" />
              <img src="/user3.jpg" className="w-9 h-9 rounded-full border-2 border-white" />
            </div>
            <p className="text-sm text-accent">
              <span className="font-bold">10,000+</span> Active Student
            </p>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative max-w-xs sm:max-w-sm lg:max-w-none">
            <img
              src={heroImg}
              alt="Student"
              className="rounded-2xl w-full lg:h-[480px] object-cover"
            />

            {/* DECOR (Desktop only) */}
            <div className="hidden lg:block absolute -top-6 -right-6 w-20 h-20 border border-white/40 rounded-full"></div>
            <div className="hidden lg:block absolute bottom-6 -left-6 w-16 h-16 bg-secondary rounded-full opacity-50"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;

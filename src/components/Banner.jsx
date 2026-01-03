import { motion } from "framer-motion";
import heroImg from "/hero-student.png";

const Banner = () => {
  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* SPLIT BACKGROUND */}
      <div className="absolute inset-0 grid grid-cols-2">
        <div className="bg-base-200"></div>
        <div className="bg-primary"></div>
      </div>

      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center lg:text-left"
        >
          <p className="text-sm text-accent mb-4 flex items-center justify-center lg:justify-start gap-2">
            <span className="text-secondary">✳</span> 30 Days free trial
          </p>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary leading-tight">
            Build Your Skills <br />
            on the{" "}
            <span className="inline-block bg-secondary text-white px-3 py-1 rounded-xl">
              Best
            </span>{" "}
            Platform
          </h1>

          <p className="mt-6 text-gray-600 max-w-md mx-auto lg:mx-0">
            Find Unlimited Courses That Match Your Niche to Hasten the
            Process of Developing Your Skills
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="btn bg-primary text-white border-none">
              Get Started
            </button>

            <button className="btn btn-ghost text-accent flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center">
                ▶
              </span>
              Video Play
            </button>
          </div>

          {/* STUDENTS */}
          <div className="mt-10 flex items-center gap-4 justify-center lg:justify-start">
            <div className="flex -space-x-3">
              <img src="/user1.jpg" className="w-10 h-10 rounded-full border-2 border-white" />
              <img src="/user2.jpg" className="w-10 h-10 rounded-full border-2 border-white" />
              <img src="/user3.jpg" className="w-10 h-10 rounded-full border-2 border-white" />
            </div>
            <p className="text-sm text-accent">
              <span className="font-bold">10.00+</span> Active Student
            </p>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative bg-base-300 rounded-3xl p-4">
            <img
              src={heroImg}
              alt="Student"
              className="rounded-2xl w-[280px] sm:w-[340px] lg:w-[380px]"
            />

            {/* DECOR */}
            <div className="absolute -top-6 -right-6 w-20 h-20 border border-white/40 rounded-full"></div>
            <div className="absolute bottom-6 -left-6 w-16 h-16 bg-secondary rounded-full opacity-50"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;

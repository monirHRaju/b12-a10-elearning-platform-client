import { FaClock, FaChalkboardTeacher, FaCertificate, FaSmile } from "react-icons/fa";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.9, ease: "easeOut" },
    },
  };

  const borderVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, delay: 0.3, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-base-200 py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* SECTION TITLE */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Why <span className="text-primary">Choose Us?</span>
          </h2>
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="inline-block w-20 h-1 bg-primary mt-4 rounded-full"
          />
        </motion.div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT FEATURES */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <FeatureCard
                icon={<FaClock className="text-2xl" />}
                title="Learn at Your Own Pace"
                text="Access courses anytime and learn whenever it suits your schedule."
                color="bg-blue-100 text-blue-600"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <FeatureCard
                icon={<FaChalkboardTeacher className="text-2xl" />}
                title="Expert Instructors"
                text="Learn from experienced mentors and industry professionals."
                color="bg-purple-100 text-purple-600"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <FeatureCard
                icon={<FaCertificate className="text-2xl" />}
                title="Verified Certificates"
                text="Earn certificates that add real value to your career."
                color="bg-orange-100 text-orange-600"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <FeatureCard
                icon={<FaSmile className="text-2xl" />}
                title="Student-Focused Experience"
                text="Simple, engaging, and comfortable learning environment."
                color="bg-green-100 text-green-600"
              />
            </motion.div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <motion.div
              className="rounded-3xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                alt="Happy diverse students learning online"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Animated Decorative Border */}
            <motion.div
              variants={borderVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="absolute -top-6 -left-6 w-full h-full border-4 border-primary rounded-3xl -z-10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

/* FEATURE CARD - Enhanced with subtle hover animation */
const FeatureCard = ({ icon, title, text, color }) => {
  return (
    <motion.div
      whileHover={{ x: 10, transition: { duration: 0.3 } }}
      className="flex gap-5 bg-base-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-default border border-transparent hover:border-primary/20"
    >
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-xl text-accent">{title}</h4>
        <p className="text-accent/70 text-sm mt-2 leading-relaxed">{text}</p>
      </div>
    </motion.div>
  );
};
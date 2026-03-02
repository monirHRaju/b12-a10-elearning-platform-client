import { motion } from "framer-motion";
import MyContainer from "./MyContainer";
import { FaUsers, FaBook, FaChalkboardTeacher, FaStar } from "react-icons/fa";

const stats = [
  {
    icon: <FaUsers className="text-3xl" />,
    value: "10,000+",
    label: "Active Students",
  },
  {
    icon: <FaBook className="text-3xl" />,
    value: "500+",
    label: "Courses",
  },
  {
    icon: <FaChalkboardTeacher className="text-3xl" />,
    value: "50+",
    label: "Expert Instructors",
  },
  {
    icon: <FaStar className="text-3xl" />,
    value: "4.8",
    label: "Average Rating",
  },
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-primary text-white">
      <MyContainer>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-secondary mb-4">
                {stat.icon}
              </div>
              <span className="text-3xl md:text-4xl font-bold">{stat.value}</span>
              <span className="text-white/90 text-sm mt-1">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </MyContainer>
    </section>
  );
};

export default StatsSection;

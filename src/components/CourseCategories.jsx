import { motion } from "framer-motion";
import MyContainer from "./MyContainer";
import { Link } from "react-router";
import {
  FaCode,
  FaPalette,
  FaChartLine,
  FaMobile,
  FaLanguage,
  FaBusinessTime,
} from "react-icons/fa";

const categories = [
  {
    icon: <FaCode />,
    title: "Web Development",
    slug: "Web Development",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: <FaPalette />,
    title: "Design",
    slug: "Design",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: <FaChartLine />,
    title: "Data Science",
    slug: "Data Science",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: <FaMobile />,
    title: "Mobile Development",
    slug: "Mobile Development",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: <FaLanguage />,
    title: "Languages",
    slug: "Languages",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: <FaBusinessTime />,
    title: "Business",
    slug: "Business",
    color: "bg-secondary/10 text-secondary",
  },
];

const CourseCategories = () => {
  return (
    <section className="py-20 bg-base-100 px-4 lg:px-0">
      <MyContainer>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            Browse by <span className="text-primary">Category</span>
          </h2>
          <p className="mt-3 text-base-content/70 max-w-xl mx-auto">
            Find the right path for your learning journey
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link
                to={`/courses?category=${encodeURIComponent(cat.slug)}`}
                className="group flex flex-col items-center p-6 rounded-2xl bg-base-200 hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-3 ${cat.color} group-hover:scale-110 transition-transform`}
                >
                  {cat.icon}
                </div>
                <span className="text-sm font-medium text-center text-accent group-hover:text-primary transition-colors">
                  {cat.title}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </MyContainer>
    </section>
  );
};

export default CourseCategories;

import MyContainer from "./MyContainer";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const instructors = [
  {
    name: "Matt Gerry",
    img: "https://img-c.udemycdn.com/user/200_H/166445758_d566.jpg",
  },
  {
    name: "Imran Teli",
    img: "https://img-c.udemycdn.com/user/200_H/143478232_13ee_3.jpg",
  },
  {
    name: "Jonas Schm",
    img: "https://img-c.udemycdn.com/user/200_H/7799204_2091_5.jpg",
  },
];

const TopInstructor = () => {
  return (
    <section className="py-24 bg-base-200">
      <MyContainer>
        {/* SECTION TITLE */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Top <span className="text-primary">Instructors</span>
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            Learn from industry experts who are passionate about teaching
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructors.map((inst, index) => (
            <InstructorCard key={index} {...inst} index={index} />
          ))}
        </div>
      </MyContainer>
    </section>
  );
};

export default TopInstructor;

/* CARD */
const InstructorCard = ({ name, img, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      className="group relative bg-base-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition overflow-hidden"
    >
      {/* IMAGE */}
      <div className="relative mx-auto w-36 h-36 rounded-full overflow-hidden ring-4 ring-primary/20">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* INFO */}
      <div className="text-center mt-6">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm text-gray-500 mt-1">
          Senior Instructor
        </p>
      </div>

      {/* SOCIAL ICONS */}
      <div className="flex justify-center gap-4 mt-6 opacity-0 group-hover:opacity-100 transition">
        <SocialIcon icon={<FaFacebook />} />
        <SocialIcon icon={<FaXTwitter />} />
        <SocialIcon icon={<FaLinkedin />} />
        <SocialIcon icon={<FaYoutube />} />
      </div>

      {/* DECOR */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/10 rounded-full"></div>
    </motion.div>
  );
};

/* SOCIAL ICON */
const SocialIcon = ({ icon }) => (
  <span className="w-9 h-9 flex items-center justify-center rounded-full bg-base-200 text-primary hover:bg-primary hover:text-white transition cursor-pointer">
    {icon}
  </span>
);

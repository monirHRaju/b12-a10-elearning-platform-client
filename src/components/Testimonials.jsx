import { motion } from "framer-motion";
import MyContainer from "./MyContainer";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Developer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    text: "The courses here transformed my career. I went from beginner to landing my dream job in under a year. The instructors are incredibly supportive.",
    rating: 5,
  },
  {
    name: "Marcus Chen",
    role: "UX Designer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    text: "Flexible schedules and high-quality content. I could balance learning with my full-time job. Best investment I've made in my professional development.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Data Analyst",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    text: "Clear explanations, real-world projects, and certificates that actually matter. My employer recognized the value immediately.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-base-200 px-4 lg:px-0">
      <MyContainer>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            What Our <span className="text-primary">Students Say</span>
          </h2>
          <p className="mt-3 text-base-content/70 max-w-xl mx-auto">
            Join thousands of learners who have achieved their goals with us
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-base-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow"
            >
              <FaQuoteLeft className="text-primary/30 text-2xl mb-4" />
              <p className="text-base-content/80 leading-relaxed mb-6">{t.text}</p>
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-accent">{t.name}</h4>
                  <p className="text-sm text-base-content/60">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </MyContainer>
    </section>
  );
};

export default Testimonials;

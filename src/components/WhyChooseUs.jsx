import { FaClock, FaChalkboardTeacher, FaCertificate, FaSmile } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <section className="bg-base-200 py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* SECTION TITLE */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Why <span className="text-primary">Choose Us?</span>
          </h2>
          <span className="inline-block w-14 h-1 bg-primary mt-4 rounded-full"></span>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT FEATURES */}
          <div className="space-y-6">
            
            <FeatureCard
              icon={<FaClock />}
              title="Learn at Your Own Pace"
              text="Access courses anytime and learn whenever it suits your schedule."
              color="bg-blue-100 text-blue-600"
            />

            <FeatureCard
              icon={<FaChalkboardTeacher />}
              title="Expert Instructors"
              text="Learn from experienced mentors and industry professionals."
              color="bg-purple-100 text-purple-600"
            />

            <FeatureCard
              icon={<FaCertificate />}
              title="Verified Certificates"
              text="Earn certificates that add real value to your career."
              color="bg-orange-100 text-orange-600"
            />

            <FeatureCard
              icon={<FaSmile />}
              title="Student-Focused Experience"
              text="Simple, engaging, and comfortable learning environment."
              color="bg-green-100 text-green-600"
            />
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <img
                src="/why-choose-us-image.jpg" // replace with your image
                alt="Online Learning"
                className="w-full h-full object-cover"
              />
            </div>

            {/* DECOR BORDER */}
            <div className="absolute -top-4 -left-4 w-full h-full border-4 border-primary rounded-3xl -z-10"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

/* FEATURE CARD */
const FeatureCard = ({ icon, title, text, color }) => {
  return (
    <div className="flex gap-4 bg-base-100 p-6 rounded-xl shadow-sm hover:shadow-md transition">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-lg">{title}</h4>
        <p className="text-gray-500 text-sm mt-1">{text}</p>
      </div>
    </div>
  );
};

import MyContainer from "../components/MyContainer";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="py-24 bg-base-200">
      <MyContainer>

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="mt-4 text-gray-500">
            Have questions about courses, instructors, or support?
            We’re here to help.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* CONTACT FORM */}
          <div className="bg-base-100 rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-6">
              Send us a message
            </h2>

            <form className="space-y-5">
              <div>
                <label className="label">
                  <span className="label-text font-medium">Your Name</span>
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Email Address</span>
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Message</span>
                </label>
                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </div>

              <button className="btn btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-8">

            {/* MAP */}
            <div className="rounded-2xl overflow-hidden shadow-md h-[260px]">
              <iframe
                title="map"
                src="https://www.google.com/maps?q=Dhaka,Bangladesh&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              ></iframe>
            </div>

            {/* CONTACT INFO */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <InfoCard
                icon={<FaMapMarkerAlt />}
                title="Address"
                text="Dhaka, Bangladesh"
              />
              <InfoCard
                icon={<FaPhoneAlt />}
                title="Phone"
                text="+880 1234 567890"
              />
              <InfoCard
                icon={<FaEnvelope />}
                title="Email"
                text="support@elearning.com"
              />
            </div>
          </div>
        </div>
      </MyContainer>
    </section>
  );
};

export default Contact;

/* INFO CARD */
const InfoCard = ({ icon, title, text }) => (
  <div className="bg-base-100 rounded-xl p-6 shadow-sm hover:shadow-md transition text-center">
    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl">
      {icon}
    </div>
    <h4 className="font-semibold">{title}</h4>
    <p className="text-sm text-gray-500 mt-1">{text}</p>
  </div>
);

import { Link } from "react-router";
import MyContainer from "./MyContainer";
import {
  FaFacebook,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../assets/e-logo.png";

const Footer = () => {
  return (
    <footer className="bg-accent text-base-300 pt-20">
      <MyContainer>
        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} className="w-10" alt="e-learning" />
              <h3 className="text-2xl font-bold text-white">e-Learning</h3>
            </div>
            <p className="text-sm leading-relaxed">
              Learn anytime, anywhere with industry-ready courses taught by
              expert instructors.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-4 mt-6">
              <SocialIcon icon={<FaFacebook />} />
              <SocialIcon icon={<FaXTwitter />} />
              <SocialIcon icon={<FaLinkedin />} />
              <SocialIcon icon={<FaYoutube />} />
            </div>
          </div>

          {/* EXPLORE */}
          <FooterColumn title="Explore">
            <FooterLink to="/courses">All Courses</FooterLink>
            <FooterLink to="/dashboard">Dashboard</FooterLink>
            <FooterLink to="/create-course">Create Course</FooterLink>
            <FooterLink to="/my-enrolled-courses">My Learning</FooterLink>
          </FooterColumn>

          {/* RESOURCES */}
          <FooterColumn title="Resources">
            <FooterLink to="/">Help Center</FooterLink>
            <FooterLink to="/">Community</FooterLink>
            <FooterLink to="/">Blog</FooterLink>
            <FooterLink to="/">Guides</FooterLink>
          </FooterColumn>

          {/* LEGAL */}
          <FooterColumn title="Company">
            <FooterLink to="/">About Us</FooterLink>
            <FooterLink to="/">Contact</FooterLink>
            <FooterLink to="/">Privacy Policy</FooterLink>
            <FooterLink to="/">Terms & Conditions</FooterLink>
          </FooterColumn>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-base-300/20"></div>

        {/* COPYRIGHT */}
        <div className="py-6 text-center text-sm text-base-300">
          © {new Date().getFullYear()} e-Learning Platform. All rights reserved.
        </div>
      </MyContainer>
    </footer>
  );
};

export default Footer;

/* COMPONENTS */

const FooterColumn = ({ title, children }) => (
  <div>
    <h4 className="text-white font-semibold mb-4">{title}</h4>
    <ul className="space-y-3">{children}</ul>
  </div>
);

const FooterLink = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="text-sm hover:text-secondary transition"
    >
      {children}
    </Link>
  </li>
);

const SocialIcon = ({ icon }) => (
  <span className="w-10 h-10 rounded-full bg-base-200/10 flex items-center justify-center text-white hover:bg-primary hover:text-white transition cursor-pointer">
    {icon}
  </span>
);

import React from "react";
import logo from "../assets/e-logo.png"
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4">
      <aside className="grid-flow-col items-center">
        <img src={logo} alt="" className="w-12"/>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <FaFacebook size={30}></FaFacebook>
        <FaXTwitter size={30}></FaXTwitter>
        <FaInstagram size={30}></FaInstagram>
      </nav>
    </footer>
  );
};

export default Footer;

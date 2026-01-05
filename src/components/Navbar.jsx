import React, { use } from "react";
import { Link, useNavigate } from "react-router";
import MyContainer from "./MyContainer";
import MyNav from "./MyNav";
import ThemeToggle from "./ThemeToggle";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import logo from "../assets/e-logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, signOutUser } = use(AuthContext);

  const navlinks = (
    <>
      <MyNav to="/">Home</MyNav>
      <MyNav to="/courses">Courses</MyNav>
      <MyNav to="/about">About us</MyNav>
      <MyNav to="/contact">Contact</MyNav>
      <MyNav to="/create-course">Post a Course</MyNav>

      {!user && <MyNav to="/register">Register</MyNav>}

      {user && (
        <>
          
          <MyNav to="/my-added-courses">My Added</MyNav>
          <MyNav to="/my-enrolled-courses">My Enrolled</MyNav>
        </>
      )}
    </>
  );

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        Swal.fire({
          title: "You are Logged Out!",
          position: "top-end",
          icon: "warning",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="sticky top-0 z-50 bg-base-200/80 backdrop-blur border-b border-base-300">
      <MyContainer>
        <div className="navbar px-0 min-h-[72px]">
          
          {/* LEFT */}
          <div className="navbar-start gap-2">
            {/* Mobile Menu */}
            <div className="dropdown lg:hidden">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-base-200 rounded-box w-56"
              >
                {navlinks}
              </ul>
            </div>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="logo" className="w-9 h-9" />
              <span className="text-xl font-bold text-accent">
                e {" "} <span className="text-secondary">Learning</span>
              </span>
            </Link>
          </div>

          {/* CENTER */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal gap-1 text-accent font-medium">
              {navlinks}
            </ul>
          </div>

          {/* RIGHT */}
          <div className="navbar-end gap-2">
            {user ? (
              <button
                onClick={handleSignOut}
                className="btn bg-primary text-white border-none hover:opacity-90"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                className="btn bg-primary text-white border-none hover:opacity-90"
              >
                Login
              </Link>
            )}

            <ThemeToggle />
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default Navbar;

import React, { use } from "react";
import MyContainer from "./MyContainer";
import { Link, useNavigate } from "react-router";
import MyNav from "./MyNav";
import logo from "../assets/e-logo.png"
import ThemeToggle from "./ThemeToggle";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
const Navbar = () => {
  const navigate = useNavigate()
  const {user, signOutUser} = use(AuthContext)
    const navlinks = <>
        <MyNav to={'/'} >Home</MyNav>
        <MyNav to={'/courses'} >Courses</MyNav>
        <MyNav to={'/dashboard'}>Dashboard</MyNav>
        {
          !user&& <MyNav to={'/register'}>Register</MyNav>
        }
        {
          user&& <>
            <MyNav to={'/create-course'} >Create</MyNav>
            <MyNav to={'/my-added-courses'} >My Added</MyNav>
            <MyNav to={'/my-enrolled-courses'} >My Enrolled</MyNav>
          </>
        }
    </>

  const handleSignOut = () => {
    signOutUser()
    .then(() => {
      Swal.fire({
                      title: `You are Logged Out!`,
                      position: "top-end",
                      icon: "warning",
                      showConfirmButton: false,
                      timer: 2000
                      });
    navigate('/')
    })
    .catch(err => console.log(err.message)
    )
  }
  return (
      <MyContainer>
    <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navlinks}
            </ul>
          </div>
          <Link to={'/'} className="btn btn-ghost text-xl">
            <img src={logo} className="w-10" alt="" />
            e-Learning</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navlinks}

          </ul>
        </div>
        <div className="navbar-end">
          {
              user
                  ? <a onClick={handleSignOut} className="btn btn-primary">Sign Out</a> 
                  : <Link to="/login" className="btn btn-primary">Login</Link>
          }
         
          <ThemeToggle></ThemeToggle>
        </div>
    </div>
      </MyContainer>
  );
};

export default Navbar;

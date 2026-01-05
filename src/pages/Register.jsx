import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import useAxios from "../hooks/useAxios";
import { motion } from "framer-motion";

const Register = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { signInWithGoogle, createUser } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const handleCreateUser = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const image = e.target.image.value || "https://via.placeholder.com/150"; // fallback

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must have at least 1 uppercase, 1 lowercase letter, and be 6+ characters.");
      return;
    }
    setError("");

    createUser(email, password)
      .then((result) => {
        const newUser = { name, email, image };

        axiosInstance.post("/users", newUser).then((data) => {
          if (data.data.insertedId) {
            Swal.fire({
              title: "Account Created Successfully!",
              icon: "success",
              position: "top-end",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          navigate("/");
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Registration Failed!",
          text: err.message,
          icon: "error",
          position: "top-end",
          timer: 2500,
        });
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL || "https://via.placeholder.com/150",
        };

        axiosInstance.post("/users", newUser).then((data) => {
          if (data.data.insertedId || data.data.message) {
            Swal.fire({
              title: "Account Created & Logged In!",
              icon: "success",
              position: "top-end",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          navigate("/");
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Google Sign-Up Failed",
          text: err.message,
          icon: "error",
          position: "top-end",
          timer: 2500,
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-7xl shadow-2xl rounded-3xl overflow-hidden">
        {/* Left: Registration Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="p-10 md:p-16 flex flex-col justify-center"
        >
          <div className="max-w-md mx-auto w-full">
            <h1 className="text-4xl md:text-5xl font-bold text-accent mb-2">
              Join Us Today!
            </h1>
            <p className="text-accent/70 mb-10">
              Start your learning journey with thousands of expert-led courses
            </p>

            <form onSubmit={handleCreateUser} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-accent font-medium">Full Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-accent font-medium">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-accent font-medium">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`input input-bordered w-full focus:ring-2 ${
                    error ? "input-error" : "focus:ring-primary"
                  }`}
                />
                {error && <p className="text-error text-sm mt-2">{error}</p>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-accent font-medium">Profile Photo URL (optional)</span>
                </label>
                <input
                  type="url"
                  name="image"
                  placeholder="https://example.com/photo.jpg"
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                />
              </div>

              <button type="submit" className="btn btn-primary w-full text-white text-lg">
                Create Account
              </button>
            </form>

            <div className="divider my-8 text-accent/60">OR</div>

            <button
              onClick={handleGoogleSignIn}
              className="btn btn-outline w-full border-gray-300 hover:bg-gray-50 flex items-center gap-3 text-accent"
            >
              <svg width="20" height="20" viewBox="0 0 533 533" xmlns="http://www.w3.org/2000/svg">
                <path d="M533 261c0-19-2-37-5-55H272v104h147c-6 32-25 59-53 77l82 64c48-44 82-111 82-190z" fill="#4285f4"/>
                <path d="M272 533c73 0 135-25 180-67l-82-64c-22 15-51 24-98 24-75 0-139-51-162-121l-84 65c47 91 140 163 246 163z" fill="#34a853"/>
                <path d="M110 318c-5-16-8-33-8-51s3-35 8-51l-84-65c-37 74-37 161 0 235l84-65c-13-22-20-47-20-73z" fill="#fbbc02"/>
                <path d="M272 107c40 0 76 14 104 41l77-77C403 26 337 0 272 0 166 0 73 72 26 163l84 65c23-70 87-121 162-121z" fill="#ea4335"/>
              </svg>
              Sign up with Google
            </button>

            <p className="text-center mt-8 text-accent/70">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-primary hover:underline">
                Log in here
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Right: Hero Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden lg:block relative bg-gradient-to-br from-primary to-primary/80"
        >
          <img
            src="https://thumbs.dreamstime.com/z/diverse-team-members-collaborate-using-virtual-reality-technology-modern-office-environment-future-work-ai-406057518.jpg"
            alt="Diverse learners collaborating online with modern technology"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
          <div className="absolute bottom-12 left-12 text-white">
            <h2 className="text-4xl font-bold mb-4">Grow Without Limits</h2>
            <p className="text-xl opacity-90">Master new skills, advance your career, and join a global community of lifelong learners</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
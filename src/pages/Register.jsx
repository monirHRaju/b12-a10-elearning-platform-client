import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import useAxios from "../hooks/useAxios";
import { motion } from "framer-motion";

const Register = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null); // For image preview
  const [uploading, setUploading] = useState(false); // Loading state for upload

  const { signInWithGoogle, createUser, updateUserProfile } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const navigate = useNavigate();


  // IMGBB API KEY - Get your free key from https://api.imgbb.com/
  const IMGBB_API_KEY = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`; // REPLACE WITH YOUR KEY

  const handleGoogleSignIn = () => {
      signInWithGoogle()
        .then((result) => {
          const newUser = {
            name: result.user.displayName,
            email: result.user.email,
            image: result.user.photoURL,
          };
  
          axiosInstance.post("/users", newUser).then((data) => {
            if (data.data.insertedId || data.data.message === "User already exists") {
              Swal.fire({
                title: "Logged In Successfully!",
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
          console.log(err.message);
          Swal.fire({
            title: "Google Login Failed",
            text: err.message,
            icon: "error",
            position: "top-end",
            timer: 2000,
          });
        });
    };

  const handleCreateUser = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const imageFile = form.image.files[0];

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must have at least 1 uppercase, 1 lowercase letter, and be 6+ characters.");
      return;
    }
    setError("");

    setUploading(true);

    let imageUrl = "https://placehold.co/150";

    // Upload image to ImgBB if selected
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      try {
        const res = await fetch(`${IMGBB_API_KEY}`, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.success) {
          imageUrl = data.data.url;

        } else {
          Swal.fire({
            title: "Image Upload Failed",
            text: "Using default avatar",
            icon: "warning",
            timer: 2000,
          });
        }
      } catch (err) {
        Swal.fire({
          title: "Upload Error",
          text: "Could not upload image",
          icon: "error",
        });
        setUploading(false);
        return;
      }
    }

    // Create Firebase user
    createUser(email, password)
      .then(() => {
        const newUser = { name, email, image: imageUrl };

        axiosInstance.post("/users", newUser).then((data) => {
          if (data.data.insertedId) {
            Swal.fire({
              title: "Account Created Successfully!",
              icon: "success",
              position: "top-end",
              showConfirmButton: false,
              timer: 1500,
            })
            // Update Firebase user profile
            updateUserProfile({
              displayName: name,
              photoURL: imageUrl,
            })
            .catch((err) => console.log("Profile update error:", err))

          }
          setUploading(false);
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
        setUploading(false);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
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
              {/* Full Name */}
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

              {/* Email */}
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

              {/* Password */}
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
                  className={`input input-bordered w-full focus:ring-2 ${error ? "input-error" : "focus:ring-primary"}`}
                />
                {error && <p className="text-error text-sm mt-2">{error}</p>}
              </div>

              {/* Profile Photo Upload */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-accent font-medium">Profile Photo</span>
                </label>
                <div className="flex items-center gap-6">
                  <div className="avatar">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={preview || "https://placehold.co/150"} alt="Preview" />
                    </div>
                  </div>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                  />
                </div>
                <p className="text-sm text-accent/60 mt-2">Optional – we'll use a default if not uploaded</p>
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="btn btn-primary w-full text-white text-lg"
              >
                {uploading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Uploading & Creating...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* ... rest of your OR divider, Google button, and login link unchanged ... */}
          </div>
        </motion.div>

        {/* Right: Hero Image (unchanged) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden lg:block relative bg-gradient-to-br from-primary to-primary/80"
        >
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
            alt="Happy students learning online together"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-12 left-12 text-white">
            <h2 className="text-4xl font-bold mb-4">Learn Without Limits</h2>
            <p className="text-xl opacity-90">Join thousands of learners mastering new skills every day</p>
          </div>
        </motion.div>
        {/* ... */}
      </div>
    </div>
  );
};

export default Register;
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { motion } from 'framer-motion';

const CreateCourse = () => {
  const { user } = useContext(AuthContext);
  const [isFeatured, setIsFeatured] = useState(false);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleCreateCourse = (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const image = form.image.value;
    const price = parseFloat(form.price.value);
    const duration = form.duration.value;
    const category = form.category.value;
    const description = form.description.value;
    const difficulty_level = form.difficulty_level.value;

    const newCourse = {
      title,
      image,
      price,
      duration,
      category,
      description,
      difficulty_level,
      rating: 0,
      students: 0,
      isFeatured,
      instructor_id: user?.uid,
      instructor_name: user?.displayName || 'Instructor',
      email: user?.email,
      photo: user?.photoURL || 'https://via.placeholder.com/150',
    };

    axiosSecure.post('/courses', newCourse)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: 'Course Created Successfully!',
            text: 'Your new course is now live and ready for students.',
            icon: 'success',
            confirmButtonColor: '#006b61',
          });
          form.reset();
          navigate('/my-added-courses');
        }
      })
      .catch((err) => {
        Swal.fire({
          title: 'Failed to Create Course',
          text: err.message || 'Something went wrong',
          icon: 'error',
          confirmButtonColor: '#fe8b5c',
        });
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-200 to-base-100 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-accent mb-4">
            Create a New <span className="text-primary">Course</span>
          </h1>
          <p className="text-xl text-accent/70">
            Share your expertise and inspire learners worldwide
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-8 text-center">
            <div className="flex flex-col items-center gap-4">
              <img
                src={user?.photoURL || 'https://via.placeholder.com/120'}
                alt="Instructor"
                className="w-24 h-24 rounded-full ring-4 ring-white/30 object-cover"
              />
              <div>
                <h3 className="text-2xl font-semibold">{user?.displayName || 'Instructor'}</h3>
                <p className="opacity-90">{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <form onSubmit={handleCreateCourse} className="space-y-7">
              {/* Course Title */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-semibold text-accent">Course Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Master React in 30 Days"
                  className="input input-bordered input-lg w-full text-base focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Cover Image URL */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-semibold text-accent">Cover Image URL</span>
                </label>
                <input
                  type="url"
                  name="image"
                  required
                  placeholder="https://example.com/course-cover.jpg"
                  className="input input-bordered input-lg w-full focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Price & Duration Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg font-semibold text-accent">Price ($)</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    required
                    min="0"
                    step="0.01"
                    placeholder="49.99"
                    className="input input-bordered input-lg w-full focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg font-semibold text-accent">Duration</span>
                  </label>
                  <input
                    type="text"
                    name="duration"
                    placeholder="e.g. 8 weeks • 25 hours"
                    className="input input-bordered input-lg w-full focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-semibold text-accent">Category</span>
                </label>
                <input
                  type="text"
                  name="category"
                  required
                  placeholder="e.g. Web Development, Design, Marketing"
                  className="input input-bordered input-lg w-full focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Difficulty Level */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-semibold text-accent">Difficulty Level</span>
                </label>
                <select
                  name="difficulty_level"
                  className="select select-bordered select-lg w-full focus:ring-2 focus:ring-primary"
                  defaultValue=""
                >
                  <option value="" disabled>Select level</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Expert</option>
                </select>
              </div>

              {/* Description */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg font-semibold text-accent">Course Description</span>
                </label>
                <textarea
                  name="description"
                  rows="6"
                  required
                  placeholder="Describe what students will learn, prerequisites, and outcomes..."
                  className="textarea textarea-bordered textarea-lg w-full focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              {/* Featured Toggle */}
              <div className="flex items-center gap-4 py-4">
                <input
                  type="checkbox"
                  id="featured"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="checkbox checkbox-primary checkbox-lg"
                />
                <label htmlFor="featured" className="text-lg font-medium text-accent cursor-pointer">
                  Mark as <span className="text-secondary font-bold">Featured Course</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-full text-white text-xl font-semibold shadow-lg hover:shadow-xl transition"
                >
                  Publish Course
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateCourse;
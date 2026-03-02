import React, { use, useEffect, useState } from 'react';
import { Star, Clock, Users, Phone } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import useAxios from '../hooks/useAxios';
import ConfirmModal from '../components/ConfirmModal';

export default function CourseDetails() {
    const {user} = use(AuthContext);
    const [course, setCourse] = useState([]);
    const [showEnrollModal, setShowEnrollModal] = useState(false);
    const {id} = useParams();
    const axiosInstance = useAxios() 
    const navigate = useNavigate()
    // console.log(id)
    
    useEffect(()=> {
        axiosInstance.get(`/courses/${id}`)
        .then( data => { 
            console.log('after getting data', data.data)
            setCourse(data.data[0])
        })
    
    }, [id, axiosInstance])
    
    const handleEnroll = () => {
        setShowEnrollModal(true);
    };

    const confirmEnroll = () => {
        const enrollData = { ...course, enrolled_by: user.email };
        axiosInstance.post('/enroll', enrollData)
            .then(() => {
                toast.success("Enrolled successfully!");
                navigate('/my-enrolled-courses');
            })
            .catch(err => {
                toast.error(err?.message || "Already enrolled or failed");
            });
    };
  return (
    <>
      <ConfirmModal
        open={showEnrollModal}
        onClose={() => setShowEnrollModal(false)}
        onConfirm={confirmEnroll}
        title="Enroll in this course?"
        message="Are you sure you want to enroll?"
        confirmText="Enroll"
        cancelText="Cancel"
        variant="primary"
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="hero bg-gradient-to-br from-primary to-primary/80 text-white">
          <div className="hero-content flex-col lg:flex-row py-12 max-w-7xl mx-auto px-4">
            <div className="flex-1 text-center lg:text-left">
              <nav className="text-sm breadcrumbs mb-4">
                <ul className="text-white/80">
                  <li><Link to={'/'}>Home</Link></li>
                  <li>Course Details</li>
                </ul>
              </nav>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {course.title}
              </h1>
              <p className="text-lg mb-8 opacity-90">
                {course.title}
              </p>
              <div className="flex flex-wrap items-center gap-6 mb-8 justify-center lg:justify-start">
                <button className="btn btn-secondary btn-lg text-white">Get Started</button>
                <div className="flex items-center gap-2">
                  <div className="rating rating-lg">
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-secondary" disabled />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-secondary" disabled />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-secondary" disabled />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-secondary" disabled />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-secondary" disabled />
                  </div>
                  <span className="text-sm">No ratings yet</span>
                </div>
                <span className="text-lg">Be the first student!</span>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <img
                src={course.image}
                alt="Course banner"
                className="rounded-lg shadow-2xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - What You'll Learn & Course Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* What You'll Learn */}
            <div className="card shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4 text-accent">What You'll Learn</h2>
                <p className="mb-6 text-base-content/80">
                 {course.description}
                </p>
                
                
              </div>
            </div>

            {/* Course Content */}
            <div className="card shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-6 text-accent">Course Content</h2>
                <ul className="space-y-4">
                  <li className="collapse collapse-plus">
                    <input type="checkbox" defaultChecked />
                    <div className="collapse-title text-xl font-medium text-accent">
                      Intro To Course And Study <span className="text-sm text-base-content/60 ml-2">1hr 40min</span>
                    </div>
                    <div className="collapse-content">
                      <ul className="menu menu-compact">
                        <li className="flex justify-between text-accent"><span>Course Intro</span> <span className="text-base-content/70">30 Min</span></li>
                        <li className="flex justify-between text-accent"><span>Watch Before Start</span> <span className="text-base-content/70">0.5 Min</span></li>
                      </ul>
                    </div>
                  </li>
                  <li className="collapse collapse-plus">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium text-accent">
                      Course Fundamentals <span className="text-sm text-base-content/60 ml-2">1hr 40min</span>
                    </div>
                  </li>
                  {/* Add more sections as needed */}
                </ul>
              </div>
            </div>

            {/* Instructor */}
            <div className="card shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-6 text-accent">Instructor</h2>
                <div className="flex items-center gap-6">
                  <div className="avatar">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={course.photo} alt="Instructor" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-accent">{course.instructor_name}</h3>
                    <p className="text-base-content/70">Advanced Educator</p>
                    <div className="flex items-center gap-4 mt-2 text-base-content/70">
                      <span>75,254 Reviews</span>
                      <span>166,557 Students</span>
                      <span>20 Courses</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <div className="card shadow-xl">
              <div className="card-body">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-4xl font-bold text-primary">${course.price}</span>
                  {/* <span className="text-2xl line-through text-base-content/50">$1500</span> */}
                  <div className="badge badge-secondary badge-sm ml-auto">Limited Offer</div>
                </div>
                <button onClick={handleEnroll} className="btn btn-primary btn-lg w-full mb-3">Enroll Now</button>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2 text-base-content/70"><Clock className="w-4 h-4" /> Duration</span>
                    <span className="font-medium text-accent">{course.duration}</span>
                  </div>
                  {/* <div className="flex justify-between">
                    <span className="flex items-center gap-2"><Users className="w-4 h-4" /> Enrolled</span>
                    <span className="font-medium">Be the first!</span>
                  </div> */}
                  <div className="flex justify-between">
                    <span className="text-base-content/70">Skill level</span>
                    <div className="badge badge-primary">{course.difficulty_level}</div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base-content/70">Language</span>
                    <span className="font-medium text-accent">English</span>
                  </div>
                </div>

                <details className="collapse collapse-arrow mt-6">
                  <summary className="collapse-title text-accent">Show More</summary>
                  <div className="collapse-content">
                    <p className="text-base-content/80">Additional details...</p>
                  </div>
                </details>

                <div className="divider my-6"></div>

                <button className="btn btn-outline btn-primary w-full gap-2">
                  <Phone className="w-5 h-5" />
                  Call Us: +88-0123456789
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
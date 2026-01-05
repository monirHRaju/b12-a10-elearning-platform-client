// import React, { use, useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router';
// import MyContainer from '../components/MyContainer';
// import { FaClock, FaStar, FaUser } from 'react-icons/fa';
// import { BiSolidTachometer } from 'react-icons/bi';
// import useAxios from '../hooks/useAxios';
// import { AuthContext } from '../context/AuthContext';
// import Swal from 'sweetalert2';
// import useAxiosSecure from '../hooks/useAxiosSecure';

// const CourseDetails = () => {
//     const {user} = use(AuthContext)
//     const [course, setCourse] = useState([])
//     const {id} = useParams()
//     const axiosInstance = useAxiosSecure() 
//     const navigate = useNavigate()
//     // console.log(id)
    
//     useEffect(()=> {
//         axiosInstance.get(`/courses/${id}`)
//         .then( data => { 
//             console.log('after getting data', data.data)
//             setCourse(data.data[0])
//         })
    
//     }, [id, axiosInstance])
    
//     const handleEnroll = () => {
//         const enrollData = {
//             ...course, enrolled_by: user.email
//         } 
//         axiosInstance.post('/enroll', enrollData)
//         .then(data  => {
//             console.log(data.data)
//             navigate('/my-enrolled-courses')

//             Swal.fire({
//             title: "Enrolled Successfully!",
//             position: "top-end",
//             icon: "success",
//             showConfirmButton: false,
//             timer: 1500
//             });
//         })
//         .catch(err => {
//             Swal.fire({
//             title: `Failed! Already Enrolled. ${err}`,
//             position: "top-end",
//             icon: "failed",
//             showConfirmButton: false,
//             timer: 1500
//             });
//         })
//     }
//     return (
//         <>
//             <div className='bg-blue-500 mt-12'>
//                 <MyContainer>
//                     <div className='p-10 h-[400px]'>
//                         <h1 className='text-5xl font-black my-8'>{course.title}</h1>
                        
//                         <div className='my-4 flex gap-2 '>
//                             <span className='border border-white text-sm p-1 mr-1 rounded-md text-white flex gap-2 items-center'><FaStar></FaStar> {course.rating} </span>
//                             <span className='border border-white text-sm p-1 mr-1 rounded-md text-white flex gap-2 items-center'><FaClock></FaClock> {course.duration}</span>
//                             <span className='border border-white text-sm p-1 mr-1 rounded-md text-white flex gap-2 items-center'><FaUser></FaUser>{course.students}</span>
//                             <span className='border border-white text-sm p-1 mr-1 rounded-md text-white flex gap-2 items-center'><BiSolidTachometer />{course.difficulty_level}</span>
//                         </div>
//                     </div>
//                 </MyContainer>
//             </div>
            
//             <div className='bg-gray-100 pb-12'>
//                 <MyContainer>
//                     <div className='flex flex-col md:flex-row gap-10 justify-start'>
//                         <div className='border-2 border-white bg-white p-5 rounded-lg shadow-md md:mt-[-120px] flex-1'>
//                             <p className='font-semibold border-b-2 border-blue-600'>Description</p>
//                             <hr />
//                             <p>{course.description}</p>
//                         </div>
//                         <div className='border-2 border-white bg-white/30 p-5 rounded-lg shadow-md md:mt-[-70px] flex flex-col items-center flex-1'>
//                             <img src={course.image} className='w-[300px] h-[200px]' alt="" />
//                             <h1 className='text-2xl font-bold text-secondary'>$ {course.price}</h1>
//                             <button onClick={handleEnroll} className='btn w-full btn-primary'>Enroll Now</button>
//                         </div>
//                 </div>
//                 </MyContainer>
//             </div>       
//         </>
//     );
// };

// export default CourseDetails;

import React, { use, useEffect, useState } from 'react';
import { Star, Clock, Users, Phone } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import useAxios from '../hooks/useAxios';

export default function CourseDetails() {
    const {user} = use(AuthContext)
    const [course, setCourse] = useState([])
    const {id} = useParams()
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
        const enrollData = {
            ...course, enrolled_by: user.email
        } 

        Swal.fire({
            title: "Are you sure you want to enroll?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Enroll",
            denyButtonText: `Enable Later`,
            }).then((result) => {
            if (result.isConfirmed) {
                axiosInstance.post('/enroll', enrollData)
                .then(data  => {
                    console.log(data.data)
                    navigate('/my-enrolled-courses')
                })
                .catch(err => {
                Swal.fire({
                title: `Failed! Already Enrolled. ${err}`,
                position: "top-end",
                icon: "error",
                showConfirmButton: false,
                timer: 1500
                });
            })

            } else if (result.isDenied) {
                Swal.fire("Not Enrolled", "", "info");
            }
    });


        
        
    }
  return (
    <>
      <div className="min-h-screen bg-base-100">
        {/* Hero Section */}
        <div className="hero bg-gradient-to-b from-teal-300 to-green-600 text-white">
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
                <button className="btn btn-neutral btn-lg">Get Started</button>
                <div className="flex items-center gap-2">
                  <div className="rating rating-lg">
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" disabled />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" disabled />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" disabled />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" disabled />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" disabled />
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
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">What You'll Learn</h2>
                <p className="mb-6">
                 {course.description}
                </p>
                
                
              </div>
            </div>

            {/* Course Content */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-6">Course Content</h2>
                <ul className="space-y-4">
                  <li className="collapse collapse-plus bg-base-100">
                    <input type="checkbox" defaultChecked />
                    <div className="collapse-title text-xl font-medium">
                      Intro To Course And Study <span className="text-sm text-base-content/60 ml-2">1hr 40min</span>
                    </div>
                    <div className="collapse-content">
                      <ul className="menu menu-compact">
                        <li className="flex justify-between"><span>Course Intro</span> <span>30 Min</span></li>
                        <li className="flex justify-between"><span>Watch Before Start</span> <span>0.5 Min</span></li>
                      </ul>
                    </div>
                  </li>
                  <li className="collapse collapse-plus bg-base-100">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">
                      Course Fundamentals <span className="text-sm text-base-content/60 ml-2">1hr 40min</span>
                    </div>
                  </li>
                  {/* Add more sections as needed */}
                </ul>
              </div>
            </div>

            {/* Instructor */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-6">Instructor</h2>
                <div className="flex items-center gap-6">
                  <div className="avatar">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={course.photo} alt="Instructor" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{course.instructor_name}</h3>
                    <p className="text-base-content/70">Advanced Educator</p>
                    <div className="flex items-center gap-4 mt-2">
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
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-4xl font-bold">${course.price}</span>
                  {/* <span className="text-2xl line-through text-base-content/50">$1500</span> */}
                  <div className="badge badge-warning badge-sm ml-auto">Limited Offer</div>
                </div>
                <button onClick={handleEnroll} className="btn btn-success btn-lg w-full mb-3">Enroll Now</button>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Duration</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  {/* <div className="flex justify-between">
                    <span className="flex items-center gap-2"><Users className="w-4 h-4" /> Enrolled</span>
                    <span className="font-medium">Be the first!</span>
                  </div> */}
                  <div className="flex justify-between">
                    <span>Skill level</span>
                    <div className="badge badge-error">{course.difficulty_level}</div>
                  </div>
                  <div className="flex justify-between">
                    <span>Language</span>
                    <span className="font-medium">English</span>
                  </div>
                </div>

                <details className="collapse collapse-arrow mt-6">
                  <summary className="collapse-title">Show More</summary>
                  <div className="collapse-content">
                    <p>Additional details...</p>
                  </div>
                </details>

                <div className="divider my-6"></div>

                <button className="btn btn-outline w-full gap-2">
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
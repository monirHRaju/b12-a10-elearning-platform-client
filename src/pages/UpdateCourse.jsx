import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';
import useAxios from '../hooks/useAxios';

const UpdateCourse = () => {
    const [course, setCourse] = useState([])
    const [isChecked, setIsChecked] = useState(false);
    const handleChange = (e) => {
        setIsChecked(e.target.checked);
    };
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxios()
    const {id} = useParams()
    
    const updateCourseInfo = (e) => {
        e.preventDefault()

        const title = e.target.title.value
        const image = e.target.image.value
        const price = e.target.price.value
        const duration = e.target.duration.value
        const category = e.target.category.value
        const description = e.target.description.value
        const difficulty_level = e.target.difficulty_level.value
        const rating = 0
        const students = 0
        const isFeatured = isChecked
        
        
        // user info
        const instructor_id = user.uid
        const instructor_name = user.displayName
        const email = user.email
        const photo = user.photoURL
        
        console.log({title, image, price, duration, category, description, difficulty_level, rating, students, isFeatured})


        const updatedCourse = {
            title, image, price, duration, category, description, difficulty_level, rating, students, isFeatured,instructor_id, instructor_name, email, photo
        }
        axiosSecure.patch(`/courses/${course._id}`, updatedCourse)
        .then( data => {
                // console.log('after creating course', data.data)
                if(data.data.insertedId){
                    Swal.fire({
                    title: "New Course Created Successfully!",
                    icon: "success",
                    draggable: false
                    });
                }

                e.target.reset()

                navigate('/my-added-courses')
            })
        .catch(err => {
                Swal.fire({
                title: `Failed! ${err.message}`,
                icon: "warning",
                draggable: false
                });
            
        })
    }


    
    
    useEffect(()=> {
        axiosSecure.get(`/courses/${id}`)
        .then( data => { 
            // console.log('after getting data', data.data)
            setCourse(data.data[0])

        })
        
    }, [id, axiosSecure])
    
    // console.log(course)
    
    return (
        <div>
            <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl my-20">
            <h1 className="text-3xl font-bold text-center">Update Course Info</h1>
            <div className="card-body">

                <form onSubmit={updateCourseInfo}>
                    <fieldset className="fieldset">
                        <label className="label">Course Title</label>
                        <input type="text" name='title' defaultValue={course.title} required className="input" placeholder="Course Title" />
                        
                        <label className="label">Cover Image</label>
                        <input type="text" name='image' defaultValue={course.image} required className="input" placeholder="Cover Image" />
                        
                        <label className="label">Price</label>
                        <input type="text" name='price' defaultValue={course.price} required className="input" placeholder="price" />
                        
                        
                        <label className="label">Duration</label>
                        <input type="text" name='duration' defaultValue={course.duration} className="input" placeholder="duration" />
                        
                        <label className="label">Category</label>
                        <input type="text" name='category' defaultValue={course.category} required className="input" placeholder="category" />
                        
                        <label className="label">Description</label>
                        <textarea name='description' className="input" defaultValue={course.description} rows='15' placeholder="description" >
                           
                        </textarea>
                        
                        <label className="label">Level</label>
                        <select className="input" value={course.difficulty_level} name='difficulty_level'>
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Expert</option>
                        </select>
                        
                        <label className="label">
                        <input 
                        type="checkbox"
                        
                        onChange={handleChange}
                         />
                         Featured Course
                         </label>
                        
                        <button className="btn btn-neutral mt-4">Update Course</button>
                    </fieldset>
                    
                    
                </form>
              
                    
                
                <ToastContainer></ToastContainer>
            </div>
        </div>
        </div>
    );
};

export default UpdateCourse;
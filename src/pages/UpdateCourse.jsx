import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';

const UpdateCourse = () => {
    const [course, setCourse] = useState([])
    const [isChecked, setIsChecked] = useState(false);
    const handleChange = (e) => {
        setIsChecked(e.target.checked);
    };
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
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
                    toast.success("Course updated successfully!");
                }

                e.target.reset()

                navigate('/my-added-courses')
            })
        .catch(err => {
                toast.error(err.message || "Update failed");
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
            <div className="card bg-base-100 mx-auto w-full max-w-2xl shrink-0 shadow-2xl my-20">
            <h1 className="text-3xl font-bold text-center text-accent">Update Course <span className="text-primary">Info</span></h1>
            <div className="card-body">

                <form onSubmit={updateCourseInfo}>
                    <fieldset className="fieldset space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-accent">Course Title</span>
                            </label>
                            <input type="text" name='title' defaultValue={course.title} required className="input input-bordered focus:ring-2 focus:ring-primary" placeholder="Course Title" />
                        </div>
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-accent">Cover Image</span>
                            </label>
                            <input type="text" name='image' defaultValue={course.image} required className="input input-bordered focus:ring-2 focus:ring-primary" placeholder="Cover Image" />
                        </div>
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-accent">Price</span>
                            </label>
                            <input type="text" name='price' defaultValue={course.price} required className="input input-bordered focus:ring-2 focus:ring-primary" placeholder="price" />
                        </div>
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-accent">Duration</span>
                            </label>
                            <input type="text" name='duration' defaultValue={course.duration} className="input input-bordered focus:ring-2 focus:ring-primary" placeholder="duration" />
                        </div>
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-accent">Category</span>
                            </label>
                            <input type="text" name='category' defaultValue={course.category} required className="input input-bordered focus:ring-2 focus:ring-primary" placeholder="category" />
                        </div>
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-accent">Description</span>
                            </label>
                            <textarea name='description' className="textarea textarea-bordered focus:ring-2 focus:ring-primary" defaultValue={course.description} rows='15' placeholder="description" />
                        </div>
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-accent">Level</span>
                            </label>
                            <select className="select select-bordered focus:ring-2 focus:ring-primary" value={course?.difficulty_level ?? ''} name='difficulty_level'>
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Expert</option>
                            </select>
                        </div>
                        
                        <div className="form-control">
                            <label className="label cursor-pointer justify-start gap-3">
                                <input type="checkbox" className="checkbox checkbox-primary" onChange={handleChange} />
                                <span className="label-text font-medium text-accent">Featured Course</span>
                            </label>
                        </div>
                        
                        <button className="btn btn-primary mt-4 w-full">Update Course</button>
                    </fieldset>
                    
                    
                </form>
              
                    
                
            </div>
        </div>
        </div>
    );
};

export default UpdateCourse;
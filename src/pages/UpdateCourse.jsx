import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { ToastContainer } from 'react-toastify';

const UpdateCourse = () => {
    const [course, setCourse] = useState([])
    const [isChecked, setIsChecked] = useState(false);
    const handleChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const updateCourseInfo = () => {
        console.log('update clicked')
    }


    
    const axiosSecure = useAxiosSecure()
    const {id} = useParams()
    // console.log(id)
    
    useEffect(()=> {
        axiosSecure.get(`/courses/${id}`)
        .then( data => { 
            console.log('after getting data', data.data)
            setCourse(data.data[0])

        })
        
    }, [id, axiosSecure])
    
    console.log(course)
    
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
                        <textarea name='description' className="input" rows='15' value={course.description} placeholder="description" >
                            
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
                        checked={course.isFeatured}
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
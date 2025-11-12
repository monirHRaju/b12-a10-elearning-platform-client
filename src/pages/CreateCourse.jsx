import React, { use, useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const CreateCourse = () => {
    const {user} = useContext(AuthContext)
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate()


    const handleChange = (e) => {
        setIsChecked(e.target.checked);
    };

     const handleCreateCourse = (e) => {
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
        
        // console.log({title, image, price, duration, category, description, difficulty_level, rating, students, isFeatured})

        // user info
        const instructor_id = user.uid
        const instructor_name = user.displayName
        const email = user.email
        const photo = user.photoURL

        console.log({title, image, price, duration, category, description, difficulty_level, rating, students, isFeatured,instructor_id, instructor_name, email, photo})
        
        const newCourse = {title, image, price, duration, category, description, difficulty_level, rating, students, isFeatured,instructor_id, instructor_name, email, photo}
        // create user data to mongo db
            axios.post('http://localhost:3000/courses', newCourse)
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

    
    return (
        <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl my-20">
            <h1 className="text-3xl font-bold text-center">Create a Course!</h1>
            <div className="card-body">

                <form onSubmit={handleCreateCourse}>
                    <fieldset className="fieldset">
                        <label className="label">Course Title</label>
                        <input type="text" name='title' className="input" placeholder="Course Title" />
                        
                        <label className="label">Cover Image</label>
                        <input type="text" name='image' className="input" placeholder="Cover Image" />
                        
                        <label className="label">Price</label>
                        <input type="text" name='price' className="input" placeholder="price" />
                        
                        
                        <label className="label">Duration</label>
                        <input type="text" name='duration' className="input" placeholder="duration" />
                        
                        <label className="label">Category</label>
                        <input type="text" name='category' className="input" placeholder="category" />
                        
                        <label className="label">Description</label>
                        <textarea name='description' className="input" rows='6' placeholder="description" >
                        </textarea>
                        
                        <label className="label">Level</label>
                        <select className="input" name='difficulty_level'>
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Expert</option>
                        </select>
                        
                        <label className="label">
                        <input 
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleChange}
                         />
                         Featured Course
                         </label>
                        
                        <button className="btn btn-neutral mt-4">Create Course</button>
                    </fieldset>
                    
                    
                </form>
              
                    
                
                <ToastContainer></ToastContainer>
            </div>
        </div>
    );
};

export default CreateCourse;
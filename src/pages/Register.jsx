import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import useAxios from '../hooks/useAxios';


const Register = () => {
        const [password, setPassword] = useState("");
        const [error, setError] = useState("");
        const axiosInstance = useAxios()
    
    const {signInWithGoogle, createUser} = useContext(AuthContext)
    // console.log(signInWithGoogle);
    const navigate = useNavigate()

    const handleCreateUser = (e) => {
        e.preventDefault()

        const name = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value
        const image = e.target.image.value 

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
         if (!passwordRegex.test(password)) {
            setError("Password must contain at least one uppercase, one lowercase letter, and be 6+ characters long.");

            toast.warn(error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });

            return

        } else {
            setError("");
        }
        // console.log({name, email, password, image})
        //create user to firebase
        createUser(email, password)
        .then(result => {
            console.log(result.user)
            const newUser = {
                    name,
                    email,
                    password,
                    image
                }
            
            // create user data to mongo db
            axiosInstance.post('/users', newUser)
            .then( data => {
                console.log('after creating user', data.data)
                if(data.data.insertedId){
                    Swal.fire({
                    title: "Account Created Successfully!",
                    icon: "success",
                    draggable: false
                    });
                }
                navigate('/')
            })
            
            
        })
        .catch(err => {
             Swal.fire({
                title: `Failed! ${err.message}`,
                icon: "failed",
                draggable: false
                });
            
        })
    }

    const handleGoogleSignIn = () => {
        

        signInWithGoogle()
        .then(result => {
            console.log(result.user)
            const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    image: result.user.photoURL
                }
            
            axiosInstance.post('/users', newUser)
            .then( data => {
                console.log('after creating user', data.data)
                if(data.data.insertedId){
                    Swal.fire({
                    title: "Account Created Successfully!",
                    position: "top-end",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                    });
                }
                navigate('/')
            })
            
            
        })
        .catch(err => {
             Swal.fire({
                title: `Failed! ${err.message}`,
                position: "top-end",
                icon: "failed",
                showConfirmButton: false,
                timer: 1500
                });
            
        })
    }
    return (
        <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl my-20">
            <h1 className="text-3xl font-bold text-center">Register now!</h1>
            <div className="card-body">
                <form onSubmit={handleCreateUser}>
                    <fieldset className="fieldset">
                        <label className="label">Name</label>
                        <input type="text" name='name' className="input" placeholder="Your name" required />
                        
                        <label className="label">Email</label>
                        <input type="email" name='email' className="input" placeholder="Email" required/>
                        
                        <label className="label">Password</label>
                        <input type="password" name='password' required
                        onChange={(e) => setPassword(e.target.value)}
                        className="input" placeholder="Password" />
                        
                        <label className="label">Profile Image</label>
                        <input type="url" name='image' className="input" placeholder="Photo URL" />
                        
                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-neutral mt-4">Register</button>
                    </fieldset>
                    
                    
                </form>
                {/* Google */}
                    <button
                        onClick={handleGoogleSignIn}
                        className="btn bg-white w-full  text-black border-[#e5e5e5]">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                <p>Don't have account? <Link to='/login' className='text-blue-600 hover:underline'>Login</Link></p>
                <ToastContainer></ToastContainer>
            </div>
        </div>
    );
};

export default Register;
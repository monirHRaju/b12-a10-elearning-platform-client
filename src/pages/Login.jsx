import React, { use, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Login = () => {
    const {signInWithGoogle, signInUser} = useContext(AuthContext)
    // console.log(signInWithGoogle);
    const navigate = useNavigate()
    const handleGoogleSignIn = () => {
        signInWithGoogle()
        .then(result => {
            console.log(result.user)
            const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    image: result.user.photoURL
                }
            
            axios.post('http://localhost:3000/users', newUser)
            .then( data => {
                console.log('after creating user', data.data)
                if(data.data.insertedId){
                     Swal.fire({
                        title: "Account Created & Logged In Successful!",
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
            console.log(err.message);
            
        })
    }

    const handleLogin = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        signInUser(email, password)
        .then(res => {
              console.log(res.user)
              // navigate(location.state || '/')
              setTimeout(() => navigate(location.state || '/'), 1000);
               Swal.fire({
                title: "Logged In Successfully!",
                position: "top-end",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
                });
            })
            .catch(error =>  {
                Swal.fire({
                title: `Failed Login! ${error.code}`,
                position: "top-end",
                icon: "warning",
                showConfirmButton: false,
                timer: 2000
                });
            })
    }

    return (
        <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl my-20">
            <h1 className="text-3xl font-bold text-center">Login now!</h1>
            <div className="card-body">
                <form onSubmit={handleLogin}>
                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" name='email' className="input" placeholder="Email" />
                        <label className="label">Password</label>
                        <input type="password" name='password' className="input" placeholder="Password" />
                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-neutral mt-4">Login</button>
                    </fieldset>
                    
                    
                </form>
                {/* Google */}
                    <button
                        onClick={handleGoogleSignIn}
                        className="btn bg-white w-full  text-black border-[#e5e5e5]">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                <p>Don't have account? <Link to='/register' className='text-blue-600 hover:underline'>Register</Link></p>
            </div>
        </div>
    );
};

export default Login;
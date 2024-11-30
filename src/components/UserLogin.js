import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';


function UserLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    
    //alert config
    const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    //login function
    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', {
                email,
                password,
            });
            console.log(response.data.message);
            if (response.data.user) {
                localStorage.setItem('token', response.data.user);
                Toast.fire({
                    icon: "success",
                    title: "User Logged in successfully."
                });
                navigate('/ToDo')
            } else {
                Toast.fire({
                    icon: "error",
                    title: "Please Check your Email and Password"
                });
            }
            setEmail('');
            setPassword('');
        } catch (error) {
            if (error.response && error.response.data) {
                Toast.fire({
                    icon: "error",
                    title: error.response.data.error,
                });
            } else {
                Toast.fire({
                    icon: "error",
                    title: 'An error occurred.',
                });
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center mt-56">
                <div className="max-w-md relative flex flex-col p-4 rounded-md text-black bg-slate-200">
                    <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">Welcome back to <span className="text-[#7747ff]">To-Do List!!</span></div>
                    <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">Log in into your account</div>
                    <form className="flex flex-col gap-3" onSubmit={loginUser}>
                        <div className="block relative">
                            <label htmlFor="name" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Email</label>
                            <input type="email" id="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0" />
                        </div>
                        <div className="block relative">
                            <label htmlFor="password" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Password</label>
                            <input type="password" id="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0" />
                        </div>
                        <div>
                            <a className="text-sm text-[#7747ff]" href="#">
                            </a></div>
                        <button type="submit" className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">Submit</button>
                    </form>
                    <div className="text-sm text-center mt-[1.6rem]">Don't have an account? <Link className="text-sm text-[#7747ff]" to="/register">Register!</Link></div>
                </div>
            </div>
        </>
    )
}

export default UserLogin
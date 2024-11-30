import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

//to get alert : sweetalert2
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';



function UserReg() {
    const [name, setName] = useState('')
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

    // to register user
    const registerUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', {
                name,
                email,
                password,
            });
            if (response.status === 201) {
                Toast.fire({
                    icon: "success",
                    title: 'User Registered Successfully.',
                });
                navigate('/login')
            }
            console.log(response.data.message);
            setName('');
            setEmail('');
            setPassword('');
        }
        catch (error) {
            // Check if the error response exists and has a message
            if (error.response && error.response.data && error.response.data.errors) {
                const errors = error.response.data.errors;

                //to get alerts for schema validation errors
                for (const key in errors) {
                    errorMessage += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${errors[key]}\n`;
                }
                Toast.fire({
                    icon: "success",
                    title: 'User Registered Successfully.',
                });
                navigate('/login')
            } else {
                Toast.fire({
                    icon: "success",
                    title: 'An error occurred. Please try again.'
                });
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center mt-56">
                <div className="max-w-md relative flex flex-col p-10 rounded-md text-black bg-slate-200 ">
                    <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">Welcome to <span className="text-[#7747ff]">To-Do List</span></div>
                    <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">Register your account</div>
                    <form className="flex flex-col gap-3" onSubmit={registerUser}>
                        <div className="block relative">
                            <label htmlFor="name" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Name</label>
                            <input type="text" id="name" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0" />
                        </div>
                        <div className="block relative">
                            <label htmlFor="email" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Email</label>
                            <input type="text" id="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0" />
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
                    <div className="text-sm text-center mt-[1.6rem]">already have an account? <Link className="text-sm text-[#7747ff]" to="/login">Log in!</Link></div>
                </div>
            </div>
        </>
    )
}

export default UserReg;
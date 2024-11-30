//Hooks to create dynamic content
import React, { useState, useEffect } from 'react'; 

//useNavigate hook to redirect page
import { Link, useNavigate } from 'react-router-dom';

//to Decode JWT
import {jwtDecode} from 'jwt-decode';

//React-icons 
import { HiLogin } from "react-icons/hi";
import { AiFillEdit } from "react-icons/ai";
import { FcTodoList } from "react-icons/fc";
import { AiOutlineLogout } from "react-icons/ai";

//for alert
import Swal from 'sweetalert2'

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');
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


    useEffect(() => {
        // Check if the token exists and if it's valid
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                // Check if the token is expired or invalid
                if (decodedToken.exp * 1000 < Date.now()) {
                    localStorage.removeItem('token');
                    setIsLoggedIn(false);
                } else {
                    setIsLoggedIn(true);
                    setUserEmail(decodedToken.email); // Set user email from decoded token
                }
            } catch (err) {
                localStorage.removeItem('token');
                setIsLoggedIn(false);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        setIsLoggedIn(false); // Set logged-in status to false
        setUserEmail(''); // Clear user email
        Toast.fire({
            icon: "warning",
            title: 'User Logged Out Successfully.',
        });
        navigate('/login'); // Redirect to the login page
    };

    return (
        <nav className="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
            <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
                <div className="flex items-center text-indigo-500 md:order-1">
                    <FcTodoList className='w-10 h-10 mr-2' />
                    <h1 className="text-3xl font-bold text-indigo-700 hover:text-indigo-900 transition duration-300">
                        To-Do List
                    </h1>
                </div>

                <div className="text-gray-500 order-2 w-full md:w-auto md:order-2">
                    <ul className="flex font-semibold justify-between">
                        <li className="md:px-4 md:py-2 hover:text-indigo-400"><Link to="/">Home</Link></li>
                        <li className="md:px-4 md:py-2 hover:text-indigo-400"><Link to="/Todo">To-Do List</Link></li>
                    </ul>
                </div>

                <div className="order-3 md:order-3 flex items-center space-x-4">
                    {isLoggedIn && userEmail && (
                        <span className="text-gray-700 font-semibold">
                            {userEmail}
                        </span>
                    )}

                    {!isLoggedIn ? (
                        <>
                            <Link to="/login">
                                <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
                                    <HiLogin className='h-5 w-5' />
                                    <span className='font-bold'>Login</span>
                                </button>
                            </Link>
                            <Link to="/register">
                                <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
                                    <AiFillEdit className='h-5 w-5' />
                                    <span className='font-bold'>Register</span>
                                </button>
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-gray-50 rounded-xl flex items-center gap-2"
                        >
                            <AiOutlineLogout className='h-5 w-5'/>
                            <span className='font-bold'>Logout</span>
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

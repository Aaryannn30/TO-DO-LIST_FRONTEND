import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'

//react-icons
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function Homepage() {
    return (
        <div>
            <div className="h-screen overflow-hidden flex flex-col">
                <Navbar />
                <div className="flex-grow flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500">
                    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
                        <header className="text-center mb-6">
                            <h1 className="text-4xl font-extrabold text-gray-900">Todo List</h1>
                            <p className="text-lg text-gray-600 mt-2 font-semibold">Get organized and stay on top of your tasks!</p>
                        </header>

                        <section className="mt-6">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">What's Included?</h2>
                            <ul className="list-none pl-4">
                                <li className="text-xl font-bold text-gray-700 mb-2">
                                    <span className="text-blue-600">• Task Management:</span> Add, edit, and delete tasks with ease
                                </li>
                                <ul className="list-none pl-5 mt-2">
                                    <li className="text-lg text-gray-600 mb-2"><span className="font-medium text-blue-500">Create:</span> New tasks and add details.</li>
                                    <li className="text-lg text-gray-600 mb-2"><span className="font-medium text-blue-500">Edit:</span> Tasks to update any changes.</li>
                                    <li className="text-lg text-gray-600 mb-2"><span className="font-medium text-blue-500">Delete:</span> Tasks that are no longer needed.</li>
                                </ul>
                                <li className="text-xl font-bold text-gray-700 mb-2">
                                    <span className="text-blue-600">• User-friendly Interface:</span> Easy to navigate and use
                                </li>
                                <li className="text-xl font-bold text-gray-700 mb-2">
                                    <span className="text-blue-600">• Secure Task Storage:</span> Store your tasks securely and access them anywhere
                                </li>
                            </ul>
                        </section>

                        <div className="text-center mt-8">
                            <Link to="/register" className="inline-block bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg">
                                Get Started
                            </Link>
                        </div>

                        <footer className="text-center mt-8">
                            <p className="text-sm text-gray-600 font-medium">© 2024 TodoList. All rights reserved.</p>
                        </footer>
                    </div>
                </div>

                <footer className="bg-gray-800 text-white text-center p-4 flex justify-center items-center">

                    <br />
                    <p className="text-sm mr-2 font-semibold">Created by :</p>
                    <div className="flex items-center mr-4 font-bold">
                        Aryan Maru
                    </div>
                    <div className="flex items-center mr-4">
                        <a href="https://github.com/Aaryannn30" className="underline flex" target="_blank">
                            <FaGithub className='w-5 h-5 mr-2 mt-1' />
                            Github
                        </a>
                    </div>
                    <div className="flex items-center">
                        <a href="https://linkedin.com/in/aryanmaru30" className="underline flex">
                            <FaLinkedin className='w-5 h-5 mr-2 mt-1' />
                            LinkedIn
                        </a>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Homepage
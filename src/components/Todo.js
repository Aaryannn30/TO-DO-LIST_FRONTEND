import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'

//for JWT
import { jwtDecode } from 'jwt-decode'

//for API
import axios from 'axios'

//for alert
import Swal from 'sweetalert2'

function Todo() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState('');
    const navigate = useNavigate();
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

    //getting Task from DB
    const getToDo = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users/todo', {
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                },
            })
            setTasks(response.data.tasks);
            console.log(response.data.tasks);
        } catch (error) {
            console.log(error);
        }
    }

    //add task 
    const addTask = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            Toast.fire({
                icon: "info",
                title: 'Login First!',
            });
            console.error('No token found. Please log in.');
            navigate('/login');
            return;
        }

        if (newTask.trim()) {
            try {
                const response = await axios.post(
                    'http://localhost:5000/api/users/todo',
                    { text: newTask },
                    {
                        headers: {
                            'x-access-token': token,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                setTasks([...tasks, response.data.task]);
                setNewTask('');
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    Toast.fire({
                        icon: "error",
                        title: 'Token may be invalid or expired. Please re-login.',
                    });
                    console.error('Forbidden: Token may be invalid or expired. Please re-login.');
                    localStorage.removeItem('token');
                    navigate('/login');
                } else {
                    Toast.fire({
                        icon: "error",
                        title: 'Error adding task: ' + error,
                    });
                    console.error('Error adding task:', error);
                }
            }
        }
    };


    const toggleTaskCompletion = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    //delete task
    const deleteTask = async (index) => {
        const taskId = tasks[index]._id; // Get the task ID
        try {
            // to mkae the DELETE request to the backend to remove the task
            const response = await axios.delete(`http://localhost:5000/api/users/todo/${taskId}`, {
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                },
            });
            console.log(response.data);

            // Remove the task from the frontend state
            const updatedTasks = tasks.filter((_, i) => i !== index);
            setTasks(updatedTasks);

        } catch (error) {
            Toast.fire({
                icon: "error",
                title: 'Error deleting task:' + error.response ? error.response.data : error,
            });
            console.error('Error deleting task:', error.response ? error.response.data : error);
        }
    };

    //edit task
    const updateTask = async () => {
        if (editText.trim()) {
            try {
                // Get the task ID
                const taskId = tasks[editIndex]._id;

                // to make the PUT request to update the task on the backend
                const response = await axios.put(
                    `http://localhost:5000/api/users/todo/${taskId}`,
                    { text: editText },
                    {
                        headers: {
                            'x-access-token': localStorage.getItem('token'),
                        },
                    }
                );

                console.log(response.data);

                // Update the task in the frontend state
                const updatedTasks = tasks.map((task, i) =>
                    i === editIndex ? { ...task, text: editText } : task
                );
                setTasks(updatedTasks);
                setEditIndex(null);
                setEditText('');
            } catch (error) {
                Toast.fire({
                    icon: "error",
                    title: 'Error Updating task:' + error,
                });
                console.error('Error updating task:', error);
            }
        }
    };

    //to see if user is logged in or not
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = jwtDecode(token)
            if (!user) {
                localStorage.removeItem('token')
                Toast.fire({
                    icon: "info",
                    title: 'Login First!',
                });
                navigate('/login')
            } else {
                getToDo()
            }
        }
    }, [])

    return (
        <div>
            <Navbar />
            <div className="max-w-md mx-auto mt-10 p-4 bg-slate-300 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Todo List</h1>
                <div className="flex mb-4">
                    <input
                        type="text"
                        className="flex-1 p-2 border rounded"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Add a new task..."
                    />
                    <button
                        onClick={addTask}
                        className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Add
                    </button>
                </div>
                <ul>
                    {tasks.map((task, index) => (
                        <li key={index} className="flex justify-between items-center mb-2">
                            {editIndex === index ? (
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        className="p-2 border rounded"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                    />
                                    <button
                                        onClick={updateTask}
                                        className="ml-2 p-1 bg-green-500 text-white rounded hover:bg-green-600"
                                    >
                                        Update
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <span
                                        className={`flex-1 cursor-pointer ${task.completed ? 'line-through text-gray-500' : ''}`}
                                        onClick={() => toggleTaskCompletion(index)}
                                    >
                                        <p>{task.text}</p>
                                        <p>Status: {task.completed ? 'Completed' : 'Not Completed'}</p>
                                    </span>
                                    <button
                                        onClick={() => {
                                            setEditIndex(index);
                                            setEditText(task.text);
                                        }}
                                        className="ml-4 p-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteTask(index)}
                                        className="ml-4 p-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Todo
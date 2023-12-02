import React, { useEffect, useState } from "react";
import Navbar from "../../Layout/Navbar";
import Footer from "../../Layout/Footer";
import CrossMark from "../../Images/cross_mark.png"
import { NavLink, useNavigate, useParams } from "react-router-dom";

const ProjectDetails = () => {
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [task, setTask] = useState(null);
    const [tasks, setTasks] = useState(null);
    const [deletedMessage, setDeletedMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8000/api/getProjectDetails/${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("API Response:", data);

                if (data.status === 200) {
                    setTask(data.tasks); // Assuming data.tasks is a single task
                } else {
                    setError(new Error(data.message || "Failed to fetch project data"));
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                setError(error);
            });
    }, [id]);

    //deleting project
    const handleDelete = (projectId) => {
        fetch(`http://localhost:8000/api/deleteProject/${projectId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setDeletedMessage('Project deleted successfully');
                    // Check if tasks is not null before filtering
                    setTasks(prevTasks => prevTasks ? prevTasks.filter(task => task.id !== projectId) : null);
                    setTimeout(() => {
                        navigate(-1);
                        setDeletedMessage(null);
                    }, 4000);
                } else {
                    setDeletedMessage(`Failed to delete project: ${data.message}`);
                }
            })
            .catch(error => {
                console.error("Error deleting project:", error);
                // Handle additional error handling if necessary
            });
    };

    const cancelBtn = () => {
        navigate(-1);
    }

    

    return (
        <div>
            <Navbar />
            <div className="project-details">
                <div>
                    {task && (
                        <div class="relative overflow-x-auto mx-12 my-4 ">
                            <div className="flex justify-end">
                            <img src={CrossMark} className="w-12 hover:border-4 hover:border-red-600 border rounded-full m-2"  onClick={() => cancelBtn()} />
                            </div>
                            <table class="text-center shadow-md sm:rounded-lg w-full text-sm rtl:text-right text-blue-100 dark:text-blue-100 border-separate border-spacing-1 border-4 border-indigo-800">
                                {/* ... Your table header */}
                                <tbody key={task.id}>
                                    <tr class="">
                                    <th scope="row" class="px-6 py-3 text-base font-bold bg-blue-600 border-b border-blue-400 hover:bg-blue-800">Project Name</th>
                                        <td scope="row" class="px-6 text-base font-medium whitespace-nowrap dark:text-blue-100 bg-gray-300 border-b border-gray-200 text-gray-900 hover:bg-blue-300">{task.projectName}</td>
                                    </tr>
                                    <tr class="">
                                    <th scope="row" class="px-6 py-3 text-base font-bold bg-blue-600 border-b border-blue-400 hover:bg-blue-800">Project Description</th>
                                        <td scope="row" class="px-6 text-base font-medium whitespace-nowrap dark:text-blue-100 bg-gray-300 border-b border-gray-200 text-gray-900 hover:bg-blue-300">{task.projectDesc}</td>
                                    </tr>
                                    <tr class="">
                                    <th scope="row" class="px-6 py-3 text-base font-bold bg-blue-600 border-b border-blue-400 hover:bg-blue-800">Created At</th>
                                        <td scope="row" class="px-6 text-base font-medium whitespace-nowrap dark:text-blue-100 bg-gray-300 border-b border-gray-200 text-gray-900 hover:bg-blue-300">
                                        {new Date(task.created_at).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                        </td>
                                    </tr>
                                    <tr class="">
                                    <th scope="row" class="px-6 py-3 text-base font-bold bg-blue-600 border-b border-blue-400 hover:bg-blue-800">Deadline</th>
                                        <td scope="row" class="px-6 text-base font-medium whitespace-nowrap dark:text-blue-100 bg-gray-300 border-b border-gray-200 text-gray-900 hover:bg-blue-300">
                                        {new Date(task.projectDeadline).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                        </td>
                                    </tr>
                                    <tr class="">
                                    <th scope="row" class="px-6 py-3 text-base font-bold bg-blue-600 border-b border-blue-400 hover:bg-blue-800">Project Status</th>
                                        <td scope="row" class="px-6 text-base font-medium whitespace-nowrap dark:text-blue-100 bg-gray-300 border-b border-gray-200 text-gray-900 hover:bg-blue-300">{task.projectStatus}</td>
                                    </tr>
                                    <tr class="">
                                    <th scope="row" class="px-6 py-3 text-base font-bold bg-blue-600 border-b border-blue-400 hover:bg-blue-800">Project Members</th>
                                        <td scope="row" class="px-6 text-base font-medium whitespace-nowrap dark:text-blue-100 bg-gray-300 border-b border-gray-200 text-gray-900 hover:bg-blue-300">{task.members}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div>
                                <div class="px-6 py-3 font-medium whitespace-nowrap dark:text-blue-100">
                                    <NavLink to={`/editProjectDetails/${task.id}`}>
                                        <button className="mx-2 text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-32 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
                                            Edit
                                        </button>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProjectDetails;

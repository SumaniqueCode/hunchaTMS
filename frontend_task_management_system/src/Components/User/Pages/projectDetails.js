import React, { useEffect, useState } from "react";
import Navbar from "../../Layout/Navbar";
import Footer from "../../Layout/Footer";
import CrossMark from "../../Images/cross_mark.png";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const ProjectDetails = () => {
const { id } = useParams();
const [error, setError] = useState(null);
const [task, setTask] = useState(null);
const [tasks, setTasks] = useState(null);
const [deletedMessage, setDeletedMessage] = useState(null);
const [showModal, setShowModal] = useState(false);
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

// Deleting project
const handleDelete = (projectId) => {
fetch(`http://localhost:8000/api/deleteProject/${projectId}`)
.then((response) => response.json())
.then((data) => {
if (data.success) {
setDeletedMessage("Project deleted successfully");
// Check if tasks is not null before filtering
setTasks((prevTasks) =>
prevTasks ? prevTasks.filter((task) => task.id !== projectId) : null
);
setTimeout(() => {
navigate(-1);
setDeletedMessage(null);
}, 4000);
} else {
setDeletedMessage(`Failed to delete project: ${data.message}`);
}
})
.catch((error) => {
console.error("Error deleting project:", error);
// Handle additional error handling if necessary
});
};

const cancelBtn = () => {
navigate(-1);
};

const openModal = () => {
setShowModal(true);
};

const closeModal = () => {
setShowModal(false);
};

return (
<div>
    <Navbar />
    <div className="project-details">
        <div>
            {task && (
            <div class="relative overflow-x-auto mx-12 my-4 ">
                <div className="flex justify-end">
                    <img src={CrossMark} className="w-12 hover:border-4 hover:border-red-600 border rounded-full m-2"onClick={()=> cancelBtn()}/>
                </div>
                <table class="text-center shadow-md sm:rounded-lg w-full text-sm rtl:text-right text-blue-100 dark:text-blue-100 border-separate border-spacing-1 border-4 border-indigo-800">
                    <thead>
                        <tr>
                            <th scope="col" class="px-6 py-3 text-base font-bold bg-blue-600 border-b border-blue-400 hover:bg-blue-800">Attribute</th>
                            <th scope="col" class="px-6 py-3 text-base font-bold bg-blue-600 border-b border-blue-400 hover:bg-blue-800">Value</th>
                        </tr>
                    </thead>
                    <tbody key={task.id}>
                        <tr class="">
                            <th scope="row" class="px-6 py-3 text-base font-bold bg-blue-600 border-b border-blue-400 hover:bg-blue-800">
                                Project Name
                            </th>
                            <td scope="row" class="px-6 text-base font-medium whitespace-nowrap dark:text-blue-100 bg-gray-300 border-b border-gray-200 text-gray-900 hover:bg-blue-300">
                                {task.projectName}
                            </td>
                        </tr>
                        <tr class="">
                            <th scope="row" class="px-6 py-3 text-base font-bold bg-blue-600 border-b border-blue-400 hover:bg-blue-800">Project Description</th>
                            <td scope="row" class="px-6 text-base font-medium whitespace-nowrap dark:text-blue-100 bg-gray-300 border-b border-gray-200 text-gray-900 hover:bg-blue-300">
                                {task.projectDesc.length > 100 // Adjust the length as needed
                            ?  <button onClick={openModal} className="underline cursor-pointer font-bold text-lg text-blue-800">View Description</button>
                            : task.projectDesc}
                            </td>
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
                                {new Date(task.projectDeadline).toLocaleDateString("en-US",
                                {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                }
                                )}
                            </td>
                        </tr>
                        <tr class="">
                            <th scope="row" class="px-6 py-3 text-base font-bold bg-blue-600 border-b border-blue-400 hover:bg-blue-800">Project Status
                            </th>
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
                            <button className="mx-2 text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-32 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Edit</button>
                        </NavLink>
                    </div>
                </div>
            </div>
            )}

            {/* Modal for Project Description */}
            {showModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    {/* Background overlay */}
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>

                    {/* Modal panel */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div
                        className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Project Description</h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">{task.projectDesc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button type="button" onClick={closeModal} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">Close</button>
                        </div>
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
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserNavbar from "../Layout/userNavbar";
import UserFooter from "../Layout/userFooter";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [deletedMessage, setDeletedMessage] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/getProjectData')
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          setTasks(data.tasks);
        } else {
          setError(new Error(data.message || "Failed to fetch project data"));
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setError(error);
      });
  }, []);

  // Filter completed and ongoing projects
  const completedProjects = tasks ? tasks.filter(task => task.projectStatus === 'Completed') : [];
  const ongoingProjects = tasks ? tasks.filter(task => task.projectStatus !== 'Completed') : [];

  return (
    <div>
      <UserNavbar />

      <div className="pb-32">
        {deletedMessage && (
          <div className="bg-green-500 text-white p-4 mb-4">
            {deletedMessage}
          </div>
        )}
        <div>
            <div className="mt-4">
          {/* Ongoing Projects Table */}
          {ongoingProjects.length > 0 && (
            <div className="relative overflow-x-auto mx-12 my-4">
              <h2 className="font-bold text-lg text-left ms-12 text-fuchsia-800">Pending Projects</h2>
              <table className="text-center w-full text-sm rtl:text-right text-blue-100 dark:text-blue-100 border-separate border-spacing-1 border-4 border-indigo-800 shadow-md sm:rounded-lg">
                <thead className="text-xs text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white">
                <tr class="bg-blue-600 border-b border-blue-400 hover:bg-blue-500">
                    <th scope="row" class="px-6 py-3 text-base font-bold">Name</th>
                    <th scope="col" class="px-6 py-3 text-base font-bold">Deadline</th>
                    <th scope="col" class="px-6 py-3 text-base font-bold">Status</th>
                    <th scope="col" class="px-6 py-3 text-base font-bold">Action</th>
                  </tr>
                </thead>
                {ongoingProjects.map(task => (
                  <tbody key={task.id}>
                   <tr class="bg-gray-300 border-b border-gray-200 text-gray-900 hover:bg-blue-300">
                      <td scope="row" class="px-6 text-base font-medium whitespace-nowrap dark:text-blue-100">{task.projectName}</td>
                      <td scope="row" class="px-6 text-base font-medium whitespace-nowrap dark:text-blue-100">{task.projectDeadline}</td>
                      <td scope="row" class="px-6 text-base font-medium whitespace-nowrap dark:text-blue-100">{task.projectStatus}</td>

                      <td scope="row" class="px-6 py-1 font-medium whitespace-nowrap dark:text-blue-100">
                        <NavLink to={`/viewProjectDetails/${task.id}`}><button className=" mx-2 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">View Project Details</button></NavLink>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          )}
          </div>

        <div>
          {/* Completed Projects Table */}
          {completedProjects.length > 0 && (
            <div className="relative overflow-x-auto mx-12 my-4">
              <h2 className="font-bold text-lg text-left ms-12 text-fuchsia-800">Completed Projects</h2>
              <table className="text-center w-full text-sm rtl:text-right text-blue-100 dark:text-blue-100 border-separate border-spacing-1 border-4 border-indigo-800 shadow-md sm:rounded-lg">
                <thead className="text-xs text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white">
                <tr class="bg-blue-600 border-b border-blue-400 hover:bg-blue-500">
                    <th scope="row" class="px-6 py-3 text-base font-bold">Name</th>
                    <th scope="col" class="px-6 py-3 text-base font-bold">Deadline</th>
                    <th scope="col" class="px-6 py-3 text-base font-bold">Status</th>
                    <th scope="col" class="px-6 py-3 text-base font-bold">Action</th>
                  </tr>
                </thead>
                {completedProjects.map(task => (
                  <tbody key={task.id}>
                   <tr class="bg-gray-300 border-b border-gray-200 text-gray-900 hover:bg-blue-300">
                      <td scope="row" class="px-6 text-base font-medium whitespace-nowrap dark:text-blue-100">{task.projectName}</td>
                      <td scope="row" class="px-6 text-base font-medium whitespace-nowrap dark:text-blue-100">{task.projectDeadline}</td>
                      <td scope="row" class="px-6 text-base font-medium whitespace-nowrap dark:text-blue-100">{task.projectStatus}</td>

                      <td scope="row" class="px-6 py-1 font-medium whitespace-nowrap dark:text-blue-100">
                        <NavLink to={`/viewProjectDetails/${task.id}`}><button className=" mx-2 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">View Project Details</button></NavLink>
                      </td>
                    </tr>
                    </tbody>
                ))}
              </table>
            </div>
          )}
        </div>
        </div>
      </div>

      <UserFooter />
    </div>
  );
};

export default UserDashboard;

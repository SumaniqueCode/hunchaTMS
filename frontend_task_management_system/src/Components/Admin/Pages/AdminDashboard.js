import React, { useEffect, useState } from "react";
import UserNavbar from "../Layout/adminNavbar";
import UserFooter from "../Layout/adminFooter";
import UserIcon from "../../Images/user.png"
import ClipboardIcon from "../../Images/clipboard.png"

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch users from API
    fetch("http://localhost:8000/api/getUserData")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);

        if (data.status === 200) {
          setUsers(data.users);
        } else {
          // Handle error if needed
          console.error("Failed to fetch users");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch tasks from API (not users)
    fetch("http://localhost:8000/api/getProjectData")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);

        if (data.status === 200) {
          setTasks(data.tasks); // Corrected to setTasks
        } else {
          // Handle error if needed
          console.error("Failed to fetch projects");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      <UserNavbar />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-5 pb-52">
  {/* Number of Users */}
  <div className="bg-gradient-to-r m-3 from-indigo-700 to-indigo-500 text-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
    <div className="border-b-2 border-white mb-6 justify-between flex mx-5">
      <h2 className="text-3xl font-bold tracking-wide my-auto">Total Users</h2>
      <img className="w-16" src={UserIcon}/>
    </div>
    <p className="text-4xl font-bold text-right mx-5">{users.length}</p>
  </div>

  {/* Number of Projects */}
  <div className="m-3 bg-gradient-to-r from-teal-600 to-teal-400 text-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
    <div className="border-b-2 border-white mb-6 flex justify-between mx-5">
      <h2 className="text-3xl font-bold tracking-wide my-auto">Total Projects</h2>
      <img className="w-16" src={ClipboardIcon} />
    </div>
    <p className="text-4xl font-bold text-right mx-5">{tasks.length}</p>
  </div>
</div>

      <UserFooter />
    </div>
  );
};

export default AdminDashboard;

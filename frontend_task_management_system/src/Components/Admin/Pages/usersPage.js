import React, { useEffect, useState } from "react";
import Navbar from "../Layout/adminNavbar";
import Footer from "../Layout/adminFooter";
import { NavLink } from "react-router-dom";

const UsersPage = () => {
    const [error, setError] = useState(null);
    const [users, setUsers] = useState(null);
  
    useEffect(() => {
      fetch('http://localhost:8000/api/getUserData')
        .then(response => response.json())
        .then(data => {
          if (data.status === 200) {
            setUsers(data.users);
          } else {
            setError(new Error(data.message || "Failed to fetch project data"));
          }
        })
        .catch(error => {
          console.error('Error:', error);
          setError(error);
        });
    }, []);


   return(
    <div>
        <Navbar/>
            <div className="pb-24">
            <div>
          {users && (
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg mx-12 my-4 border-4 border-indigo-800">
              <table class="text-center w-full text-sm rtl:text-right text-blue-100 dark:text-blue-100 border-separate">
                <thead class="text-xs text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white">
                  <tr class="bg-blue-600 border-b border-blue-400 hover:bg-blue-800">
                    <th scope="row" class="px-6 py-3 text-base font-bold">Name</th>
                    <th scope="col" class="px-6 py-3 text-base font-bold">Gender</th>
                    <th scope="col" class="px-6 py-3 text-base font-bold">Address</th>
                    <th scope="col" class="px-6 py-3 text-base font-bold">Email</th>
                    <th scope="col" class="px-6 py-3 text-base font-bold">Phone</th>
                  </tr>
                </thead>
                {users.map(user => (
                  <tbody key={user.id}>
                    <tr class="bg-gray-300 border-b border-gray-200 text-gray-900 hover:bg-blue-300">
                      <td scope="row" class="px-6 py-2 text-base font-medium whitespace-nowrap dark:text-blue-100">{user.firstName} {user.lastName}</td>
                      <td scope="row" class="px-6 py-2 text-base font-medium whitespace-nowrap dark:text-blue-100">{user.gender}</td>
                      <td scope="row" class="px-6 py-2 text-base font-medium whitespace-nowrap dark:text-blue-100">{user.address}</td>
                      <td scope="row" class="px-6 py-2 text-base font-medium whitespace-nowrap dark:text-blue-100">{user.email}</td>
                      <td scope="row" class="px-6 py-2 text-base font-medium whitespace-nowrap dark:text-blue-100">{user.phone}</td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          )}
        </div>
            </div>
        <Footer/>
    </div>
   );
}
export default UsersPage;
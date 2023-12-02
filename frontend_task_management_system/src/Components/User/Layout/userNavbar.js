import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../Images/task_management_logo.png"

const AdminNavbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
<div className="bg-blue-600">
      <div className="container mx-auto relative flex items-center p-2 text-lg">
        <div className="flex items-center mx-8">
          <NavLink to="/dashboard" className="logo"><img className="w-12" src={Logo} alt="Logo" /></NavLink>
        </div>
        <div className="hidden md:flex space-x-4 mx-4 gap-1">
          <NavLink to="/dashboard" className="text-white hover:bg-white hover:text-black hover:font-bold mx-2 p-1 rounded">Home</NavLink>
          <NavLink to="/allProjects" className="text-white hover:bg-white hover:text-black hover:font-bold mx-2 p-1 rounded">All Projects</NavLink>
          <NavLink to="/myProjects" className="text-white hover:bg-white hover:text-black hover:font-bold mx-2 p-1 rounded">My Projects</NavLink>
        </div>
        <div className="hidden md:flex space-x-4 ms-auto me-10">
        <NavLink to="/adminProfile" className="text-white hover:bg-white hover:text-black hover:font-bold mx-2 p-1 rounded">Profile</NavLink>
        </div>
        <div className="flex items-center md:hidden relative ms-auto z-50 lg:me-10">
          <NavLink  to="/adminProfile" className="text-white hover:bg-white hover:text-black hover:font-bold mx-2 p-1 rounded">Profile</NavLink>
          <button className="text-white ml-2"  onClick={() => setMenuOpen(!menuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 17 14" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute w-72 top-full right-0 mt-4 bg-blue-600 border border-white p-2 rounded-lg shadow-md">
              <NavLink to="/admin" className="block text-white hover:bg-white hover:text-black hover:font-bold p-2 rounded"> Home </NavLink>
              <NavLink to="/adminProjects" className="block text-white hover:bg-white hover:text-black hover:font-bold p-2 rounded">All Projects</NavLink>
              <NavLink to="/users" className="block text-white hover:bg-white hover:text-black hover:font-bold p-2 rounded">Users</NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
    );
}
export default AdminNavbar;
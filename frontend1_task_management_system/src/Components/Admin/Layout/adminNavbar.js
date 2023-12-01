import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../Images/task_management_logo.png"

const AdminNavbar = () => {
    return (
        <div className="">
            <div className="navbar grid grid-cols-8 md:grid-cols-12 bg-blue-600">
                <div className="flex justify-center p-2 text-white text-lg col-span-2 md:col-span-1 my-auto">
                    <NavLink to="/admin" className="logo"><img className="w-12" src={Logo} /></NavLink>
                </div>
                <div className="flex justify-start p-2 pe-12 text-white text-lg col-span-6 md:col-span-6 my-auto">
                    <NavLink to="/admin" className=" hover:bg-white hover:text-black hover:font-bold p-1 mx-2 rounded">Home</NavLink>
                    <NavLink to="/adminProjects" className="hover:bg-white hover:text-black hover:font-bold p-1 mx-2 rounded">All Projects</NavLink>
                    <NavLink to="/users" className="hover:bg-white hover:text-black hover:font-bold mx-2 p-1 rounded">Users</NavLink>
                </div>
                <div className="flex justify-end p-2 px-12 text-white text-lg col-span-6 md:col-span-5 my-auto">
                    <NavLink to="/adminProfile" className="hover:bg-white hover:text-black hover:font-bold p-1 mx-2 rounded">Profile</NavLink>
                </div>
            </div>
        </div>
    );
}
export default AdminNavbar;
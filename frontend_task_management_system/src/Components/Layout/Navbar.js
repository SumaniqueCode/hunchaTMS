import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../Images/task_management_logo.png"

const Navbar = () => {
    return(
        <div className="navbar grid grid-cols-12 bg-blue-600">
            <div className="p-1 md:p-2 text-white text-lg col-span-2 md:col-span-1 my-auto">
                <div className="flex justify-center">
                    <NavLink to="/" className="logo"><img className="xs:w-8 md:w-12" src={Logo} /></NavLink>
                </div>
            </div>
            <div className="p-1 md:p-2 text-white col-span-8 md:col-span-6 my-auto">
                <div className="flex justify-start">
                    <NavLink to="/" className="xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold font-mono italic p-1 mx-2 rounded">Task Management System</NavLink>
                </div>
            </div>
            <div className="p-1 md:p-2 md:px-12 text-white text-lg col-span-2 md:col-span-5 my-auto">
                <div className="flex justify-end">
                    <NavLink to="/dashboard" className="hover:bg-white hover:text-black hover:font-bold p-1 mx-2 font-medium xs:text-sm md:text-lg rounded">Dashboard</NavLink>
                </div>
            </div>
        </div>
    );
}
export default Navbar; 
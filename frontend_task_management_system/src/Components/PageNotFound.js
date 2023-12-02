import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import pic from "./Images/404-error.png"
import Navbar from "./Layout/Navbar";
import Footer from "./Layout/Footer";

const PageNotFound = () =>{

    const navigate = useNavigate();
    return(
        <div className = "">
            <Navbar/>
            <div className = "text-center grid md:grid-cols-12 mb-32 md:mb-56">
                <div className = "md:col-span-6">
                    <img src={pic} alt="" className = "img-fluid"/>
                </div>
                <div className = " md:col-span-6 my-auto">
                    <p className = "fs-3"> <span className = "m-3 text-sm md:text-lg font-bold text-red-600">Opps! Page not found.</span></p>
                    <p className = "m-3 text-sm md:text-lg font-bold">
                        The page you are looking for doesnot exist.
                    </p>
                    <NavLink to={navigate(-1)} className = "border-2 rounded-full bg-blue-500 p-2 m-2 font-bold text-white">Go Home</NavLink>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
export default PageNotFound;
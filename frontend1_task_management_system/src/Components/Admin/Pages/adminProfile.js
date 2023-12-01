import React from "react";
import Navbar from "../Layout/adminNavbar";
import Footer from "../Layout/adminFooter";
import Logo from "../../Images/task_management_logo.png"

const AdminProfile = () => {
    return(
        <div className="">

            <Navbar/>
                <div>
                <div className="form my-8">
          <div className="max-w-sm mx-auto border-2 border-green-400 p-4 rounded-2xl py-8">
            <h1 className="font-bold text-center text-2xl mb-5">User Data</h1>
            <div className="mb-5 flex justify-center">
                <img src={Logo}  className=" border-2 border-blue-500 p-2 rounded-2xl w-24"/>
            </div>
            <div className="mb-5">
                <h3 className="text-base font-medium text-left">Name:</h3>
            </div>
            <div className="mb-5">
                <h3 className="text-base font-medium text-left">Address:</h3>
            </div>
            <div className="mb-5">
                <h3 className="text-base font-medium text-left">Gender:</h3>
            </div>
            <div className="mb-5">
                <h3 className="text-base font-medium text-left">Email:</h3>
            </div>
            <div className="mb-5">
                <h3 className="text-base font-medium text-left">Phone:</h3>
            </div>


          </div>
        </div>
                </div>
            <Footer/>
        </div>
    );
}
export default AdminProfile;
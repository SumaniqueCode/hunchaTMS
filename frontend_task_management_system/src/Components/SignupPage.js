import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Layout/Navbar";
import Footer from "./Layout/Footer";


const SignupPage = () => {

    
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false); // New state for success message

    const handleSubmit = (event) => {
      event.preventDefault();
  
      // form submission logic here

      fetch('http://localhost:8000/api/addUsers', {
        method: 'POST',
        body: new FormData(event.target),
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          setIsSubmitted(true);
          event.target.reset();
          setError(null);
          setValidationErrors({});
          window.location.href = "/dashboard";
        } else {
          setIsSubmitted(false);
          setError(new Error(data.message || "Submission failed, recheck the entered data"));
          setValidationErrors(data.errors || {});
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setError(error);
        setValidationErrors({});
      });
  };

    return(
        <div>
            <Navbar/>
            <div className="form my-8">
                <form className="max-w-xl mx-auto border-2 border-green-400 p-4 rounded-2xl py-8" method="post" action="http://localhost:8000/api/addUsers" onSubmit={handleSubmit}>
                <legend className="font-bold text-center text-2xl mb-3">SIGN UP FORM</legend>
                    <div className="mb-3">
                        <div className="grid grid-cols-8">
                            <div className="col-span-8 sm:col-span-4 me-1">
                            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">First Name</label>
                                <input type="text" id="firstName" name="firstName" className="bg-blue-50 border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="First Name" />
                                {validationErrors.firstName && (
                            <div className="text-red-600 text-start ms-1">{validationErrors.firstName[0]}</div>
                        )}
                            </div>
                            <div className="col-span-8 sm:col-span-4 ms-1">
                            <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Last Name</label>
                                <input type="text" id="lastName" name="lastName" className="bg-blue-50 border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Last Name" />
                                {validationErrors.lastName && (
                            <div className="text-red-600 text-start ms-1">{validationErrors.lastName[0]}</div>
                        )}
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gender" className=" text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Gender</label>
                        <select id="gender" name="gender" className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option id="" name="" className="" value="Male" >Male</option>
                            <option id="" name="" className="" value="Female" >Female</option>
                            <option id="" name="" className="" value="Other" >Other</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className=" text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                        <input type="text" id="address" name="address" className="bg-blue-50 border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Street, City, State and Country" />
                        {validationErrors.address && (
                            <div className="text-red-600 text-start ms-1">{validationErrors.address[0]}</div>
                        )}                   
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className=" text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                        <input type="phone" id="phone" name="phone" className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter phone number here" />
                        {validationErrors.phone && (
                            <div className="text-red-600 text-start ms-1">{validationErrors.phone[0]}</div>
                        )}                    
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className=" text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" id="email" name="email" className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="abc@gmail.com" />
                        {validationErrors.email && (
                            <div className="text-red-600 text-start ms-1">{validationErrors.email[0]}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className=" text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" id="password" name="password" className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter your password here" />
                        {validationErrors.password && (
                            <div className="text-red-600 text-start ms-1">{validationErrors.password[0]}</div>
                        )}
                    </div>
                    <div className="mb-3">
                    <button type="submit" className="mt-8 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md w-full sm:w-auto px-8 py-2.5 text-center">SIGN UP</button>
                    </div>
                </form>
            </div>
            <Footer/>
        </div>
    );
}
export default SignupPage;
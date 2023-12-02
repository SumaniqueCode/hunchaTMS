import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "./Layout/Navbar";
import Footer from "./Layout/Footer";

const LandingPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Successful login
      console.log("Login successful:", data);
      // Redirect to the dashboard
      navigate("/dashboard");
    } else {
      // Failed login
      setError(data.message);
      console.error("Error during login:", data.message);
    }
  };


  return (
    <div className="">
      <Navbar />
      <div className="bodyDetails">
        <div className="form my-8">
          <form className="max-w-sm mx-auto border-2 border-green-400 p-4 rounded-2xl py-8" onSubmit={handleLogin}>
            <legend className="font-bold text-center text-2xl mb-5">
              LOGIN FORM
            </legend>
            {error && (
              <div className="text-red-600 text-center mb-4">
                {error}
              </div>
            )}
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Your Email</label>
              <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-blue-50 border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter your email here" required/>
            </div>
            <div className="mb-5">
              <label htmlFor="password" className=" text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
              <input
                type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-blue-50 border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter your password here" required/>
            </div>
            <div className="mb-5">
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-8 mt-5 py-2.5 text-center">LOGIN</button>
            </div>
            <div className="mt-2 mb-2">
              <p className="font-semibold text-md">New User?</p>
            </div>
            <div className="mb-5">
              <NavLink to="/register">
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md w-full sm:w-auto px-8 py-2.5 text-center">CREATE NEW ACCOUNT</button>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;

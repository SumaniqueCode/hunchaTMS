import Navbar from "./Layout/Navbar";
import Footer from "./Layout/Footer";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import CrossMark from "./Images/cross_mark.png"

const ProjectEdit = () => {
  const [error, setError] = useState(null);
  const [task, setTask] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fetch data when component mounts
  useEffect(() => {
    fetch(`http://localhost:8000/api/getProjectDetails/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);

        if (data.status === 200) {
          setTask(data.tasks);
        } else {
          setError(new Error(data.message || "Failed to fetch project data"));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error);
      });
  }, [id]);

  //Handling data after submitting form
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`http://localhost:8000/api/updateProjects/${id}`, {
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
          // Redirect to the previous page
          navigate(-1);
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

  const cancelBtn = () =>{
    navigate(-1);
  }

  return (
    <div>
      <Navbar />

      <div>
        <div className="form my-8 relative">
        {task &&(
          <form className="max-w-md mx-auto border-2 border-green-400 p-4 rounded-2xl py-8" method="post" action="" onSubmit={handleSubmit}>
            <legend className="font-bold md:text-center text-left text-xl md:text-2xl mb-3">UPDATE PROJECT DETAILS</legend>
            <div className="mb-3">
              <label htmlFor="projectName" className=" text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Name</label>
              <input type="text" id="projectName" name="projectName" className="bg-blue-50 border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={task.projectName}/>
              {validationErrors.projectName && (
                <div className="text-red-600 text-start ms-1">{validationErrors.projectName[0]}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="projectDesc" className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project  Description</label>
              <textarea type="text" id="projectDesc" name="projectDesc" className="pb-20 px-2 bg-blue-50 border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" placeholder={task.projectDesc}/>
              {validationErrors.projectDesc && (
                <div className="text-red-600 text-start ms-1">{validationErrors.projectDesc[0]}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="projectStatus" className=" text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select project status</label>
              <select id="projectStatus" name="projectStatus" className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <option id="" name="" className="" value="Pending" >Pending</option>
                <option id="" name="" className="" value="Completed" >Completed</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="members" className=" text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Members</label>
              <input type="text" id="members" name="members" className="bg-blue-50 border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={task.members}/>
              {validationErrors.members && (
                <div className="text-red-600 text-start ms-1">{validationErrors.members[0]}</div>
              )}
            </div>
            <div className="mb-3">
              <button type="submit" className="mt-8 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md w-full sm:w-auto px-8 py-2.5 text-center">UPDATE</button>
            </div>
          </form>
          )};
          <div className="flex justify-end max-w-2xl mx-auto p-auto absolute top-4 left-3/4 lg:left-2/3">
            <img src={CrossMark} className="w-12 hover:border-4 hover:border-red-600 border rounded-full m-2" onClick={() => cancelBtn()} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectEdit;

import UserNavbar from "../Layout/userNavbar";
import UserFooter from "../Layout/userFooter";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";


const AddProject = () => {
        
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false); // New state for success message

    const handleSubmit = (event) => {
      event.preventDefault();
  
      // form submission logic here

      fetch('http://localhost:8000/api/addProjects', {
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



    return(
        <div>
            <UserNavbar />
            
            <div>
            <div className="form my-8">
                  <form className="max-w-xl mx-auto border-2 border-green-400 p-4 rounded-2xl py-8" method="post" action="http://localhost:8000/api/addProjects" onSubmit={handleSubmit}>
                    <legend className="font-bold text-center text-2xl mb-5">ADD PROJECTS</legend>
                    <div className="mb-5">
                          <label htmlFor="projectName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Project Title</label>
                          <input type="text" id="projectName" name="projectName" className="bg-blue-50 border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter project title" required />
                          {validationErrors.projectName && (
                            <div className="text-red-600 text-start ms-1">{validationErrors.projectName[0]}</div>
                        )}
                      </div>
                      <div className="mb-5">
                          <label htmlFor="projectDesc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Project Description</label>
                          <textarea type="text" id="projectDesc" name="projectDesc" className="bg-blue-50 border border-blue-300 text-blue-900 text-sm pb-24 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter minumum 100 words" required />
                          {validationErrors.projectDesc && (
                            <div className="text-red-600 text-start ms-1">{validationErrors.projectDesc[0]}</div>
                        )}
                      </div>
                      <div className="mb-5">
                          <label htmlFor="projectDeadline" className=" text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Deadline</label>
                          <input type="date" id="projectDeadline" name="projectDeadline" className="bg-blue-50 border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required/>
                          {validationErrors.projectDeadline && (
                            <div className="text-red-600 text-start ms-1">{validationErrors.projectDeadline[0]}</div>
                        )}
                      </div>
                      <div className="mb-5">
                          <label htmlFor="projectStatus" className=" text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Status</label>
                          <select id="projectStatus" name="projectStatus" className="bg-blue-50 border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required >
                            <option id="pending" name="pending" value="Pending" className="">Pending</option>
                            <option id="completed" name="completed" value="Completed" className="">Completed</option>
                          </select>
                      </div>
                      <div className="mb-5">
                          <label htmlFor="members" className=" text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter members in this project</label>
                          <input type="text" id="members" name="members" className="bg-blue-50 border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter your members here" required />
                          {validationErrors.members && (
                            <div className="text-red-600 text-start ms-1">{validationErrors.members[0]}</div>
                        )}
                      </div>
                      <div className="mb-5">
                      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-8 mt-5 py-2.5 text-center">SUBMIT</button>
                      </div>
                  </form>
                </div>
            </div>

            <UserFooter />
        </div>
    )
}
export default AddProject;
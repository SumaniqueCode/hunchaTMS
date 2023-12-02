The TASK MANAGEMENT SYSTEM is made by SUMAN REGMI includes the following things.

	1. Frontend 
		-The frontend in this project is made using HTML and Tailwind Css in React
		-one can access the frontend by running cmd "npm start" in frontend file.
		-The routes for frontend are as follows:
		
	a. User Route
			http://localhost:3000/				for landing page which shows user login form and button for creating new account
			http://localhost:3000/register			opens the signup form
			http://localhost:3000/dashboard			for user dashboard which shows list of completed and pending projects
			http://localhost:3000/allProjects		shows all the project lists and also gives button for adding new project and viewing project details
			http://localhost:3000/addProject		opens the form for adding new project
			http://localhost:3000/viewProjectDetails/{id}	shows the project details with provided id
			http://localhost:3000/editProjectDetails/{id}	opens form for editing project with given id.
	b.admin Route
			http://localhost:3000/admin			opens admin Dashboard with total number of users and projects
			http://localhost:3000/adminProjects		shows all the project list with buttons for adding, viewing and deleting project
			http://localhost:3000/users			shows the list of users with their details

	2. Backend
		-The backend is made using laravel.
		-Run cmd "php artisan serve" and "php artisan migrate" and database software to access the api.
		-Add database name as "tsmhuncha"

		Routes:
			http://localhost:8000/api/addUsers			for adding new users
			http://localhost:8000/api/updateUserData		for updating user data
			http://localhost:8000/api/addProjects			for adding new Project
			http://localhost:8000/api/updateProjects/{id}		for updating project details

			http://localhost:8000/api/getUserData			for fetching userdata
			http://localhost:8000/api/getProjectData		for fetching project Data
			http://localhost:8000/aoi/getProjectDetails/{id}	for fetching project Details with provided id
			http://localhost:8000/api/deleteUser/{id}		for deleting user
			http://localhost:8000/api/deleteProject/{id}		for deleting project

The Project is under development and many features are yet to be added.

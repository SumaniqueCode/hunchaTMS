/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/App.js",
    "./src/Components/PageNotFound.js",
    "./src/Components/landingPage.js",
    "./src/Components/SignupPage.js",
    "./src/Components/profile.js",
    "./src/Components/ProjectEdit.js",
    
    "./src/Components/Layout/Navbar.js",
    "./src/Components/Layout/Footer.js",
    "./src/Components/User/Layout/userNavbar.js",
    "./src/Components/User/Layout/userFooter.js",
    "./src/Components/Admin/Layout/adminNavbar.js",
    "./src/Components/Admin/Layout/adminFooter.js",

    "./src/Components/User/Pages/userDashboard.js",
    "./src/Components/User/Pages/AddProject.js",
    "./src/Components/User/Pages/AllProjects.js",
    "./src/Components/User/Pages/projectDetails.js",

    "./src/Components/Admin/Pages/AdminDashboard.js",
    "./src/Components/Admin/Pages/AllProjects.js",
    "./src/Components/Admin/Pages/AddProject.js",
    "./src/Components/Admin/Pages/adminProfile.js",
    "./src/Components/Admin/Pages/userPage.js",

  ],
  theme: {
    extend: {
      screens: {
        'xs': '320px',
        // => @media (min-width: 320px) { ... }
        },
    },
  },
  plugins: [],
}


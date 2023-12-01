import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PageNotFound from './Components/PageNotFound';
import LandingPage from './Components/landingPage';
import UserDashboard from './Components/User/Pages/userDashboard';
import SignupPage from './Components/SignupPage'
import AddProject from './Components/User/Pages/AddProject';
import MyProjects from './Components/User/Pages/MyProjects';
import AllProjects from './Components/User/Pages/AllProjects';
import AdminDashboard from './Components/Admin/Pages/AdminDashboard';
import AdminProject from './Components/Admin/Pages/AllProjects';
import Profile from './Components/profile';
import ProjectDetails from './Components/User/Pages/projectDetails';
import AdminProfile from './Components/Admin/Pages/adminProfile';
import UsersPage from './Components/Admin/Pages/usersPage';
import AdminAddProject from './Components/Admin/Pages/AddProject';
import ProjectEdit from './Components/ProjectEdit';

function App() {
  return (
    <Router>
      <div className="App">
          <Routes>
            <Route path='*' element={<PageNotFound/>} />
            <Route exact path="/" element={<LandingPage/>} />
            <Route exact path="/profile" element={<Profile/>} />
            <Route exact path="/dashboard" element={<UserDashboard/>} />
            <Route path='/register' element={<SignupPage/>} />
            <Route path='/myProjects' element={<MyProjects/>} />
            <Route path='/addProjects' element={<AddProject/>} />
            <Route path='/allProjects' element={<AllProjects/>} />
            <Route path='/viewProjectDetails/:id' element={<ProjectDetails/>} />
            <Route path='/editProjectDetails/:id' element={<ProjectEdit/>} />


            <Route path='/admin' element={<AdminDashboard/>} />
            <Route path='/adminAddProject' element={<AdminAddProject/>} />
            <Route path='/adminProfile' element={<AdminProfile/>} />
            <Route path='/adminProjects' element={<AdminProject/>} />
            <Route path='/users' element={<UsersPage/>} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;

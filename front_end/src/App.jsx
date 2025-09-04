import React from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import UsersDashboard from './pages/User/UsersDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import TeamMembers from './pages/Admin/TeamMembers';
import CreateTask from './pages/Admin/CreateTask';
import UserDetails from './pages/Admin/UserDetails';


const App = () => {
  return (
  
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/users-dashboard' element={<UsersDashboard />} />
      <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path="/team-members" element={<TeamMembers />} />
        <Route path='/create-task' element={<CreateTask />} />
        <Route path='/user-infos/:id' element={<UserDetails />} />




     </Routes>
     </BrowserRouter>
  )
}

export default App

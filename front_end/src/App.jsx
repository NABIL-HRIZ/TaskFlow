import React from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import AdminDashboard from './pages/Admin/AdminDashboard';
import TeamMembers from './pages/Admin/TeamMembers';
import CreateTask from './pages/Admin/CreateTask';
import UserDetails from './pages/Admin/UserDetails';
import ManageTask from './pages/Admin/ManageTask';
import TaskDetails from './pages/Admin/TaskDetails';
import UserDashboard from './pages/User/UserDashboard';
import MyTasks from './pages/User/MyTasks';
import MyTaskDetails from './pages/User/MyTaskDetails';
import CreateUserTask from './pages/User/CreateUserTask';
import ForgotPassword from './Auth/ForgotPassword';

const App = () => {
  return (
  
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forget-password' element={<ForgotPassword />} />
      


      
      <Route path='/users-dashboard' element={<UserDashboard />} />
      <Route path='/my-tasks' element={<MyTasks />} />
        <Route path='/mytask-details/:id' element={<MyTaskDetails />} />
         <Route path='/create-user-task' element={<CreateUserTask />} />

       
       <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path="/team-members" element={<TeamMembers />} />
        <Route path='/user-infos/:id' element={<UserDetails />} />
         <Route path='/create-task' element={<CreateTask />} />
        <Route path='/manage-tasks' element={<ManageTask />} />
        <Route path='/task-details/:id' element={<TaskDetails />} />






     </Routes>
     </BrowserRouter>
  )
}

export default App

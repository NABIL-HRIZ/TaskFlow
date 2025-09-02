import React from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import UsersDashboard from './pages/User/UsersDashboard';
const App = () => {
  return (
  
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/users-dashboard' element={<UsersDashboard />} />


     </Routes>
     </BrowserRouter>
  )
}

export default App

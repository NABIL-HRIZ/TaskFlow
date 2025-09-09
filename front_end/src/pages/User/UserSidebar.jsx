import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";


const UserSidebar = () => {
  const [user, setUser] = useState({
    name:"",
    email:'',
   
    
  });
  const navigate = useNavigate();

    useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://127.0.0.1:8000/api/user", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

const handleLogout = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      await axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }
  } catch (err) {
    console.error("Logout failed:", err.response?.data || err);
  } finally {
    
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/"); 
  }
};


  return (
    <div className="sidebar">
      <h2 className="sidebar-logo">TaskFlow</h2>

        <div className="admin-profile">
          <div className="admin-avatar">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div className="admin-info">
            <h3>{user?.name}</h3>
            <p>{user?.email}</p>
          </div>
        </div>
      

    <ul className="sidebar-links">
  <li>
    <NavLink 
      to="/users-dashboard"
      className={({ isActive }) => isActive ? "active-link" : ""}
    >
      Dashboard
    </NavLink>
  </li>
  <li>
    <NavLink 
      to="/my-tasks"
      className={({ isActive }) => isActive ? "active-link" : ""}
    >
      My Tasks
    </NavLink>
  </li>

  <li>
    <NavLink 
      to="/create-user-task"
      className={({ isActive }) => isActive ? "active-link" : ""}
    >
      Create Task
    </NavLink>
  </li>


</ul>


      <button className="sidebar-logout" onClick={handleLogout}>
         Logout
      </button>
    </div>
  );
};

export default UserSidebar;

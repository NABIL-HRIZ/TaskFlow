import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/Sidebar.css";

const Sidebar = () => {
  const [admin, setAdmin] = useState({
    name:'',
    email:'',
    role:'user',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://127.0.0.1:8000/api/admin", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmin(res.data.admin);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAdmin();
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
            {admin.name.charAt(0).toUpperCase()}
          </div>
          <div className="admin-info">
            <h3>{admin.name}</h3>
            <p>{admin.email}</p>
            <span className="admin-role">{admin.role}</span>
          </div>
        </div>
      

      <ul className="sidebar-links">
        <li>
          <Link to="/admin-dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/manage-tasks">Manage Tasks</Link>
        </li>
        <li>
          <Link to="/create-task">Create Task</Link>
        </li>
        <li>
          <Link to="/team-members">Team Members</Link>
        </li>
      </ul>

      <button className="sidebar-logout" onClick={handleLogout}>
         Logout
      </button>
    </div>
  );
};

export default Sidebar;

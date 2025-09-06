import React, { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import axios from "axios";
import "../../styles/AdminDashboard.css";
import { FaArrowsTurnToDots } from 'react-icons/fa6';
import { RiProgress1Fill } from 'react-icons/ri';
 import { MdDoneOutline } from 'react-icons/md';
import { FaTasks } from 'react-icons/fa';
const AdminDashboard = () => {
  const [admin, setAdmin] = useState({
    name: ''
  });
  const [today, setToday] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

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

    const currentDate = new Date().toLocaleDateString("fr-FR", {
      weekday: "long", 
      day: "numeric",
      month: "long",  
      year: "numeric",
    });
    setToday(currentDate);
    fetchAdmin();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://127.0.0.1:8000/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data.tasks);
      } catch (err) {
        console.error("Error fetching tasks:", err.response?.data || err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const totalTasks = tasks.length;
  const todoTasks = tasks.filter(task => task.status === 'todo').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in_progress').length;
  const doneTasks = tasks.filter(task => task.status === 'done').length;

  if (loading) {
    return (
      <AdminLayout>
        <div className="dashboard-loading">
          <div className="loading-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <div className="dashboard-header">
          <div>
            <h1 className="admin-greeting">Good Morning, {admin.name}</h1>
            <p className="current-date">{today}</p>
          </div>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card total-tasks">
            <div className="stat-icon">
             <FaTasks />
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{totalTasks}</h3>
              <p className="stat-label">Total Tasks</p>
            </div>
          </div>

          <div className="stat-card todo-tasks">
            <div className="stat-icon">
             < FaArrowsTurnToDots />
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{todoTasks}</h3>
              <p className="stat-label">To Do</p>
            </div>
          </div>

          <div className="stat-card progress-tasks">
            <div className="stat-icon">
             <RiProgress1Fill />
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{inProgressTasks}</h3>
              <p className="stat-label">In Progress</p>
            </div>
          </div>

          <div className="stat-card done-tasks">
            <div className="stat-icon">
              <MdDoneOutline />
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{doneTasks}</h3>
              <p className="stat-label">Completed</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
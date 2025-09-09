import React, { useState, useEffect } from "react";
import UserLayout from "./UserLayout";
import axios from "axios";
import { FaArrowsTurnToDots } from 'react-icons/fa6';
import { RiProgress1Fill } from 'react-icons/ri';
import { MdDoneOutline } from 'react-icons/md';
import { FaTasks } from 'react-icons/fa';
import { Cell, Pie, PieChart, ResponsiveContainer, Legend,
 BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const UserDashboard = () => {
  const [user, setUser] = useState({
    name: ''
  });
  const [today, setToday] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
         const res = await axios.get("http://127.0.0.1:8000/api/user", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data.user);
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
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://127.0.0.1:8000/api/my-tasks", {
        headers: { Authorization: `Bearer ${token}` }
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

  const data = [
    { name: "To Do", value: todoTasks, color: "#d8e758" },
    { name: "In Progress", value: inProgressTasks, color: "#78c782" },
    { name: "Done", value: doneTasks, color: "#03541d" },
  ];

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const lowTasks = tasks.filter(task => task.priority === 'low').length;
  const mediumTasks = tasks.filter(task => task.priority === 'medium').length;
  const highTasks = tasks.filter(task => task.priority === 'high').length;

  const dataa = [
    { name: "Low Tasks", value: lowTasks },
    { name: "Medium Tasks", value: mediumTasks },
    { name: "High Tasks", value: highTasks },
  ];


  const getStatusClass = (status) => {
    switch (status) {
      case 'todo': return 'status-todo';
      case 'in_progress': return 'status-in-progress';
      case 'done': return 'status-done';
      default: return '';
    }
  };


  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'low': return 'priority-low';
      case 'medium': return 'priority-medium';
      case 'high': return 'priority-high';
      default: return '';
    }
  };

  const formatStatus = (status) => {
    switch (status) {
      case 'todo': return 'To Do';
      case 'in_progress': return 'In Progress';
      case 'done': return 'Done';
      default: return status;
    }
  };

  if (loading) {
    return (
      <UserLayout>
        <div className="dashboard-loading">
          <div className="loading-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="admin-dashboard">
        <div className="dashboard-header">
          <div>
            <h1 className="admin-greeting">Good Morning, {user.name}</h1>
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
              <FaArrowsTurnToDots />
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

        <div className="chart-container">
          <div className="chart-wrapper">
            <h2>Task Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={60} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-wrapper">
            <h2>Task Priorities</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataa}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value">
                  {dataa.map((entry, index) => {
                    let color = "#82ca9d"; 
                    if (entry.name.includes("High")) color = "#6e4c03";
                    if (entry.name.includes("Medium")) color = "#deb626";
                    if (entry.name.includes("Low")) color = "#f3e48ce0";

                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

       
      </div>
    </UserLayout>
  );
}; 

export default UserDashboard;
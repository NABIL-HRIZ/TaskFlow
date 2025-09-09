import React, { useEffect, useState } from "react";
import UserLayout from "./UserLayout";
import axios from "axios";
import { Link } from "react-router-dom";


const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); 

useEffect(() => {
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://127.0.0.1:8000/api/my-tasks", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data.tasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchTasks();
}, []);


  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'todo': return 'status-todo';
      case 'in_progress': return 'status-in-progress';
      case 'done': return 'status-done';
      default: return 'status-todo';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <UserLayout>
        <div className="manage-task-container">
          <div className="loading-spinner"></div>
          <p>Loading tasks...</p>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="manage-task-container">
        <div className="task-header">
          <h1>My Tasks</h1>
          <div className="filter-controls">
            <button 
              className={filter === "all" ? "active" : ""} 
              onClick={() => setFilter("all")}
            >
              All Tasks
            </button>
            <button 
              className={filter === "todo" ? "active" : ""} 
              onClick={() => setFilter("todo")}
            >
              To Do
            </button>
            <button 
              className={filter === "in_progress" ? "active" : ""} 
              onClick={() => setFilter("in_progress")}
            >
              In Progress
            </button>
            <button 
              className={filter === "done" ? "active" : ""} 
              onClick={() => setFilter("done")}
            >
              Completed
            </button>
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <h3>No tasks found</h3>
            <p>There are no tasks matching your current filter.</p>
          </div>
        ) : (
          <div className="task-grid">
            {filteredTasks.map((task) => (
              <Link key={task.id} to={`/mytask-details/${task.id}`}  style={{textDecoration:'none'}}>
 <div  className="task-card">
                <div className={`priority-bar ${getPriorityClass(task.priority)}`}></div>
                
                <div className="task-card-header">
                  <h3 className="task-title">{task.title}</h3>
                  <div className="task-meta">
                    <span className={`status-badge ${getStatusClass(task.status)}`}>
                      {task.status}
                    </span>
                    <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>

                <div className="task-card-body">
                  <p className="task-description">
                    {task.description || "No description provided."}
                  </p>
                  
                  <div className="assigned-users">
                    <h4>Assigned to:</h4>
                    <div className="user-tags">
                      {task.assigned_to ? (
                        <span className="user-tag">
                          {task.assigned_to.name}
                        </span>
                      ) : (
                        <span className="user-tag unassigned">Unassigned</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="task-card-footer">
                  <div className="date-info">
                    <div className="date-item">
                      <span className="date-label">Created:</span>
                      <span className="date-value">{formatDate(task.created_at)}</span>
                    </div>
                    <div className="date-item">
                      <span className="date-label">Due:</span>
                      <span className="date-value">{formatDate(task.due_date)}</span>
                    </div>
                  </div>
                  <div className="created-by">
                    <span className="created-by-label">By {task.created_by?.name || "Unknown"}</span>
                  </div>
                </div>
              </div>
                </Link>
             
            ))}
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default MyTasks;
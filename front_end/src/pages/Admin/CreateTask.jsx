import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import axios from 'axios';
import swal from 'sweetalert';
import '../../styles/CreateTask.css';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    due_date: '',
    assigned_to:"",
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://127.0.0.1:8000/api/admin', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.users);
      } catch (err) {
        console.error('Error fetching users:', err.response?.data || err);
        swal('Failed to fetch users', { icon: 'error' });
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem("token");

      await axios.post("http://127.0.0.1:8000/api/tasks",task,{
        headers: { Authorization: `Bearer ${token}` },
      });

      swal("Task created successfully!", { icon: "success" });
      navigate('/manage-tasks')

      setTask({
        title: "",
        description: "",
        status: "todo",
        priority: "medium",
        due_date: "",
        assigned_to:"",
      });
     
    } catch (err) {
      console.error("Error creating task:", err.response?.data || err);
      const errorMessage = err.response?.data?.error || "Failed to create task";
      swal(errorMessage, { icon: "error" });
    } finally {
      setLoading(false);
    }
  };


  return (
    <AdminLayout>
      <div className="create-task-container">
        <div className="create-task-header">
          <h2>Create New Task</h2>
          <p>Fill in the details to create a new task for your team</p>
        </div>
        
        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-row">
            <div className="form-group">
              <label>Task Title *</label>
              <input
                type="text"
                name="title"
                value={task.title}
                onChange={handleChange}
                placeholder="Enter task title"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Due Date *</label>
              <input
                type="date"
                name="due_date"
                value={task.due_date}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              placeholder="Describe the task details, objectives, and requirements..."
              className="form-textarea"
            ></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Status</label>
              <div className="status-selector">
                {['todo', 'in_progress', 'done'].map(status => (
                  <label key={status} className={`status-option ${task.status === status ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="status"
                      value={status}
                      checked={task.status === status}
                      onChange={handleChange}
                    />
                    <span>
                      {status === 'todo' && 'To Do'}
                      {status === 'in_progress' && 'In Progress'}
                      {status === 'done' && 'Completed'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Priority</label>
              <div className="priority-selector">
                {['low', 'medium', 'high'].map(priority => (
                  <label key={priority} className={`priority-option ${task.priority === priority ? 'active' : ''} ${priority}`}>
                    <input
                      type="radio"
                      name="priority"
                      value={priority}
                      checked={task.priority === priority}
                      onChange={handleChange}
                    />
                    <span>
                      {priority === 'low' && 'Low'}
                      {priority === 'medium' && 'Medium'}
                      {priority === 'high' && 'High'}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
<div className="form-group">
  <label>Assign To</label>
  <div className="user-selection">
    <div className="user-list">
      {users.map((user) => (
        <div
          key={user.id}
          className={`user-item ${task.assigned_to === user.id ? 'selected' : ''}`}
          onClick={() => setTask({ ...task, assigned_to: user.id })}
        >
          <div className="user-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="user-info">
            <span className="user-name">{user.name}</span>
            <span className="user-role">{user.role}</span>
          </div>
          <div className="checkmark">
            {task.assigned_to === user.id && '✓'}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

               

          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Creating Task...
                </>
              ) : (
                'Create Task'
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreateTask;
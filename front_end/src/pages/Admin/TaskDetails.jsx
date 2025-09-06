import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import '../../styles/TaskDetails.css';
 import { BsCalendarDate } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
const TaskDetails = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    due_date: '',
    assigned_to: "",
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://127.0.0.1:8000/api/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTask(res.data.task);
      } catch (err) {
        console.error(err);
        swal('Failed to fetch task data', { icon: 'error' });
      }
    };
    
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://127.0.0.1:8000/api/admin', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.users);
      } catch (err) {
        console.error('Error fetching users:', err.response?.data || err);
      }
    };
    
    fetchTask();
    fetchUsers();
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
     await axios.put(`http://127.0.0.1:8000/api/task/${id}`, {
  ...task,
  assigned_to: task.assigned_to?.id || task.assigned_to || null,
}, {
  headers: { Authorization: `Bearer ${token}` },
});

      swal('Task updated successfully!', { icon: 'success' }).then(() => {
        setIsEditing(false);
        navigate('/manage-tasks')
      });
    } catch (err) {
      console.error(err);
      swal('Failed to update task', { icon: 'error' });
    } finally {
      setLoading(false);
    }
  };

   const handleDelete = () => {
    swal({
      title: `Delete ${task.title}?`,
      text: 'Once deleted, this Task cannot be recovered!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const token = localStorage.getItem('token');
          await axios.delete(`http://127.0.0.1:8000/api/task/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          swal('Task deleted successfully!', { icon: 'success' }).then(() => {
            navigate('/manage-tasks');
          });
        } catch (err) {
          console.error(err);
          swal('Failed to delete this Task', { icon: 'error' });
        }
      }
    });
  };

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
    if (!dateString) return 'Not set';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <AdminLayout>
      <div className="task-details-container">
        <div className="task-details-header">
          <button className="back-button" onClick={() => navigate('/manage-tasks')}>
            &larr; Back to Tasks
          </button>
          <div className="header-actions">
            {!isEditing ? (
              <button className="edit-button" onClick={() => setIsEditing(true)}>
                Edit Task
              </button>
            ) : (
              <div className="edit-actions">
                <button className="delete-button" onClick={handleDelete}>
                 Delete
                </button>
                <button 
                  className="save-button" 
                  onClick={handleUpdate}
                  disabled={loading}
                >
                 Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="task-details-content">
          {!isEditing ? (
            <div className="task-view">
              <div className="task-header">
                <h1>{task.title}</h1>
                <div className="task-meta">
                  <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className={`status-badge ${getStatusClass(task.status)}`}>
                    {task.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div className="task-body">
                <div className="task-description">
                  <h3>Description</h3>
                  <p>{task.description || 'No description provided.'}</p>
                </div>

                <div className="task-info-grid">
                  <div className="info-item">
                    <div className="info-label">
                     <BsCalendarDate  style={{color:"#6F826A"}} />
                      Due Date
                    </div>
                    <div className="info-value">{formatDate(task.due_date)}</div>
                  </div>

                  <div className="info-item">
                    <div className="info-label">
                     <FaUser  style={{color:"#6F826A"}} />
                      Assigned To
                    </div>
                    <div className="info-value"> {task.assigned_to?.name || "Unknown"}</div>
                  </div>

                  <div className="info-item">
                    <div className="info-label">
                     <FaUser  style={{color:"#6F826A"}} />
                      Created By
                    </div>
                    <div className="info-value"> {task.created_by?.name || "Unknown"}</div>
                  </div>

                  <div className="info-item">
                    <div className="info-label">
                     <BsCalendarDate style={{color:"#6F826A"}}/>
                     
                      Created At
                    </div>
                    <div className="info-value">{formatDate(task.created_at)}</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (

            
            // Edit mode
            <div className="task-edit">
              <div className="edit-form">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    className="form-textarea"
                    rows="4"
                  ></textarea>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Status</label>
                    <select 
                      name="status" 
                      value={task.status} 
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="todo">To Do</option>
                      <option value="in_progress">In Progress</option>
                      <option value="done">Completed</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Priority</label>
                    <select
                      name="priority"
                      value={task.priority}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Due Date</label>
                    <input
                      type="date"
                      name="due_date"
                      value={task.due_date}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Assign To</label>
                  <select
  name="assigned_to"
  value={task.assigned_to?.id || task.assigned_to || ""}
  onChange={handleChange}
  className="form-select"
>
  <option value="">Select User</option>
  {users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name} 
    </option>
  ))}
</select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default TaskDetails;
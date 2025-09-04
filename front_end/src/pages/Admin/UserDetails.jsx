import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import '../../styles/UserDetails.css';

const UserDetails = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: 'user',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://127.0.0.1:8000/api/admin/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error(err);
        swal('Failed to fetch user data', { icon: 'error' });
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://127.0.0.1:8000/api/admin/${id}`, user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      swal('User updated successfully!', { icon: 'success' }).then(() => {
        navigate('/team-members');
      });
    } catch (err) {
      console.error(err);
      swal('Failed to update user', { icon: 'error' });
    }
  };

  const handleDelete = () => {
    swal({
      title: `Delete ${user.name}?`,
      text: 'Once deleted, this user cannot be recovered!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const token = localStorage.getItem('token');
          await axios.delete(`http://127.0.0.1:8000/api/admin/${user.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          swal('User deleted successfully!', { icon: 'success' }).then(() => {
            navigate('/team-members');
          });
        } catch (err) {
          console.error(err);
          swal('Failed to delete user', { icon: 'error' });
        }
      }
    });
  };

  return (
    <AdminLayout>
      <div className="user-details-container">
        <h2>Edit User</h2>
        <div className="user-edit-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Enter full name"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select name="role" value={user.role} onChange={handleChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="btns">
             <button className="update-btn" onClick={handleUpdate}>
              Save Changes
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              Delete
            </button>
           
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserDetails;

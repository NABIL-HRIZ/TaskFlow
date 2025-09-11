import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";
import '../../styles/TeamMembers.css'
import swal from 'sweetalert';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
const TeamMembers = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", password_confirmation: "" });
  const [tasks,setTasks]=useState([]);
 const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://127.0.0.1:8000/api/admin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data.users);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

    const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };


const handleCreateUser = async (e) => {
  e.preventDefault();

  if (!newUser.name || !newUser.email || !newUser.password || !newUser.password_confirmation) {
    swal("Please fill in all fields!", "", "warning");
    return;
  }

  if (newUser.password !== newUser.password_confirmation) {
    swal("Passwords do not match!", "", "warning");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    const res = await axios.post("http://127.0.0.1:8000/api/admin", newUser, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data.user) {
      setUsers([...users, res.data.user]);
      swal("User created successfully!", { icon: "success" });

      setNewUser({ name: "", email: "", password: "", password_confirmation: "" });
      handleClose();
    } else {
      console.error("Unexpected response:", res.data);
      swal("Something went wrong!", { icon: "error" });
    }
  } catch (err) {
      console.error(err.response?.data || err);
      swal("email has already ! ", { icon: "error" });
    }
  
};


  
  const todoTasks = tasks.filter(task => task.status === 'todo').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in_progress').length;
  const doneTasks = tasks.filter(task => task.status === 'done').length;


  return (

    <AdminLayout>
 <div>
       <h1>Team Members</h1>
        <Button  onClick={handleShow} style={{backgroundColor:'#BF9264',marginLeft:"800px"}}>
        Create new user
      </Button>

    <Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Create a user</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <form onSubmit={handleCreateUser}>
      <div className="form-grid">
        <div id="form-group">
          <label htmlFor="name">Nom complet</label>
          <div id="input-with-icon">
            <i className="fa-solid fa-user"></i>
            <input
              type="text"
              id="name"
              name="name"
              value={newUser.name}
              placeholder="Entrez votre Nom Complet"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div id="form-group">
          <label htmlFor="email">Adresse e-mail</label>
          <div id="input-with-icon">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              id="email"
              name="email"
              value={newUser.email}
              placeholder="Entrez votre e-mail"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div id="form-group">
          <label htmlFor="password">Mot de passe</label>
          <div id="input-with-icon">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              id="password"
              name="password"
              value={newUser.password}
              placeholder="Entrez votre mot de passe"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div id="form-group">
          <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
          <div id="input-with-icon">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              id="confirmPassword"
              name="password_confirmation"
              value={newUser.password_confirmation}
              placeholder="Confirmez votre mot de passe"
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>
    </form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Close
    </Button>
    <Button  onClick={handleCreateUser} style={{backgroundColor:'#8FA31E'}}>
      Save User
    </Button>
  </Modal.Footer>
</Modal>

       <div className="user-card">
           {users.map((u) => (
            <Link key={u.id} to={`/user-infos/${u.id}`}  style={{textDecoration:'none'}}>
  <div className="user-profile" key={u.id}>
          <div className="user-avatar">
            {u.name.slice(0,2).toUpperCase()}
          </div>
          <div className="user-info">
            <h3>{u.name}</h3>
            <p>{u.email}</p>
            <span className="user-role">{u.role}</span>
           

     

          </div>
        </div>
                
            </Link>
          
           
          ))}
       </div>
         
       
    </div>

    </AdminLayout>
   
  );
};

export default TeamMembers;

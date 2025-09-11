
import React, { useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email:"", password: "" });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      toast.warning("Veuillez remplir tous les champs", {
        position: "top-left",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login", values);
       localStorage.setItem("token", res.data.token);
       localStorage.setItem("role", res.data.role[0]);

      toast.success("Connexion réussie !", {
        position: "top-left",
        autoClose:2000,
        theme: "light",
        transition: Bounce,
        onClose: () => {
          const role = localStorage.getItem("role");
if (role === "admin") {
  navigate("/admin-dashboard");
} else {
  navigate("/users-dashboard");
}
        
          
       
        }
         
      });

    
    } 
     catch (err) {
  console.error(err);
  const errorMessage =
    err.response?.data?.message || 
    err.response?.data?.error ||  
    "Email ou mot de passe incorrect";
      toast.error(errorMessage, {
        position: "top-left",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
    } 
  };


  return (
    <section className="login-section">
      
      <div className="login-container">

        

        <div className="form-side">
          <h2>Connexion</h2>
          <p>Entrez vos identifiants pour continuer ! </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Adresse e-mail</label>
              <div className="input-with-icon">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  id="email"
                  placeholder="Entrez votre e-mail"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <div className="input-with-icon">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  id="password"
                  placeholder="Entrez votre mot de passe"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                />
              </div>
            </div>



            <button class="btn-17" type="submit">
  <span class="text-container">
    <span class="text">Connextion</span>
  </span>
</button>

          </form>
          <div className="forget-password" style={{marginTop:"20px"}}>
            <Link to='/forget-password' style={{textDecoration:'none'}}> 
            forget password ? 

            </Link>

          </div>

          <div className="signup-link">
            Pas de compte ? <Link to="/register">Inscrivez-vous maintenant</Link>
          </div>
        </div>
      </div>

      <ToastContainer />
    </section>
  );
};

export default Login;

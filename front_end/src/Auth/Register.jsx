

import React, { useState } from 'react';
import '../styles/register.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

    const navigate=useNavigate()
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      if (!values.name || !values.email || !values.password || !values.password_confirmation)  {
          toast.warning("Veuillez remplir tous les champs", {
            position: "top-left",
            autoClose: 3000,
            theme: "light",
            transition: Bounce,
          });
          return;
        }

         if (values.password !== values.password_confirmation) {
    toast.error("Les mots de passe ne correspondent pas", { 
           position: "top-left",
            autoClose: 3000,
            theme: "light",
            transition: Bounce,});
    return;
  }

    try {
    const res = await axios.post('http://127.0.0.1:8000/api/register', values);
   
    localStorage.setItem('role', res.data.role[0]);
      toast.success('Inscription réussie !', { 
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
         onClose: () => navigate("/")
      });

    } catch (err) {
      const message =
    err.response?.data?.message || 
    err.response?.data?.error || 
    'Erreur lors de l’inscription';
      toast.error(message, {
        position: "top-left",
        autoClose: 4000,
        theme: "light",
        transition: Bounce
      });
      console.log(err);
    }
  };

  return (
    <section id='register-section'>
      <div id="register-container">
        
        <div id="form-side">
          <h2>Inscription</h2>
          <p>Créez votre compte pour commencer</p>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div id="form-group">
                <label htmlFor="name">Nom complet</label>
                <div id="input-with-icon">
                  <i className="fa-solid fa-user"></i>
                  <input
                    type="text"
                    id="name"
                    name='name'
                    value={values.name}
                    placeholder="Entrez votre Nom Complet"
                    onChange={handleChange}
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
                    name='email'
                    value={values.email}
                    placeholder="Entrez votre e-mail"
                    onChange={handleChange}
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
                    name='password'
                    value={values.password}
                    placeholder="Entrez votre mot de passe"
                    onChange={handleChange}
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
                    name='password_confirmation'
                    value={values.password_confirmation}
                    placeholder="Confirmez votre mot de passe"
                    onChange={handleChange}
                  />
                </div>
              </div>
             
            </div>

   <button class="btn-17" type="submit"  style={{left:"40px"}}>
  <span class="text-container">
    <span class="text">S'incrire</span>
  </span>
</button>
          </form>
          <div id="signup-link">
            Déjà un compte ? <Link to='/'>Connectez-vous</Link>
          </div>
        </div>
      </div>

      
      <ToastContainer />
    </section>
  );
};

export default Register;

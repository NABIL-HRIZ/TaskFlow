import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/ForgotPassword.css";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.warning("Please enter your email address", { autoClose: 3000 });
      return;
    }

    setIsLoading(true);

    try {
      await axios.post("http://127.0.0.1:8000/api/forgot-password", {
        email: email,
      });

      toast.success("Password reset link sent! Please check your inbox.", {
        autoClose: 4000,
        transition: Bounce,
      });
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Error while sending the reset email",
        { autoClose: 3000 }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <div className="forgot-password-header">
          <div className="lock-icon">
           <FaLock style={{fontSize:"30px"}}/>
          </div>
          <h2>Forgot Password</h2>
          <p>Enter your email address to reset your password</p>
        </div>

        <form onSubmit={handleSubmit} className="forgot-password-form">
          <div className="input-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

         <button class="btn-17" type="submit" style={{marginRight:"80px"}}>
  <span class="text-container">
    <span class="text">Reset Password</span>
  </span>
</button>
        </form>

        <div className="forgot-password-footer">
          <p>
            Remember your password? <Link to ="/">Login here</Link>
          </p>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default ForgotPassword;

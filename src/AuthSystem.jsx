import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function AuthSystem() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
 
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    const { username, email, password } = formData;

    if (!email || !password || (!isLogin && !username)) {
      return "Please fill in all required fields.";
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format.";
    }

    if (!isLogin && username.trim().length < 3) {
      return "Username must be at least 3 characters.";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }

    return null;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const endpoint = isLogin ? "https://register-form-qppb.onrender.com/login" : "https://register-form-qppb.onrender.com/signup";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong!");
      }

      setSuccess(isLogin ? "Login successful!" : "Signup successful!");
  
      setFormData({ username: "", email: "", password: "" });


      if (endpoint == "https://register-form-qppb.onrender.com/login") {
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      }
      if (endpoint == "https://register-form-qppb.onrender.com/signup") {
        setTimeout(()=>{
          setIsLogin(true);
          setSuccess('')
        },500);
        
        
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ username: "", email: "", password: "" });
    setError("");
    setSuccess("");
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>{isLogin ? "Login" : "Sign Up"} Form</h2>

          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              value={formData.username}
              onChange={handleChange}
              className="auth-input"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="auth-input"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="auth-input"
          />

          {isLogin && (
            <a href="#" className="auth-link">
              Forgot Password?
            </a>
          )}

          {error && <p className="auth-error">{error}</p>}
          {success && <p className="auth-success">{success}</p>}

          <button type="submit" className="auth-button">
            {isLogin ? "Login" : "Sign Up"}
          </button>

          <p className="auth-toggle-text">
            {isLogin ? "Not a Member?" : "Already have an account?"}{" "}
            <a href="#" onClick={toggleForm} className="auth-toggle-link">
              {isLogin ? "Sign Up" : "Sign In"}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

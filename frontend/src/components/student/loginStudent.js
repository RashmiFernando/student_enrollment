import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/student/login", {
        username,
        password
      });

      const token = res.data.token;

       // Store the token
      localStorage.setItem("token", token);

      alert("Login successful");
      navigate("/student-dashboard"); 

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };


  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>

        <h2>Student Login</h2>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );  
};

export default Login;
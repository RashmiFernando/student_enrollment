import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to StudySphere</h1>
      <div className="auth-buttons">
        <a 
          href="/login" 
          className="auth-button login-button"
          onClick={(e) => {
            e.preventDefault();
            navigate("/login");
          }}
        >
          Login
        </a>
        <a 
          href="/register" 
          className="auth-button register-button"
          onClick={(e) => {
            e.preventDefault();
            navigate("/register");
          }}
        >
          Register
        </a>
      </div>
    </div>
  );
};

export default Home;
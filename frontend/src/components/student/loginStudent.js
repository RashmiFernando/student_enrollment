import React from "react";
import "../css/login.css";

const Login = () => {
  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Student Login</h2>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

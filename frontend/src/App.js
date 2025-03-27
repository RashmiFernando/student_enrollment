import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentRegister from "./components/student_register/registerStudent"; // Import Student Registration Form
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to the Student Management System</h1>
        </header>
        
        <Routes>
          <Route path="/" element={<h2>Home Page</h2>} />
          <Route path="/register" element={<StudentRegister />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

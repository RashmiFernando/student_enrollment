import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentRegister from './components/student_register/registerStudent';
import CourseEnroll from './components/student_register/courseEnroll';
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={<h2>Home Page</h2>} />
          <Route path="/register" exact element={<StudentRegister />} />
          <Route path="/course-enroll" exact element={<CourseEnroll />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
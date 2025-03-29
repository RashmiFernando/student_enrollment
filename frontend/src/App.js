import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import StudentRegister from './components/student/registerStudent';
import StudentDashboard from "./components/student/studentDashboard";
import EditStudent from "./components/student/studentUserProfile";

import ViewAllStudents from "./components/student/viewAllStudents";

import CourseEnroll from './components/enrollment/courseEnroll';

import AddExam from "./components/exam/addExam";


import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={<h2>Home Page</h2>} />

          <Route path="/register" exact element={<StudentRegister />} />
          <Route path="/course-enroll" exact element={<CourseEnroll />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/students" element={<ViewAllStudents />} />
          <Route path="/student/edit/:id" element={<EditStudent />} />
          <Route path="/exam/add" element={<AddExam />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
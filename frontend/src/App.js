import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from './components/home/homePage';

import StudentRegister from './components/student/registerStudent';
import StudentLogin from './components/student/loginStudent';

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
          <Route path="/" exact element={<Home />} />

          <Route path="/register" exact element={<StudentRegister />} />
          <Route path="/login" exact element={<StudentLogin />} />

          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/student/edit/:id" element={<EditStudent />} />


          <Route path="/students" element={<ViewAllStudents />} />
          

          <Route path="/course-enroll" exact element={<CourseEnroll />} />  
          
          <Route path="/exam/add" element={<AddExam />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
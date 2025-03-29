import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/studentDashboard.css";

const StudentHome = () => {
  const studentId = "ST-0001";

  const [student, setStudent] = useState(null);
  const [enrollment, setEnrollments] = useState([]);
  const [selectedSection, setSelectedSection] = useState("home");


  useEffect(() => {

    axios
      .get(`http://localhost:5000/student/view/${studentId}`)
      .then((res) => {
        const data = res.data.student || res.data.Student || res.data[0] || res.data;
        console.log("Student loaded:", data); 
        setStudent(data);
      })
      .catch((err) => console.error("Error fetching student info:", err));

    axios
      .get(`http://localhost:5000/enrollment/student-enrollments/${studentId}`)
      .then((res) => setEnrollments(res.data))
      .catch((err) => console.error("Error fetching enrolled courses:", err));
  }, [studentId]);


  return (
    <div className="student-home-container">
      {/* Header */}
      <header className="student-header">
        <div className="header-left">
          <img src="/logo.png" alt="University Logo" className="logo-img" />
        </div>
      </header>

         <div className="student-id-overlay">
            <p>{student?.studentId}</p>
            <h2>{student?.name}</h2>
          </div>

      {/* Navigation */}
      <nav className="student-navbar">
        <button
          className={`nav-btn ${selectedSection === "home" ? "active" : ""}`}
          onClick={() => setSelectedSection("home")}
        >
          Home
        </button>
        <button
          className={`nav-btn ${selectedSection === "personal" ? "active" : ""}`}
          onClick={() => setSelectedSection("personal")}
        >
          Personal Info
        </button>
        <button className="nav-btn">Enroll to New Course</button>
        <button className="nav-btn">Registration</button>
        <button className="nav-btn">Exams</button>
      </nav>

      {/* HOME SECTION */}
      {selectedSection === "home" && (
        <>
          <div className="student-notice">
            Current Calendar Period Registration Details Only
          </div>         

          <div className="course-section">
            <h3>My Current Registered Courses</h3>
            <table className="course-table">
              <thead>
                <tr>
                  <th>Course ID</th>
                  <th>Course Name</th>
                  <th>Status</th>
                  <th>Enrollment Date</th>
                </tr>
              </thead>
              <tbody>
                { enrollment.length === 0 ? (
                  <tr>
                    <td colSpan="4">No courses enrolled.</td>
                  </tr>
                ) : (
                  enrollment.map((enrollment, idx) => (
                    <tr key={idx}>
                      <td>{enrollment.code}</td>
                      <td>{enrollment.name}</td>
                      <td>{enrollment.status}</td>
                      <td>{new Date(enrollment.enrollmentDate).toLocaleDateString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* PERSONAL INFO SECTION */}
      {selectedSection === "personal" && student && (
        <div className="personal-info-section">
          <h3>Student Personal Information</h3>

          <div className="personal-info-card">
            <p><strong>Student ID:</strong> {student.studentId}</p>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Phone:</strong> {student.phone}</p>
            <p><strong>Address:</strong> {student.address}</p>
            <p><strong>Username:</strong> {student.username}</p>
            <p><strong>Registered Date:</strong> {new Date(student.registerDate).toLocaleDateString()}</p>
          </div>
        </div>
      )}

    </div>
  );
};

export default StudentHome;
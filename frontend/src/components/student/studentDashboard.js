import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/studentDashboard.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"

const StudentHome = () => {

  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [enrollment, setEnrollments] = useState([]);
  const [selectedSection, setSelectedSection] = useState("home");
  const [courses, setCourses] = useState([]);

  // 🔐 Get studentId from JWT
  const token = localStorage.getItem("token");

  let studentId = null;

  if (token) {
    const decoded = jwtDecode(token);
    studentId = decoded.id;
  }

  useEffect(() => {

    if (!studentId) return;

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

  axios
  .get("http://localhost:5000/course/all")
  .then((res) => setCourses(res.data.courses))
  .catch((err) => console.error("Error fetching courses:", err));

  const handleEditDetails = () => {
    navigate(`/student/edit/${studentId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); 
  };

  const handleEnrollNow = (course) => {
    if (!studentId) return;
  
    const enrollmentData = {
      code: course.code,
      courseName: course.name,
      studentId: studentId,
      enrollmentDate: new Date()
    };
  
    axios
      .post("http://localhost:5000/enrollment/create", enrollmentData)
      .then(() => {
        alert(`Enrolled in ${course.name} successfully!`);
        
        return axios.get(`http://localhost:5000/enrollment/student-enrollments/${studentId}`);
      })
      .then((res) => setEnrollments(res.data))
      .catch((err) => {
        console.error("Enrollment failed:", err);
        alert("Enrollment failed. Try again.");
      });
  };
  

  return (
    <div className="student-home-container">
      
      <header className="student-header">
        <div className="header-left">
          <h1 className="brand-logo">StudySphere</h1>
        </div>

        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </header>

      {student && (
        <div className="welcome-message">
          <h2>Welcome {student.name}</h2>
        </div>
      )}

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

        <button
          className={`nav-btn ${selectedSection === "enroll" ? "active" : ""}`}
          onClick={() => setSelectedSection("enroll")}>
            Enroll to New Course
        </button>

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
                      <td>{enrollment.courseName}</td>
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

          <button 
              className="edit-details-btn"
              onClick={handleEditDetails}>
                Edit My Details
          </button>
        </div>
      )}

      {/* ENROLL SECTION */}
      {selectedSection === "enroll" && (
        <div className="enroll-section">
          <h3>Available Courses</h3>
          <table className="course-table">
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Lecturer</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.length === 0 ? (
                <tr>
                  <td colSpan="4">No courses found.</td>
                </tr>
              ) : (
                courses.map((course, idx) => (
                  <tr key={idx}>
                    <td>{course.code}</td>
                    <td>{course.name}</td>
                    <td>{course.assignedlecturer}</td>
                    <td>
                      <button
                        className="enroll-now-btn"
                        onClick={() => handleEnrollNow(course)}
                      >
                        Enroll Now
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}


    </div>
  );
};

export default StudentHome; 
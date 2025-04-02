import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const StudentHome = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [enrollment, setEnrollments] = useState([]);
  const [selectedSection, setSelectedSection] = useState("home");
  const [courses, setCourses] = useState([]);
  const [exams, setExams] = useState([]);

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
        setStudent(data);
      })
      .catch((err) => console.error("Error fetching student info:", err));

      axios
      .get(`http://localhost:5000/enrollment/student-enrollments/${studentId}`)
      .then((res) => setEnrollments(res.data))
      .catch((err) => console.error("Error fetching enrolled courses:", err));

      axios
        .get(`http://localhost:5000/exam/student-exams/${studentId}`)
        .then((res) => setExams(res.data.exams || res.data))
        .catch((err) => console.error("Error fetching exams:", err));
    }, [studentId]);


    useEffect(() => {
    axios
      .get("http://localhost:5000/course/all")
      .then((res) => setCourses(res.data.courses))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  const handleEditDetails = () => navigate(`/student/edit/${studentId}`);

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
    <div className="font-sans bg-gray-100 min-h-screen">
      <header className="bg-[#002147] text-white px-10 py-5 flex justify-between items-center relative">
        <h1 className="text-2xl font-bold tracking-wide">StudySphere</h1>
        <button
          className="absolute right-10 top-4 bg-orange-600 hover:bg-white text-white hover:text-orange-600 border-2 border-orange-600 px-4 py-2 rounded-lg font-bold transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      {student && (
        <div className="mx-10 mt-5">
          <h2 className="text-left font-medium italic ">Welcome {student.name}</h2>
        </div>
      )}

      <nav className="flex gap-4 px-10 py-3 bg-gray-200">
        {['home', 'personal', 'enroll', 'time-table', 'exam'].map((section) => (
          <button
            key={section}
            className={`px-4 py-2 rounded-md font-medium ${selectedSection === section ? 'bg-yellow-400 text-black' : 'bg-orange-600 text-white hover:bg-orange-800'}`}
            onClick={() => setSelectedSection(section)}
          >
            {section === 'home' ? 'Home' :
             section === 'personal' ? 'Personal Info' :
             section === 'enroll' ? 'Enroll to New Course' :
             section === 'time-table' ? 'Time Table' :
             'Exams'}
          </button>
        ))}
      </nav>

      {selectedSection === "home" && (
        <div className="px-10 py-5">
          <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-600 text-green-700 font-medium rounded-md">
            Current Calendar Period Registration Details Only
          </div>

          <h3 className="mb-4 text-xl font-semibold text-gray-700">My Current Registered Courses</h3>
          <table className="w-full bg-white shadow-md border border-gray-300">
            <thead className="text-white">
              <tr>
                <th className="p-3 border bg-orange-700">Course ID</th>
                <th className="p-3 border bg-orange-700">Course Name</th>
                <th className="p-3 border bg-orange-700">Status</th>
                <th className="p-3 border bg-orange-700">Enrollment Date</th>
              </tr>
            </thead>
            <tbody>
              {enrollment.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">No courses enrolled.</td>
                </tr>
              ) : (
                enrollment.map((enr, idx) => (
                  <tr key={idx} className="hover:bg-orange-50">
                    <td className="p-3 border text-center">{enr.code}</td>
                    <td className="p-3 border text-center">{enr.courseName}</td>
                    <td className="p-3 border text-center">{enr.status}</td>
                    <td className="p-3 border text-center">{new Date(enr.enrollmentDate).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {selectedSection === "personal" && student && (
        <div className="px-10 py-5">
          <h3 className="mb-4 text-xl font-semibold text-gray-700">Student Personal Information</h3>
          <div className="bg-white p-6 rounded-lg shadow-md text-base leading-relaxed">
            <p><strong>Student ID:</strong> {student.studentId}</p>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Phone:</strong> {student.phone}</p>
            <p><strong>Address:</strong> {student.address}</p>
            <p><strong>Username:</strong> {student.username}</p>
            <p><strong>Registered Date:</strong> {new Date(student.registerDate).toLocaleDateString()}</p>
          </div>
          <button
            onClick={handleEditDetails}
            className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
          >
            Edit My Details
          </button>
        </div>
      )}

      {selectedSection === "enroll" && (
        <div className="px-10 py-5">
          <h3 className="mb-4 text-xl font-semibold text-gray-700">Available Courses</h3>
          <table className="w-full bg-white shadow-md border border-gray-300">
            <thead className="text-white">
              <tr>
                <th className="p-3 border bg-orange-700">Course Code</th>
                <th className="p-3 border bg-orange-700">Course Name</th>
                <th className="p-3 border bg-orange-700">Lecturer</th>
                <th className="p-3 border bg-orange-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-4">No courses found.</td></tr>
              ) : (
                courses.map((course, idx) => (
                  <tr key={idx} className="hover:bg-orange-50">
                    <td className="p-3 border text-center">{course.code}</td>
                    <td className="p-3 border text-center">{course.name}</td>
                    <td className="p-3 border text-center">{course.assignedlecturer}</td>
                    <td className="p-3 border text-center">
                      <button
                        onClick={() => handleEnrollNow(course)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm font-medium"
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

      {selectedSection === "time-table" && (
        <div className="px-10 py-5">
          <h3 className="mb-4 text-xl font-semibold text-gray-700">Student Lecture Time Table</h3>
          <table className="w-full bg-white shadow-md border border-gray-300">
            <thead className="text-white">
              <tr>
                <th className="p-3 border bg-orange-700">Course Code</th>
                <th className="p-3 border bg-orange-700">Course Name</th>
                <th className="p-3 border bg-orange-700">Date & Time</th>
                <th className="p-3 border bg-orange-700">Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="4" className="text-center py-4">Sample data</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}


      {selectedSection === "exam" && (
        <div className="px-10 py-5">
          <h3 className="mb-4 text-xl font-semibold text-gray-700">Student Exam Time Table</h3>
          <table className="w-full bg-white shadow-md border border-gray-300">
            <thead className="bg-orange-600 text-white">
              <tr>
                <th className="p-3 border bg-orange-700">Course Code</th>
                <th className="p-3 border bg-orange-700">Course Name</th>
                <th className="p-3 border bg-orange-700">Date & Time</th>
                <th className="p-3 border bg-orange-700">Exam Location</th>
              </tr>
            </thead>
            <tbody>
              {exams.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">No exams scheduled.</td>
                </tr>
              ) : (
                exams.map((exam, index) => (
                  <tr key={index} className="hover:bg-orange-50">
                    <td className="p-3 border text-center">{exam.code}</td>
                    <td className="p-3 border text-center">{exam.examName}</td>
                    <td className="p-3 border text-center">
                      {new Date(exam.examDate).toLocaleDateString()} at XX.XX
                    </td>
                    <td className="p-3 border text-center">XX</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}``    
      
    </div>
  );
};

export default StudentHome;

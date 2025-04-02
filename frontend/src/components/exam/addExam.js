import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddExam = () => {

  const navigate = useNavigate();

  const [examName, setExamName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [examDuration, setExamDuration] = useState("");
  const [studentCount, setStudentCount] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courses, setCourses] = useState([]);
 
  // Fetch course codes
  useEffect(() => {
    axios
      .get("http://localhost:5000/course/all")
      .then((res) => setCourses(res.data.courses))
      .catch((err) => {
        console.error("Error fetching courses:", err);
        setCourses([]);
      });
  }, []);

  // Auto-fetch student count
  useEffect(() => {
    if (courseCode) {
      axios
        .get(`http://localhost:5000/enrollment/student-count/${courseCode}`)
        .then((res) => {
          setStudentCount(res.data.count || 0);
        })
        .catch((err) => {
          console.error("Error fetching student count:", err);
          setStudentCount(0);
        });
    } else {
      setStudentCount("");
    }
  }, [courseCode]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExam = {
      code: courseCode,
      examName,
      examDate,
      examDuration: parseInt(examDuration),
      studentCount: parseInt(studentCount),
    };

    axios
      .post("http://localhost:5000/exam/create", newExam)
      .then(() => {
        alert("Exam added successfully!");
        setCourseCode("");
        setExamName("");
        setExamDate("");
        setExamDuration("");
        setStudentCount("");

        navigate("/");
      })
      .catch((err) => {
        console.error("Error adding exam:", err);
        alert("Failed to add exam.");
      });
  };

  return (
    <div className="max-w-xl mx-auto mt-16 bg-white rounded-lg shadow-md p-8">
      <h2 className="text-3xl font-bold text-center text-orange-600 mb-8">Add New Exam</h2>
      
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Course Code</label>
          <select
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
          >
            <option value="">-- Select Course Code --</option>
            {courses.map((course, idx) => (
              <option key={idx} value={course.code}>
                {course.code}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Exam Name</label>
          <input
            type="text"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Exam Date</label>
          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Exam Duration (minutes)</label>
          <input
            type="number"
            value={examDuration}
            onChange={(e) => setExamDuration(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Student Count</label>
          <input
            type="number"
            value={studentCount}
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
        >
          Add Exam
        </button>
      </form>
    </div>
  );
};

export default AddExam;

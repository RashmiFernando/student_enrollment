import React from 'react';
import axios from 'axios';
import '../css/courseEnroll.css'

const CourseEnroll = () => {    

  const studentId = "ST-0001";

  const courses = [
    { courseId: 'BM2020', courseName: 'Business Analysis' },
    { courseId: 'IT114', courseName: 'Base Computing' }
  ];

  const handleEnroll = async (courseId) => {
    try {
      const response = await axios.post('http://localhost:5000/enrollment/create', {
        studentId,
        courseId,
        status: 'active'
      });

      alert(`Enrolled successfully in course ${courseId}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert('Enrollment failed. Check console for details.');
    }
  };

  return (
    <div className="course-enroll-container">
      <h2>Course Enrollment Page</h2>

      <table>
        <thead>
          <tr>
            <th>CourseId</th>
            <th>CourseName</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.courseId}>
              <td>{course.courseId}</td>
              <td>{course.courseName}</td>
              <td>
                <button className="enroll-btn" onClick={() => handleEnroll(course.courseId)}>
                  Enroll
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseEnroll;

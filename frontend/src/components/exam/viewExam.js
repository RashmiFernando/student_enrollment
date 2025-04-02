import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewExam = () => {
  const { id } = useParams(); // examId from the URL
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/exam/view/${id}`)
      .then((res) => {
        setExam(res.data.exam);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching exam:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10 text-blue-600 text-lg font-medium">Loading exam details...</div>;
  }

  if (!exam) {
    return <div className="text-center mt-10 text-red-500 text-lg font-medium">Exam not found</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Exam Details</h2>

      <div className="text-gray-700 space-y-3">
        <p><strong>Exam ID:</strong> {exam.examId || "N/A"}</p>
        <p><strong>Course Code:</strong> {exam.code}</p>
        <p><strong>Exam Name:</strong> {exam.examName}</p>
        <p><strong>Exam Date:</strong> {new Date(exam.examDate).toLocaleDateString()}</p>
        <p><strong>Exam Duration:</strong> {exam.examDuration} minutes</p>
        <p><strong>Student Count:</strong> {exam.studentCount}</p>
      </div>
    </div>
  );
};

export default ViewExam;

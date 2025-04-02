import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditExam = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [examData, setExamData] = useState({
    code: "",
    examName: "",
    examDate: "",
    examDuration: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch exam details
  useEffect(() => {
    axios
      .get(`http://localhost:5000/exam/view/${id}`)
      .then((res) => {
        const exam = res.data.exam;
        setExamData({
          code: exam.code || "",
          examName: exam.examName || "",
          examDate: exam.examDate?.split("T")[0] || "",
          examDuration: exam.examDuration || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading exam:", err);
        alert("Error loading exam data");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setExamData({ ...examData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/exam/update/${id}`, examData)
      .then(() => {
        alert("Exam updated successfully!");
        navigate("/exam/all");
      })
      .catch((err) => {
        console.error("Update error:", err);
        alert("Failed to update exam.");
      });
  };

  if (loading) {
    return <div className="text-center mt-10 text-blue-500">Loading exam data...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Edit Exam</h2>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className="mb-1 font-medium">Course Code</label>
        <input
          type="text"
          name="code"
          value={examData.code}
          onChange={handleChange}
          required
          className="px-4 py-2 mb-4 border border-gray-300 rounded-md"
        />

        <label className="mb-1 font-medium">Exam Name</label>
        <input
          type="text"
          name="examName"
          value={examData.examName}
          onChange={handleChange}
          required
          className="px-4 py-2 mb-4 border border-gray-300 rounded-md"
        />

        <label className="mb-1 font-medium">Exam Date</label>
        <input
          type="date"
          name="examDate"
          value={examData.examDate}
          onChange={handleChange}
          required
          className="px-4 py-2 mb-4 border border-gray-300 rounded-md"
        />

        <label className="mb-1 font-medium">Exam Duration (minutes)</label>
        <input
          type="number"
          name="examDuration"
          value={examData.examDuration}
          onChange={handleChange}
          required
          className="px-4 py-2 mb-4 border border-gray-300 rounded-md"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
        >
          Update Exam
        </button>
      </form>
    </div>
  );
};

export default EditExam;

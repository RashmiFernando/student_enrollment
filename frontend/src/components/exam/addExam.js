import React, { useState } from "react";
import axios from "axios";

const AddExam = () => {
  const [examName, setExamName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [examDuration, setExamDuration] = useState("");
  const [examLocation, setExamLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExam = {
      examName,
      examDate,
      examDuration: parseInt(examDuration),
      examLocation,
    };

    axios
      .post("http://localhost:5000/api/exam/create", newExam)
      .then(() => {
        alert("Exam added successfully!");
        setExamName("");
        setExamDate("");
        setExamDuration("");
        setExamLocation("");
      })
      .catch((err) => {
        console.error("Error adding exam:", err);
        alert("Failed to add exam.");
      });
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-gray-100 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add New Exam</h2>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className="mb-1 font-medium">Exam Name</label>
        <input
          type="text"
          value={examName}
          onChange={(e) => setExamName(e.target.value)}
          required
          className="px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label className="mb-1 font-medium">Exam Date</label>
        <input
          type="date"
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
          required
          className="px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label className="mb-1 font-medium">Exam Duration (minutes)</label>
        <input
          type="number"
          value={examDuration}
          onChange={(e) => setExamDuration(e.target.value)}
          required
          className="px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label className="mb-1 font-medium">Exam Location</label>
        <input
          type="text"
          value={examLocation}
          onChange={(e) => setExamLocation(e.target.value)}
          required
          className="px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Add Exam
        </button>
      </form>
    </div>
  );
};

export default AddExam;

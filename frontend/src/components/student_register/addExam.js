import React, { useState } from "react";
import axios from "axios";
import "./addExam.css";

const AddExam = () => {
  const [examName, setExamName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [examDuration, setExamDuration] = useState("");
  const[examLocation, setExamLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExam = {
      examName,
      examDate,
      examDuration: parseInt(examDuration),
      examLocation
    };

    axios.post("http://localhost:5000/api/exam/create", newExam)
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
    <div className="add-exam-container">
      <h2>Add New Exam</h2>
      <form className="add-exam-form" onSubmit={handleSubmit}>
        <label>Exam Name</label>
        <input
          type="text"
          value={examName}
          onChange={(e) => setExamName(e.target.value)}
          required
        />

        <label>Exam Date</label>
        <input
          type="date"
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
          required
        />

        <label>Exam Duration (minutes)</label>
        <input
        type="number"
        value={examDuration}
        onChange={(e) => setExamDuration(e.target.value)}
        required
        />

        <label>Exam Location</label>
        <input
          type="text"
          value={examLocation}
          onChange={(e) => setExamLocation(e.target.value)}
          required

        />
        <button type="submit">Add Exam</button>
      </form>
    </div>
  );
};

export default AddExam;

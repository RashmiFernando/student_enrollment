import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewAllExams = () => {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = () => {
    axios
      .get("http://localhost:5000/exam/view-all")
      .then((res) => {
        setExams(res.data.allExams || []);
      })
      .catch((err) => {
        console.error("Error fetching exams:", err);
        setExams([]);
      });
  };

  const handleEdit = (id) => {
    navigate(`/exam/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      axios
        .delete(`http://localhost:5000/exam/delete/${id}`)
        .then(() => {
          alert("Exam deleted successfully!");
          fetchExams(); // Refresh list
        })
        .catch((err) => {
          console.error("Delete error:", err);
          alert("Failed to delete exam.");
        });
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-center text-orange-800 mb-6">
        All Exam Details
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-orange-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Exam ID</th>
              <th className="px-4 py-3 text-left">Course Code</th>
              <th className="px-4 py-3 text-left">Exam Name</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Duration</th>
              <th className="px-4 py-3 text-left">Student Count</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {exams.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No exams found.
                </td>
              </tr>
            ) : (
              exams.map((exam, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{exam._id}</td>
                  <td className="px-4 py-3">{exam.code}</td>
                  <td className="px-4 py-3">{exam.examName}</td>
                  <td className="px-4 py-3">
                    {new Date(exam.examDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">{exam.examDuration} mins</td>
                  <td className="px-4 py-3">{exam.studentCount}</td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => handleEdit(exam._id)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded-md hover:bg-yellow-500 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(exam._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllExams;

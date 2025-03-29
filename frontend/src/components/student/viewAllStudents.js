import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../css/viewAllStudents.css";

const ViewAllStudents = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("studentId");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;
  const navigate = useNavigate();

  const fetchStudents = () => {
    axios.get("http://localhost:5000/student/get-all")
      .then((res) => {
        const data = res.data.allStudnets || res.data.allStudents || res.data;
        setStudents(data);
      })
      .catch((err) => {
        console.error("Error fetching student data:", err);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    axios.delete(`http://localhost:5000/student/delete/${id}`)
      .then(() => {
        alert("Student deleted successfully.");
        fetchStudents();
      })
      .catch((err) => alert("Error deleting student."));
  };

  const handleEdit = (id) => {
    if (window.confirm("Do you want to edit this student?")) {
      navigate(`/student/edit/${id}`);
    }
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredStudents);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "students.xlsx");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Registered Students", 14, 20);

    const tableColumn = ["Student ID", "Name", "Email", "Phone", "Address", "Username", "Register Date"];
    const tableRows = [];

    filteredStudents.forEach((student) => {
      const studentData = [
        student.studentId,
        student.name,
        student.email,
        student.phone,
        student.address,
        student.username,
        new Date(student.registerDate).toLocaleDateString()
      ];
      tableRows.push(studentData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 10 }
    });

    doc.save("students.pdf");
  };

  const handleSort = (key) => {
    setSortKey(key);
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    const aVal = a[sortKey]?.toString().toLowerCase() || "";
    const bVal = b[sortKey]?.toString().toLowerCase() || "";
    return sortOrder === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
  });

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = sortedStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(sortedStudents.length / studentsPerPage);

  return (
    <div className="view-all-container">
      <h2>All Registered Students</h2>

      <div className="top-controls">
        <input
          type="text"
          placeholder="Search by name, email or student ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="export-buttons">
          <button onClick={handleExportExcel}>Export Excel</button>
          <button onClick={handleExportPDF}>Export PDF</button>
        </div>
      </div>

      <table className="student-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("studentId")}>Student ID</th>
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("email")}>Email</th>
            <th onClick={() => handleSort("phone")}>Phone</th>
            <th onClick={() => handleSort("address")}>Address</th>
            <th onClick={() => handleSort("username")}>Username</th>
            <th onClick={() => handleSort("registerDate")}>Registered Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.length === 0 ? (
            <tr><td colSpan="8">No students found.</td></tr>
          ) : (
            currentStudents.map((student, idx) => (
              <tr key={idx}>
                <td>{student.studentId}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.address}</td>
                <td>{student.username}</td>
                <td>{new Date(student.registerDate).toLocaleDateString()}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(student.studentId)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(student.studentId)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={i + 1 === currentPage ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ViewAllStudents;

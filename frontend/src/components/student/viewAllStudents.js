import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ViewAllStudents = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("studentId");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;
  const navigate = useNavigate();

  const fetchStudents = () => {
    axios.get("http://localhost:5000/student/view-all")
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
    const studentsWithoutPasswords = filteredStudents.map(({ password, ...rest }) => rest); // Exclude password
    const worksheet = XLSX.utils.json_to_sheet(studentsWithoutPasswords);
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
    <div className="p-10 font-sans bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">All Registered Students</h2>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name, email or student ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-80 p-2 border border-gray-300 rounded"
        />
        <div className="flex gap-2">
          <button onClick={handleExportExcel} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Export Excel</button>
          <button onClick={handleExportPDF} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Export PDF</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded border border-gray-300">
          <thead className="bg-orange-600 text-white">
            <tr>
              <th className="px-4 py-2 bg-orange-700" onClick={() => handleSort("studentId")}>Student ID</th>
              <th className="px-4 py-2 bg-orange-700" onClick={() => handleSort("name")}>Name</th>
              <th className="px-4 py-2 bg-orange-700" onClick={() => handleSort("email")}>Email</th>
              <th className="px-4 py-2 bg-orange-700" onClick={() => handleSort("phone")}>Phone</th>
              <th className="px-4 py-2 bg-orange-700" onClick={() => handleSort("address")}>Address</th>
              <th className="px-4 py-2 bg-orange-700" onClick={() => handleSort("username")}>Username</th>
              <th className="px-4 py-2 bg-orange-700" onClick={() => handleSort("registerDate")}>Registered Date</th>
              <th className="px-4 py-2 bg-orange-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.length === 0 ? (
              <tr><td colSpan="8" className="text-center py-4">No students found.</td></tr>
            ) : (
              currentStudents.map((student, idx) => (
                <tr key={idx} className="text-center even:bg-gray-100 hover:bg-orange-50">
                  <td className="py-2">{student.studentId}</td>
                  <td className="py-2">{student.name}</td>
                  <td className="py-2">{student.email}</td>
                  <td className="py-2">{student.phone}</td>
                  <td className="py-2">{student.address}</td>
                  <td className="py-2">{student.username}</td>
                  <td className="py-2">{new Date(student.registerDate).toLocaleDateString()}</td>
                  <td className="py-2">
                    <button className="bg-yellow-400 text-black px-3 py-1 rounded mr-1 hover:bg-yellow-500" onClick={() => handleEdit(student.studentId)}>Edit</button>
                    <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700" onClick={() => handleDelete(student.studentId)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`mx-1 px-4 py-2 border rounded ${i + 1 === currentPage ? "bg-orange-600 text-white" : "bg-white text-orange-600 border-orange-600"}`}
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

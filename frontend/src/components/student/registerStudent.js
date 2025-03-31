import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentRegister = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const sendData = (e) => {
    e.preventDefault();
    const newStudent = { name, email, phone, address, username, password };

    axios
      .post("http://localhost:5000/student/register", newStudent)
      .then(() => {
        alert("Student Registered Successfully!");
        navigate("/");
      })
      .catch((err) => {
        alert("Error: " + err.response.data.message);
      });
  };

  const fillDummyData = () => {
    setName("Rashmi Fernando");
    setEmail("rashmi123@example.com");
    setPhone("0712345678");
    setAddress("123, Orange Street, Colombo");
    setUsername("rashmi1");
    setPassword("1234");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-orange-600 to-orange-300 p-6">
      <h2 className="text-white text-3xl font-bold mb-4">Student Registration</h2>

      <div className="w-full max-w-md">
        <div className="flex justify-end mb-3">
          <button
            type="button"
            onClick={fillDummyData}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded shadow font-medium transition duration-200"
          >
            Fill Dummy Data
          </button>
        </div>

        <form onSubmit={sendData} className="bg-white rounded-xl shadow-lg p-6 space-y-5">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md text-lg font-bold transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentRegister;

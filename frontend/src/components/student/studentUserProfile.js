import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    username: ""
  });

  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/student/view/${id}`)
      .then((res) => {
        const student = res.data?.student || res.data?.Student || res.data || {};
        setFormData({
          name: student.name || "",
          email: student.email || "",
          phone: student.phone || "",
          address: student.address || "",
          username: student.username || ""
        });
      })
      .catch((err) => {
        console.error("Error loading student:", err);
        alert("Failed to load student details.");
      });
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Invalid email format";
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = "Phone number must be 10 digits";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    return newErrors;
  };

  const validatePassword = () => {
    const newErrors = {};
    if (!passwordData.password) newErrors.password = "Password is required";
    if (passwordData.password !== passwordData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const updatedStudent = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address
    };

    axios.put(`http://localhost:5000/student/update/${id}`, updatedStudent)
      .then(() => {
        alert("Student details updated!");
        navigate("/student-dashboard");
      })
      .catch((err) => {
        alert("Error updating student.");
        console.error(err);
      });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validatePassword();
    if (Object.keys(validationErrors).length > 0) {
      setPasswordErrors(validationErrors);
      return;
    }

    axios.put(`http://localhost:5000/student/change-password/${id}`, {
      password: passwordData.password
    })
      .then(() => {
        alert("Password updated successfully!");
        setPasswordData({ password: "", confirmPassword: "" });
        navigate("/student-dashboard");
      })
      .catch((err) => {
        alert("Error updating password.");
        console.error(err);
      });
  };

  return (
    <div className="max-w-xl mx-auto my-12 bg-white shadow-lg rounded-xl p-8 font-sans">
      <h2 className="text-2xl font-bold text-center text-orange-800 mb-6">Edit Student</h2>

      <h3 className="text-lg font-semibold text-gray-700 mb-4">Student Information</h3>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className="font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="px-3 py-2 border border-gray-300 rounded-md mb-2"
        />
        {errors.name && <span className="text-red-500 text-sm -mt-2 mb-3">{errors.name}</span>}

        <label className="font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="px-3 py-2 border border-gray-300 rounded-md mb-2"
        />
        {errors.email && <span className="text-red-500 text-sm -mt-2 mb-3">{errors.email}</span>}

        <label className="font-medium text-gray-700">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="px-3 py-2 border border-gray-300 rounded-md mb-2"
        />
        {errors.phone && <span className="text-red-500 text-sm -mt-2 mb-3">{errors.phone}</span>}

        <label className="font-medium text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="px-3 py-2 border border-gray-300 rounded-md mb-2"
        />
        {errors.address && <span className="text-red-500 text-sm -mt-2 mb-3">{errors.address}</span>}

        <label className="font-medium text-gray-700">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          disabled
          className="px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
        />

        <button
          type="submit"
          className="mt-4 py-2 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700"
        >
          Update Details
        </button>
      </form>

      <h3 className="text-lg font-semibold text-gray-700 mt-10 mb-4">Password Update</h3>

      <form onSubmit={handlePasswordSubmit} className="flex flex-col">
        <label className="font-medium text-gray-700">New Password</label>
        <input
          type="text"
          name="password"
          value={passwordData.password}
          onChange={handlePasswordChange}
          required
          className="px-3 py-2 border border-gray-300 rounded-md mb-2"
        />
        {passwordErrors.password && (
          <span className="text-red-500 text-sm -mt-2 mb-3">{passwordErrors.password}</span>
        )}

        <label className="font-medium text-gray-700">Confirm Password</label>
        <input
          type="text"
          name="confirmPassword"
          value={passwordData.confirmPassword}
          onChange={handlePasswordChange}
          required
          className="px-3 py-2 border border-gray-300 rounded-md mb-2"
        />
        {passwordErrors.confirmPassword && (
          <span className="text-red-500 text-sm -mt-2 mb-3">{passwordErrors.confirmPassword}</span>
        )}

        <button
          type="submit"
          className="mt-4 py-2 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default EditStudent;

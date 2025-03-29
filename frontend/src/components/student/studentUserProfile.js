import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/studentUserProfile.css";

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
    if (passwordData.password !== passwordData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
        navigate("/students");
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
      })
      .catch((err) => {
        alert("Error updating password.");
        console.error(err);
      });
  };

  return (
    <div className="edit-student-container">
      <h2>Edit Student</h2>

      <h3>Student Information</h3>

      <form onSubmit={handleSubmit} className="edit-student-form">
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        {errors.name && <span className="error-text">{errors.name}</span>}

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        {errors.email && <span className="error-text">{errors.email}</span>}

        <label>Phone</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        {errors.phone && <span className="error-text">{errors.phone}</span>}

        <label>Address</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        {errors.address && <span className="error-text">{errors.address}</span>}

        <label>Username</label>
        <input type="text" name="username" value={formData.username} disabled />

        <button type="submit">Update Details</button>
      </form>


      <h3>Password Update</h3>

      <form onSubmit={handlePasswordSubmit} className="edit-student-form">
        <label>New Password</label>
        <input 
          type="password" 
          name="password" 
          value={passwordData.password} 
          onChange={handleChange} 
          required 
        />
        {passwordErrors.password && <span className="error-text">{passwordErrors.password}</span>}

        <label>Confirm Password</label>
        <input 
          type="password" 
          name="confirmPassword" 
          value={passwordData.confirmPassword} 
          onChange={handleChange} 
          required 
        />
        {passwordErrors.confirmPassword && <span className="error-text">{passwordErrors.confirmPassword}</span>}

        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};

export default EditStudent;
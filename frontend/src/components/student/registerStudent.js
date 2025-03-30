import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/registerStudent.css";

const StudentRegister = () => {
    const navigate = useNavigate();

    // variables for form inputs
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const sendData = (e) => {
        e.preventDefault(); 

        const newStudent = {
            name,
            email,
            phone,
            address,
            username,
            password
        };

        axios.post("http://localhost:5000/student/register", newStudent)
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
        <div className="register-container">
            <h2 className="register-title">Student Registration</h2>

            <div className="dummy-button-wrapper">
                <button className="dummy-button" type="button" onClick={fillDummyData}>
                Fill Dummy Data
                </button>
            </div>
            
            <form className="register-form" onSubmit={sendData}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label>Phone</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label>Address</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <button type="submit" className="submit-button">Register</button>
            </form>
        </div>
    );
};

export default StudentRegister;

const studentModel = require('../models/student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register Student
const registerStudent = async (req, res) => {
  try {
    const { name, email, phone, address, username, password } = req.body;

    if (!name || !email || !phone || !address || !username || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new studentModel({
      name,
      email,
      phone,
      address,
      username,
      password: hashedPassword,
      registerDate: new Date()
    });

    const savedStudent = await newStudent.save();

    res.status(200).json({ message: "Student Registered Successfully", savedStudent });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to Register Student", error: err.message });
  }
};


// View All Students
const viewAllStudents = async (req, res) => {
  try {
    const allStudents = await studentModel.find();
    res.status(200).json({ message: "All Students : ", allStudents });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to get All Students", error: err.message });
  }
};


// View One Student
const viewOneStudent = async (req, res) => {
  try {
    const studentId = req.params.id;

    const student = await studentModel.findOne({ studentId });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json({ message: "Student Details : ", student });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to get student by ID", error: err.message });
  }
};


// Update Student
const updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;

    const updatedStudent = await studentModel.findOneAndUpdate(
      { studentId },
      req.body,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json({ message: "Student Updated", updatedStudent });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to update student", error: err.message });
  }
};


// Password update
const updateStudentPassword = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedStudent = await studentModel.findOneAndUpdate(
      { studentId },
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json({ message: "Password updated successfully", updatedStudent });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to update the password" });
  }
};


// Delete Student
const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;

    const deletedStudent = await studentModel.findOneAndDelete({ studentId });

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json({ message: "Student Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to delete student", error: err.message });
  }
};


// Login Student
const loginStudent = async (req, res) => {
  try {
    const { username, password } = req.body;

    const student = await studentModel.findOne({ username });

    if (!student) {
      return res.status(404).json({ message: "Username not found" });
    }

    const matchPassword = await bcrypt.compare(password, student.password);

    if (!matchPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: student.studentId, name: student.username}, process.env.JWT_SECRET, { expiresIn: '4h' });
    res.status(200).json({ message: "Token created..", token });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Login error", error: err.message });
  }
};

module.exports = { registerStudent, viewAllStudents, viewOneStudent, updateStudent, updateStudentPassword, deleteStudent, loginStudent};
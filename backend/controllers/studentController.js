const studentModel = require('../models/student');
const bcrypt = require('bcrypt');

// Create a new student
const registerStudent = async (req, res) => {
    try {
        const { name, email, phone, address, username, password } = req.body;

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

        res.status(201).json({ message: "Student registered successfully", savedStudent });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while registering the student.", error: err.message });
    }
}


// get all students
const viewAllStudents = async (req, res) => {

    try {
        const allStudnets = await studentModel.find();

        if (!allStudnets) {
            return res.status(404).json({ message: "No students are available." });
        }

        res.status(200).json({ message: "Students :", allStudnets });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error when fetching students..", error: err.message });
    }
}


// get one student
const viewOneStudent = async (req, res) => {
    try {
        const studentId = req.params.id;

        const student = await studentModel.find({ studentId });

        return res.status(200).json({ message: "Student Details : ", student });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Unable to get studnet by Id", error: err.message });
    }
}


// update student
const updateStudent = async (req, res) => {

    try {
        const { name, email, phone, address, username, password } = req.body;

        const studentId = req.params.id;

        const updateFields = { name, email, phone, address, username};

        if (password) {
            updateFields.password = await bcrypt.hash(password, 10);
        }

        const updatedStudent = await studentModel.findOneAndUpdate(
            { studentId },  
            updateFields,        
            { new: true }        
        );
      
        return res.status(200).json({ message: "Studnet details updated", updatedStudent });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Unalbe to update the student" })
    }
}

 
// delete student
const deleteStudent = async (req, res) => {

    try {
        const studentId = req.params.id;

        const deletedStudent = await studentModel.findOneAndDelete({ studentId });

        res.status(200).json({ message: "Student deleted..", deletedStudent });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error when deleting student..", erro: err.message });
    }
}


// login student
const loginStudent = async (req, res) => {

    try {
        const { username, password } = req.body;

        const student = await studentModel.findOne({ username });

        if (!student) {
            return res.status(404).json({ message: "Username not found.." });
        }

        const decryptedPassword = bcrypt.compare(password, student.password);

        if (!decryptedPassword) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        res.status(200).json({ message: "Login successful" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { registerStudent, viewAllStudents, viewOneStudent, updateStudent, deleteStudent, loginStudent };
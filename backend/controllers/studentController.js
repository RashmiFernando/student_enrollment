const studentModel = require('../models/student');

// Create a new student
const registerStudent = async (req, res) => {
    try {
        const {  studentName, studentEmail, studentPhone, studentAddress, studentGender } = req.body;

        const createdStudent = new studentModel({            
            studentName, 
            studentEmail, 
            studentPhone, 
            studentAddress, 
            studentGender
        });

        if (!createdStudent) {
            return res.status(400).json({ message: "Failed to register student." });
        }

        const savedStudent = await createdStudent.save();

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

        const studnet = await studentModel.find({ studentId });

        return res.status(200).json({ message: "Student Details : ", studnet });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Unable to get studnet by Id", error: err.message });
    }
}


// update student
const updateStudent = async (req, res) => {

    try {
        const { studentName, studentEmail, studentPhone, studentAddress, studentGender } = req.body;

        const studentId = req.params.id;

        const updatedStudent = await studentModel.findOneAndUpdate(
            { studentId },
            { studentName, studentEmail, studentPhone, studentAddress, studentGender },
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


module.exports = { registerStudent, viewAllStudents, viewOneStudent, updateStudent, deleteStudent };
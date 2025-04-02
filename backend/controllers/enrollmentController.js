const Enrollment = require('../models/enrollment');

// Create a new enrollment
const createEnrollment = async (req, res) => {
    try {
        const { code, studentId, courseName, enrollmentDate } = req.body;
    

        // Input validation
        if (!code || !studentId || !courseName || !enrollmentDate) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newEnrollment = new Enrollment({
            code,
            studentId,
            courseName,
            enrollmentDate: new Date()
        });

        const savedEnrollment = await newEnrollment.save();

        res.status(201).json({ message: "Enrollment created successfully", enrollment: savedEnrollment });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while creating enrollment", error: err.message });
    }
};

// Get student count for a specific course code
const getStudentCountByCourse = async (req, res) => {
    try {
      const { code } = req.params;
  
      const count = await Enrollment.countDocuments({ code });
  
      res.status(200).json({ count });
    } catch (err) {
      console.error("Error fetching student count:", err);
      res.status(500).json({ message: "Failed to fetch student count", error: err.message });
    }
  };

// Get all enrollments for a specific student
const getEnrollmentsByStudent = async (req, res) => {
    try {
        const { studentId } = req.params;

        const enrollments = await Enrollment.find({ studentId });

        if (!enrollments || enrollments.length === 0) {
            return res.status(404).json({ message: "No enrollments found for this student." });
        }

        res.status(200).json(enrollments);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching enrollments", error: err.message });
    }
};


module.exports = { createEnrollment, getEnrollmentsByStudent, getStudentCountByCourse};


const Enrollment = require('../models/enrollment');

// Create a new enrollment
const createEnrollment = async (req, res) => {
    try {
        const { studentId, courseId, status } = req.body;

        // Input validation
        if (!studentId || !courseId) {
            return res.status(400).json({ message: "Student ID and Course ID are required" });
        }

        const newEnrollment = new Enrollment({
            studentId,
            courseId,
            enrollmentDate: new Date(),
            status: status || 'active'
        });

        const savedEnrollment = await newEnrollment.save();

        res.status(201).json({ message: "Enrollment created successfully", enrollment: savedEnrollment });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while creating enrollment", error: err.message });
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

module.exports = {
    createEnrollment,
    getEnrollmentsByStudent
};


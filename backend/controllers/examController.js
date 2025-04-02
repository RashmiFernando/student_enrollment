const examModel = require('../models/exam');
const Enrollment = require('../models/enrollment'); // Import enrollment model

// Create a new exam
const createExam = async (req, res) => {
  try {
    const { code, examName, examDate, examDuration } = req.body;

    // Validate input
    if (!code || !examName || !examDate || !examDuration) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    // Get the student count for the given course code
    const studentCount = await Enrollment.countDocuments({ code });

    // Create new exam document
    const newExam = new examModel({
      code,
      examName,
      examDate,
      examDuration,
      studentCount,
    });

    const savedExam = await newExam.save();

    res.status(201).json({ message: "Exam created successfully", savedExam });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while creating the exam.", error: err.message });
  }
};

// View all exams
const viewAllExams = async (req, res) => {
  try {
    const allExams = await examModel.find();

    if (!allExams || allExams.length === 0) {
      return res.status(404).json({ message: "No exams are available." });
    }

    res.status(200).json({ message: "Exams fetched successfully", allExams });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching exams", error: err.message });
  }
};

// View one exam
const viewOneExam = async (req, res) => {
  try {
    const examId = req.params.id;
    const exam = await examModel.findById(examId );

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    res.status(200).json({ message: "Exam details", exam });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching exam", error: err.message });
  }
};


// view exams for one student
const viewAllExamsForStudent = async (req, res) => {
  try {
    const studentId = req.params.id; 

    const enrollments = await Enrollment.find({ studentId });
    
    if (!enrollments || enrollments.length === 0) {
      return res.status(404).json({ message: "No enrollments found for this student." });
    }

    const courseCodes = [...new Set(enrollments.map(enrollment => enrollment.code))];

    // Find exams that match any of these course codes
    const studentExams = await examModel.find({ code: { $in: courseCodes } });

    if (!studentExams || studentExams.length === 0) {
      return res.status(404).json({ message: "No exams available for your enrolled courses." });
    }

    res.status(200).json({ 
      message: "Exams fetched successfully", 
      exams: studentExams 
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      message: "Error fetching exams", 
      error: err.message 
    });
  }
};


// Reschedule exam
const rescheduleExam = async (req, res) => {
  try {
    const examId = req.params.id;
    const { code, examName, examDate, examDuration } = req.body;

    const updatedExam = await examModel.findByIdAndUpdate(
      examId,
      { code, examName, examDate, examDuration },
      { new: true }
    );

    if (!updatedExam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    res.status(200).json({ message: "Exam rescheduled successfully", updatedExam });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error rescheduling exam", error: err.message });
  }
};

// Delete exam
const deleteExam = async (req, res) => {
  try {
    const examId = req.params.id;

    const deletedExam = await examModel.findByIdAndDelete( examId );

    if (!deletedExam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    res.status(200).json({ message: "Exam deleted successfully", deletedExam });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting exam", error: err.message });
  }
};



module.exports = {
  createExam,
  viewAllExams,
  viewOneExam,
  viewAllExamsForStudent,
  rescheduleExam,
  deleteExam
};

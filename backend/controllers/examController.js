const examModel = require('../models/exam');

//create a new exam
const createExam = async (req, res) => {
    try {
        const { code, examName, examDate, examDuration, examLocation } = req.body;

        if(!code || !examName || !examDate || !examDuration || !examLocation) {
            return res.status(400).json({ message: "Please provide all exam fields" });
        }

        const createdExam = new examModel({
            code,
            examName,
            examDate,
            examDuration,
            examLocation
        });

        if (!createdExam) {
            return res.status(400).json({ message: "Failed to create exam." });
        }

        const savedExam = await createdExam.save();

        res.status(201).json({ message: "Exam created successfully", savedExam });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while creating the exam.", error: err.message });
    }
}


//get all exams
const viewAllExams = async (req, res) => {
    try {
        const allExams = await examModel.find();

        if (!allExams) {
            return res.status(404).json({ message: "No exams are available." });
        }

        res.status(200).json({ message: "Exams :", allExams });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error when fetching exams..", error: err.message });
    }
}


//get one exam
const viewOneExam = async (req, res) => {
    try {
        const examId = req.params.id;

        const exam = await examModel.findOne({ examId });

        return res.status(200).json({ message: "Exam Details : ", exam });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error when fetching exam..", error: err.message });
    }
}


//rescedule examn
const rescheduleExam = async (req, res) => {
    try {
        const { examName, examDate, examDuration } = req.body;

        const examId = req.params.id; 

        const resceduledExam = await examModel.findOneAndUpdate(
            { examId },
            { code, examName, examDate, examDuration, examLocation},
            { new: true }
        );
        
        return res.status(200).json({ message: "Exam resceduled successfully", resceduledExam });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "An error occurred while resceduling the exam." })
    }
}


//delete exam
const deleteExam = async (req, res) => {
    try {
        const examId = req.params.id;

        const deletedExam = await examModel.findOneAndDelete({ examId });

        if (!deletedExam) {
            return res.status(400).json({ message: "Failed to delete exam." });
        }

        res.status(200).json({ message: "Exam deleted successfully", deletedExam });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while deleting the exam.", error: err.message });
    }
}

module.exports = { createExam, viewAllExams, viewOneExam, rescheduleExam, deleteExam }; 
const examModel = require('../models/exam');

//create a new exam
const createExam = async (req, res) => {
    try {
        const { examName, examDate, examDuration } = req.body;

        const createdExam = new examModel({
            examName,
            examDate,
            examDuration
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

        const exam = await examModel.find({ examId });

        return res.status(200).json({ message: "Exam Details : ", exam });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error when fetching exam..", error: err.message });
    }
}


//rescedule examn
const resceduleExam = async (req, res) => {

    try {
        const { examName, examDate, examDuration } = req.body;

        const examId = req.params.id;

        const resceduledExam = await examModel.findByIdAndUpdate(examId, {
            examName,
            examDate,
            examDuration
        });

        if (!resceduledExam) {
            return res.status(400).json({ message: "Failed to rescedule exam." });
        }

        res.status(200).json({ message: "Exam resceduled successfully", resceduledExam });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while resceduling the exam.", error: err.message });
    }
}

//delete exam

const deleteExam = async (req, res) => {
    try {
        const examId = req.params.id;

        const deletedExam = await examModel.findByIdAndDelete(examId);

        if (!deletedExam) {
            return res.status(400).json({ message: "Failed to delete exam." });
        }

        res.status(200).json({ message: "Exam deleted successfully", deletedExam });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while deleting the exam.", error: err.message });
    }
}
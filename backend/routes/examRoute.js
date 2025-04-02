const { createExam, viewAllExams, viewOneExam, viewAllExamsForStudent, rescheduleExam, deleteExam } = require('../controllers/examController');

const express = require('express');
const router = express.Router();

router.post('/create', createExam);

router.get('/view-all', viewAllExams);

router.get('/view/:id', viewOneExam);

router.get('/student-exams/:id', viewAllExamsForStudent);

router.put('/update/:id', rescheduleExam);

router.delete('/delete/:id', deleteExam); 

module.exports = router;
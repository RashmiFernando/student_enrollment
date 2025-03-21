const { createExam, viewAllExams, viewOneExam, rescheduleExam, deleteExam } = require('../controllers/examController');
const express = require('express');

const router = express.Router();

router.post('/create', createExam);

router.get('/get-all', viewAllExams);

router.get('/view/:id', viewOneExam);

router.put('/update/:id', rescheduleExam);

router.delete('/delete/:id', deleteExam);

module.exports = router;
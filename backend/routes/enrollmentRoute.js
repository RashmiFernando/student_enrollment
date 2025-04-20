const { createEnrollment, getEnrollmentsByStudent } = require('../controllers/enrollmentController');

const express = require('express');
const router = express.Router();

router.post('/create', createEnrollment);
router.get('/student-enrollments/:studentId', getEnrollmentsByStudent);
const { getStudentCountByCourse } = require("../controllers/enrollmentController");

router.get("/student-count/:code", getStudentCountByCourse);

module.exports = router;


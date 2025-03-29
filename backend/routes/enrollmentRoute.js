const { createEnrollment, getEnrollmentsByStudent } = require('../controllers/enrollmentController');

const express = require('express');
const router = express.Router();

router.post('/create', createEnrollment);
router.get('/student-enrollments/:studentId', getEnrollmentsByStudent);

module.exports = router;

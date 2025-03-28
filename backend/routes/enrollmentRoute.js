const {
    createEnrollment,getEnrollmentsByStudent

} = require('../controllers/enrollmentController');

const express = require('express');
const router = express.Router();

// Create a new enrollment
router.post('/create', createEnrollment);

router.get('/student/:studentId', getEnrollmentsByStudent);
/*
// Get all enrollments
router.get('/get-all', getAllEnrollments);

// Get one enrollment by ID
router.get('/view/:id', getOneEnrollment);

// Update an enrollment
router.put('/update/:id', updateEnrollment);

// Delete an enrollment
router.delete('/delete/:id', deleteEnrollment); */

module.exports = router;

const { registerStudent, viewAllStudents, viewOneStudent, updateStudent, deleteStudent } = require('../controllers/studentController');
const express = require('express');

const router = express.Router();

router.post('/register', registerStudent);

router.get('/get-all', viewAllStudents);

router.get('/view/:id', viewOneStudent);

router.put('/update/:id', updateStudent);

router.delete('/delete/:id', deleteStudent);

module.exports = router;
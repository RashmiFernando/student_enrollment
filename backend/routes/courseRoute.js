const { getcourses, addCourse} = require('../controllers/courseController');

const express = require('express');
const router = express.Router();

router.post('/create', addCourse);
router.get('/all', getcourses);

module.exports = router;

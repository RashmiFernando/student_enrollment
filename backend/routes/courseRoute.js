const {
  getcourses,
  addCourse,
  //updateCourse,
  //deleteCourse
} = require('../controllers/courseController');

const express = require('express');
const router = express.Router();

router.get('/courses', getcourses);
router.post('/createcourse', addCourse);
//router.put('/updatecourse', updateCourse);
//router.delete('/deletecourse', deleteCourse);

module.exports = router;

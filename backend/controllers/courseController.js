const Course = require('../models/course');


// Add a new course
const addCourse = async (req, res) => {
  try {
    const { code, name, credithours, department, assignedlecturer } = req.body;

    if (!code || !name || !credithours || !department || !assignedlecturer) {
      return res.status(400).json({ message: "Please provide all course fields" });
    }

    const existing = await Course.findOne({ code });
    if (existing) {
      return res.status(400).json({ message: "Course code already exists" });
    }

    const newCourse = new Course({
      code,
      name,
      credithours,
      department,
      assignedlecturer
    });

    const savedCourse = await newCourse.save();
    res.status(201).json({ message: "Course created successfully", savedCourse });
  } catch (err) {
    console.error("Error adding course:", err);
    res.status(500).json({ message: "Failed to create course", error: err.message });
  }
};

// View all courses
const getcourses = async (req, res) => {
  try {
    const allCourses = await Course.find();

    if (!allCourses || allCourses.length === 0) {
      return res.status(404).json({ message: "No courses found" });
    }

    res.status(200).json({ courses: allCourses });
  } catch (err) {
    console.error("Error retrieving courses:", err);
    res.status(500).json({ message: "Failed to fetch courses", error: err.message });
  }
};

/* View a single course by code
const getCourse = async (req, res) => {
  try {
    const code = req.params.code;
    const course = await Course.findOne({ code });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ course });
  } catch (err) {
    console.error("Error retrieving course:", err);
    res.status(500).json({ message: "Failed to fetch course", error: err.message });
  }
};
*/


module.exports = {
  getcourses,
 // getCourse,
  addCourse
};

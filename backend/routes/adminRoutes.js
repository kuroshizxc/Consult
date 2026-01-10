const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const adminAuth = require("../middleware/adminAuth");

// Teachers
router.post("/teachers", adminAuth, adminController.addTeacher);
router.delete("/teachers/:teacherId", adminAuth, adminController.removeTeacher);

// Subjects
router.post("/subjects", adminAuth, adminController.addSubject);
router.delete("/subjects/:subjectId", adminAuth, adminController.removeSubject);

module.exports = router;
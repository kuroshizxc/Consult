const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const teacherAuth = require("../middleware/teacherAuth");

// Get teacher profile
router.get("/profile", teacherAuth, teacherController.getProfile);

// Get appointments
router.get("/appointments", teacherAuth, teacherController.getAppointments);

// Mark unavailable
router.post("/unavailable", teacherAuth, teacherController.markUnavailable);

module.exports = router;
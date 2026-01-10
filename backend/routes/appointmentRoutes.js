const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const studentAuth = require("../middleware/studentAuth");

// Book an appointment
router.post("/book", studentAuth, appointmentController.bookAppointment);

// Get available slots for a teacher
router.get("/slots/:teacherId", studentAuth, appointmentController.getAvailableSlots);

module.exports = router;
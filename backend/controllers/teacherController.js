const Teacher = require("../models/Teacher");
const Appointment = require("../models/Appointment");
const Student = require("../models/Student");

// Get teacher info + subjects
exports.getProfile = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.teacher.id).populate("subjects");
        res.json({ success: true, teacher });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get appointments for teacher
exports.getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ teacher: req.teacher.id })
            .populate("student")
            .populate("subject");
        res.json({ success: true, appointments });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Mark time slot unavailable
exports.markUnavailable = async (req, res) => {
    try {
        const { time } = req.body;
        const teacher = await Teacher.findById(req.teacher.id);

        if (!teacher.unavailableTimes.includes(time)) {
            teacher.unavailableTimes.push(time);
            await teacher.save();
        }

        res.json({ success: true, message: "Time marked unavailable" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
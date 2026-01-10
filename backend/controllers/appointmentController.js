const Appointment = require("../models/Appointment");
const Teacher = require("../models/Teacher");
const Subject = require("../models/Subject");
const Student = require("../models/Student");

// Book an appointment
exports.bookAppointment = async (req, res) => {
    try {
        const { studentId, subjectId, teacherId, time } = req.body;

        if (!studentId || !subjectId || !teacherId || !time)
            return res.status(400).json({ success: false, message: "All fields are required" });

        const teacher = await Teacher.findById(teacherId);

        if (!teacher) return res.status(404).json({ success: false, message: "Teacher not found" });

        // Check if the time is unavailable
        if (teacher.unavailableTimes.includes(time))
            return res.status(400).json({ success: false, message: "Teacher is unavailable at this time" });

        // Check if already booked
        const exists = await Appointment.findOne({ teacher: teacherId, time });
        if (exists)
            return res.status(400).json({ success: false, message: "Time slot already booked" });

        const appointment = new Appointment({
            student: studentId,
            subject: subjectId,
            teacher: teacherId,
            time,
        });

        await appointment.save();

        res.json({ success: true, message: "Appointment booked successfully", appointment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get available slots for a teacher
exports.getAvailableSlots = async (req, res) => {
    try {
        const { teacherId } = req.params;

        const teacher = await Teacher.findById(teacherId);
        if (!teacher) return res.status(404).json({ success: false, message: "Teacher not found" });

        // All possible slots
        const allSlots = [
            "08:00","09:00","10:00","11:00","12:00",
            "13:00","14:00","15:00","16:00","17:00"
        ];

        // Booked slots
        const booked = await Appointment.find({ teacher: teacherId }).select("time -_id");
        const bookedTimes = booked.map(b => b.time);

        // Unavailable slots
        const unavailableTimes = teacher.unavailableTimes || [];

        const availableSlots = allSlots.filter(
            slot => !bookedTimes.includes(slot) && !unavailableTimes.includes(slot)
        );

        res.json({ success: true, availableSlots });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
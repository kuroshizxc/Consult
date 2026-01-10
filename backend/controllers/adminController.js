const Teacher = require("../models/Teacher");
const Subject = require("../models/Subject");

// --- TEACHERS ---
// Add a teacher
exports.addTeacher = async (req, res) => {
    try {
        const { name, subjectId } = req.body;
        if (!name || !subjectId) return res.status(400).json({ success: false, message: "All fields required" });

        const teacher = new Teacher({ name, subjects: [subjectId], unavailableTimes: [] });
        await teacher.save();

        res.json({ success: true, message: "Teacher added successfully", teacher });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Remove a teacher
exports.removeTeacher = async (req, res) => {
    try {
        const { teacherId } = req.params;
        await Teacher.findByIdAndDelete(teacherId);
        res.json({ success: true, message: "Teacher removed successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// --- SUBJECTS ---
// Add a subject
exports.addSubject = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ success: false, message: "Subject name required" });

        const subject = new Subject({ name });
        await subject.save();

        res.json({ success: true, message: "Subject added successfully", subject });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Remove a subject
exports.removeSubject = async (req, res) => {
    try {
        const { subjectId } = req.params;
        await Subject.findByIdAndDelete(subjectId);
        res.json({ success: true, message: "Subject removed successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
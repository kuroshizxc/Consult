const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* STUDENT REGISTER */
exports.registerStudent = async (req, res) => {
  try {
    const { studentId, name, password } = req.body;

    if (!studentId || !name || !password) {
      return res.json({ success: false, message: "Missing fields" });
    }

    const existing = await Student.findOne({ studentId });
    if (existing) {
      return res.json({ success: false, message: "Student already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const student = await Student.create({
      studentId,
      name,
      password: hashed
    });

    res.json({ success: true, student });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

/* LOGIN (STUDENT & TEACHER) */
exports.login = async (req, res) => {
  try {
    const { role, studentId, password, username } = req.body;

    let user;

    if (role === "student") {
      user = await Student.findOne({ studentId });
      if (!user) return res.json({ success: false, message: "Student not found" });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.json({ success: false, message: "Wrong password" });

    } else if (role === "teacher") {
      user = await Teacher.findOne({ username });
      if (!user) return res.json({ success: false, message: "Teacher not found" });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.json({ success: false, message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id, role },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1d" }
    );

    res.json({ success: true, token, user });

  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
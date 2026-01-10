const jwt = require("jsonwebtoken");
const Teacher = require("../models/Teacher");
const secret = process.env.JWT_SECRET || "secretkey";

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) return res.status(401).json({ success: false, message: "No token provided" });

        const decoded = jwt.verify(token, secret);

        const teacher = await Teacher.findById(decoded.id);
        if (!teacher) return res.status(401).json({ success: false, message: "Teacher not found" });

        req.teacher = teacher;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ success: false, message: "Unauthorized" });
    }
};
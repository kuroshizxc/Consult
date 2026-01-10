const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  subject: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
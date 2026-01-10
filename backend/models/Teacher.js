const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    subjects: [{ type: Schema.Types.ObjectId, ref: "Subject" }],
    unavailableTimes: [{ type: String }], // e.g., ["08:00", "12:00"]
});

module.exports = mongoose.model("Teacher", teacherSchema);
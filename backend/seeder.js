// backend/seeder.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs"); // make sure to install: npm install bcryptjs
dotenv.config({ path: "./.env" });

let Admin, Subject, Teacher;

// Import models safely
try {
  Admin = require("./models/Admin");
} catch (err) {
  console.warn("Admin model not found. Skipping admin seeding.");
}
try {
  Subject = require("./models/Subject");
} catch (err) {
  console.warn("Subject model not found. Skipping subject seeding.");
}
try {
  Teacher = require("./models/Teacher");
} catch (err) {
  console.warn("Teacher model not found. Skipping teacher seeding.");
}

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // Admin seeding with hashed password
    if (Admin) {
      const existingAdmin = await Admin.findOne({ username: "admin" });
      if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash("admin123", 10); // hash password
        const admin = new Admin({ username: "admin", password: hashedPassword });
        await admin.save();
        console.log("Admin created: username=admin, password=admin123 (hashed)");
      } else {
        console.log("Admin already exists");
      }
    }

    // Subject + Teacher seeding with hashed passwords
    if (Subject && Teacher) {
      await Subject.deleteMany();
      await Teacher.deleteMany();

      const subjects = ["Mathematics", "Science", "Practical Research", "Programming", "English"];
      const createdSubjects = await Subject.insertMany(subjects.map(name => ({ name })));

      if (!createdSubjects || createdSubjects.length === 0) {
        console.warn("No subjects created, skipping teachers");
      } else {
        const teachers = [];
        const defaultPassword = await bcrypt.hash("123456", 10); // hash teacher default password

        createdSubjects.forEach(sub => {
          if (!sub || !sub._id) return; // guard against undefined
          for (let i = 1; i <= 3; i++) {
            teachers.push({
              name: `${sub.name} Teacher ${i}`,
              subject: sub._id,
              password: defaultPassword
            });
          }
        });

        if (teachers.length > 0) {
          await Teacher.insertMany(teachers);
          console.log("Teachers created successfully with hashed passwords");
        }
      }
    }

    console.log("Seeding complete!");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
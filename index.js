const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const Student = require("./models/Student");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/studentsDB";

app.use(express.json());

mongoose.connect(MONGO_URI).then(async () => {
    console.log("MongoDB connected");
    const studentsCount = await Student.countDocuments();

    if (studentsCount === 0) {
        console.log("No students found, adding default students...");

        const students = [
            { name: "Ivan", age: 21, group: "A-31", marks: [75, 90, 82] },
            { name: "Maria", age: 22, group: "B-22", marks: [80, 85, 88] },
            { name: "Oleg", age: 20, group: "A-31", marks: [70, 65, 78] },
            { name: "Nina", age: 23, group: "C-12", marks: [90, 91, 89] },
            { name: "Pavlo", age: 19, group: "A-31", marks: [60, 75, 70] }
        ];

        await Student.insertMany(students);
        fs.writeFileSync("./data/students.json", JSON.stringify(students, null, 2));
        console.log("Default students added to MongoDB and saved to students.json");
    }
});

app.get("/students", async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

app.post("/students", async (req, res) => {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.json(newStudent);
});

app.put("/students/:id", async (req, res) => {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStudent);
});

app.delete("/students/:id", async (req, res) => {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    res.json(deletedStudent);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

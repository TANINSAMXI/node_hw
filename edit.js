const mongoose = require("mongoose");
const fs = require("fs");
const Student = require("./models/Student");

const MONGO_URI = "mongodb://localhost:27017/studentsDB";

const updateAge = async (studentId, newAge) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            studentId,
            { age: newAge },
            { new: true }
        );
        console.log("Updated student:", updatedStudent);

        await updateStudentsJson();
    } catch (err) {
        console.error("Error updating age:", err);
    }
};

const deleteStudentsFromGroup = async () => {
    try {
        const deletedStudents = await Student.deleteMany({ group: "A-31" });
        console.log(`${deletedStudents.deletedCount} students removed from group "A-31"`);

        await updateStudentsJson();
    } catch (err) {
        console.error("Error deleting students from group:", err);
    }
};

const updateStudentsJson = async () => {
    try {
        const allStudents = await Student.find();
        fs.writeFileSync("./data/students.json", JSON.stringify(allStudents, null, 2));
        console.log("students.json updated.");
    } catch (err) {
        console.error("Error updating students.json:", err);
    }
};

mongoose.connect(MONGO_URI).then(async () => {
    console.log("MongoDB connected");
    const studentId = "YOUR_STUDENT_ID";
    const newAge = 25;
    await updateAge(studentId, newAge);
    await deleteStudentsFromGroup();


    mongoose.disconnect();
});

const express = require("express");
const router = express.Router();

// Sample student data (later, we will connect to a database)
const students = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" }
];

// Route to get all students
router.get("/", (req, res) => {
    res.json(students);
});

// Route to get a student by ID
router.get("/:id", (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).send("Student not found");
    res.json(student);
});

module.exports = router;


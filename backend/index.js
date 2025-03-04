const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Import student routes
const studentRoutes = require("./routes/studentRoutes");
app.use("/students", studentRoutes);  // Use the student routes

app.get("/", (req, res) => {
    res.send("Student Study Planner API is running...");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


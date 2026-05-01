const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

  app.get("/", (req, res) => {
  res.send(`
    <h1>🚀 Task Manager API</h1>
    <p>Backend is running successfully</p>
    <h3>Available APIs:</h3>
    <ul>
      <li>POST /api/auth/signup</li>
      <li>POST /api/auth/login</li>
      <li>POST /api/projects/create</li>
      <li>POST /api/tasks/create</li>
      <li>GET /api/tasks/dashboard</li>
    </ul>
    <p>Use Postman or API tool to test endpoints.</p>
  `);
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
try {
  const taskRoutes = require("./routes/taskRoutes");
  console.log("Task routes imported:", taskRoutes);
  app.use("/api/tasks", taskRoutes);
} catch (err) {
  console.log("ERROR loading taskRoutes:", err);
}
app.listen(5000, () => console.log("Server running"));
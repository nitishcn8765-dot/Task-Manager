const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasksByProject,
  updateTaskStatus,
  getDashboard
} = require("../controllers/taskController");

const auth = require("../middleware/authMiddleware");

// ✅ IMPORTANT: dashboard FIRST
router.get("/dashboard", auth, getDashboard);

router.post("/create", auth, createTask);

router.get("/project/:projectId", auth, getTasksByProject);

router.put("/update/:taskId", auth, updateTaskStatus);

console.log("Task routes loaded"); // debug

module.exports = router;
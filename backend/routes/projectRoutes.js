const express = require("express");
const router = express.Router();

const {
  createProject,
  addMember
} = require("../controllers/projectController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// Create project
router.post("/create", auth, role(["Admin"]), createProject);

// Add member
router.post("/add-member", auth, role(["Admin"]), addMember);

module.exports = router;
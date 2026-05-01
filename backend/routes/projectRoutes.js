const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});
const { addMember } = require("../controllers/projectController");

router.post("/add-member", auth, role(["Admin"]), addMember);

module.exports = mongoose.model("Project", projectSchema);
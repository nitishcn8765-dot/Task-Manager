const Project = require("../models/Project");

// CREATE PROJECT (Admin only)
exports.createProject = async (req, res) => {
  try {
    const { name, description, members } = req.body;

    const project = await Project.create({
      name,
      description,
      createdBy: req.user.id,
      members
    });

    res.json(project);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
exports.addMember = async (req, res) => {
  try {
    const { projectId, userId } = req.body;

    const project = await Project.findByIdAndUpdate(
      projectId,
      { $addToSet: { members: userId } },
      { new: true }
    );

    res.json(project);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
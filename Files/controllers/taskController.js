const Task = require("../models/Task");

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, project, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      assignedTo,
      project,
      dueDate
    });

    res.json(task);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// GET TASKS BY PROJECT
exports.getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId })
      .populate("assignedTo", "name email")
      .populate("project", "name");

    res.json(tasks);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// UPDATE STATUS
exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.taskId,
      { status },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
// DASHBOARD
exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const total = await Task.countDocuments({ assignedTo: userId });

    const completed = await Task.countDocuments({
      assignedTo: userId,
      status: "Completed"
    });

    const pending = await Task.countDocuments({
      assignedTo: userId,
      status: "Pending"
    });

    const overdue = await Task.countDocuments({
      assignedTo: userId,
      dueDate: { $lt: new Date() },
      status: { $ne: "Completed" }
    });

    res.json({
      total,
      completed,
      pending,
      overdue
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
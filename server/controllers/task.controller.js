import Task from "../models/task.model.js";

const validateTaskInput = (title, description) => {
  if (!title || title.trim() === "") {
    return "Title is compulsory";
  }

  const titleWords = title.trim().split(/\s+/).length;
  if (titleWords > 10) {
    return "Title cannot exceed 10 words";
  }

  if (description) {
    const descWords = description.trim().split(/\s+/).length;
    if (descWords > 30) {
      return "Description cannot exceed 30 words";
    }
  }

  return null;
};

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const validationError = validateTaskInput(title, description);
    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    const task = await Task.create(req.body);
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json({ success: true, data: tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });

    res.json({ success: true, data: task });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const validationError = validateTaskInput(title, description);
    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });

    res.json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });

    res.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "completed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be either 'pending' or 'completed'",
      });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res.json({
      success: true,
      message: "Task status updated successfully",
      data: task,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export default {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  updateTaskStatus,
};

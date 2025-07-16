import express from "express";
import taskController from "../controllers/task.controller.js";

const Router = express.Router();

// Middlewares

import authMiddleware from "../middlewares/auth.middleware.js";

// Routes
Router.post("/", authMiddleware, taskController.createTask);
Router.get("/", taskController.getAllTasks);
Router.get("/:id", taskController.getTaskById);
Router.put("/:id", authMiddleware, taskController.updateTask);
Router.put("/:id/status", authMiddleware, taskController.updateTaskStatus);
Router.delete("/:id", authMiddleware, taskController.deleteTask);

export default Router;

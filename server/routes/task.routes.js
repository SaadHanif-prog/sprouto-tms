import express from "express";
import taskController from "../controllers/task.controller.js";

const Router = express.Router();

// Routes
Router.post("/tasks", taskController.createTask);
Router.get("/tasks", taskController.getAllTasks);
Router.get("/tasks/:id", taskController.getTaskById);
Router.put("/tasks/:id", taskController.updateTask);
Router.delete("/tasks/:id", taskController.deleteTask);

export default Router;

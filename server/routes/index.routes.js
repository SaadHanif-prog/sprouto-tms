import express from "express";
import taskRoutes from "./task.routes.js";
import authRoutes from "./auth.routes.js";

const Router = express.Router();

// Routes
Router.use("/tasks", taskRoutes);
Router.use("/auth", authRoutes);

//  *********************** More Routes will come here in future *****************************

export default Router;

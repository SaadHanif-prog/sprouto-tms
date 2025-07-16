import express from "express";
import taskRoutes from "./task.routes.js";
import authRoutes from "./auth.routes.js";

const Router = express.Router();

// Routes
Router.use("/api/v1/tasks", taskRoutes);
Router.use("/api/v1/auth", authRoutes);

//  *********************** More Routes will come here in future *****************************

export default Router;

import express from "express";
import taskRoutes from "./task.routes.js";

const Router = express.Router();

Router.use("/tasks", taskRoutes);

//  *********************** More Routes will come here in future *****************************

export default Router;

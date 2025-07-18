import express from "express";
import authController from "../controllers/auth.controller.js";

const Router = express.Router();

// Routes
Router.post("/signup", authController.signup);
Router.post("/login", authController.login);
Router.get("/check-auth", authController.checkAuth);
Router.post("/logout", authController.logout);

export default Router;

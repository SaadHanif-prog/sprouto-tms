import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

//  Main route file (indexRoutes.js combines all route modules)
import routes from "./routes/index.js";

dotenv.config();
const app = express();

// Global Middlewares
const allowedOrigins = ["http://localhost:5173", "https://your-live-site.com"];

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use(express.json({ limit: "10kb" }));

// API version prefix
app.use("/api/v1", routes);

// DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.log(err));

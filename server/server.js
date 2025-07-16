import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

//  Main route file (indexRoutes.js combines all route modules)
import routes from "./routes/index.routes.js";

dotenv.config();
const app = express();

// Global Middlewares
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://roaring-shortbread-5e056e.netlify.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));

app.use(routes);

// DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.log("MongoDB connection failed", err));

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import morgan from "morgan";
import http from "http";


import usersRoutes from "./routes/usersRoutes.js"

const app = express();
const httpServer = http.createServer(app);

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

// Use morgan for logging in development mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Middleware
app.use(express.json({ limit: "5000mb" }));
app.use(express.urlencoded({ limit: "5000mb", extended: true }));
app.use(cors());

// Routes
app.use("/api/users", usersRoutes);








// Start server
const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});

import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/auth.route.js";
import messageRoutes from "./src/routes/message.route.js";
import { connectDB } from "./src/lib/db.js";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import { app, server } from "./src/lib/socket.js";

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173"
].filter(Boolean);

// Morgan request logger 
app.use(morgan("combined"));

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.use(cookieParser());

// CORS Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
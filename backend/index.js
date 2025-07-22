import express from "express";
import dotenv from "dotenv";
import connectDB from "./library/connectDB.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import webhookRouter from "./routes/webhook.route.js";
import { clerkMiddleware } from "@clerk/express";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

// Store raw body for webhook signature verification
app.use(
  "/webhooks",
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

// Attach webhook route
app.use("/webhooks", webhookRouter);

// Use Clerk middleware after webhooks to avoid interfering with raw body
app.use(clerkMiddleware());

// JSON parsing for normal routes
app.use(express.json());

// API routes
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

// Global error handler
app.use((error, req, res, next) => {
  console.error("🔥 Error:", error);
  res.status(error.status || 500).json({
    message: error.message || "Something went wrong!",
    status: error.status,
    stack: error.stack,
  });
});

// Start server
app.listen(3000, () => {
  connectDB();
  console.log("🚀 Server is running on http://localhost:3000");
});

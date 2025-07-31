import express from "express";
import dotenv from "dotenv";
import connectDB from "./library/connectDB.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import webhookRouter from "./routes/webhook.route.js";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors(process.env.CLIENT_URL));

// Use Clerk middleware after webhooks to avoid interfering with raw body
app.use(clerkMiddleware());
// Important: Webhook route must be first, before any other middleware
app.use("/webhooks", webhookRouter);

app.use((req, res, next) => {
  console.log(`🛰️ Received request: ${req.method} ${req.originalUrl}`);
  next();
});

// JSON parsing for normal routes
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// app.get("/auth-state", (req, res) => {
//   const authState = req.auth;
//   res.json(authState);
// });

// app.get("/protect", (req, res) => {
//   const { userId } = req.auth();
//   if (!userId) {
//     return res.status(401).json("not authorized");
//   }
//   res.status(200).json("content");
// });

// app.get("/protect",requireAuth(), (req, res) => {
//   res.status(200).json("content");
// });

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

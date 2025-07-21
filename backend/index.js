import express from "express";
import connectDB from "./library/connectDB.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

// app.get("/test",(req,res)=>{
//     res.status(200).send("It works")
// })

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message || "something went wrong!",
    status: error.status,
    stack: error.stack,
  });
});

app.listen(3000, () => {
  connectDB();
  console.log("server is running!");
});

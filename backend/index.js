import express from 'express'
import connectDB from './library/connectDB.js'
import userRouter from './routes/user.route.js'
import postRouter from './routes/user.route.js'
import commentRouter from './routes/user.route.js'
import dotenv from 'dotenv';

dotenv.config();

const app = express()


// app.get("/test",(req,res)=>{
//     res.status(200).send("It works")
// })

app.use("/users",userRouter)
app.use("/posts",postRouter)
app.use("/comments",commentRouter)

app.listen(3000,()=>{
    connectDB()
    console.log("server is running!");
    
})
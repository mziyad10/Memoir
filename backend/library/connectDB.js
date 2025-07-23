import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://mvsiyad9:mvziyad123@memoircluster.p5mcpht.mongodb.net/?retryWrites=true&w=majority&appName=memoirCluster");
    console.log("MongoDB is connected");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
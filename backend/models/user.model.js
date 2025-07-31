import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
    },
    savedPosts: {
      type: [String],
      default: [],
    },
    firstName: String,
    lastName: String,
    profileImage: String
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

export default mongoose.model("User", userSchema);

import User from "../models/user.model.js";
import Rating from "../models/rating.model.js";

export const addRating = async (req, res) => {
  const { userId: clerkUserId } = req.auth();

  const postId = req.params.postId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }
  const user = await User.findOne({ clerkUserId });

  const newComment = new Comment({
    ...req.body,
    user: user._id,
    post: postId,
  });
};

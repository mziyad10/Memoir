import ImageKit from "imagekit";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;

  const posts = await Post.find()
    .populate("user", "username")
    .limit(limit)
    .skip((page - 1) * limit);

  const totalPosts = await Post.countDocuments();
  const hasMore = page * limit < totalPosts;

  res.status(200).json(posts, hasMore);
};

export const getPost = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }).populate(
    "user",
    "username img"
  );
  res.status(200).json(post);
};

export const createPost = async (req, res) => {
  const { userId: clerkId } = req.auth();

  console.log(clerkId, "id");

  console.log(req.headers);

  if (!clerkId) {
    return res.status(401).json("Not authenticated");
  }

  const user = await User.findOne({ clerkId });
  if (!user) {
    return res.status(404).json("User not found");
  }

  let slug = req.body.title.replace(/ /g, "-").toLowerCase();

  let existingPost = await Post.findOne({ slug });

  let counter = 2;

  while (existingPost) {
    slug = `${slug}-${counter}`;
    existingPost = await Post.findOne({ slug });
    counter++;
  }

  const newPost = new Post({ user: user._id, slug, ...req.body });

  const post = await newPost.save();
  res.status(200).json(post);
};

export const deletePost = async (req, res) => {
  const { userId: clerkId } = req.auth();
  if (!clerkId) {
    return res.status(401).json("Not authenticated");
  }
  const user = await User.findOne({ clerkId });

  const deletedPost = await Post.findByIdAndDelete({
    _id: req.params.id,
    user: user._id,
  });
  if (!deletedPost) {
    return res.status(403).json("You are not allowed to delete this post");
  }

  res.status(200).json("post has been deleted");
};

const imagekit = new ImageKit({
  urlEndpoint: "https://ik.imagekit.io/MZIYAD",
  publicKey: "public_DiSw4Hf+RqqPCkeG5pXCIe0+nfE=",
  privateKey: "private_6w8EoDfZ6ubJSby7det/QRYCgCg=",
});

export const uploadAuth = async (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
};

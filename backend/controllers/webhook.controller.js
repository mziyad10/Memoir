import User from "../models/user.model.js";
import { Webhook } from "svix";

export const clerkWebHook = async (req, res) => {
  console.log("1");

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  console.log("2");
  if (!WEBHOOK_SECRET) {
    throw new Error("Webhook secret needed!");
  }
  console.log("3");
  

  const payload = req.body;
  console.log("4");
  const headers = req.headers;
  console.log("5");

  const wh = new Webhook(WEBHOOK_SECRET);
  console.log("6");

  let evt;

  try {
    console.log("7");
    evt = wh.verify(payload, headers);
    console.log(evt,"user");
    
    console.log("8");
  } catch (err) {
    res.status(400).json({
      message: "webhook verification failed!",
    });
  }

  if (evt.type === "user.created") {
    console.log("9");
    const newUser = new User({
      clerkUserId: evt.data.id,
      username: evt.data.username || evt.data.email_addresses[0].email_address,
      email: evt.data.email_addresses[0].email_address,
      img: evt.data.profile_img_url,
    });
    console.log("10");
    await newUser.save();
    console.log("11");
  }
  return res.status(200).json({
    message: "Webhook received",
  });
};

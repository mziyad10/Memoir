import { Webhook } from "svix";
import User from "../models/user.model.js";

export const clerkWebHook = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  
  try {
    // Get the headers
    const svix_id = req.headers["svix-id"];
    const svix_timestamp = req.headers["svix-timestamp"];
    const svix_signature = req.headers["svix-signature"];

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return res.status(400).json({
        error: "Missing required headers"
      });
    }

    // Parse and verify the webhook payload
    const payload = req.body;
    const payloadString = Buffer.isBuffer(payload) ? payload.toString("utf8") : JSON.stringify(payload);
    
    const wh = new Webhook(WEBHOOK_SECRET);
    const evt = wh.verify(payloadString, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });

    // Handle only user creation events
    if (evt.type === "user.created") {
      const userData = evt.data;
      
      try {
        // Create new user in MongoDB
        const newUser = new User({
          clerkId: userData.id,
          email: userData.email_addresses[0]?.email_address,
          username: userData.username || userData.first_name || `user_${userData.id.slice(0, 6)}`,
          firstName: userData.first_name,
          lastName: userData.last_name,
          profileImage: userData.profile_image_url,
        });

        await newUser.save();
        return res.status(201).json({ message: "User created successfully" });
      } catch (dbError) {
        console.error("Database error:", dbError);
        return res.status(500).json({ error: "Failed to create user" });
      }
    }

    // For all other events, just acknowledge receipt
    return res.status(200).json({ message: "Webhook received" });
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(400).json({ error: "Invalid webhook payload" });
  }
};

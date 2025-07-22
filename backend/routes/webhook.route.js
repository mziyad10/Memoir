// import express from "express";
// import { clerkWebHook } from "../controllers/webhook.controller.js";
// import bodyParser from "body-parser";

// const router = express.Router();

// // ⚠️ Must use raw body for svix verification
// router.post(
//   "/clerk",
//   bodyParser.raw({ type: "application/json" }),
//   clerkWebHook
// );

// export default router;

import express from "express";
import { Webhook } from "svix";

const router = express.Router();

const webhookSecret =  "whsec_eHKzhZGBLkG3W07ePzebE0uPxvbe1YXA";

router.post("/clerk", async (req, res) => {
  const payload = req.rawBody;
  const headers = req.headers;

  try {
    const wh = new Webhook(webhookSecret);
    const evt = wh.verify(payload, headers);

    console.log("✅ Webhook verified:", evt);

    // Your event processing logic here
    res.status(200).send("Webhook received");
  } catch (err) {
    console.error("❌ Webhook verification failed:", err.message);
    return res.status(400).send("Webhook verification failed");
  }
});

export default router;


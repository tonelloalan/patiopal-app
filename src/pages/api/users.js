// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "../../../db/connect";
import User from "../../../db/models/User";

export default async function handler(req, res) {
  await dbConnect(); // Connects MongoDB database before doing any actions.

  const { method } = req;

  // Basic switch to handle POST request for creating new users. Other cases (GET, PUT, DELETE) can be added later:
  switch (method) {
    case "POST":
      // try...catch logic to create a new user (handling signup), which handles potential database errors.
      try {
        const newUser = await User.create(req.body);
        res.status(201).json({ success: true, data: newUser });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
  }
}

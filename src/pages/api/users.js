import dbConnect from "../../../db/connect";
import User from "../../../db/models/User";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "GET") {
    const users = await User.find();
    return res.status(200).json(users);
  }
  if (req.method === "POST") {
    console.log("request: ", req.body);
    try {
      const userData = req.body;
      await User.create(userData);
      return res.status(201).json({ status: "User created." });
    } catch (e) {
      console.error(e);
      return res.status(400).json({ error: e.message });
    }
  }
}
